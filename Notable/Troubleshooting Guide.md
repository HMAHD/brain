---
deleted: true
title: Troubleshooting Guide
created: '2024-08-22T20:08:46.081Z'
modified: '2024-08-23T05:49:24.807Z'
---

# Troubleshooting Guide

This guide covers common issues you might encounter while setting up and running our cloud-native multi-service deployment.

## Table of Contents

1. [Docker Issues](#docker-issues)
2. [Nginx Configuration Problems](#nginx-configuration-problems)
3. [Network Connectivity](#network-connectivity)
4. [Database Connection Issues](#database-connection-issues)
5. [Automated Script Failures](#automated-script-failures)

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

## Network Connectivity

### Cannot access services from external network

**Symptom:** Services work locally but are not accessible from the internet.

**Solution:**
1. Check EC2 security group settings:
   - Ensure ports 80 and 443 are open to your IP or 0.0.0.0/0
2. Verify Elastic IP association (if used)
3. Check if services are bound to localhost instead of 0.0.0.0 in Docker

## Database Connection Issues

### Error: "connection refused" to PostgreSQL

**Symptom:** Applications can't connect to the database.

**Solution:**
1. Check if the database container is running:
   ```
   docker ps | grep postgres
   ```
2. Verify database credentials in application configurations
3. Ensure the database port is correctly mapped in `docker-compose.yml`

## Automated Script Failures

### update_content.sh not running automatically

**Symptom:** Daily updates are not occurring as scheduled.

**Solution:**
1. Check if the cron job is properly set:
   ```
   crontab -l
   ```
2. Verify script permissions:
   ```
   ls -l update_content.sh
   ```
3. Check cron logs:
   ```
   grep CRON /var/log/syslog
   ```

### Script runs but doesn't update content

**Symptom:** The script executes but no changes are reflected.

**Solution:**
1. Check the script's log file for errors
2. Verify if the script has the necessary permissions to modify files
3. Ensure the Docker container names in the script match those in `docker-compose.yml`

---

If you encounter an issue not covered here, please:
1. Check the application logs:
   ```
   docker-compose logs
   ```
2. Review EC2 instance system logs
3. Consult AWS documentation for EC2-specific issues

For persistent problems, please open an issue in the GitHub repository with:
- A clear description of the problem
- Steps to reproduce
- Relevant log outputs
- Your environment details (OS, Docker version, etc.)

```

This TROUBLESHOOTING.md file covers:

1. Common Docker-related issues
2. Nginx configuration problems
3. Network connectivity troubleshooting
4. Database connection issues
5. Problems with the automated update script

It provides specific commands and steps to diagnose and solve each problem. The structure is easy to navigate with a table of contents and clear headings.

You can expand this guide as you encounter more specific issues in your project. Remember to keep it updated as you discover new solutions or common problems that users face.
