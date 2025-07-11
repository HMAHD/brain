#GoLang 
## Locating and importing useful packages

You can search [pkg.go.dev](https://pkg.go.dev/) to find packages with functions you might find useful.

When you’ve found a package you want to use in your code, locate the package path at the top of the page and click the Copy path button to copy the path to your clipboard. In your own code, paste the path into an import statement, as in the following example:

```
import "rsc.io/quote"
```

After your code imports the package, enable dependency tracking and get the package’s code to compile with. For more, see [Enabling dependency tracking in your code](https://go.dev/doc/modules/managing-dependencies#enable_tracking) and [Adding a dependency](https://go.dev/doc/modules/managing-dependencies#adding_dependency).
