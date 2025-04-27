import React, { useState } from "react";

const TabGroup = ({ defaultTab, children }) => {
  const tabs = React.Children.toArray(children).filter(child => child.type && child.type.displayName === "Tab");
  const [activeTab, setActiveTab] = useState(defaultTab || (tabs[0] && tabs[0].props.label));

  return (
    <div className="w-full p-3">
      <div role="tablist" aria-label="Service Tabs" className="flex flex-wrap justify-center md:flex-nowrap border-b border-[#141f54]/30 mb-6 gap-x-6 gap-y-3 bg-[#f5f5f5] rounded-lg p-3 shadow-sm">
        {tabs.map(tab => (
          <button
            key={tab.props.label}
            role="tab"
            aria-selected={activeTab === tab.props.label}
            aria-controls={`tab-panel-${tab.props.label}`}
            tabIndex={activeTab === tab.props.label ? 0 : -1}
            className={`px-5 py-3 text-base md:text-lg font-semibold transition-colors duration-200 border-b-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a00c0c] ${activeTab === tab.props.label ? 'border-[#a00c0c] text-[#141f54] bg-[#f5f5f5] shadow' : 'border-transparent text-[#141f54] bg-transparent hover:bg-[#a00c0c]/10'}`}
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
            className="transition-all duration-300 tab-panel no-checkmarks"
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
