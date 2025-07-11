#GoLang 
## Specifying a module proxy server

When you use Go tools to work with modules, the tools by default download modules from proxy.golang.org (a public Google-run module mirror) or directly from the module’s repository. You can specify that Go tools should instead use another proxy server for downloading and authenticating modules.

You might want to do this if you (or your team) have set up or chosen a different module proxy server that you want to use. For example, some set up a module proxy server in order to have greater control over how dependencies are used.

To specify another module proxy server for Go tools use, set the `GOPROXY` environment variable to the URL of one or more servers. Go tools will try each URL in the order you specify. By default, `GOPROXY` specifies a public Google-run module proxy first, then direct download from the module’s repository (as specified in its module path):

```
GOPROXY="https://proxy.golang.org,direct"
```

For more about the `GOPROXY` environment variable, including values to support other behavior, see the [`go` command reference](https://go.dev/cmd/go/#hdr-Module_downloading_and_verification).

You can set the variable to URLs for other module proxy servers, separating URLs with either a comma or a pipe.

-   When you use a comma, Go tools will try the next URL in the list only if the current URL returns an HTTP 404 or 410.
    
    ```
    GOPROXY="https://proxy.example.com,https://proxy2.example.com"
    ```
    
-   When you use a pipe, Go tools will try the next URL in the list regardless of the HTTP error code.
    
    ```
    GOPROXY="https://proxy.example.com|https://proxy2.example.com"
    ```
    

Go modules are frequently developed and distributed on version control servers and module proxies that aren’t available on the public internet. You can set the `GOPRIVATE` environment variables. You can set the `GOPRIVATE` environment variable to configure the `go` command to download and build modules from private sources. Then the go command can download and build modules from private sources.

The `GOPRIVATE` or `GONOPROXY` environment variables may be set to lists of glob patterns matching module prefixes that are private and should not be requested from any proxy. For example:

```
GOPRIVATE=*.corp.example.com,*.research.example.com
```