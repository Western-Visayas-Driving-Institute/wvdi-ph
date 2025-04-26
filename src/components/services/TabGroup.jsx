import React, { useState } from "react";

const TabGroup = ({ defaultTab, children }) => {
  const tabs = React.Children.toArray(children).filter(child => child.type && child.type.displayName === "Tab");
  const [activeTab, setActiveTab] = useState(defaultTab || (tabs[0] && tabs[0].props.label));

  return (
    <div className="w-full">
      <div role="tablist" aria-label="Service Tabs" className="flex flex-wrap md:flex-nowrap border-b border-[#F57C00]/30 mb-6 gap-2 md:gap-4 bg-[#FFF3E0] rounded-xl p-2 shadow-sm">
        {tabs.map(tab => (
          <button
            key={tab.props.label}
            role="tab"
            aria-selected={activeTab === tab.props.label}
            aria-controls={`tab-panel-${tab.props.label}`}
            tabIndex={activeTab === tab.props.label ? 0 : -1}
            className={`px-4 py-2 text-base md:text-lg font-semibold transition-colors duration-200 border-b-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F57C00] ${activeTab === tab.props.label ? 'border-[#F57C00] text-[#F57C00] bg-white shadow' : 'border-transparent text-[#333] bg-transparent hover:bg-[#F57C00]/10'}`}
            onClick={() => setActiveTab(tab.props.label)}
          >
            {tab.props.icon && <span className="inline-block mr-2 align-middle">{tab.props.icon}</span>}
            {tab.props.label}
          </button>
        ))}
      </div>
      <div>
        {tabs.map(tab => (
          <div
            key={tab.props.label}
            id={`tab-panel-${tab.props.label}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab.props.label}`}
            hidden={activeTab !== tab.props.label}
            className="transition-all duration-300"
          >
            {tab.props.children}
          </div>
        ))}
      </div>
    </div>
  );
};

const Tab = ({ label, icon, children }) => <>{children}</>;
Tab.displayName = "Tab";

export { TabGroup as default, Tab };
