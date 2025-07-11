#GoLang 
## Overview

Fuzzing is a type of automated testing which continuously manipulates inputs to a program to find bugs. Go fuzzing uses coverage guidance to intelligently walk through the code being fuzzed to find and report failures to the user. Since it can reach edge cases which humans often miss, fuzz testing can be particularly valuable for finding security exploits and vulnerabilities.

Below is an example of a [fuzz test](https://go.dev/doc/fuzz/#glos-fuzz-test), highlighting its main components.

![[Pasted image 20220315212717.png]]