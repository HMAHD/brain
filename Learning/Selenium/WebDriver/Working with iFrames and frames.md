#Selenium 
# Working with iFrames and frames
Frames are a now deprecated means of building a site layout from multiple documents on the same domain. You are unlikely to work with them unless you are working with an pre HTML5 webapp. Iframes allow the insertion of a document from an entirely different domain, and are still commonly used.

If you need to work with frames or iframes, WebDriver allows you to work with them in the same way. Consider a button within an iframe. If we inspect the element using the browser development tools, we might see the following:

```html
<div id="modal">
  <iframe id="buttonframe" name="myframe"  src="https://seleniumhq.github.io">
   <button>Click here</button>
 </iframe>
</div>
```

If it was not for the iframe we would expect to click on the button using something like:

```python
    # This Wont work
driver.find_element(By.TAG_NAME, 'button').click()
  
```

However, if there are no buttons outside of the iframe, you might instead get a _no such element_ error. This happens because Selenium is only aware of the elements in the top level document. To interact with the button, we will need to first switch to the frame, in a similar way to how we switch windows. WebDriver offers three ways of switching to a frame.

## Using a WebElement[](https://www.selenium.dev/documentation/webdriver/browser/frames/#using-a-webelement)

Switching using a WebElement is the most flexible option. You can find the frame using your preferred selector and switch to it.

```python
    # Store iframe web element
iframe = driver.find_element(By.CSS_SELECTOR, "#modal > iframe")

    # switch to selected iframe
driver.switch_to.frame(iframe)

    # Now click on button
driver.find_element(By.TAG_NAME, 'button').click()
  
```

## Using a name or ID[](https://www.selenium.dev/documentation/webdriver/browser/frames/#using-a-name-or-id)

If your frame or iframe has an id or name attribute, this can be used instead. If the name or ID is not unique on the page, then the first one found will be switched to.

```python
    # Switch frame by id
driver.switch_to.frame('buttonframe')

    # Now, Click on the button
driver.find_element(By.TAG_NAME, 'button').click()
  
```

## Using an index[](https://www.selenium.dev/documentation/webdriver/browser/frames/#using-an-index)

It is also possible to use the index of the frame, such as can be queried using _window.frames_ in JavaScript.

```python
    # switching to second iframe based on index
iframe = driver.find_elements_by_tag_name('iframe')[1]

    # switch to selected iframe
driver.switch_to.frame(iframe)
  
```

## Leaving a frame[](https://www.selenium.dev/documentation/webdriver/browser/frames/#leaving-a-frame)

To leave an iframe or frameset, switch back to the default content like so:

```python
    # switch back to default content
driver.switch_to.default_content()
  
```
