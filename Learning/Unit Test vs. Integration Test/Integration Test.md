#UnitTest #IntegrationTest 
## Integration Test
To define integration testing, we’ll enlist the help of Michael Feathers again. He goes on to say:

> Tests that do these things aren’t bad. Often they are worth writing, and they can be written in a unit test harness. However, it is important to be able to separate them from true unit tests so that we can keep a set of tests that we can run fast whenever we make our changes.

So, unit tests shouldn’t rely on that list of things because doing so would make them slow, non-deterministic, and harm their ability to provide precise feedback. However, we do need to test, somehow, code that interfaces with external dependencies. As you’ve just read, tests that do so aren’t bad, but worth writing.

What do we call this type of testing? You’ve guessed it: integration testing.
