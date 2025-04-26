import React, { useState } from "react";

const NestedTabGroup = ({ defaultTab, children }) => {
  const tabs = React.Children.toArray(children).filter(child => child.type && child.type.displayName === "NestedTab");
  const [activeTab, setActiveTab] = useState(defaultTab || (tabs[0] && tabs[0].props.label));

  return (
    <div className="w-full mb-4">
      <div role="tablist" aria-label="Vehicle Tabs" className="flex flex-wrap md:flex-nowrap border-b border-[#141f54]/20 mb-2 gap-2 bg-[#f5f5f5] rounded-lg p-1 shadow-sm">
        {tabs.map(tab => (
          <button
            key={tab.props.label}
            role="tab"
            aria-selected={activeTab === tab.props.label}
            aria-controls={`nested-tab-panel-${tab.props.label}`}
            tabIndex={activeTab === tab.props.label ? 0 : -1}
            className={`px-3 py-1 text-base font-medium transition-colors duration-200 border-b-2 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a00c0c] ${activeTab === tab.props.label ? 'border-[#a00c0c] text-[#141f54] bg-white shadow' : 'border-transparent text-[#141f54] bg-transparent hover:bg-[#a00c0c]/10'}`}
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
            id={`nested-tab-panel-${tab.props.label}`}
            role="tabpanel"
            aria-labelledby={`nested-tab-${tab.props.label}`}
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

const NestedTab = ({ label, icon, children }) => <>{children}</>;
NestedTab.displayName = "NestedTab";

export { NestedTabGroup as default, NestedTab };
