#GoLang 
## Introducing the `net/http` package (an interlude)

Here's a full working example of a simple web server:

//go:build ignore

package main

import (
    "fmt"
    "log"
    "net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Hi there, I love %s!", r.URL.Path[1:])
}

func main() {
    http.HandleFunc("/", handler)
    log.Fatal(http.ListenAndServe(":8080", nil))
}

The `main` function begins with a call to `http.HandleFunc`, which tells the `http` package to handle all requests to the web root (`"/"`) with `handler`.

It then calls `http.ListenAndServe`, specifying that it should listen on port 8080 on any interface (`":8080"`). (Don't worry about its second parameter, `nil`, for now.) This function will block until the program is terminated.

`ListenAndServe` always returns an error, since it only returns when an unexpected error occurs. In order to log that error we wrap the function call with `log.Fatal`.

The function `handler` is of the type `http.HandlerFunc`. It takes an `http.ResponseWriter` and an `http.Request` as its arguments.

An `http.ResponseWriter` value assembles the HTTP server's response; by writing to it, we send data to the HTTP client.

An `http.Request` is a data structure that represents the client HTTP request. `r.URL.Path` is the path component of the request URL. The trailing `[1:]` means "create a sub-slice of `Path` from the 1st character to the end." This drops the leading "/" from the path name.

If you run this program and access the URL:

http://localhost:8080/monkeys

the program would present a page containing:

Hi there, I love monkeys!