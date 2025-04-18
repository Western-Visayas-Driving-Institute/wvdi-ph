import './App.css'
import wvdiLogo from './assets/wvdi-logo.jpg'
import autoPng from './assets/Automatic.png'
import bestSeal from './assets/Best-Company-high-res-seal-small-768x768.png'
import ltoAccredited from './assets/LTO-accredited.png'
import ltoPng from './assets/LTO.png'
import trophyPng from './assets/Trophy.png'
import adminStaff from './assets/admin staff.jpg'
import teamLacson from './assets/all team in lacson office.jpg'
import drivingLesson from './assets/driving lesson .jpg'
import instructorsJpg from './assets/instructors.jpg'
import motorLesson from './assets/motor lesson.jpg'
import onSiteLecture from './assets/on site lecture.jpg'
import teamTransparent from './assets/team on transparent.png'
import theoreticalLecture from './assets/theoritical lecture.jpeg'
import carsInLine from './assets/wvdi cars in line.jpg'
import adminJpg from './assets/wvdi-admin.jpg'

function App() {
  return (
    <div className="wvdi-root">
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
        <a href="#instructors">Meet Your Instructors</a>
        <a href="#branches">Branches</a>
        <a href="#contact">Contact</a>
      </nav>
      <main>
        <section id="home" className="wvdi-hero">
          <h2>Your Trusted Driving Education Partner</h2>
          <p>Get professional driving training from LTO-accredited instructors on Negros Island.</p>
          <a href="#contact" className="wvdi-cta">Enroll Now</a>
          <img src={carsInLine} className="wvdi-hero-img" alt="WVDI Cars" />
        </section>

        <section id="about" className="wvdi-accreditation">
          <h2>About WVDI</h2>
          <div className="wvdi-instructor-gallery">
            <img src={ltoAccredited} alt="LTO Accredited" />
            <img src={bestSeal} alt="Best Company Seal" />
            <img src={trophyPng} alt="Trophy" />
          </div>
          <p>WVDI Corp. is an LTO accredited driving school which has evolved to become the first driving school to offer comprehensive packages including FREE class lectures on Defensive Driving, Preventive Maintenance, Site Lectures and Hands-On Car Maintenance.</p>
          <a href="#courses" className="wvdi-cta">View Our Courses</a>
        </section>

        <section id="courses" className="wvdi-courses">
          <h2>Driving Courses</h2>
          <h3>SEDAN</h3>
          <ul>
            <li>Defensive Driving Seminar (2 hours)</li>
            <li>On-Road Driving Skill Assessment (M/T vehicle)</li>
            <li>30-60 minutes written exam</li>
            <li>Certificate of Completion</li>
          </ul>
          <h4>Price: Php 2,000.00/pax</h4>
          <div className="wvdi-instructor-gallery">
            <img src={drivingLesson} alt="Driving Lesson" />
            <img src={onSiteLecture} alt="On Site Lecture" />
            <img src={theoreticalLecture} alt="Theoretical Lecture" />
          </div>
          <h4>Assessment Course - Php 500.00/pax</h4>
          <ul>
            <li>Written Exam</li>
            <li>Hands-on Driving Assessment</li>
          </ul>
          <h3>Qualifications & Requirements</h3>
          <div className="wvdi-qualifications">
            <div>
              <h4>For Filipinos</h4>
              <ul>
                <li>At least 17 years old (Student's Permit), 18 (Non-Professional/Professional)</li>
                <li>Physically and mentally fit</li>
                <li>Can read and write in Filipino or English</li>
                <li>Properly accomplished application for Driver's License</li>
                <li>PSA Authenticated Birth Certificate (original & photocopy)</li>
                <li>Medical Certificate issued by LTO Accredited Physician</li>
                <li>Parental/guardian's consent if below 18</li>
              </ul>
            </div>
            <div>
              <h4>For Foreigners</h4>
              <ul>
                <li>At least 18 years old</li>
                <li>Can read and write in English or Filipino</li>
                <li>Physically and mentally fit</li>
                <li>Arrived in the Philippines at least 1 month prior to application</li>
                <li>Stay in the country for at least 12 months from date of application</li>
                <li>Birth Certificate, Passport, Alien Certificate of Registration I-card</li>
                <li>Medical Certificate issued by LTO Accredited Physician</li>
              </ul>
            </div>
          </div>
          <div className="wvdi-cta-container" style={{ textAlign: "center", marginTop: "2rem" }}>
            <a href="#contact" className="wvdi-cta">Register for a Course</a>
          </div>
        </section>

        <section id="instructors" className="wvdi-instructors">
          <h2>Meet Your Instructors</h2>
          <p>Our team of professional instructors are LTO-certified and committed to providing you with the highest quality driving education.</p>
          <div className="wvdi-instructor-gallery">
            <img src={instructorsJpg} alt="Instructors" />
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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.0096019983294!2d122.9423129758617!3d10.6737531899383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33aed0425ef5cb13%3A0x35e8533a454736be!2sAyala%20Malls%20Capitol%20Central!5e0!3m2!1sen!2sph!4v1713438300724!5m2!1sen!2sph&markers=color:red%7Clabel:WVDI%7C10.6737531899383,122.9423129758617" 
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="WVDI Bacolod Location"
                  aria-label="Google Maps showing WVDI Bacolod location">
                </iframe>
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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15679.072487687352!2d122.85597792745607!3d10.10990687416476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33aefc7a3c76b8af%3A0xbc5ad8c1fdb983dd!2sHimamaylan%2C%20Negros%20Occidental!5e0!3m2!1sen!2sph!4v1713438400328!5m2!1sen!2sph&markers=color:red%7Clabel:WVDI%7C10.10990687416476,122.85597792745607" 
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="WVDI Himamaylan Location"
                  aria-label="Google Maps showing WVDI Himamaylan location">
                </iframe>
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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3935.6598396536844!2d123.30322327584683!3d9.315694387103788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33ab6dc166995953%3A0xf9152f520fd1cd0f!2sDumaguete%20City%20Capitol%20Area!5e0!3m2!1sen!2sph!4v1713438457461!5m2!1sen!2sph&markers=color:red%7Clabel:WVDI%7C9.315694387103788,123.30322327584683" 
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="WVDI Dumaguete Location"
                  aria-label="Google Maps showing WVDI Dumaguete location">
                </iframe>
              </div>
            </div>
          </div>
        </section>

        <section className="wvdi-gallery">
          <h2>Photo Gallery</h2>
          <p>Discover our facilities, vehicles, and training environment:</p>
          <div className="wvdi-gallery-images">
            <img src={autoPng} alt="Automatic Transmission Vehicle" />
            <img src={motorLesson} alt="Motorcycle Lesson" />
            <img src={teamTransparent} alt="Our Team" />
            <img src={adminJpg} alt="Administration" />
            <img src={ltoPng} alt="LTO Certified" />
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
          dina.espanola@wvdi-ph.com<br />
          elviejoy.sarrosa@wvdi-ph.com</p>
          
          <p><strong>Opening Hours:</strong><br />
          8 AM - 7 PM (Mondays - Sundays)</p>
          
          <a href="tel:+63344355803" className="wvdi-cta">Call Us Now</a>
          
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
  )
}

export default App
