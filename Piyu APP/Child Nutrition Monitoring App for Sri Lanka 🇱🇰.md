
A digital health solution to address child malnutrition in rural Sri Lanka by empowering parents to monitor their children's nutritional status independently, bridging the gap created by limited midwifery access.

## Table of Contents

- [Project Overview](https://claude.ai/chat/3b558e21-46be-4ccc-9881-e3f28ace0727#project-overview)
- [Problem Statement](https://claude.ai/chat/3b558e21-46be-4ccc-9881-e3f28ace0727#problem-statement)
- [Solution](https://claude.ai/chat/3b558e21-46be-4ccc-9881-e3f28ace0727#solution)
- [Requirements](https://claude.ai/chat/3b558e21-46be-4ccc-9881-e3f28ace0727#requirements)
    - [Functional Requirements](https://claude.ai/chat/3b558e21-46be-4ccc-9881-e3f28ace0727#functional-requirements)
    - [Non-Functional Requirements](https://claude.ai/chat/3b558e21-46be-4ccc-9881-e3f28ace0727#non-functional-requirements)
- [Tech Stack](https://claude.ai/chat/3b558e21-46be-4ccc-9881-e3f28ace0727#tech-stack)
- [System Architecture](https://claude.ai/chat/3b558e21-46be-4ccc-9881-e3f28ace0727#system-architecture)
- [Project Milestones](https://claude.ai/chat/3b558e21-46be-4ccc-9881-e3f28ace0727#project-milestones)
- [Development Setup](https://claude.ai/chat/3b558e21-46be-4ccc-9881-e3f28ace0727#development-setup)
- [API Documentation](https://claude.ai/chat/3b558e21-46be-4ccc-9881-e3f28ace0727#api-documentation)
- [Database Schema](https://claude.ai/chat/3b558e21-46be-4ccc-9881-e3f28ace0727#database-schema)
- [Deployment](https://claude.ai/chat/3b558e21-46be-4ccc-9881-e3f28ace0727#deployment)
- [Testing Strategy](https://claude.ai/chat/3b558e21-46be-4ccc-9881-e3f28ace0727#testing-strategy)
- [Contributing](https://claude.ai/chat/3b558e21-46be-4ccc-9881-e3f28ace0727#contributing)
- [License](https://claude.ai/chat/3b558e21-46be-4ccc-9881-e3f28ace0727#license)

## Project Overview

**Project Name**: Child Nutrition Monitoring App  
**Target Region**: Dambulla, Sri Lanka (pilot region)  
**Target Users**: Parents of children aged 6-59 months in rural areas  
**Primary Language**: Sinhala  
**Duration**: September 2024 - September 2025

### Key Statistics

- Target Age Group: 6-59 months
- Pre-launch Phase: 0-6 months (180-day countdown)
- Monitoring Frequency: Monthly (Year 1), Quarterly (Year 2+)
- Expected Users: 60+ families (pilot phase)

## Problem Statement

Child malnutrition remains a critical public health issue in rural Sri Lanka, particularly in agricultural regions like Dambulla. Key challenges include:

1. **Limited Midwifery Access**: Dispersed rural settlements make regular midwife visits challenging
2. **Service Delivery Gaps**: Inconsistent nutritional monitoring and guidance
3. **Knowledge Barriers**: Parents lack tools and knowledge for independent monitoring
4. **Geographic Isolation**: Remote farming communities have poor healthcare access
5. **Seasonal Challenges**: Agricultural work patterns affect healthcare accessibility

## Solution

A mobile-first digital health application that:

- Enables continuous nutritional monitoring between midwife visits
- Provides WHO-standard growth tracking and analysis
- Delivers personalized nutritional guidance in local languages
- Works offline in areas with limited connectivity
- Empowers parents with knowledge and tools for child health management

## Requirements

### Functional Requirements

#### 1. User Management

- **Multi-language Support**
    
    - Primary: Sinhala (සිංහල)
    - Secondary: Tamil (தமிழ்), English
    - Language selection on first launch
    - RTL support for Tamil
- **Authentication**
    
    - Phone number-based registration
    - OTP verification
    - Secure password management
    - Remember me functionality
    - Password recovery via SMS

#### 2. Child Profile Management

- **Registration**
    
    - Child name (optional)
    - Birth date (required)
    - Gender selection
    - Birth weight/height (optional)
    - Photo upload capability
    - Multiple child profiles per parent
- **Profile Features**
    
    - Gender-based default avatars
    - Age calculation (months/years)
    - Profile editing
    - Archive/delete functionality

#### 3. Growth Monitoring

##### Pre-6 Months (0-180 days)

- **Interactive Countdown Visualization**
    - Circular progress indicator (180-day countdown)
    - Daily progress updates
    - Gradient animation (color changes with progress)
    - Development milestone display
    - Daily nutrition tips
    - "Skip to Dashboard" option

##### Post-6 Months (6-59 months)

- **Measurement Tracking**
    
    - Weight entry (kg) with decimal support
    - Height entry (cm) with decimal support
    - Mid-Upper Arm Circumference (optional)
    - Date/time stamping
    - Photo attachment option
    - Notes field for observations
- **Growth Analysis**
    
    - Automatic BMI calculation
    - WHO standard comparisons
    - Percentile calculations
    - Z-score analysis
    - Risk assessment for:
        - Stunting (low height-for-age)
        - Wasting (low weight-for-height)
        - Underweight (low weight-for-age)
    - Trend analysis over time

#### 4. Visualization & Charts

- **Growth Charts**
    
    - Weight-for-age
    - Height-for-age
    - BMI-for-age
    - Weight-for-height
    - WHO percentile lines (3rd, 15th, 50th, 85th, 97th)
    - Child's measurement plots
    - Time range filters (3/6/12 months, All)
    - Export/share functionality
- **Dashboard Visualizations**
    
    - Color-coded nutritional status
        - Green: Normal
        - Yellow: At risk
        - Red: Malnourished
    - Quick stats display
    - Recent measurements summary
    - Upcoming tasks/reminders

#### 5. Nutritional Guidance

- **Personalized Recommendations**
    
    - Age-appropriate feeding guidelines
    - Local food suggestions
    - Portion size guidance
    - Meal frequency recommendations
    - Nutritional content information
- **Alert System**
    
    - Malnutrition risk warnings
    - Missed measurement reminders
    - Vaccination due dates
    - Growth milestone notifications

#### 6. Vaccination & Healthcare

- **Vaccination Tracking**
    
    - Sri Lankan immunization schedule
    - Due date calculations
    - Completion tracking
    - Reminder notifications
    - Side effects notes
- **Medication Management**
    
    - Supplement tracking
    - Medication schedules
    - Dosage information
    - Reminder system

#### 7. Educational Resources

- **Content Categories**
    
    - Healthy foods guide
    - Meal planning
    - Development milestones
    - Common health issues
    - First aid basics
- **Content Features**
    
    - Age-filtered content
    - Illustrated guides
    - Video tutorials (when online)
    - Downloadable PDFs
    - Bookmark functionality

#### 8. Data Management

- **Offline Capability**
    
    - Local data storage
    - Automatic sync when online
    - Conflict resolution
    - Data integrity checks
- **Export/Sharing**
    
    - PDF report generation
    - Growth chart exports
    - WhatsApp sharing
    - Email reports
    - Print-friendly formats

### Non-Functional Requirements

#### 1. Performance

- App launch: < 3 seconds
- Screen transitions: < 500ms
- Offline mode: Full functionality
- Battery optimization
- Memory efficiency (< 100MB)

#### 2. Usability

- Simple, intuitive interface
- Large touch targets (44px minimum)
- Clear visual hierarchy
- Consistent navigation
- Minimal text input
- Voice input support (future)

#### 3. Accessibility

- High contrast mode
- Scalable fonts
- Screen reader compatibility
- Color blind friendly palettes
- Audio instructions (future)

#### 4. Security

- Encrypted local storage
- Secure API communication
- Data privacy compliance
- Regular security audits
- GDPR compliance

#### 5. Compatibility

- Android 5.0+ (API 21+)
- iOS 11.0+
- Tablet support
- Various screen sizes
- Low-end device optimization

## Tech Stack

### Frontend (Mobile App)

```javascript
{
  "framework": "React Native 0.72+",
  "development": "Expo SDK 49+",
  "state_management": "Redux Toolkit",
  "navigation": "React Navigation 6",
  "ui_components": "React Native Elements + Custom",
  "forms": "React Hook Form",
  "charts": "react-native-chart-kit / Victory Native",
  "storage": "AsyncStorage + SQLite",
  "styling": "StyleSheet + Styled Components"
}
```

### Backend

```javascript
{
  "platform": "Firebase",
  "auth": "Firebase Authentication",
  "database": "Cloud Firestore",
  "storage": "Firebase Storage",
  "functions": "Cloud Functions (Node.js)",
  "hosting": "Firebase Hosting (Admin Panel)",
  "analytics": "Firebase Analytics",
  "messaging": "Firebase Cloud Messaging"
}
```

### Development Tools

```javascript
{
  "ide": "Visual Studio Code",
  "version_control": "Git + GitHub",
  "package_manager": "npm/yarn",
  "testing": "Jest + React Native Testing Library",
  "debugging": "React Native Debugger + Flipper",
  "ci_cd": "GitHub Actions + Expo EAS",
  "code_quality": "ESLint + Prettier"
}
```

### Third-Party Services

- **SMS Gateway**: Twilio (OTP verification)
- **Translation**: Google Translate API (content localization)
- **Maps**: Google Maps (future - clinic locations)
- **Crash Reporting**: Sentry
- **Analytics**: Mixpanel (user behavior)

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Mobile App                           │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────────┐  │
│  │   UI Layer  │  │ Business     │  │   Data Layer    │  │
│  │  (Screens)  │  │   Logic      │  │ (Local Storage) │  │
│  └─────────────┘  └──────────────┘  └─────────────────┘  │
└─────────────────────────────┬───────────────────────────────┘
                              │
                              │ HTTPS
                              │
┌─────────────────────────────┴───────────────────────────────┐
│                      Firebase Backend                        │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────────┐  │
│  │    Auth      │  │  Firestore   │  │ Cloud Functions │  │
│  └──────────────┘  └──────────────┘  └─────────────────┘  │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────────┐  │
│  │   Storage    │  │   Hosting    │  │    Analytics    │  │
│  └──────────────┘  └──────────────┘  └─────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

## Project Milestones

### Phase 1: Foundation (Sept 2024 - Dec 2024) ✓

- [x] Problem identification and research
- [x] Requirements gathering
- [x] Feasibility study
- [x] Literature review
- [x] Proposal finalization
- [ ] Initial data collection

### Phase 2: Design & Development (Dec 2024 - March 2025)

- [ ] **Milestone 1: Core Setup (Dec 2024)**
    
    - Development environment setup
    - Project initialization
    - Basic navigation structure
    - Multi-language support implementation
- [ ] **Milestone 2: Authentication (Jan 2025)**
    
    - Phone number registration
    - OTP implementation
    - User profile management
    - Secure storage setup
- [ ] **Milestone 3: Child Management (Jan 2025)**
    
    - Child registration flow
    - Profile management
    - Photo upload
    - Multiple child support
- [ ] **Milestone 4: Growth Tracking (Feb 2025)**
    
    - Measurement entry screens
    - Data validation
    - Local storage implementation
    - Basic calculations (BMI)
- [ ] **Milestone 5: Visualizations (Feb 2025)**
    
    - 180-day countdown animation
    - Growth charts implementation
    - Dashboard design
    - Status indicators
- [ ] **Milestone 6: Analysis Engine (March 2025)**
    
    - WHO standards integration
    - Percentile calculations
    - Risk assessment algorithms
    - Recommendation engine

### Phase 3: Advanced Features (April 2025 - June 2025)

- [ ] **Milestone 7: Healthcare Features (April 2025)**
    
    - Vaccination tracking
    - Medication management
    - Reminder system
    - Calendar integration
- [ ] **Milestone 8: Educational Content (May 2025)**
    
    - Content management system
    - Article viewer
    - Media handling
    - Offline content storage
- [ ] **Milestone 9: Backend Integration (May 2025)**
    
    - Firebase setup
    - API development
    - Sync mechanism
    - Conflict resolution
- [ ] **Milestone 10: Offline Capabilities (June 2025)**
    
    - SQLite implementation
    - Sync queue management
    - Offline-first architecture
    - Data compression

### Phase 4: Testing & Deployment (July 2025 - Sept 2025)

- [ ] **Milestone 11: Testing (July 2025)**
    
    - Unit testing
    - Integration testing
    - User acceptance testing
    - Performance testing
- [ ] **Milestone 12: Pilot Launch (Aug 2025)**
    
    - Beta deployment
    - User training
    - Feedback collection
    - Bug fixes
- [ ] **Milestone 13: Final Release (Sept 2025)**
    
    - Production deployment
    - Documentation finalization
    - Handover process
    - Project closure

## Development Setup

### Prerequisites

```bash
# Required software
- Node.js 16+ 
- npm or yarn
- Git
- Android Studio (for Android development)
- Xcode (for iOS development - Mac only)
- Expo CLI
```

### Installation Steps

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/child-nutrition-app.git
cd child-nutrition-app

# 2. Install Expo CLI globally
npm install -g expo-cli

# 3. Install dependencies
npm install

# 4. Start the development server
expo start

# 5. Run on Android
# Press 'a' in the terminal or scan QR code with Expo Go app

# 6. Run on iOS (Mac only)
# Press 'i' in the terminal or scan QR code with Expo Go app
```

### Project Structure

```
child-nutrition-app/
├── app/                    # Expo Router app directory
│   ├── (auth)/            # Authentication screens
│   ├── (tabs)/            # Tab navigation screens
│   └── _layout.tsx        # Root layout
├── components/            # Reusable components
│   ├── common/           # Generic components
│   ├── charts/           # Chart components
│   └── forms/            # Form components
├── services/             # API and external services
│   ├── api/             # API calls
│   ├── storage/         # Local storage
│   └── firebase/        # Firebase configuration
├── store/               # Redux store
│   ├── slices/         # Redux slices
│   └── index.ts        # Store configuration
├── utils/              # Utility functions
│   ├── calculations/   # Growth calculations
│   ├── validators/     # Input validation
│   └── constants/      # App constants
├── assets/            # Images, fonts, etc.
├── locales/          # Translation files
│   ├── si.json      # Sinhala
│   ├── ta.json      # Tamil
│   └── en.json      # English
└── __tests__/       # Test files
```

## API Documentation

### Authentication Endpoints

```typescript
// Register new user
POST /api/auth/register
{
  "phoneNumber": "+94771234567",
  "password": "securePassword",
  "name": "Parent Name"
}

// Verify OTP
POST /api/auth/verify-otp
{
  "phoneNumber": "+94771234567",
  "otp": "123456"
}

// Login
POST /api/auth/login
{
  "phoneNumber": "+94771234567",
  "password": "securePassword"
}
```

### Child Management Endpoints

```typescript
// Add child
POST /api/children
{
  "name": "Child Name",
  "birthDate": "2023-01-15",
  "gender": "male",
  "birthWeight": 3.2,
  "birthHeight": 50
}

// Get children
GET /api/children

// Update child
PUT /api/children/:childId

// Delete child
DELETE /api/children/:childId
```

### Measurement Endpoints

```typescript
// Add measurement
POST /api/children/:childId/measurements
{
  "date": "2024-01-15",
  "weight": 10.5,
  "height": 75,
  "muac": 14.5,
  "notes": "Looking healthy"
}

// Get measurements
GET /api/children/:childId/measurements

// Get growth analysis
GET /api/children/:childId/analysis
```

## Database Schema

### Firestore Collections

#### Users Collection

```javascript
users: {
  userId: {
    phoneNumber: string,
    name: string,
    email?: string,
    language: 'si' | 'ta' | 'en',
    createdAt: timestamp,
    updatedAt: timestamp,
    settings: {
      notifications: boolean,
      units: 'metric' | 'imperial',
      reminderTime: string
    }
  }
}
```

#### Children Collection

```javascript
children: {
  childId: {
    userId: string,
    name: string,
    birthDate: timestamp,
    gender: 'male' | 'female',
    birthWeight?: number,
    birthHeight?: number,
    photoUrl?: string,
    isActive: boolean,
    createdAt: timestamp,
    updatedAt: timestamp
  }
}
```

#### Measurements Collection

```javascript
measurements: {
  measurementId: {
    childId: string,
    date: timestamp,
    weight: number,
    height: number,
    muac?: number,
    bmi: number,
    weightForAge: {
      percentile: number,
      zScore: number,
      status: string
    },
    heightForAge: {
      percentile: number,
      zScore: number,
      status: string
    },
    weightForHeight: {
      percentile: number,
      zScore: number,
      status: string
    },
    notes?: string,
    photos?: string[],
    createdAt: timestamp
  }
}
```

#### Vaccinations Collection

```javascript
vaccinations: {
  vaccinationId: {
    childId: string,
    vaccine: string,
    dueDate: timestamp,
    givenDate?: timestamp,
    status: 'pending' | 'completed' | 'overdue',
    notes?: string,
    reminder: boolean,
    createdAt: timestamp
  }
}
```

### Local SQLite Schema

```sql
-- Offline data storage
CREATE TABLE offline_queue (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  action TEXT NOT NULL,
  collection TEXT NOT NULL,
  data TEXT NOT NULL,
  timestamp INTEGER NOT NULL,
  synced INTEGER DEFAULT 0
);

CREATE TABLE cached_data (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  expiry INTEGER,
  timestamp INTEGER NOT NULL
);
```

## Deployment

### Android Deployment

```bash
# 1. Build APK for testing
expo build:android -t apk

# 2. Build AAB for Play Store
expo build:android -t app-bundle

# 3. Upload to Play Store
# Use Google Play Console
```

### iOS Deployment

```bash
# 1. Build for iOS
expo build:ios

# 2. Upload to App Store
# Use Xcode or Transporter app
```

### Environment Variables

```env
# .env.production
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
```

## Testing Strategy

### Unit Testing

- Component testing with React Native Testing Library
- Business logic testing with Jest
- Calculation accuracy tests
- Validation function tests

### Integration Testing

- API endpoint testing
- Database operation testing
- Offline sync testing
- Navigation flow testing

### User Acceptance Testing

- 60 parent participants
- 5-8 midwife participants
- Rural area field testing
- Offline functionality verification
- Multi-language testing

### Performance Testing

- Low-end device testing
- Battery usage monitoring
- Memory leak detection
- Network optimization

## Contributing

### Code Style Guidelines

```javascript
// Use consistent naming conventions
const measurementData = {}; // camelCase for variables
const MeasurementScreen = () => {}; // PascalCase for components

// Use TypeScript for type safety
interface Child {
  id: string;
  name: string;
  birthDate: Date;
}

// Document complex functions
/**
 * Calculates BMI and returns status based on WHO standards
 * @param weight - Weight in kilograms
 * @param height - Height in centimeters
 * @returns BMI value and status
 */
const calculateBMI = (weight: number, height: number) => {
  // Implementation
};
```

### Git Workflow

```bash
# 1. Create feature branch
git checkout -b feature/growth-charts

# 2. Make changes and commit
git add .
git commit -m "feat: implement growth charts visualization"

# 3. Push to remote
git push origin feature/growth-charts

# 4. Create pull request
# Use GitHub/GitLab PR feature

# 5. After review and approval, merge
git checkout main
git merge feature/growth-charts
```

### Commit Message Convention

- feat: New feature
- fix: Bug fix
- docs: Documentation changes
- style: Code style changes
- refactor: Code refactoring
- test: Test additions/changes
- chore: Build process/auxiliary tool changes

## Support & Contact

**Project Lead**: R.M.P.P. Rajakaruna  
**Supervisor**: Ms. Kavishka Rajapaksha  
**Institution**: NSBM Green University Town  
**Email**: [project-email]  
**Documentation**: [Wiki Link]  
**Issue Tracker**: [GitHub Issues]

## License

This project is developed as part of BSc in Management Information Systems (Special) final year research at NSBM Green University Town.

---

**Last Updated**: November 2024  
**Version**: 1.0.0