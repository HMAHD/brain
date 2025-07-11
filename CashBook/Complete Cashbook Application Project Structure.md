
## Root-Level Project Structure

```
cashbook/
├── .github/                # GitHub workflows and CI/CD configurations
├── assets/                 # Images, icons, and other static assets
├── data/                   # Default data files and templates
├── docs/                   # Documentation
├── src/                    # Source code
├── tests/                  # All test files
├── .gitignore              # Git ignore file
├── LICENSE                 # License file
├── pyproject.toml          # Project metadata and dependencies 
├── README.md               # Project documentation
└── setup.py                # Installation script
```


## Detailed Source Code Structure (`src/`)

```
src/
├── cashbook/               # Main package
│   ├── __init__.py         # Package initializer
│   ├── __main__.py         # Entry point for running the application
│   ├── config/             # Configuration files and settings
│   │   ├── __init__.py
│   │   ├── settings.py     # Application settings
│   │   └── constants.py    # Application constants
│   ├── core/               # Core business logic
│   │   ├── __init__.py
│   │   ├── accounts.py     # Bank account management
│   │   ├── transactions.py # Transaction handling
│   │   ├── reconciliation.py # Bank reconciliation logic
│   │   ├── categories.py   # Category management
│   │   └── bills.py        # Bills to pay functionality
│   ├── database/           # Database layer
│   │   ├── __init__.py
│   │   ├── db_manager.py   # Database connection handler
│   │   ├── schema.py       # Database schema definitions
│   │   ├── migrations/     # Database migrations
│   │   └── models/         # SQLAlchemy or custom ORM models
│   │       ├── __init__.py
│   │       ├── account.py
│   │       ├── transaction.py
│   │       ├── category.py
│   │       ├── bill.py
│   │       └── invoice.py
│   ├── importers/          # File import functionality
│   │   ├── __init__.py
│   │   ├── csv_importer.py # CSV import handler
│   │   ├── qif_importer.py # QIF import handler 
│   │   └── cb_importer.py  # Cashbook format importer
│   ├── exporters/          # File export functionality
│   │   ├── __init__.py
│   │   ├── csv_exporter.py # CSV export handler
│   │   ├── excel_exporter.py # Excel export handler
│   │   └── pdf_exporter.py # PDF export handler
│   ├── reports/            # Reporting functionality
│   │   ├── __init__.py
│   │   ├── report_engine.py # Report generation core
│   │   ├── transaction_reports.py
│   │   ├── reconciliation_reports.py
│   │   ├── tax_reports.py
│   │   └── templates/      # Report templates
│   ├── ui/                 # User interface components
│   │   ├── __init__.py
│   │   ├── app.py          # Main application window
│   │   ├── styles.py       # UI styling definitions
│   │   ├── utils.py        # UI utility functions
│   │   ├── dialogs/        # Custom dialog windows
│   │   │   ├── __init__.py
│   │   │   ├── transaction_dialog.py
│   │   │   ├── account_dialog.py
│   │   │   ├── reconciliation_dialog.py
│   │   │   ├── import_dialog.py
│   │   │   └── export_dialog.py
│   │   ├── widgets/        # Custom widgets
│   │   │   ├── __init__.py
│   │   │   ├── account_selector.py
│   │   │   ├── date_picker.py
│   │   │   ├── transaction_list.py
│   │   │   └── category_selector.py
│   │   └── views/          # Main application views
│   │       ├── __init__.py
│   │       ├── dashboard_view.py  # Main dashboard
│   │       ├── transactions_view.py
│   │       ├── accounts_view.py
│   │       ├── reconciliation_view.py
│   │       ├── bills_view.py
│   │       ├── reports_view.py
│   │       └── settings_view.py
│   ├── utils/              # Utility functions
│   │   ├── __init__.py
│   │   ├── date_utils.py   # Date handling utilities
│   │   ├── currency_utils.py # Currency formatting
│   │   ├── validation.py   # Input validation
│   │   └── logger.py       # Logging functionality
│   └── services/           # External services integration
│       ├── __init__.py
│       ├── backup_service.py # Backup functionality
│       └── tax_service.py  # Tax calculation service
└── resources/              # UI resources
    ├── icons/              # Application icons
    ├── styles/             # CSS/style files
    └── templates/          # UI templates
```


## Database Schema Structure

```sql
-- accounts table (for bank accounts)
CREATE TABLE accounts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    currency TEXT NOT NULL DEFAULT 'USD',
    opening_balance REAL NOT NULL DEFAULT 0.0,
    current_balance REAL NOT NULL DEFAULT 0.0,
    reconciled_balance REAL NOT NULL DEFAULT 0.0,
    active INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- categories table
CREATE TABLE categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT NOT NULL,  -- 'income', 'expense', 'transfer'
    tax_deductible INTEGER NOT NULL DEFAULT 0,
    active INTEGER NOT NULL DEFAULT 1
);

-- transactions table
CREATE TABLE transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    account_id INTEGER NOT NULL,
    date TEXT NOT NULL,
    payee TEXT,
    category_id INTEGER,
    amount REAL NOT NULL,
    description TEXT,
    reference TEXT,
    reconciled INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (account_id) REFERENCES accounts(id),
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- bills table
CREATE TABLE bills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    payee TEXT NOT NULL,
    amount REAL NOT NULL,
    due_date TEXT NOT NULL,
    category_id INTEGER,
    recurring INTEGER NOT NULL DEFAULT 0,
    recurring_period TEXT,
    paid INTEGER NOT NULL DEFAULT 0,
    notes TEXT,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- invoices table
CREATE TABLE invoices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    invoice_number TEXT NOT NULL,
    client_name TEXT NOT NULL,
    issue_date TEXT NOT NULL,
    due_date TEXT NOT NULL,
    total_amount REAL NOT NULL,
    paid_amount REAL NOT NULL DEFAULT 0.0,
    status TEXT NOT NULL DEFAULT 'unpaid',
    notes TEXT
);

-- reconciliation_sessions table
CREATE TABLE reconciliation_sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    account_id INTEGER NOT NULL,
    start_date TEXT NOT NULL,
    end_date TEXT NOT NULL,
    starting_balance REAL NOT NULL,
    ending_balance REAL NOT NULL,
    reconciled_balance REAL NOT NULL,
    status TEXT NOT NULL DEFAULT 'in_progress',
    completed_at TIMESTAMP,
    FOREIGN KEY (account_id) REFERENCES accounts(id)
);

-- import_rules table
CREATE TABLE import_rules (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description_pattern TEXT NOT NULL,
    category_id INTEGER,
    payee TEXT,
    active INTEGER NOT NULL DEFAULT 1,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);
```


## Key Application Modules and Functions

### Core Modules

1. **Transaction Management**
    - `add_transaction()`
    - `edit_transaction()`
    - `delete_transaction()`
    - `get_transactions_by_date_range()`
    - `get_transactions_by_category()`
2. **Account Management**
    - `create_account()`
    - `update_account()`
    - `calculate_balance()`
    - `transfer_between_accounts()`
3. **Reconciliation Engine**
    - `start_reconciliation_session()`
    - `match_transaction()`
    - `unmatch_transaction()`
    - `complete_reconciliation()`
4. **Import/Export Functions**
    - `import_qif_file()`
    - `import_csv_file()`
    - `import_cb_file()`
    - `export_to_csv()`
    - `export_to_excel()`
    - `export_to_pdf()`
5. **Reporting Engine**
    - `generate_transaction_report()`
    - `generate_income_expense_summary()`
    - `generate_category_breakdown()`
    - `generate_tax_report()`

### UI Components

1. **Main Application Window**
    - Dashboard with financial overview
    - Navigation sidebar
    - Status bar
2. **Transaction Management UI**
    - Transaction entry form
    - Transaction list view
    - Search and filter functionality
3. **Reconciliation UI**
    - Side-by-side view of book vs. statement
    - Match/unmatch controls
    - Reconciliation summary
4. **Import/Export UI**
    - File selection dialogs
    - Import mapping interface
    - Export format options
5. **Reporting UI**
    - Report parameter selection
    - Report viewer
    - Export options

## Technologies and Libraries

1. **UI Framework**
    - PyQt5 or Tkinter with ttkbootstrap
2. **Database**
    - SQLite with SQLAlchemy ORM
3. **Data Processing**
    - Pandas for data manipulation
    - NumPy for numerical operations
4. **Reporting and Visualization**
    - Matplotlib for charts and graphs
    - ReportLab for PDF generation
    - openpyxl for Excel file handling
5. **Financial Libraries**
    - quiffen for QIF file handling
    - Decimal module for precise financial calculations

