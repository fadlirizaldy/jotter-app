import { useState } from "react";
import PropTypes from "prop-types";

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].label);

  return (
    <div>
      <div className="flex border-b">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            className={`px-4 py-2 -mb-px text-sm font-medium text-center border-b-2 
              ${
                activeTab === tab.label
                  ? "border-emerald-500 text-emerald-500 dark:border-emerald-200 dark:text-emerald-200"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-white"
              }`}
            onClick={() => setActiveTab(tab.label)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="py-4 px-2">
        {tabs.map(
          (tab) =>
            activeTab === tab.label && <div key={tab.label}>{tab.content}</div>
        )}
      </div>
    </div>
  );
};

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      content: PropTypes.element.isRequired,
    })
  ).isRequired,
};

export default Tabs;
