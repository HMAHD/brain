# CeybytePOS - Complete AI Development Task List (Updated)

## Architecture Overview

- **Database**: SQLite only (no PostgreSQL needed)
- **Network**: Main PC hosts SQLite file, Clients connect via network share
- **Backup**: Local backups free, WhatsApp backup, cloud backup (Google Drive/OneDrive) as premium
- **Focus**: Speed, simplicity, and Sri Lankan business practices
- **Special**: WhatsApp integration, Helper mode, Power cut management

---

## Phase 1: Project Foundation

### Task 1.1: Initialize Project Structure

- [x] Create a new Tauri project with React and TypeScript
    - [x] Set up folder structure for frontend React components
    - [x] Create backend Python API directory
    - [x] Set up database models folder
    - [x] Create shared types directory
    - [x] Configure assets folder for images and logos
- [x] Configure dependencies
    - [x] Install Tailwind CSS and configure
    - [x] Install shadcn/ui components
    - [x] Set up Python FastAPI with requirements.txt
    - [x] Install SQLite3 and SQLAlchemy
    - [x] Add python-escpos for printing
    - [x] Install WhatsApp Web API dependencies
    - [x] Add power monitoring libraries

### Task 1.2: Configure Development Environment

- [x] Set up development tools
    - [x] Configure hot reloading for React frontend
    - [x] Set up Python backend auto-reload
    - [x] Install VS Code extensions (React, Python, Tauri)
    - [x] Configure ESLint and Prettier for React
    - [x] Set up Black formatter for Python
- [x] Environment configuration
    - [x] Create .env files for development
    - [x] Set up production environment variables
    - [x] Configure Git hooks for code quality
    - [x] Add .gitignore for sensitive files

### Task 1.3: Design Database Schema

- [x] Create core tables
    - [x] Products table with multi-language names, barcode, prices (cost/selling), negotiable flag
    - [x] Categories with parent-child hierarchy
    - [x] Units of measure with decimal precision settings
    - [x] Customers with credit limit, balance tracking, area/village grouping
    - [x] Suppliers with credit terms, outstanding amounts, visit schedule
- [x] Transaction tables
    - [x] Sales with walk-in/credit customer support
    - [x] Sale items with quantity, UOM, negotiated price
    - [x] Payments with methods (cash/card/mobile)
    - [x] Customer credit book entries
    - [x] Supplier invoices and payments
    - [x] Delivery tracking (three-wheeler)
- [x] System tables
    - [x] Users with roles (Owner, Cashier, Helper)
    - [x] Terminals for network setup
    - [x] Settings for business configuration
    - [x] Audit logs for all transactions
    - [x] Festival calendar data

### Task 1.4: Set Up Database Connection

- [x] SQLite configuration
    - [x] Create database file in application data folder
    - [x] Set up connection string for local access
    - [x] Configure network file sharing for multi-terminal
    - [x] Implement file locking for concurrent access
    - [x] Create connection pooling for performance
- [x] Database initialization
    - [x] Create schema creation scripts
    - [x] Add seed data for testing (UOMs, sample products)
    - [x] Add Sri Lankan festival dates
    - [x] Implement database version checking
    - [x] Create backup/restore functionality

### Task 1.5: Create Network Selection Dialog

- [x] First-run configuration screen
    - [x] "Main Computer" or "Client Computer" selection
    - [x] For Main: Set up database and file sharing
    - [x] For Client: Network path entry (\MAIN-PC\POS)
    - [x] Test connection button with status display
    - [x] Save configuration for future launches
- [x] Network setup guide
    - [x] Show instructions for Windows file sharing
    - [x] Provide troubleshooting tips
    - [x] Display connection success message
    - [x] Create offline mode fallback option

### Task 1.6: Create Base UI Layout

- [ ] Main application shell
    - [ ] Sidebar with navigation icons and labels
    - [ ] Header showing user, terminal name, connection status
    - [ ] Main content area with router
    - [ ] Footer with Ceybyte branding
    - [ ] Keyboard shortcut indicators
    - [ ] UPS status indicator (if detected)
- [ ] Design system setup
    - [ ] Configure Ceybyte color scheme
    - [ ] Set up consistent spacing and typography
    - [ ] Create loading states and skeletons
    - [ ] Implement responsive design (min 1024x768)

### Task 1.7: Implement Multi-language System

- [ ] Language framework setup
    - [ ] Install and configure i18n library
    - [ ] Create language file structure
    - [ ] Set up English translations
    - [ ] Add Sinhala translations
    - [ ] Add Tamil translations with RTL support
- [ ] UI language features
    - [ ] Language switcher in header
    - [ ] Persist language preference
    - [ ] Currency formatting (Rs. X,XXX.XX)
    - [ ] Date formatting (DD/MM/YYYY)
    - [ ] Number formatting for each language

---

## Phase 2: Authentication & User Management

### Task 2.1: Create Login Screen

- [ ] Design login interface
    - [ ] Beautiful login page with Ceybyte branding
    - [ ] Username and password fields
    - [ ] Terminal selection dropdown (if multi-terminal)
    - [ ] Remember me checkbox
    - [ ] Language selection on login
    - [ ] Helper mode quick access button
- [ ] Login functionality
    - [ ] Enter key submits form
    - [ ] Tab navigation between fields
    - [ ] Loading state during authentication
    - [ ] Error messages for invalid credentials
    - [ ] Auto-focus on username field
    - [ ] PIN-based quick login for helpers

### Task 2.2: Implement User Authentication API

- [ ] Backend authentication
    - [ ] Create login endpoint with JWT tokens
    - [ ] Password hashing with bcrypt
    - [ ] PIN support for helper accounts
    - [ ] Token refresh mechanism
    - [ ] Brute force protection (5 attempts)
    - [ ] Session management per terminal
- [ ] Security features
    - [ ] Token expiration handling
    - [ ] Secure token storage
    - [ ] Logout functionality
    - [ ] Activity timeout settings
    - [ ] Password complexity rules
    - [ ] Helper mode restrictions

### Task 2.3: Create User Management Interface

- [ ] User list page
    - [ ] Display all users with status
    - [ ] Search by name or username
    - [ ] Filter by role (Owner, Cashier, Helper)
    - [ ] Quick enable/disable toggle
    - [ ] Last login information
- [ ] User creation/editing
    - [ ] Add new user form
    - [ ] Role selection (simplified: Owner, Cashier, Helper)
    - [ ] Terminal access permissions
    - [ ] Password reset functionality
    - [ ] PIN setup for helpers
    - [ ] Active/inactive status

### Task 2.4: Implement Role-Based Access Control

- [ ] Simplified permission system
    - [ ] Owner: Full system access
    - [ ] Cashier: Sales, basic reports, no settings
    - [ ] Helper: Only sales screen, no reports/money
    - [ ] Quick role switching
    - [ ] Session-based permissions
- [ ] UI access control
    - [ ] Hide/show menu items by role
    - [ ] Disable restricted buttons
    - [ ] Route protection in React
    - [ ] API endpoint authorization
    - [ ] Access denied messages

### Task 2.5: Create User Session Management

- [ ] Session tracking
    - [ ] Active sessions display
    - [ ] Login/logout history
    - [ ] Multi-terminal session support
    - [ ] Force logout capability
    - [ ] Session timeout configuration
- [ ] Audit logging
    - [ ] Log all user actions
    - [ ] Track terminal usage
    - [ ] Failed login attempts
    - [ ] Helper mode activities
    - [ ] Cash handling by user

---

## Phase 3: Product Management

### Task 3.1: Create Product List Interface

- [ ] Product display grid
    - [ ] Grid/list view toggle
    - [ ] Product image thumbnails
    - [ ] Name, price, stock display
    - [ ] Quick edit buttons
    - [ ] Stock status indicators
    - [ ] Negotiable price badge
- [ ] Search and filters
    - [ ] Search by name (all languages)
    - [ ] Barcode search
    - [ ] Category filter dropdown
    - [ ] Price range filter
    - [ ] Stock level filter
- [ ] Keyboard shortcuts
    - [ ] F2 opens product search
    - [ ] Enter selects product
    - [ ] Arrow keys navigate
    - [ ] Delete key for removal
    - [ ] Ctrl+N for new product

### Task 3.2: Build Product Add/Edit Form

- [ ] Basic information
    - [ ] Product name in three languages
    - [ ] Barcode field with scanner support
    - [ ] Category selection with search
    - [ ] Supplier dropdown
    - [ ] Product image upload
- [ ] Pricing configuration
    - [ ] Cost price entry
    - [ ] Selling price calculation
    - [ ] Markup percentage display
    - [ ] Price negotiation toggle (default OFF)
    - [ ] Minimum acceptable price (if negotiable)
- [ ] Inventory settings
    - [ ] Primary unit of measure
    - [ ] Allow decimals checkbox
    - [ ] Reorder level setting
    - [ ] Initial stock entry

### Task 3.3: Implement Barcode Management

- [ ] Barcode scanning
    - [ ] USB scanner integration
    - [ ] Bluetooth scanner support
    - [ ] Manual barcode entry
    - [ ] Duplicate barcode check
    - [ ] Audio feedback
- [ ] Barcode generation
    - [ ] Auto-generate for new products
    - [ ] Multiple format support
    - [ ] Custom prefix option
    - [ ] Check digit calculation
    - [ ] Bulk generation tool

### Task 3.4: Create Category Management

- [ ] Category tree structure
    - [ ] Parent-child relationships
    - [ ] Drag-drop reorganization
    - [ ] Expand/collapse nodes
    - [ ] Category icons/images
    - [ ] Multi-level support
- [ ] Category operations
    - [ ] Add new category
    - [ ] Edit category details
    - [ ] Delete with confirmation
    - [ ] Move products between categories
    - [ ] Default negotiable setting per category

### Task 3.5: Implement Product Search System

- [ ] Advanced search
    - [ ] Multi-language search
    - [ ] Fuzzy search for typos
    - [ ] Search suggestions
    - [ ] Recent searches
    - [ ] Search by supplier
- [ ] Search performance
    - [ ] Indexed search fields
    - [ ] Cached results
    - [ ] Instant results display
    - [ ] Keyboard navigation
    - [ ] Clear search option

### Task 3.6: Build Unit of Measure System

- [ ] UOM master data
    - [ ] Standard units (pcs, kg, g, L, m)
    - [ ] Decimal places configuration
    - [ ] Base unit relationships
    - [ ] Custom units addition
    - [ ] Conversion factors
- [ ] Product UOM assignment
    - [ ] Primary selling unit
    - [ ] Display unit options
    - [ ] Conversion validation
    - [ ] UOM change history

---

## Phase 4: Sales Interface

### Task 4.1: Design Point of Sale Screen

- [ ] Three-column layout
    - [ ] Left: Product search with category filter
    - [ ] Center: Shopping cart with items
    - [ ] Right: Customer info and payment panel
    - [ ] Bottom: Total display and quick actions
    - [ ] Status bar showing mode (Walk-in/Customer)
- [ ] Visual design
    - [ ] Large, readable fonts for older users
    - [ ] High contrast colors for clarity
    - [ ] Ceybyte branding in corner
    - [ ] Connection status indicator
    - [ ] Current user display
    - [ ] Helper mode indicator

### Task 4.2: Implement Product Selection

- [ ] Product search functionality
    - [ ] Search by name (all languages), barcode, or code
    - [ ] Show autocomplete with stock and price
    - [ ] Display recently sold products
    - [ ] Category quick filter buttons
    - [ ] Low stock warning indicators
    - [ ] Negotiable price indicator
- [ ] Barcode scanning
    - [ ] Auto-focus on barcode field
    - [ ] Audio beep on successful scan
    - [ ] Automatic quantity 1 and add to cart
    - [ ] Error sound for unknown barcode
    - [ ] Manual barcode entry option

### Task 4.3: Build Shopping Cart Management

- [ ] Cart item display
    - [ ] Product name, quantity, price, total
    - [ ] Quantity adjustment (click or type)
    - [ ] Quick delete with confirmation
    - [ ] Show "Negotiable" badge on products
    - [ ] "Custom Price" button (only if allowed)
- [ ] Price negotiation
    - [ ] Quick negotiation buttons (-5%, -10%, Round down)
    - [ ] Custom price entry field
    - [ ] Minimum price validation
    - [ ] Show original vs negotiated price
    - [ ] Track who gave discount
- [ ] Cart calculations
    - [ ] Running subtotal
    - [ ] Tax calculation (VAT)
    - [ ] Total discount display
    - [ ] Grand total in large font
    - [ ] Item count indicator

### Task 4.4: Create Quick Sale Flow

- [ ] Keyboard-first operation
    - [ ] Scan/type barcode → auto-adds to cart
    - [ ] Numpad + Enter adds custom quantity
    - [ ] F12 instantly completes cash sale
    - [ ] No dialogs or confirmations for speed
    - [ ] Auto-print receipt and open drawer
- [ ] Speed optimizations
    - [ ] Default to walk-in customer
    - [ ] Skip payment method selection for cash
    - [ ] Auto-calculate exact change
    - [ ] Immediate new sale start
    - [ ] Sound feedback for actions

### Task 4.5: Implement Customer Selection

- [ ] Customer mode toggle
    - [ ] F3 switches to customer mode
    - [ ] Search customers by name/phone
    - [ ] Show credit limit and balance
    - [ ] Quick "Add New Customer" option
    - [ ] Recent customers list
    - [ ] Area/village filter
- [ ] Credit sale warnings
    - [ ] Red alert if exceeding credit limit
    - [ ] Manager override with password
    - [ ] Show days overdue if any
    - [ ] Update balance in real-time

### Task 4.6: Create Sale Hold/Retrieve

- [ ] Hold functionality
    - [ ] Ctrl+H holds current sale
    - [ ] Tag with customer name or note
    - [ ] Save cart state completely
    - [ ] Clear current cart for new sale
    - [ ] Show held sales count
- [ ] Retrieve functionality
    - [ ] Ctrl+R shows held sales list
    - [ ] Display time, total, customer
    - [ ] One-click restore to cart
    - [ ] Auto-delete after 24 hours
    - [ ] Merge with current cart option

---

## Phase 5: Payment Processing

### Task 5.1: Design Payment Interface

- [ ] Payment modal design
    - [ ] Large total amount display
    - [ ] Payment method tabs
    - [ ] Amount tendered field
    - [ ] Change calculation display
    - [ ] Quick amount buttons
- [ ] Payment methods
    - [ ] Cash (default)
    - [ ] Card (simple option)
    - [ ] Mobile money (eZ Cash, mCash)
    - [ ] Customer credit
    - [ ] Split payment option

### Task 5.2: Implement Cash Payment

- [ ] Cash handling
    - [ ] Amount input validation
    - [ ] Change calculation
    - [ ] Quick cash buttons (100, 500, 1000, 5000)
    - [ ] Exact amount button
    - [ ] Insufficient amount warning
- [ ] Cash drawer integration
    - [ ] Open drawer command
    - [ ] Drawer status check
    - [ ] Manual open option
    - [ ] Cash reconciliation
    - [ ] End-of-day counting

### Task 5.3: Add Simple Card Payment

- [ ] Card payment flow
    - [ ] Single "Card" option
    - [ ] Reference number field
    - [ ] Amount confirmation
    - [ ] Receipt shows "Paid by Card"
    - [ ] Daily card summary

### Task 5.4: Integrate Mobile Money

- [ ] Provider integration
    - [ ] Dialog eZ Cash
    - [ ] Mobitel mCash
    - [ ] Other providers
    - [ ] Provider selection UI
    - [ ] Phone number validation
- [ ] Transaction handling
    - [ ] Reference number entry
    - [ ] QR code generation
    - [ ] Payment confirmation
    - [ ] Failed payment retry
    - [ ] Refund processing

### Task 5.5: Build Customer Credit Sales

- [ ] Credit sale process
    - [ ] Automatic customer selection
    - [ ] Credit limit checking
    - [ ] Balance update
    - [ ] Payment terms display
    - [ ] Credit receipt format
- [ ] Credit management
    - [ ] Override authorization
    - [ ] Partial payment option
    - [ ] Interest calculation
    - [ ] Credit note generation
    - [ ] Account freeze option

### Task 5.6: Create Payment Confirmation

- [ ] Confirmation flow
    - [ ] Sale summary display
    - [ ] Payment breakdown
    - [ ] Final confirmation
    - [ ] Processing animation
    - [ ] Success notification
- [ ] Post-payment actions
    - [ ] Inventory deduction
    - [ ] Customer balance update
    - [ ] Receipt printing
    - [ ] Cash drawer opening
    - [ ] New sale preparation
    - [ ] WhatsApp receipt option

---

## Phase 6: Printing System

### Task 6.1: Create Printer Configuration

- [ ] Printer setup interface
    - [ ] Printer detection/selection
    - [ ] Test print button
    - [ ] Paper size selection (58mm, 80mm)
    - [ ] Print density adjustment
    - [ ] Character set configuration
- [ ] Printer profiles
    - [ ] Save multiple printer configs
    - [ ] Quick profile switching
    - [ ] Network printer support
    - [ ] Backup printer option
    - [ ] Default printer setting

### Task 6.2: Implement ESC/POS Commands

- [ ] Core printing commands
    - [ ] Initialize printer
    - [ ] Text alignment (left, center, right)
    - [ ] Font sizes (normal, double height/width)
    - [ ] Bold and underline
    - [ ] Paper cutting
- [ ] Advanced features
    - [ ] Multi-language support (Sinhala, Tamil)
    - [ ] Barcode printing
    - [ ] Image/logo printing
    - [ ] Cash drawer control
    - [ ] Status checking

### Task 6.3: Build Receipt Template System

- [ ] Template designer
    - [ ] Drag-drop receipt elements
    - [ ] Header/footer configuration
    - [ ] Variable placeholders
    - [ ] Preview functionality
    - [ ] Template saving
- [ ] Receipt types
    - [ ] Walk-in sale receipt
    - [ ] Credit sale receipt
    - [ ] Payment receipt
    - [ ] Return receipt
    - [ ] Day-end summary
    - [ ] WhatsApp receipt format (text only)
- [ ] Receipt features
    - [ ] Show payment method clearly
    - [ ] Helper/cashier name on receipt
    - [ ] "Powered by Ceybyte" footer
    - [ ] Power cut recovery print

### Task 6.4: Implement Direct Printing

- [ ] Print management
    - [ ] Direct printing (no Windows dialog)
    - [ ] Print queue handling
    - [ ] Error recovery
    - [ ] Reprint functionality
    - [ ] Print history log
- [ ] Performance optimization
    - [ ] Background printing
    - [ ] Print spooling
    - [ ] Memory management
    - [ ] Parallel printing
    - [ ] Print caching

### Task 6.5: Add Barcode Label Printing

- [ ] Label designer
    - [ ] Multiple label layouts
    - [ ] Barcode formats
    - [ ] Price inclusion
    - [ ] Product name options
    - [ ] Custom fields
- [ ] Batch printing
    - [ ] Print from product list
    - [ ] Quantity selection
    - [ ] Sheet layout options
    - [ ] Skip existing labels
    - [ ] Print preview

---

## Phase 7: Customer Management

### Task 7.1: Create Customer Database Interface

- [ ] Customer list view
    - [ ] Search by name/phone/email
    - [ ] Filter by status (active, credit, overdue)
    - [ ] Balance display in list
    - [ ] Quick action buttons
    - [ ] Area/village grouping
- [ ] List features
    - [ ] Sort options
    - [ ] Column customization
    - [ ] Export to Excel
    - [ ] Bulk operations
    - [ ] Print customer list

### Task 7.2: Design Customer Registration Form

- [ ] Customer information
    - [ ] Full name (required)
    - [ ] Phone number (required, validated)
    - [ ] Email address
    - [ ] Physical address
    - [ ] NIC number
    - [ ] Area/village selection
- [ ] Credit settings
    - [ ] Credit limit amount
    - [ ] Payment terms
    - [ ] Credit status
    - [ ] Collection day preference
    - [ ] WhatsApp opt-in
    - [ ] Notes field

### Task 7.3: Implement Customer Ledger

- [ ] Ledger display
    - [ ] Transaction history table
    - [ ] Running balance column
    - [ ] Date range filter
    - [ ] Transaction type filter
    - [ ] Print statement option
    - [ ] WhatsApp statement
- [ ] Aging analysis
    - [ ] Current balance
    - [ ] 30 days overdue
    - [ ] 60 days overdue
    - [ ] 90+ days overdue
    - [ ] Total outstanding

### Task 7.4: Build Payment Collection Interface

- [ ] Payment entry
    - [ ] Outstanding invoices list
    - [ ] Payment amount input
    - [ ] Allocation to invoices
    - [ ] Payment method selection
    - [ ] Receipt generation
- [ ] Collection features
    - [ ] Area-wise collection list
    - [ ] Collection route planning
    - [ ] Bulk payment entry
    - [ ] Partial payments
    - [ ] WhatsApp payment confirmation

### Task 7.5: Create Customer Reports

- [ ] Simple reports only
    - [ ] Sales history
    - [ ] Payment history
    - [ ] Current balance summary
    - [ ] Area-wise outstanding
- [ ] Report features
    - [ ] Date range selection
    - [ ] Export to Excel
    - [ ] WhatsApp sharing
    - [ ] Print options

---

## Phase 8: Supplier Credit System (Sri Lankan Style)

### Task 8.1: Create Supplier Management

- [ ] Supplier registration
    - [ ] Company name and contact details
    - [ ] Multiple contact persons support
    - [ ] Default payment terms (7/14/30 days)
    - [ ] Credit limit setting
    - [ ] Preferred delivery days
    - [ ] Van visit schedule
- [ ] Supplier list interface
    - [ ] Search by name or contact
    - [ ] Show total outstanding amount
    - [ ] Quick actions (New invoice, Payment)
    - [ ] Color coding for overdue amounts
    - [ ] Last delivery date display
    - [ ] Today's expected suppliers

### Task 8.2: Implement Supplier Invoice Entry

- [ ] Invoice recording interface
    - [ ] Supplier selection dropdown
    - [ ] Invoice number and date
    - [ ] Photo attachment option (for invoice copy)
    - [ ] Manual text entry for invoice details
    - [ ] Product list with quantities and costs
- [ ] Alternative to camera capture
    - [ ] Quick invoice summary entry
    - [ ] Total amount and item count only
    - [ ] Notes field for invoice details
    - [ ] Reminder to keep physical copy
    - [ ] Generate unique reference number

### Task 8.3: Build Purchase on Credit Flow

- [ ] Delivery recording
    - [ ] "Goods Received" button on supplier page
    - [ ] Quick product entry with cost
    - [ ] Automatic inventory update
    - [ ] Post to supplier account as credit
    - [ ] Print goods received note
- [ ] Payment terms tracking
    - [ ] Show days until payment due
    - [ ] Color coding (green/yellow/red)
    - [ ] Automatic reminder notifications
    - [ ] Overdue interest calculation option
    - [ ] Van arrival alerts

### Task 8.4: Create Supplier Payment Interface

- [ ] Payment recording
    - [ ] Show all pending invoices
    - [ ] Select invoices to pay
    - [ ] Partial payment support
    - [ ] Payment method selection
    - [ ] Auto-calculate remaining balance
- [ ] Payment workflow
    - [ ] "Supplier arrived" quick button
    - [ ] Show total owed with aging
    - [ ] Record payment amount
    - [ ] Print payment voucher
    - [ ] Update supplier balance
    - [ ] WhatsApp payment confirmation

### Task 8.5: Supplier Reports and Reminders

- [ ] Payment reminders
    - [ ] Dashboard notification system
    - [ ] Today's expected suppliers
    - [ ] Overdue payments alert
    - [ ] Upcoming payments (next 7 days)
    - [ ] Custom reminder settings
- [ ] Supplier analytics
    - [ ] Purchase history by supplier
    - [ ] Payment performance tracking
    - [ ] Most purchased products
    - [ ] Average credit period utilized
    - [ ] Supplier visit patterns

---

## Phase 9: Customer Credit Book (Digital Ledger)

### Task 9.1: Implement Credit Book System

- [ ] Digital credit book interface
    - [ ] Replicate traditional book layout
    - [ ] Customer name at top of page
    - [ ] Date, items, amount columns
    - [ ] Running balance display
    - [ ] Page-like navigation
- [ ] Credit sale entry
    - [ ] Auto-post from POS sales
    - [ ] Manual entry option
    - [ ] Item details or summary
    - [ ] Signature/approval field
    - [ ] SMS/WhatsApp notification option

### Task 9.2: Create Customer Account Pages

- [ ] Individual customer ledger
    - [ ] Photo and contact details header
    - [ ] Credit limit and current balance
    - [ ] Transaction history table
    - [ ] Payment history section
    - [ ] Notes and special terms
- [ ] Visual indicators
    - [ ] Green: Good standing
    - [ ] Yellow: Near credit limit
    - [ ] Red: Overdue/over limit
    - [ ] Days since last payment
    - [ ] Payment frequency score

### Task 9.3: Build Payment Collection

- [ ] Payment entry interface
    - [ ] Quick payment button on customer page
    - [ ] Amount received field
    - [ ] Payment allocation options
    - [ ] Print receipt immediately
    - [ ] SMS/WhatsApp payment confirmation
- [ ] Bulk payment collection
    - [ ] "Collection day" mode
    - [ ] List customers by route/area
    - [ ] Quick payment entry
    - [ ] Running collection total
    - [ ] End-of-day summary

### Task 9.4: Credit Management Features

- [ ] Credit control
    - [ ] Automatic credit limit enforcement
    - [ ] Manager override with reason
    - [ ] Block sale if severely overdue
    - [ ] Grace period settings
    - [ ] Interest on overdue option
- [ ] Customer communication
    - [ ] Monthly statement generation
    - [ ] WhatsApp balance reminders
    - [ ] Bulk WhatsApp for collection day
    - [ ] Customer grouping by area/village
    - [ ] Payment due notifications
    - [ ] Thank you messages
    - [ ] Festival greetings

---

## Phase 10: Financial Dashboard for Shop Owners

### Task 10.1: Create Simple Profit Display

- [ ] Daily profit dashboard
    - [ ] Today's sales total (big number)
    - [ ] Today's cost of goods
    - [ ] Today's gross profit
    - [ ] Profit percentage indicator
    - [ ] Compare to yesterday
- [ ] Visual indicators
    - [ ] Green up arrow for growth
    - [ ] Red down arrow for decline
    - [ ] Profit margin gauge
    - [ ] Best/worst product indicators

### Task 10.2: Build Cash Management

- [ ] Cash tracking interface
    - [ ] Opening cash balance entry
    - [ ] Cash sales tracking
    - [ ] Cash payments tracking
    - [ ] Expected vs actual cash
    - [ ] Closing balance calculator
- [ ] Discrepancy alerts
    - [ ] Cash shortage warning
    - [ ] Excess cash notification
    - [ ] Suggest recount option
    - [ ] Daily cash report
    - [ ] Safe drop tracking

### Task 10.3: Implement Business Health Indicators

- [ ] Simple metrics display
    - [ ] "Money coming in" (sales)
    - [ ] "Money going out" (purchases)
    - [ ] "Money owed to you" (receivables)
    - [ ] "Money you owe" (payables)
    - [ ] "Profit this month" (simple number)
- [ ] Simple visual displays
    - [ ] Sales trend line (last 30 days)
    - [ ] Top 5 selling products list
    - [ ] Customer payment aging bars
    - [ ] Stock value indicator

### Task 10.4: Create Smart Alerts

- [ ] Business alerts
    - [ ] Low cash warning
    - [ ] High receivables alert
    - [ ] Overdue supplier payments
    - [ ] Slow-moving stock alert
    - [ ] Unusual transaction flag
- [ ] Actionable notifications
    - [ ] "Collect payment from X"
    - [ ] "Pay supplier Y today"
    - [ ] "Reorder product Z"
    - [ ] "Check price of item A"
    - [ ] "Count cash now"

---

## Phase 11: Advanced Product Features

### Task 11.1: Implement Measurement System

- [ ] Unit of measure configuration
    - [ ] Standard units (pcs, kg, g, L, m)
    - [ ] Decimal places per unit (0-3)
    - [ ] Custom units addition
    - [ ] Conversion rules setup
    - [ ] Default unit per category
- [ ] Product measurement settings
    - [ ] Primary selling unit
    - [ ] Purchase unit if different
    - [ ] Allow decimals checkbox
    - [ ] Minimum sell quantity
    - [ ] Pack size configuration

### Task 11.2: Create Barcode Generation

- [ ] Barcode generator interface
    - [ ] Auto-generate for new products
    - [ ] Manual code entry option
    - [ ] Multiple barcode formats (EAN13, Code128)
    - [ ] Bulk generation for products
    - [ ] Check digit validation
- [ ] Barcode label designer
    - [ ] Drag-drop label designer
    - [ ] Multiple label templates
    - [ ] Include price, name, code
    - [ ] Size options (small/medium/large)
    - [ ] Sheet layout preview

### Task 11.3: Build Pricing Features

- [ ] Simple pricing system
    - [ ] Cost price tracking
    - [ ] Selling price setting
    - [ ] Profit margin display
    - [ ] Price change history
    - [ ] Quick price update

### Task 11.4: Implement Label Printing

- [ ] Label printer configuration
    - [ ] Printer selection for labels
    - [ ] Paper size settings
    - [ ] Print density adjustment
    - [ ] Test print function
    - [ ] Save printer profiles
- [ ] Batch printing features
    - [ ] Print from product list
    - [ ] Quantity per product
    - [ ] Skip existing labels option
    - [ ] Price update labels only
    - [ ] Print queue management

---

## Phase 12: Multi-Terminal Support (SQLite Network)

### Task 12.1: Design Network Architecture

- [ ] Network discovery system
    - [ ] Detect POS instances on local network
    - [ ] Broadcast terminal availability
    - [ ] Show discovered main computers
    - [ ] Manual IP entry option
    - [ ] Connection test utility
- [ ] File sharing setup
    - [ ] Windows SMB share configuration
    - [ ] Network path validation
    - [ ] Read/write permission check
    - [ ] Connection retry logic
    - [ ] Network speed test

### Task 12.2: Implement SQLite Network Access

- [ ] Main terminal setup
    - [ ] Create shared folder for database
    - [ ] Set Windows permissions
    - [ ] Configure SQLite for network access
    - [ ] Implement write-ahead logging (WAL)
    - [ ] Set busy timeout for locks
- [ ] Client terminal connection
    - [ ] Connect to network database path
    - [ ] Handle connection failures
    - [ ] Implement local caching
    - [ ] Queue offline transactions
    - [ ] Auto-reconnect mechanism

### Task 12.3: Build Offline Mode Support

- [ ] Local cache system
    - [ ] Cache essential data locally
    - [ ] Products, prices, customers
    - [ ] Last known inventory levels
    - [ ] User permissions cache
    - [ ] Settings synchronization
- [ ] Offline transaction queue
    - [ ] Queue sales when disconnected
    - [ ] Store payment information
    - [ ] Track queue status
    - [ ] Auto-sync when online
    - [ ] Conflict resolution

### Task 12.4: Create Sync Management

- [ ] Real-time synchronization
    - [ ] Detect database changes
    - [ ] Push updates to clients
    - [ ] Handle concurrent edits
    - [ ] Inventory lock mechanism
    - [ ] Transaction ordering
- [ ] Sync monitoring
    - [ ] Show sync status per terminal
    - [ ] Display last sync time
    - [ ] Pending items count
    - [ ] Failed sync alerts
    - [ ] Manual sync trigger

### Task 12.5: Multi-Terminal Configuration

- [ ] Terminal management interface
    - [ ] Register new terminals
    - [ ] Name and identify terminals
    - [ ] Set terminal permissions
    - [ ] Enable/disable terminals
    - [ ] Terminal activity log
- [ ] Network diagnostics
    - [ ] Connection status dashboard
    - [ ] Network latency display
    - [ ] Database lock monitoring
    - [ ] Performance metrics
    - [ ] Troubleshooting guide

---

## Phase 13: Backup and Data Management

### Task 13.1: Create Local Backup System

- [ ] Automatic backup scheduler
    - [ ] Daily backup at closing time
    - [ ] Weekly full backup
    - [ ] Keep last 30 days
    - [ ] Backup before updates
    - [ ] Low disk space alerts
- [ ] Backup file management
    - [ ] Compress SQLite database
    - [ ] Include configuration files
    - [ ] Add transaction logs
    - [ ] Timestamp naming convention
    - [ ] Backup size monitoring

### Task 13.2: Build Manual Backup Tools

- [ ] One-click backup
    - [ ] "Backup Now" button
    - [ ] Choose backup location
    - [ ] External drive support
    - [ ] Progress indicator
    - [ ] Verification after backup
- [ ] Backup contents
    - [ ] Complete database
    - [ ] Product images
    - [ ] Report templates
    - [ ] User settings
    - [ ] License information

### Task 13.3: Implement Restore Functionality

- [ ] Restore interface
    - [ ] Browse backup files
    - [ ] Show backup details
    - [ ] Selective restore options
    - [ ] Point-in-time recovery
    - [ ] Restore confirmation
- [ ] Restore process
    - [ ] Close all connections
    - [ ] Backup current data first
    - [ ] Restore selected backup
    - [ ] Verify data integrity
    - [ ] Restart application

### Task 13.4: Cloud Backup (Premium Feature)

- [ ] Cloud service integration
    - [ ] Google Drive support
    - [ ] OneDrive support
    - [ ] Dropbox integration
    - [ ] FTP server option
    - [ ] Custom cloud storage
- [ ] Cloud backup features
    - [ ] Encrypted upload
    - [ ] Scheduled sync
    - [ ] Bandwidth limiting
    - [ ] Version control
    - [ ] Download/restore from cloud

### Task 13.5: Data Export Tools

- [ ] Export formats
    - [ ] Excel export for all data
    - [ ] CSV for simple lists
    - [ ] PDF for reports
    - [ ] JSON for developers
    - [ ] Accounting software formats
- [ ] Export options
    - [ ] Date range selection
    - [ ] Specific data types
    - [ ] Custom field selection
    - [ ] Scheduled exports
    - [ ] Email export files

---

## Phase 14: System Performance & Polish

### Task 14.1: Optimize for Speed

- [ ] Database optimization
    - [ ] Create proper indexes
    - [ ] Optimize common queries
    - [ ] Vacuum database regularly
    - [ ] Cache frequent lookups
    - [ ] Minimize network calls
    - [ ] Memory-first operations
- [ ] UI performance
    - [ ] Lazy load components
    - [ ] Virtual scrolling for lists
    - [ ] Debounce search inputs
    - [ ] Minimize re-renders
    - [ ] Preload common screens
    - [ ] Reduce disk writes

### Task 14.2: Keyboard Speed Features

- [ ] Global shortcuts
    - [ ] F12: Instant cash sale
    - [ ] F11: Price check mode
    - [ ] F10: Today's sales total
    - [ ] F9: Open cash drawer
    - [ ] NumPad Enter: Add to cart
- [ ] Speed optimizations
    - [ ] Auto-focus on barcode field
    - [ ] Skip unnecessary dialogs
    - [ ] Quick number entry
    - [ ] Instant calculations
    - [ ] Minimal clicks required

### Task 14.3: Error Prevention

- [ ] Data validation
    - [ ] Prevent negative inventory
    - [ ] Block invalid prices
    - [ ] Validate phone numbers
    - [ ] Check credit limits
    - [ ] Verify calculations
- [ ] User guidance
    - [ ] Helpful error messages
    - [ ] Suggested corrections
    - [ ] Undo functionality
    - [ ] Confirmation for deletions
    - [ ] Activity logs

### Task 14.4: Polish User Experience

- [ ] Visual feedback
    - [ ] Button press effects
    - [ ] Loading animations
    - [ ] Success notifications
    - [ ] Smooth transitions
    - [ ] Sound effects option
- [ ] Help system
    - [ ] F1 context help
    - [ ] Tooltips on hover
    - [ ] Video tutorials
    - [ ] User manual PDF
    - [ ] WhatsApp support

---

## Phase 15: Testing & Deployment

### Task 15.1: Create Test Environment

- [ ] Test data generator
    - [ ] Generate Sri Lankan names
    - [ ] Local phone numbers
    - [ ] Realistic transactions
    - [ ] Various payment types
    - [ ] Credit scenarios
- [ ] Test scenarios
    - [ ] Single terminal tests
    - [ ] Multi-terminal sync
    - [ ] Offline mode tests
    - [ ] Printer tests
    - [ ] Performance tests

### Task 15.2: Build Installer

- [ ] Windows installer
    - [ ] Include all dependencies
    - [ ] Python runtime bundled
    - [ ] Printer drivers included
    - [ ] Network setup wizard
    - [ ] Desktop shortcuts
- [ ] Installation options
    - [ ] Main or Client mode
    - [ ] Language selection
    - [ ] Printer configuration
    - [ ] Sample data option
    - [ ] Auto-start setup

### Task 15.3: Create Documentation

- [ ] User documentation
    - [ ] Installation guide (Sinhala/Tamil/English)
    - [ ] Network setup instructions
    - [ ] Daily operations manual
    - [ ] Troubleshooting guide
    - [ ] Video tutorials
- [ ] Technical documentation
    - [ ] API documentation
    - [ ] Database schema
    - [ ] Backup procedures
    - [ ] Update process
    - [ ] Support contacts

---

## Phase 16: WhatsApp Integration

### Task 16.1: WhatsApp Business API Setup

- [ ] Configure WhatsApp Business API
    - [ ] Set up business account
    - [ ] Configure message templates
    - [ ] Test API connection
    - [ ] Handle rate limits
    - [ ] Fallback to manual sharing

### Task 16.2: Receipt Sharing via WhatsApp

- [ ] Receipt formatting for WhatsApp
    - [ ] Text-only receipt format
    - [ ] Shop name and contact header
    - [ ] Item list with amounts
    - [ ] Total and payment method
    - [ ] "Powered by Ceybyte" footer
- [ ] Sharing options
    - [ ] One-click share button
    - [ ] Customer phone number selection
    - [ ] Copy to clipboard option
    - [ ] Share receipt image (optional)

### Task 16.3: Daily Reports to Owner

- [ ] Automatic daily summary
    - [ ] Today's total sales
    - [ ] Cash in hand
    - [ ] Credit sales amount
    - [ ] Top selling items
    - [ ] Send at closing time
- [ ] On-demand reports
    - [ ] Current cash balance
    - [ ] Who owes money
    - [ ] Today's profit
    - [ ] Low stock alerts

### Task 16.4: Customer Communications

- [ ] Balance reminders
    - [ ] Automatic monthly reminders
    - [ ] Payment received confirmations
    - [ ] Collection day notifications
    - [ ] Festival greetings
- [ ] Bulk messaging
    - [ ] Filter by area/village
    - [ ] Filter by balance due
    - [ ] New arrival announcements
    - [ ] Special offers

### Task 16.5: Backup via WhatsApp

- [ ] One-click backup sharing
    - [ ] Compress database file
    - [ ] Send to owner's WhatsApp
    - [ ] Include restore instructions
    - [ ] Automatic weekly backups
    - [ ] Cloud storage alternative

---

## Phase 17: Helper/Family Mode

### Task 17.1: Create Simplified Interface

- [ ] Helper mode UI
    - [ ] Big buttons only
    - [ ] Only sales screen access
    - [ ] No reports or settings
    - [ ] No price changes allowed
    - [ ] Cannot delete transactions
- [ ] Visual differences
    - [ ] Different color theme
    - [ ] "HELPER MODE" banner
    - [ ] Simplified navigation
    - [ ] Auto-logout after shift

### Task 17.2: Helper Permissions

- [ ] Limited access controls
    - [ ] Can only make sales
    - [ ] Cannot give discounts
    - [ ] Cannot access cash drawer manually
    - [ ] Cannot view reports
    - [ ] Cannot change customer balances
- [ ] Activity tracking
    - [ ] Log all helper transactions
    - [ ] Show helper name on receipts
    - [ ] Daily helper summary
    - [ ] Cash responsibility tracking

### Task 17.3: Quick Switch System

- [ ] Fast user switching
    - [ ] PIN-based quick switch
    - [ ] No full logout needed
    - [ ] Preserve current sale
    - [ ] Visual user indicator
    - [ ] Auto-switch to owner after timeout

---

## Phase 18: Power Cut Management

### Task 18.1: Auto-Save System

- [ ] Continuous data protection
    - [ ] Save after every item added
    - [ ] Transaction journaling
    - [ ] Memory-first operation
    - [ ] Background disk writes
    - [ ] Corruption prevention

### Task 18.2: UPS Integration

- [ ] Power monitoring
    - [ ] UPS battery indicator
    - [ ] Low battery warnings
    - [ ] Estimated runtime display
    - [ ] Auto-shutdown timer
    - [ ] Safe mode activation

### Task 18.3: Recovery System

- [ ] Power restoration handling
    - [ ] Detect incomplete transactions
    - [ ] Recover last sale state
    - [ ] Verify cash drawer status
    - [ ] Print pending receipts
    - [ ] Sync check with main terminal

---

## Phase 19: Sri Lankan Business Features

### Task 19.1: Festival Calendar Integration

- [ ] Local holiday tracking
    - [ ] Poya days calendar
    - [ ] Public holidays
    - [ ] Festival dates
    - [ ] Stock-up reminders
    - [ ] Special day reports

### Task 19.2: Area-Based Customer Groups

- [ ] Village/area classification
    - [ ] Group customers by location
    - [ ] Collection route planning
    - [ ] Area-wise outstanding reports
    - [ ] Targeted communications
    - [ ] Delivery zone mapping

### Task 19.3: Supplier Schedule Management

- [ ] Van visit tracking
    - [ ] Supplier visit calendar
    - [ ] Day-wise supplier list
    - [ ] Payment due reminders
    - [ ] Order preparation alerts
    - [ ] Visit history tracking

### Task 19.4: Three-Wheeler Delivery

- [ ] Simple delivery tracking
    - [ ] Driver name/phone
    - [ ] Delivery charges
    - [ ] Customer signature
    - [ ] Return handling
    - [ ] Daily delivery summary

---

## Testing Checklist

### Core Functionality Tests

- [ ] Can complete a sale in under 10 seconds (scan → F12)
- [ ] Walk-in customer mode works by default
- [ ] Customer credit sales update balance correctly
- [ ] Supplier credit tracking works properly
- [ ] Decimal quantities work for liquids/weight items
- [ ] Price negotiation works when enabled

### Sri Lankan Business Features

- [ ] Credit book shows running balance
- [ ] Supplier payment reminders appear on time
- [ ] WhatsApp receipts send correctly
- [ ] Festival calendar shows Poya days
- [ ] Area-wise customer grouping works
- [ ] Helper mode restricts access properly

### Multi-Terminal Tests

- [ ] Client terminals connect to main PC
- [ ] Sales sync across all terminals
- [ ] Offline mode queues transactions
- [ ] Network interruptions handled gracefully
- [ ] Inventory updates reflect everywhere

### Language and Localization

- [ ] All three languages display correctly
- [ ] Receipts print in selected language
- [ ] Currency shows as Rs. X,XXX.XX
- [ ] Dates show as DD/MM/YYYY
- [ ] Tamil RTL layout works properly

### Performance Requirements

- [ ] Application starts in under 5 seconds
- [ ] Product search returns instantly
- [ ] Reports generate in under 10 seconds
- [ ] Can handle 10,000+ products
- [ ] 100+ transactions per day without slowing

### Hardware Compatibility

- [ ] Works with common 80mm thermal printers
- [ ] Barcode scanners work plug-and-play
- [ ] Cash drawer opens on sale
- [ ] Runs on 4GB RAM systems
- [ ] Network share works on Windows 10+
- [ ] UPS status shows correctly

### Business Operations

- [ ] Daily profit calculation is accurate
- [ ] Cash balance tracking works
- [ ] Credit limits enforce properly
- [ ] Inventory updates correctly
- [ ] All reports show accurate data
- [ ] WhatsApp integration functions properly