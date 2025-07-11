#UnitTest #IntegrationTest 
## Unit Test vs. Integration Test: A Summary
Based on what we’ve just seen, we’re ready to summarize. What are the differences and similarities between the two approaches? When should you use which? Let’s get to it.

### What’s the Same

Let’s start with what’s equal about the approaches. Both unit testing and integration testing are types of testing that require coding (in contrast to forms of testing that rely on screen recording, for instance.)

You can perform both types of testing using similar or even the same tools. Additionally, it’s recommended that you add both forms of testing to your CI/CD pipeline.

### When to Use Which?
To understand when to use which approach, we must consider the concept called [The Test Pyramid,](https://martinfowler.com/bliki/TestPyramid.html) which is a way of thinking about tests, showing that you should prioritize fast unit tests above other slower types of testing. Though there are many possible variations of this component, here’s a common depiction of it:

![](https://www.testim.io/wp-content/uploads/2021/11/image@2x.png)

So, maximize the use of unit testing by applying it to portions of your codebase that deal with business and domain logic and don’t talk to external dependencies. Architect your application in such a way as to isolate the code that deals with external dependencies (IO). Also, you should strive to reduce the amount of such code. Then, you test it with integration testing.

### What About Functional Testing?

I know the post’s title only mentions unit and integration tests, but I thought I’d briefly throw a third type of testing into the mix to spice things up. I’m talking about functional testing.

You can think of functional testing as being even higher level than both unit and integration tests. A functional test exercises a given feature of the application from the point of view of the user. Functional testing, like integration testing, requires the integration of different modules or layers in the application.

However, unlike integration tests, functional tests are supposed to test the application from a functional perspective—hence the name—which means it usually drives the application through its UI. A useful way to think about functional tests is to consider they are an intermediary between integration and [end-to-end testing](https://www.testim.io/blog/end-to-end-testing-vs-integration-testing/).