#GoLang 
### Interface checks

As we saw in the discussion of [interfaces](https://go.dev/doc/effective_go#interfaces_and_types) above, a type need not declare explicitly that it implements an interface. Instead, a type implements the interface just by implementing the interface's methods. In practice, most interface conversions are static and therefore checked at compile time. For example, passing an `*os.File` to a function expecting an `io.Reader` will not compile unless `*os.File` implements the `io.Reader` interface.

Some interface checks do happen at run-time, though. One instance is in the `[encoding/json](https://go.dev/pkg/encoding/json/)` package, which defines a `[Marshaler](https://go.dev/pkg/encoding/json/#Marshaler)` interface. When the JSON encoder receives a value that implements that interface, the encoder invokes the value's marshaling method to convert it to JSON instead of doing the standard conversion. The encoder checks this property at run time with a [type assertion](https://go.dev/doc/effective_go#interface_conversions) like:

m, ok := val.(json.Marshaler)

If it's necessary only to ask whether a type implements an interface, without actually using the interface itself, perhaps as part of an error check, use the blank identifier to ignore the type-asserted value:

if _, ok := val.(json.Marshaler); ok {
    fmt.Printf("value %v of type %T implements json.Marshaler\n", val, val)
}

One place this situation arises is when it is necessary to guarantee within the package implementing the type that it actually satisfies the interface. If a type—for example, `[json.RawMessage](https://go.dev/pkg/encoding/json/#RawMessage)`—needs a custom JSON representation, it should implement `json.Marshaler`, but there are no static conversions that would cause the compiler to verify this automatically. If the type inadvertently fails to satisfy the interface, the JSON encoder will still work, but will not use the custom implementation. To guarantee that the implementation is correct, a global declaration using the blank identifier can be used in the package:

var _ json.Marshaler = (*RawMessage)(nil)

In this declaration, the assignment involving a conversion of a `*RawMessage` to a `Marshaler` requires that `*RawMessage` implements `Marshaler`, and that property will be checked at compile time. Should the `json.Marshaler` interface change, this package will no longer compile and we will be on notice that it needs to be updated.

The appearance of the blank identifier in this construct indicates that the declaration exists only for the type checking, not to create a variable. Don't do this for every type that satisfies an interface, though. By convention, such declarations are only used when there are no static conversions already present in the code, which is a rare event.