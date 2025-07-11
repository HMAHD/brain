#GoLang 
### Requiring module code in a local directory

You can specify that the code for a required module is on the same local drive as the code that requires it. You might find this useful when you are:

-   Developing your own separate module and want to test from the current module.
-   Fixing issues in or adding features to an external module and want to test from the current module. (Note that you can also require the external module from your own fork of its repository. For more, see [Requiring external module code from your own repository fork](https://go.dev/doc/modules/managing-dependencies#external_fork).)

To tell Go commands to use the local copy of the module’s code, use the `replace` directive in your go.mod file to replace the module path given in a `require` directive. See the [go.mod reference](https://go.dev/doc/modules/gomod-ref) for more about directives.

In the following go.mod file example, the current module requires the external module `example.com/theirmodule`, with a nonexistent version number (`v0.0.0-unpublished`) used to ensure the replacement works correctly. The `replace` directive then replaces the original module path with `../theirmodule`, a directory that is at the same level as the current module’s directory.

```
module example.com/mymodule

go 1.16

require example.com/theirmodule v0.0.0-unpublished

replace example.com/theirmodule v0.0.0-unpublished => ../theirmodule
```

When setting up a `require`/`replace` pair, use the [`go mod edit`](https://go.dev/ref/mod#go-mod-edit) and [`go get`](https://go.dev/ref/mod#go-get) commands to ensure that requirements described by the file remain consistent:

```
$ go mod edit -replace=example.com/theirmodule@v0.0.0-unpublished=../theirmodule
$ go get -d example.com/theirmodule@v0.0.0-unpublished
```

**Note:** When you use the replace directive, Go tools don’t authenticate external modules as described in [Adding a dependency](https://go.dev/doc/modules/managing-dependencies#adding_dependency).

For more about version numbers, see [Module version numbering](https://go.dev/doc/modules/version-numbers).