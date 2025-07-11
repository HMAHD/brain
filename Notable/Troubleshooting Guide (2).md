---
deleted: true
title: Troubleshooting Guide
created: '2024-08-23T08:24:57.385Z'
modified: '2024-08-23T09:19:32.234Z'
---

# Troubleshooting Guide

This guide covers common issues you might encounter while setting up and running our cloud-native multi-service deployment.

## Table of Contents

1. [Docker Issues](#docker-issues)
2. [Nginx Configuration Problems](#nginx-configuration-problems)
3. [Port 80 Conflict](#port-80-conflict)
4. [Error: "Unable to Mount nginx.conf"](#error-unable-to-mount-nginxconf)
5. [Network Connectivity](#network-connectivity)
6. [Database Connection Issues](#database-connection-issues)
7. [Automated Script Failures](#automated-script-failures)

## Docker Issues

### Error: "network not found"

**Symptom:** Docker Compose fails with a "network not found" error.

**Solution:**

1. Prune unused Docker networks:
   ```
   docker network prune
   ```
2. Restart the Docker daemon:
   ```
   sudo systemctl restart docker
   ```
3. Try running `docker-compose up -d` again.

### Error: "port is already allocated"

**Symptom:** Container fails to start due to port conflict.

**Solution:**

1. Check which process is using the port:
   ```
   sudo lsof -i :<port_number>
   ```
2. Stop the conflicting process or change the port in `docker-compose.yml`.

## Nginx Configuration Problems

### Error: "502 Bad Gateway"

**Symptom:** Nginx returns a 502 error when accessing services.

**Solution:**

1. Check if Docker containers are running:
   ```
   docker ps
   ```
2. Verify Nginx configuration:
   ```
   sudo nginx -t
   ```
3. Check Nginx error logs:
   ```
   sudo tail -f /var/log/nginx/error.log
   ```

### Port 80 Conflict

**Symptom:** Nginx container fails to start because port 80 is already in use on your system.

**Solution:**

1. **Check What's Using Port 80**  
   Run one of these commands:
   ```bash
   sudo lsof -i :80
   ```
   or
   ```bash
   sudo netstat -tulpn | grep :80
   ```

2. **Stop the Process Using Port 80**  
   If it's a service you don't need, you can stop it:
   - If it's Apache:
     ```bash
     sudo systemctl stop apache2
     ```
   - If Nginx is running directly on the host:
     ```bash
     sudo systemctl stop nginx
     ```

3. **Change Nginx's Port in Docker**  
   If you can't stop the process using port 80, change the port in your `docker-compose.yaml` file:
   ```yaml
   nginx:
     image: nginx:latest
     ports:
       - "8080:80"
     volumes:
       - ./nginx.conf:/etc/nginx/nginx.conf:ro
     depends_on:
       - web
       - api
   ```
   This maps port 8080 on your host to port 80 in the container.

4. **Use `network_mode: "host"` for Nginx**  
   If you're using host networking, try this:
   ```yaml
   nginx:
     image: nginx:latest
     network_mode: "host"
     volumes:
       - ./nginx.conf:/etc/nginx/nginx.conf:ro
     depends_on:
       - web
       - api
   ```
   *Note: Remove the `ports` section and make sure nothing else uses port 80 on your host.*

5. **Ensure Docker Runs with the Right Permissions**  
   Add your user to the `docker` group:
   ```bash
   sudo usermod -aG docker USER
   ```
   Then log out and back in.

6. **Restart Docker**  
   Sometimes a Docker restart helps:
   ```bash
   sudo systemctl restart docker
   ```

### Error: "Unable to Mount nginx.conf"

**Symptom:** The Nginx container fails to start, and the error message indicates that Docker is unable to mount the `nginx.conf` file.

**Solution:**

1. **Check if the `nginx.conf` File Exists**  
   First, make sure the `nginx.conf` file exists in the specified location:
   ```bash
   ls -l /home/ec2-user/devops-challenge-apps/nginx.conf
   ```
   If the file doesn’t exist, you’ll need to create it.

2. **Verify that `nginx.conf` is a File, Not a Directory**  
   The error might suggest that the system is trying to mount a directory instead of a file. Check if `nginx.conf` is a file:
   ```bash
   file /home/ec2-user/devops-challenge-apps/nginx.conf
   ```
   It should return something like `nginx.conf: ASCII text` if it’s a regular file.

3. **Check File Permissions**  
   Ensure that the `nginx.conf` file has the correct permissions:
   ```bash
   ls -l /home/ec2-user/devops-challenge-apps/nginx.conf
   ```
   The file should be readable by all users. If not, you can change permissions:
   ```bash
   chmod 644 /home/ec2-user/devops-challenge-apps/nginx.conf
   ```

4. **Verify the Content of `nginx.conf`**  
   Make sure the `nginx.conf` file contains valid Nginx configuration:
   ```bash
   cat /home/ec2-user/devops-challenge-apps/nginx.conf
   ```

5. **Update the `docker-compose.yaml` File**  
   Ensure that the volume mapping for `nginx.conf` in your `docker-compose.yaml` file is correct:
   ```yaml
   nginx:
     image: nginx:latest
     volumes:
       - ./nginx.conf:/etc/nginx/nginx.conf:ro
   ```
   Make sure the path to `nginx.conf` is correct relative to where your `docker-compose.yaml` file is located.

6. **Try Using an Absolute Path**  
   If the relative path doesn’t work, you can try using an absolute path in your `docker-compose.yaml`:
   ```yaml
   nginx:
     image: nginx:latest
     volumes:
       - /home/ec2-user/devops-challenge-apps/nginx.conf:/etc/nginx/nginx.conf:ro
   ```

7. **Recreate the Containers**  
   After making these changes, try to recreate your containers:
   ```bash
   docker-compose down
   docker-compose up -d
   ```

8. **Check SELinux (if applicable)**  
   If you’re using a system with SELinux enabled (like some CentOS or RHEL systems), it might be interfering with the mount. You can temporarily disable SELinux to test:
   ```bash
   sudo setenforce 0
   ```
   Remember to re-enable it after testing if this solves the issue.

If these steps don’t resolve the issue, please provide the following information for further diagnosis:

- The content of your `nginx.conf` file
- The output of `ls -l /home/ec2-user/devops-challenge-apps/nginx.conf`
- Your current `docker-compose.yaml` file
```

This addition covers the potential causes and solutions for the issue related to mounting the `nginx.conf` file in Docker.
