#Selenium 
# Interacting with web elements
A high-level instruction set for manipulating form controls.

There are only 5 basic commands that can be executed on an element:

-   [click](https://w3c.github.io/webdriver/#element-click) (applies to any element)
-   [send keys](https://w3c.github.io/webdriver/#element-send-keys) (only applies to text fields and content editable elements)
-   [clear](https://w3c.github.io/webdriver/#element-send-keys) (only applies to text fields and content editable elements)
-   submit (only applies to form elements)
-   select (see [Select List Elements](https://www.selenium.dev/documentation/webdriver/elements/select_lists/))

## Additional validations[](https://www.selenium.dev/documentation/webdriver/elements/interactions/#additional-validations)

These methods are designed to closely emulate a user’s experience, so, unlike the [Actions API](https://www.selenium.dev/documentation/webdriver/actions_api/), it attempts to perform two things before attempting the specified action.

1.  If it determines the element is outside the viewport, it [scrolls the element into view](https://w3c.github.io/webdriver/#dfn-scrolls-into-view), specifically it will align the bottom of the element with the bottom of the viewport.
2.  It ensures the element is [interactable](https://w3c.github.io/webdriver/#interactability) before taking the action. This could mean that the scrolling was unsuccessful, or that the element is not otherwise displayed. Determining if an element is displayed on a page was too difficult to [define directly in the webdriver specification](https://w3c.github.io/webdriver/#element-displayedness), so Selenium sends an execute command with a JavaScript atom that checks for things that would keep the element from being displayed. If it determines an element is not in the viewport, not displayed, not [keyboard-interactable](https://w3c.github.io/webdriver/#dfn-keyboard-interactable), or not [pointer-interactable](https://w3c.github.io/webdriver/#dfn-pointer-interactable), it returns an [element not interactable](https://w3c.github.io/webdriver/#dfn-element-not-interactable) error.

## Click[](https://www.selenium.dev/documentation/webdriver/elements/interactions/#click)

The [element click command](https://w3c.github.io/webdriver/#dfn-element-click) is executed on the [center of the element](https://w3c.github.io/webdriver/#dfn-center-point). If the center of the element is [obscured](https://w3c.github.io/webdriver/#dfn-obscuring) for some reason, Selenium will return an [element click intercepted](https://w3c.github.io/webdriver/#dfn-element-click-intercepted) error.

## Send keys[](https://www.selenium.dev/documentation/webdriver/elements/interactions/#send-keys)

The [element send keys command](https://w3c.github.io/webdriver/#dfn-element-send-keys) types the provided keys into an [editable](https://w3c.github.io/webdriver/#dfn-editable) element. Typically, this means an element is an input element of a form with a `text` type or an element with a `content-editable` attribute. If it is not editable, [an invalid element state](https://w3c.github.io/webdriver/#dfn-invalid-element-state) error is returned.

```python
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
driver = webdriver.Firefox()

    # Navigate to url
driver.get("http://www.google.com")

    # Enter "webdriver" text and perform "ENTER" keyboard action
driver.find_element(By.NAME, "q").send_keys("webdriver" + Keys.ENTER)
  
```

## Clear[](https://www.selenium.dev/documentation/webdriver/elements/interactions/#clear)

The [element clear command](https://w3c.github.io/webdriver/#dfn-element-clear) resets the content of an element. This requires an element to be [editable](https://w3c.github.io/webdriver/#dfn-editable), and [resettable](https://w3c.github.io/webdriver/#dfn-resettable-elements). Typically, this means an element is an input element of a form with a `text` type or an element with a `content-editable` attribute. If these conditions are not met, [an invalid element state](https://w3c.github.io/webdriver/#dfn-invalid-element-state) error is returned.

```python
from selenium import webdriver
from selenium.webdriver.common.by import By
driver = webdriver.Chrome()

    # Navigate to url
driver.get("http://www.google.com")
    # Store 'SearchInput' element
SearchInput = driver.find_element(By.NAME, "q")
SearchInput.send_keys("selenium")
    # Clears the entered text
SearchInput.clear()
  
```

## Submit[](https://www.selenium.dev/documentation/webdriver/elements/interactions/#submit)

In Selenium 4 this is no longer implemented with a separate endpoint and functions by executing a script. As such, it is recommended not to use this method and to click the applicable form submission button instead.