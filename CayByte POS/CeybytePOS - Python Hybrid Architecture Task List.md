
## Architecture Overview

- **POS Terminal**: PyQt6 (Hardware integration, keyboard control, performance)
- **Admin & Management**: Flet (Beautiful UI, reports, settings)
- **Database**: SQLite (Shared between both applications)
- **Offline First**: Both apps work offline, online features optional
- **Licensing**: Check once on first run, work offline forever

---

## Phase 1: Project Foundation

### Task 1.1: Initialize Hybrid Project Structure

- [ ] Create main project directory with two sub-applications
    - [ ] `/pos-terminal` - PyQt6 application for sales
    - [ ] `/admin-panel` - Flet application for management
    - [ ] `/shared` - Common database models and utilities
    - [ ] `/hardware` - Printer, scanner, drawer drivers
    - [ ] `/assets` - Images, icons, fonts
- [ ] Configure Python virtual environment
    - [ ] Install PyQt6 for terminal app
    - [ ] Install Flet for admin app
    - [ ] Install SQLAlchemy for database
    - [ ] Install python-escpos for printing
    - [ ] Install pyserial for hardware communication

### Task 1.2: Design Shared Database Schema

- [ ] Create SQLAlchemy models in shared folder
    - [ ] Products with multi-language support (name_en, name_si, name_ta)
    - [ ] Categories with hierarchical structure
    - [ ] Customers with credit limits and area grouping
    - [ ] Suppliers with payment terms and schedules
    - [ ] Sales and sale_items for transactions
    - [ ] Users with PIN for POS, password for admin
    - [ ] Settings for both applications
- [ ] Database utilities
    - [ ] Connection manager for both apps
    - [ ] Migration system
    - [ ] Backup/restore functions
    - [ ] Network path support for multi-terminal

### Task 1.3: Create Licensing System

- [ ] License checker module
    - [ ] Hardware fingerprint generator (CPU + Motherboard + Disk)
    - [ ] Online activation endpoint (FastAPI)
    - [ ] Local license file encryption
    - [ ] Offline validation logic
    - [ ] Grace period for hardware changes
- [ ] First-run activation flow
    - [ ] Check for existing license
    - [ ] Show activation screen if not found
    - [ ] One-time internet connection for activation
    - [ ] Save encrypted license locally
    - [ ] Work offline after activation

### Task 1.4: Setup Inter-Process Communication

- [ ] Create communication layer between PyQt and Flet
    - [ ] Shared SQLite database approach
    - [ ] File-based message queue for real-time updates
    - [ ] Signal system for important events
    - [ ] Lock mechanism for concurrent access
    - [ ] Status monitoring for both apps

### Task 1.5: Configure Build System

- [ ] PyInstaller configuration for PyQt app
    - [ ] Bundle Python runtime
    - [ ] Include hardware drivers
    - [ ] Create single executable
    - [ ] Windows code signing setup
- [ ] Flet packaging configuration
    - [ ] Standalone executable
    - [ ] Include all assets
    - [ ] Auto-start option
    - [ ] Installer creation

---

## Phase 2: PyQt POS Terminal Core

### Task 2.1: Create PyQt Main Window

- [ ] Main window structure
    - [ ] Full-screen option for dedicated terminals
    - [ ] Three-panel layout (Products | Cart | Payment)
    - [ ] Status bar with user, time, connection status
    - [ ] Minimal UI for maximum speed
    - [ ] Dark/Light theme support
- [ ] Apply modern styling with QSS
    - [ ] Flat design with Material colors
    - [ ] Large touch-friendly buttons (48px minimum)
    - [ ] High contrast for shop environments
    - [ ] Custom fonts for readability
    - [ ] Smooth animations where needed

### Task 2.2: Implement PIN Login System

- [ ] Fast PIN entry screen
    - [ ] Numeric keypad widget
    - [ ] 4-6 digit PIN support
    - [ ] Visual PIN dots feedback
    - [ ] Wrong PIN shake animation
    - [ ] Auto-focus on startup
- [ ] User session management
    - [ ] Store user in memory after login
    - [ ] No repeated auth checks
    - [ ] Quick user switching with PIN
    - [ ] Auto-logout timer option
    - [ ] Helper mode restrictions

### Task 2.3: Build Product Selection Panel

- [ ] Product search widget
    - [ ] Search box with auto-focus
    - [ ] Real-time search as you type
    - [ ] Multi-language product search
    - [ ] Barcode scan integration
    - [ ] Recent products section
- [ ] Category filter buttons
    - [ ] Quick category grid
    - [ ] Visual category icons
    - [ ] Nested category support
    - [ ] All products option
    - [ ] Favorites marking

### Task 2.4: Create Shopping Cart Widget

- [ ] Cart item management
    - [ ] Product list with quantity spinbox
    - [ ] Price display with negotiation option
    - [ ] Line item delete button
    - [ ] Running total calculation
    - [ ] Item count indicator
- [ ] Cart operations
    - [ ] Hold sale (Ctrl+H)
    - [ ] Retrieve sale (Ctrl+R)
    - [ ] Clear cart (F5)
    - [ ] Apply discounts
    - [ ] Customer selection for credit

### Task 2.5: Implement Keyboard Shortcuts

- [ ] Global keyboard handling
    - [ ] F12 - Instant cash sale
    - [ ] F2 - Focus product search
    - [ ] F3 - Customer search
    - [ ] F4 - Payment screen
    - [ ] F9 - Open cash drawer
    - [ ] ESC - Cancel operation
- [ ] Numpad optimization
    - [ ] Direct quantity entry
    - [ ] Enter to add to cart
    - [ ] Quick arithmetic
    - [ ] Navigation with arrows
    - [ ] Delete key support

### Task 2.6: Build Payment Processing

- [ ] Payment method selection
    - [ ] Large cash button (default)
    - [ ] Card payment option
    - [ ] Mobile money (eZ Cash, mCash)
    - [ ] Customer credit option
    - [ ] Split payment support
- [ ] Cash handling widget
    - [ ] Amount tendered entry
    - [ ] Quick cash buttons (100, 500, 1000, 5000)
    - [ ] Change calculation display
    - [ ] Drawer open command
    - [ ] Payment confirmation

---

## Phase 3: Hardware Integration (PyQt)

### Task 3.1: Thermal Printer Integration

- [ ] Printer communication layer
    - [ ] ESC/POS command builder
    - [ ] Direct USB printing (no Windows dialog)
    - [ ] Network printer support
    - [ ] Serial port printing
    - [ ] Status monitoring
- [ ] Receipt formatting
    - [ ] Header with shop details
    - [ ] Multi-language text support
    - [ ] Item list with prices
    - [ ] Totals and payment method
    - [ ] Footer with Ceybyte branding
    - [ ] QR code for WhatsApp

### Task 3.2: Barcode Scanner Support

- [ ] Scanner input handling
    - [ ] USB HID scanner support
    - [ ] Serial scanner integration
    - [ ] Bluetooth scanner pairing
    - [ ] Manual barcode entry fallback
    - [ ] Beep sound feedback
- [ ] Barcode processing
    - [ ] Product lookup by barcode
    - [ ] Auto-add to cart
    - [ ] Unknown barcode handling
    - [ ] Quantity adjustment
    - [ ] Price check mode

### Task 3.3: Cash Drawer Control

- [ ] Drawer communication
    - [ ] Serial port commands
    - [ ] Printer-triggered opening
    - [ ] Manual open option
    - [ ] Status detection
    - [ ] Security logging
- [ ] Cash management
    - [ ] Opening balance entry
    - [ ] Cash in/out tracking
    - [ ] End of day reconciliation
    - [ ] Shortage/excess alerts
    - [ ] Safe drop records

### Task 3.4: Label Printer Support

- [ ] Label printing module
    - [ ] Zebra printer support
    - [ ] Generic label printers
    - [ ] Custom label sizes
    - [ ] Barcode generation
    - [ ] Batch printing
- [ ] Label designer
    - [ ] Product name and price
    - [ ] Barcode formats (EAN, Code128)
    - [ ] Custom fields
    - [ ] Preview before print
    - [ ] Template saving

---

## Phase 4: Flet Admin Panel

### Task 4.1: Create Beautiful Dashboard

- [ ] Main dashboard layout
    - [ ] Material Design 3 components
    - [ ] Responsive grid layout
    - [ ] Live sales statistics
    - [ ] Beautiful charts and graphs
    - [ ] Quick action cards
- [ ] Dashboard widgets
    - [ ] Today's sales card
    - [ ] Cash position widget
    - [ ] Top products chart
    - [ ] Low stock alerts
    - [ ] Recent transactions list

### Task 4.2: Build Product Management

- [ ] Product list view
    - [ ] Searchable data table
    - [ ] Image thumbnails
    - [ ] Inline editing
    - [ ] Bulk operations
    - [ ] Export to Excel
- [ ] Product form
    - [ ] Multi-language name fields
    - [ ] Image upload with preview
    - [ ] Category selection
    - [ ] Pricing configuration
    - [ ] Stock management
    - [ ] Barcode generation

### Task 4.3: Customer Management Interface

- [ ] Customer database
    - [ ] Advanced search filters
    - [ ] Credit limit management
    - [ ] Payment history view
    - [ ] Area/village grouping
    - [ ] WhatsApp integration
- [ ] Customer ledger
    - [ ] Transaction history
    - [ ] Running balance
    - [ ] Aging analysis
    - [ ] Statement generation
    - [ ] Payment recording

### Task 4.4: Supplier Management

- [ ] Supplier directory
    - [ ] Contact management
    - [ ] Payment terms setup
    - [ ] Visit schedule calendar
    - [ ] Outstanding tracking
    - [ ] Purchase history
- [ ] Purchase entry
    - [ ] Invoice recording
    - [ ] Stock updates
    - [ ] Payment scheduling
    - [ ] GRN generation
    - [ ] Supplier performance

### Task 4.5: Reports and Analytics

- [ ] Sales reports
    - [ ] Daily/monthly summaries
    - [ ] Product performance
    - [ ] Category analysis
    - [ ] Payment method breakdown
    - [ ] Hourly patterns
- [ ] Financial reports
    - [ ] Profit and loss
    - [ ] Cash flow statement
    - [ ] Outstanding reports
    - [ ] Tax summaries
    - [ ] Custom date ranges
- [ ] Visual analytics
    - [ ] Interactive charts
    - [ ] Drill-down capability
    - [ ] Export options
    - [ ] Scheduled reports
    - [ ] WhatsApp delivery

### Task 4.6: Settings and Configuration

- [ ] Business settings
    - [ ] Shop information
    - [ ] Tax configuration
    - [ ] Receipt templates
    - [ ] Multi-language setup
    - [ ] Backup settings
- [ ] User management
    - [ ] User creation/editing
    - [ ] Role assignment
    - [ ] PIN reset for POS
    - [ ] Activity logs
    - [ ] Terminal assignments

---

## Phase 5: Offline Sync System

### Task 5.1: Local Data Caching

- [ ] PyQt local cache
    - [ ] Essential data in memory
    - [ ] Product catalog cache
    - [ ] Customer quick list
    - [ ] Price lists
    - [ ] Settings cache
- [ ] Flet data management
    - [ ] Progressive loading
    - [ ] Background refresh
    - [ ] Optimistic updates
    - [ ] Conflict resolution
    - [ ] Queue management

### Task 5.2: Network Database Setup

- [ ] Multi-terminal architecture
    - [ ] Main terminal selection
    - [ ] Network path configuration
    - [ ] SMB share setup
    - [ ] Permission management
    - [ ] Connection monitoring
- [ ] Client connection
    - [ ] Auto-discovery
    - [ ] Manual IP entry
    - [ ] Connection testing
    - [ ] Fallback options
    - [ ] Sync status

### Task 5.3: Transaction Queue System

- [ ] Offline transaction storage
    - [ ] Local queue database
    - [ ] Transaction ordering
    - [ ] Priority handling
    - [ ] Retry mechanism
    - [ ] Error handling
- [ ] Sync process
    - [ ] Background sync service
    - [ ] Conflict detection
    - [ ] Merge strategies
    - [ ] Progress tracking
    - [ ] Failure recovery

---

## Phase 6: Sri Lankan Specific Features

### Task 6.1: Multi-Language Support

- [ ] Language implementation
    - [ ] English interface
    - [ ] Sinhala translation
    - [ ] Tamil translation
    - [ ] RTL support for Tamil
    - [ ] Font management
- [ ] Language switching
    - [ ] Quick language toggle
    - [ ] Per-user preference
    - [ ] Receipt language
    - [ ] Report language
    - [ ] Mixed language products

### Task 6.2: Festival Calendar Integration

- [ ] Sri Lankan holidays
    - [ ] Poya day calendar
    - [ ] Public holidays
    - [ ] Festival dates
    - [ ] Custom celebrations
    - [ ] Stock reminders
- [ ] Business impact
    - [ ] Sales predictions
    - [ ] Stock suggestions
    - [ ] Special pricing
    - [ ] Supplier schedules
    - [ ] Customer communications

### Task 6.3: Area-Based Features

- [ ] Customer grouping
    - [ ] Village/area setup
    - [ ] Collection routes
    - [ ] Delivery zones
    - [ ] Area representatives
    - [ ] Custom pricing
- [ ] Area analytics
    - [ ] Sales by area
    - [ ] Outstanding by village
    - [ ] Collection efficiency
    - [ ] Popular products
    - [ ] Growth tracking

### Task 6.4: Three-Wheeler Delivery

- [ ] Delivery management
    - [ ] Driver database
    - [ ] Delivery creation
    - [ ] Route planning
    - [ ] Charge calculation
    - [ ] Status tracking
- [ ] Delivery operations
    - [ ] Order assignment
    - [ ] Driver app (future)
    - [ ] Customer notifications
    - [ ] POD collection
    - [ ] Return handling

---

## Phase 7: WhatsApp Integration

### Task 7.1: WhatsApp Configuration

- [ ] API setup
    - [ ] Business account
    - [ ] API credentials
    - [ ] Message templates
    - [ ] Rate limiting
    - [ ] Cost management
- [ ] Fallback options
    - [ ] Copy to clipboard
    - [ ] Share via URL
    - [ ] QR code generation
    - [ ] Manual sending
    - [ ] Bulk export

### Task 7.2: Receipt Sharing

- [ ] Receipt formatting
    - [ ] Text-only format
    - [ ] Proper alignment
    - [ ] Multi-language support
    - [ ] Total highlighting
    - [ ] Shop branding
- [ ] Sharing options
    - [ ] One-click send
    - [ ] Customer selection
    - [ ] Multiple recipients
    - [ ] Delivery status
    - [ ] Resend option

### Task 7.3: Customer Communications

- [ ] Automated messages
    - [ ] Payment reminders
    - [ ] Thank you notes
    - [ ] Balance updates
    - [ ] Collection day alerts
    - [ ] Festival greetings
- [ ] Bulk messaging
    - [ ] Area filtering
    - [ ] Balance criteria
    - [ ] Custom messages
    - [ ] Scheduling
    - [ ] Opt-out management

### Task 7.4: Business Reports

- [ ] Owner reports
    - [ ] Daily summary
    - [ ] Cash position
    - [ ] Outstanding alerts
    - [ ] Low stock warnings
    - [ ] Performance metrics
- [ ] Report delivery
    - [ ] Scheduled sending
    - [ ] On-demand reports
    - [ ] Multiple formats
    - [ ] Secure delivery
    - [ ] Read receipts

---

## Phase 8: Helper/Family Mode

### Task 8.1: Simplified POS Interface (PyQt)

- [ ] Helper mode UI
    - [ ] Minimal interface
    - [ ] Large buttons only
    - [ ] No price changes
    - [ ] No deletions
    - [ ] Basic operations only
- [ ] Visual differences
    - [ ] Different color scheme
    - [ ] "HELPER MODE" banner
    - [ ] Simplified layout
    - [ ] Hidden features
    - [ ] Limited menus

### Task 8.2: Permission System

- [ ] Helper restrictions
    - [ ] Sales only
    - [ ] No reports access
    - [ ] No cash drawer manual open
    - [ ] No customer credit
    - [ ] No discounts
- [ ] Activity tracking
    - [ ] Helper identification
    - [ ] Transaction logging
    - [ ] Time tracking
    - [ ] Error prevention
    - [ ] Audit trail

### Task 8.3: Quick User Switching

- [ ] PIN-based switching
    - [ ] Fast PIN entry
    - [ ] Visual user indicator
    - [ ] Preserve current sale
    - [ ] Permission update
    - [ ] Activity handover
- [ ] Auto-switching
    - [ ] Timeout to owner
    - [ ] Shift management
    - [ ] Break handling
    - [ ] Emergency override
    - [ ] Security logging

---

## Phase 9: Performance Optimization

### Task 9.1: PyQt Speed Optimization

- [ ] Startup optimization
    - [ ] Lazy loading
    - [ ] Minimal initial UI
    - [ ] Background data load
    - [ ] Quick PIN screen
    - [ ] Instant readiness
- [ ] Runtime performance
    - [ ] Memory management
    - [ ] Query optimization
    - [ ] Cache strategies
    - [ ] Thread pooling
    - [ ] Event optimization

### Task 9.2: Flet Performance Tuning

- [ ] Loading strategies
    - [ ] Progressive display
    - [ ] Virtual scrolling
    - [ ] Pagination
    - [ ] Lazy components
    - [ ] Image optimization
- [ ] Data handling
    - [ ] Client-side filtering
    - [ ] Smart caching
    - [ ] Batch operations
    - [ ] Background refresh
    - [ ] Efficient updates

### Task 9.3: Database Optimization

- [ ] Query performance
    - [ ] Index creation
    - [ ] Query plans
    - [ ] Denormalization
    - [ ] View creation
    - [ ] Stored procedures
- [ ] Maintenance
    - [ ] Auto-vacuum
    - [ ] Statistics update
    - [ ] Backup optimization
    - [ ] Archive old data
    - [ ] Performance monitoring

---

## Phase 10: Deployment and Distribution

### Task 10.1: Build System Setup

- [ ] PyQt packaging
    - [ ] PyInstaller config
    - [ ] Resource bundling
    - [ ] Icon creation
    - [ ] Version management
    - [ ] Code signing
- [ ] Flet packaging
    - [ ] Executable creation
    - [ ] Asset inclusion
    - [ ] Dependencies
    - [ ] Auto-updater
    - [ ] Error reporting

### Task 10.2: Installer Creation

- [ ] Windows installer
    - [ ] NSIS or WiX setup
    - [ ] Component selection
    - [ ] Prerequisites check
    - [ ] Registry entries
    - [ ] Shortcuts creation
- [ ] Installation options
    - [ ] Server vs Client
    - [ ] Language selection
    - [ ] Sample data
    - [ ] Hardware detection
    - [ ] Network setup

### Task 10.3: Auto-Update System

- [ ] Update mechanism
    - [ ] Version checking
    - [ ] Download manager
    - [ ] Differential updates
    - [ ] Rollback support
    - [ ] Update scheduling
- [ ] Update process
    - [ ] Notification system
    - [ ] Background download
    - [ ] Safe installation
    - [ ] Migration scripts
    - [ ] Testing mode

### Task 10.4: Documentation

- [ ] User manuals
    - [ ] Installation guide
    - [ ] Quick start guide
    - [ ] Feature documentation
    - [ ] Troubleshooting
    - [ ] Video tutorials
- [ ] Technical docs
    - [ ] Architecture overview
    - [ ] API documentation
    - [ ] Database schema
    - [ ] Deployment guide
    - [ ] Support procedures

---

## Testing Strategy

### Core Functionality Tests

- [ ] Complete sale in under 10 seconds
- [ ] PIN login works instantly
- [ ] Hardware integration functions
- [ ] Offline mode works properly
- [ ] Multi-language displays correctly

### Integration Tests

- [ ] PyQt and Flet data sharing
- [ ] Network terminal sync
- [ ] Printer communication
- [ ] WhatsApp messaging
- [ ] Backup and restore

### Performance Tests

- [ ] 10,000+ products handling
- [ ] 100+ daily transactions
- [ ] Report generation speed
- [ ] Memory usage limits
- [ ] Network efficiency

### User Acceptance Tests

- [ ] Shop owner workflows
- [ ] Cashier operations
- [ ] Helper mode restrictions
- [ ] Report accuracy
- [ ] Real-world scenarios