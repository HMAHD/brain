#GoLang 
## Handling non-existent pages

What if you visit [`/view/APageThatDoesntExist`](http://localhost:8080/view/APageThatDoesntExist)? You'll see a page containing HTML. This is because it ignores the error return value from `loadPage` and continues to try and fill out the template with no data. Instead, if the requested Page doesn't exist, it should redirect the client to the edit Page so the content may be created:

func viewHandler(w http.ResponseWriter, r *http.Request) {
    title := r.URL.Path[len("/view/"):]
    p, err := loadPage(title)
    if err != nil {
        http.Redirect(w, r, "/edit/"+title, http.StatusFound)
        return
    }
    renderTemplate(w, "view", p)
}

The `http.Redirect` function adds an HTTP status code of `http.StatusFound` (302) and a `Location` header to the HTTP response.
