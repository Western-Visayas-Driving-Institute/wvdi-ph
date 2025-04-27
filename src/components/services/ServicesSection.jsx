import React from "react";
import SectionHeader from "./SectionHeader";
import Notice from "./Notice";
import "./chrome-fix.css";  // Import Chrome-specific CSS fixes

const ServiceCard = ({ title, icon, children, className = "" }) => (
  <div className={`bg-white rounded-lg border border-[#141f54]/20 shadow-sm overflow-hidden mb-8 ${className}`}>
    <div className="bg-[#f5f5f5] py-3 px-4 border-b border-[#141f54]/20 flex items-center">
      {icon && <span className="mr-2">{icon}</span>}
      <h3 className="text-lg font-medium text-[#141f54]">{title}</h3>
    </div>
    <div className="p-1">
      {children}
    </div>
  </div>
);

const ServicesSection = () => (
  <section id="services" className="wvdi-services max-w-5xl mx-auto px-6 py-12 md:py-16 mt-12 mb-20 relative z-10">
    <SectionHeader title="Driving Courses & Services" />
    
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Our Packages */}
      <ServiceCard 
        title="Our Packages" 
        icon={<span aria-label="Packages" className="inline-block"><svg width="24" height="24" fill="none" stroke="#F57C00" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 3v18M3 12h18M3 6h18M3 18h18"></path></svg></span>}
        className="md:col-span-2"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
          <div className="bg-white rounded-lg border border-[#141f54]/20 shadow-sm overflow-hidden">
            <div className="bg-[#f5f5f5] py-3 px-4 border-b border-[#141f54]/20">
              <h4 className="text-md font-medium text-[#141f54]">SEDAN Package</h4>
            </div>
            <ul className="divide-y divide-[#f5f5f5]">
              <li className="px-4 py-3 flex items-center text-base">15-Hour Theoretical Driving Course (TDC f2f)</li>
              <li className="px-4 py-3 flex items-center text-base">Online Theoretical Driving Course</li>
              <li className="px-4 py-3 flex items-center text-base">Defensive Driving Course</li>
              <li className="px-4 py-3 flex items-center text-base">Preventive Maintenance Seminar</li>
              <li className="px-4 py-3 flex items-center text-base">Renewal – Online Theory Exam Review</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg border border-[#141f54]/20 shadow-sm overflow-hidden">
            <div className="bg-[#f5f5f5] py-3 px-4 border-b border-[#141f54]/20">
              <h4 className="text-md font-medium text-[#141f54]">Assessment Course</h4>
            </div>
            <ul className="divide-y divide-[#f5f5f5]">
              <li className="px-4 py-3 flex items-center text-base">Motorcycle</li>
              <li className="px-4 py-3 flex items-center text-base">Motorcycle w/ sidecar</li>
              <li className="px-4 py-3 flex items-center text-base">Car / Light vehicle</li>
            </ul>
          </div>
        </div>
      </ServiceCard>
      
      {/* Theoretical Courses */}
      <ServiceCard 
        title="Theoretical Course Offerings" 
        icon={<span aria-label="Theory" className="inline-block"><svg width="24" height="24" fill="none" stroke="#F57C00" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/></svg></span>}
        className="md:col-span-2"
      >
        <ul className="divide-y divide-[#f5f5f5]">
          <li className="px-4 py-3 flex justify-between items-center text-base">
            <div>
              <span className="font-medium">15-Hour Theoretical Driving Course (TDC f2f)</span>
              <p className="text-sm text-[#666] mt-1">Face-to-face classroom session (15 h) for student-permit applicants.</p>
            </div>
            <span className="font-semibold text-[#a00c0c]">₱1,000</span>
          </li>
          <li className="px-4 py-3 flex justify-between items-center text-base">
            <span>Online Theoretical Driving Course</span>
            <span className="italic text-[#666]">Request quote</span>
          </li>
          <li className="px-4 py-3 flex justify-between items-center text-base">
            <div>
              <span className="font-medium">Defensive Driving Course</span>
              <p className="text-sm text-[#666] mt-1">One-day seminar that elevates road-safety awareness.</p>
            </div>
            <span className="font-semibold text-[#a00c0c]">₱1,500</span>
          </li>
          <li className="px-4 py-3 flex justify-between items-center text-base">
            <span>Preventive Maintenance Seminar</span>
            <span className="italic text-[#666]">Request quote</span>
          </li>
          <li className="px-4 py-3 flex justify-between items-center text-base">
            <span>Renewal – Online Theory Exam Review</span>
            <span className="font-semibold text-[#a00c0c]">₱500</span>
          </li>
        </ul>
      </ServiceCard>
      
      {/* Motorcycle Course */}
      <ServiceCard 
        title="Motorcycle Riding Course" 
        icon={<span aria-label="Driving" className="inline-block"><svg width="24" height="24" fill="none" stroke="#F57C00" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="9" width="20" height="7" rx="2"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg></span>}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#f5f5f5]">
            <thead className="bg-[#f9f9f9]">
              <tr>
                <th className="px-4 py-3 text-left text-[#141f54] font-medium">Hours</th>
                <th className="px-4 py-3 text-right text-[#141f54] font-medium">MC Manual</th>
                <th className="px-4 py-3 text-right text-[#141f54] font-medium">MC Automatic</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f5f5f5]">
              <tr>
                <td className="px-4 py-3">8 (Refresher)</td>
                <td className="px-4 py-3 text-right font-medium text-[#a00c0c]">₱4,000</td>
                <td className="px-4 py-3 text-right font-medium text-[#a00c0c]">₱4,300</td>
              </tr>
              <tr>
                <td className="px-4 py-3">15 (Beginner)</td>
                <td className="px-4 py-3 text-right font-medium text-[#a00c0c]">₱7,000</td>
                <td className="px-4 py-3 text-right font-medium text-[#a00c0c]">₱7,500</td>
              </tr>
              <tr>
                <td className="px-4 py-3">20 (Beginner)</td>
                <td className="px-4 py-3 text-right font-medium text-[#a00c0c]">₱9,000</td>
                <td className="px-4 py-3 text-right font-medium text-[#a00c0c]">₱9,500</td>
              </tr>
            </tbody>
          </table>
        </div>
      </ServiceCard>
      
      {/* Sedan/SUV Course */}
      <ServiceCard 
        title="Sedan / SUV Courses" 
        icon={<span aria-label="Driving" className="inline-block"><svg width="24" height="24" fill="none" stroke="#F57C00" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="9" width="20" height="7" rx="2"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg></span>}
        className="md:col-span-2"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#f5f5f5]">
            <thead className="bg-[#f9f9f9]">
              <tr>
                <th className="px-4 py-3 text-left text-[#141f54] font-medium">Hours</th>
                <th className="px-4 py-3 text-right text-[#141f54] font-medium">Sedan Manual</th>
                <th className="px-4 py-3 text-right text-[#141f54] font-medium">Sedan Auto</th>
                <th className="px-4 py-3 text-right text-[#141f54] font-medium">SUV Manual</th>
                <th className="px-4 py-3 text-right text-[#141f54] font-medium">SUV Auto</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f5f5f5]">
              <tr>
                <td className="px-4 py-3">8 (Refresher)</td>
                <td className="px-4 py-3 text-right font-medium text-[#a00c0c]">₱6,500</td>
                <td className="px-4 py-3 text-right font-medium text-[#a00c0c]">₱6,900</td>
                <td className="px-4 py-3 text-right font-medium text-[#a00c0c]">₱7,800</td>
                <td className="px-4 py-3 text-right font-medium text-[#a00c0c]">₱8,200</td>
              </tr>
              <tr>
                <td className="px-4 py-3">10 (Refresher)</td>
                <td className="px-4 py-3 text-right font-medium text-[#a00c0c]">₱7,800</td>
                <td className="px-4 py-3 text-right font-medium text-[#a00c0c]">₱8,400</td>
                <td className="px-4 py-3 text-right font-medium text-[#a00c0c]">₱9,600</td>
                <td className="px-4 py-3 text-right font-medium text-[#a00c0c]">₱10,200</td>
              </tr>
              <tr>
                <td className="px-4 py-3">15 (Beginner)</td>
                <td className="px-4 py-3 text-right font-medium text-[#a00c0c]">₱11,800</td>
                <td className="px-4 py-3 text-right font-medium text-[#a00c0c]">₱12,200</td>
                <td className="px-4 py-3 text-right font-medium text-[#a00c0c]">₱14,000</td>
                <td className="px-4 py-3 text-right font-medium text-[#a00c0c]">₱14,400</td>
              </tr>
              <tr>
                <td className="px-4 py-3">20 (Beginner)</td>
                <td className="px-4 py-3 text-right font-medium text-[#a00c0c]">₱15,400</td>
                <td className="px-4 py-3 text-right font-medium text-[#a00c0c]">₱15,900</td>
                <td className="px-4 py-3 text-right font-medium text-[#a00c0c]">₱18,000</td>
                <td className="px-4 py-3 text-right font-medium text-[#a00c0c]">₱19,000</td>
              </tr>
              <tr>
                <td className="px-4 py-3">25 (Master)</td>
                <td className="px-4 py-3 text-right font-medium text-[#a00c0c]">₱18,000</td>
                <td className="px-4 py-3 text-right font-medium text-[#a00c0c]">₱19,000</td>
                <td className="px-4 py-3 text-right font-medium text-[#a00c0c]">₱22,000</td>
                <td className="px-4 py-3 text-right font-medium text-[#a00c0c]">₱23,500</td>
              </tr>
              <tr>
                <td className="px-4 py-3">30 (Master)</td>
                <td className="px-4 py-3 text-right font-medium text-[#a00c0c]">₱22,000</td>
                <td className="px-4 py-3 text-right font-medium text-[#a00c0c]">₱23,000</td>
                <td className="px-4 py-3 text-right font-medium text-[#a00c0c]">₱25,000</td>
                <td className="px-4 py-3 text-right font-medium text-[#a00c0c]">₱28,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </ServiceCard>
      
      {/* Assessment Course */}
      <ServiceCard 
        title="Practical Driving Course – Assessment (30 min)" 
        icon={<span aria-label="Assessment" className="inline-block"><svg width="24" height="24" fill="none" stroke="#F57C00" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4"/><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/></svg></span>}
      >
        <ul className="divide-y divide-[#f5f5f5]">
          <li className="px-4 py-3 flex justify-between items-center text-base">
            <span>Motorcycle</span>
            <span className="font-semibold text-[#a00c0c]">₱2,000</span>
          </li>
          <li className="px-4 py-3 flex justify-between items-center text-base">
            <span>Motorcycle w/ sidecar</span>
            <span className="font-semibold text-[#a00c0c]">₱2,500</span>
          </li>
          <li className="px-4 py-3 flex justify-between items-center text-base">
            <span>Car / Light vehicle</span>
            <span className="font-semibold text-[#a00c0c]">₱4,000</span>
          </li>
        </ul>
      </ServiceCard>
      
      {/* International License */}
      <ServiceCard 
        title="International Driver's License" 
        icon={<span aria-label="Global License" className="inline-block"><svg width="24" height="24" fill="none" stroke="#F57C00" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><ellipse cx="12" cy="12" rx="4" ry="10"/><path d="M2 12h20"/></svg></span>}
      >
        <div className="p-4 flex flex-col items-center text-center">
          <p className="text-2xl font-bold text-[#a00c0c]">₱6,200</p>
          <p className="mt-2 text-[#333]">We handle the paperwork so you can drive abroad hassle-free.</p>
        </div>
      </ServiceCard>
    </div>
    
    <Notice text="All amounts are in Philippine pesos (PHP). Prices may change without prior notice." />
    <div className="flex justify-center mt-8">
      <a href="#contact" className="wvdi-cta">Book or Inquire</a>
    </div>
  </section>
);

export default ServicesSection;
