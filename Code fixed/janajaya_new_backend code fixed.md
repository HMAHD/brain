
## **✅ Steps to Fix the Issue**

### **1️⃣ Use a Connection Pool Instead of a Single Connection**

Modify `database/db.js` to **use a connection pool** that automatically handles reconnections.

### **🔹 `database/db.js` (Updated)**

```js
const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10, // Limits concurrent connections
  queueLimit: 0, // No limit to queued queries
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Database Not Connected:", err.message);
  } else {
    console.log("✅ Database Connected!");
    connection.release(); // Release connection back to the pool
  }
});

module.exports = pool;
```

### **🔹 Why?**

✅ Prevents "connection closed" errors  
✅ Automatically reuses idle connections  
✅ Handles MySQL timeouts gracefully

---

### **2️⃣ Update `cron/expireOtp.js` to Use the Pool**

Modify `expireOtp.js` to ensure **connections are released** after the query.

### **🔹 `cron/expireOtp.js` (Updated)**

```js
const cron = require("node-cron");
const moment = require("moment");
const pool = require("../database/db.js"); // Use the pool instead of a single connection

class ExpireOtp {
  schedule() {
    try {
      cron.schedule("* * * * *", async () => {
        try {
          const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");
          const deleteExpiredQuery = "DELETE FROM otpreq WHERE expiration_time <= ?";
          const deleteExpiredValues = [currentTime];

          pool.query(deleteExpiredQuery, deleteExpiredValues, (err, result) => {
            if (err) {
              console.error("❌ Cron Job Error:", err.message);
            } else {
              console.log(`✅ Expired OTPs Deleted: ${result.affectedRows}`);
            }
          });
        } catch (error) {
          console.error("❌ Cron Job Error:", error.message);
        }
      });
    } catch (error) {
      console.error("❌ Scheduler Error:", error.message);
    }
  }
}

module.exports = ExpireOtp;
```

### **🔹 Why?**

✅ Uses `pool.query()` instead of `db.query()`  
✅ Prevents **memory leaks** by ensuring connections are reused  
✅ Provides **better error handling**

---

### **3️⃣ Restart the Server**

After making these changes, restart your app with **PM2**:

```sh
pm2 restart janajaya --update-env
pm2 restart janajaya_new_backend --update-env
```

Then, check logs:

```sh
pm2 logs janajaya --lines 50
pm2 logs janajaya_new_backend --lines 50
```

---

### **Final Checklist ✅**

✔ **Switch from `mysql.createConnection()` to `mysql.createPool()`**  
✔ **Use `pool.query()` in `expireOtp.js` to prevent disconnection issues**  
✔ **Restart PM2 and check logs for errors**

---
