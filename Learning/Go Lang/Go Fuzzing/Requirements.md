#GoLang 
### Requirements

Below are rules that fuzz tests must follow.

-   A fuzz test must be a function named like `FuzzXxx`, which accepts only a `*testing.F`, and has no return value.
-   Fuzz tests must be in *_test.go files to run.
-   A [fuzz target](https://go.dev/doc/fuzz/#glos-fuzz-target) must be a method call to `[(*testing.F).Fuzz](https://pkg.go.dev/testing#F.Fuzz)` which accepts a `*testing.T` as the first parameter, followed by the fuzzing arguments. There is no return value.
-   There must be exactly one fuzz target per fuzz test.
-   All [seed corpus](https://go.dev/doc/fuzz/#glos-seed-corpus) entries must have types which are identical to the [fuzzing arguments](https://go.dev/doc/fuzz/#fuzzing-arguments), in the same order. This is true for calls to `[(*testing.F).Add](https://pkg.go.dev/testing#F.Add)` and any corpus files in the testdata/fuzz directory of the fuzz test.
-   The fuzzing arguments can only be the following types:
    -   `string`, `[]byte`
    -   `int`, `int8`, `int16`, `int32`/`rune`, `int64`
    -   `uint`, `uint8`/`byte`, `uint16`, `uint32`, `uint64`
    -   `float32`, `float64`
    -   `bool`