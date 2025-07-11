
---

## **Deployment Setup for Flask Backend**

### **1️⃣ Choose a Process Manager**

For running your Flask app in production, you have two main choices:

- **PM2 alone:** You can use PM2 to run your Flask app **directly**.
- **PM2 + Gunicorn:** This is the recommended setup because **Gunicorn** is an optimized WSGI server for handling multiple requests efficiently.

---

## **🔥 Recommended Approach: PM2 + Gunicorn**

Gunicorn is a lightweight and efficient WSGI server that helps Flask handle multiple requests in parallel.

### **Step 1: Install Dependencies**

Ensure you're in your virtual environment and install Gunicorn:

```sh
pip install gunicorn
```

### **Step 2: Start Flask with Gunicorn and PM2**

Run your Flask app with **Gunicorn** and manage it using **PM2**:

```sh
pm2 start "venv/bin/gunicorn -w 2 -b 0.0.0.0:7000 app:app" --name car_scrapper_backend
```

- **`-w 4`** → Runs **4 worker processes** for handling multiple requests.
- **`-b 0.0.0.0:5000`** → Binds it to port `5000`, accessible externally.
- **`app:app`** → If your Flask app is in `app.py`, and the Flask instance is named `app`, this will start it.

### **Step 3: Save and Auto-Start PM2 on Reboot**

Ensure your backend starts automatically on system reboot:

```sh
pm2 save
pm2 startup
```

---

## **Alternative: Run Flask Directly with PM2 (Not Recommended for High Traffic)**

If you **don't want to use Gunicorn**, you can use **PM2 alone**:

```sh
pm2 start "python3 app.py" --name car_scrapper_backend
```

However, this **is not ideal** for production because:

- Flask's built-in server is **not optimized** for handling multiple requests efficiently.
- It can become unstable under heavy traffic.

---

## **🔥 Deployment Steps for Full Stack (Backend + Frontend)**

Since you also have a **React frontend**, follow these steps to deploy everything properly.

### **1️⃣ Deploy Flask Backend**

Run:

```sh
pm2 start "gunicorn -w 4 -b 0.0.0.0:5000 app:app" --name car_scrapper_backend
```

Make sure Flask allows requests from your React app by enabling **CORS**:

```sh
pip install flask-cors
```

Add this to your Flask app:

```python
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow requests from the frontend
```

---

### **2️⃣ Deploy React Frontend**

For React, you need a **production server** to serve the frontend. The best options:

- **Serve with Nginx (Recommended)**
- **Use PM2 to run a Node.js server**

#### **Option 1: Serve React with Nginx (Best for Production)**

1. Build the React app:
    
    ```sh
    cd frontend
    npm run build
    ```
    
2. Install Nginx:
    
    ```sh
    sudo apt install nginx
    ```
    
3. Copy the React build files to the web directory:
    
    ```sh
    sudo cp -r frontend/build/* /var/www/html/
    ```
    
4. Configure Nginx:
    
    ```sh
    sudo nano /etc/nginx/sites-available/default
    ```
    
    Add this inside the `server {}` block:
    
    ```nginx
    server {
        listen 80;
        server_name yourdomain.com;
    
        root /var/www/html;
        index index.html;
        location / {
            try_files $uri /index.html;
        }
    
        location /api/ {
            proxy_pass http://127.0.0.1:5000/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
    }
    ```
    
5. Restart Nginx:
    
    ```sh
    sudo systemctl restart nginx
    ```
    

Now, your **React frontend** runs on `http://yourdomain.com` and **Flask API** is accessible via `http://yourdomain.com/api/`.

---

#### **Option 2: Serve React with PM2 (If Not Using Nginx)**

Instead of Nginx, you can use **PM2 to serve React**:

```sh
pm2 serve frontend/build 3000 --name react_frontend
```

But this is **not as efficient** as Nginx.

---

## **🔄 Restart & Monitor Your Deployment**

### **Check PM2 Status**

```sh
pm2 status
```

### **Restart Backend**

```sh
pm2 restart car_scrapper_backend
```

### **Restart Frontend**

```sh
pm2 restart react_frontend
```

### **View Logs**

```sh
pm2 logs car_scrapper_backend --lines 50
```

---

## **🚀 Final Summary**

✅ Use **PM2 + Gunicorn** for Flask:

```sh
pm2 start "gunicorn -w 4 -b 0.0.0.0:5000 app:app" --name car_scrapper_backend
```

✅ Use **Nginx** to serve React (Recommended)  
✅ If not using Nginx, use **PM2 to serve React**:

```sh
pm2 serve frontend/build 3000 --name react_frontend
```

✅ **Enable Flask CORS** for frontend requests  
✅ **Use PM2 to auto-start everything on reboot**

---
