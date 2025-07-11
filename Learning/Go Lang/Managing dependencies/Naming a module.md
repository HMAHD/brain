#GoLang 
## Naming a module

When you run `go mod init` to create a module for tracking dependencies, you specify a module path that serves as the module’s name. The module path becomes the import path prefix for packages in the module. Be sure to specify a module path that won’t conflict with the module path of other modules.

At a minimum, a module path need only indicate something about its origin, such as a company or author or owner name. But the path might also be more descriptive about what the module is or does.

The module path is typically of the following form:

```
<prefix>/<descriptive-text>
```

-   The _prefix_ is typically a string that partially describes the module, such as a string that describes its origin. This might be:
    
    -   The location of the repository where Go tools can find the module’s source code (required if you’re publishing the module).
        
        For example, it might be `github.com/<project-name>/`.
        
        Use this best practice if you think you might publish the module for others to use. For more about publishing, see [Developing and publishing modules](https://go.dev/doc/modules/developing).
        
    -   A name you control.
        
        If you’re not using a repository name, be sure to choose a prefix that you’re confident won’t be used by others. A good choice is your company’s name. Avoid common terms such as `widgets`, `utilities`, or `app`.
        
-   For the _descriptive text_, a good choice would be a project name. Remember that package names carry most of the weight of describing functionality. The module path creates a namespace for those package names.
    

**Reserved module path prefixes**

Go guarantees that the following strings won’t be used in package names.

-   `test` – You can use `test` as a module path prefix for a module whose code is designed to locally test functions in another module.
    
    Use the `test` path prefix for modules that are created as part of a test. For example, your test itself might run `go mod init test` and then set up that module in some particular way in order to test with a Go source code analysis tool.
    
-   `example` – Used as a module path prefix in some Go documentation, such as in tutorials where you’re creating a module just to track dependencies.
    
    Note that Go documentation also uses `example.com` to illustrate when the example might be a published module.