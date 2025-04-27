import React from "react";
import CourseTable from "../services/CourseTable";
import PriceList from "../services/PriceList";

const CoursesSection = ({ 
  drivingLesson, 
  onSiteLecture, 
  theoreticalLecture 
}) => (
  <section id="courses" className="wvdi-courses max-w-5xl mx-auto px-6 py-16 md:py-20 bg-white rounded-lg shadow-md border border-[#e0e0e0] mt-16 mb-24 relative z-10 scroll-mt-20">
    <header className="mb-12 text-center">
      <h2 className="text-3xl md:text-4xl font-extrabold text-[#141f54] mb-3 tracking-tight drop-shadow-sm">
        Driving Courses &amp; Services
      </h2>
      <div className="w-16 h-1 mx-auto mb-6 rounded-full bg-[#a00c0c]"></div>
      <p className="text-lg text-[#141f54] font-medium mt-4 max-w-3xl mx-auto">
        WVDI offers comprehensive driving education packages designed to meet LTO requirements and develop your skills on the road.
      </p>
    </header>
    {/* ...rest of the UnifiedCoursesSection content... */}
  </section>
);

export default CoursesSection;
