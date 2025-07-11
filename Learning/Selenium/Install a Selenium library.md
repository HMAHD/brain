#Selenium 
# Install a Selenium library
Setting up the Selenium library for your favourite programming language.

First you need to install the Selenium bindings for your automation project. The installation process for libraries depends on the language you choose to use. Make sure you check the [Selenium downloads page](https://www.selenium.dev/downloads/) to make sure you are using the latest version.

# Requirements by language

# Installation of Selenium libraries for Python can be done using pip:

```shell
pip install selenium
```

Copy

Alternatively you can download the [PyPI source archive](https://pypi.org/project/selenium/#files) (selenium-x.x.x.tar.gz) and install it using _setup.py_:

```shell
python setup.py install
```

# Installation of Selenium libraries for Java is accomplished using a build tool. You can see all available versions on [Maven Repository](https://mvnrepository.com/artifact/org.seleniumhq.selenium/selenium-java)

For Maven, add the _selenium-java_ dependency in your project `pom.xml` file:

```xml
<dependency>
  <groupId>org.seleniumhq.selenium</groupId>
  <artifactId>selenium-java</artifactId>
  <version>4.0.0</version>
</dependency>
```

For Gradle, add the _selenium-java_ dependency in your project `build.gradle` file:

```text
dependencies {
    compile group: 'org.seleniumhq.selenium', name: 'selenium-java', version: '4.0.0'
```

# Installation of Selenium libraries for JavaScript can be done using npm:

```shell
npm install selenium-webdriver
```

# Installation of Selenium libraries for Ruby can be done using gem:

```shell
gem install selenium-webdriver
```

Or add it to your `Gemfile`:

```rb
gem 'selenium-webdriver', '~> 4.0'
```

