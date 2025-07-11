#Docker 
# Logentries logging driver
The `logentries` logging driver sends container logs to the [Logentries](https://logentries.com/) server.

## Usage[](https://docs.docker.com/config/containers/logging/logentries/#usage)

Some options are supported by specifying `--log-opt` as many times as needed:

-   `logentries-token`: specify the logentries log set token
-   `line-only`: send raw payload only

Configure the default logging driver by passing the `--log-driver` option to the Docker daemon:

```
$ dockerd --log-driver=logentries
```

To set the logging driver for a specific container, pass the `--log-driver` option to `docker run`:

```
$ docker run --log-driver=logentries ...
```

Before using this logging driver, you need to create a new Log Set in the Logentries web interface and pass the token of that log set to Docker:

```
$ docker run --log-driver=logentries --log-opt logentries-token=abcd1234-12ab-34cd-5678-0123456789ab
```

## Options[](https://docs.docker.com/config/containers/logging/logentries/#options)

Users can use the `--log-opt NAME=VALUE` flag to specify additional Logentries logging driver options.

### logentries-token[](https://docs.docker.com/config/containers/logging/logentries/#logentries-token)

You need to provide your log set token for logentries driver to work:

```
$ docker run --log-driver=logentries --log-opt logentries-token=abcd1234-12ab-34cd-5678-0123456789ab
```

### line-only[](https://docs.docker.com/config/containers/logging/logentries/#line-only)

You could specify whether to send log message wrapped into container data (default) or to send raw log line

```
$ docker run --log-driver=logentries --log-opt logentries-token=abcd1234-12ab-34cd-5678-0123456789ab --log-opt line-only=true
```