import React from "react";
import coursesData from "../../data/courses.json";
import SectionHeader from "../services/SectionHeader";

function groupByGroup(data) {
  return data.reduce((acc, course) => {
    acc[course.group] = acc[course.group] || [];
    acc[course.group].push(course);
    return acc;
  }, {});
}

const GROUP_LABELS = {
  theoretical: "Theoretical Courses",
  practical: "Practical Driving (LTO-compliant)",
  "driving-lessons": "Driving Lessons – Skill Packages",
  other: "Other Services",
};

export default function PackagesSection() {
  const grouped = groupByGroup(coursesData);

  return (
    <section
      id="packages"
      className="wvdi-section wvdi-section-bg-white py-16 px-3 md:px-8 rounded-2xl max-w-5xl mx-auto my-16"
      style={{ boxShadow: "0 2px 12px rgba(20,31,84,0.05)", border: "1px solid #e0e0e0" }}
    >
      <header className="mb-10">
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <h2 className="wvdi-section-title wvdi-section-title-underline">Packages</h2>
        </div>
      </header>
      <div className="wvdi-packages-grid wvdi-packages-grid-margin p-8">
        {/* 1. Theory-only Courses */}
        <div className="wvdi-card wvdi-packages-card wvdi-packages-table-card">
          <h3 className="wvdi-section-title wvdi-packages-group-title" style={{fontWeight:700, fontSize:'1.05rem', marginBottom:'1.1rem', textAlign:'left'}}>1. Theory-only Courses</h3>
          <div className="wvdi-table-wrapper">
            <table className="wvdi-packages-table">
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Hours</th>
                  <th>Price (PHP)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><b>15-Hour Theoretical Driving Course (TDC, face-to-face)</b></td><td>15 h</td><td><b>1,000</b></td></tr>
                <tr><td>TDC (online)</td><td>15 h</td><td></td></tr>
                <tr><td>Defensive Driving Course</td><td>n/a</td><td><b>1,500</b></td></tr>
                <tr><td>Preventive-Maintenance Seminar</td><td>n/a</td><td></td></tr>
                <tr><td>Medical Examination</td><td>n/a</td><td><b>500</b></td></tr>
                <tr><td>Drug Test</td><td>n/a</td><td><b>1,200</b></td></tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* 2. Practical Driving Courses */}
        <div className="wvdi-card wvdi-packages-card wvdi-packages-table-card">
          <h3 className="wvdi-section-title wvdi-packages-group-title" style={{fontWeight:700, fontSize:'1.05rem', marginBottom:'1.1rem', textAlign:'left'}}>2. Practical Driving Courses – Assessment Only</h3>
          <div className="wvdi-table-wrapper">
            <table className="wvdi-packages-table">
              <thead>
                <tr>
                  <th>Vehicle type</th>
                  <th>Price (PHP)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Motorcycle</td><td><b>2,000</b></td></tr>
                <tr><td>Motorcycle + sidecar</td><td><b>2,500</b></td></tr>
                <tr><td>Motor vehicle (car)</td><td><b>4,000</b></td></tr>
              </tbody>
            </table>
            <div style={{fontSize:'0.95em', color:'#444', marginTop:'0.5em', fontStyle:'italic'}}>
              If you also offer an 8-hour Practical Driving Course (PDC) required by the LTO, its price still needs to be added.
            </div>
          </div>
        </div>
        {/* 3. Driving-Lesson Packages */}
        <div className="wvdi-card wvdi-packages-card wvdi-packages-table-card">
          <h3 className="wvdi-section-title wvdi-packages-group-title" style={{fontWeight:700, fontSize:'1.05rem', marginBottom:'1.1rem', textAlign:'left'}}>3. Driving-Lesson Packages</h3>
          {/* a) Motorcycle Riding */}
          <div style={{fontWeight:600, fontSize:'1em', marginBottom:'0.5em'}}>a) Motorcycle Riding</div>
          <div className="wvdi-table-wrapper">
            <table className="wvdi-packages-table">
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Hours</th>
                  <th>Manual (PHP)</th>
                  <th>Automatic (PHP)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Refresher</td><td>8</td><td>4,000</td><td>4,300</td></tr>
                <tr><td>Beginner</td><td>15</td><td>7,000</td><td>7,500</td></tr>
                <tr><td></td><td>20</td><td>9,000</td><td>9,500</td></tr>
              </tbody>
            </table>
          </div>
          {/* b) Motor-Vehicle (Sedan / SUV) */}
          <div style={{fontWeight:600, fontSize:'1em', margin:'1.2em 0 0.5em 0'}}>b) Motor-Vehicle (Sedan / SUV)</div>
          <div className="wvdi-table-wrapper">
            <table className="wvdi-packages-table">
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Hours</th>
                  <th>Sedan M (PHP)</th>
                  <th>Sedan A</th>
                  <th>SUV M</th>
                  <th>SUV A</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Refresher</td><td>8</td><td>6,500</td><td>6,900</td><td>7,800</td><td>8,200</td></tr>
                <tr><td></td><td>10</td><td>7,800</td><td>8,400</td><td>9,600</td><td>10,200</td></tr>
                <tr><td>Beginner</td><td>15</td><td>11,800</td><td>12,200</td><td>14,000</td><td>14,400</td></tr>
                <tr><td></td><td>20</td><td>15,400</td><td>15,900</td><td>18,000</td><td>19,000</td></tr>
                <tr><td>Master</td><td>25</td><td>18,000</td><td>19,000</td><td>22,000</td><td>23,500</td></tr>
                <tr><td></td><td>30</td><td>22,000</td><td>23,000</td><td>25,000</td><td>28,000</td></tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* 4. Other Services */}
        <div className="wvdi-card wvdi-packages-card wvdi-packages-table-card">
          <h3 className="wvdi-section-title wvdi-packages-group-title" style={{fontWeight:700, fontSize:'1.05rem', marginBottom:'1.1rem', textAlign:'left'}}>4. Other Services</h3>
          <div className="wvdi-table-wrapper">
            <table className="wvdi-packages-table">
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Price (PHP)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>International-driver-license assistance</td><td><b>6,200</b></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-8 wvdi-packages-cta-center">
        <a href="#contact" className="wvdi-cta wvdi-packages-cta">Contact us to book a package</a>
      </div>
    </section>
  );
}
