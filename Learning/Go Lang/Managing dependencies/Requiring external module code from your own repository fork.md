#GoLang 
### Requiring external module code from your own repository fork

When you have forked an external module’s repository (such as to fix an issue in the module’s code or to add a feature), you can have Go tools use your fork for the module’s source. This can be useful for testing changes from your own code. (Note that you can also require the module code in a directory that’s on the local drive with the module that requires it. For more, see [Requiring module code in a local directory](https://go.dev/doc/modules/managing-dependencies#local_directory).)

You do this by using a `replace` directive in your go.mod file to replace the external module’s original module path with a path to the fork in your repository. This directs Go tools to use the replacement path (the fork’s location) when compiling, for example, while allowing you to leave `import` statements unchanged from the original module path.

For more about the `replace` directive, see the [go.mod file reference](https://go.dev/doc/modules/gomod-ref).

In the following go.mod file example, the current module requires the external module `example.com/theirmodule`. The `replace` directive then replaces the original module path with `example.com/myfork/theirmodule`, a fork of the module’s own repository.

```
module example.com/mymodule

go 1.16

require example.com/theirmodule v1.2.3

replace example.com/theirmodule v1.2.3 => example.com/myfork/theirmodule v1.2.3-fixed
```

When setting up a `require`/`replace` pair, use Go tool commands to ensure that requirements described by the file remain consistent. Use the [`go list`](https://go.dev/ref/mod#go-list-m) command to get the version in use by the current module. Then use the [`go mod edit`](https://go.dev/ref/mod#go-mod-edit) command to replace the required module with the fork:

```
$ go list -m example.com/theirmodule
example.com/theirmodule v1.2.3
$ go mod edit -replace=example.com/theirmodule@v1.2.3=example.com/myfork/theirmodule@v1.2.3-fixed
```

**Note:** When you use the `replace` directive, Go tools don’t authenticate external modules as described in [Adding a dependency](https://go.dev/doc/modules/managing-dependencies#adding_dependency).

For more about version numbers, see [Module version numbering](https://go.dev/doc/modules/version-numbers).