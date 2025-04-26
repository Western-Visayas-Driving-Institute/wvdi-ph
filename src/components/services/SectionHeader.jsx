import React from "react";

const SectionHeader = ({ title }) => (
  <header className="mb-8 text-center">
    <h2 className="text-3xl md:text-4xl font-bold text-[#F57C00] mb-2 tracking-tight drop-shadow-sm">
      {title}
    </h2>
    <p className="text-lg text-[#333] font-medium mt-2">
      From classroom confidence to road-ready skills—choose the plan that fits your journey.
    </p>
    <p className="text-sm text-[#333] mt-1 opacity-80">
      All fees include LTO-compliant training hours and use of training vehicles. Schedule flexibility available.
    </p>
  </header>
);

export default SectionHeader;
