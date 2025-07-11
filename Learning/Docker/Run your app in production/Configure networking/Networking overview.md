#Docker 
# Networking overview
One of the reasons Docker containers and services are so powerful is that you can connect them together, or connect them to non-Docker workloads. Docker containers and services do not even need to be aware that they are deployed on Docker, or whether their peers are also Docker workloads or not. Whether your Docker hosts run Linux, Windows, or a mix of the two, you can use Docker to manage them in a platform-agnostic way.

This topic defines some basic Docker networking concepts and prepares you to design and deploy your applications to take full advantage of these capabilities.

## Scope of this topic[](https://docs.docker.com/network/#scope-of-this-topic)

This topic does **not** go into OS-specific details about how Docker networks work, so you will not find information about how Docker manipulates `iptables` rules on Linux or how it manipulates routing rules on Windows servers, and you will not find detailed information about how Docker forms and encapsulates packets or handles encryption. See [Docker and iptables](https://docs.docker.com/network/iptables/).

In addition, this topic does not provide any tutorials for how to create, manage, and use Docker networks. Each section includes links to relevant tutorials and command references.

## Network drivers[](https://docs.docker.com/network/#network-drivers)

Docker’s networking subsystem is pluggable, using drivers. Several drivers exist by default, and provide core networking functionality:

-   `bridge`: The default network driver. If you don’t specify a driver, this is the type of network you are creating. **Bridge networks are usually used when your applications run in standalone containers that need to communicate.** See [bridge networks](https://docs.docker.com/network/bridge/).
    
-   `host`: For standalone containers, remove network isolation between the container and the Docker host, and use the host’s networking directly. See [use the host network](https://docs.docker.com/network/host/).
    
-   `overlay`: Overlay networks connect multiple Docker daemons together and enable swarm services to communicate with each other. You can also use overlay networks to facilitate communication between a swarm service and a standalone container, or between two standalone containers on different Docker daemons. This strategy removes the need to do OS-level routing between these containers. See [overlay networks](https://docs.docker.com/network/overlay/).
    
-   `ipvlan`: IPvlan networks give users total control over both IPv4 and IPv6 addressing. The VLAN driver builds on top of that in giving operators complete control of layer 2 VLAN tagging and even IPvlan L3 routing for users interested in underlay network integration. See [IPvlan networks](https://docs.docker.com/network/ipvlan/).
    
-   `macvlan`: Macvlan networks allow you to assign a MAC address to a container, making it appear as a physical device on your network. The Docker daemon routes traffic to containers by their MAC addresses. Using the `macvlan` driver is sometimes the best choice when dealing with legacy applications that expect to be directly connected to the physical network, rather than routed through the Docker host’s network stack. See [Macvlan networks](https://docs.docker.com/network/macvlan/).
    
-   `none`: For this container, disable all networking. Usually used in conjunction with a custom network driver. `none` is not available for swarm services. See [disable container networking](https://docs.docker.com/network/none/).
    
-   [Network plugins](https://docs.docker.com/engine/extend/plugins_services/): You can install and use third-party network plugins with Docker. These plugins are available from [Docker Hub](https://hub.docker.com/search?category=network&q=&type=plugin) or from third-party vendors. See the vendor’s documentation for installing and using a given network plugin.
    

### Network driver summary[](https://docs.docker.com/network/#network-driver-summary)

-   **User-defined bridge networks** are best when you need multiple containers to communicate on the same Docker host.
-   **Host networks** are best when the network stack should not be isolated from the Docker host, but you want other aspects of the container to be isolated.
-   **Overlay networks** are best when you need containers running on different Docker hosts to communicate, or when multiple applications work together using swarm services.
-   **Macvlan networks** are best when you are migrating from a VM setup or need your containers to look like physical hosts on your network, each with a unique MAC address.
-   **Third-party network plugins** allow you to integrate Docker with specialized network stacks.

## Networking tutorials[](https://docs.docker.com/network/#networking-tutorials)

Now that you understand the basics about Docker networks, deepen your understanding using the following tutorials:

-   [Standalone networking tutorial](https://docs.docker.com/network/network-tutorial-standalone/)
-   [Host networking tutorial](https://docs.docker.com/network/network-tutorial-host/)
-   [Overlay networking tutorial](https://docs.docker.com/network/network-tutorial-overlay/)
-   [Macvlan networking tutorial](https://docs.docker.com/network/network-tutorial-macvlan/)