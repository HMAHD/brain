#GoLang 
## Developing and testing against unpublished module code

You can specify that your code should use dependency modules that may not be published. The code for these modules might be in their respective repositories, in a fork of those repositories, or on a drive with the current module that consumes them.

You might want to do this when:

-   You want to make your own changes to an external module’s code, such as after forking and/or cloning it. For example, you might want to prepare a fix to the module, then send it as a pull request to the module’s developer.
-   You’re building a new module and haven’t yet published it, so it’s unavailable on a repository where the `go get` command can reach it.