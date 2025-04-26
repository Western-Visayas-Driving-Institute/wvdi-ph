import React from "react";

const Accordion = ({ children, slim }) => (
  <div className={`w-full ${slim ? 'space-y-2' : 'space-y-4'} bg-[#f5f5f5] border border-[#141f54]/20`}>{children}</div>
);

const AccordionItem = ({ title, children }) => {
  const id = title.replace(/\s+/g, '-').toLowerCase();
  return (
    <details className="group bg-[#f5f5f5] border border-[#141f54]/20 rounded-lg transition-shadow duration-300 focus-within:shadow-lg mb-2">
      <summary
        className="cursor-pointer select-none px-4 py-3 text-base md:text-lg font-semibold flex items-center justify-between text-[#141f54] hover:text-[#a00c0c] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a00c0c]"
        aria-controls={id}
        aria-expanded="false"
      >
        <span>{title}</span>
        {/* Remove giant chevron, use a small inline arrow instead */}
        <svg className="w-4 h-4 ml-2 transition-transform group-open:rotate-180" fill="none" stroke="#a00c0c" strokeWidth="3" viewBox="0 0 24 24" style={{ minWidth: 16, minHeight: 16, display: 'inline', verticalAlign: 'middle' }}><polyline points="6 9 12 15 18 9" /></svg>
      </summary>
      <div id={id} className="px-4 pb-3 pt-1 text-[#141f54]">
        {children}
      </div>
    </details>
  );
};

export { Accordion as default, AccordionItem };
