#GoLang 
## Getting Started

At present, you need to have a FreeBSD, Linux, macOS, or Windows machine to run Go. We will use `$` to represent the command prompt.

Install Go (see the [Installation Instructions](https://go.dev/doc/install)).

Make a new directory for this tutorial inside your `GOPATH` and cd to it:

$ mkdir gowiki
$ cd gowiki

Create a file named `wiki.go`, open it in your favorite editor, and add the following lines:

package main

import (
	"fmt"
	"os"
)

We import the `fmt` and `os` packages from the Go standard library. Later, as we implement additional functionality, we will add more packages to this `import` declaration.