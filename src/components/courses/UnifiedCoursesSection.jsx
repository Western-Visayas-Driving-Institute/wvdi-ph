import React from "react";
import TabGroup, { Tab } from "../services/TabGroup";
import Accordion, { AccordionItem } from "../services/Accordion";
import NestedTabGroup, { NestedTab } from "../services/NestedTabGroup";
import CourseTable from "../services/CourseTable";
import PriceList from "../services/PriceList";
import Notice from "../services/Notice";

const UnifiedCoursesSection = ({ 
  drivingLesson, 
  onSiteLecture, 
  theoreticalLecture 
}) => (
  <section id="courses" className="wvdi-courses max-w-5xl mx-auto px-6 py-12 md:py-16 bg-white rounded-lg shadow-md border border-[#e0e0e0] mt-12 mb-20 relative z-10">
    <header className="mb-8 text-center">
      <h2 className="text-3xl md:text-4xl font-extrabold text-[#141f54] mb-2 tracking-tight drop-shadow-sm">
        Driving Courses &amp; Services
      </h2>
      <div className="w-16 h-1 mx-auto mb-4 rounded-full bg-[#a00c0c]"></div>
      <p className="text-lg text-[#141f54] font-medium mt-4 max-w-3xl mx-auto">
        WVDI offers comprehensive driving education packages designed to meet LTO requirements and develop your skills on the road.
      </p>
    </header>

    <div className="mt-8">
      <TabGroup defaultTab="Our Packages">
        <Tab label="Our Packages" icon={<span aria-label="Packages" className="inline-block"><svg width="24" height="24" fill="none" stroke="#a00c0c" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 7h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm-6 0h-4V4h4v3z"/></svg></span>}>
          <div className="p-2 md:p-4 bg-[#f5f5f5] rounded-lg mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-5 rounded-lg shadow-md border border-[#141f54]/10">
                <h3 className="text-xl font-bold text-[#141f54] mb-3 border-b-2 border-[#a00c0c] pb-2">SEDAN Package</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-[#a00c0c] font-bold mr-2">✓</span>
                    <span>Defensive Driving Seminar (2 hours)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#a00c0c] font-bold mr-2">✓</span>
                    <span>On-Road Driving Skill Assessment (M/T vehicle)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#a00c0c] font-bold mr-2">✓</span>
                    <span>30-60 minutes written exam</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#a00c0c] font-bold mr-2">✓</span>
                    <span>Certificate of Completion</span>
                  </li>
                </ul>
                <div className="mt-4 bg-[#f5f5f5] p-3 rounded-lg inline-block">
                  <span className="font-bold text-lg text-[#a00c0c]">Price: ₱2,000.00/pax</span>
                </div>
              </div>
              
              <div className="bg-white p-5 rounded-lg shadow-md border border-[#141f54]/10">
                <h3 className="text-xl font-bold text-[#141f54] mb-3 border-b-2 border-[#a00c0c] pb-2">Assessment Course</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-[#a00c0c] font-bold mr-2">✓</span>
                    <span>Written Exam</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#a00c0c] font-bold mr-2">✓</span>
                    <span>Hands-on Driving Assessment</span>
                  </li>
                </ul>
                <div className="mt-4 bg-[#f5f5f5] p-3 rounded-lg inline-block">
                  <span className="font-bold text-lg text-[#a00c0c]">Price: ₱500.00/pax</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              {drivingLesson && (
                <div className="aspect-video">
                  <img src={drivingLesson} alt="Driving Lesson" className="w-full h-full object-cover rounded-lg shadow-md" />
                </div>
              )}
              {onSiteLecture && (
                <div className="aspect-video">
                  <img src={onSiteLecture} alt="On Site Lecture" className="w-full h-full object-cover rounded-lg shadow-md" />
                </div>
              )}
              {theoreticalLecture && (
                <div className="aspect-video">
                  <img src={theoreticalLecture} alt="Theoretical Lecture" className="w-full h-full object-cover rounded-lg shadow-md" />
                </div>
              )}
            </div>
          </div>
        </Tab>
        
        <Tab label="Theoretical Courses" icon={<span aria-label="Theory" className="inline-block"><svg width="24" height="24" fill="none" stroke="#a00c0c" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/></svg></span>}>
          <Accordion>
            <AccordionItem title="15-Hour Theoretical Driving Course (TDC f2f)">
              <p className="font-semibold text-lg text-[#a00c0c]">₱1,000</p>
              <p className="text-[#141f54]">Face-to-face classroom session (15 h) for student-permit applicants.</p>
            </AccordionItem>
            <AccordionItem title="Online Theoretical Driving Course">
              <p className="italic text-[#141f54]">Request quote</p>
            </AccordionItem>
            <AccordionItem title="Defensive Driving Course">
              <p className="font-semibold text-lg text-[#a00c0c]">₱1,500</p>
              <p className="text-[#141f54]">One-day seminar that elevates road-safety awareness.</p>
            </AccordionItem>
            <AccordionItem title="Preventive Maintenance Seminar">
              <p className="italic text-[#141f54]">Request quote</p>
            </AccordionItem>
            <AccordionItem title="Renewal – Online Theory Exam Review">
              <p className="font-semibold text-lg text-[#a00c0c]">₱500</p>
            </AccordionItem>
          </Accordion>
        </Tab>
        
        <Tab label="Practical Driving" icon={<span aria-label="Driving" className="inline-block"><svg width="24" height="24" fill="none" stroke="#a00c0c" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="9" width="20" height="7" rx="2"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg></span>}>
          <NestedTabGroup defaultTab="Motorcycle">
            <NestedTab label="Motorcycle">
              <CourseTable
                caption="Motorcycle Riding Course"
                headers={["Hours", "MC Manual", "MC Automatic"]}
                rows={[
                  ["8 (Refresher)", "₱4,000", "₱4,300"],
                  ["15 (Beginner)", "₱7,000", "₱7,500"],
                  ["20 (Beginner)", "₱9,000", "₱9,500"]
                ]}
              />
            </NestedTab>
            <NestedTab label="Motor-vehicle (Sedan/SUV)">
              <CourseTable
                caption="Sedan / SUV Courses"
                headers={["Hours", "Sedan Manual", "Sedan Auto", "SUV Manual", "SUV Auto"]}
                rows={[
                  ["8 (Refresher)", "₱6,500", "₱6,900", "₱7,800", "₱8,200"],
                  ["10 (Refresher)", "₱7,800", "₱8,400", "₱9,600", "₱10,200"],
                  ["15 (Beginner)", "₱11,800", "₱12,200", "₱14,000", "₱14,400"],
                  ["20 (Beginner)", "₱15,400", "₱15,900", "₱18,000", "₱19,000"],
                  ["25 (Master)", "₱18,000", "₱19,000", "₱22,000", "₱23,500"],
                  ["30 (Master)", "₱22,000", "₱23,000", "₱25,000", "₱28,000"]
                ]}
              />
            </NestedTab>
          </NestedTabGroup>
          <Accordion slim>
            <AccordionItem title="Practical Driving Course – Assessment (30 min)">
              <PriceList
                items={[
                  ["Motorcycle", "₱2,000"],
                  ["Motorcycle w/ sidecar", "₱2,500"],
                  ["Car / Light vehicle", "₱4,000"]
                ]}
              />
            </AccordionItem>
          </Accordion>
        </Tab>
        
        <Tab label="License Services" icon={<span aria-label="License" className="inline-block"><svg width="24" height="24" fill="none" stroke="#a00c0c" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><ellipse cx="12" cy="12" rx="4" ry="10"/><path d="M2 12h20"/></svg></span>}>
          <div className="p-2 md:p-5 bg-[#f5f5f5] rounded-lg">
            <div className="bg-white border border-[#141f54]/20 rounded-lg p-6 shadow-sm flex flex-col md:flex-row items-center text-center md:text-left max-w-3xl mx-auto">
              <div className="flex-1">
                <h3 className="font-bold text-xl text-[#141f54] mb-2">International Driver's License Assistance</h3>
                <p className="text-2xl font-bold text-[#a00c0c] mb-3">₱6,200</p>
                <p className="text-[#141f54]">We handle the paperwork so you can drive abroad hassle-free.</p>
              </div>
              <div className="mt-4 md:mt-0 md:ml-6">
                <a href="#contact" className="wvdi-cta inline-block">Request Service</a>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-xl font-bold text-[#141f54] mb-4 border-b-2 border-[#a00c0c] pb-2 inline-block">Qualifications & Requirements</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="bg-white p-5 rounded-lg shadow-md">
                  <h4 className="text-lg font-bold text-[#a00c0c] mb-3">For Filipinos</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-[#a00c0c] font-bold mr-2">✓</span>
                      <span>At least 17 years old (Student's Permit), 18 (Non-Professional/Professional)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#a00c0c] font-bold mr-2">✓</span>
                      <span>Physically and mentally fit</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#a00c0c] font-bold mr-2">✓</span>
                      <span>Can read and write in Filipino or English</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#a00c0c] font-bold mr-2">✓</span>
                      <span>Properly accomplished application for Driver's License</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#a00c0c] font-bold mr-2">✓</span>
                      <span>PSA Authenticated Birth Certificate (original & photocopy)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#a00c0c] font-bold mr-2">✓</span>
                      <span>Medical Certificate issued by LTO Accredited Physician</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#a00c0c] font-bold mr-2">✓</span>
                      <span>Parental/guardian's consent if below 18</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white p-5 rounded-lg shadow-md">
                  <h4 className="text-lg font-bold text-[#a00c0c] mb-3">For Foreigners</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-[#a00c0c] font-bold mr-2">✓</span>
                      <span>At least 18 years old</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#a00c0c] font-bold mr-2">✓</span>
                      <span>Can read and write in English or Filipino</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#a00c0c] font-bold mr-2">✓</span>
                      <span>Physically and mentally fit</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#a00c0c] font-bold mr-2">✓</span>
                      <span>Arrived in the Philippines at least 1 month prior to application</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#a00c0c] font-bold mr-2">✓</span>
                      <span>Stay in the country for at least 12 months from date of application</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#a00c0c] font-bold mr-2">✓</span>
                      <span>Birth Certificate, Passport, Alien Certificate of Registration I-card</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#a00c0c] font-bold mr-2">✓</span>
                      <span>Medical Certificate issued by LTO Accredited Physician</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Tab>
      </TabGroup>
    </div>
    
    <Notice text="All amounts are in Philippine pesos (PHP). Prices may change without prior notice." />
    
    <div className="flex justify-center mt-8">
      <a href="#contact" className="wvdi-cta">Register for a Course</a>
    </div>
  </section>
);

export default UnifiedCoursesSection;
