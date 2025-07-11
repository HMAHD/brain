#Docker 
# Plugin Config Version 1 of Plugin V2[🔗](https://docs.docker.com/engine/extend/config/#plugin-config-version-1-of-plugin-v2)
This document outlines the format of the V0 plugin configuration. The plugin config described herein was introduced in the Docker daemon in the [v1.12.0 release](https://github.com/docker/docker/commit/f37117045c5398fd3dca8016ea8ca0cb47e7312b).

Plugin configs describe the various constituents of a docker plugin. Plugin configs can be serialized to JSON format with the following media types:

Config Type

Media Type

config

“application/vnd.docker.plugin.v1+json”

## _Config_ Field Descriptions[](https://docs.docker.com/engine/extend/config/#config-field-descriptions)

Config provides the base accessible fields for working with V0 plugin format in the registry.

-   **`description`** _string_
    
    description of the plugin
    
-   **`documentation`** _string_
    
    link to the documentation about the plugin
    
-   **`interface`** _PluginInterface_
    
    interface implemented by the plugins, struct consisting of the following fields
    
    -   **`types`** _string array_
        
        types indicate what interface(s) the plugin currently implements.
        
        currently supported:
        
        -   **docker.volumedriver/1.0**
            
        -   **docker.networkdriver/1.0**
            
        -   **docker.ipamdriver/1.0**
            
        -   **docker.authz/1.0**
            
        -   **docker.logdriver/1.0**
            
        -   **docker.metricscollector/1.0**
            
    -   **`socket`** _string_
        
        socket is the name of the socket the engine should use to communicate with the plugins. the socket will be created in `/run/docker/plugins`.
        
-   **`entrypoint`** _string array_
    
    entrypoint of the plugin, see [`ENTRYPOINT`](https://docs.docker.com/engine/reference/builder/#entrypoint)
    
-   **`workdir`** _string_
    
    workdir of the plugin, see [`WORKDIR`](https://docs.docker.com/engine/reference/builder/#workdir)
    
-   **`network`** _PluginNetwork_
    
    network of the plugin, struct consisting of the following fields
    
    -   **`type`** _string_
        
        network type.
        
        currently supported:
        
        ```
        - **bridge**
        - **host**
        - **none**
        ```
        
-   **`mounts`** _PluginMount array_
    
    mount of the plugin, struct consisting of the following fields, see [`MOUNTS`](https://github.com/opencontainers/runtime-spec/blob/master/config.md#mounts)
    
    -   **`name`** _string_
        
        name of the mount.
        
    -   **`description`** _string_
        
        description of the mount.
        
    -   **`source`** _string_
        
        source of the mount.
        
    -   **`destination`** _string_
        
        destination of the mount.
        
    -   **`type`** _string_
        
        mount type.
        
    -   **`options`** _string array_
        
        options of the mount.
        
-   **`ipchost`** _boolean_ Access to host ipc namespace.
-   **`pidhost`** _boolean_ Access to host pid namespace.
    
-   **`propagatedMount`** _string_
    
    path to be mounted as rshared, so that mounts under that path are visible to docker. This is useful for volume plugins. This path will be bind-mounted outside of the plugin rootfs so it’s contents are preserved on upgrade.
    
-   **`env`** _PluginEnv array_
    
    env of the plugin, struct consisting of the following fields
    
    -   **`name`** _string_
        
        name of the env.
        
    -   **`description`** _string_
        
        description of the env.
        
    -   **`value`** _string_
        
        value of the env.
        
-   **`args`** _PluginArgs_
    
    args of the plugin, struct consisting of the following fields
    
    -   **`name`** _string_
        
        name of the args.
        
    -   **`description`** _string_
        
        description of the args.
        
    -   **`value`** _string array_
        
        values of the args.
        
-   **`linux`** _PluginLinux_
    
    -   **`capabilities`** _string array_
        
        capabilities of the plugin (_Linux only_), see list [`here`](https://github.com/opencontainers/runc/blob/master/libcontainer/SPEC.md#security)
        
    -   **`allowAllDevices`** _boolean_
        
        If `/dev` is bind mounted from the host, and allowAllDevices is set to true, the plugin will have `rwm` access to all devices on the host.
        
    -   **`devices`** _PluginDevice array_
        
        device of the plugin, (_Linux only_), struct consisting of the following fields, see [`DEVICES`](https://github.com/opencontainers/runtime-spec/blob/master/config-linux.md#devices)
        
        -   **`name`** _string_
            
            name of the device.
            
        -   **`description`** _string_
            
            description of the device.
            
        -   **`path`** _string_
            
            path of the device.
            

## Example Config[](https://docs.docker.com/engine/extend/config/#example-config)

_Example showing the ‘tiborvass/sample-volume-plugin’ plugin config._

```
{
  "Args": {
    "Description": "",
    "Name": "",
    "Settable": null,
    "Value": null
  },
  "Description": "A sample volume plugin for Docker",
  "Documentation": "https://docs.docker.com/engine/extend/plugins/",
  "Entrypoint": [
    "/usr/bin/sample-volume-plugin",
    "/data"
  ],
  "Env": [
    {
      "Description": "",
      "Name": "DEBUG",
      "Settable": [
        "value"
      ],
      "Value": "0"
    }
  ],
  "Interface": {
    "Socket": "plugin.sock",
    "Types": [
      "docker.volumedriver/1.0"
    ]
  },
  "Linux": {
    "Capabilities": null,
    "AllowAllDevices": false,
    "Devices": null
  },
  "Mounts": null,
  "Network": {
    "Type": ""
  },
  "PropagatedMount": "/data",
  "User": {},
  "Workdir": ""
}
```