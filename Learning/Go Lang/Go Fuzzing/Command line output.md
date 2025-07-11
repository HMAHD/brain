#GoLang 
### Command line output

While fuzzing is in progress, the [fuzzing engine](https://go.dev/doc/fuzz/#glos-fuzzing-engine) generates new inputs and runs them against the provided fuzz target. By default, it continues to run until a [failing input](https://go.dev/doc/fuzz/#glos-failing-input) is found, or the user cancels the process (e.g. with Ctrl^C).

The output will look something like this:

```
~ go test -fuzz FuzzFoo
fuzz: elapsed: 0s, gathering baseline coverage: 0/192 completed
fuzz: elapsed: 0s, gathering baseline coverage: 192/192 completed, now fuzzing with 8 workers
fuzz: elapsed: 3s, execs: 325017 (108336/sec), new interesting: 11 (total: 202)
fuzz: elapsed: 6s, execs: 680218 (118402/sec), new interesting: 12 (total: 203)
fuzz: elapsed: 9s, execs: 1039901 (119895/sec), new interesting: 19 (total: 210)
fuzz: elapsed: 12s, execs: 1386684 (115594/sec), new interesting: 21 (total: 212)
PASS
ok      foo 12.692s
```

The first lines indicate that the “baseline coverage” is gathered before fuzzing begins.

To gather baseline coverage, the fuzzing engine executes both the [seed corpus](https://go.dev/doc/fuzz/#glos-seed-corpus) and the [generated corpus](https://go.dev/doc/fuzz/#generated-corpus), to ensure that no errors occurred and to understand the code coverage the existing corpus already provides.

The lines following provide insight into the active fuzzing execution:

-   elapsed: the amount of time that has elapsed since the process began
-   execs: the total number of inputs that have been run against the fuzz target (with an average execs/sec since the last log line)
-   new interesting: the total number of “interesting” inputs that have been added to the generated corpus during this fuzzing execution (with the total size of the entire corpus)

For an input to be “interesting”, it must expand the code coverage beyond what the existing generated corpus can reach. It’s typical for the number of new interesting inputs to grow quickly at the start and eventually slow down, with occasional bursts as new branches are discovered.

You should expect to see the “new intesting” number taper off over time as the inputs in the corpus begin to cover more lines of the code, with occasional bursts if the fuzzing engine finds a new code path.