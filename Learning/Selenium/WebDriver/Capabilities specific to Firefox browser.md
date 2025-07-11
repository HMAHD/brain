#Selenium 
# Capabilities specific to Firefox browser
These capabilities are specific to Firefox.

### Define Capabilities using `FirefoxOptions`[](https://www.selenium.dev/documentation/webdriver/capabilities/firefox/#define-capabilities-using-firefoxoptions)

`FirefoxOptions` is the new way to define capabilities for the Firefox browser and should generally be used in preference to DesiredCapabilities.

```python
from selenium.webdriver.firefox.options import Options
options = Options()
options.headless = True
driver = webdriver.Firefox(options=options)
  
```

### Setting a custom profile[](https://www.selenium.dev/documentation/webdriver/capabilities/firefox/#setting-a-custom-profile)

It is possible to create a custom profile for Firefox as demonstrated below.

```python
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.firefox.firefox_profile import FirefoxProfile
options=Options()
firefox_profile = FirefoxProfile()
firefox_profile.set_preference("javascript.enabled", False)
options.profile = firefox_profile
  
```
