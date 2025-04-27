import './App.css'
import wvdiLogo from './assets/wvdi-logo.webp'
import autoWebp from './assets/Automatic.webp'
import bestSeal from './assets/Best-Company-high-res-seal-small-768x768.webp'
import ltoAccredited from './assets/LTO-accredited.webp'
import ltoWebp from './assets/LTO.webp'
import trophyWebp from './assets/Trophy.webp'
import adminStaff from './assets/admin staff.webp'
import teamLacson from './assets/all team in lacson office.webp'
import drivingLesson from './assets/driving lesson .webp'
import instructorsWebp from './assets/instructors.webp'
import motorLesson from './assets/motor lesson.webp'
import onSiteLecture from './assets/on site lecture.webp'
import teamTransparent from './assets/team on transparent.webp'
import theoreticalLecture from './assets/theoritical lecture.webp'
import carsInLine from './assets/wvdi cars in line.webp'
import adminWebp from './assets/wvdi-admin.webp'
import MessengerChat from './MessengerChat'
import DriveBotWidget from './DriveBotWidget'
import Carousel from './Carousel.jsx'
import React from 'react';
import CoursesServicesSection from './components/CoursesServicesSection';
import Seo from './Seo.jsx';

const ContactForm = React.lazy(() => import('./ContactForm.jsx'));

function App() {
  function handleBookNow(course_id) {
    // Implementation for auto-scroll and pre-fill (to be completed)
  }

  return (
    <>
      <Seo
        title="Western Visayas Driving Institute - WVDI"
        description="Get professional driving training from LTO-accredited instructors on Negros Island. WVDI is your trusted partner for driving education."
        image="https://wvdi-ph.com/assets/wvdi-logo.webp"
        locale="en"
      />
      <div className="wvdi-root">
        <MessengerChat />
        <DriveBotWidget />
        <header className="wvdi-header">
          <img src={wvdiLogo} className="wvdi-logo" alt="WVDI Logo" />
          <div className="wvdi-header-text">
            <h1>Western Visayas Driving Institute</h1>
            <h2>Driving Institute</h2>
            <p className="wvdi-contact">(034) 435-5803</p>
            <p className="wvdi-hours">Office Hours: Mondays to Saturdays, 8:00 AM to 6:00 PM</p>
          </div>
        </header>
        <nav className="wvdi-nav">
          <a href="#home">Home</a>
          <a href="#about">About Us</a>
          <a href="#courses">Driving Courses</a>
          <a href="#services">Services</a>
          <a href="#instructors">Meet Your Instructors</a>
          <a href="#branches">Branches</a>
          <a href="#contact">Contact</a>
        </nav>
        <main>
          <section id="home" className="wvdi-hero">
            <h2>Your Trusted Driving Education Partner</h2>
            <p>Get professional driving training from LTO-accredited instructors on Negros Island.</p>
            <a href="#contact" className="wvdi-cta">Enroll Now</a>
            <Carousel />
          </section>

          <section id="about" className="wvdi-accreditation">
            <h2>About WVDI</h2>
            <div className="wvdi-instructor-gallery">
              <img src={ltoAccredited} alt="LTO Accredited" />
              <img src={bestSeal} alt="Best Company Seal" />
              <img src={trophyWebp} alt="Trophy" />
            </div>
            <p>WVDI Corp. is an LTO accredited driving school which has evolved to become the first driving school to offer comprehensive packages including FREE class lectures on Defensive Driving, Preventive Maintenance, Site Lectures and Hands-On Car Maintenance.</p>
            <a href="#courses" className="wvdi-cta">View Our Courses</a>
          </section>

          <div id="courses" className="scroll-mt-24"></div>
          <CoursesServicesSection onBookNow={handleBookNow} 
            drivingLesson={drivingLesson}
            onSiteLecture={onSiteLecture}
            theoreticalLecture={theoreticalLecture}
          />

          <section id="instructors" className="wvdi-instructors">
            <h2>Meet Your Instructors</h2>
            <p>Our team of professional instructors are LTO-certified and committed to providing you with the highest quality driving education.</p>
            <div className="wvdi-instructor-gallery">
              <img src={instructorsWebp} alt="Instructors" />
              <img src={adminStaff} alt="Admin Staff" />
              <img src={teamLacson} alt="Team at Lacson Office" />
            </div>
          </section>

          <section id="branches" className="wvdi-branches">
            <h2>Our Branches</h2>
            <p>Visit us at any of our convenient locations across Negros Island:</p>
            
            <div className="wvdi-branches-list">
              <div className="wvdi-branch-item">
                <div className="wvdi-branch-info">
                  <h3>BACOLOD</h3>
                  <p>4/F Space #4007 Ayala Malls Capitol Central, Gatuslao St. Bacolod City</p>
                  <p><strong>Phone:</strong> 09178100009 / 0917 825 4580 / 0917 594 7890</p>
                </div>
                <div className="wvdi-branch-map">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d716.7199471575506!2d122.9493599464753!3d10.676673851172218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33aed12977528ad9%3A0x6f7eee3fb19647c2!2sLTO%20-%20Land%20Transportation%20Office%20-%20Bacolod!5e0!3m2!1sen!2sph!4v1745648825528!5m2!1sen!2sph"
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="WVDI Bacolod Location"
                    aria-label="Google Maps showing WVDI Bacolod location"
                  ></iframe>
                </div>
              </div>
              
              <div className="wvdi-branch-item">
                <div className="wvdi-branch-info">
                  <h3>HIMAMAYLAN</h3>
                  <p>Zone 3, Brgy. 1, Poblacion St., Gatuslao Blvd., Himamaylan City</p>
                  <p><strong>Phone:</strong> 09171587908 / 09190938891</p>
                </div>
                <div className="wvdi-branch-map">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6297.050148544658!2d122.8709813868982!3d10.097490834791443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33aefc7a3c76b8af%3A0x8f8f8f8f8f8f8f8f!2sZone%203%2C%20Brgy.%201%2C%20Poblacion%20St.%2C%20Gatuslao%20Blvd.%2C%20Himamaylan%20City%2C%20Negros%20Occidental!5e0!3m2!1sen!2sph!4v1713438400328!5m2!1sen!2sph"
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="WVDI Himamaylan Location"
                    aria-label="Google Maps showing WVDI Himamaylan location"
                  ></iframe>
                </div>
              </div>
              
              <div className="wvdi-branch-item">
                <div className="wvdi-branch-info">
                  <h3>DUMAGUETE</h3>
                  <p>Capitol Area, Taclobo, Dumaguete City, Negros Oriental</p>
                  <p><strong>Phone:</strong> 09690505125 / 09178619706</p>
                </div>
                <div className="wvdi-branch-map">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d463.489265070263!2d123.30110315600122!3d9.311234089293514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33ab6fd88e193ab9%3A0xd43373c72262ecf7!2sWestern%20Visayas%20Driving%20Institute!5e0!3m2!1sen!2sph!4v1745648607261!5m2!1sen!2sph"
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="WVDI Dumaguete Location"
                    aria-label="Google Maps showing WVDI Dumaguete location"
                  ></iframe>
                </div>
              </div>
            </div>
          </section>

          <section className="wvdi-gallery">
            <h2>Photo Gallery</h2>
            <p>Discover our facilities, vehicles, and training environment:</p>
            <div className="wvdi-gallery-images">
              <img src={autoWebp} alt="Automatic Transmission Vehicle" />
              <img src={motorLesson} alt="Motorcycle Lesson" />
              <img src={teamTransparent} alt="Our Team" />
              <img src={adminWebp} alt="Administration" />
              <img src={ltoWebp} alt="LTO Certified" />
            </div>
          </section>

          <section id="contact" className="wvdi-contact-section">
            <h2>Contact Us</h2>
            <p>Ready to start your journey to becoming a skilled and confident driver? Reach out to us today!</p>
            <p><strong>Phones:</strong><br />
            BACOLOD: 09178100009 / 0917 825 4580 / 0917 594 7890 / 0908 873 3598 / 0908705 4162<br />
            HIMAMAYLAN: 09171587908 / 09190938891<br />
            DUMAGUETE: 09690505125 / 09178619706</p>
            <p><strong>Email:</strong><br />
            info@wvdi-ph.com<br />
            </p>
            <p><strong>Opening Hours:</strong><br />
            8 AM - 7 PM (Mondays - Sundays)</p>
            <a href="tel:+63344355803" className="wvdi-cta">Call Us Now</a>
            <div style={{margin: '2.5rem auto', maxWidth: 500}}>
              <React.Suspense fallback={<div>Loading form...</div>}>
                <ContactForm />
              </React.Suspense>
            </div>
            <div className="wvdi-socials">
              <a href="https://www.facebook.com/bacolodphilippinesdrivingschool" target="_blank" rel="noopener noreferrer">Facebook</a>
              <a href="https://twitter.com/WVDI_Corp" target="_blank" rel="noopener noreferrer">Twitter</a>
              <a href="https://www.youtube.com/channel/UCxn0NJ9EjmsP96EsOZztkjQ" target="_blank" rel="noopener noreferrer">YouTube</a>
              <a href="https://www.instagram.com/wvdi_corp/" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://www.snapchat.com/add/wvdi_corp?share_id=Dl8ZmUhWq9g&locale=en-US" target="_blank" rel="noopener noreferrer">Snapchat</a>
            </div>
          </section>
        </main>
        
        <footer className="wvdi-footer">
          <p>&copy; {new Date().getFullYear()} Western Visayas Driving Institute. All rights reserved.</p>
          <p>LTO Accredited Driving School</p>
        </footer>
      </div>
    </>
  )
}

export default App
