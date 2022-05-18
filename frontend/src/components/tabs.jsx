export default function Tabs({ tabs, activeTab, setActiveTab }) {
  return (
    <div className="tabs tabs-boxed mb-2">
      {tabs.map((tab) => (
        <button key={tabs.indexOf(tab)} onClick={() => setActiveTab(tab)} className={activeTab === tab ? "tab tab-lg tab-active" : "tab tab-lg"}>{tab}</button>
      ))}
    </div>
  )
}
