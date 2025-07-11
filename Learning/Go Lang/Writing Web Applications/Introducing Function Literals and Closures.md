#GoLang 
## Introducing Function Literals and Closures

Catching the error condition in each handler introduces a lot of repeated code. What if we could wrap each of the handlers in a function that does this validation and error checking? Go's [function literals](https://go.dev/ref/spec#Function_literals) provide a powerful means of abstracting functionality that can help us here.

First, we re-write the function definition of each of the handlers to accept a title string:

func viewHandler(w http.ResponseWriter, r *http.Request, title string)
func editHandler(w http.ResponseWriter, r *http.Request, title string)
func saveHandler(w http.ResponseWriter, r *http.Request, title string)

Now let's define a wrapper function that _takes a function of the above type_, and returns a function of type `http.HandlerFunc` (suitable to be passed to the function `http.HandleFunc`):

func makeHandler(fn func (http.ResponseWriter, *http.Request, string)) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Here we will extract the page title from the Request,
		// and call the provided handler 'fn'
	}
}

The returned function is called a closure because it encloses values defined outside of it. In this case, the variable `fn` (the single argument to `makeHandler`) is enclosed by the closure. The variable `fn` will be one of our save, edit, or view handlers.

Now we can take the code from `getTitle` and use it here (with some minor modifications):

func makeHandler(fn func(http.ResponseWriter, *http.Request, string)) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        m := validPath.FindStringSubmatch(r.URL.Path)
        if m == nil {
            http.NotFound(w, r)
            return
        }
        fn(w, r, m[2])
    }
}

The closure returned by `makeHandler` is a function that takes an `http.ResponseWriter` and `http.Request` (in other words, an `http.HandlerFunc`). The closure extracts the `title` from the request path, and validates it with the `validPath` regexp. If the `title` is invalid, an error will be written to the `ResponseWriter` using the `http.NotFound` function. If the `title` is valid, the enclosed handler function `fn` will be called with the `ResponseWriter`, `Request`, and `title` as arguments.

Now we can wrap the handler functions with `makeHandler` in `main`, before they are registered with the `http` package:

func main() {
    http.HandleFunc("/view/", makeHandler(viewHandler))
    http.HandleFunc("/edit/", makeHandler(editHandler))
    http.HandleFunc("/save/", makeHandler(saveHandler))

    log.Fatal(http.ListenAndServe(":8080", nil))
}

Finally we remove the calls to `getTitle` from the handler functions, making them much simpler:

func viewHandler(w http.ResponseWriter, r *http.Request, title string) {
    p, err := loadPage(title)
    if err != nil {
        http.Redirect(w, r, "/edit/"+title, http.StatusFound)
        return
    }
    renderTemplate(w, "view", p)
}

func editHandler(w http.ResponseWriter, r *http.Request, title string) {
    p, err := loadPage(title)
    if err != nil {
        p = &Page{Title: title}
    }
    renderTemplate(w, "edit", p)
}

func saveHandler(w http.ResponseWriter, r *http.Request, title string) {
    body := r.FormValue("body")
    p := &Page{Title: title, Body: []byte(body)}
    err := p.save()
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    http.Redirect(w, r, "/view/"+title, http.StatusFound)
}