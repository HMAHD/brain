#GoLang 
## Managing dependencies as modules

In Go, you manage dependencies as modules that contain the packages you import. This process is supported by:

-   A **decentralized system for publishing** modules and retrieving their code. Developers make their modules available for other developers to use from their own repository and publish with a version number.
-   A **package search engine** and documentation browser (pkg.go.dev) at which you can find modules. See [Locating and importing useful packages](https://go.dev/doc/modules/managing-dependencies#locating_packages).
-   A module **version numbering convention** to help you understand a module’s stability and backward compatibility guarantees. See [Module version numbering](https://go.dev/doc/modules/version-numbers).
-   **Go tools** that make it easier for you to manage dependencies, including getting a module’s source, upgrading, and so on. See sections of this topic for more.