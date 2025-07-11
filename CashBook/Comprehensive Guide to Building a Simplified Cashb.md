
---
## Project Overview

The simplified cashbook software is a Python desktop application that allows for financial transaction management with the following key features:

- Login system with Client and Admin roles
- Company management (creation/selection)
- Transaction management (adding, editing, deleting)
- Import functionality for `.cb` and `.qif` files
- Balance tracking and reporting
- Sharing reports to an online location
- Human-friendly UI design[^1]


## System Architecture

The application follows the Model-View-Controller (MVC) pattern:

- **Model**: Handles data storage using SQLite (one database per company)
- **View**: Creates UI components using Tkinter
- **Controller**: Manages business logic and connects Model and View[^1]


## Development Environment Setup

**Required Tools and Dependencies:**

1. **Python Environment:**
```bash
# Create virtual environment
python -m venv cashbook-env
source cashbook-env/bin/activate  # On Windows: source cashbook-env/bin/activate
```

2. **Required Packages:**
```bash
pip install tkinter  # Usually included with Python
pip install qifparse  # For QIF file parsing
pip install requests  # For online sharing
pip install reportlab  # For PDF generation
pip install pytest  # For testing
```


## Project Structure Implementation

Create the following directory structure:

```
cashbook/
├── main.py            # Entry point
├── model/
│   ├── __init__.py
│   ├── database.py    # Database operations
│   ├── user.py        # User management
│   └── transaction.py # Transaction handling
├── view/
│   ├── __init__.py
│   ├── login.py       # Login window
│   ├── dashboard.py   # Client/Admin dashboards
│   └── company.py     # Company management window
├── controller/
│   ├── __init__.py
│   ├── auth.py        # Authentication logic
│   ├── company.py     # Company operations
│   └── transaction.py # Transaction operations
├── utils/
│   ├── __init__.py
│   ├── import_handlers.py  # File import logic
│   └── export_handlers.py  # Reporting/sharing
└── tests/
    ├── test_model.py
    ├── test_controller.py
    └── test_integration.py
```


## Database Schema Implementation

First, let's implement the database models:

### 1. Create database.py:

```python
import sqlite3
import os
import hashlib

class Database:
    def __init__(self):
        self.users_db = "users.db"
        self.init_users_db()
    
    def init_users_db(self):
        """Initialize the users database if it doesn't exist"""
        conn = sqlite3.connect(self.users_db)
        cursor = conn.cursor()
        
        # Create users table if it doesn't exist
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role TEXT NOT NULL
        )
        ''')
        
        # Add default admin if no users exist
        cursor.execute("SELECT COUNT(*) FROM users")
        if cursor.fetchone()[^0] == 0:
            # Create default admin with password 'admin'
            hashed_password = hashlib.sha256("admin".encode()).hexdigest()
            cursor.execute(
                "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
                ("admin", hashed_password, "Admin")
            )
        
        conn.commit()
        conn.close()
    
    def init_company_db(self, company_name):
        """Create a new company database"""
        db_path = f"{company_name.lower().replace(' ', '_')}.db"
        
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        # Create transactions table
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY,
            date TEXT NOT NULL,
            description TEXT,
            amount REAL NOT NULL,
            category TEXT,
            type TEXT NOT NULL,
            source TEXT NOT NULL
        )
        ''')
        
        conn.commit()
        conn.close()
        
        return db_path
    
    def authenticate_user(self, username, password):
        """Authenticate a user and return role if successful"""
        hashed_password = hashlib.sha256(password.encode()).hexdigest()
        
        conn = sqlite3.connect(self.users_db)
        cursor = conn.cursor()
        
        cursor.execute(
            "SELECT role FROM users WHERE username = ? AND password = ?",
            (username, hashed_password)
        )
        
        result = cursor.fetchone()
        conn.close()
        
        if result:
            return result[^0]  # Return role
        return None
```


### 2. Create transaction.py for transaction operations:

```python
import sqlite3
from datetime import datetime

class TransactionManager:
    def __init__(self, db_path):
        self.db_path = db_path
    
    def add_transaction(self, date, description, amount, category, type_name, source="Manual"):
        """Add a new transaction to the database"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute(
            "INSERT INTO transactions (date, description, amount, category, type, source) VALUES (?, ?, ?, ?, ?, ?)",
            (date, description, amount, category, type_name, source)
        )
        
        conn.commit()
        conn.close()
    
    def edit_transaction(self, id, updates):
        """Edit an existing transaction"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        set_clause = ", ".join([f"{key} = ?" for key in updates.keys()])
        values = list(updates.values())
        values.append(id)
        
        cursor.execute(
            f"UPDATE transactions SET {set_clause} WHERE id = ?",
            values
        )
        
        conn.commit()
        conn.close()
    
    def delete_transaction(self, id):
        """Delete a transaction by ID"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute("DELETE FROM transactions WHERE id = ?", (id,))
        
        conn.commit()
        conn.close()
    
    def get_transactions(self, filters=None):
        """Get transactions with optional filters"""
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row  # Return rows as dictionaries
        cursor = conn.cursor()
        
        query = "SELECT * FROM transactions"
        params = []
        
        if filters:
            where_clauses = []
            for key, value in filters.items():
                where_clauses.append(f"{key} LIKE ?")
                params.append(f"%{value}%")
            
            if where_clauses:
                query += " WHERE " + " AND ".join(where_clauses)
        
        query += " ORDER BY date DESC"
        
        cursor.execute(query, params)
        results = [dict(row) for row in cursor.fetchall()]
        
        conn.close()
        return results
    
    def get_balance_summary(self):
        """Get summary of income, expenses, and balance"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # Get total income
        cursor.execute("SELECT SUM(amount) FROM transactions WHERE type = 'Income'")
        total_income = cursor.fetchone()[^0] or 0
        
        # Get total expenses
        cursor.execute("SELECT SUM(amount) FROM transactions WHERE type = 'Expense'")
        total_expenses = cursor.fetchone()[^0] or 0
        
        conn.close()
        
        return {
            "income": total_income,
            "expenses": total_expenses,
            "balance": total_income - total_expenses
        }
```


## User Interface Implementation

Now let's implement the view components:

### 1. Create login.py:

```python
import tkinter as tk
from tkinter import messagebox

class LoginWindow:
    def __init__(self, root, auth_callback):
        self.root = root
        self.auth_callback = auth_callback
        
        self.root.title("Cashbook Login")
        self.root.geometry("400x300")
        self.root.resizable(False, False)
        
        # Create a frame with padding
        self.frame = tk.Frame(self.root, padx=20, pady=20)
        self.frame.pack(expand=True, fill="both")
        
        # Title label
        title_label = tk.Label(self.frame, text="Cashbook Software", font=("Arial", 16, "bold"))
        title_label.pack(pady=(0, 20))
        
        # Username
        username_label = tk.Label(self.frame, text="Username:", font=("Arial", 10))
        username_label.pack(anchor="w", pady=(10, 0))
        
        self.username_entry = tk.Entry(self.frame, width=30)
        self.username_entry.pack(fill="x", pady=(0, 10))
        
        # Password
        password_label = tk.Label(self.frame, text="Password:", font=("Arial", 10))
        password_label.pack(anchor="w", pady=(10, 0))
        
        self.password_entry = tk.Entry(self.frame, width=30, show="*")
        self.password_entry.pack(fill="x", pady=(0, 20))
        
        # Login button
        login_button = tk.Button(self.frame, text="Login", command=self.handle_login, width=10, bg="#4CAF50", fg="white")
        login_button.pack(pady=10)
        
        # Bind Enter key to login
        self.root.bind("&lt;Return&gt;", lambda event: self.handle_login())
    
    def handle_login(self):
        username = self.username_entry.get()
        password = self.password_entry.get()
        
        if not username or not password:
            messagebox.showerror("Error", "Please enter both username and password")
            return
        
        # Call the authentication callback
        result = self.auth_callback(username, password)
        
        if not result:
            messagebox.showerror("Error", "Invalid username or password")
```


### 2. Create dashboard.py for Client/Admin dashboards:

```python
import tkinter as tk
from tkinter import ttk, messagebox

class AdminDashboard:
    def __init__(self, root, username, logout_callback):
        self.root = root
        self.username = username
        self.logout_callback = logout_callback
        
        self.root.title("Admin Dashboard")
        self.root.geometry("800x600")
        
        self.create_widgets()
    
    def create_widgets(self):
        # Main frame
        main_frame = ttk.Frame(self.root, padding=20)
        main_frame.pack(fill="both", expand=True)
        
        # Header with welcome message and logout button
        header_frame = ttk.Frame(main_frame)
        header_frame.pack(fill="x", pady=(0, 20))
        
        welcome_label = ttk.Label(header_frame, text=f"Welcome, {self.username} (Admin)", font=("Arial", 14, "bold"))
        welcome_label.pack(side="left")
        
        logout_button = ttk.Button(header_frame, text="Logout", command=self.logout_callback)
        logout_button.pack(side="right")
        
        # Notebook for tabs
        notebook = ttk.Notebook(main_frame)
        notebook.pack(fill="both", expand=True)
        
        # User Management Tab
        user_tab = ttk.Frame(notebook, padding=10)
        notebook.add(user_tab, text="User Management")
        
        # User list
        users_frame = ttk.LabelFrame(user_tab, text="Users")
        users_frame.pack(fill="both", expand=True, padx=5, pady=5)
        
        # User treeview
        columns = ("id", "username", "role")
        self.user_tree = ttk.Treeview(users_frame, columns=columns, show="headings")
        
        # Define headings
        self.user_tree.heading("id", text="ID")
        self.user_tree.heading("username", text="Username")
        self.user_tree.heading("role", text="Role")
        
        # Define columns
        self.user_tree.column("id", width=50)
        self.user_tree.column("username", width=200)
        self.user_tree.column("role", width=100)
        
        self.user_tree.pack(fill="both", expand=True)
        
        # User action buttons
        user_buttons_frame = ttk.Frame(user_tab)
        user_buttons_frame.pack(fill="x", pady=10)
        
        add_user_button = ttk.Button(user_buttons_frame, text="Add User")
        add_user_button.pack(side="left", padx=5)
        
        delete_user_button = ttk.Button(user_buttons_frame, text="Delete User")
        delete_user_button.pack(side="left", padx=5)
        
        # Companies Tab
        companies_tab = ttk.Frame(notebook, padding=10)
        notebook.add(companies_tab, text="Companies")
        
        # Company list
        companies_frame = ttk.LabelFrame(companies_tab, text="All Companies")
        companies_frame.pack(fill="both", expand=True, padx=5, pady=5)
        
        # Company treeview
        columns = ("name", "owner", "transactions", "balance")
        self.company_tree = ttk.Treeview(companies_frame, columns=columns, show="headings")
        
        # Define headings
        self.company_tree.heading("name", text="Company Name")
        self.company_tree.heading("owner", text="Owner")
        self.company_tree.heading("transactions", text="Transactions")
        self.company_tree.heading("balance", text="Balance")
        
        # Define columns
        self.company_tree.column("name", width=200)
        self.company_tree.column("owner", width=150)
        self.company_tree.column("transactions", width=100)
        self.company_tree.column("balance", width=100)
        
        self.company_tree.pack(fill="both", expand=True)
        
        # View button
        view_button = ttk.Button(companies_tab, text="View Company Details")
        view_button.pack(pady=10)


class ClientDashboard:
    def __init__(self, root, username, logout_callback, create_company_callback, open_company_callback):
        self.root = root
        self.username = username
        self.logout_callback = logout_callback
        self.create_company_callback = create_company_callback
        self.open_company_callback = open_company_callback
        
        self.root.title("Client Dashboard")
        self.root.geometry("800x600")
        
        self.create_widgets()
    
    def create_widgets(self):
        # Main frame
        main_frame = ttk.Frame(self.root, padding=20)
        main_frame.pack(fill="both", expand=True)
        
        # Header with welcome message and logout button
        header_frame = ttk.Frame(main_frame)
        header_frame.pack(fill="x", pady=(0, 20))
        
        welcome_label = ttk.Label(header_frame, text=f"Welcome, {self.username}", font=("Arial", 14, "bold"))
        welcome_label.pack(side="left")
        
        logout_button = ttk.Button(header_frame, text="Logout", command=self.logout_callback)
        logout_button.pack(side="right")
        
        # Companies frame
        companies_frame = ttk.LabelFrame(main_frame, text="Your Companies")
        companies_frame.pack(fill="both", expand=True, padx=5, pady=5)
        
        # Companies treeview
        columns = ("name", "transactions", "balance", "last_modified")
        self.company_tree = ttk.Treeview(companies_frame, columns=columns, show="headings")
        
        # Define headings
        self.company_tree.heading("name", text="Company Name")
        self.company_tree.heading("transactions", text="Transactions")
        self.company_tree.heading("balance", text="Balance")
        self.company_tree.heading("last_modified", text="Last Modified")
        
        # Define columns
        self.company_tree.column("name", width=200)
        self.company_tree.column("transactions", width=100)
        self.company_tree.column("balance", width=100)
        self.company_tree.column("last_modified", width=150)
        
        self.company_tree.pack(fill="both", expand=True)
        
        # Buttons frame
        buttons_frame = ttk.Frame(main_frame)
        buttons_frame.pack(fill="x", pady=10)
        
        create_button = ttk.Button(buttons_frame, text="Create New Company", command=self.create_company)
        create_button.pack(side="left", padx=5)
        
        open_button = ttk.Button(buttons_frame, text="Open Selected Company", command=self.open_company)
        open_button.pack(side="left", padx=5)
    
    def create_company(self):
        self.create_company_callback()
    
    def open_company(self):
        selected = self.company_tree.selection()
        if not selected:
            messagebox.showerror("Error", "Please select a company to open")
            return
        
        company_name = self.company_tree.item(selected[^0])["values"][^0]
        self.open_company_callback(company_name)
```


### 3. Create company.py for company management:

```python
import tkinter as tk
from tkinter import ttk, messagebox, filedialog
import datetime

class CompanyWindow:
    def __init__(self, root, company_name, transaction_manager, close_callback):
        self.root = root
        self.company_name = company_name
        self.transaction_manager = transaction_manager
        self.close_callback = close_callback
        
        self.root.title(f"Cashbook - {company_name}")
        self.root.geometry("1000x700")
        
        self.create_widgets()
        self.load_transactions()
        self.update_summary()
    
    def create_widgets(self):
        # Main container
        main_frame = ttk.Frame(self.root, padding=10)
        main_frame.pack(fill="both", expand=True)
        
        # Top bar with company name and close button
        top_bar = ttk.Frame(main_frame)
        top_bar.pack(fill="x", pady=(0, 10))
        
        company_label = ttk.Label(top_bar, text=self.company_name, font=("Arial", 16, "bold"))
        company_label.pack(side="left")
        
        close_button = ttk.Button(top_bar, text="Close Company", command=self.close_callback)
        close_button.pack(side="right")
        
        # Summary frame
        summary_frame = ttk.LabelFrame(main_frame, text="Financial Summary")
        summary_frame.pack(fill="x", pady=5)
        
        # Summary labels
        summary_inner = ttk.Frame(summary_frame, padding=10)
        summary_inner.pack(fill="x")
        
        ttk.Label(summary_inner, text="Total Income:").grid(row=0, column=0, sticky="w", padx=5)
        self.income_label = ttk.Label(summary_inner, text="$0.00", foreground="green")
        self.income_label.grid(row=0, column=1, sticky="w", padx=5)
        
        ttk.Label(summary_inner, text="Total Expenses:").grid(row=0, column=2, sticky="w", padx=5)
        self.expenses_label = ttk.Label(summary_inner, text="$0.00", foreground="red")
        self.expenses_label.grid(row=0, column=3, sticky="w", padx=5)
        
        ttk.Label(summary_inner, text="Balance:").grid(row=0, column=4, sticky="w", padx=5)
        self.balance_label = ttk.Label(summary_inner, text="$0.00")
        self.balance_label.grid(row=0, column=5, sticky="w", padx=5)
        
        # Button frame
        button_frame = ttk.Frame(main_frame)
        button_frame.pack(fill="x", pady=5)
        
        add_button = ttk.Button(button_frame, text="Add Transaction", command=self.add_transaction)
        add_button.pack(side="left", padx=5)
        
        edit_button = ttk.Button(button_frame, text="Edit Transaction", command=self.edit_transaction)
        edit_button.pack(side="left", padx=5)
        
        delete_button = ttk.Button(button_frame, text="Delete Transaction", command=self.delete_transaction)
        delete_button.pack(side="left", padx=5)
        
        import_button = ttk.Button(button_frame, text="Import File", command=self.import_file)
        import_button.pack(side="left", padx=5)
        
        report_button = ttk.Button(button_frame, text="Generate Report", command=self.generate_report)
        report_button.pack(side="left", padx=5)
        
        share_button = ttk.Button(button_frame, text="Share", command=self.share_data)
        share_button.pack(side="left", padx=5)
        
        # Search frame
        search_frame = ttk.Frame(main_frame)
        search_frame.pack(fill="x", pady=5)
        
        ttk.Label(search_frame, text="Search:").pack(side="left", padx=5)
        
        self.search_var = tk.StringVar()
        self.search_var.trace("w", lambda name, index, mode: self.filter_transactions())
        
        search_entry = ttk.Entry(search_frame, textvariable=self.search_var, width=30)
        search_entry.pack(side="left", padx=5)
        
        # Transaction list
        transactions_frame = ttk.LabelFrame(main_frame, text="Transactions")
        transactions_frame.pack(fill="both", expand=True, pady=5)
        
        # Create treeview for transactions
        columns = ("id", "date", "description", "amount", "category", "type", "source")
        self.tree = ttk.Treeview(transactions_frame, columns=columns, show="headings")
        
        # Define headings
        self.tree.heading("id", text="ID")
        self.tree.heading("date", text="Date")
        self.tree.heading("description", text="Description")
        self.tree.heading("amount", text="Amount")
        self.tree.heading("category", text="Category")
        self.tree.heading("type", text="Type")
        self.tree.heading("source", text="Source")
        
        # Define columns
        self.tree.column("id", width=50)
        self.tree.column("date", width=100)
        self.tree.column("description", width=200)
        self.tree.column("amount", width=100)
        self.tree.column("category", width=120)
        self.tree.column("type", width=80)
        self.tree.column("source", width=80)
        
        # Add scrollbar
        scrollbar = ttk.Scrollbar(transactions_frame, orient="vertical", command=self.tree.yview)
        self.tree.configure(yscrollcommand=scrollbar.set)
        
        scrollbar.pack(side="right", fill="y")
        self.tree.pack(side="left", fill="both", expand=True)
        
        # Status bar
        self.status_var = tk.StringVar()
        self.status_var.set("Ready")
        status_bar = ttk.Label(main_frame, textvariable=self.status_var, relief="sunken", anchor="w")
        status_bar.pack(fill="x", pady=(5, 0))
    
    def load_transactions(self):
        # Clear existing items
        for item in self.tree.get_children():
            self.tree.delete(item)
        
        # Get transactions from manager
        transactions = self.transaction_manager.get_transactions()
        
        # Add to treeview
        for transaction in transactions:
            # Format amount with currency symbol
            amount_str = f"${transaction['amount']:.2f}"
            
            # Set row tags for coloring (income=green, expense=red)
            tag = "income" if transaction["type"] == "Income" else "expense"
            
            self.tree.insert("", "end", values=(
                transaction["id"],
                transaction["date"],
                transaction["description"],
                amount_str,
                transaction["category"],
                transaction["type"],
                transaction["source"]
            ), tags=(tag,))
        
        # Configure row colors
        self.tree.tag_configure("income", foreground="green")
        self.tree.tag_configure("expense", foreground="red")
        
        self.status_var.set(f"Loaded {len(transactions)} transactions")
    
    def update_summary(self):
        # Get summary from manager
        summary = self.transaction_manager.get_balance_summary()
        
        # Update labels
        self.income_label.config(text=f"${summary['income']:.2f}")
        self.expenses_label.config(text=f"${summary['expenses']:.2f}")
        self.balance_label.config(
            text=f"${summary['balance']:.2f}",
            foreground="green" if summary['balance'] &gt;= 0 else "red"
        )
    
    def filter_transactions(self):
        search_text = self.search_var.get().lower()
        
        # If search is empty, show all transactions
        if not search_text:
            self.load_transactions()
            return
        
        # Clear existing items
        for item in self.tree.get_children():
            self.tree.delete(item)
        
        # Get transactions from manager (without filtering in database for simplicity)
        transactions = self.transaction_manager.get_transactions()
        
        # Filter and add to treeview
        filtered_count = 0
        for transaction in transactions:
            # Check if search text is in any field
            if (search_text in str(transaction["id"]).lower() or
                search_text in transaction["date"].lower() or
                search_text in transaction["description"].lower() or
                search_text in str(transaction["amount"]).lower() or
                search_text in transaction["category"].lower() or
                search_text in transaction["type"].lower() or
                search_text in transaction["source"].lower()):
                
                # Format amount with currency symbol
                amount_str = f"${transaction['amount']:.2f}"
                
                # Set row tags for coloring (income=green, expense=red)
                tag = "income" if transaction["type"] == "Income" else "expense"
                
                self.tree.insert("", "end", values=(
                    transaction["id"],
                    transaction["date"],
                    transaction["description"],
                    amount_str,
                    transaction["category"],
                    transaction["type"],
                    transaction["source"]
                ), tags=(tag,))
                
                filtered_count += 1
        
        self.status_var.set(f"Found {filtered_count} matching transactions")
    
    def add_transaction(self):
        # Create a new window for adding a transaction
        add_window = tk.Toplevel(self.root)
        add_window.title("Add Transaction")
        add_window.geometry("400x350")
        add_window.transient(self.root)  # Set as a child window
        add_window.grab_set()  # Modal window
        
        # Create form fields
        frame = ttk.Frame(add_window, padding=20)
        frame.pack(fill="both", expand=True)
        
        # Date field
        ttk.Label(frame, text="Date:").grid(row=0, column=0, sticky="w", pady=5)
        date_var = tk.StringVar(value=datetime.datetime.now().strftime("%Y-%m-%d"))
        date_entry = ttk.Entry(frame, textvariable=date_var)
        date_entry.grid(row=0, column=1, sticky="ew", pady=5)
        
        # Description field
        ttk.Label(frame, text="Description:").grid(row=1, column=0, sticky="w", pady=5)
        desc_var = tk.StringVar()
        desc_entry = ttk.Entry(frame, textvariable=desc_var)
        desc_entry.grid(row=1, column=1, sticky="ew", pady=5)
        
        # Amount field
        ttk.Label(frame, text="Amount:").grid(row=2, column=0, sticky="w", pady=5)
        amount_var = tk.DoubleVar()
        amount_entry = ttk.Entry(frame, textvariable=amount_var)
        amount_entry.grid(row=2, column=1, sticky="ew", pady=5)
        
        # Category field
        ttk.Label(frame, text="Category:").grid(row=3, column=0, sticky="w", pady=5)
        category_var = tk.StringVar()
        categories = ["Salary", "Food", "Utilities", "Rent", "Entertainment", "Other"]
        category_combo = ttk.Combobox(frame, textvariable=category_var, values=categories)
        category_combo.grid(row=3, column=1, sticky="ew", pady=5)
        
        # Transaction type
        ttk.Label(frame, text="Type:").grid(row=4, column=0, sticky="w", pady=5)
        type_var = tk.StringVar(value="Expense")
        ttk.Radiobutton(frame, text="Income", variable=type_var, value="Income").grid(row=4, column=1, sticky="w", pady=5)
        ttk.Radiobutton(frame, text="Expense", variable=type_var, value="Expense").grid(row=5, column=1, sticky="w", pady=5)
        
        # Buttons
        button_frame = ttk.Frame(frame)
        button_frame.grid(row=6, column=0, columnspan=2, pady=15)
        
        def save_transaction():
            # Validate inputs
            try:
                amount = amount_var.get()
                if amount &lt;= 0:
                    messagebox.showerror("Error", "Amount must be greater than zero")
                    return
                
                date = date_var.get()
                description = desc_var.get()
                category = category_var.get()
                transaction_type = type_var.get()
                
                # Add transaction
                self.transaction_manager.add_transaction(
                    date, description, amount, category, transaction_type
                )
                
                # Close window and refresh
                add_window.destroy()
                self.load_transactions()
                self.update_summary()
                
                self.status_var.set(f"Added new {transaction_type.lower()} transaction")
                
            except Exception as e:
                messagebox.showerror("Error", f"Failed to add transaction: {str(e)}")
        
        save_button = ttk.Button(button_frame, text="Save", command=save_transaction)
        save_button.pack(side="left", padx=5)
        
        cancel_button = ttk.Button(button_frame, text="Cancel", command=add_window.destroy)
        cancel_button.pack(side="left", padx=5)
        
        # Make the description field focused
        desc_entry.focus_set()
```


## Import/Export Functionality

Let's implement the import and export handlers:

### 1. Create import_handlers.py:

```python
import csv
import os
import datetime
from qifparse import qif

class ImportHandler:
    def __init__(self, transaction_manager):
        self.transaction_manager = transaction_manager
    
    def import_cb_file(self, file_path):
        """Import transactions from a .cb file (assumed to be CSV-like)"""
        try:
            transactions = []
            
            with open(file_path, 'r') as csvfile:
                reader = csv.DictReader(csvfile)
                for row in reader:
                    # Adapt this to the actual .cb file format
                    # Example assuming columns: Date, Description, Amount, Category, Type
                    transactions.append({
                        'date': row.get('Date', ''),
                        'description': row.get('Description', ''),
                        'amount': float(row.get('Amount', 0)),
                        'category': row.get('Category', ''),
                        'type': row.get('Type', 'Expense'),
                        'source': 'Imported'
                    })
            
            return transactions
            
        except Exception as e:
            raise Exception(f"Error importing .cb file: {str(e)}")
    
    def import_qif_file(self, file_path):
        """Import transactions from a .qif file"""
        try:
            qif_file = qif.parse(open(file_path, 'r'))
            transactions = []
            
            for qif_transaction in qif_file.get_transactions():
                # QIF date format conversion
                date_str = qif_transaction.date.strftime("%Y-%m-%d")
                
                # Determine if it's income or expense based on amount
                amount = float(qif_transaction.amount)
                transaction_type = "Income" if amount &gt; 0 else "Expense"
                amount = abs(amount)  # Make amount positive for consistency
                
                transactions.append({
                    'date': date_str,
                    'description': qif_transaction.payee or qif_transaction.memo or '',
                    'amount': amount,
                    'category': qif_transaction.category or '',
                    'type': transaction_type,
                    'source': 'Imported'
                })
            
            return transactions
            
        except Exception as e:
            raise Exception(f"Error importing .qif file: {str(e)}")
    
    def preview_and_import(self, file_path):
        """Preview imported transactions and add them to the database"""
        file_ext = os.path.splitext(file_path)[^1].lower()
        
        if file_ext == '.cb':
            transactions = self.import_cb_file(file_path)
        elif file_ext == '.qif':
            transactions = self.import_qif_file(file_path)
        else:
            raise Exception(f"Unsupported file format: {file_ext}")
        
        # At this point, we would normally show a preview UI
        # For this example, we'll directly import the transactions
        
        for transaction in transactions:
            self.transaction_manager.add_transaction(
                transaction['date'],
                transaction['description'],
                transaction['amount'],
                transaction['category'],
                transaction['type'],
                transaction['source']
            )
        
        return len(transactions)
```


### 2. Create export_handlers.py:

```python
import csv
import os
import datetime
import tempfile
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib import colors

class ExportHandler:
    def __init__(self, transaction_manager, company_name):
        self.transaction_manager = transaction_manager
        self.company_name = company_name
        
        # Create exports directory if it doesn't exist
        self.exports_dir = "exports"
        if not os.path.exists(self.exports_dir):
            os.makedirs(self.exports_dir)
    
    def export_to_csv(self, transactions=None, filename=None):
        """Export transactions to CSV file"""
        if transactions is None:
            transactions = self.transaction_manager.get_transactions()
        
        if filename is None:
            timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"{self.exports_dir}/{self.company_name}_{timestamp}.csv"
        
        with open(filename, 'w', newline='') as csvfile:
            fieldnames = ['id', 'date', 'description', 'amount', 'category', 'type', 'source']
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            
            writer.writeheader()
            for transaction in transactions:
                writer.writerow(transaction)
        
        return filename
    
    def export_to_pdf(self, report_type="summary", period=None, filename=None):
        """Export data to PDF file"""
        if filename is None:
            timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"{self.exports_dir}/{self.company_name}_{report_type}_{timestamp}.pdf"
        
        # Get all transactions
        transactions = self.transaction_manager.get_transactions()
        
        # Get summary data
        summary = self.transaction_manager.get_balance_summary()
        
        # Create PDF
        doc = SimpleDocTemplate(filename, pagesize=letter)
        styles = getSampleStyleSheet()
        elements = []
        
        # Title
        title = Paragraph(f"{self.company_name} - Financial Report", styles['Heading1'])
        elements.append(title)
        elements.append(Spacer(1, 12))
        
        # Date
        date_str = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        date_paragraph = Paragraph(f"Generated on: {date_str}", styles['Normal'])
        elements.append(date_paragraph)
        elements.append(Spacer(1, 12))
        
        # Summary section
        summary_title = Paragraph("Financial Summary", styles['Heading2'])
        elements.append(summary_title)
        elements.append(Spacer(1, 6))
        
        summary_data = [
            ["Total Income", f"${summary['income']:.2f}"],
            ["Total Expenses", f"${summary['expenses']:.2f}"],
            ["Balance", f"${summary['balance']:.2f}"]
        ]
        
        summary_table = Table(summary_data, colWidths=[200, 100])
        summary_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (0, -1), colors.lightgrey),
            ('GRID', (0, 0), (-1, -1), 1, colors.black)
        ]))
        
        elements.append(summary_table)
        elements.append(Spacer(1, 12))
        
        # Transactions section (if not summary-only report)
        if report_type != "summary_only":
            transactions_title = Paragraph("Transactions", styles['Heading2'])
            elements.append(transactions_title)
            elements.append(Spacer(1, 6))
            
            # Table headers
            transaction_data = [["Date", "Description", "Amount", "Category", "Type"]]
            
            # Add transaction rows
            for t in transactions:
                transaction_data.append([
                    t['date'],
                    t['description'],
                    f"${t['amount']:.2f}",
                    t['category'],
                    t['type']
                ])
            
            # Create table
            transaction_table = Table(transaction_data, colWidths=[80, 180, 70, 100, 70])
            transaction_table.setStyle(TableStyle([
                ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
                ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
                ('GRID', (0, 0), (-1, -1), 1, colors.black),
                ('ALIGN', (2, 0), (2, -1), 'RIGHT')
            ]))
            
            elements.append(transaction_table)
        
        # Build PDF
        doc.build(elements)
        
        return filename
    
    def create_report(self, report_type, period=None):
        """Create a report and return the file path"""
        if report_type == "summary":
            return self.export_to_pdf(report_type="summary_only")
        elif report_type == "transactions":
            return self.export_to_pdf(report_type="transactions")
        elif report_type == "categories":
            # Implement category-based report
            pass
        
        # Default to full report
        return self.export_to_pdf()
    
    def share_report(self, file_path, share_method="local"):
        """
        Share a report file to an online location
        For simplicity, this just returns the local path
        In a real app, this would upload to Google Drive, Dropbox, etc.
        """
        if share_method == "local":
            return file_path
        elif share_method == "google_drive":
            # Would implement Google Drive API upload here
            return "https://drive.google.com/fake-link-to-uploaded-file"
        elif share_method == "dropbox":
            # Would implement Dropbox API upload here
            return "https://dropbox.com/fake-link-to-uploaded-file"
        
        return file_path
```


## Main Application

Let's connect everything and create the main entry point:

### main.py:

```python
import tkinter as tk
from tkinter import messagebox
import os

# Import our modules
from model.database import Database
from model.transaction import TransactionManager
from view.login import LoginWindow
from view.dashboard import AdminDashboard, ClientDashboard
from view.company import CompanyWindow
from utils.import_handlers import ImportHandler
from utils.export_handlers import ExportHandler

class CashbookApp:
    def __init__(self, root):
        self.root = root
        self.db = Database()
        self.current_user = None
        self.current_role = None
        self.current_company = None
        self.transaction_manager = None
        
        # Start with login window
        self.show_login()
    
    def show_login(self):
        # Clear current window content
        for widget in self.root.winfo_children():
            widget.destroy()
        
        # Show login window
        LoginWindow(self.root, self.authenticate_user)
    
    def authenticate_user(self, username, password):
        role = self.db.authenticate_user(username, password)
        
        if role:
            self.current_user = username
            self.current_role = role
            
            if role == "Admin":
                self.show_admin_dashboard()
            else:
                self.show_client_dashboard()
            
            return True
        
        return False
    
    def logout(self):
        self.current_user = None
        self.current_role = None
        self.current_company = None
        self.transaction_manager = None
        self.show_login()
    
    def show_admin_dashboard(self):
        # Clear current window content
        for widget in self.root.winfo_children():
            widget.destroy()
        
        # Show admin dashboard
        AdminDashboard(self.root, self.current_user, self.logout)
    
    def show_client_dashboard(self):
        # Clear current window content
        for widget in self.root.winfo_children():
            widget.destroy()
        
        # Show client dashboard
        ClientDashboard(
            self.root,
            self.current_user,
            self.logout,
            self.create_company,
            self.open_company
        )
        
        # Here we would load the user's companies from the database
    
    def create_company(self):
        # Show a dialog to create a new company
        create_window = tk.Toplevel(self.root)
        create_window.title("Create New Company")
        create_window.geometry("400x200")
        create_window.transient(self.root)
        create_window.grab_set()
        
        frame = tk.Frame(create_window, padx=20, pady=20)
        frame.pack(fill="both", expand=True)
        
        tk.Label(frame, text="Company Name:").grid(row=0, column=0, sticky="w", pady=10)
        name_var = tk.StringVar()
        name_entry = tk.Entry(frame, textvariable=name_var, width=30)
        name_entry.grid(row=0, column=1, sticky="ew", pady=10)
        
        tk.Label(frame, text="Description (optional):").grid(row=1, column=0, sticky="w", pady=10)
        desc_var = tk.StringVar()
        desc_entry = tk.Entry(frame, textvariable=desc_var, width=30)
        desc_entry.grid(row=1, column=1, sticky="ew", pady=10)
        
        button_frame = tk.Frame(frame)
        button_frame.grid(row=2, column=0, columnspan=2, pady=15)
        
        def save_company():
            company_name = name_var.get().strip()
            
            if not company_name:
                messagebox.showerror("Error", "Company name is required")
                return
            
            try:
                # Create company database
                db_path = self.db.init_company_db(company_name)
                
                create_window.destroy()
                
                # Open the new company
                self.open_company(company_name)
                
            except Exception as e:
                messagebox.showerror("Error", f"Failed to create company: {str(e)}")
        
        save_button = tk.Button(button_frame, text="Create", command=save_company)
        save_button.pack(side="left", padx=5)
        
        cancel_button = tk.Button(button_frame, text="Cancel", command=create_window.destroy)
        cancel_button.pack(side="left", padx=5)
        
        # Focus on name entry
        name_entry.focus_set()
    
    def open_company(self, company_name):
        # Convert company name to database file name
        db_name = f"{company_name.lower().replace(' ', '_')}.db"
        
        if not os.path.exists(db_name):
            messagebox.showerror("Error", f"Company database for '{company_name}' not found")
            return
        
        # Set current company and create transaction manager
        self.current_company = company_name
        self.transaction_manager = TransactionManager(db_name)
        
        # Clear current window content
        for widget in self.root.winfo_children():
            widget.destroy()
        
        # Open company window
        CompanyWindow(self.root, company_name, self.transaction_manager, self.close_company)
    
    def close_company(self):
        self.current_company = None
        self.transaction_manager = None
        
        if self.current_role == "Admin":
            self.show_admin_dashboard()
        else:
            self.show_client_dashboard()

if __name__ == "__main__":
    root = tk.Tk()
    root.title("Cashbook Software")
    root.geometry("800x600")
    
    app = CashbookApp(root)
    
    root.mainloop()
```


## Testing Strategy

Create comprehensive tests to ensure reliability:

```python
# tests/test_model.py
import unittest
import os
import sqlite3
from model.database import Database
from model.transaction import TransactionManager

class TestDatabase(unittest.TestCase):
    def setUp(self):
        # Use a test database
        self.db = Database()
        self.db.users_db = "test_users.db"
        self.db.init_users_db()
    
    def tearDown(self):
        # Clean up after tests
        if os.path.exists("test_users.db"):
            os.remove("test_users.db")
        if os.path.exists("test_company.db"):
            os.remove("test_company.db")
    
    def test_init_users_db(self):
        # Check if users database was created with admin user
        conn = sqlite3.connect("test_users.db")
        cursor = conn.cursor()
        cursor.execute("SELECT username, role FROM users WHERE username = 'admin'")
        result = cursor.fetchone()
        conn.close()
        
        self.assertIsNotNone(result)
        self.assertEqual(result[^1], "Admin")
    
    def test_init_company_db(self):
        # Create test company
        db_path = self.db.init_company_db("Test Company")
        
        # Check if database was created with transactions table
        self.assertTrue(os.path.exists(db_path))
        
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='transactions'")
        result = cursor.fetchone()
        conn.close()
        
        self.assertIsNotNone(result)
    
    def test_authenticate_user(self):
        # Add a test user
        conn = sqlite3.connect("test_users.db")
        cursor = conn.cursor()
        
        import hashlib
        hashed_password = hashlib.sha256("testpass".encode()).hexdigest()
        cursor.execute(
            "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
            ("testuser", hashed_password, "Client")
        )
        
        conn.commit()
        conn.close()
        
        # Test authentication
        result = self.db.authenticate_user("testuser", "testpass")
        self.assertEqual(result, "Client")
        
        # Test invalid authentication
        result = self.db.authenticate_user("testuser", "wrongpass")
        self.assertIsNone(result)


class TestTransactionManager(unittest.TestCase):
    def setUp(self):
        # Create a test database and manager
        self.db = Database()
        self.db_path = self.db.init_company_db("Test Company")
        self.manager = TransactionManager(self.db_path)
    
    def tearDown(self):
        # Clean up after tests
        if os.path.exists(self.db_path):
            os.remove(self.db_path)
    
    def test_add_transaction(self):
        # Add a test transaction
        self.manager.add_transaction(
            "2025-01-01", "Test Transaction", 100.00, "Test", "Income"
        )
        
        # Check if transaction was added
        transactions = self.manager.get_transactions()
        self.assertEqual(len(transactions), 1)
        self.assertEqual(transactions[^0]["description"], "Test Transaction")
        self.assertEqual(transactions[^0]["amount"], 100.00)
    
    def test_edit_transaction(self):
        # Add a test transaction
        self.manager.add_transaction(
            "2025-01-01", "Test Transaction", 100.00, "Test", "Income"
        )
        
        # Get transaction ID
        transaction = self.manager.get_transactions()[^0]
        
        # Edit transaction
        updates = {
            "description": "Updated Transaction",
            "amount": 200.00
        }
        self.manager.edit_transaction(transaction["id"], updates)
        
        # Check if transaction was updated
        updated = self.manager.get_transactions()[^0]
        self.assertEqual(updated["description"], "Updated Transaction")
        self.assertEqual(updated["amount"], 200.00)
    
    def test_delete_transaction(self):
        # Add a test transaction
        self.manager.add_transaction(
            "2025-01-01", "Test Transaction", 100.00, "Test", "Income"
        )
        
        # Get transaction ID
        transaction = self.manager.get_transactions()[^0]
        
        # Delete transaction
        self.manager.delete_transaction(transaction["id"])
        
        # Check if transaction was deleted
        transactions = self.manager.get_transactions()
        self.assertEqual(len(transactions), 0)
    
    def test_get_balance_summary(self):
        # Add income and expense transactions
        self.manager.add_transaction(
            "2025-01-01", "Test Income", 100.00, "Test", "Income"
        )
        self.manager.add_transaction(
            "2025-01-02", "Test Expense", 40.00, "Test", "Expense"
        )
        
        # Get summary
        summary = self.manager.get_balance_summary()
        
        # Check summary values
        self.assertEqual(summary["income"], 100.00)
        self.assertEqual(summary["expenses"], 40.00)
        self.assertEqual(summary["balance"], 60.00)
```


## Deployment Considerations

To deploy your cashbook application:

1. **Create an Executable**:

```bash
pip install pyinstaller
pyinstaller --onefile --windowed main.py
```

2. **Application Configuration**:
    - Create a config file to store settings like default file locations
    - Consider adding a logging system for debugging
3. **Data Backup Strategy**:
    - Implement automatic backup of database files
    - Consider adding an option to export/import all data

## Future Enhancements

After completing the initial version, consider these enhancements:

1. **Multi-currency Support**: Allow transactions in different currencies with conversion rates
2. **Direct Bank Integration**: Add API connections to download transactions directly
3. **Cloud Sync**: Implement proper cloud synchronization for multi-device access
4. **Advanced Reporting**: Add charts, projections, and budget comparison
5. **Categorization AI**: Implement machine learning for automatic transaction categorization[^1]

## Getting Started (Quick Start)

1. Clone the repository structure as outlined above
2. Install the required dependencies
3. Run `main.py` to start the application
4. Log in with default credentials (username: admin, password: admin)
5. Create your first company and start managing your transactions

This guide provides a comprehensive framework for building your cashbook application. The modular design allows for easy expansion and maintenance as requirements evolve.

<div>⁂</div>

[^1]: https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/59918128/798fc8e5-4745-43d3-930f-69ad91d53992/paste.txt

[^2]: https://example.com/paste.txt

