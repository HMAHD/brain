#UnitTest #IntegrationTest 
## Why Is Isolation Good for Unit Tests?
When it comes to unit testing best practices, speed is the most important of them. Relying on things like the database or the file system slows tests down.

Then, we have determinism. A unit test must be deterministic. That is to say, if it’s failing, it has to continue to fail until someone changes the code under test. The opposite is also true: if a test is currently passing, it shouldn’t start failing without changes to the code it tests.

If a test relies on other tests or external dependencies, it might change its status for reasons others than a code change in the system under test.

Finally, we have the scope of the feedback. An ideal unit test covers a specific and small portion of the code. When that test fails, it’s almost guaranteed that the problem happened on that specific portion of the code. That is to say, a proper unit test is a fantastic tool for obtaining super precise feedback.

If, on the other hand, a test relies on the database, the file system, and another test, the problem could be in any one of those places.