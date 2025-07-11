#GoLang 
### Execution tracer

Go comes with a runtime execution tracer to capture a wide range of runtime events. Scheduling, syscall, garbage collections, heap size, and other events are collected by runtime and available for visualization by the go tool trace. Execution tracer is a tool to detect latency and utilization problems. You can examine how well the CPU is utilized, and when networking or syscalls are a cause of preemption for the goroutines.

Tracer is useful to:

-   Understand how your goroutines execute.
-   Understand some of the core runtime events such as GC runs.
-   Identify poorly parallelized execution.

However, it is not great for identifying hot spots such as analyzing the cause of excessive memory or CPU usage. Use profiling tools instead first to address them.

![](https://storage.googleapis.com/golangorg-assets/tracer-lock.png)

Above, the go tool trace visualization shows the execution started fine, and then it became serialized. It suggests that there might be lock contention for a shared resource that creates a bottleneck.

See [`go` `tool` `trace`](https://go.dev/cmd/trace/) to collect and analyze runtime traces.