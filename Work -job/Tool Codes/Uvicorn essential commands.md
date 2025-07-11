Here’s a concise guide to running a Python app with **Uvicorn** using only the essential commands:

---

### 1. **Install Uvicorn**
```bash
pip install uvicorn
```

---

### 2. **Run a Basic App**
```bash
uvicorn <module>:<app>
```
- Replace `<module>` with the Python file name (without `.py`).
- Replace `<app>` with the FastAPI/ASGI app instance.

**Example:**
```bash
uvicorn main:app
```
- Runs `app` from `main.py`.

---

### 3. **Specify Host and Port**
```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```
- `--host`: Bind to a specific host (default: `127.0.0.1`).
- `--port`: Bind to a specific port (default: `8000`).

---

### 4. **Enable Auto-Reload (Development)**
```bash
uvicorn main:app --reload
```
- Automatically reloads the app when code changes.

---

### 5. **Run with Workers (Production)**
```bash
uvicorn main:app --workers 4
```
- Runs multiple worker processes for better performance.

---

### 6. **Run with SSL (HTTPS)**
```bash
uvicorn main:app --ssl-keyfile key.pem --ssl-certfile cert.pem
```
- Provide paths to your SSL key and certificate files.

---

### 7. **Set Log Level**
```bash
uvicorn main:app --log-level debug
```
- Options: `debug`, `info`, `warning`, `error`, `critical`.

---

### 8. **Run in Background (Detached Mode)**
```bash
uvicorn main:app --daemon
```
- Runs Uvicorn as a background process.

---

### 9. **Stop Uvicorn**
- If running in the foreground, use `Ctrl+C`.
- If running in the background, find the process ID and kill it:
```bash
pkill -f "uvicorn main:app"
```

---

### 10. **Run with Custom App Factory**
```bash
uvicorn main:create_app --factory
```
- Use this if your app is created by a factory function (`create_app()`).

---

### 11. **Run with Custom Lifespan**
```bash
uvicorn main:app --lifespan on
```
- Options: `on`, `off`, `auto` (default).

---

### 12. **Run with Custom Gunicorn Worker Class**
```bash
uvicorn main:app --worker-class uvicorn.workers.UvicornWorker
```
- Useful when integrating with Gunicorn.

---

### 13. **Help Command**
```bash
uvicorn --help
```
- Lists all available commands and options.

---

This covers the essential Uvicorn commands for running Python apps! Let me know if you need further clarification. 🚀