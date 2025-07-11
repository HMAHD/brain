#GoLang 
## Errors

Library routines must often return some sort of error indication to the caller. As mentioned earlier, Go's multivalue return makes it easy to return a detailed error description alongside the normal return value. It is good style to use this feature to provide detailed error information. For example, as we'll see, `os.Open` doesn't just return a `nil` pointer on failure, it also returns an error value that describes what went wrong.

By convention, errors have type `error`, a simple built-in interface.

type error interface {
    Error() string
}

A library writer is free to implement this interface with a richer model under the covers, making it possible not only to see the error but also to provide some context. As mentioned, alongside the usual `*os.File` return value, `os.Open` also returns an error value. If the file is opened successfully, the error will be `nil`, but when there is a problem, it will hold an `os.PathError`:

// PathError records an error and the operation and
// file path that caused it.
type PathError struct {
    Op string    // "open", "unlink", etc.
    Path string  // The associated file.
    Err error    // Returned by the system call.
}

func (e *PathError) Error() string {
    return e.Op + " " + e.Path + ": " + e.Err.Error()
}

`PathError`'s `Error` generates a string like this:

open /etc/passwx: no such file or directory

Such an error, which includes the problematic file name, the operation, and the operating system error it triggered, is useful even if printed far from the call that caused it; it is much more informative than the plain "no such file or directory".

When feasible, error strings should identify their origin, such as by having a prefix naming the operation or package that generated the error. For example, in package `image`, the string representation for a decoding error due to an unknown format is "image: unknown format".

Callers that care about the precise error details can use a type switch or a type assertion to look for specific errors and extract details. For `PathErrors` this might include examining the internal `Err` field for recoverable failures.

for try := 0; try < 2; try++ {
    file, err = os.Create(filename)
    if err == nil {
        return
    }
    if e, ok := err.(*os.PathError); ok && e.Err == syscall.ENOSPC {
        deleteTempFiles()  // Recover some space.
        continue
    }
    return
}

The second `if` statement here is another [type assertion](https://go.dev/doc/effective_go#interface_conversions). If it fails, `ok` will be false, and `e` will be `nil`. If it succeeds, `ok` will be true, which means the error was of type `*os.PathError`, and then so is `e`, which we can examine for more information about the error.