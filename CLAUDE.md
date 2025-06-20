# WVDI-PH Project - Claude Assistant Guide

## Project Context
**Western Visayas Driving Institute Website** - React-based website for LTO accredited driving school in Negros Island, Philippines.

## Current Status (December 2024)
- ✅ **Production Ready** - Full website deployed and functional
- ✅ **Clean Codebase** - Unnecessary branches removed, main branch updated
- 🚧 **Chatbot Hidden** - AI integration incomplete, components commented out

## Key Technical Details

### Entry Point Configuration
```javascript
// src/main.jsx - CURRENT SETUP
import App from './App.jsx'          // ✅ Full website
// import MinimalApp from './App.minimal.jsx'  // ❌ Simple placeholder (not used)
```

### Chatbot Status
```javascript
// src/App.jsx - CURRENTLY HIDDEN
{/* <MessengerChat /> */}      // Facebook Messenger integration
{/* <DriveBotWidget /> */}     // Custom AI chatbot widget
```

**Why Hidden**: Incomplete functionality was appearing as broken widget on live site.

### Project Architecture

#### Main Components
- `App.jsx` - Complete website with all features
- `App.minimal.jsx` - Simple placeholder (not in use)
- `Carousel.jsx` - Image carousel for hero section
- `ContactForm.jsx` - Lazy-loaded contact forms

#### Component Structure
```
components/
├── courses/           # Course management
│   ├── CoursesSection.jsx
│   └── PackagesSection.jsx
├── instructors/       # Staff profiles  
│   ├── InstructorSection.jsx
│   └── InstructorCard.jsx
└── services/          # Service components
    ├── Accordion.jsx
    ├── CourseTable.jsx
    └── TabGroup.jsx
```

#### Data Management
```
data/
├── courses.json       # Course pricing, descriptions
└── instructors.json   # Staff profiles, photos
```

### Deployment Setup
- **Method**: GitHub Pages via gh-pages package
- **Trigger**: `npm run deploy` or push to main
- **Build**: Vite production build to `dist/`
- **Domain**: Custom domain via CNAME file

### Branch Strategy (Cleaned)
- `main` - Production source code
- `gh-pages` - Auto-generated deployment (GitHub manages)
- ~~All other branches deleted~~ (temp-deploy, fix-workflow, etc.)

## Development Workflow

### Local Development
```bash
cd /Users/philippebarthelemy/dev/wvdi/wvdi-ph
npm install                # Install dependencies
npm run dev               # Start local server (usually :5173)
# Make changes...
npm run build            # Test production build
npm run deploy           # Deploy to live site
```

### Common Tasks

#### Adding New Course
1. Edit `src/data/courses.json`
2. Follow existing JSON structure
3. Test locally, then deploy

#### Adding New Instructor  
1. Add photo to `src/assets/instructors/`
2. Update `src/data/instructors.json`
3. Ensure photo optimization (WebP preferred)

#### Enabling Chatbot (Future)
1. Complete `DriveBotWidget.jsx` implementation
2. Test OpenAI API integration  
3. Uncomment in `App.jsx`:
   ```javascript
   <MessengerChat />
   <DriveBotWidget />
   ```

## Dependencies
- **React 19** - Latest stable
- **Vite 6.x** - Build tool and dev server
- **OpenAI ^4.28.0** - For future chatbot
- **React Icons** - Icon library
- **gh-pages** - Deployment to GitHub Pages

## Asset Management
- **Images**: Stored in `src/assets/` subdirectories
- **Optimization**: WebP format preferred for photos
- **Gallery**: High-res images in `src/assets/gallery/`
- **Instructors**: Individual photos in `src/assets/instructors/`

## Performance Notes
- **Lazy Loading**: ContactForm component
- **Code Splitting**: React vendor chunk separated
- **Asset Optimization**: All images processed by Vite
- **Responsive**: Mobile-first CSS approach

## Troubleshooting

### Build Issues
```bash
# Clean reset
rm -rf node_modules package-lock.json .vite dist
npm install
npm run build
```

### Deployment Issues
- Verify GitHub Pages settings in repo
- Check CNAME file for custom domain
- Ensure `main` branch is deployment source

### Local Server Issues
- Port conflicts: Vite auto-assigns new port
- Cache issues: Clear `.vite` directory
- Module errors: Check import paths in components

## Business Context
- **LTO Accredited** driving school
- **Multiple branches** across Negros Island
- **Professional training** for various vehicle types
- **Corporate clients** and individual students

## Recent History (Important)
1. **April 2025**: Last major development on temp-deploy branch
2. **May 2025**: Deployment attempts with broken main branch  
3. **December 2024**: Recovery and cleanup
   - Found working source code in temp-deploy
   - Switched from minimal to full website
   - Hidden incomplete chatbot
   - Cleaned up branches
   - Deployed working version

## Next Development Priorities
1. **Complete chatbot integration** (DriveBotWidget + OpenAI)
2. **Enhanced contact forms** with backend integration
3. **Online booking system** for courses
4. **Payment integration** for course enrollment
5. **Admin dashboard** for content management

---

**For Developers**: Always test locally before deploying. The website serves real customers, so ensure all features work properly before going live.

**Last Updated**: December 2024
**Status**: Production Ready ✅