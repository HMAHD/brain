#Selenium 
hese capabilities are shared by all browsers.

In order to create a new session by Selenium WebDriver, the local end should provide the basic capabilities to the remote end. The remote end uses the same set of capabilities to create a session and describes the current session features.

WebDriver provides capabilities that each remote end will/should support the implementation. The following capabilities are supported by WebDriver:

## browserName:[](https://www.selenium.dev/documentation/webdriver/capabilities/shared/#browsername)

This capability is used to set the `browserName` for a given session. If the specified browser is not installed at the remote end, the session creation will fail.

## browserVersion:[](https://www.selenium.dev/documentation/webdriver/capabilities/shared/#browserversion)

This capability is optional, this is used to set the available browser version at remote end. For Example, if ask for Chrome version 75 on a system that only has 80 installed, the session creation will fail.

## pageLoadStrategy:[](https://www.selenium.dev/documentation/webdriver/capabilities/shared/#pageloadstrategy)

When navigating to a new page via URL, by default Selenium will wait until the Document’s Ready State is “complete.” The `document.readyState` property of a document describes the loading state of the current document. By default, WebDriver will hold off on completing a navigation method (e.g., `driver.navigate().get()`) until the document ready state is `complete`. This does not necessarily mean that the page has finished loading, especially for sites like Single Page Applications that use a lot of JavaScript to dynamically load content after the Ready State returns complete. Note also that this behavior does not apply to navigation that is a result of clicking an element or submitting a form.

If a page takes a long time to load as a result of downloading assets (e.g., images, css, js) that aren’t important to the automation, you can change from the default parameter of `normal` to `eager` or `none` to speed up the session. This value applies to the entire session, so make sure that your [waiting strategy](https://www.selenium.dev/documentation/webdriver/waits/) is sufficient to minimize flakiness.


### normal[](https://www.selenium.dev/documentation/webdriver/capabilities/shared/#normal)

This will make Selenium WebDriver to wait for the entire page is loaded. When set to **normal**, Selenium WebDriver waits until the [load](https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event) event fire is returned.

By default **normal** is set to browser if none is provided.

```python
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
options = Options()
options.page_load_strategy = 'normal'
driver = webdriver.Chrome(options=options)
driver.get("http://www.google.com")
driver.quit()
```

### eager[](https://www.selenium.dev/documentation/webdriver/capabilities/shared/#eager)

This will make Selenium WebDriver to wait until the initial HTML document has been completely loaded and parsed, and discards loading of stylesheets, images and subframes.

When set to **eager**, Selenium WebDriver waits until [DOMContentLoaded](https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event) event fire is returned.

```python
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
options = Options()
options.page_load_strategy = 'eager'
driver = webdriver.Chrome(options=options)
driver.get("http://www.google.com")
driver.quit()
```

### none[](https://www.selenium.dev/documentation/webdriver/capabilities/shared/#none)

When set to **none** Selenium WebDriver only waits until the initial page is downloaded.

```python
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
options = Options()
options.page_load_strategy = 'none'
driver = webdriver.Chrome(options=options)
driver.get("http://www.google.com")
driver.quit()
```

## platformName[](https://www.selenium.dev/documentation/webdriver/capabilities/shared/#platformname)

This identifies the operating system at the remote-end, fetching the `platformName` returns the OS name.

In cloud-based providers, setting `platformName` sets the OS at the remote-end.

## acceptInsecureCerts[](https://www.selenium.dev/documentation/webdriver/capabilities/shared/#acceptinsecurecerts)

This capability checks whether an expired (or) invalid `TLS Certificate` is used while navigating during a session.

If the capability is set to `false`, an [insecure certificate error](https://developer.mozilla.org/en-US/docs/Web/WebDriver/Errors/InsecureCertificate) will be returned as navigation encounters any domain certificate problems. If set to `true`, invalid certificate will be trusted by the browser.

All self-signed certificates will be trusted by this capability by default. Once set, `acceptInsecureCerts` capability will have an effect for the entire session.

## timeouts[](https://www.selenium.dev/documentation/webdriver/capabilities/shared/#timeouts)

A WebDriver `session` is imposed with a certain `session timeout` interval, during which the user can control the behaviour of executing scripts or retrieving information from the browser.

Each session timeout is configured with combination of different `timeouts` as described below:

### Script Timeout:[](https://www.selenium.dev/documentation/webdriver/capabilities/shared/#script-timeout)

Specifies when to interrupt an executing script in a current browsing context. The default timeout **30,000** is imposed when a new session is created by WebDriver.

### Page Load Timeout:[](https://www.selenium.dev/documentation/webdriver/capabilities/shared/#page-load-timeout)

Specifies the time interval in which web page needs to be loaded in a current browsing context. The default timeout **300,000** is imposed when a new session is created by WebDriver. If page load limits a given/default time frame, the script will be stopped by _TimeoutException_.

### Implicit Wait Timeout[](https://www.selenium.dev/documentation/webdriver/capabilities/shared/#implicit-wait-timeout)

This specifies the time to wait for the implicit element location strategy when locating elements. The default timeout **0** is imposed when a new session is created by WebDriver.

## unhandledPromptBehavior[](https://www.selenium.dev/documentation/webdriver/capabilities/shared/#unhandledpromptbehavior)

Specifies the state of current session’s `user prompt handler`. Defaults to **dismiss and notify state**

### User Prompt Handler[](https://www.selenium.dev/documentation/webdriver/capabilities/shared/#user-prompt-handler)

This defines what action must take when a user prompt encounters at the remote-end. This is defined by `unhandledPromptBehavior` capability and has the following states:

-   dismiss
-   accept
-   dismiss and notify
-   accept and notify
-   ignore

## setWindowRect[](https://www.selenium.dev/documentation/webdriver/capabilities/shared/#setwindowrect)

This command alters the size and position of the current browsing context window. This command acts as setter to `getWindowRect` command which accepts **width**, **height**, **x**, **y** as _optional_ arguments.

During automation, the current browsing context will be associated with window states, which describe the visibility of the browser window. The window states are

-   maximized
-   minimized
-   normal
-   fullscreen

Setting _Width_ or _Height_ does not guaranteed that the resulting window size will exactly match that which was requested. This is because some drivers may not be able to resize in single-pixel increments. Due to this, fetching the window state/details by `getWindowRect` may not match the values set in the browser.

## strictFileInteractability[](https://www.selenium.dev/documentation/webdriver/capabilities/shared/#strictfileinteractability)

This new capability indicates if strict interactability checks should be applied to _input type=file_ elements. As strict interactability checks are off by default, there is a change in behaviour when using _Element Send Keys_ with hidden file upload controls.

## proxy[](https://www.selenium.dev/documentation/webdriver/capabilities/shared/#proxy)

A proxy server acts as an intermediary for requests between a client and a server. In simple, the traffic flows through the proxy server on its way to the address you requested and back.

A proxy server for automation scripts with Selenium could be helpful for:

-   Capture network traffic
-   Mock backend calls made by the website
-   Access the required website under complex network topologies or strict corporate restrictions/policies.

If you are in a corporate environment, and a browser fails to connect to a URL, this is most likely because the environment needs a proxy to be accessed.

Selenium WebDriver provides a way to proxy settings:

```python
from selenium import webdriver

PROXY = "<HOST:PORT>"
webdriver.DesiredCapabilities.FIREFOX['proxy'] = {
"httpProxy": PROXY,
"ftpProxy": PROXY,
"sslProxy": PROXY,
"proxyType": "MANUAL",

}

with webdriver.Firefox() as driver:
driver.get("https://selenium.dev")
```
