# Western Visayas Driving Institute Website

A modern, responsive website for Western Visayas Driving Institute (WVDI), an LTO accredited driving school in Negros Island, Philippines.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# Server will run on http://localhost:5173 or next available port

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## 📋 Features

- ✅ **Responsive Design** - Optimized for all devices
- ✅ **Interactive Components** - Image galleries with lightbox, carousels
- ✅ **Course Management** - Comprehensive driving course information
- ✅ **Instructor Profiles** - Meet your instructors section
- ✅ **Contact Forms** - Multiple contact methods
- ✅ **SEO Optimized** - Meta tags, structured data
- ✅ **Performance Optimized** - Lazy loading, optimized assets
- 🚧 **Chatbot Integration** - Currently hidden (incomplete)

## 🛠 Technologies Used

- **Frontend**: React.js 19, Vite 6.x
- **Styling**: CSS3 with custom properties, responsive design
- **Icons**: React Icons
- **Build Tool**: Vite with optimized production builds
- **Deployment**: GitHub Pages
- **AI Integration**: OpenAI API (for future chatbot)

## 📁 Project Structure

```
src/
├── components/           # Reusable React components
│   ├── courses/         # Course-related components
│   ├── instructors/     # Instructor components
│   └── services/        # Service components
├── data/                # Static data files
│   ├── courses.json     # Course information
│   └── instructors.json # Instructor profiles
├── assets/              # Images, icons, media
│   ├── gallery/         # Photo gallery images
│   ├── instructors/     # Instructor photos
│   └── stock/           # Stock photos
├── App.jsx              # Main application component
├── App.minimal.jsx      # Minimal version (not used)
├── main.jsx             # Entry point
└── index.css            # Global styles
```

## 🔧 Development

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages

### Key Components

#### Main App (`src/App.jsx`)
- Contains the full website with all sections
- Manages lightbox state for image galleries
- Includes SEO component and navigation

#### Course Management
- `CoursesSection.jsx` - Displays driving courses
- `courses.json` - Course data (prices, descriptions)

#### Instructor Profiles
- `InstructorSection.jsx` - Instructor grid
- `InstructorCard.jsx` - Individual instructor cards
- `instructors.json` - Instructor data

### Important Notes

#### Chatbot Components (Currently Hidden)
- `MessengerChat.jsx` - Facebook Messenger integration
- `DriveBotWidget.jsx` - Custom AI chatbot
- **Status**: Commented out in App.jsx (incomplete functionality)

#### Entry Point Configuration
- `main.jsx` imports `App.jsx` (full website)
- Previously imported `App.minimal.jsx` (simple placeholder)

## 🌐 Deployment

### GitHub Pages Deployment
1. **Automatic**: Push to `main` branch triggers deployment
2. **Manual**: Run `npm run deploy`
3. **Built files** are deployed to `gh-pages` branch
4. **Live URL**: Custom domain configured via CNAME

### Branch Strategy
- `main` - Production code and deployment source
- `gh-pages` - Auto-generated deployment branch
- Other branches cleaned up (temp-deploy, fix-workflow, etc.)

## 🏢 Business Information

### WVDI Branches
- **Bacolod Main**: 4/F Space #4007 Ayala Malls Capitol Central, Gatuslao St. Bacolod City
- **Himamaylan**: Zone 3, Brgy. 1, Poblacion St., Gatuslao Blvd., Himamaylan City  
- **Dumaguete**: Capitol Area, Taclobo, Dumaguete City, Negros Oriental

### Contact Information
- **Phone**: (034) 435-5803
- **Hours**: Monday to Saturday, 8:00 AM to 6:00 PM
- **Email**: Contact through website forms

## 🔍 Troubleshooting

### Common Issues

1. **Port 5173 in use**: Vite will automatically use next available port
2. **Build failures**: Clear node_modules and reinstall
3. **Missing images**: Check asset paths in src/assets/
4. **Deployment issues**: Verify GitHub Pages settings

### Development Reset
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf .vite
npm run dev
```

## 📝 Recent Changes

### December 2024 Deployment
- ✅ Switched from minimal to full website version
- ✅ Hidden incomplete chatbot components
- ✅ Updated main branch with working code
- ✅ Cleaned up unnecessary branches
- ✅ Deployed complete website to production

### Component Status
- ✅ **Working**: All main website features
- 🚧 **In Development**: AI Chatbot integration
- ❌ **Removed**: Temporary placeholder content

## 📞 Support

For technical issues or feature requests:
1. Check existing documentation
2. Review component structure in `/src`
3. Test changes locally before deployment
4. Ensure all images and assets are optimized

## 📄 License

© 2025 Western Visayas Driving Institute. All rights reserved.

---

**Last Updated**: December 2024  
**Version**: Production Ready  
**Status**: ✅ Live and Functional
