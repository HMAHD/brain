#UnitTest #IntegrationTest 
## Defining Unit Testing
Unit testing is a type of automated testing meant to verify whether a small and isolated piece of the codebase—the so-called “unit”—behaves as the developer intended. An individual unit test—a “test case”—consists of an excerpt of code that exercises the production code in some way, and then verifies whether the result matches what was expected. So, unlike UI tests, unit tests don’t exercise the user interface at all; they’re supposed to interact directly with the underlying API.

Among all types of testing—manual or automated—unit testing is definitely a unique case. Most types of testing have the final user or stakeholder as the target audience, so to speak. These types of tests serve as “evidence” that the users’ requirements were met.

Unit tests, on the other hand, are different. Developers both write and read them, not with the final user in mind. Instead, developers write these kinds of tests as a check to see if the work they wrote does what they were aiming for. Having a comprehensive suite of unit tests in place allows developers to code more confidently because they feel protected by the safety net of tests.