#Selenium 
# Install browser drivers
Setting up your system to allow a browser to be automated.

Through WebDriver, Selenium supports all major browsers on the market such as Chrome/Chromium, Firefox, Internet Explorer, Edge, Opera, and Safari. Where possible, WebDriver drives the browser using the browser’s built-in support for automation.

Since all the driver implementations except for Internet Explorer are provided by the browser vendors themselves, they are not included in the standard Selenium distribution. This section explains the basic requirements for getting you started with the different browsers.

Read about more advanced options for starting a driver in our [driver configuration](https://www.selenium.dev/documentation/webdriver/drivers/) documentation.

## Three Ways to Use Drivers[](https://www.selenium.dev/documentation/webdriver/getting_started/install_drivers/#three-ways-to-use-drivers)

### 1. Driver Management Software[](https://www.selenium.dev/documentation/webdriver/getting_started/install_drivers/#1-driver-management-software)

Most machines automatically update the browser, but the driver does not. To make sure you get the correct driver for your browser, there are many third party libraries to assist you.

-   [Java](https://www.selenium.dev/documentation/webdriver/getting_started/install_drivers/#tabs-2-0)
-   [Python](https://www.selenium.dev/documentation/webdriver/getting_started/install_drivers/#tabs-2-1)
-   [CSharp](https://www.selenium.dev/documentation/webdriver/getting_started/install_drivers/#tabs-2-2)
-   [Ruby](https://www.selenium.dev/documentation/webdriver/getting_started/install_drivers/#tabs-2-3)
-   [JavaScript](https://www.selenium.dev/documentation/webdriver/getting_started/install_drivers/#tabs-2-4)
-   [Kotlin](https://www.selenium.dev/documentation/webdriver/getting_started/install_drivers/#tabs-2-5)

1.  Import [WebDriver Manager for Python](https://github.com/SergeyPirogov/webdriver_manager)

```py
from webdriver_manager.chrome import ChromeDriverManager
```

Copy

2.  Use `install()` to get the location used by the manager and pass it into service class

```py
service = Service(executable_path=ChromeDriverManager().install())
```

Copy

3.  Use `Service` instance when initializing the driver:

```py
driver = webdriver.Chrome(service=service)
```

Copy

[See full example on GitHub.](https://github.com/SeleniumHQ/seleniumhq.github.io/blob/dev/examples/python/tests/getting_started/test_install_drivers.py)

### 2. The `PATH` Environment Variable[](https://www.selenium.dev/documentation/webdriver/getting_started/install_drivers/#2-the-path-environment-variable)

This option first requires manually downloading the driver (See [Quick Reference Section](https://www.selenium.dev/documentation/webdriver/getting_started/install_drivers/#quick-reference) for links).

This is a flexible option to change location of drivers without having to update your code, and will work on multiple machines without requiring that each machine put the drivers in the same place.

You can either place the drivers in a directory that is already listed in `PATH`, or you can place them in a directory and add it to `PATH`.

-   [Bash](https://www.selenium.dev/documentation/webdriver/getting_started/install_drivers/#tabs-3-0)
-   [Zsh](https://www.selenium.dev/documentation/webdriver/getting_started/install_drivers/#tabs-3-1)
-   [Windows](https://www.selenium.dev/documentation/webdriver/getting_started/install_drivers/#tabs-3-2)

To see what directories are already on `PATH`, open a Terminal and execute:

```shell
echo $PATH
```

Copy

If the location to your driver is not already in a directory listed, you can add a new directory to PATH:

```shell
echo 'export PATH=$PATH:/path/to/driver' >> ~/.bash_profile
source ~/.bash_profile
```

Copy

You can test if it has been added correctly by starting the driver:

```shell
chromedriver
```

Copy

If your `PATH` is configured correctly above, you will see some output relating to the startup of the driver:

```
Starting ChromeDriver 95.0.4638.54 (d31a821ec901f68d0d34ccdbaea45b4c86ce543e-refs/branch-heads/4638@{#871}) on port 9515
Only local connections are allowed.
Please see https://chromedriver.chromium.org/security-considerations for suggestions on keeping ChromeDriver safe.
ChromeDriver was started successfully.
```

You can regain control of your command prompt by pressing Ctrl+C

### 3. Hard Coded Location[](https://www.selenium.dev/documentation/webdriver/getting_started/install_drivers/#3-hard-coded-location)

Similar to Option 2 above, you need to manually download the driver (See [Quick Reference Section](https://www.selenium.dev/documentation/webdriver/getting_started/install_drivers/#quick-reference) for links). Specifying the location in the code itself has the advantage of not needing to figure out Environment Variables on your system, but has the drawback of making the code much less flexible.

-   [Java](https://www.selenium.dev/documentation/webdriver/getting_started/install_drivers/#tabs-4-0)
-   [Python](https://www.selenium.dev/documentation/webdriver/getting_started/install_drivers/#tabs-4-1)
-   [CSharp](https://www.selenium.dev/documentation/webdriver/getting_started/install_drivers/#tabs-4-2)
-   [Ruby](https://www.selenium.dev/documentation/webdriver/getting_started/install_drivers/#tabs-4-3)
-   [JavaScript](https://www.selenium.dev/documentation/webdriver/getting_started/install_drivers/#tabs-4-4)
-   [Kotlin](https://www.selenium.dev/documentation/webdriver/getting_started/install_drivers/#tabs-4-5)

```python
service = Service(executable_path="/path/to/chromedriver")
driver = webdriver.Chrome(service=service)
```

Copy

## Advanced Configuration[](https://www.selenium.dev/documentation/webdriver/getting_started/install_drivers/#advanced-configuration)

More information on how you can change the driver behavior can be found on the [Configuring driver parameters](https://www.selenium.dev/documentation/webdriver/drivers/) page.