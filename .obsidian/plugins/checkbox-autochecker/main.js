/*! Copyright (c) 2025 Klaas Klee
* Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

'use strict';

var obsidian = require('obsidian');

const DEFAULT_SETTINGS = {
    syncMode: "loose",
    loggingEnabled: false
};
class CheckboxAutocheckerSettingTab extends obsidian.PluginSettingTab {
    constructor(app, plugin) {
        super(app, plugin);
        this.plugin = plugin;
    }
    display() {
        const { containerEl } = this;
        containerEl.empty();
        new obsidian.Setting(containerEl)
            .setName("Sync mode")
            .setDesc("Control how parent checkboxes affect children when toggled.")
            .addDropdown((dropdown) => dropdown
            .addOption("loose", "Loose (no downward sync)")
            .addOption("partial-strict", "Partial Strict (only update unchecked children)")
            .addOption("strict", "Strict (overwrite all children)")
            .setValue(this.plugin.settings.syncMode)
            .onChange(async (value) => {
            this.plugin.settings.syncMode = value;
            await this.plugin.saveSettings();
        }));
        new obsidian.Setting(containerEl)
            .setName("Enable logging")
            .setDesc("Log debug information to console.")
            .addToggle((toggle) => toggle
            .setValue(this.plugin.settings.loggingEnabled)
            .onChange(async (value) => {
            this.plugin.settings.loggingEnabled = value;
            await this.plugin.saveSettings();
        }));
    }
}

// Todo:
//  - buggy behaviour with strict or partial strict mode when adding and removing checkboxes
//  	- maybe pause evaluation while on edit mode?
class CheckboxAutochecker extends obsidian.Plugin {
    constructor() {
        super(...arguments);
        this.fileCache = new Map();
        this.filesBeingUpdated = new Set();
    }
    async onload() {
        console.log("CheckboxAutochecker plugin loaded");
        await this.loadSettings();
        this.addSettingTab(new CheckboxAutocheckerSettingTab(this.app, this));
        // init cache
        this.app.workspace.onLayoutReady(() => {
            const activeFile = this.app.workspace.getActiveFile();
            if (activeFile)
                this.cacheFileContent(activeFile);
        });
        // file-level vault sync - runs when file is modified
        this.registerEvent(this.app.vault.on("modify", async (file) => {
            if (!(file instanceof obsidian.TFile))
                return;
            // cache file first time
            if (!this.fileCache.has(file.path)) {
                await this.cacheFileContent(file);
            }
            const activeFile = this.app.workspace.getActiveFile();
            if (file.path === activeFile?.path) {
                await this.syncCurrentFile(file);
            }
        }));
        // editor-level real-time sync - runs while typing
        this.registerEvent(this.app.workspace.on("editor-change", (editor, view) => {
            this.handleEditorChange(editor);
        }));
    }
    async cacheFileContent(file) {
        const content = await this.app.vault.read(file);
        this.fileCache.set(file.path, content);
    }
    handleEditorChange(editor) {
        const content = editor.getValue();
        const syncedContent = syncCheckboxes(content, null, // no diff possible while typing
        this.settings.syncMode, this.settings.loggingEnabled);
        if (content !== syncedContent) {
            editor.setValue(syncedContent);
        }
    }
    // runs when file is saved/modified
    async syncCurrentFile(file) {
        // Prevent re-processing our own updates
        if (this.filesBeingUpdated.has(file.path)) {
            this.filesBeingUpdated.delete(file.path);
            return;
        }
        // only handle markdown files - no .canvas
        if (file.extension !== "md") {
            return;
        }
        const previousContent = this.fileCache.get(file.path) ?? "";
        this.filesBeingUpdated.add(file.path);
        await this.app.vault.process(file, (currentContent) => {
            if (previousContent === currentContent) {
                this.fileCache.set(file.path, currentContent);
                return currentContent; // no change
            }
            const changedLineIdx = this.detectChangedLine(previousContent, currentContent);
            const updatedContent = syncCheckboxes(currentContent, changedLineIdx, this.settings.syncMode, this.settings.loggingEnabled);
            // update cache (regardless of actual changes to avoid stale state)
            this.fileCache.set(file.path, updatedContent);
            return updatedContent;
        });
        this.filesBeingUpdated.delete(file.path);
    }
    detectChangedLine(oldContent, newContent) {
        const oldLines = oldContent.split("\n");
        const newLines = newContent.split("\n");
        const maxLength = Math.max(oldLines.length, newLines.length);
        for (let i = 0; i < maxLength; i++) {
            if (oldLines[i] !== newLines[i]) {
                return i;
            }
        }
        return null;
    }
    // loads saved user settings
    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }
    // saves updated user settings
    async saveSettings() {
        await this.saveData(this.settings);
    }
}
function syncCheckboxes(content, changedLineIdx, mode, logging) {
    if (logging)
        console.log("Sync triggered (mode:", mode, ")");
    const lines = content.split("\n");
    // parse lines into task objects
    const tasks = lines.map((line) => ({
        line,
        indent: line.search(/\S|$/),
        checked: /^\s*[-*] \[x\]/i.test(line),
        isTask: /^\s*[-*] \[[ x]\]/.test(line),
        children: [],
        parent: null,
    }));
    // build task tree - parent/child relationships based on indentation
    const stack = [];
    tasks.forEach((task, i) => {
        if (!task.isTask)
            return;
        while (stack.length && tasks[stack[stack.length - 1]].indent >= task.indent) {
            stack.pop();
        }
        if (stack.length) {
            const parentIdx = stack[stack.length - 1];
            task.parent = parentIdx;
            tasks[parentIdx].children.push(i);
        }
        stack.push(i);
    });
    // apply downward propagation if a checkbox was toggled
    if (changedLineIdx !== null && tasks[changedLineIdx]?.isTask) {
        const state = tasks[changedLineIdx].checked;
        const propagateDown = (index, state) => {
            tasks[index].checked = state;
            tasks[index].children.forEach((child) => {
                const childTask = tasks[child];
                if (mode === "strict") {
                    propagateDown(child, state);
                }
                else if (mode === "partial-strict") {
                    if (state === true && childTask.checked === false) {
                        propagateDown(child, state);
                    }
                    if (state === false) {
                        propagateDown(child, state);
                    }
                }
                // loose mode = no downward sync
            });
        };
        if (mode !== "loose") {
            propagateDown(changedLineIdx, state);
        }
    }
    // parent reflects childrens states - gets always applied
    const propagateUp = (idx) => {
        const parentIdx = tasks[idx].parent;
        if (parentIdx === null)
            return;
        const parentTask = tasks[parentIdx];
        const allChildrenChecked = parentTask.children.every((child) => tasks[child].checked);
        if (parentTask.checked !== allChildrenChecked) {
            parentTask.checked = allChildrenChecked;
            propagateUp(parentIdx);
        }
    };
    tasks.forEach((task, idx) => {
        if (task.isTask)
            propagateUp(idx);
    });
    // build return content for file
    return tasks
        .map((t) => t.isTask ? t.line.replace(/\[.\]/, t.checked ? "[x]" : "[ ]") : t.line)
        .join("\n");
}

module.exports = CheckboxAutochecker;


/* nosourcemap */