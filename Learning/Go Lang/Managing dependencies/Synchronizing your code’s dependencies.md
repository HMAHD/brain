#GoLang 
## Synchronizing your code’s dependencies

You can ensure that you’re managing dependencies for all of your code’s imported packages while also removing dependencies for packages you’re no longer importing.

This can be useful when you’ve been making changes to your code and dependencies, possibly creating a collection of managed dependencies and downloaded modules that no longer match the collection specifically required by the packages imported in your code.

To keep your managed dependency set tidy, use the `go mod tidy` command. Using the set of packages imported in your code, this command edits your go.mod file to add modules that are necessary but missing. It also removes unused modules that don’t provide any relevant packages.

The command has no arguments except for one flag, -v, that prints information about removed modules.

```
$ go mod tidy
```