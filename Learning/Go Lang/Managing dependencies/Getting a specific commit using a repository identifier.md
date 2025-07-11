#GoLang 
## Getting a specific commit using a repository identifier

You can use the `go get` command to add unpublished code for a module from a specific commit in its repository.

To do this, you use the `go get` command, specifying the code you want with an `@` sign. When you use `go get`, the command will add to your go.mod file a `require` directive that requires the external module, using a pseudo-version number based on details about the commit.

The following examples provide a few illustrations. These are based on a module whose source is in a git repository.

-   To get the module at a specific commit, append the form @_commithash_:
    
    ```
    $ go get example.com/theirmodule@4cf76c2
    ```
    
-   To get the module at a specific branch, append the form @_branchname_:
    
    ```
    $ go get example.com/theirmodule@bugfixes
    ```