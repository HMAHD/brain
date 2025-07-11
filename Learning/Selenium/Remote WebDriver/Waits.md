#Selenium 
# Waits
WebDriver can generally be said to have a blocking API. Because it is an out-of-process library that _instructs_ the browser what to do, and because the web platform has an intrinsically asynchronous nature, WebDriver does not track the active, real-time state of the DOM. This comes with some challenges that we will discuss here.

From experience, most intermittent issues that arise from use of Selenium and WebDriver are connected to _race conditions_ that occur between the browser and the user’s instructions. An example could be that the user instructs the browser to navigate to a page, then gets a **no such element** error when trying to find an element.

Consider the following document:

```html
<!doctype html>
<meta charset=utf-8>
<title>Race Condition Example</title>

<script>
  var initialised = false;
  window.addEventListener("load", function() {
    var newElement = document.createElement("p");
    newElement.textContent = "Hello from JavaScript!";
    document.body.appendChild(newElement);
    initialised = true;
  });
</script>
```

The WebDriver instructions might look innocent enough:

```python
driver.navigate("file:///race_condition.html")
el = driver.find_element(By.TAG_NAME, "p")
assert el.text == "Hello from JavaScript!"
  
```

The issue here is that the default [page load strategy](https://www.selenium.dev/documentation/webdriver/capabilities/shared/#pageloadstrategy) used in WebDriver listens for the `document.readyState` to change to `"complete"` before returning from the call to _navigate_. Because the `p` element is added _after_ the document has completed loading, this WebDriver script _might_ be intermittent. It “might” be intermittent because no guarantees can be made about elements or events that trigger asynchronously without explicitly waiting—or blocking—on those events.

Fortunately, the normal instruction set available on the [_WebElement_](https://www.selenium.dev/documentation/webdriver/elements/) interface—such as _WebElement.click_ and _WebElement.sendKeys_—are guaranteed to be synchronous, in that the function calls will not return (or the callback will not trigger in callback-style languages) until the command has been completed in the browser. The advanced user interaction APIs, [_Keyboard_](https://www.selenium.dev/documentation/webdriver/actions_api/keyboard/) and [_Mouse_](https://www.selenium.dev/documentation/webdriver/actions_api/mouse/), are exceptions as they are explicitly intended as “do what I say” asynchronous commands.

Waiting is having the automated task execution elapse a certain amount of time before continuing with the next step.

To overcome the problem of race conditions between the browser and your WebDriver script, most Selenium clients ship with a _wait_ package. When employing a wait, you are using what is commonly referred to as an [_explicit wait_](https://www.selenium.dev/documentation/webdriver/waits/#explicit-wait).

## Explicit wait[](https://www.selenium.dev/documentation/webdriver/waits/#explicit-wait)

_Explicit waits_ are available to Selenium clients for imperative, procedural languages. They allow your code to halt program execution, or freeze the thread, until the _condition_ you pass it resolves. The condition is called with a certain frequency until the timeout of the wait is elapsed. This means that for as long as the condition returns a falsy value, it will keep trying and waiting.

Since explicit waits allow you to wait for a condition to occur, they make a good fit for synchronising the state between the browser and its DOM, and your WebDriver script.

To remedy our buggy instruction set from earlier, we could employ a wait to have the _findElement_ call wait until the dynamically added element from the script has been added to the DOM:

```python
from selenium.webdriver.support.ui import WebDriverWait
def document_initialised(driver):
    return driver.execute_script("return initialised")

driver.navigate("file:///race_condition.html")
WebDriverWait(driver, timeout=10).until(document_initialised)
el = driver.find_element(By.TAG_NAME, "p")
assert el.text == "Hello from JavaScript!"
  
```

We pass in the _condition_ as a function reference that the _wait_ will run repeatedly until its return value is truthy. A “truthful” return value is anything that evaluates to boolean true in the language at hand, such as a string, number, a boolean, an object (including a _WebElement_), or a populated (non-empty) sequence or list. That means an _empty list_ evaluates to false. When the condition is truthful and the blocking wait is aborted, the return value from the condition becomes the return value of the wait.

With this knowledge, and because the wait utility ignores _no such element_ errors by default, we can refactor our instructions to be more concise:

```python
from selenium.webdriver.support.ui import WebDriverWait

driver.navigate("file:///race_condition.html")
el = WebDriverWait(driver, timeout=3).until(lambda d: d.find_element_by_tag_name("p"))
assert el.text == "Hello from JavaScript!"
  
```

In that example, we pass in an anonymous function (but we could also define it explicitly as we did earlier so it may be reused). The first and only argument that is passed to our condition is always a reference to our driver object, _WebDriver_. In a multi-threaded environment, you should be careful to operate on the driver reference passed in to the condition rather than the reference to the driver in the outer scope.

Because the wait will swallow _no such element_ errors that are raised when the element is not found, the condition will retry until the element is found. Then it will take the return value, a _WebElement_, and pass it back through to our script.

If the condition fails, e.g. a truthful return value from the condition is never reached, the wait will throw/raise an error/exception called a _timeout error_.

### Options[](https://www.selenium.dev/documentation/webdriver/waits/#options)

The wait condition can be customised to match your needs. Sometimes it is unnecessary to wait the full extent of the default timeout, as the penalty for not hitting a successful condition can be expensive.

The wait lets you pass in an argument to override the timeout:

```python
WebDriverWait(driver, timeout=3).until(some_condition)
  
```

### Expected conditions[](https://www.selenium.dev/documentation/webdriver/waits/#expected-conditions)

Because it is quite a common occurrence to have to synchronise the DOM and your instructions, most clients also come with a set of predefined _expected conditions_. As might be obvious by the name, they are conditions that are predefined for frequent wait operations.

The conditions available in the different language bindings vary, but this is a non-exhaustive list of a few:

-   alert is present
-   element exists
-   element is visible
-   title contains
-   title is
-   element staleness
-   visible text

You can refer to the API documentation for each client binding to find an exhaustive list of expected conditions:

-   Java’s [org.openqa.selenium.support.ui.ExpectedConditions](https://seleniumhq.github.io/selenium/docs/api/java/org/openqa/selenium/support/ui/ExpectedConditions.html) class
-   Python’s [selenium.webdriver.support.expected_conditions](https://seleniumhq.github.io/selenium/docs/api/py/webdriver_support/selenium.webdriver.support.expected_conditions.html?highlight=expected) class
-   .NET’s [OpenQA.Selenium.Support.UI.ExpectedConditions](https://seleniumhq.github.io/selenium/docs/api/dotnet/html/T_OpenQA_Selenium_Support_UI_ExpectedConditions.htm) type
-   JavaScript’s [selenium-webdriver/lib/until](https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/until.html) module

## Implicit wait[](https://www.selenium.dev/documentation/webdriver/waits/#implicit-wait)

There is a second type of wait that is distinct from [explicit wait](https://www.selenium.dev/documentation/webdriver/waits/#explicit-wait) called _implicit wait_. By implicitly waiting, WebDriver polls the DOM for a certain duration when trying to find _any_ element. This can be useful when certain elements on the webpage are not available immediately and need some time to load.

Implicit waiting for elements to appear is disabled by default and will need to be manually enabled on a per-session basis. Mixing [explicit waits](https://www.selenium.dev/documentation/webdriver/waits/#explicit-wait) and implicit waits will cause unintended consequences, namely waits sleeping for the maximum time even if the element is available or condition is true.

_Warning:_ Do not mix implicit and explicit waits. Doing so can cause unpredictable wait times. For example, setting an implicit wait of 10 seconds and an explicit wait of 15 seconds could cause a timeout to occur after 20 seconds.

An implicit wait is to tell WebDriver to poll the DOM for a certain amount of time when trying to find an element or elements if they are not immediately available. The default setting is 0, meaning disabled. Once set, the implicit wait is set for the life of the session.

```python
driver = Firefox()
driver.implicitly_wait(10)
driver.get("http://somedomain/url_that_delays_loading")
my_dynamic_element = driver.find_element(By.ID, "myDynamicElement")
  
```

## FluentWait[](https://www.selenium.dev/documentation/webdriver/waits/#fluentwait)

FluentWait instance defines the maximum amount of time to wait for a condition, as well as the frequency with which to check the condition.

Users may configure the wait to ignore specific types of exceptions whilst waiting, such as `NoSuchElementException` when searching for an element on the page.

```python
driver = Firefox()
driver.get("http://somedomain/url_that_delays_loading")
wait = WebDriverWait(driver, timeout=10, poll_frequency=1, ignored_exceptions=[ElementNotVisibleException, ElementNotSelectableException])
element = wait.until(EC.element_to_be_clickable((By.XPATH, "//div")))
  
```