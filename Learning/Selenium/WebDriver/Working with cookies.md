#Selenium 
# Working with cookies
A cookie is a small piece of data that is sent from a website and stored in your computer. Cookies are mostly used to recognise the user and load the stored information.

WebDriver API provides a way to interact with cookies with built-in methods:

## Add Cookie[](https://www.selenium.dev/documentation/webdriver/browser/cookies/#add-cookie)

It is used to add a cookie to the current browsing context. Add Cookie only accepts a set of defined serializable JSON object. [Here](https://www.w3.org/TR/webdriver1/#cookies) is the link to the list of accepted JSON key values

First of all, you need to be on the domain that the cookie will be valid for. If you are trying to preset cookies before you start interacting with a site and your homepage is large / takes a while to load an alternative is to find a smaller page on the site (typically the 404 page is small, e.g. [http://example.com/some404page](http://example.com/some404page))

```python
from selenium import webdriver

driver = webdriver.Chrome()

driver.get("http://www.example.com")

# Adds the cookie into current browser context
driver.add_cookie({"name": "key", "value": "value"})
  
```

## Get Named Cookie[](https://www.selenium.dev/documentation/webdriver/browser/cookies/#get-named-cookie)

It returns the serialized cookie data matching with the cookie name among all associated cookies.

```python
from selenium import webdriver

driver = webdriver.Chrome()

# Navigate to url
driver.get("http://www.example.com")

# Adds the cookie into current browser context
driver.add_cookie({"name": "foo", "value": "bar"})

# Get cookie details with named cookie 'foo'
print(driver.get_cookie("foo"))
  
```

## Get All Cookies[](https://www.selenium.dev/documentation/webdriver/browser/cookies/#get-all-cookies)

It returns a ‘successful serialized cookie data’ for current browsing context. If browser is no longer available it returns error.

```python
from selenium import webdriver

driver = webdriver.Chrome()

# Navigate to url
driver.get("http://www.example.com")

driver.add_cookie({"name": "test1", "value": "cookie1"})
driver.add_cookie({"name": "test2", "value": "cookie2"})

# Get all available cookies
print(driver.get_cookies())
  
```

## Delete Cookie[](https://www.selenium.dev/documentation/webdriver/browser/cookies/#delete-cookie)

It deletes the cookie data matching with the provided cookie name.

```python
from selenium import webdriver
driver = webdriver.Chrome()

# Navigate to url
driver.get("http://www.example.com")
driver.add_cookie({"name": "test1", "value": "cookie1"})
driver.add_cookie({"name": "test2", "value": "cookie2"})

# Delete a cookie with name 'test1'
driver.delete_cookie("test1")
  
```

## Delete All Cookies[](https://www.selenium.dev/documentation/webdriver/browser/cookies/#delete-all-cookies)

It deletes all the cookies of the current browsing context.

```python
from selenium import webdriver
driver = webdriver.Chrome()

# Navigate to url
driver.get("http://www.example.com")
driver.add_cookie({"name": "test1", "value": "cookie1"})
driver.add_cookie({"name": "test2", "value": "cookie2"})

#  Deletes all cookies
driver.delete_all_cookies()
  
```

## Same-Site Cookie Attribute[](https://www.selenium.dev/documentation/webdriver/browser/cookies/#same-site-cookie-attribute)

It allows a user to instruct browsers to control whether cookies are sent along with the request initiated by third party sites. It is introduced to prevent CSRF (Cross-Site Request Forgery) attacks.

Same-Site cookie attribute accepts two parameters as instructions

## Strict:[](https://www.selenium.dev/documentation/webdriver/browser/cookies/#strict)

When the sameSite attribute is set as **Strict**, the cookie will not be sent along with requests initiated by third party websites.

## Lax:[](https://www.selenium.dev/documentation/webdriver/browser/cookies/#lax)

When you set a cookie sameSite attribute to **Lax**, the cookie will be sent along with the GET request initiated by third party website.

**Note**: **As of now this feature is landed in chrome(80+version), Firefox(79+version) and works with Selenium 4 and later versions.**

```python
from selenium import webdriver

driver = webdriver.Chrome()

driver.get("http://www.example.com")
# Adds the cookie into current browser context with sameSite 'Strict' (or) 'Lax'
driver.add_cookie({"name": "foo", "value": "value", 'sameSite': 'Strict'})
driver.add_cookie({"name": "foo1", "value": "value", 'sameSite': 'Lax'})
cookie1 = driver.get_cookie('foo')
cookie2 = driver.get_cookie('foo1')
print(cookie1)
print(cookie2)
  
```

