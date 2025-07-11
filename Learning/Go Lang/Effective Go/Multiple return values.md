#GoLang 
### Multiple return values

One of Go's unusual features is that functions and methods can return multiple values. This form can be used to improve on a couple of clumsy idioms in C programs: in-band error returns such as `-1` for `EOF` and modifying an argument passed by address.

In C, a write error is signaled by a negative count with the error code secreted away in a volatile location. In Go, `Write` can return a count _and_ an error: “Yes, you wrote some bytes but not all of them because you filled the device”. The signature of the `Write` method on files from package `os` is:

func (file *File) Write(b []byte) (n int, err error)

and as the documentation says, it returns the number of bytes written and a non-nil `error` when `n` `!=` `len(b)`. This is a common style; see the section on error handling for more examples.

A similar approach obviates the need to pass a pointer to a return value to simulate a reference parameter. Here's a simple-minded function to grab a number from a position in a byte slice, returning the number and the next position.
```go
func nextInt(b []byte, i int) (int, int) {
    for ; i < len(b) && !isDigit(b[i]); i++ {
    }
    x := 0
    for ; i < len(b) && isDigit(b[i]); i++ {
        x = x*10 + int(b[i]) - '0'
    }
    return x, i
}
```

You could use it to scan the numbers in an input slice `b` like this:
```go
    for i := 0; i < len(b); {
        x, i = nextInt(b, i)
        fmt.Println(x)
    }
```
