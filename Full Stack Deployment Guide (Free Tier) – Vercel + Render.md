

This guide walks you through deploying a Node.js backend and a JavaScript frontend (React/Vite/Vue) using **Render** and **Vercel** — entirely on their free tiers — with automatic deployments on every push to GitHub.

---

## 📁 Project Structure (Monorepo Example)

```

/my-project  
├── /frontend # React/Vite/Vue app  
├── /backend # Node.js / Express API  
├── package.json  
└── .git

```

You can also use separate repos if preferred.

---

## 🧩 Deployment Summary

| Component | Platform | Free Tier | Auto Deploy | Notes |
|----------|----------|-----------|-------------|-------|
| Frontend | Vercel   | ✅ Yes    | ✅ Yes      | Fast, reliable CDN for static apps |
| Backend  | Render   | ✅ Yes    | ✅ Yes      | Node.js supported, but sleeps after 15 min idle |

---

## 🚀 Frontend Deployment (Vercel – Free Tier)

### 1. Setup

1. Go to [https://vercel.com](https://vercel.com)
2. Sign in with GitHub and **import your repo**
3. Choose the `frontend` folder as the project root
4. Vercel auto-detects most frameworks (React, Vite, etc.)
5. Set environment variables if needed (e.g. API base URL):

   Example:
```

VITE_API_URL=[https://your-backend.onrender.com](https://your-backend.onrender.com/)

````

6. Click **Deploy**

### 2. Features (Free Tier)

- ✅ Unlimited static site builds
- ✅ Fast CDN delivery
- ✅ HTTPS with custom domain support
- ✅ Automatic builds on GitHub push
- ❌ No backend hosting — use serverless or external backend (like Render)

---

## 🛠 Backend Deployment (Render – Free Tier)

### 1. Setup

1. Go to [https://render.com](https://render.com)
2. Click **New Web Service**
3. Connect your GitHub repo
4. Choose the `backend` folder
5. Fill in the fields:
- **Environment:** Node
- **Build Command:** `npm install`
- **Start Command:** `node index.js` or `npm start`
- **Root Directory:** `backend/` (if using a monorepo)
- **Branch:** `main` or `master`

6. Add environment variables (API keys, DB URL, etc.)

7. Click **Create Web Service**

### 2. Free Tier Limitations

- ✅ 750 build minutes/month
- ✅ 1 free web service
- ❗ Sleeps after 15 minutes of inactivity
- ❗ Cold starts can take 20–30 seconds
- ❗ No persistent disk storage (use a database)

---

## 🔄 GitHub Auto Deployment (CI/CD)

Both Vercel and Render support auto-deploys:

| Platform | Trigger                | Auto Deploy |
|----------|------------------------|-------------|
| Vercel   | Push to `main`         | ✅ Yes       |
| Render   | Push to selected branch| ✅ Yes       |

No manual workflow configuration needed — just connect your repo.

---

## 🧠 Environment Variables

Use `.env` files locally and define the same variables in Vercel and Render dashboards.

Example for frontend (`.env` or Vercel):
```env
VITE_API_URL=https://your-backend.onrender.com
````

Example for backend (`.env` or Render):

```env
PORT=8000
DATABASE_URL=postgres://user:pass@host:port/db
```

---

## 🧊 Avoiding Backend Cold Starts

Render free tier services **go to sleep** after 15 minutes. To keep it warm:

### Option 1: Use [UptimeRobot](https://uptimerobot.com/)

- Add a new monitor for your Render backend URL
    
- Set interval to 5–10 minutes
    
- Keeps the service alive by pinging it
    

### Option 2: Accept cold start for cost savings (it's fine for small apps)

---

## 🧪 Local Development

Use `.env` files for dev:

Frontend `.env.local`:

```env
VITE_API_URL=http://localhost:8000
```

Backend `.env.local`:

```env
PORT=8000
```

Start backend and frontend in parallel during development.

---

## 🛑 Known Free Tier Limitations

|Feature|Vercel|Render|
|---|---|---|
|Always-on services|✅ Yes|❌ Sleeps after idle|
|Custom domains + HTTPS|✅ Yes|✅ Yes|
|Databases included|❌ No|✅ PostgreSQL (free)|
|Server-side code|❌ Serverless only|✅ Full Node.js|
|Storage|❌|❌ (no persistent storage)|
|Logs|✅|✅|

---
