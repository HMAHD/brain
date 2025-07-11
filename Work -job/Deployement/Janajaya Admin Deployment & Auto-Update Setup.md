

This guide explains how to **deploy, run, and automatically update Janajaya Admin** using **Docker, Portainer, and GitHub Webhooks**.

---

## **1️⃣ Server Setup**
### **Install Required Packages**
On the **VM**, install Docker, Git, and Webhook:
```bash
sudo apt update && sudo apt install -y docker.io git ufw webhook
```

---

## **2️⃣ Clone the Repository**
We cloned the `template-branch` from GitHub into `/var/www/janajaya_admin`:
```bash
cd /var/www
git clone -b template-branch --single-branch git@github.com:localseoios/janajaya_admin.git
cd janajaya_admin
```

---

## **3️⃣ Build and Run the Container**
We built the Docker image and ran the container manually:
```bash
docker build -t janajaya-admin .
docker run -d --name janajaya-admin -p 3039:3039 janajaya-admin
```

### **Check Running Containers**
To verify if the container is running:
```bash
docker ps
```

---

## **4️⃣ Deploy Janajaya Admin via Portainer**
Since we use **Portainer to manage containers**, we followed these steps:
1. **Go to Portainer UI** (`https://portainer.localseo.lk/`).
2. **Navigate to "Containers" → "Add Container"**.
3. **Set Container Name**: `janajaya-admin`
4. **Image Name**: `janajaya-admin:latest`
5. **Port Mapping**: `3039:3039`
6. **Restart Policy**: `Always`
7. **Click "Deploy the container"**.

---

## **5️⃣ Automate Updates with GitHub Webhook**
We set up a webhook to **automatically pull, rebuild, and restart the container** when a new commit is pushed to `template-branch`.

### **1️⃣ Create the Auto-Update Script**
We created a script `/var/www/janajaya_admin/update.sh`:
```bash
nano /var/www/janajaya_admin/update.sh
```
Paste this inside:
```bash
#!/bin/bash

# Navigate to project folder
cd /var/www/janajaya_admin

# Pull latest code
git pull origin template-branch

# Build updated Docker image
docker build -t janajaya-admin .

# Stop and remove old container
if docker ps -a | grep -q janajaya-admin; then
    echo "Stopping and removing existing container..."
    docker stop janajaya-admin || true
    docker rm -f janajaya-admin || true
fi

# Remove unused images
docker image prune -f

# Run new container
echo "Starting new container..."
docker run -d --name janajaya-admin -p 3039:3039 janajaya-admin

echo "Deployment completed successfully."
```
Save the file and make it executable:
```bash
chmod +x /var/www/janajaya_admin/update.sh
```

---

### **2️⃣ Set Up Webhook Listener**
To listen for GitHub webhook requests, we created a **webhook configuration**:
```bash
mkdir -p /var/www/janajaya_admin/webhook
nano /var/www/janajaya_admin/webhook/hooks.json
```
Paste this inside:
```json
[
  {
    "id": "janajaya-admin-update",
    "execute-command": "/var/www/janajaya_admin/update.sh",
    "command-working-directory": "/var/www/janajaya_admin",
    "response-message": "Janajaya Admin update triggered successfully.",
    "trigger-rule": {
      "match": {
        "type": "value",
        "value": "refs/heads/template-branch",
        "parameter": {
          "source": "payload",
          "name": "ref"
        }
      }
    }
  }
]
```
Save and restart the webhook service:
```bash
pkill webhook
webhook -hooks /var/www/janajaya_admin/webhook/hooks.json -verbose -port 9000 &
```

---

### **3️⃣ Add GitHub Webhook**
1. Go to **GitHub** → **Repository Settings** → **Webhooks**.
2. Click **"Add Webhook"**.
3. Set **Payload URL**:
   ```
   http://147.93.31.17:9000/hooks/janajaya-admin-update
   ```
4. **Set Content Type**: `application/json`
5. Choose **"Just the push event"**.
6. Click **Add Webhook**.

---

## **6️⃣ Troubleshooting & Fixes**
### **1️⃣ GitHub Webhook Not Working (Port Blocked)**
If **GitHub cannot connect**, check UFW logs:
```bash
tail -f /var/log/syslog
```
If you see `UFW BLOCK`, allow port **9000**:
```bash
sudo ufw allow 9000/tcp
sudo ufw reload
```

---

### **2️⃣ Webhook Not Running**
Check if the webhook service is running:
```bash
ps aux | grep webhook
```
If it’s not running, restart it:
```bash
pkill webhook
webhook -hooks /var/www/janajaya_admin/webhook/hooks.json -verbose -port 9000 &
```

---

### **3️⃣ Docker Fails to Start Container (Port Conflict)**
If you see **"port 3039 is already allocated"**, force remove the old container before starting a new one:
```bash
docker stop janajaya-admin
docker rm -f janajaya-admin
```
Then restart the container:
```bash
docker run -d --name janajaya-admin -p 3039:3039 janajaya-admin
```

---

## **7️⃣ Final Verification**
### **Manually Trigger Webhook**
To test the webhook manually:
```bash
curl -X POST http://127.0.0.1:9000/hooks/janajaya-admin-update
```
Expected response:
```
Janajaya Admin update triggered successfully.
```

### **Test Deployment in GitHub**
1. **Push a commit** to `template-branch`.
2. **Go to GitHub Webhooks** → Click **"Redeliver"**.
3. **Check container logs**:
   ```bash
   docker ps
   ```

---

## **📌 Summary**
✅ **Janajaya Admin is deployed in Docker & Portainer.**  
✅ **A webhook listens for GitHub push events on `template-branch`.**  
✅ **On each update, the container is rebuilt and restarted.**  
✅ **Firewall rules allow GitHub to trigger the webhook.**  
✅ **Everything is automated for future deployments!** 🚀  

