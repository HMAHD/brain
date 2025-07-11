
## Installation

### 1. Install prerequisites
```bash
sudo apt-get install gnupg curl
```

### 2. Add MongoDB GPG key
```bash
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
 sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg \
 --dearmor
```

### 3. Create MongoDB repository list file
```bash
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
```

### 4. Update package lists and install MongoDB
```bash
sudo apt-get update
sudo apt-get install -y mongodb-org
```

### 5. Start and enable MongoDB service
```bash
sudo systemctl daemon-reload
sudo systemctl start mongod
sudo systemctl enable mongod
```

### 6. Verify MongoDB status
```bash
sudo systemctl status mongod
```

## Basic Configuration

### Local Connection URI
```bash
mongodb://127.0.0.1:27017
```

## Security Configuration (Recommended)

### 1. Configure firewall
```bash
sudo ufw enable
sudo ufw allow 27017
sudo ufw allow 'OpenSSH'
sudo ufw status
```

### 2. Create admin user
Connect to MongoDB shell:
```bash
mongosh
```

Create admin user:
```javascript
use admin
db.createUser({user: "admin",pwd: "EvgixQ6H9mSMORi",roles: ["root"]})
```

Exit the shell:
```bash
.exit
```

### 3. Enable authentication
Edit MongoDB configuration:
```bash
sudo nano /etc/mongod.conf
```

Add/modify the security section:
```yaml
security:
  authorization: enabled
```

Restart MongoDB:
```bash
sudo service mongod restart
```

## Remote Connection Setup

### 1. Configure MongoDB to listen on all interfaces
Edit the MongoDB configuration file:
```bash
sudo nano /etc/mongod.conf
```

Find the `net` section and modify it:
```yaml
net:
  port: 27017
  bindIp: 0.0.0.0  # Listen on all interfaces
```

### 2. Restart MongoDB
```bash
sudo service mongod restart
```

### 3. Update firewall rules
```bash
sudo ufw allow from <remote-ip-address> to any port 27017
# Or to allow from any IP (less secure):
# sudo ufw allow 27017
```

### 4. Remote Connection URI
```bash
mongodb://admin:EvgixQ6H9mSMORi@<server-ip>:27017/?authSource=admin
```

### 5. Connect remotely using mongosh
```bash
mongosh "mongodb://<server-ip>:27017" --username admin --password EvgixQ6H9mSMORi --authenticationDatabase admin
```

## Application Database Setup

### 1. Create application database and user
Connect as admin:
```bash
mongosh --port 27017 --authenticationDatabase "admin" -u "admin" -p "EvgixQ6H9mSMORi"
```

Create database and user:
```javascript
use bms
db.createUser({
  user: "admin",
  pwd: "EvgixQ6H9mSMORi",
  roles: [{role: "readWrite", db: "bms"}]
})
```

### 2. Application Connection URI
```bash
mongodb://admin:EvgixQ6H9mSMORi@127.0.0.1:27017/bms?authSource=admin
```

For remote connections:
```bash
mongodb://admin:EvgixQ6H9mSMORi@<server-ip>:27017/bms?authSource=admin
```

## Security Recommendations

1. Change the default password to a more secure one
2. Restrict remote access to specific IP addresses
3. Consider enabling TLS/SSL for encrypted connections
4. Regularly update MongoDB to the latest version
5. Set up proper backup procedures for your databases

## Troubleshooting

If you encounter connection issues:
1. Verify MongoDB is running: `sudo systemctl status mongod`
2. Check firewall rules: `sudo ufw status`
3. Verify bindIp configuration in `/etc/mongod.conf`
4. Check MongoDB logs: `sudo tail -f /var/log/mongodb/mongod.log`