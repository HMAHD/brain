#GoLang 
## Tracing

Tracing is a way to instrument code to analyze latency throughout the lifecycle of a chain of calls. Go provides [golang.org/x/net/trace](https://godoc.org/golang.org/x/net/trace) package as a minimal tracing backend per Go node and provides a minimal instrumentation library with a simple dashboard. Go also provides an execution tracer to trace the runtime events within an interval.

Tracing enables us to:

-   Instrument and analyze application latency in a Go process.
-   Measure the cost of specific calls in a long chain of calls.
-   Figure out the utilization and performance improvements. Bottlenecks are not always obvious without tracing data.

In monolithic systems, it's relatively easy to collect diagnostic data from the building blocks of a program. All modules live within one process and share common resources to report logs, errors, and other diagnostic information. Once your system grows beyond a single process and starts to become distributed, it becomes harder to follow a call starting from the front-end web server to all of its back-ends until a response is returned back to the user. This is where distributed tracing plays a big role to instrument and analyze your production systems.

Distributed tracing is a way to instrument code to analyze latency throughout the lifecycle of a user request. When a system is distributed and when conventional profiling and debugging tools don’t scale, you might want to use distributed tracing tools to analyze the performance of your user requests and RPCs.

Distributed tracing enables us to:

-   Instrument and profile application latency in a large system.
-   Track all RPCs within the lifecycle of a user request and see integration issues that are only visible in production.
-   Figure out performance improvements that can be applied to our systems. Many bottlenecks are not obvious before the collection of tracing data.

The Go ecosystem provides various distributed tracing libraries per tracing system and backend-agnostic ones.

**Is there a way to automatically intercept each function call and create traces?**

Go doesn’t provide a way to automatically intercept every function call and create trace spans. You need to manually instrument your code to create, end, and annotate spans.

**How should I propagate trace headers in Go libraries?**

You can propagate trace identifiers and tags in the [`context.Context`](https://go.dev/pkg/context#Context). There is no canonical trace key or common representation of trace headers in the industry yet. Each tracing provider is responsible for providing propagation utilities in their Go libraries.

**What other low-level events from the standard library or runtime can be included in a trace?**

The standard library and runtime are trying to expose several additional APIs to notify on low level internal events. For example, [`httptrace.ClientTrace`](https://go.dev/pkg/net/http/httptrace#ClientTrace) provides APIs to follow low-level events in the life cycle of an outgoing request. There is an ongoing effort to retrieve low-level runtime events from the runtime execution tracer and allow users to define and record their user events.