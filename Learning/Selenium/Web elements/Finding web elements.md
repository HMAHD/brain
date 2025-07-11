#Selenium 
# Finding web elements
Locating the elements based on the provided locator values.

One of the most fundamental aspects of using Selenium is obtaining element references to work with. Selenium offers a number of built-in [locator strategies](https://www.selenium.dev/documentation/webdriver/elements/locators/) to uniquely identify an element. There are many ways to use the locators in very advanced scenarios. For the purposes of this documentation, let’s consider this HTML snippet:

```html
<ol id="vegetables">
 <li class="potatoes">…
 <li class="onions">…
 <li class="tomatoes"><span>Tomato is a Vegetable</span>…
</ol>
<ul id="fruits">
  <li class="bananas">…
  <li class="apples">…
  <li class="tomatoes"><span>Tomato is a Fruit</span>…
</ul>
```

## First matching element[](https://www.selenium.dev/documentation/webdriver/elements/finders/#first-matching-element)

Many locators will match multiple elements on the page. The singular find element method will return a reference to the first element found within a given context.

### Evaluating entire DOM[](https://www.selenium.dev/documentation/webdriver/elements/finders/#evaluating-entire-dom)

When the find element method is called on the driver instance, it returns a reference to the first element in the DOM that matches with the provided locator. This value can be stored and used for future element actions. In our example HTML above, there are two elements that have a class name of “tomatoes” so this method will return the element in the “vegetables” list.

```python
vegetable = driver.find_element(By.CLASS_NAME, "tomatoes")
  
```

### Evaluating a subset of the DOM[](https://www.selenium.dev/documentation/webdriver/elements/finders/#evaluating-a-subset-of-the-dom)

Rather than finding a unique locator in the entire DOM, it is often useful to narrow the search to the scope of another located element. In the above example there are two elements with a class name of “tomatoes” and it is a little more challenging to get the reference for the second one.

One solution is to locate an element with a unique attribute that is an ancestor of the desired element and not an ancestor of the undesired element, then call find element on that object:

```python
fruits = driver.find_element(By.ID, "fruits")
fruit = fruits.find_elements_by_id("tomatoes")
  
```

**Java and C#**  
`WebDriver`, `WebElement` and `ShadowRoot` classes all implement a `SearchContext` interface, which is considered a _role-based interface_. Role-based interfaces allow you to determine whether a particular driver implementation supports a given feature. These interfaces are clearly defined and try to adhere to having only a single role of responsibility.

### Optimized locator[](https://www.selenium.dev/documentation/webdriver/elements/finders/#optimized-locator)

A nested lookup might not be the most effective location strategy since it requires two separate commands to be issued to the browser.

To improve the performance slightly, we can use either CSS or XPath to find this element in a single command. See the [Locator strategy suggestions](https://www.selenium.dev/documentation/test_practices/encouraged/locators/) in our [Encouraged test practices](https://www.selenium.dev/documentation/test_practices/encouraged/) section.

For this example, we’ll use a CSS Selector:

```python
fruit = driver.find_element_by_css_selector("#fruits .tomatoes")
  
```

## All matching elements[](https://www.selenium.dev/documentation/webdriver/elements/finders/#all-matching-elements)

There are several use cases for needing to get references to all elements that match a locator, rather than just the first one. The plural find elements methods return a collection of element references. If there are no matches, an empty list is returned. In this case, references to all fruits and vegetable list items will be returned in a collection.

```python
plants = driver.find_elements(By.TAG_NAME, "li")
  
```

### Get element[](https://www.selenium.dev/documentation/webdriver/elements/finders/#get-element)

Often you get a collection of elements but want to work with a specific element, which means you need to iterate over the collection and identify the one you want.

```python
from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Firefox()

    # Navigate to Url
driver.get("https://www.example.com")

    # Get all the elements available with tag name 'p'
elements = driver.find_elements(By.TAG_NAME, 'p')

for e in elements:
    print(e.text)
  
```

## Find Elements From Element[](https://www.selenium.dev/documentation/webdriver/elements/finders/#find-elements-from-element)

It is used to find the list of matching child WebElements within the context of parent element. To achieve this, the parent WebElement is chained with ‘findElements’ to access child elements

```python
from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://www.example.com")

    # Get element with tag name 'div'
element = driver.find_element(By.TAG_NAME, 'div')

    # Get all the elements available with tag name 'p'
elements = element.find_elements(By.TAG_NAME, 'p')
for e in elements:
    print(e.text)
  
```

## Get Active Element[](https://www.selenium.dev/documentation/webdriver/elements/finders/#get-active-element)

It is used to track (or) find DOM element which has the focus in the current browsing context.

```python
  from selenium import webdriver
  from selenium.webdriver.common.by import By

  driver = webdriver.Chrome()
  driver.get("https://www.google.com")
  driver.find_element(By.CSS_SELECTOR, '[name="q"]').send_keys("webElement")

    # Get attribute of current active element
  attr = driver.switch_to.active_element.get_attribute("title")
  print(attr)
  
```

