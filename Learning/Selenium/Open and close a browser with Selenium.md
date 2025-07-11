#Selenium 
# Open and close a browser with Selenium
Code examples for starting and stopping a session with each browser.

Once you have a [Selenium library installed](https://www.selenium.dev/documentation/webdriver/getting_started/install_library/), and your [desired browser driver](https://www.selenium.dev/documentation/webdriver/getting_started/install_drivers/), you can start and stop a session with a browser.

Typically, browsers are started with specific options that describe which capabilities the browser must support, and how the browser should behave during the session. Some capabilities are [shared by all browsers](https://www.selenium.dev/documentation/webdriver/capabilities/shared/), and some will be specific to the browser being used. This page will show examples of starting a browser with the default capabilities.

After learning how to start a session, check out the next session on how to [write your first Selenium script](https://www.selenium.dev/documentation/webdriver/getting_started/first_script/)

## Chrome[](https://www.selenium.dev/documentation/webdriver/getting_started/open_browser/#chrome)

By default, Selenium 4 is compatible with Chrome v75 and greater. Note that the version of the Chrome browser and the version of chromedriver must match the major version.

In addition to the [shared capabilities](https://www.selenium.dev/documentation/webdriver/capabilities/shared/), there are specific [Chrome capabilities](https://www.selenium.dev/documentation/webdriver/capabilities/chromium/) that can be used.

```python
  options = ChromeOptions()
  driver = webdriver.Chrome(options=options)

  driver.quit()
```

## Safari[](https://www.selenium.dev/documentation/webdriver/getting_started/open_browser/#safari)

### Desktop[](https://www.selenium.dev/documentation/webdriver/getting_started/open_browser/#desktop)

Unlike Chromium and Firefox drivers, the safaridriver is installed with the Operating System. To enable automation on Safari, run the following command from the terminal:

```shell
safaridriver --enable
```

```python
  driver = webdriver.Safari()

  driver.quit()
  
```

