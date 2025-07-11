#GoLang 
## Template caching

There is an inefficiency in this code: `renderTemplate` calls `ParseFiles` every time a page is rendered. A better approach would be to call `ParseFiles` once at program initialization, parsing all templates into a single `*Template`. Then we can use the [`ExecuteTemplate`](https://go.dev/pkg/html/template/#Template.ExecuteTemplate) method to render a specific template.

First we create a global variable named `templates`, and initialize it with `ParseFiles`.

var templates = template.Must(template.ParseFiles("edit.html", "view.html"))

The function `template.Must` is a convenience wrapper that panics when passed a non-nil `error` value, and otherwise returns the `*Template` unaltered. A panic is appropriate here; if the templates can't be loaded the only sensible thing to do is exit the program.

The `ParseFiles` function takes any number of string arguments that identify our template files, and parses those files into templates that are named after the base file name. If we were to add more templates to our program, we would add their names to the `ParseFiles` call's arguments.

We then modify the `renderTemplate` function to call the `templates.ExecuteTemplate` method with the name of the appropriate template:

func renderTemplate(w http.ResponseWriter, tmpl string, p *Page) {
    err := templates.ExecuteTemplate(w, tmpl+".html", p)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
    }
}

Note that the template name is the template file name, so we must append `".html"` to the `tmpl` argument.