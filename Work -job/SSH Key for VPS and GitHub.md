
## **1. Generate an SSH Key**

On your **local machine**, create a new SSH key (if you don’t already have one):

```bash
ssh-keygen -t ed25519 -C "ios@localseo.lk"
```

- When prompted:
    - Press **Enter** to save it in the default location (`~/.ssh/id_ed25519`).
    - Leave the **passphrase** blank (or set one for extra security).

---

## **2. Copy the SSH Public Key**

Copy the generated SSH key to your clipboard:

```bash
cat ~/.ssh/id_ed25519.pub
```

- Copy the displayed key (starts with `ssh-ed25519`).

---

## **3. Add the SSH Key to Your VPS**

1. Log in to your VPS:
    
    ```bash
    ssh your_vps_username@your_vps_ip
    ```
    
2. Create a `.ssh` directory (if it doesn’t exist):
    
    ```bash
    mkdir -p ~/.ssh
    chmod 700 ~/.ssh
    ```
    
3. Add your public key to the `authorized_keys` file:
    
    ```bash
    nano ~/.ssh/authorized_keys
    ```
    
    - Paste the key, then **save and exit**.
4. Set permissions for the file:
    
    ```bash
    chmod 600 ~/.ssh/authorized_keys
    ```
    
5. Restart the SSH service:
    
    ```bash
    sudo systemctl restart ssh
    ```
    

---

## **4. Test SSH Login Without a Password**

On your local machine, test if you can log in using the SSH key:

```bash
ssh your_vps_username@your_vps_ip
```

- If successful, no password is required.

---

## **5. Add the SSH Key to GitHub**

1. Go to **GitHub** and log in.
2. Navigate to **Settings** > **SSH and GPG keys**.
3. Click **New SSH key**.
4. Enter a title (e.g., "My VPS SSH Key") and paste the public key you copied earlier.
5. Click **Add SSH key**.

---

## **6. Configure Git to Use SSH**

On your VPS, change your Git remote URL to use SSH:

1. Navigate to your project directory:
    
    ```bash
    cd /path/to/your/repo
    ```
    
2. Update the remote URL:
    
    ```bash
    git remote set-url origin git@github.com:your-username/your-repo.git
    ```
    
3. Verify the updated remote:
    
    ```bash
    git remote -v
    ```
    

---

## **7. Test Git Connection**

Test the connection between your VPS and GitHub:

```bash
ssh -T git@github.com
```

- You should see a message like:
    
    ```
    Hi your-username! You've successfully authenticated.
    ```
    

---


## **Step-by-Step Fix**

### **1. Check if the Repository Exists**

Navigate to the `/var/www/Janajaya` directory and confirm that it contains the cloned repository files.

```bash
cd /var/www/Janajaya
ls -a
```

- If you **don’t see a `.git` folder**, it means the repository is not cloned or initialized properly.

---

### **2. Clone the Repository (if not already cloned)**

If the repository is not set up, clone it into `/var/www/Janajaya`:

```bash
git clone git@github.com:localseoios/janajaya_new_backend.git /var/www/Janajaya
```

---

### **3. Navigate to the Cloned Repository**

Once cloned, navigate to the directory:

```bash
cd /var/www/Janajaya
```

---

### **4. Set the Remote URL**

Ensure the repository uses the SSH URL:

```bash
git remote set-url origin git@github.com:localseoios/janajaya_new_backend.git
```

Verify the remote URL:

```bash
git remote -v
```

You should see:

```
origin  git@github.com:localseoios/janajaya_new_backend.git (fetch)
origin  git@github.com:localseoios/janajaya_new_backend.git (push)
```

---

### **5. Pull the Latest Code**

Fetch and pull the latest changes:

```bash
git pull origin main
```

---

### **6. Troubleshooting: If Files Are Already Present**

If the files already exist in `/var/www/Janajaya`, but the `.git` folder is missing, you can reinitialize the repository:

1. Reinitialize Git in the directory:
    
    ```bash
    git init
    ```
    
2. Add the GitHub repository as the remote:
    
    ```bash
    git remote add origin git@github.com:localseoios/janajaya_new_backend.git
    ```
    
3. Fetch the latest code:
    
    ```bash
    git fetch origin
    ```
    
4. Reset to the `main` branch:
    
    ```bash
    git reset --hard origin/main
    ```
    

---

After completing these steps, your `/var/www/Janajaya` directory will be correctly linked to the GitHub repository and ready for Git operations!