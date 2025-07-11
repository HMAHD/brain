#GoLang 
## Running fuzz tests

There are two modes of running your fuzz test: as a unit test (default `go test`), or with fuzzing (`go test -fuzz=FuzzTestName`).

Fuzz tests are run much like a unit test by default. Each [seed corpus entry](https://go.dev/doc/fuzz/#glos-seed-corpus) will be tested against the fuzz target, reporting any failures before exiting.

To enable fuzzing, run `go test` with the `-fuzz` flag, providing a regex matching a single fuzz test. By default, all other tests in that package will run before fuzzing begins. This is to ensure that fuzzing won’t report any issues that would already be caught by an existing test.

Note that it is up to you to decide how long to run fuzzing. It is very possible that an execution of fuzzing could run indefinitely if it doesn’t find any errors. There will be support to run these fuzz tests continuously using tools like OSS-Fuzz in the future, see [Issue #50192](https://github.com/golang/go/issues/50192).

**Note:** Fuzzing should be run on a platform that supports coverage instrumentation (currently AMD64 and ARM64) so that the corpus can meaningfully grow as it runs, and more code can be covered while fuzzing.
