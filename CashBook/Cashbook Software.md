Below is an updated documentation of the features and system structure for your cashbook software, incorporating the new requirements: importing `.cb` (Cashbook Complete) and `.qif` (Quicken Interchange Format) files, adding comprehensive transactional management features, and implementing a login system with company-specific functionality. The system will now support reporting, importing, and sharing to an online-viewable location. This design aligns with a more robust, multi-user application while keeping the UI human-friendly.

```apb
Progress: 45/100
```

---

### Features of the Simplified Cashbook Software

#### Core Features
1. **Login System**
   - **Description**: Users log in as either "Client" or "Admin".
   - **Details**:
     - **Client**: Can create or open a company, manage transactions, generate reports, and share them.
     - **Admin**: Can manage users (add/delete clients) and view all companies (for oversight).
   - **Purpose**: Secure access and role-based functionality.

2. **Company Management (Client Only)**
   - **Description**: Clients can create or open a company to manage its financial data.
   - **Details**:
     - Create a new company (name, optional description).
     - Open an existing company from a list.
     - Each company has its own database for isolation.
   - **Purpose**: Allow clients to manage multiple entities separately.

3. **Transactional Management (Within a Company)**
   - **Description**: Comprehensive tools to manage transactions.
   - **Features**:
     - **Manual Entry**: Add income/expense (Date, Description, Amount, Category, Type).
     - **Edit Transactions**: Modify existing entries (e.g., change category or amount).
     - **Delete Transactions**: Remove unwanted entries.
     - **Categorize**: Assign or reassign categories to transactions (e.g., "Salary", "Utilities").
     - **Search/Filter**: Find transactions by date, category, or description.
   - **Purpose**: Provide full control over financial data with an intuitive interface.

4. **Bank Statement Import and Management**
   - **Description**: Import and manage transactions from `.cb` and `.qif` files.
   - **Details**:
     - **Supported Formats**:
       - `.cb`: Cashbook Complete export format (assumed CSV-like with Date, Description, Amount, etc.).
       - `.qif`: Standard format for financial software (parses Date, Amount, Payee, etc.).
     - **Import Process**: Upload file, preview transactions, assign categories, save to database.
     - **Management**: Edit or delete imported transactions as needed.
   - **Purpose**: Automate data entry from common financial formats.

5. **Balance Tracking**
   - **Description**: Real-time financial summary for the selected company.
   - **Outputs**: Total Income, Total Expenses, Net Balance.
   - **Purpose**: Quick overview of company finances.

6. **Transaction List**
   - **Description**: Table of all transactions for the current company.
   - **Columns**: Date, Description, Amount, Category, Type, Source (Manual/Imported).
   - **Purpose**: Centralized view for management.

7. **Create Reports**
   - **Description**: Generate detailed financial reports.
   - **Types**:
     - **Summary Report**: Income, Expenses, Balance for a period (e.g., month, year).
     - **Category Report**: Breakdown by category (e.g., total spent on "Rent").
     - **Transaction Report**: List of all transactions with filters (e.g., by date range).
   - **Format**: Displayed in UI, exportable as CSV or PDF.
   - **Purpose**: Offer actionable insights tailored to the company.

8. **Share Feature**
   - **Description**: Share reports or transaction data to an online-viewable location.
   - **Details**:
     - Export as CSV/PDF.
     - Upload to a predefined online location (e.g., Google Drive, Dropbox, or a custom server via API).
     - Generate a shareable link for online viewing.
   - **Purpose**: Enable remote access and collaboration.

#### Human-Friendly Design Goals
- **Intuitive Navigation**: Clear buttons and menus (e.g., "Open Company", "Import File").
- **Visual Feedback**: Color-coded transactions (green for income, red for expenses), progress messages (e.g., "Uploading...").
- **Minimal Complexity**: Simple workflows (e.g., login → select company → manage data).
- **Accessibility**: Large fonts, tooltips for guidance.

#### Excluded Features (Compared to Cashbook Complete)
- No direct bank API integration (file imports only).
- No advanced tax or multi-currency support (for simplicity).

---

### System Structure

#### Overview
The system is a Python desktop application with a multi-user, multi-company architecture. It uses SQLite for local storage (one database per company), Tkinter for the UI, and external libraries for `.qif` parsing and online sharing. It follows a modular MVC pattern for maintainability.

#### Components

1. **Model (Data Layer)**
   - **Purpose**: Manages data storage and logic.
   - **Technology**: SQLite (separate `.db` file per company, e.g., `company1.db`).
   - **Structure**:
     - **Users Table** (in a central `users.db`):
       - `id` (INTEGER, Primary Key).
       - `username` (TEXT).
       - `password` (TEXT, hashed).
       - `role` (TEXT: "Client" or "Admin").
     - **Transactions Table** (per company database):
       - `id` (INTEGER, Primary Key).
       - `date` (TEXT).
       - `description` (TEXT).
       - `amount` (REAL).
       - `category` (TEXT).
       - `type` (TEXT: "Income" or "Expense").
       - `source` (TEXT: "Manual" or "Imported").
   - **Functions**:
     - `init_users_db()`: Sets up the user database.
     - `init_company_db(company_name)`: Creates a new company database.
     - `authenticate_user(username, password)`: Verifies login.
     - `add_transaction()`: Adds a transaction.
     - `edit_transaction(id, updates)`: Modifies a transaction.
     - `delete_transaction(id)`: Removes a transaction.
     - `import_file(file_path, format)`: Parses `.cb` or `.qif` and adds transactions.
     - `get_transactions(filters)`: Retrieves filtered transactions.
     - `get_report(report_type, period)`: Fetches report data.

2. **View (User Interface Layer)**
   - **Purpose**: Displays data and handles user input.
   - **Technology**: Tkinter.
   - **Components**:
     - **Login Window**: Username, password, and "Login" button.
     - **Admin Dashboard**: User management (add/delete clients), company overview.
     - **Client Dashboard**: List of companies, "Create Company" button.
     - **Company Window**:
       - Summary Frame: Income, Expenses, Balance.
       - Button Frame: "Add Transaction", "Import File", "Edit Transaction", "Delete Transaction", "Generate Report", "Share".
       - Transaction List: `Treeview` with all transactions.
       - Search Bar: Filter transactions.
     - **Pop-ups**: Transaction entry, import preview, report display, share confirmation.
   - **Design Choices**:
     - Hierarchical navigation: Login → Dashboard → Company.
     - Consistent layout across windows.

3. **Controller (Logic Layer)**
   - **Purpose**: Coordinates between Model and View.
   - **Functions**:
     - `handle_login()`: Authenticates and directs to dashboard.
     - `create_company()`: Sets up a new company database.
     - `open_company()`: Loads company data into UI.
     - `update_summary()`: Refreshes financial summary.
     - `update_tree()`: Updates transaction list.
     - `handle_import()`: Processes `.cb` or `.qif` files.
     - `generate_report()`: Creates and displays reports.
     - `share_data()`: Exports and uploads to online location.
   - **Flow**:
     - Login → Select/Create Company → Manage Transactions → Generate/Share Reports.

#### Data Flow
1. **Login**: User logs in → Role-based dashboard opens.
2. **Company Selection**: Client opens/creates company → Company database loads.
3. **Transaction Management**: Add/edit/delete/import → Database updates → UI refreshes.
4. **Reporting**: Select report type → Data fetched → Displayed/exported.
5. **Sharing**: Export data → Upload online → Share link provided.

#### File Structure
- **main.py**: Entry point and login logic.
- **model.py**: Database functions.
- **view.py**: UI components.
- **controller.py**: Business logic.
- **users.db**: Central user database.
- **company_name.db**: Per-company transaction databases.
- **exports/**: Temporary folder for exported files.

#### Dependencies
- **Standard Library**:
  - `tkinter`: GUI.
  - `sqlite3`: Database.
  - `csv`: `.cb` parsing (assumed CSV-like).
  - `os`, `shutil`: File management.
- **External Libraries**:
  - `qifparse`: For `.qif` file parsing (`pip install qifparse`).
  - `requests` or `google-auth`: For online sharing (e.g., Google Drive API, `pip install requests` or `google-auth`).
  - `hashlib`: Password hashing.

#### Assumptions
- **.cb Format**: Assumed to be a CSV-like file (e.g., Date, Description, Amount). If proprietary, reverse-engineering may be needed.
- **Online Sharing**: Uses Google Drive as an example (requires API setup). Alternatives: Dropbox or a custom server.
- **Security**: Basic password hashing; no encryption for simplicity (can be added later).

---

### System Diagram
```
+-------------------+       +-------------------+       +-------------------+
|   View (Tkinter)  |<----->| Controller (Logic)|<----->|  Model (SQLite)   |
+-------------------+       +-------------------+       +-------------------+
| - Login Window    |       | - handle_login()  |       | - users.db        |
| - Admin Dashboard |       | - create_company()|       | - company_name.db |
| - Client Dashboard|       | - open_company()  |       | - init_users_db() |
| - Company Window  |       | - handle_import() |       | - init_company_db()|
|   - Summary       |       | - update_summary()|       | - authenticate()  |
|   - Buttons       |       | - update_tree()   |       | - import_file()   |
|   - Trans. List   |       | - generate_report()|      | - get_transactions()|
|   - Search Bar    |       | - share_data()    |       | - get_report()    |
| - Pop-ups         |       |                   |       |                   |
+-------------------+       +-------------------+       +-------------------+
```

---

### Next Steps
- **Code Implementation**: I can provide a modular codebase with login, company management, and the new features.
- **File Parsing**: Define exact `.cb` format (or sample file) and implement `.qif` parsing with `qifparse`.
- **Online Sharing**: Set up Google Drive API (or another service) with credentials.
- **UI Design**: Mock up the dashboard and company window layouts.

Let me know how you’d like to proceed—whether it’s coding this, refining specific parts, or providing a sample implementation! What’s your next priority?