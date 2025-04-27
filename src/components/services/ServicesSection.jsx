import React from "react";
import SectionHeader from "./SectionHeader";
import TabGroup, { Tab } from "./TabGroup";
import PriceList from "./PriceList";
import Notice from "./Notice";
import "./chrome-fix.css";  // Import Chrome-specific CSS fixes

const ServicesSection = () => (
  <section id="services" className="wvdi-services max-w-5xl mx-auto px-6 py-12 md:py-16 bg-white rounded-lg shadow-md border border-[#e0e0e0] mt-12 mb-20 relative z-10">
    <SectionHeader title="Driving Courses & Services" />
    <div className="mt-8">
      <TabGroup defaultTab="Theory">
        <Tab label="Theoretical Courses" icon={<span aria-label="Theory" className="inline-block"><svg width="24" height="24" fill="none" stroke="#F57C00" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/></svg></span>}>
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-[#141f54]/20 shadow-sm overflow-hidden">
              <div className="bg-[#f5f5f5] py-3 px-4 border-b border-[#141f54]/20">
                <h3 className="text-lg font-medium text-[#141f54]">Theoretical Course Offerings</h3>
              </div>
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
            </div>
          </div>
        </Tab>
        
        <Tab label="Practical Driving" icon={<span aria-label="Driving" className="inline-block"><svg width="24" height="24" fill="none" stroke="#F57C00" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="9" width="20" height="7" rx="2"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg></span>}>
          <div className="space-y-8">
            <div className="bg-white rounded-lg border border-[#141f54]/20 shadow-sm overflow-hidden">
              <div className="bg-[#f5f5f5] py-3 px-4 border-b border-[#141f54]/20">
                <h3 className="text-lg font-medium text-[#141f54]">Motorcycle Riding Course</h3>
              </div>
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
            </div>
            
            <div className="bg-white rounded-lg border border-[#141f54]/20 shadow-sm overflow-hidden">
              <div className="bg-[#f5f5f5] py-3 px-4 border-b border-[#141f54]/20">
                <h3 className="text-lg font-medium text-[#141f54]">Sedan / SUV Courses</h3>
              </div>
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
            </div>
            
            <div className="bg-white rounded-lg border border-[#141f54]/20 shadow-sm overflow-hidden">
              <div className="bg-[#f5f5f5] py-3 px-4 border-b border-[#141f54]/20">
                <h3 className="text-lg font-medium text-[#141f54]">Practical Driving Course – Assessment (30 min)</h3>
              </div>
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
            </div>
          </div>
        </Tab>
        
        <Tab label="International License" icon={<span aria-label="Global License" className="inline-block"><svg width="24" height="24" fill="none" stroke="#F57C00" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><ellipse cx="12" cy="12" rx="4" ry="10"/><path d="M2 12h20"/></svg></span>}>
          <div className="bg-white border border-[#F57C00]/20 rounded-lg p-6 shadow-sm flex flex-col items-center text-center max-w-md mx-auto">
            <h3 className="font-medium text-lg mb-2">International Driver's License Assistance</h3>
            <p className="text-2xl font-bold text-[#a00c0c]">₱6,200</p>
            <p className="mt-2 text-[#333]">We handle the paperwork so you can drive abroad hassle-free.</p>
          </div>
        </Tab>
      </TabGroup>
    </div>
    <Notice text="All amounts are in Philippine pesos (PHP). Prices may change without prior notice." />
    <div className="flex justify-center mt-8">
      <a href="#contact" className="wvdi-cta">Book or Inquire</a>
    </div>
  </section>
);

export default ServicesSection;
