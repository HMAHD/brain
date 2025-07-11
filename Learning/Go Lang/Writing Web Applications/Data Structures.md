#GoLang 
## Data Structures

Let's start by defining the data structures. A wiki consists of a series of interconnected pages, each of which has a title and a body (the page content). Here, we define `Page` as a struct with two fields representing the title and body.

type Page struct {
    Title string
    Body  []byte
}

The type `[]byte` means "a `byte` slice". (See [Slices: usage and internals](https://go.dev/doc/articles/slices_usage_and_internals.html) for more on slices.) The `Body` element is a `[]byte` rather than `string` because that is the type expected by the `io` libraries we will use, as you'll see below.

The `Page` struct describes how page data will be stored in memory. But what about persistent storage? We can address that by creating a `save` method on `Page`:

func (p *Page) save() error {
    filename := p.Title + ".txt"
    return os.WriteFile(filename, p.Body, 0600)
}

This method's signature reads: "This is a method named `save` that takes as its receiver `p`, a pointer to `Page` . It takes no parameters, and returns a value of type `error`."

This method will save the `Page`'s `Body` to a text file. For simplicity, we will use the `Title` as the file name.

The `save` method returns an `error` value because that is the return type of `WriteFile` (a standard library function that writes a byte slice to a file). The `save` method returns the error value, to let the application handle it should anything go wrong while writing the file. If all goes well, `Page.save()` will return `nil` (the zero-value for pointers, interfaces, and some other types).

The octal integer literal `0600`, passed as the third parameter to `WriteFile`, indicates that the file should be created with read-write permissions for the current user only. (See the Unix man page `open(2)` for details.)

In addition to saving pages, we will want to load pages, too:

func loadPage(title string) *Page {
    filename := title + ".txt"
    body, _ := os.ReadFile(filename)
    return &Page{Title: title, Body: body}
}

The function `loadPage` constructs the file name from the title parameter, reads the file's contents into a new variable `body`, and returns a pointer to a `Page` literal constructed with the proper title and body values.

Functions can return multiple values. The standard library function `os.ReadFile` returns `[]byte` and `error`. In `loadPage`, error isn't being handled yet; the "blank identifier" represented by the underscore (`_`) symbol is used to throw away the error return value (in essence, assigning the value to nothing).

But what happens if `ReadFile` encounters an error? For example, the file might not exist. We should not ignore such errors. Let's modify the function to return `*Page` and `error`.

func loadPage(title string) (*Page, error) {
    filename := title + ".txt"
    body, err := os.ReadFile(filename)
    if err != nil {
        return nil, err
    }
    return &Page{Title: title, Body: body}, nil
}

Callers of this function can now check the second parameter; if it is `nil` then it has successfully loaded a Page. If not, it will be an `error` that can be handled by the caller (see the [language specification](https://go.dev/ref/spec#Errors) for details).

At this point we have a simple data structure and the ability to save to and load from a file. Let's write a `main` function to test what we've written:

func main() {
    p1 := &Page{Title: "TestPage", Body: []byte("This is a sample Page.")}
    p1.save()
    p2, _ := loadPage("TestPage")
    fmt.Println(string(p2.Body))
}

After compiling and executing this code, a file named `TestPage.txt` would be created, containing the contents of `p1`. The file would then be read into the struct `p2`, and its `Body` element printed to the screen.

You can compile and run the program like this:

$ go build wiki.go
$ ./wiki
This is a sample Page.

(If you're using Windows you must type "`wiki`" without the "`./`" to run the program.)

[Click here to view the code we've written so far.](https://go.dev/doc/articles/wiki/part1.go)