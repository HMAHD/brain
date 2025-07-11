#Selenium 
# Locator strategies
Ways to identify one or more specific elements in the DOM.

A locator is a way to identify elements on a page. It is the argument passed to the [Finding element](https://www.selenium.dev/documentation/webdriver/elements/finders/) methods.

Check out our [encouraged test practices](https://www.selenium.dev/documentation/test_practices/encouraged/) for tips on [locators](https://www.selenium.dev/documentation/test_practices/encouraged/locators/), including which to use when and why to declare locators separately from the finding methods.

## Traditional Locators[](https://www.selenium.dev/documentation/webdriver/elements/locators/#traditional-locators)

Selenium provides support for these 8 traditional location strategies in WebDriver:

class name > Locates elements whose class name contains the search value (compound class names are not permitted)

css selector > Locates elements matching a CSS selector

id > Locates elements whose ID attribute matches the search value

name > Locates elements whose NAME attribute matches the search value

link text > Locates anchor elements whose visible text matches the search value

partial link text > Locates anchor elements whose visible text contains the search value. If multiple elements are matching, only the first one will be selected.

tag name > Locates elements whose tag name matches the search value

xpath > Locates elements matching an XPath expression

## Coding Help

**Note:** This section could use some updated code examples  
  
of selecting elements using each locator strategy  

## Relative Locators[](https://www.selenium.dev/documentation/webdriver/elements/locators/#relative-locators)

**Selenium 4** introduces Relative Locators (previously called as _Friendly Locators_). These locators are helpful when it is not easy to construct a locator for the desired element, but easy to describe spatially where the element is in relation to an element that does have an easily constructed locator.

### How it works[](https://www.selenium.dev/documentation/webdriver/elements/locators/#how-it-works)

Selenium uses the JavaScript function [getBoundingClientRect()](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect) to determine the size and position of elements on the page, and can use this information to locate neighboring elements.  
find the relative elements.

Relative locator methods can take as the argument for the point of origin, either a previously located element reference, or another locator. In these examples we’ll be using locators only, but you could swap the locator in the final method with an element object and it will work the same.

Let us consider the below example for understanding the relative locators.

![Relative Locators](https://www.selenium.dev/images/documentation/webdriver/relative_locators.png)

### Available relative locators[](https://www.selenium.dev/documentation/webdriver/elements/locators/#available-relative-locators)

#### Above[](https://www.selenium.dev/documentation/webdriver/elements/locators/#above)

If the email text field element is not easily identifiable for some reason, but the password text field element is, we can locate the text field element using the fact that it is an “input” element “above” the password element.

```python
email_locator = locate_with(By.TAG_NAME, "input").above({By.ID: "password"})
```

#### Below[](https://www.selenium.dev/documentation/webdriver/elements/locators/#below)

If the password text field element is not easily identifiable for some reason, but the email text field element is, we can locate the text field element using the fact that it is an “input” element “below” the email element.

```python
password_locator = locate_with(By.TAG_NAME, "input").below({By.ID: "email"})
```

#### Left of[](https://www.selenium.dev/documentation/webdriver/elements/locators/#left-of)

If the cancel button is not easily identifiable for some reason, but the submit button element is, we can locate the cancel button element using the fact that it is a “button” element to the “left of” the submit element.

```python
cancel_locator = locate_with(By.TAG_NAME, "button").to_left_of({By.ID: "submit"})
```

#### Right of[](https://www.selenium.dev/documentation/webdriver/elements/locators/#right-of)

If the submit button is not easily identifiable for some reason, but the cancel button element is, we can locate the submit button element using the fact that it is a “button” element “to the right of” the cancel element.

```python
submit_locator = locate_with(By.TAG_NAME, "button").to_right_of({By.ID: "cancel"})
```

#### Near[](https://www.selenium.dev/documentation/webdriver/elements/locators/#near)

If the relative positioning is not obvious, or it varies based on window size, you can use the near method to identify an element that is at most `50px` away from the provided locator. One great use case for this is to work with a form element that doesn’t have an easily constructed locator, but its associated [input label element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label) does.

```python
email_locator = locate_with(By.TAG_NAME, "input").near({By.ID: "lbl-email"})
```

### Chaining relative locators[](https://www.selenium.dev/documentation/webdriver/elements/locators/#chaining-relative-locators)

You can also chain locators if needed. Sometimes the element is most easily identified as being both above/below one element and right/left of another.

```python
submit_locator = locate_with(By.TAG_NAME, "button").below({By.ID: "email"}).to_right_of({By.ID: "cancel"})
```
