#GoLang 
## Enabling dependency tracking in your code

To track and manage the dependencies you add, you begin by putting your code in its own module. This creates a go.mod file at the root of your source tree. Dependencies you add will be listed in that file.

To add your code to its own module, use the [`go mod init` command](https://go.dev/ref/mod#go-mod-init). For example, from the command line, change to your code’s root directory, then run the command as in the following example:

```
$ go mod init example/mymodule
```

The `go mod init` command’s argument is your module’s module path. If possible, the module path should be the repository location of your source code.

If at first you don’t know the module’s eventual repository location, use a safe substitute. This might be the name of a domain you own or another name you control (such as your company name), along with a path following from the module’s name or source directory. For more, see [Naming a module](https://go.dev/doc/modules/managing-dependencies#naming_module).

As you use Go tools to manage dependencies, the tools update the go.mod file so that it maintains a current list of your dependencies.

When you add dependencies, Go tools also create a go.sum file that contains checksums of modules you depend on. Go uses this to verify the integrity of downloaded module files, especially for other developers working on your project.

Include the go.mod and go.sum files in your repository with your code.

See the [go.mod reference](https://go.dev/doc/modules/gomod-ref) for more.