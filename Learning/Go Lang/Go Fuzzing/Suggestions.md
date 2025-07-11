#GoLang 
### Suggestions

Below are suggestions that will help you get the most out of fuzzing.

-   Fuzz targets should be fast and deterministic so the fuzzing engine can work efficiently, and new failures and code coverage can be easily reproduced.
-   Since the fuzz target is invoked in parallel across multiple workers and in nondeterministic order, the state of a fuzz target should not persist past the end of each call, and the behavior of a fuzz target should not depend on global state.