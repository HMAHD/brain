#GoLang 
## Runtime statistics and events

The runtime provides stats and reporting of internal events for users to diagnose performance and utilization problems at the runtime level.

Users can monitor these stats to better understand the overall health and performance of Go programs. Some frequently monitored stats and states:

-   `[runtime.ReadMemStats](https://go.dev/pkg/runtime/#ReadMemStats)` reports the metrics related to heap allocation and garbage collection. Memory stats are useful for monitoring how much memory resources a process is consuming, whether the process can utilize memory well, and to catch memory leaks.
-   `[debug.ReadGCStats](https://go.dev/pkg/runtime/debug/#ReadGCStats)` reads statistics about garbage collection. It is useful to see how much of the resources are spent on GC pauses. It also reports a timeline of garbage collector pauses and pause time percentiles.
-   `[debug.Stack](https://go.dev/pkg/runtime/debug/#Stack)` returns the current stack trace. Stack trace is useful to see how many goroutines are currently running, what they are doing, and whether they are blocked or not.
-   `[debug.WriteHeapDump](https://go.dev/pkg/runtime/debug/#WriteHeapDump)` suspends the execution of all goroutines and allows you to dump the heap to a file. A heap dump is a snapshot of a Go process' memory at a given time. It contains all allocated objects as well as goroutines, finalizers, and more.
-   `[runtime.NumGoroutine](https://go.dev/pkg/runtime#NumGoroutine)` returns the number of current goroutines. The value can be monitored to see whether enough goroutines are utilized, or to detect goroutine leaks.