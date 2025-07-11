#GoLang 
### GODEBUG

Runtime also emits events and information if [GODEBUG](https://go.dev/pkg/runtime/#hdr-Environment_Variables) environmental variable is set accordingly.

-   GODEBUG=gctrace=1 prints garbage collector events at each collection, summarizing the amount of memory collected and the length of the pause.
-   GODEBUG=inittrace=1 prints a summary of execution time and memory allocation information for completed package initialization work.
-   GODEBUG=schedtrace=X prints scheduling events every X milliseconds.

The GODEBUG environmental variable can be used to disable use of instruction set extensions in the standard library and runtime.

-   GODEBUG=cpu.all=off disables the use of all optional instruction set extensions.
-   GODEBUG=cpu._extension_=off disables use of instructions from the specified instruction set extension.  
    _extension_ is the lower case name for the instruction set extension such as _sse41_ or _avx_.