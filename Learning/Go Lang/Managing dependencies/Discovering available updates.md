#GoLang 
## Discovering available updates

You can check to see if there are newer versions of dependencies you’re already using in your current module. Use the `go list` command to display a list of your module’s dependencies, along with the latest version available for that module. Once you’ve discovered available upgrades, you can try them out with your code to decide whether or not to upgrade to new versions.

For more about the `go list` command, see [`go list -m`](https://go.dev/ref/mod#go-list-m).

Here are a couple of examples.

-   List all of the modules that are dependencies of your current module, along with the latest version available for each:
    
    ```
    $ go list -m -u all
    ```
    
-   Display the latest version available for a specific module:
    
    ```
    $ go list -m -u example.com/theirmodule
    ```