#GoLang 
## Saving Pages

The function `saveHandler` will handle the submission of forms located on the edit pages. After uncommenting the related line in `main`, let's implement the handler:

func saveHandler(w http.ResponseWriter, r *http.Request) {
    title := r.URL.Path[len("/save/"):]
    body := r.FormValue("body")
    p := &Page{Title: title, Body: []byte(body)}
    p.save()
    http.Redirect(w, r, "/view/"+title, http.StatusFound)
}

The page title (provided in the URL) and the form's only field, `Body`, are stored in a new `Page`. The `save()` method is then called to write the data to a file, and the client is redirected to the `/view/` page.

The value returned by `FormValue` is of type `string`. We must convert that value to `[]byte` before it will fit into the `Page` struct. We use `[]byte(body)` to perform the conversion.