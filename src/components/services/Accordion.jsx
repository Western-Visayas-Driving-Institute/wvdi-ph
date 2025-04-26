import React from "react";

const Accordion = ({ children, slim }) => (
  <div className={`w-full ${slim ? 'space-y-2' : 'space-y-4'}`}>{children}</div>
);

const AccordionItem = ({ title, children }) => {
  const id = title.replace(/\s+/g, '-').toLowerCase();
  return (
    <details className="group bg-[#FFF8E1] border border-[#F57C00]/20 rounded-lg transition-shadow duration-300 focus-within:shadow-lg mb-2">
      <summary
        className="cursor-pointer select-none px-4 py-3 text-base md:text-lg font-semibold flex items-center justify-between text-[#333] hover:text-[#F57C00] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F57C00]"
        aria-controls={id}
        aria-expanded="false"
      >
        <span>{title}</span>
        <svg className="w-4 h-4 ml-2 transition-transform group-open:rotate-180" fill="none" stroke="#F57C00" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
      </summary>
      <div id={id} className="px-4 pb-3 pt-1 text-[#333]">
        {children}
      </div>
    </details>
  );
};

export { Accordion as default, AccordionItem };
