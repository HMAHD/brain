 

## 1. Project Overview

### 1.1 Project Description
The Cashbook Application is a comprehensive Windows desktop application for personal and small business financial management. It enables users to track transactions, manage multiple bank accounts, reconcile bank statements, generate financial reports, and manage bills. The application will be developed using Python with Tkinter for the UI and SQLite for data storage.

### 1.2 Objectives
- Create a user-friendly financial management tool
- Provide accurate transaction tracking and categorization
- Enable bank account reconciliation 
- Support importing transactions from various file formats
- Generate comprehensive financial reports and visualizations
- Implement bills management and payment tracking

## 2. Functional Requirements

### 2.1 Core Functionality
- **Transaction Management**: Add, edit, delete, and categorize financial transactions
- **Account Management**: Create and manage multiple bank accounts with different types (checking, savings, credit card)
- **Bank Reconciliation**: Match transactions against bank statements and track reconciled balances
- **Categorization**: Organize transactions by custom categories and types (income/expense)
- **Data Import/Export**: Import from CSV, QIF, and custom formats; export to CSV, PDF, Excel
- **Reports**: Generate financial reports including transaction registers, income/expense summaries, and category breakdowns
- **Data Visualization**: Display interactive charts for income vs. expenses, category distribution, and balance trends
- **Bills Management**: Track upcoming bills, set reminders, and record payments

### 2.2 User Interface Requirements
- **Main Dashboard**: Overview of financial status with account balances and summary charts
- **Transaction Register**: Searchable, sortable list of transactions
- **Account View**: Detail view of individual account transactions and reconciliation status
- **Reconciliation Interface**: Side-by-side comparison of book records and bank statement
- **Reports View**: Interface for selecting, viewing, and exporting reports
- **Bills Dashboard**: Calendar view of upcoming bills and payment status
- **Settings**: User preferences for application behavior and appearance

## 3. Technical Architecture

### 3.1 Architecture Overview
The application will follow the Model-View-Controller (MVC) pattern:
- **Model**: Database layer and business logic
- **View**: UI components and rendering
- **Controller**: Application flow and business operations

### 3.2 Technology Stack
- **Programming Language**: Python 3.x
- **UI Framework**: Tkinter with ttk widgets
- **Database**: SQLite
- **Libraries**:
  - Matplotlib for data visualization
  - ReportLab for PDF generation
  - Pandas for data manipulation (optional)
  - QIF parsing library for QIF imports

## 4. Database Schema

### 4.1 Main Database Tables
```sql
-- accounts table
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

## 5. UI/UX Style Guide

### 5.1 Color Palette
- **Primary:** `#0078D4` (Standard Windows Blue) - Used for main interactive elements, headers, selected states
- **Secondary:** `#EFF6FC` (Light Blue) - Used for subtle backgrounds or hover states
- **Accent:** `#107C10` (Green) - Used for positive financial indicators (income, positive balance), success messages
- **Destructive/Error:** `#D83B01` (Red/Orange) - Used for negative financial indicators (expenses, negative balance), error messages
- **Warning:** `#FFB900` (Yellow) - Used for warning messages or indicators needing attention
- **Text (Primary):** `#1C1C1C` (Near Black) - For main content and labels
- **Text (Secondary):** `#5E5E5E` (Dark Gray) - For less important text, hints, or disabled text
- **Background (Main):** `#FFFFFF` (White) - Main content area background
- **Background (Subtle):** `#F3F3F3` (Light Gray) - Sidebar background, alternating list rows, card backgrounds
- **Border:** `#D1D1D1` (Medium Gray) - Borders for inputs, cards, tables

### 5.2 Typography
- **Default Font Family:** Segoe UI (Fallback: Calibri, Arial)
- **Base Font Size:** 11pt (used for body text, standard inputs, button text)
- **Hierarchy:**
  - **H1 (Page Title):** 24pt Bold
  - **H2 (Section Title):** 18pt Bold
  - **H3 (Card Title/Sub-section):** 14pt Bold
  - **Body Text:** 11pt Regular
  - **Labels (Form Fields):** 10pt Bold or 11pt Regular
  - **Captions/Small Text:** 9pt Regular
  - **Button Text:** 11pt Regular

### 5.3 Layout and Grid System
- **Base Spacing Unit:** 8px. Use multiples for padding and margins (8px, 16px, 24px)
- **Standard Padding:** 16px within content areas, cards, dialogs
- **Layout Structure:**
  - **Sidebar/Navigation:** Left-aligned, fixed width (240px on large screens)
  - **Main Content Area:** Occupies the remaining space
  - **Status Bar:** Bottom area for summary info or status messages

### 5.4 UI Components

#### 5.4.1 Buttons
- **Padding:** 8px vertical, 16px horizontal
- **Shape:** Slightly rounded corners (2px radius)
- **Primary:** Primary color background (#0078D4), white text
- **Secondary/Default:** White/Subtle Background, Primary color text/border
- **Destructive:** Destructive color background (#D83B01), white text
- **States:** Define hover (slightly darker background), pressed (darker background), disabled (grayed out)
- **Icon Buttons:** Square or circular with central icon, minimal padding

#### 5.4.2 Forms & Input Fields
- **Text Inputs/Amount Fields:** Border color (#D1D1D1), white background, standard padding, highlight on focus
- **Dropdowns (Comboboxes):** Consistent style with text inputs, clear dropdown arrow
- **Date Picker:** Standard calendar view pop-up
- **Checkboxes/Radio Buttons:** Clear visual difference between selected and unselected
- **Labels:** Positioned above corresponding input field

#### 5.4.3 Lists (Tkinter Treeview)
- **Header:** Bold text, subtle background color, padding, clickable for sorting
- **Rows:** Sufficient padding, alternating row colors (White and #F3F3F3) for readability
- **Selection:** Highlight selected row(s) with Primary color (semi-transparent) background
- **Scrollbars:** Standard Windows style

#### 5.4.4 Cards (Dashboard)
- **Background:** Background Subtle or White
- **Border:** Subtle Border color or subtle drop shadow
- **Padding:** 16px
- **Typography:** H3 for title, Body Text for content

#### 5.4.5 Dialogs/Modals
- **Overlay:** Semi-transparent dark overlay behind dialog
- **Container:** White background, border, optional shadow, standard padding
- **Title Bar:** Clear title using H2 or H3 typography
- **Buttons:** Typically aligned to bottom-right (OK/Cancel, Save/Close)

### 5.5 Animations & Transitions
- **Duration:** Brief (100ms-300ms). Faster for hover effects (~100ms), slightly longer for transitions (~200-250ms)
- **Easing:** Use ease-in-out for natural feel
- **Types:**
  - **Feedback:** Subtle flash or pulse on button clicks or successful actions
  - **State Changes:** Short fade-in/fade-out for appearing/disappearing elements
  - **Page Transitions:** Quick slide-up and fade-in effect (~250ms) for main navigation
  - **Hover Effects:** Quick, subtle background/text color changes on interactive elements

## 6. Project Structure

```
cashbook/
├── main.py                 # Application entry point
├── database/
│   ├── db_manager.py       # Database connection handler
│   └── schema.py           # Database schema definitions
├── models/
│   ├── account.py          # Account model
│   ├── transaction.py      # Transaction model
│   ├── category.py         # Category model
│   └── bill.py             # Bill model
├── views/
│   ├── main_window.py      # Main application window
│   ├── dashboard_view.py   # Dashboard view
│   ├── transactions_view.py # Transactions list/entry
│   ├── accounts_view.py    # Account management
│   ├── reconciliation_view.py # Reconciliation interface
│   ├── reports_view.py     # Reports interface
│   └── bills_view.py       # Bills management
├── controllers/
│   ├── account_controller.py # Account operations
│   ├── transaction_controller.py # Transaction operations
│   ├── reconciliation_controller.py # Reconciliation logic
│   └── report_controller.py # Report generation
├── utils/
│   ├── config.py           # Application configuration
│   ├── import_utils.py     # Import functionality
│   ├── export_utils.py     # Export functionality
│   └── date_utils.py       # Date handling utilities
└── resources/
    ├── icons/              # Application icons
    └── styles.css          # UI styles
```

## 7. Implementation Guidelines

### 7.1 Backend Implementation

#### 7.1.1 Database Setup
- Use SQLite for data storage
- Implement the schema as defined in Section 4
- Create a database manager class that handles connections and basic CRUD operations
- Implement proper error handling and transaction support

#### 7.1.2 Model Layer
- Create model classes for each database entity (Account, Transaction, Category, Bill)
- Implement validation logic within models
- Use proper types and handle data conversion between UI and database
- Each model should handle its own CRUD operations

#### 7.1.3 Controller Layer
- Implement business logic in controller classes
- Handle data flow between models and views
- Implement validation and error handling
- Use dependency injection to make testing easier

#### 7.1.4 Utility Functions
- Create utility modules for common operations
- Implement proper error handling and logging
- Make utility functions reusable and well-documented

### 7.2 Frontend Implementation

#### 7.2.1 Main Application Structure
- Create a main window class that serves as container for all views
- Implement navigation system using sidebar
- Create view manager for switching between different views
- Include global event handling system

#### 7.2.2 UI Components
- Use ttk themed widgets where possible for native look and feel
- Create custom widget classes for specialized displays (transaction list, account selector)
- Ensure consistent styling across all components
- Implement proper focus handling and keyboard navigation

#### 7.2.3 Form Implementation
- Create reusable form components
- Implement client-side validation with clear error messages
- Use consistent layout and spacing
- Include proper tab order for keyboard navigation

#### 7.2.4 View Implementation
- Each view should be a self-contained class
- Views should communicate with controllers, not directly with models
- Implement consistent layout and styling based on the style guide
- Include proper error handling and user feedback

#### 7.2.5 Data Visualization
- Use Matplotlib for charts and graphs
- Implement consistent styling for all visualizations
- Create reusable chart components with standard interfaces
- Support interaction (tooltips, drill-down) where appropriate

## 8. Development Phases

### 8.1 Phase 1: Project Setup & Foundation (30-40 hours)
- Set up development environment
- Create project structure
- Design and implement database schema
- Create basic application shell
- Implement data models
- Create transaction entry form
- Implement transaction listing view

### 8.2 Phase 2: Bank Account Management (20-25 hours)
- Implement account management UI
- Create account dashboard
- Implement multiple account backend
- Create journal entry system

### 8.3 Phase 3: Bank Reconciliation (25-30 hours)
- Create reconciliation UI
- Implement transaction matching logic
- Design reconciliation process flow
- Create reconciliation reports

### 8.4 Phase 4: Bank Statement Import (20-25 hours)
- Implement file import framework
- Create field mapping system
- Design transaction matching engine
- Create import rules engine

### 8.5 Phase 5: Reporting System (20-25 hours)
- Create report framework
- Implement transaction reports
- Design financial reports
- Create data visualization components

### 8.6 Phase 6: Bills Management (15-20 hours)
- Implement bills entry system
- Create bills dashboard
- Design bill payment processing
- Implement bill reminders

### 8.7 Phase 7: User Experience Improvements (15-20 hours)
- Create application settings
- Implement help system
- Add search functionality
- Improve data validation and error handling

### 8.8 Phase 8: Testing and Deployment (15-20 hours)
- Implement unit testing
- Perform integration testing
- Conduct user acceptance testing
- Create application packaging and installer

## 9. Testing Strategy

### 9.1 Unit Testing
- Test each model class for proper data handling
- Test controller logic for correct business rules
- Test utility functions for correct behavior
- Use pytest for testing framework

### 9.2 Integration Testing
- Test interactions between components
- Verify database operations work correctly
- Test import/export functionality
- Ensure UI updates correctly with data changes

### 9.3 User Acceptance Testing
- Test with realistic data and scenarios
- Verify application behaves correctly under stress
- Test performance with large datasets
- Check for usability issues

## 10. Future Enhancements

- Multi-currency support
- Cloud sync capabilities
- Tax calculation and reporting
- Budget planning and forecasting
- Mobile companion app
- Advanced data analysis tools

