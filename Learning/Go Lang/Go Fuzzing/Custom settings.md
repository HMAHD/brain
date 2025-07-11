#GoLang 
### Custom settings

The default go command settings should work for most use cases of fuzzing. So typically, an execution of fuzzing on the command line should look like this:

```
$ go test -fuzz={FuzzTestName}
```

However, the `go` command does provide a few settings when running fuzzing. These are documented in the [`cmd/go` package docs](https://pkg.go.dev/cmd/go).

To highlight a few:

-   `-fuzztime`: the total time or number of iterations that the fuzz target will be executed before exiting, default indefinitely.
-   `-fuzzminimizetime`: the time or number of iterations that the fuzz target will be executed during each minimization attempt, default 60sec. You can completely disable minimization by setting `-fuzzminimizetime 0` when fuzzing.
-   `-parallel`: the number of fuzzing processes running at once, default `$GOMAXPROCS`. Currently, setting -cpu during fuzzing has no effect.