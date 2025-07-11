#Selenium
# The Selenium Browser Automation Project
Selenium is an umbrella project for a range of tools and libraries that enable and support the automation of web browsers.

It provides extensions to emulate user interaction with browsers, a distribution server for scaling browser allocation, and the infrastructure for implementations of the [W3C WebDriver specification](https://www.w3.org/TR/webdriver/) that lets you write interchangeable code for all major web browsers.

This project is made possible by volunteer contributors who have put in thousands of hours of their own time, and made the source code [freely available](https://www.selenium.dev/documentation/about/copyright/#license) for anyone to use, enjoy, and improve.

Selenium brings together browser vendors, engineers, and enthusiasts to further an open discussion around automation of the web platform. The project organises [an annual conference](https://seleniumconf.com/) to teach and nurture the community.

At the core of Selenium is [WebDriver](https://www.selenium.dev/documentation/webdriver/), an interface to write instruction sets that can be run interchangeably in many browsers. Once you’ve installed everything, only a few lines of code get you inside a browser. You can find a more comprehensive example in [Writing your first Selenium script](https://www.selenium.dev/documentation/webdriver/getting_started/first_script/

```py
from selenium import webdriver


driver = webdriver.Chrome()

driver.get("http://selenium.dev")

driver.quit()
```


 