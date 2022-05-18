import { useState } from "react"

export default function DemoApi() {
  const tabs = ["Raw", "Graphical"]
  const [ activeTab, setActiveTab ] = useState("Raw")

  return (
    <div className="min-h-screen bg-base-400 flex justify-center items-center p-10">
      <div className="flex flex-col w-full lg:flex-row">
        <div className="grid h-32 flex-grow card bg-base-300 rounded-box place-items-center p-3">
          Send Request Inteface
        </div> 
        <div className="divider lg:divider-horizontal"></div> 
        <div className="grid flex-grow card bg-base-300 rounded-box p-3">
          {/* Tabs */}
          <div className="tabs tabs-boxed mb-2">
            {tabs.map((tab) => (
              <button key={tabs.indexOf(tab)} onClick={() => setActiveTab(tab)} className={activeTab === tab ? "tab tab-lg tab-active" : "tab tab-lg"}>{tab}</button> 
            ))}
          </div>
          {/* Raw */}
          {activeTab === tabs[0] && (
            <div>
              <textarea 
                className="textarea textarea-primary w-full"
                placeholder="{ id: 1, name: Arvid Anderson, age: 19 }">
                
              </textarea>
            </div>
          )}
          {/* Graphical */}
          <div>

          </div>
        </div>
      </div>      
    </div>
  )
}
