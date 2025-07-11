
## 1. **Update the System**

```bash
sudo apt update && sudo apt upgrade -y
```

---

## 2. **Install MySQL**

```bash
sudo apt install mysql-server -y
```

---

## 3. **Secure the MySQL Installation**

Run the MySQL security setup:

```bash
sudo mysql_secure_installation
```

Follow the prompts:

- Set a **root password**.
- Remove **anonymous users**.
- Disable **remote root login**.
- Remove **test database**.
- Reload privileges.

---

## 4. **Log In to MySQL**

```bash
sudo mysql
```

---

## 5. **Create a Database**

Replace `your_database_name` with your desired database name:

```sql
CREATE DATABASE your_database_name;
```

---

## 6. **Create a New User**

Replace `your_user` and `your_password`:

```sql
CREATE USER 'your_user'@'%' IDENTIFIED BY 'your_password';
```

---

## 7. **Grant Permissions to the User**

Give the user full access to the new database:

```sql
GRANT ALL PRIVILEGES ON your_database_name.* TO 'your_user'@'%';
FLUSH PRIVILEGES;
EXIT;
```

---

## 8. **Allow Remote Connections (Optional)**

1. Open the MySQL config file:
    
    ```bash
    sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf
    ```
    
2. Change the line:
    
    ```bash
    bind-address = 127.0.0.1
    ```
    
    To:
    
    ```bash
    bind-address = 0.0.0.0
    ```
    
3. Save and exit, then restart MySQL:
    
    ```bash
    sudo systemctl restart mysql
    ```
    

---

## 9. **Allow MySQL Through the Firewall**

```bash
sudo ufw allow 3306/tcp
```

---

## 10. **Test the Connection**

From your local machine or another server, test the connection:

```bash
mysql -u your_user -p -h your_vps_ip -P 3306
```

---

Your MySQL database is now set up and ready to use! 🎉