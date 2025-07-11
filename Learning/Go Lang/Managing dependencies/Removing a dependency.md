#GoLang 
## Removing a dependency

When your code no longer uses any packages in a module, you can stop tracking the module as a dependency.

To stop tracking all unused modules, run the [`go mod tidy` command](https://go.dev/ref/mod#go-mod-tidy). This command may also add missing dependencies needed to build packages in your module.

```
$ go mod tidy
```

To remove a specific dependency, use the [`go get` command](https://go.dev/ref/mod#go-get), specifying the module’s module path and appending `@none`, as in the following example:

```
$ go get example.com/theirmodule@none
```

The `go get` command will also downgrade or remove other dependencies that depend on the removed module.

