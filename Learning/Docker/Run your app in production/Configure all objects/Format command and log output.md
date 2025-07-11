#Docker 
# Format command and log output
Docker uses [Go templates](https://golang.org/pkg/text/template/) which you can use to manipulate the output format of certain commands and log drivers.

Docker provides a set of basic functions to manipulate template elements. All of these examples use the `docker inspect` command, but many other CLI commands have a `--format` flag, and many of the CLI command references include examples of customizing the output format.

> **Note**
> 
> When using the `--format` flag, you need observe your shell environment. In a Posix shell, you can run the following with a single quote:
> 
> ```
> $ docker inspect --format '{{join .Args " , "}}'
> ```
> 
> Otherwise, in a Windows shell (for example, PowerShell), you need to use single quotes, but escape the double quotes inside the params as follows:
> 
> ```
> $ docker inspect --format '{{join .Args \" , \"}}'
> ```

## join[](https://docs.docker.com/config/formatting/#join)

`join` concatenates a list of strings to create a single string. It puts a separator between each element in the list.

```
$ docker inspect --format '{{join .Args " , "}}' container
```

## table[](https://docs.docker.com/config/formatting/#table)

`table` specifies which fields you want to see its output.

```
$ docker image list --format "table {{.ID}}\t{{.Repository}}\t{{.Tag}}\t{{.Size}}"
```

## json[](https://docs.docker.com/config/formatting/#json)

`json` encodes an element as a json string.

```
$ docker inspect --format '{{json .Mounts}}' container
```

## lower[](https://docs.docker.com/config/formatting/#lower)

`lower` transforms a string into its lowercase representation.

```
$ docker inspect --format "{{lower .Name}}" container
```

## split[](https://docs.docker.com/config/formatting/#split)

`split` slices a string into a list of strings separated by a separator.

```
$ docker inspect --format '{{split .Image ":"}}'
```

## title[](https://docs.docker.com/config/formatting/#title)

`title` capitalizes the first character of a string.

```
$ docker inspect --format "{{title .Name}}" container
```

## upper[](https://docs.docker.com/config/formatting/#upper)

`upper` transforms a string into its uppercase representation.

```
$ docker inspect --format "{{upper .Name}}" container
```

## println[](https://docs.docker.com/config/formatting/#println)

`println` prints each value on a new line.

```
$ docker inspect --format='{{range .NetworkSettings.Networks}}{{println .IPAddress}}{{end}}' container
```

# Hint[](https://docs.docker.com/config/formatting/#hint)

To find out what data can be printed, show all content as json:

```
$ docker container ls --format='{{json .}}'
```