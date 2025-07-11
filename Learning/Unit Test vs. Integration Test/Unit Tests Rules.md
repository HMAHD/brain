#UnitTest #IntegrationTest 
## Unit Tests Rules
Up until now, we’ve figured out some essential properties of unit tests. We express unit tests using code, unlike more visual types of tests. Also, developers are both their creators and main consumers, unlike other types of tests (such as acceptance testing) which target final users or stakeholders.

Now it’s time to learn the most important characteristic of unit tests, which really separates them from integration tests.

To do that, let’s see a famous definition for unit testing. This definition was proposed by Michael Feathers, and it goes like this:

A test is not a unit test if:

-   It talks to the database
-   It communicates across the network
-   It touches the file system
-   It can’t run at the same time as any of your other unit tests
-   You have to do special things to your environment (such as editing config files) to run it