

A step-by-step checklist to secure and optimize your new Ubuntu VPS. Follow these essential steps!

---

## 🔑 Initial Server Access
### 1. Login via SSH
```bash
ssh root@your_server_ip
```

---

## 🔒 Essential Security Setup
### 1. Update System Packages
```bash
apt update && apt upgrade -y
apt autoremove
```

### 2. Create Non-Root User
```bash
adduser username
usermod -aG sudo username
```

### 3. SSH Hardening
1. **Disable Root Login**:
   ```bash
   sed -i 's/PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config
   ```
2. **Change SSH Port** (Optional):
   ```bash
   sed -i 's/#Port 22/Port 2222/' /etc/ssh/sshd_config
   ```
3. **Reload SSH**:
   ```bash
   systemctl restart sshd
   ```

### 4. Setup Firewall (UFW)
```bash
ufw allow 2222/tcp  # Or your custom SSH port
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable
```

---

## 🛡️ Advanced Security Measures
### 1. Install Fail2Ban
```bash
apt install fail2ban -y
systemctl enable fail2ban
```

### 2. Automatic Security Updates
```bash
apt install unattended-upgrades
dpkg-reconfigure -plow unattended-upgrades
```

---

## 📦 Install Essential Packages
```bash
apt install -y \
  curl \
  git \
  htop \
  nano \
  net-tools \
  tmux \
  wget \
  zsh
```

---

## 💾 Swap File Configuration (For Low RAM Servers)
```bash
fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo '/swapfile none swap sw 0 0' | tee -a /etc/fstab
```

---

## 🌐 Web Server Setup (Optional)
### 1. Install Nginx
```bash
apt install nginx -y
systemctl enable nginx
```

### 2. Install MySQL
```bash
apt install mysql-server -y
mysql_secure_installation
```

### 3. Install PHP
```bash
apt install php-fpm php-mysql -y
```

---

## 🔐 SSL Certificate (Let's Encrypt)
```bash
apt install certbot python3-certbot-nginx -y
certbot --nginx -d yourdomain.com
```

---

## 📊 Monitoring Tools
### 1. Install htop
```bash
apt install htop -y
```

### 2. Install Netdata (Real-time Monitoring)
```bash
bash <(curl -Ss https://my-netdata.io/kickstart.sh)
```

---

## 🔄 Automated Backups
### 1. Install Rclone (For Cloud Backups)
```bash
curl https://rclone.org/install.sh | sudo bash
```

### 2. Cron Job Example (Daily Backups)
```bash
0 3 * * * /usr/bin/rclone sync /home/user/backups remote:backups
```

---

## 🧹 Maintenance Best Practices
1. **Regular Updates**:
   ```bash
   apt update && apt upgrade -y
   ```
2. **Clean Package Cache**:
   ```bash
   apt clean
   ```
3. **Monitor Logs**:
   ```bash
   journalctl -xe
   ```

---

## ✅ Final Checklist
- [x] System updated & upgraded
- [x] Non-root user created
- [x] SSH port changed & root login disabled
- [x] UFW firewall configured
- [x] Fail2Ban installed
- [x] Automatic updates enabled
- [x] Essential packages installed
- [x] Swap file configured (if needed)
- [x] Web stack installed (if required)
- [x] SSL certificates installed
- [x] Monitoring tools setup
- [x] Backup system configured

🎉 Congratulations! Your VPS is now secure and production-ready!
