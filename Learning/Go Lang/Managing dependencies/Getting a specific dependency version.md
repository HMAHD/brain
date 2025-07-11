#GoLang 
## Getting a specific dependency version

You can get a specific version of a dependency module by specifying its version in the `go get` command. The command updates the `require` directive in your go.mod file (though you can also update that manually).

You might want to do this if:

-   You want to get a specific pre-release version of a module to try out.
-   You’ve discovered that the version you’re currently requiring isn’t working for you, so you want to get a version you know you can rely on.
-   You want to upgrade or downgrade a module you’re already requiring.

Here are examples for using the [`go get` command](https://go.dev/ref/mod#go-get):

-   To get a specific numbered version, append the module path with an @ sign followed by the version you want:
    
    ```
    $ go get example.com/theirmodule@v1.3.4
    ```
    
-   To get the latest version, append the module path with `@latest`:
    
    ```
    $ go get example.com/theirmodule@latest
    ```
    

The following go.mod file `require` directive example (see the [go.mod reference]/doc/modules/gomod-ref) for more) illustrates how to require a specific version number:

```
require example.com/theirmodule v1.3.4
```
