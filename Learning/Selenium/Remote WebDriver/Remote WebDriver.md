#Selenium 
# Remote WebDriver
You can use WebDriver remotely the same way you would use it locally. The primary difference is that a remote WebDriver needs to be configured so that it can run your tests on a separate machine.

A remote WebDriver is composed of two pieces: a client and a server. The client is your WebDriver test and the server is simply a Java servlet, which can be hosted in any modern JEE app server.

To run a remote WebDriver client, we first need to connect to the RemoteWebDriver. We do this by pointing the URL to the address of the server running our tests. In order to customize our configuration, we set desired capabilities. Below is an example of instantiating a remote WebDriver object pointing to our remote web server, _[www.example.com](https://www.example.com/)_, running our tests on Firefox.

```python
from selenium import webdriver

firefox_options = webdriver.FirefoxOptions()
driver = webdriver.Remote(
    command_executor='http://www.example.com',
    options=firefox_options
)
driver.get("http://www.google.com")
driver.quit() 
  
```

To further customize our test configuration, we can add other desired capabilities.

## Browser options[](https://www.selenium.dev/documentation/webdriver/remote_webdriver/#browser-options)

For example, suppose you wanted to run Chrome on Windows XP, using Chrome version 67:

```python
from selenium import webdriver

chrome_options = webdriver.ChromeOptions()
chrome_options.set_capability("browserVersion", "67")
chrome_options.set_capability("platformName", "Windows XP")
driver = webdriver.Remote(
    command_executor='http://www.example.com',
    options=chrome_options
)
driver.get("http://www.google.com")
driver.quit()  
  
```

## Local file detector[](https://www.selenium.dev/documentation/webdriver/remote_webdriver/#local-file-detector)

The Local File Detector allows the transfer of files from the client machine to the remote server. For example, if a test needs to upload a file to a web application, a remote WebDriver can automatically transfer the file from the local machine to the remote web server during runtime. This allows the file to be uploaded from the remote machine running the test. It is not enabled by default and can be enabled in the following way:

```python
from selenium.webdriver.remote.file_detector import LocalFileDetector

driver.file_detector = LocalFileDetector()
  
```

Once the above code is defined, you can upload a file in your test in the following way:

```python
driver.get("http://sso.dev.saucelabs.com/test/guinea-file-upload")

driver.find_element(By.ID, "myfile").send_keys("/Users/sso/the/local/path/to/darkbulb.jpg")
  
```

## Tracing client requests[](https://www.selenium.dev/documentation/webdriver/remote_webdriver/#tracing-client-requests)

This feature is only available for Java client binding (Beta onwards). The Remote WebDriver client sends requests to the Selenium Grid server, which passes them to the WebDriver. Tracing should be enabled at the server and client-side to trace the HTTP requests end-to-end. Both ends should have a trace exporter setup pointing to the visualization framework. By default, tracing is enabled for both client and server. To set up the visualization framework Jaeger UI and Selenium Grid 4, please refer to [Tracing Setup](https://github.com/SeleniumHQ/selenium/blob/selenium-4.0.0-beta-1/java/server/src/org/openqa/selenium/grid/commands/tracing.txt) for the desired version.

For client-side setup, follow the steps below.

#### Add the required dependencies[](https://www.selenium.dev/documentation/webdriver/remote_webdriver/#add-the-required-dependencies)

Installation of external libraries for tracing exporter can be done using Maven. Add the _opentelemetry-exporter-jaeger_ and _grpc-netty_ dependency in your project pom.xml:

```xml
  <dependency>
      <groupId>io.opentelemetry</groupId>
      <artifactId>opentelemetry-exporter-jaeger</artifactId>
      <version>1.0.0</version>
    </dependency>
    <dependency>
      <groupId>io.grpc</groupId>
      <artifactId>grpc-netty</artifactId>
      <version>1.35.0</version>
    </dependency>
```

#### Add/pass the required system properties while running the client[](https://www.selenium.dev/documentation/webdriver/remote_webdriver/#addpass-the-required-system-properties-while-running-the-client)

-   [Java](https://www.selenium.dev/documentation/webdriver/remote_webdriver/#tabs-4-0)

```java
System.setProperty("otel.traces.exporter", "jaeger");
System.setProperty("otel.exporter.jaeger.endpoint", "http://localhost:14250");
System.setProperty("otel.resource.attributes", "service.name=selenium-java-client");

ImmutableCapabilities capabilities = new ImmutableCapabilities("browserName", "chrome");

WebDriver driver = new RemoteWebDriver(new URL("http://www.example.com"), capabilities);

driver.get("http://www.google.com");

driver.quit();

  
```