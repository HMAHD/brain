#Selenium 
# Capabilities specific to Internet Explorer browser
These capabilities are specific to Internet Explorer.

### fileUploadDialogTimeout[](https://www.selenium.dev/documentation/webdriver/capabilities/internet_explorer/#fileuploaddialogtimeout)

In some environments, Internet Explorer may timeout when opening the File Upload dialog. IEDriver has a default timeout of 1000ms, but you can increase the timeout using the fileUploadDialogTimeout capability.

```python
from selenium import webdriver

options = webdriver.IeOptions()
options.file_upload_dialog_timeout = 2000
driver = webdriver.Ie(options=options)

driver.get("http://www.google.com")

driver.quit()
  
```

### ensureCleanSession[](https://www.selenium.dev/documentation/webdriver/capabilities/internet_explorer/#ensurecleansession)

When set to `true`, this capability clears the _Cache, Browser History and Cookies_ for all running instances of InternetExplorer including those started manually or by the driver. By default, it is set to `false`.

Using this capability will cause performance drop while launching the browser, as the driver will wait until the cache gets cleared before launching the IE browser.

This capability accepts a Boolean value as parameter.

```python
from selenium import webdriver

options = webdriver.IeOptions()
options.ensure_clean_session = True
driver = webdriver.Ie(options=options)

driver.get("http://www.google.com")

driver.quit()
  
```

### ignoreZoomSetting[](https://www.selenium.dev/documentation/webdriver/capabilities/internet_explorer/#ignorezoomsetting)

InternetExplorer driver expects the browser zoom level to be 100%, else the driver will throw an exception. This default behaviour can be disabled by setting the _ignoreZoomSetting_ to _true_.

This capability accepts a Boolean value as parameter.

```python
from selenium import webdriver

options = webdriver.IeOptions()
options.ignore_zoom_level = True
driver = webdriver.Ie(options=options)

driver.get("http://www.google.com")

driver.quit()
  
```

### ignoreProtectedModeSettings[](https://www.selenium.dev/documentation/webdriver/capabilities/internet_explorer/#ignoreprotectedmodesettings)

Whether to skip the _Protected Mode_ check while launching a new IE session.

If not set and _Protected Mode_ settings are not same for all zones, an exception will be thrown by the driver.

If capability is set to `true`, tests may become flaky, unresponsive, or browsers may hang. However, this is still by far a second-best choice, and the first choice should _always_ be to actually set the Protected Mode settings of each zone manually. If a user is using this property, only a “best effort” at support will be given.

This capability accepts a Boolean value as parameter.

```python
from selenium import webdriver

options = webdriver.IeOptions()
options.ignore_protected_mode_settings = True
driver = webdriver.Ie(options=options)

driver.get("http://www.google.com")

driver.quit()
  
```

### silent[](https://www.selenium.dev/documentation/webdriver/capabilities/internet_explorer/#silent)

When set to `true`, this capability suppresses the diagnostic output of the IEDriverServer.

This capability accepts a Boolean value as parameter.

```python
from selenium import webdriver

options = webdriver.IeOptions()
options.set_capability("silent", True)
driver = webdriver.Ie(options=options)

driver.get("http://www.google.com")

driver.quit()
  
```

### Command-Line Options[](https://www.selenium.dev/documentation/webdriver/capabilities/internet_explorer/#command-line-options)

Internet Explorer includes several command-line options that enable you to troubleshoot and configure the browser.

The following describes few supported command-line options

-   _-private_ : Used to start IE in private browsing mode. This works for IE 8 and later versions.
    
-   _-k_ : Starts Internet Explorer in kiosk mode. The browser opens in a maximized window that does not display the address bar, the navigation buttons, or the status bar.
    
-   _-extoff_ : Starts IE in no add-on mode. This option specifically used to troubleshoot problems with browser add-ons. Works in IE 7 and later versions.
    

Note: **forceCreateProcessApi** should to enabled in-order for command line arguments to work.

```python
from selenium import webdriver

options = webdriver.IeOptions()
options.add_argument('-private')
options.force_create_process_api = True
driver = webdriver.Ie(options=options)

driver.get("http://www.google.com")

driver.quit()
  
```

### forceCreateProcessApi[](https://www.selenium.dev/documentation/webdriver/capabilities/internet_explorer/#forcecreateprocessapi)

Forces launching Internet Explorer using the CreateProcess API. The default value is false.

For IE 8 and above, this option requires the “TabProcGrowth” registry value to be set to 0.

```python
from selenium import webdriver

options = webdriver.IeOptions()
options.force_create_process_api = True
driver = webdriver.Ie(options=options)

driver.get("http://www.google.com")

driver.quit()
  
```

