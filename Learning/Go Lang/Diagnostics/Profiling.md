#GoLang 
## Profiling

Profiling is useful for identifying expensive or frequently called sections of code. The Go runtime provides [profiling data](https://go.dev/pkg/runtime/pprof/) in the format expected by the [pprof visualization tool](https://github.com/google/pprof/blob/master/doc/README.md). The profiling data can be collected during testing via `go` `test` or endpoints made available from the [net/http/pprof](https://go.dev/pkg/net/http/pprof/) package. Users need to collect the profiling data and use pprof tools to filter and visualize the top code paths.

Predefined profiles provided by the [runtime/pprof](https://go.dev/pkg/runtime/pprof) package:

-   **cpu**: CPU profile determines where a program spends its time while actively consuming CPU cycles (as opposed to while sleeping or waiting for I/O).
-   **heap**: Heap profile reports memory allocation samples; used to monitor current and historical memory usage, and to check for memory leaks.
-   **threadcreate**: Thread creation profile reports the sections of the program that lead the creation of new OS threads.
-   **goroutine**: Goroutine profile reports the stack traces of all current goroutines.
-   **block**: Block profile shows where goroutines block waiting on synchronization primitives (including timer channels). Block profile is not enabled by default; use `runtime.SetBlockProfileRate` to enable it.
-   **mutex**: Mutex profile reports the lock contentions. When you think your CPU is not fully utilized due to a mutex contention, use this profile. Mutex profile is not enabled by default, see `runtime.SetMutexProfileFraction` to enable it.

**What other profilers can I use to profile Go programs?**

On Linux, [perf tools](https://perf.wiki.kernel.org/index.php/Tutorial) can be used for profiling Go programs. Perf can profile and unwind cgo/SWIG code and kernel, so it can be useful to get insights into native/kernel performance bottlenecks. On macOS, [Instruments](https://developer.apple.com/library/content/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/) suite can be used profile Go programs.

**Can I profile my production services?**

Yes. It is safe to profile programs in production, but enabling some profiles (e.g. the CPU profile) adds cost. You should expect to see performance downgrade. The performance penalty can be estimated by measuring the overhead of the profiler before turning it on in production.

You may want to periodically profile your production services. Especially in a system with many replicas of a single process, selecting a random replica periodically is a safe option. Select a production process, profile it for X seconds for every Y seconds and save the results for visualization and analysis; then repeat periodically. Results may be manually and/or automatically reviewed to find problems. Collection of profiles can interfere with each other, so it is recommended to collect only a single profile at a time.

**What are the best ways to visualize the profiling data?**

The Go tools provide text, graph, and [callgrind](http://valgrind.org/docs/manual/cl-manual.html) visualization of the profile data using `[go tool pprof](https://github.com/google/pprof/blob/master/doc/README.md)`. Read [Profiling Go programs](https://blog.golang.org/profiling-go-programs) to see them in action.

![](https://storage.googleapis.com/golangorg-assets/pprof-text.png)  
Listing of the most expensive calls as text.

![](https://storage.googleapis.com/golangorg-assets/pprof-dot.png)  
Visualization of the most expensive calls as a graph.

Weblist view displays the expensive parts of the source line by line in an HTML page. In the following example, 530ms is spent in the `runtime.concatstrings` and cost of each line is presented in the listing.

![](https://storage.googleapis.com/golangorg-assets/pprof-weblist.png)  
Visualization of the most expensive calls as weblist.

Another way to visualize profile data is a [flame graph](http://www.brendangregg.com/flamegraphs.html). Flame graphs allow you to move in a specific ancestry path, so you can zoom in/out of specific sections of code. The [upstream pprof](https://github.com/google/pprof) has support for flame graphs.

![](https://storage.googleapis.com/golangorg-assets/flame.png)  
Flame graphs offers visualization to spot the most expensive code-paths.

**Am I restricted to the built-in profiles?**

Additionally to what is provided by the runtime, Go users can create their custom profiles via [pprof.Profile](https://go.dev/pkg/runtime/pprof/#Profile) and use the existing tools to examine them.

**Can I serve the profiler handlers (/debug/pprof/...) on a different path and port?**

Yes. The `net/http/pprof` package registers its handlers to the default mux by default, but you can also register them yourself by using the handlers exported from the package.

For example, the following example will serve the pprof.Profile handler on :7777 at /custom_debug_path/profile:

package main

import (
	"log"
	"net/http"
	"net/http/pprof"
)

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/custom_debug_path/profile", pprof.Profile)
	log.Fatal(http.ListenAndServe(":7777", mux))
}