#Selenium 
# Information about web elements
What you can learn about an element.

There are a number of details you can query about a specific element.

## Is Displayed[](https://www.selenium.dev/documentation/webdriver/elements/information/#is-displayed)

This method is used to check if the connected Element is displayed on a webpage. Returns a `Boolean` value, True if the connected element is displayed in the current browsing context else returns false.

This functionality is [mentioned in](https://w3c.github.io/webdriver/#element-displayedness), but not defined by the w3c specification due to the [impossibility of covering all potential conditions](https://www.youtube.com/watch?v=hTa1KI6fQpg). As such, Selenium cannot expect drivers to implement this functionality directly, and now relies on executing a large JavaScript function directly. This function makes many approximations about an element’s nature and relationship in the tree to return a value.

```python
# Navigate to the url
driver.get("https://www.google.com")

# Get boolean value for is element display
is_button_visible = driver.find_element(By.CSS_SELECTOR, "[name='login']").is_displayed()
```

## Coding Help

**Note:** This section could use some updated code examples  
  
for element displayedness  
  
Check our [contribution guidelines](https://www.selenium.dev/documentation/about/contributing/) and [code example formats](https://www.selenium.dev/documentation/about/style#code-examples) if you’d like to help.

## Is Enabled[](https://www.selenium.dev/documentation/webdriver/elements/information/#is-enabled)

This method is used to check if the connected Element is enabled or disabled on a webpage. Returns a boolean value, **True** if the connected element is **enabled** in the current browsing context else returns **false**.

```python
    # Navigate to url
driver.get("http://www.google.com")

    # Returns true if element is enabled else returns false
value = driver.find_element(By.NAME, 'btnK').is_enabled()
  
```

## Is Selected[](https://www.selenium.dev/documentation/webdriver/elements/information/#is-selected)

This method determines if the referenced Element is _Selected_ or not. This method is widely used on Check boxes, radio buttons, input elements, and option elements.

Returns a boolean value, **True** if referenced element is **selected** in the current browsing context else returns **false**.

```python
    # Navigate to url
driver.get("https://the-internet.herokuapp.com/checkboxes")

    # Returns true if element is checked else returns false
value = driver.find_element(By.CSS_SELECTOR, "input[type='checkbox']:first-of-type").is_selected()
  
```

## Tag Name[](https://www.selenium.dev/documentation/webdriver/elements/information/#tag-name)

It is used to fetch the [TagName](https://www.w3.org/TR/webdriver/#dfn-get-element-tag-name) of the referenced Element which has the focus in the current browsing context.

```python
    # Navigate to url
driver.get("https://www.example.com")

    # Returns TagName of the element
attr = driver.find_element(By.CSS_SELECTOR, "h1").tag_name
  
```

## Size and Position[](https://www.selenium.dev/documentation/webdriver/elements/information/#size-and-position)

It is used to fetch the dimensions and coordinates of the referenced element.

The fetched data body contain the following details:

-   X-axis position from the top-left corner of the element
-   y-axis position from the top-left corner of the element
-   Height of the element
-   Width of the element

```python
    # Navigate to url
driver.get("https://www.example.com")

    # Returns height, width, x and y coordinates referenced element
res = driver.find_element(By.CSS_SELECTOR, "h1").rect
  
```

## Get CSS Value[](https://www.selenium.dev/documentation/webdriver/elements/information/#get-css-value)

Retrieves the value of specified computed style property of an element in the current browsing context.

```python
    # Navigate to Url
driver.get('https://www.example.com')

    # Retrieves the computed style property 'color' of linktext
cssValue = driver.findElement(By.LINK_TEXT, "More information...").value_of_css_property('color')

  
```

## Text Content[](https://www.selenium.dev/documentation/webdriver/elements/information/#text-content)

Retrieves the rendered text of the specified element.

```python
    # Navigate to url
driver.get("https://www.example.com")

    # Retrieves the text of the element
text = driver.find_element(By.CSS_SELECTOR, "h1").text
  
```