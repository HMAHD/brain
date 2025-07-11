#GoLang 
## Error handling

There are several places in our program where errors are being ignored. This is bad practice, not least because when an error does occur the program will have unintended behavior. A better solution is to handle the errors and return an error message to the user. That way if something does go wrong, the server will function exactly how we want and the user can be notified.

First, let's handle the errors in `renderTemplate`:

func renderTemplate(w http.ResponseWriter, tmpl string, p *Page) {
    t, err := template.ParseFiles(tmpl + ".html")
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    err = t.Execute(w, p)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
    }
}

The `http.Error` function sends a specified HTTP response code (in this case "Internal Server Error") and error message. Already the decision to put this in a separate function is paying off.

Now let's fix up `saveHandler`:

func saveHandler(w http.ResponseWriter, r *http.Request) {
    title := r.URL.Path[len("/save/"):]
    body := r.FormValue("body")
    p := &Page{Title: title, Body: []byte(body)}
    err := p.save()
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    http.Redirect(w, r, "/view/"+title, http.StatusFound)
}

Any errors that occur during `p.save()` will be reported to the user.