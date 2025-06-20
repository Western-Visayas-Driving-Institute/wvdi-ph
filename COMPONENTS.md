# Component Documentation

## Overview
This document describes all React components in the WVDI-PH website.

## Main Application Components

### App.jsx
**Primary application component containing the complete website.**

```javascript
function App() {
  const [lightboxImage, setLightboxImage] = useState(null);
  // ... lightbox management
}
```

**Features:**
- Lightbox state management for image galleries
- SEO component integration
- Navigation structure
- All website sections

**Sections Included:**
- Hero section with carousel
- About/Accreditation section  
- Courses section
- Instructor profiles
- Image gallery
- Contact information
- Footer

**Currently Hidden:**
- `<MessengerChat />` - Facebook integration
- `<DriveBotWidget />` - AI chatbot widget

### App.minimal.jsx  
**Simple placeholder component (not in use).**

Minimal version with just basic contact information. Used previously as temporary site while main version was in development.

### main.jsx
**Application entry point.**

```javascript
import App from './App.jsx'  // Full website
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

## UI Components

### Carousel.jsx
**Image carousel for hero section.**
- Displays rotating images of facilities
- Responsive design
- Touch/swipe support for mobile

### Seo.jsx
**SEO meta tag management.**
```javascript
<Seo
  title="Western Visayas Driving Institute - WVDI"
  description="Get professional driving training..."
  image="https://wvdi-ph.com/assets/WVDI-logo.png"
  locale="en"
/>
```

## Course Components

### components/courses/CoursesSection.jsx
**Main course display component.**
- Renders course categories
- Integrates with courses.json data
- Responsive course cards

### components/courses/PackagesSection.jsx  
**Course package information.**
- Detailed package descriptions
- Pricing information
- Feature comparisons

## Instructor Components

### components/instructors/InstructorSection.jsx
**Instructor profiles grid.**
- Loads data from instructors.json
- Responsive grid layout
- Individual instructor cards

### components/instructors/InstructorCard.jsx
**Individual instructor display.**
```javascript
<InstructorCard 
  name="Instructor Name"
  image="/path/to/photo.jpg"
  experience="5 years"
  specialization="Manual Transmission"
/>
```

## Service Components

### components/services/Accordion.jsx
**Collapsible content sections.**
- FAQ-style accordion interface
- Smooth animations
- Mobile-friendly

### components/services/CourseTable.jsx
**Course pricing table.**
- Tabular course information
- Responsive table design
- Price highlighting

### components/services/TabGroup.jsx
**Tabbed interface component.**
- Multiple content tabs
- Active state management
- Clean navigation

### components/services/NestedTabGroup.jsx
**Multi-level tab system.**
- Nested tab functionality
- Complex content organization

### components/services/PriceList.jsx
**Service pricing display.**
- Formatted price listings
- Service descriptions
- Call-to-action buttons

### components/services/SectionHeader.jsx
**Reusable section headers.**
```javascript
<SectionHeader 
  title="Section Title"
  subtitle="Section description"
/>
```

### components/services/Notice.jsx
**Important notices/announcements.**
- Highlighted information boxes
- Warning/info styling

## Contact Components

### ContactForm.jsx
**Contact form component (lazy-loaded).**
```javascript
const ContactForm = React.lazy(() => import('./ContactForm.jsx'));
```

**Features:**
- Form validation
- Multiple contact methods
- Responsive design
- Integration ready for backend

## Chat Components (Currently Hidden)

### MessengerChat.jsx
**Facebook Messenger integration.**
- Facebook Chat Plugin
- Customer support integration
- Currently commented out in App.jsx

### DriveBotWidget.jsx  
**Custom AI chatbot widget.**
- OpenAI integration
- Custom chat interface
- Course information assistance
- Currently commented out due to incomplete functionality

### FrogGame.jsx
**Easter egg component.**
- Hidden interactive game
- Not currently used in production

## Data Integration

### src/data/courses.json
**Course information structure:**
```json
{
  "id": "course-id",
  "group": "theoretical|practical|driving-lessons|other", 
  "title": "Course Name",
  "hours": 15,
  "price": 1000,
  "note": "Additional information"
}
```

### src/data/instructors.json
**Instructor profile structure:**
```json
{
  "id": "instructor-id",
  "name": "Full Name",
  "image": "/assets/instructors/photo.jpg",
  "experience": "Years of experience",
  "specialization": "Area of expertise"
}
```

## Styling

### App.css
**Main stylesheet with:**
- CSS custom properties (variables)
- Responsive breakpoints
- Component-specific styles
- Animation definitions

### chrome-specific.css
**Browser-specific fixes:**
- Chrome rendering optimizations
- Cross-browser compatibility

## Asset Management

### Image Organization
```
src/assets/
├── gallery/           # Photo gallery images
├── instructors/       # Instructor photos  
├── carroussel/        # Carousel images
├── stock/             # Stock photography
└── *.webp            # Optimized images
```

### Image Optimization
- WebP format preferred
- Multiple sizes for responsive design
- Lazy loading for performance

## State Management

### Lightbox State
```javascript
const [lightboxImage, setLightboxImage] = useState(null);

const openLightbox = (imageSrc) => {
  setLightboxImage(imageSrc);
  document.body.style.overflow = 'hidden';
};

const closeLightbox = () => {
  setLightboxImage(null);
  document.body.style.overflow = 'auto';
};
```

## Performance Optimizations

### Lazy Loading
- ContactForm component lazy-loaded
- Images loaded on demand
- Code splitting for vendor chunks

### Build Optimizations
- Vite bundling
- Asset optimization
- Tree shaking for unused code

## Future Components

### Planned Additions
1. **BookingForm.jsx** - Online course booking
2. **PaymentGateway.jsx** - Payment processing
3. **StudentDashboard.jsx** - Student portal
4. **AdminPanel.jsx** - Content management
5. **NotificationSystem.jsx** - Real-time updates

---

**Note**: When modifying components, always test locally and ensure responsive behavior across devices. The website serves real customers and must maintain professional appearance and functionality.

**Last Updated**: December 2024