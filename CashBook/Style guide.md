
## Overall Philosophy

  

The application should present a clean, professional, and efficient user interface focused on clarity and ease of data management. UI elements should be consistent throughout the application. Utilize Windows design principles where feasible within the Tkinter framework. Animations should be subtle and purposeful, enhancing the user experience without being distracting.

  

## Color Palette

  

Define a clear color palette to maintain brand consistency and visual hierarchy. Colors should ensure sufficient contrast for accessibility. Specify colors in HEX or RGB format.

  

*   **Primary:** `#0078D4` (Standard Windows Blue) - Used for main interactive elements, headers, selected states.

*   **Secondary:** `#EFF6FC` (Light Blue) - Used for subtle backgrounds or hover states.

*   **Accent:** `#107C10` (Green) - Used for positive financial indicators (e.g., income, positive balance), success messages, confirmation buttons.

*   **Destructive/Error:** `#D83B01` (Red/Orange) - Used for negative financial indicators (e.g., expenses, negative balance), error messages, delete confirmations.

*   **Warning:** `#FFB900` (Yellow) - Used for warning messages or indicators needing attention (e.g., unreconciled items).

*   **Text (Primary):** `#1C1C1C` (Near Black) - For main content and labels.

*   **Text (Secondary):** `#5E5E5E` (Dark Gray) - For less important text, hints, or disabled text.

*   **Background (Main):** `#FFFFFF` (White) - Main content area background.

*   **Background (Subtle):** `#F3F3F3` (Light Gray) - Sidebar background, alternating list rows, card backgrounds.

*   **Border:** `#D1D1D1` (Medium Gray) - Borders for inputs, cards, tables.

*   **Focus Indicator:** Use the system's default focus ring or a distinct outline using the Primary color (`#0078D4`).

  

## Typography

  

Use a clear, legible sans-serif font readily available on Windows. Define a consistent typographic scale.

  

*   **Default Font Family:** Segoe UI (Fallback: Calibri, Arial).

*   **Base Font Size:** 11pt (used for body text, standard inputs, button text).

*   **Hierarchy:**

    *   **H1 (Page Title):** 24pt Bold.

    *   **H2 (Section Title):** 18pt Bold.

    *   **H3 (Card Title/Sub-section):** 14pt Bold.

    *   **Body Text:** 11pt Regular.

    *   **Labels (Form Fields):** 10pt Bold or 11pt Regular (ensure consistency).

    *   **Captions/Small Text:** 9pt Regular.

    *   **Button Text:** 11pt Regular.

*   **Line Height:** Approximately 1.4x the font size for body text.

*   **Weights:** Use Regular and Bold primarily. Avoid excessive use of italics.

  

## Layout and Grid System

  

Define a responsive layout structure based on window width, aligning with Windows guidelines. Use consistent spacing.

  

*   **Breakpoints:**

    *   **Small:** < 641px (Consider collapsing sidebar to icons or a hamburger menu).

    *   **Medium:** 641px - 1007px (Standard layout, potentially narrower sidebar).

    *   **Large:** >= 1008px (Full layout with standard sidebar width).

*   **Base Spacing Unit:** 8px. Use multiples for padding and margins (e.g., 8px, 16px, 24px).

*   **Standard Padding:** 16px within content areas, cards, dialogs.

*   **Layout Structure:**

    *   **Sidebar/Navigation:** Left-aligned, fixed width (e.g., 240px on Large, maybe 180px on Medium, collapsed on Small). Contains primary navigation items.

    *   **Main Content Area:** Occupies the remaining space. Displays lists, forms, dashboards, reports.

    *   **Status Bar (Optional):** Bottom area for summary info or status messages.

  

## UI Components

  

Define styles for common UI elements identified in the project plan and standard controls. Ensure styles for different states (normal, hover, active/pressed, disabled, focus) are defined.

  

*   **Buttons:**

    *   **Padding:** Consistent internal padding (e.g., 8px vertical, 16px horizontal).

    *   **Shape:** Slightly rounded corners (e.g., 2px radius).

    *   **Primary:** Primary color background, white text.

    *   **Secondary/Default:** White/Subtle Background, Primary color text/border.

    *   **Destructive:** Destructive color background, white text.

    *   **States:** Define visual changes for hover (e.g., slightly darker/lighter background), pressed (e.g., inset effect or darker background), disabled (e.g., grayed out background/text, no hover effect).

    *   **Icon Buttons:** Square or circular buttons with a central icon, minimal padding.

*   **Forms & Input Fields:**

    *   **Text Inputs/Amount Fields:** Border color (Border), background (White). Padding inside the field. Highlight border/background on focus. Show error state with Destructive color border.

    *   **Dropdowns (Comboboxes):** Consistent style with text inputs. Clear dropdown arrow indicator.

    *   **Date Picker:** Use a standard calendar view pop-up. Style consistent with other inputs.

    *   **Checkboxes/Radio Buttons:** Standard OS appearance or custom styled consistently. Clear visual difference between selected and unselected.

    *   **Labels:** Positioned above the corresponding input field. Use defined Label typography.

*   **Lists (Tkinter Treeview):**

    *   **Header:** Bolder text, subtle background color, padding. Clickable for sorting.

    *   **Rows:** Sufficient padding. Use alternating row colors (White and Background Subtle) for readability.

    *   **Selection:** Highlight selected row(s) with Primary color (semi-transparent) background and appropriate text color for contrast.

    *   **Scrollbars:** Standard Windows style or subtly styled to match the theme.

*   **Cards (Dashboard):**

    *   **Background:** Background Subtle or White.

    *   **Border:** Subtle Border color or none if using shadow.

    *   **Padding:** Standard Padding (16px).

    *   **Shadow:** Optional subtle drop shadow for elevation.

    *   **Typography:** Use H3 for title, Body Text for content.

*   **Dialogs/Modals:**

    *   **Overlay:** Optional semi-transparent dark overlay behind the dialog.

    *   **Container:** Background White, Border, optional subtle Shadow. Standard Padding.

    *   **Title Bar:** Clear title using H2 or H3 typography.

    *   **Buttons:** Typically aligned to the bottom-right (OK/Cancel, Save/Close).

*   **Navigation (Sidebar):**

    *   **Items:** Use icons and text labels. Clear visual distinction for the active/selected item (e.g., Primary color background or indicator bar). Subtle background change on hover.

*   **Icons:**

    *   **Style:** Use a consistent icon set (e.g., Fluent UI System Icons). Prefer simple, line-based icons.

    *   **Size:** Standard sizes like 16x16px or 20x20px.

    *   **Color:** Use Text Primary or Text Secondary color. Can use Accent/Destructive colors contextually (e.g., warning icon).

*   **Tables:** Similar styling to Lists (Treeview) - clear headers, row separation, padding.

*   **Charts (Matplotlib):**

    *   **Colors:** Use the defined Color Palette (Primary, Accent, Destructive, etc.) for data series.

    *   **Fonts:** Use the defined Default Font Family and sizes for titles, axes, labels.

    *   **Gridlines:** Subtle gridlines using Border color.

    *   **Tooltips:** Simple tooltips on hover showing data points, styled consistently with application tooltips.

*   **Tooltips:** Simple pop-up with Background Subtle or dark background, white/primary text, small font size (e.g., 9pt or 10pt), standard padding. Appear after a short delay on hover.

  

## Animations & Transitions

  

Use animations sparingly and purposefully to provide feedback, guide the user, and improve perceived smoothness. Prioritize performance and responsiveness. Respect the Windows setting to turn off unnecessary animations.

  

*   **Duration:** Most animations should be brief: 100ms - 300ms. Faster for frequent actions (e.g., hover effects: ~100ms), slightly longer for transitions (~200-250ms).

*   **Easing:** Use ease-in-out or accelerate/decelerate curves for a natural feel. Fast start, soft landing. Avoid linear easing for motion.

*   **Types:**

    *   **Feedback:** Subtle flash or pulse (e.g., 100-200ms) on button clicks or successful actions.

    *   **State Changes:** Short fade-in/fade-out (e.g., 150ms) for elements appearing/disappearing (tooltips, context menus, validation messages).

    *   **Page Transitions:**

        *   *Page Refresh (Top-level):* Combine a quick slide-up and fade-in effect (~250ms). Use for navigating between main sections (sidebar items).

        *   *Drill In (Deeper navigation):* Subtle horizontal slide/fade effect (~200ms). Use when navigating into details from a list.

    *   **Hover Effects:** Quick, subtle background color or text color changes (~100ms) on interactive elements.

*   **Performance:** Animations should start quickly (<50ms) and not block user interaction unless part of a modal process. Use lightweight animations, especially during potentially CPU-intensive tasks. Design to degrade gracefully if system resources are low (e.g., skip the animation).

  

## Implementation Notes

  

*   Utilize Tkinter's `ttk` themed widgets where possible for better native look and feel and easier styling.

*   Define reusable component functions or classes within the `views/` directory to encapsulate layout and styling.

*   Centralize style constants (colors, font sizes, padding values) in `utils/config.py` or potentially parse definitions from `resources/styles.css` if using a library that supports it (clarify method). Using conceptual design tokens is recommended.

*   Ensure the application icon is set correctly.