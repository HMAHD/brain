#GoLang 
## Workflow for using and managing dependencies

You can get and use useful packages with Go tools. On [pkg.go.dev](https://pkg.go.dev/), you can search for packages you might find useful, then use the `go` command to import those packages into your own code to call their functions.

The following lists the most common dependency management steps. For more about each, see the sections in this topic.

1.  [Locate useful packages](https://go.dev/doc/modules/managing-dependencies#locating_packages) on [pkg.go.dev](https://pkg.go.dev/).
2.  [Import the packages](https://go.dev/doc/modules/managing-dependencies#locating_packages) you want in your code.
3.  Add your code to a module for dependency tracking (if it isn’t in a module already). See [Enabling dependency tracking](https://go.dev/doc/modules/managing-dependencies#enable_tracking)
4.  [Add external packages as dependencies](https://go.dev/doc/modules/managing-dependencies#adding_dependency) so you can manage them.
5.  [Upgrade or downgrade dependency versions](https://go.dev/doc/modules/managing-dependencies#upgrading) as needed over time.