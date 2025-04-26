import React from "react";
import SectionHeader from "./SectionHeader";
import TabGroup, { Tab } from "./TabGroup";
import Accordion, { AccordionItem } from "./Accordion";
import NestedTabGroup, { NestedTab } from "./NestedTabGroup";
import CourseTable from "./CourseTable";
import PriceList from "./PriceList";
import Notice from "./Notice";

const ServicesSection = () => (
  <section id="services" className="wvdi-services max-w-5xl mx-auto px-6 py-12 md:py-16 bg-white rounded-lg shadow-md border border-[#e0e0e0] mt-12 mb-20 relative z-10">
    <SectionHeader title="Driving Courses & Services" />
    <div className="mt-8">
      <TabGroup defaultTab="Theory">
        <Tab label="Theory" icon={<span aria-label="Theory" className="inline-block"><svg width="24" height="24" fill="none" stroke="#F57C00" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/></svg></span>}>
          <Accordion>
            <AccordionItem title="15-Hour Theoretical Driving Course (TDC f2f)">
              <p className="font-semibold">₱1,000</p>
              <p>Face-to-face classroom session (15 h) for student-permit applicants.</p>
            </AccordionItem>
            <AccordionItem title="Online Theoretical Driving Course">
              <p className="italic">Request quote</p>
            </AccordionItem>
            <AccordionItem title="Defensive Driving Course">
              <p className="font-semibold">₱1,500</p>
              <p>One-day seminar that elevates road-safety awareness.</p>
            </AccordionItem>
            <AccordionItem title="Preventive Maintenance Seminar">
              <p className="italic">Request quote</p>
            </AccordionItem>
            <AccordionItem title="Renewal – Online Theory Exam Review">
              <p className="font-semibold">₱500</p>
            </AccordionItem>
          </Accordion>
        </Tab>
        <Tab label="Driving Lessons" icon={<span aria-label="Driving" className="inline-block"><svg width="24" height="24" fill="none" stroke="#F57C00" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="9" width="20" height="7" rx="2"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg></span>}>
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
        <Tab label="International License" icon={<span aria-label="Global License" className="inline-block"><svg width="24" height="24" fill="none" stroke="#F57C00" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><ellipse cx="12" cy="12" rx="4" ry="10"/><path d="M2 12h20"/></svg></span>}>
          <div className="bg-white border border-[#F57C00]/20 rounded-lg p-6 shadow-sm flex flex-col items-center text-center max-w-md mx-auto">
            <h3 className="font-medium text-lg mb-2">International Driver’s License Assistance</h3>
            <p className="text-2xl font-bold text-[#F57C00]">₱6,200</p>
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
