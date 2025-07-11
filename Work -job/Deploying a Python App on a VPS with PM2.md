
## Prerequisites

- You are already inside the project folder on your VPS.
- Python and `pip` are installed.
- PM2 is installed (`npm install -g pm2`).

## Step 1: Create a Virtual Environment (Optional but Recommended)

```bash
python3 -m venv venv
#source venv/bin/activate  # For Linux/macOS
On Windows, use: venv\Scripts\activate
```

## Step 2: Install Dependencies

```bash
pip install -r requirements.txt
```

## Step 3: Create a PM2 Process for Your Python App

### 3.1 Basic PM2 Command

Replace `app.py` with your main Python script.

```bash
pm2 start python --name "my-python-app" -- app.py
```

### 3.2 PM2 with Arguments (if needed)

```bash
pm2 start python --name "my-python-app" -- app.py --port 8000
```

### 3.3 Running a Gunicorn-Based Flask/Django App

If using Flask/Django with Gunicorn:

```bash
pm2 start gunicorn --name "my-python-app" -- "app:app" --bind 0.0.0.0:8000
```

## Step 4: Save the Process List

```bash
pm2 save
```

## Step 5: Set Up PM2 to Start on Boot

```bash
pm2 startup
```

Follow the instructions shown in the terminal to enable PM2 on system boot.

## Step 6: Monitoring and Managing the App

### Check Running Processes

```bash
pm2 list
```

### View Logs

```bash
pm2 logs my-python-app
```

### Restart the App

```bash
pm2 restart my-python-app
```

### Stop the App

```bash
pm2 stop my-python-app
```

### Delete the App from PM2

```bash
pm2 delete my-python-app
```

