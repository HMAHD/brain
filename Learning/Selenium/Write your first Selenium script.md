#Selenium 
# Write your first Selenium script
Step-by-step instructions for constructing a Selenium script

Once you have [Selenium installed](https://www.selenium.dev/documentation/webdriver/getting_started/install_library/) and [Drivers installed](https://www.selenium.dev/documentation/webdriver/getting_started/install_drivers/), you’re ready to write Selenium code.

## Eight Basic Components[](https://www.selenium.dev/documentation/webdriver/getting_started/first_script/#eight-basic-components)

Everything Selenium does is send the browser commands to do something or send requests for information. Most of what you’ll do with Selenium is a combination of these basic commands:

### 1. Start the session[](https://www.selenium.dev/documentation/webdriver/getting_started/first_script/#1-start-the-session)

For more details on starting a session read our documentation on [opening and closing a browser](https://www.selenium.dev/documentation/webdriver/getting_started/open_browser/)

```py
    driver = webdriver.Chrome()
```

  [Check code on GitHub](https://github.com/SeleniumHQ/seleniumhq.github.io/blob/trunk/examples/python/tests/getting_started/test_first_script.py#L6)

### 2. Take action on browser[](https://www.selenium.dev/documentation/webdriver/getting_started/first_script/#2-take-action-on-browser)

In this example we are [navigating](https://www.selenium.dev/documentation/webdriver/browser/navigation/) to a web page.

```py
    driver.get("https://google.com")
```

  [Check code on GitHub](https://github.com/SeleniumHQ/seleniumhq.github.io/blob/trunk/examples/python/tests/getting_started/test_first_script.py#L8)

### 3. Request browser information[](https://www.selenium.dev/documentation/webdriver/getting_started/first_script/#3-request-browser-information)

There are a bunch of types of [information about the browser](https://www.selenium.dev/documentation/webdriver/browser/) you can request, including window handles, browser size / position, cookies, alerts, etc.

```py
    title = driver.title
```

  [Check code on GitHub](https://github.com/SeleniumHQ/seleniumhq.github.io/blob/trunk/examples/python/tests/getting_started/test_first_script.py#L10)

### 4. Establish Waiting Strategy[](https://www.selenium.dev/documentation/webdriver/getting_started/first_script/#4-establish-waiting-strategy)

Synchronizing the code with the current state of the browser is one of the biggest challenges with Selenium, and doing it well is an advanced topic.

Essentially you want to make sure that the element is on the page before you attempt to locate it and the element is in an interactable state before you attempt to interact with it.

An implicit wait is rarely the best solution, but it’s the easiest to demonstrate here, so we’ll use it as a placeholder.

Read more about [Waiting strategies](https://www.selenium.dev/documentation/webdriver/waits/).

```py
    driver.implicitly_wait(0.5)
```

  [Check code on GitHub](https://github.com/SeleniumHQ/seleniumhq.github.io/blob/trunk/examples/python/tests/getting_started/test_first_script.py#L13)

### 5. Find an element[](https://www.selenium.dev/documentation/webdriver/getting_started/first_script/#5-find-an-element)

The majority of commands in most Selenium sessions are element related, and you can’t interact with one without first [finding an element](https://www.selenium.dev/documentation/webdriver/elements/)


```py
    search_box = driver.find_element(by=By.NAME, value="q")
    search_button = driver.find_element(by=By.NAME, value="btnK")
```

  [Check code on GitHub](https://github.com/SeleniumHQ/seleniumhq.github.io/blob/trunk/examples/python/tests/getting_started/test_first_script.py#L15-L16)

### 6. Take action on element[](https://www.selenium.dev/documentation/webdriver/getting_started/first_script/#6-take-action-on-element)

There are only a handful of [actions to take on an element](https://www.selenium.dev/documentation/webdriver/elements/interactions/), but you will use them frequently.

```py
    search_box.send_keys("Selenium")
    search_button.click()
```

  [Check code on GitHub](https://github.com/SeleniumHQ/seleniumhq.github.io/blob/trunk/examples/python/tests/getting_started/test_first_script.py#L18-L19)

### 7. Request element information[](https://www.selenium.dev/documentation/webdriver/getting_started/first_script/#7-request-element-information)

Elements store a lot of [information that can be requested](https://www.selenium.dev/documentation/webdriver/elements/information/). Notice that we need to relocate the search box because the DOM has changed since we first located it.

```py
    value = search_box.get_attribute("value")
```

  [Check code on GitHub](https://github.com/SeleniumHQ/seleniumhq.github.io/blob/trunk/examples/python/tests/getting_started/test_first_script.py#L22)

### 8. End the session[](https://www.selenium.dev/documentation/webdriver/getting_started/first_script/#8-end-the-session)

This ends the driver process, which by default closes the browser as well. No more commands can be sent to this driver instance.

```py
    driver.quit()
```

  [Check code on GitHub](https://github.com/SeleniumHQ/seleniumhq.github.io/blob/trunk/examples/python/tests/getting_started/test_first_script.py#L25)

## Putting everything together[](https://www.selenium.dev/documentation/webdriver/getting_started/first_script/#putting-everything-together)

Let’s combine these 8 things into a complete script with assertions that can be executed by a test runner.

```py
from selenium import webdriver
from selenium.webdriver.common.by import By


def test_eight_components():
    driver = webdriver.Chrome()

    driver.get("https://google.com")

    title = driver.title
    assert title == "Google"

    driver.implicitly_wait(0.5)

    search_box = driver.find_element(by=By.NAME, value="q")
    search_button = driver.find_element(by=By.NAME, value="btnK")

    search_box.send_keys("Selenium")
    search_button.click()

    search_box = driver.find_element(by=By.NAME, value="q")
    value = search_box.get_attribute("value")
    assert value == "Selenium"

    driver.quit()
```