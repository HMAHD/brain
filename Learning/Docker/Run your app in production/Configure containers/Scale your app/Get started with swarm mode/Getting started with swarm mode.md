#Docker 
# Getting started with swarm mode
This tutorial introduces you to the features of Docker Engine Swarm mode. You may want to familiarize yourself with the [key concepts](https://docs.docker.com/engine/swarm/key-concepts/) before you begin.

The tutorial guides you through the following activities:

-   initializing a cluster of Docker Engines in swarm mode
-   adding nodes to the swarm
-   deploying application services to the swarm
-   managing the swarm once you have everything running

This tutorial uses Docker Engine CLI commands entered on the command line of a terminal window.

If you are brand new to Docker, see [About Docker Engine](https://docs.docker.com/engine/).

## Set up[](https://docs.docker.com/engine/swarm/swarm-tutorial/#set-up)

To run this tutorial, you need the following:

-   [three Linux hosts which can communicate over a network, with Docker installed](https://docs.docker.com/engine/swarm/swarm-tutorial/#three-networked-host-machines)
-   [the IP address of the manager machine](https://docs.docker.com/engine/swarm/swarm-tutorial/#the-ip-address-of-the-manager-machine)
-   [open ports between the hosts](https://docs.docker.com/engine/swarm/swarm-tutorial/#open-protocols-and-ports-between-the-hosts)

### Three networked host machines[](https://docs.docker.com/engine/swarm/swarm-tutorial/#three-networked-host-machines)

This tutorial requires three Linux hosts which have Docker installed and can communicate over a network. These can be physical machines, virtual machines, Amazon EC2 instances, or hosted in some other way. Check out [Getting started - Swarms](https://docs.docker.com/get-started/swarm-deploy/#prerequisites) for one possible set-up for the hosts.

One of these machines is a manager (called `manager1`) and two of them are workers (`worker1` and `worker2`).

> **Note**: You can follow many of the tutorial steps to test single-node swarm as well, in which case you need only one host. Multi-node commands do not work, but you can initialize a swarm, create services, and scale them.

#### Install Docker Engine on Linux machines

If you are using Linux based physical computers or cloud-provided computers as hosts, simply follow the [Linux install instructions](https://docs.docker.com/engine/install/) for your platform. Spin up the three machines, and you are ready. You can test both single-node and multi-node swarm scenarios on Linux machines.

#### Use Docker Desktop for Mac or Docker Desktop for Windows

Alternatively, install the latest [Docker Desktop for Mac](https://docs.docker.com/desktop/mac/) or [Docker Desktop for Windows](https://docs.docker.com/desktop/windows/) application on one computer. You can test both single-node and multi-node swarm from this computer.

-   You can use Docker Desktop for Mac or Windows to test _single-node_ features of swarm mode, including initializing a swarm with a single node, creating services, and scaling services.
-   Currently, you cannot use Docker Desktop for Mac or Docker Desktop for Windows alone to test a _multi-node_ swarm, but many examples are applicable to a single-node Swarm setup.

### The IP address of the manager machine[](https://docs.docker.com/engine/swarm/swarm-tutorial/#the-ip-address-of-the-manager-machine)

The IP address must be assigned to a network interface available to the host operating system. All nodes in the swarm need to connect to the manager at the IP address.

Because other nodes contact the manager node on its IP address, you should use a fixed IP address.

You can run `ifconfig` on Linux or macOS to see a list of the available network interfaces.

The tutorial uses `manager1` : `192.168.99.100`.

### Open protocols and ports between the hosts[](https://docs.docker.com/engine/swarm/swarm-tutorial/#open-protocols-and-ports-between-the-hosts)

The following ports must be available. On some systems, these ports are open by default.

-   **TCP port 2377** for cluster management communications
-   **TCP** and **UDP port 7946** for communication among nodes
-   **UDP port 4789** for overlay network traffic

If you plan on creating an overlay network with encryption (`--opt encrypted`), you also need to ensure **ip protocol 50** (**ESP**) traffic is allowed.