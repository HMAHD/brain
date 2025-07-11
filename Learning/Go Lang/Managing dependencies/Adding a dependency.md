#GoLang 
## Adding a dependency

Once you’re importing packages from a published module, you can add that module to manage as a dependency by using the [`go get` command](https://go.dev/cmd/go/#hdr-Add_dependencies_to_current_module_and_install_them).

The command does the following:

-   If needed, it adds `require` directives to your go.mod file for modules needed to build packages named on the command line. A `require` directive tracks the minimum version of a module that your module depends on. See the [go.mod reference](https://go.dev/doc/modules/gomod-ref) for more.
    
-   If needed, it downloads module source code so you can compile packages that depend on them. It can download modules from a module proxy like proxy.golang.org or directly from version control repositories. The source is cached locally.
    
    You can set the location from which Go tools download modules. For more, see [Specifying a module proxy server](https://go.dev/doc/modules/managing-dependencies#proxy_server).
    

The following describes a few examples.

-   To add all dependencies for a package in your module, run a command like the one below ("." refers to the package in the current directory):
    
    ```
    $ go get .
    ```
    
-   To add a specific dependency, specify its module path as an argument to the command.
    
    ```
    $ go get example.com/theirmodule
    ```
    

The command also authenticates each module it downloads. This ensures that it’s unchanged from when the module was published. If the module has changed since it was published – for example, the developer changed the contents of the commit – Go tools will present a security error. This authentication check protects you from modules that might have been tampered with.