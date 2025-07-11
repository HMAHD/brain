#GoLang 
## Using `net/http` to serve wiki pages

To use the `net/http` package, it must be imported:

import (
	"fmt"
	"os"
	"log"
	**"net/http"**
)

Let's create a handler, `viewHandler` that will allow users to view a wiki page. It will handle URLs prefixed with "/view/".

func viewHandler(w http.ResponseWriter, r *http.Request) {
    title := r.URL.Path[len("/view/"):]
    p, _ := loadPage(title)
    fmt.Fprintf(w, "<h1>%s</h1><div>%s</div>", p.Title, p.Body)
}

Again, note the use of `_` to ignore the `error` return value from `loadPage`. This is done here for simplicity and generally considered bad practice. We will attend to this later.

First, this function extracts the page title from `r.URL.Path`, the path component of the request URL. The `Path` is re-sliced with `[len("/view/"):]` to drop the leading `"/view/"` component of the request path. This is because the path will invariably begin with `"/view/"`, which is not part of the page's title.

The function then loads the page data, formats the page with a string of simple HTML, and writes it to `w`, the `http.ResponseWriter`.

To use this handler, we rewrite our `main` function to initialize `http` using the `viewHandler` to handle any requests under the path `/view/`.

func main() {
    http.HandleFunc("/view/", viewHandler)
    log.Fatal(http.ListenAndServe(":8080", nil))
}

[Click here to view the code we've written so far.](https://go.dev/doc/articles/wiki/part2.go)

Let's create some page data (as `test.txt`), compile our code, and try serving a wiki page.

Open `test.txt` file in your editor, and save the string "Hello world" (without quotes) in it.

$ go build wiki.go
$ ./wiki

(If you're using Windows you must type "`wiki`" without the "`./`" to run the program.)

With this web server running, a visit to `[http://localhost:8080/view/test](http://localhost:8080/view/test)` should show a page titled "test" containing the words "Hello world".