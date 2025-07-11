#GoLang 
### Variables

Variables can be initialized just like constants but the initializer can be a general expression computed at run time.

var (
    home   = os.Getenv("HOME")
    user   = os.Getenv("USER")
    gopath = os.Getenv("GOPATH")
)