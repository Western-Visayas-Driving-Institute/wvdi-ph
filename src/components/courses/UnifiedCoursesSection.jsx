import React from "react";
import CourseTable from "../services/CourseTable";
import PriceList from "../services/PriceList";

const UnifiedCoursesSection = ({ 
  drivingLesson, 
  onSiteLecture, 
  theoreticalLecture 
}) => (
  <section id="courses" className="wvdi-courses max-w-5xl mx-auto px-6 py-16 md:py-20 bg-white rounded-lg shadow-md border border-[#e0e0e0] mt-16 mb-24 relative z-10">
    <header className="mb-12 text-center">
      <h2 className="text-3xl md:text-4xl font-extrabold text-[#141f54] mb-3 tracking-tight drop-shadow-sm">
        Driving Courses &amp; Services
      </h2>
      <div className="w-16 h-1 mx-auto mb-6 rounded-full bg-[#a00c0c]"></div>
      <p className="text-lg text-[#141f54] font-medium mt-4 max-w-3xl mx-auto">
        WVDI offers comprehensive driving education packages designed to meet LTO requirements and develop your skills on the road.
      </p>
    </header>

    {/* Our Packages */}
    <div className="wvdi-service-card">
      <div className="wvdi-service-card-header">
        <h3>Our Packages</h3>
      </div>
      <div className="wvdi-service-card-body">
        <h4 className="text-xl font-bold text-[#141f54] mb-4">Choose the right package for your needs</h4>
        
        <div className="wvdi-sub-card">
          <h3 className="text-xl font-bold text-[#141f54] mb-3 border-b-2 border-[#a00c0c] pb-2">SEDAN Package</h3>
          <ul className="space-y-3 list-none p-0 with-checkmarks pl-6">
            <li>Defensive Driving Seminar (2 hours)</li>
            <li>On-Road Driving Skill Assessment (M/T vehicle)</li>
            <li>30-60 minutes written exam</li>
            <li>Certificate of Completion</li>
          </ul>
          <div className="wvdi-price-tag">
            <span>Price: ₱2,000.00/pax</span>
          </div>
        </div>
        
        <div className="wvdi-sub-card">
          <h3 className="text-xl font-bold text-[#141f54] mb-3 border-b-2 border-[#a00c0c] pb-2">Assessment Course</h3>
          <ul className="space-y-3 list-none p-0 with-checkmarks pl-6">
            <li>Written Exam</li>
            <li>Hands-on Driving Assessment</li>
          </ul>
          <div className="wvdi-price-tag">
            <span>Price: ₱500.00/pax</span>
          </div>
        </div>
      </div>
    </div>
      
    {/* Theoretical Courses */}
    <div className="wvdi-service-card">
      <div className="wvdi-service-card-header">
        <h3>Theoretical Courses</h3>
      </div>
      <div className="wvdi-service-card-body">
        <div className="space-y-6">
          <div className="wvdi-sub-card">
            <h4 className="text-xl font-bold text-[#141f54] mb-2 border-b border-[#a00c0c] pb-2">15-Hour Theoretical Driving Course</h4>
            <p className="mb-3 text-[#333]">Face-to-face classroom session (15 h) for student-permit applicants.</p>
            <div className="wvdi-price-tag">
              <span>₱1,000.00</span>
            </div>
          </div>
          
          <div className="wvdi-sub-card">
            <h4 className="text-xl font-bold text-[#141f54] mb-2 border-b border-[#a00c0c] pb-2">Online Theoretical Driving Course</h4>
            <p className="mb-3 text-[#333]">Complete your theoretical driving course online.</p>
            <div className="wvdi-price-tag">
              <span>Request quote</span>
            </div>
          </div>
          
          <div className="wvdi-sub-card">
            <h4 className="text-xl font-bold text-[#141f54] mb-2 border-b border-[#a00c0c] pb-2">Defensive Driving Course</h4>
            <p className="mb-3 text-[#333]">Learn advanced techniques for safe driving in all conditions.</p>
            <div className="wvdi-price-tag">
              <span>₱700.00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    {/* Motorcycle Course */}
    <div className="wvdi-service-card">
      <div className="wvdi-service-card-header">
        <h3>Motorcycle Riding Course</h3>
      </div>
      <div className="wvdi-service-card-body">
        <CourseTable
          caption="Motorcycle Riding Course"
          headers={["Course", "Price"]}
          rows={[
            ["3 Hours Motorcycle Lesson", "₱1,500.00/Day"],
            ["2 Hours Motorcycle Lesson", "₱1,000.00/Day"]
          ]}
        />
      </div>
    </div>
    
    {/* Sedan/SUV Course */}
    <div className="wvdi-service-card">
      <div className="wvdi-service-card-header">
        <h3>Sedan / SUV Courses</h3>
      </div>
      <div className="wvdi-service-card-body">
        <CourseTable
          caption="Sedan / SUV Courses"
          headers={["Course", "Price"]}
          rows={[
            ["5 Hours Driving Session (M/T or A/T)", "₱3,500.00"],
            ["4 Hours Driving Session (M/T or A/T)", "₱2,900.00"],
            ["3 Hours Driving Session (M/T or A/T)", "₱2,250.00"],
            ["2 Hours Driving Session (M/T or A/T)", "₱1,500.00"]
          ]}
        />
      </div>
    </div>
    
    {/* Assessment Course */}
    <div className="wvdi-service-card">
      <div className="wvdi-service-card-header">
        <h3>Practical Driving Course – Assessment (30 min)</h3>
      </div>
      <div className="wvdi-service-card-body">
        <PriceList
          items={[
            ["Assessment - Manual Transmission", "₱750.00"],
            ["Assessment - Automatic Transmission", "₱750.00"]
          ]}
        />
      </div>
    </div>
    
    {/* International License */}
    <div className="wvdi-service-card">
      <div className="wvdi-service-card-header">
        <h3>International Driver's License</h3>
      </div>
      <div className="wvdi-service-card-body">
        <div className="wvdi-sub-card">
          <h4 className="text-xl font-bold text-[#141f54] mb-4">International Driver's Permit</h4>
          <p className="mb-4">Valid for one year and recognized in over 150 countries.</p>
          <div className="wvdi-price-tag">
            <span>Price: ₱3,500.00</span>
          </div>
        </div>
      </div>
    </div>
    
    {/* Qualifications & Requirements */}
    <div className="wvdi-service-card">
      <div className="wvdi-service-card-header">
        <h3>Qualifications & Requirements</h3>
      </div>
      <div className="wvdi-service-card-body">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="wvdi-sub-card">
            <h4 className="text-xl font-bold text-[#a00c0c] mb-4 border-b border-[#a00c0c] pb-2">For Filipinos</h4>
            <ul className="space-y-3 with-checkmarks pl-6">
              <li>At least 17 years old (Student's Permit), 18 (Non-Professional/Professional)</li>
              <li>Physically and mentally fit</li>
              <li>Can read and write in Filipino or English</li>
              <li>Properly accomplished application for Driver's License</li>
              <li>PSA Authenticated Birth Certificate (original & photocopy)</li>
              <li>Medical Certificate issued by LTO Accredited Physician</li>
              <li>Parental/guardian's consent if below 18</li>
            </ul>
          </div>
          
          <div className="wvdi-sub-card">
            <h4 className="text-xl font-bold text-[#a00c0c] mb-4 border-b border-[#a00c0c] pb-2">For Foreigners</h4>
            <ul className="space-y-3 with-checkmarks pl-6">
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
      </div>
    </div>
    
    <div className="text-center mt-10">
      <p className="text-sm text-[#666] italic">All amounts are in Philippine pesos (PHP). Prices may change without prior notice.</p>
      <a href="#contact" className="wvdi-cta inline-block mt-6">Book or Inquire</a>
    </div>
  </section>
);

export default UnifiedCoursesSection;
