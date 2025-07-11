
## 1. Pull the Latest Changes from GitHub

Navigate to the project directory and pull the latest changes from the main branch:

```sh
cd /path/to/project  # Navigate to the project directory
git pull origin main  # Pull latest changes from GitHub
```

**Handling Merge Conflicts:**  
If you see an error like:

```
error: Your local changes to the following files would be overwritten by merge:
```

You need to **commit or stash** your local changes before pulling:

```sh
git add .
git commit -m "Save local changes"
# OR stash changes (if you don't want to commit)
git stash
```

Then, retry the pull:

```sh
git pull origin main
```

## 2. Install Updated Dependencies

If `package.json` or `package-lock.json` has changed, install dependencies:

```sh
npm install
```

## 3. Build the React Application

Run the following command to generate a new production build:

```sh
npm run build
```

The build output will be generated in the `build/` directory.

## 4. Deploy the New Build

### If using PM2

If serving the frontend using `serve` and PM2:

```sh
pm install -g serve  # Ensure serve is installed
pm run build  # Build the latest version
pm2 restart frontend-app  # Restart the PM2 process (replace with actual process name)
```

### If using Nginx or Apache

Move the new build folder to the web server's directory:

```sh
mv build /var/www/html/frontend  # Adjust path as needed
systemctl restart nginx  # Restart Nginx (or Apache)
```

## 5. Verify the Deployment

- Open the browser and check your site.
- If necessary, clear the browser cache (Ctrl + Shift + R).
- If issues arise, check logs:

```sh
pm run start  # If running manually
pm2 logs frontend-app  # If using PM2
```

## Conclusion

Following these steps ensures your React frontend is updated and properly deployed after fetching changes from GitHub.