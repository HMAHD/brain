#Selenium 
# Actions API
A low-level interface for providing virtualised device input to the web browser.

Unlike the high-level [element interactions](https://www.selenium.dev/documentation/webdriver/elements/interactions/), which conducts additional validations, the [Actions API](https://w3c.github.io/webdriver/#dfn-actions) provides granular control over input devices.

Selenium provides access to 3 input sources: key inputs for keyboard devices, pointer inputs for a mouse, pen or touch device, and a wheel inputs for scroll wheel support.

# Keyboard actions

A representation of any key input device for interacting with a web page.

Keyboard represents a KeyBoard event. KeyBoard actions are performed by using low-level interface which allows us to provide virtualized device input to the web browser.

## Keys[](https://www.selenium.dev/documentation/webdriver/actions_api/keyboard/#keys)

In addition to the keys represented by regular unicode, unicode values have been assigned to other keyboard keys for use with Selenium. Each language has its own way to reference these keys; the full list can be found [here](https://www.w3.org/TR/webdriver/#keyboard-actions).

## Key down[](https://www.selenium.dev/documentation/webdriver/actions_api/keyboard/#key-down)

The keyDown is used to simulate action of depressing a key

```python
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
driver = webdriver.Chrome()

    # Navigate to url
driver.get("http://www.google.com")

    # Enter "webdriver" text and perform "ENTER" keyboard action
driver.find_element(By.NAME, "q").send_keys("webdriver" + Keys.ENTER)

    # Perform action ctrl + A (modifier CONTROL + Alphabet A) to select the page
webdriver.ActionChains(driver).key_down(Keys.CONTROL).send_keys("a").perform()
  
```

## Key up[](https://www.selenium.dev/documentation/webdriver/actions_api/keyboard/#key-up)

The keyUp is used to simulate key-up (or) key-release action

```python
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
driver = webdriver.Chrome()

    # Navigate to url
driver.get("http://www.google.com")

    # Store google search box WebElement
search = driver.find_element(By.NAME, "q")

action = webdriver.ActionChains(driver)

    # Enters text "qwerty" with keyDown SHIFT key and after keyUp SHIFT key (QWERTYqwerty)
action.key_down(Keys.SHIFT).send_keys_to_element(search, "qwerty").key_up(Keys.SHIFT).send_keys("qwerty").perform()
  
```

## Send keys[](https://www.selenium.dev/documentation/webdriver/actions_api/keyboard/#send-keys)

This is a convenience method in the Actions API that combines keyDown and keyUp commands in one action. Executing this command differs slightly from using the element method.

```python
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
driver.get("https://www.selenium.dev/selenium/docs/api/py/genindex.html")

search = driver.find_element(By.NAME, "q")

action = webdriver.ActionChains(driver)
action.move_to_element(search).click().send_keys("send_keys", Keys.ENTER).perform()
```

# Mouse actions
A representation of any pointer device for interacting with a web page.

## Click and hold[](https://www.selenium.dev/documentation/webdriver/actions_api/mouse/#click-and-hold)

It will move to the element and clicks (without releasing) in the middle of the given element.

```python
from selenium import webdriver
from selenium.webdriver.common.by import By
driver = webdriver.Chrome()

# Navigate to url
driver.get("http://www.google.com")

# Store 'Sign In' button web element
signIn = driver.find_element(By.LINK_TEXT, "Sign in")

# Perform click-and-hold action on the element
webdriver.ActionChains(driver).click_and_hold(signIn).perform()
  
```

## Context click[](https://www.selenium.dev/documentation/webdriver/actions_api/mouse/#context-click)

This method firstly performs a mouse-move to the location of the element and performs the context-click (right click) on the given element.

```python
from selenium import webdriver
driver = webdriver.Chrome()

# Navigate to url
driver.get("http://www.google.com")

# Store 'signIn' button web element
signIn = driver.find_element(By.LINK_TEXT, "Sign in")

# Perform context-click action on the element
webdriver.ActionChains(driver).context_click(signIn).perform()
  
```

## Double click[](https://www.selenium.dev/documentation/webdriver/actions_api/mouse/#double-click)

It will move to the element and performs a double-click in the middle of the given element.

```python
from selenium import webdriver
driver = webdriver.Chrome()

# Navigate to url
driver.get("http://www.google.com")

# Store 'signIn' button web element
signIn = driver.find_element(By.LINK_TEXT, "Sign in")

# Perform double-click action on the element
webdriver.ActionChains(driver).double_click(signIn).perform()
  
```

## Move to element[](https://www.selenium.dev/documentation/webdriver/actions_api/mouse/#move-to-element)

This method moves the mouse to the middle of the element. The element is also scrolled into the view on performing this action.

```python
from selenium import webdriver
driver = webdriver.Chrome()

    # Navigate to url
driver.get("http://www.google.com")

    # Store 'google search' button web element
gmailLink = driver.find_element(By.LINK_TEXT, "Gmail")

    # Performs mouse move action onto the element
webdriver.ActionChains(driver).move_to_element(gmailLink).perform()
  
```

## Move by offset[](https://www.selenium.dev/documentation/webdriver/actions_api/mouse/#move-by-offset)

This method moves the mouse from its current position (or 0,0) by the given offset. If the coordinates are outside the view window, then the mouse will end up outside the browser window.

```python
from selenium import webdriver
driver = webdriver.Chrome()

    # Navigate to url
driver.get("http://www.google.com")

    # Store 'google search' button web element
gmailLink = driver.find_element(By.LINK_TEXT, "Gmail")
    # Set x and y offset positions of element
xOffset = 100
yOffset = 100
    # Performs mouse move action onto the element
webdriver.ActionChains(driver).move_by_offset(xOffset,yOffset).perform()
  
```

## dragAndDrop[](https://www.selenium.dev/documentation/webdriver/actions_api/mouse/#draganddrop)

This method firstly performs a click-and-hold on the source element, moves to the location of the target element and then releases the mouse.

```python
from selenium import webdriver
from selenium.webdriver.common.by import By
driver = webdriver.Chrome()

    # Navigate to url
driver.get("https://crossbrowsertesting.github.io/drag-and-drop")

    # Store 'box A' as source element
sourceEle = driver.find_element(By.ID, "draggable")
    # Store 'box B' as source element
targetEle  = driver.find_element(By.ID, "droppable")
    # Performs drag and drop action of sourceEle onto the targetEle
webdriver.ActionChains(driver).drag_and_drop(sourceEle,targetEle).perform()
  
```

## dragAndDropBy[](https://www.selenium.dev/documentation/webdriver/actions_api/mouse/#draganddropby)

This method firstly performs a click-and-hold on the source element, moves to the given offset and then releases the mouse.

```python
from selenium import webdriver
driver = webdriver.Chrome()

    # Navigate to url
driver.get("https://crossbrowsertesting.github.io/drag-and-drop")

    # Store 'box A' as source element
sourceEle = driver.find_element(By.ID, "draggable")
    # Store 'box B' as source element
targetEle  = driver.find_element(By.ID, "droppable")
targetEleXOffset = targetEle.location.get("x")
targetEleYOffset = targetEle.location.get("y")

    # Performs dragAndDropBy onto the target element offset position
webdriver.ActionChains(driver).drag_and_drop_by_offset(sourceEle, targetEleXOffset, targetEleYOffset).perform()
  
```

## release[](https://www.selenium.dev/documentation/webdriver/actions_api/mouse/#release)

This action releases the depressed left mouse button. If WebElement is passed, it will release depressed left mouse button on the given WebElement

```python
from selenium import webdriver
driver = webdriver.Chrome()

    # Navigate to url
driver.get("https://crossbrowsertesting.github.io/drag-and-drop")

    # Store 'box A' as source element
sourceEle = driver.find_element(By.ID, "draggable")
    # Store 'box B' as source element
targetEle  = driver.find_element(By.ID, "droppable")

    # Performs dragAndDropBy onto the target element offset position
webdriver.ActionChains(driver).click_and_hold(sourceEle).move_to_element(targetEle).perform()
    # Performs release event
webdriver.ActionChains(driver).release().perform()
  
```

# Scroll wheel actions
## Scroll to element[](https://www.selenium.dev/documentation/webdriver/actions_api/wheel/#scroll-to-element)
A representation of a scroll wheel input device for interacting with a web page.

Scrolls to the element by scrolling the viewport. This way the element is at the bottom.

```python
from selenium import webdriver
from selenium.webdriver import ActionChains
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://crossbrowsertesting.github.io/selenium_example_page.html")
element = driver.find_element(By.ID, "closepopup")

ActionChains(driver).scroll(0, 0, 0, 0, origin=element).perform()

driver.quit()
  
```

## Scroll by given amount from element[](https://www.selenium.dev/documentation/webdriver/actions_api/wheel/#scroll-by-given-amount-from-element)

Scrolls to the element by scrolling the viewport. This way the element is at the bottom. Scrolls the viewport further by the given amount i.e. horizontal and vertical offsets.

```python
from selenium import webdriver
from selenium.webdriver import ActionChains
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.set_window_size(500, 400)
driver.get("https://crossbrowsertesting.github.io/selenium_example_page.html")

element = driver.find_element(By.LINK_TEXT, "Go To Page 2")

ActionChains(driver).scroll(0, 0, 0, 300, origin=element).perform()

driver.quit()
  
```

## Scroll by given amount[](https://www.selenium.dev/documentation/webdriver/actions_api/wheel/#scroll-by-given-amount)

Scrolls the viewport by the given amount i.e. horizontal and vertical offsets.

```python
from selenium import webdriver
from selenium.webdriver import ActionChains

driver = webdriver.Chrome()
driver.set_window_size(500, 400)
driver.get("https://crossbrowsertesting.github.io/selenium_example_page.html")

ActionChains(driver).scroll(0, 0, 0, 200).perform()

driver.quit()
  
```

## Scroll from a offset of origin (viewport) by given amount[](https://www.selenium.dev/documentation/webdriver/actions_api/wheel/#scroll-from-a-offset-of-origin-viewport-by-given-amount)

The origin is the where the cursor is placed before the scroll is executed. For example, the position on the screen where the cursor is before scrolling a mouse wheel. For origin as viewport, the origin offset is calculated from the upper left corner of the viewport. Starting from this origin, the viewport is scrolled by the given amount i.e. horizontal and vertical offsets.

```python
from selenium import webdriver
from selenium.webdriver import ActionChains
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.set_window_size(600, 600)
driver.get("https://crossbrowsertesting.github.io/selenium_example_page.html")

textarea = driver.find_element(By.NAME, "textarea")

textarea.send_keys("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +
                   "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb" +
                   "cccccccccccccccccccccccccccccccc" +
                   "dddddddddddddddddddddddddddddddd" +
                   "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")

ActionChains(driver).scroll(20, 200, 0, -50).perform()

driver.quit()
  
```

## Scroll from a offset of origin (element) by given amount[](https://www.selenium.dev/documentation/webdriver/actions_api/wheel/#scroll-from-a-offset-of-origin-element-by-given-amount)

The origin is the where the cursor is placed before the scroll is executed. For example, the position on the screen where the cursor is before scrolling a mouse wheel. For origin as element, the origin offset is calculated from the center of the element. Starting from this origin, the viewport is scrolled by the given amount i.e. horizontal and vertical offsets.




```python
from selenium import webdriver
from selenium.webdriver import ActionChains
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://crossbrowsertesting.github.io/selenium_example_page.html")

textarea = driver.find_element(By.NAME, "textarea")
submit = driver.find_element(By.ID, "submitbtn")

textarea.send_keys("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +
                   "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb" +
                   "cccccccccccccccccccccccccccccccc" +
                   "dddddddddddddddddddddddddddddddd" +
                   "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")

ActionChains(driver).scroll(0, -50, 0, -50, origin=submit).perform()

driver.quit()
  
``` 
