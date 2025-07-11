#Selenium 
# Working with windows and tabs
### Get window handle[](https://www.selenium.dev/documentation/webdriver/browser/windows/#get-window-handle)

WebDriver does not make the distinction between windows and tabs. If your site opens a new tab or window, Selenium will let you work with it using a window handle. Each window has a unique identifier which remains persistent in a single session. You can get the window handle of the current window by using:

```python
driver.current_window_handle
```

### Switching windows or tabs[](https://www.selenium.dev/documentation/webdriver/browser/windows/#switching-windows-or-tabs)

Clicking a link which opens in a [new window](https://seleniumhq.github.io/) will focus the new window or tab on screen, but WebDriver will not know which window the Operating System considers active. To work with the new window you will need to switch to it. If you have only two tabs or windows open, and you know which window you start with, by the process of elimination you can loop over both windows or tabs that WebDriver can see, and switch to the one which is not the original.

However, Selenium 4 provides a new api [NewWindow](https://www.selenium.dev/documentation/webdriver/browser/windows/#create-new-window-or-new-tab-and-switch) which creates a new tab (or) new window and automatically switches to it.

```python
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

with webdriver.Firefox() as driver:
    # Open URL
    driver.get("https://seleniumhq.github.io")

    # Setup wait for later
    wait = WebDriverWait(driver, 10)

    # Store the ID of the original window
    original_window = driver.current_window_handle

    # Check we don't have other windows open already
    assert len(driver.window_handles) == 1

    # Click the link which opens in a new window
    driver.find_element(By.LINK_TEXT, "new window").click()

    # Wait for the new window or tab
    wait.until(EC.number_of_windows_to_be(2))

    # Loop through until we find a new window handle
    for window_handle in driver.window_handles:
        if window_handle != original_window:
            driver.switch_to.window(window_handle)
            break

    # Wait for the new tab to finish loading content
    wait.until(EC.title_is("SeleniumHQ Browser Automation"))
  
```

### Create new window (or) new tab and switch[](https://www.selenium.dev/documentation/webdriver/browser/windows/#create-new-window-or-new-tab-and-switch)

Creates a new window (or) tab and will focus the new window or tab on screen. You don’t need to switch to work with the new window (or) tab. If you have more than two windows (or) tabs opened other than the new window, you can loop over both windows or tabs that WebDriver can see, and switch to the one which is not the original.

**Note: This feature works with Selenium 4 and later versions.**
-   [Java](https://www.selenium.dev/documentation/webdriver/browser/windows/#tabs-2-0)
-   [Python](https://www.selenium.dev/documentation/webdriver/browser/windows/#tabs-2-1)
-   [CSharp](https://www.selenium.dev/documentation/webdriver/browser/windows/#tabs-2-2)
-   [Ruby](https://www.selenium.dev/documentation/webdriver/browser/windows/#tabs-2-3)
-   [JavaScript](https://www.selenium.dev/documentation/webdriver/browser/windows/#tabs-2-4)
-   [Kotlin](https://www.selenium.dev/documentation/webdriver/browser/windows/#tabs-2-5)

```python
    # Opens a new tab and switches to new tab
driver.switch_to.new_window('tab')

    # Opens a new window and switches to new window
driver.switch_to.new_window('window')
  
```

### Closing a window or tab[](https://www.selenium.dev/documentation/webdriver/browser/windows/#closing-a-window-or-tab)

When you are finished with a window or tab _and_ it is not the last window or tab open in your browser, you should close it and switch back to the window you were using previously. Assuming you followed the code sample in the previous section you will have the previous window handle stored in a variable. Put this together and you will get:

```python
    #Close the tab or window
driver.close()

    #Switch back to the old tab or window
driver.switch_to.window(original_window)
  
```

Forgetting to switch back to another window handle after closing a window will leave WebDriver executing on the now closed page, and will trigger a **No Such Window Exception**. You must switch back to a valid window handle in order to continue execution.

### Quitting the browser at the end of a session[](https://www.selenium.dev/documentation/webdriver/browser/windows/#quitting-the-browser-at-the-end-of-a-session)

When you are finished with the browser session you should call quit, instead of close:

```python
driver.quit()
```

-   Quit will:
    -   Close all the windows and tabs associated with that WebDriver session
    -   Close the browser process
    -   Close the background driver process
    -   Notify Selenium Grid that the browser is no longer in use so it can be used by another session (if you are using Selenium Grid)

Failure to call quit will leave extra background processes and ports running on your machine which could cause you problems later.

Some test frameworks offer methods and annotations which you can hook into to tear down at the end of a test.

```python
    # unittest teardown
    # https://docs.python.org/3/library/unittest.html?highlight=teardown#unittest.TestCase.tearDown
def tearDown(self):
    self.driver.quit()
  
```

If not running WebDriver in a test context, you may consider using `try / finally` which is offered by most languages so that an exception will still clean up the WebDriver session.

```python
try:
    #WebDriver code here...
finally:
    driver.quit()
  
```

Python’s WebDriver now supports the python context manager, which when using the `with` keyword can automatically quit the driver at the end of execution.

```python
with webdriver.Firefox() as driver:
  # WebDriver code here...

# WebDriver will automatically quit after indentation
```

## Window management[](https://www.selenium.dev/documentation/webdriver/browser/windows/#window-management)

Screen resolution can impact how your web application renders, so WebDriver provides mechanisms for moving and resizing the browser window.

### Get window size[](https://www.selenium.dev/documentation/webdriver/browser/windows/#get-window-size)

Fetches the size of the browser window in pixels.

```python
    # Access each dimension individually
width = driver.get_window_size().get("width")
height = driver.get_window_size().get("height")

    # Or store the dimensions and query them later
size = driver.get_window_size()
width1 = size.get("width")
height1 = size.get("height")
  
```

### Set window size[](https://www.selenium.dev/documentation/webdriver/browser/windows/#set-window-size)

Restores the window and sets the window size.

```python
driver.set_window_size(1024, 768)
```

### Get window position[](https://www.selenium.dev/documentation/webdriver/browser/windows/#get-window-position)

Fetches the coordinates of the top left coordinate of the browser window.

```python
    # Access each dimension individually
x = driver.get_window_position().get('x')
y = driver.get_window_position().get('y')

    # Or store the dimensions and query them later
position = driver.get_window_position()
x1 = position.get('x')
y1 = position.get('y')
  
```

## Set window position[](https://www.selenium.dev/documentation/webdriver/browser/windows/#set-window-position)

Moves the window to the chosen position.

```python
    # Move the window to the top left of the primary monitor
driver.set_window_position(0, 0)
  
```

### Maximize window[](https://www.selenium.dev/documentation/webdriver/browser/windows/#maximize-window)

Enlarges the window. For most operating systems, the window will fill the screen, without blocking the operating system’s own menus and toolbars.

```python
driver.maximize_window()
```

### Minimize window[](https://www.selenium.dev/documentation/webdriver/browser/windows/#minimize-window)

Minimizes the window of current browsing context. The exact behavior of this command is specific to individual window managers.

Minimize Window typically hides the window in the system tray.

**Note: This feature works with Selenium 4 and later versions.**

```python
driver.minimize_window()
```

### Fullscreen window[](https://www.selenium.dev/documentation/webdriver/browser/windows/#fullscreen-window)

Fills the entire screen, similar to pressing F11 in most browsers.

```python
driver.fullscreen_window()
```

### TakeScreenshot[](https://www.selenium.dev/documentation/webdriver/browser/windows/#takescreenshot)

Used to capture screenshot for current browsing context. The WebDriver endpoint [screenshot](https://www.w3.org/TR/webdriver/#dfn-take-screenshot) returns screenshot which is encoded in Base64 format.

```python
from selenium import webdriver

driver = webdriver.Chrome()

driver.get("http://www.example.com")

    # Returns and base64 encoded string into image
driver.save_screenshot('./image.png')

driver.quit()
```

### TakeElementScreenshot[](https://www.selenium.dev/documentation/webdriver/browser/windows/#takeelementscreenshot)

Used to capture screenshot of an element for current browsing context. The WebDriver endpoint [screenshot](https://www.w3.org/TR/webdriver/#take-element-screenshot) returns screenshot which is encoded in Base64 format.

```python
from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()

driver.get("http://www.example.com")

ele = driver.find_element(By.CSS_SELECTOR, 'h1')

    # Returns and base64 encoded string into image
ele.screenshot('./image.png')

driver.quit()
  
```

### Execute Script[](https://www.selenium.dev/documentation/webdriver/browser/windows/#execute-script)

Executes JavaScript code snippet in the current context of a selected frame or window.

```python
    # Stores the header element
header = driver.find_element(By.CSS_SELECTOR, "h1")

    # Executing JavaScript to capture innerText of header element
driver.execute_script('return arguments[0].innerText', header)
  
```

### Print Page[](https://www.selenium.dev/documentation/webdriver/browser/windows/#print-page)

Prints the current page within the browser.

_Note: This requires Chromium Browsers to be in headless mode_

```python
    from selenium.webdriver.common.print_page_options import PrintOptions

    print_options = PrintOptions()
    print_options.page_ranges = ['1-2']

    driver.get("printPage.html")

    base64code = driver.print_page(print_options)
  
```

