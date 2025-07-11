#Selenium 
# Chrome DevTools
Many browsers provide “DevTools” – a set of tools that are integrated with the browser that developers can use to debug web apps and explore the performance of their pages. Google Chrome’s DevTools make use of a protocol called the Chrome DevTools Protocol (or “CDP” for short). As the name suggests, this is not designed for testing, nor to have a stable API, so functionality is highly dependent on the version of the browser.

WebDriver Bidi is the next generation of the W3C WebDriver protocol and aims to provide a stable API implemented by all browsers, but it’s not yet complete. Until it is, Selenium provides access to the CDP for those browsers that implement it (such as Google Chrome, or Microsoft Edge, and Firefox), allowing you to enhance your tests in interesting ways. Some examples of what you can do with it are given below.

## Emulate Geo Location[](https://www.selenium.dev/documentation/webdriver/bidirectional/chrome_devtools/#emulate-geo-location)

Some applications have different features and functionalities across different locations. Automating such applications is difficult because it is hard to emulate the geo-locations in the browser using Selenium. But with the help of Devtools, we can easily emulate them. Below code snippet demonstrates that.

```python
from selenium import webdriver
from selenium.webdriver.chrome.service import Service

def geoLocationTest():
    driver = webdriver.Chrome()
    Map_coordinates = dict({
        "latitude": 41.8781,
        "longitude": -87.6298,
        "accuracy": 100
        })
    driver.execute_cdp_cmd("Emulation.setGeolocationOverride", Map_coordinates)
    driver.get("<your site url>")
  
```

## Emulate Geo Location with the Remote WebDriver:[](https://www.selenium.dev/documentation/webdriver/bidirectional/chrome_devtools/#emulate-geo-location-with-the-remote-webdriver)

```python
from selenium import webdriver
#Replace the version to match the Chrome version
import selenium.webdriver.common.devtools.v93 as devtools

async def geoLocationTest():
    chrome_options = webdriver.ChromeOptions()
    driver = webdriver.Remote(
        command_executor='<grid-url>',
        options=chrome_options
    )

    async with driver.bidi_connection() as session:
        cdpSession = session.session
        await cdpSession.execute(devtools.emulation.set_geolocation_override(latitude=41.8781,longitude=-87.6298,accuracy=100))
    driver.get("https://my-location.org/")
    driver.quit()
  
```