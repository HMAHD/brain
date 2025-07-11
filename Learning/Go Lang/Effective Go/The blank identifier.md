#GoLang 
## The blank identifier

We've mentioned the blank identifier a couple of times now, in the context of [`for` `range` loops](https://go.dev/doc/effective_go#for) and [maps](https://go.dev/doc/effective_go#maps). The blank identifier can be assigned or declared with any value of any type, with the value discarded harmlessly. It's a bit like writing to the Unix `/dev/null` file: it represents a write-only value to be used as a place-holder where a variable is needed but the actual value is irrelevant. It has uses beyond those we've seen already.