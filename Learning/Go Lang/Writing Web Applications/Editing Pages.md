#GoLang 
## Editing Pages

A wiki is not a wiki without the ability to edit pages. Let's create two new handlers: one named `editHandler` to display an 'edit page' form, and the other named `saveHandler` to save the data entered via the form.

First, we add them to `main()`:

func main() {
    http.HandleFunc("/view/", viewHandler)
    http.HandleFunc("/edit/", editHandler)
    http.HandleFunc("/save/", saveHandler)
    log.Fatal(http.ListenAndServe(":8080", nil))
}

The function `editHandler` loads the page (or, if it doesn't exist, create an empty `Page` struct), and displays an HTML form.

func editHandler(w http.ResponseWriter, r *http.Request) {
    title := r.URL.Path[len("/edit/"):]
    p, err := loadPage(title)
    if err != nil {
        p = &Page{Title: title}
    }
    fmt.Fprintf(w, "<h1>Editing %s</h1>"+
        "<form action=\"/save/%s\" method=\"POST\">"+
        "<textarea name=\"body\">%s</textarea><br>"+
        "<input type=\"submit\" value=\"Save\">"+
        "</form>",
        p.Title, p.Title, p.Body)
}

This function will work fine, but all that hard-coded HTML is ugly. Of course, there is a better way.