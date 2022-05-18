import { useState } from "react"

export default function DemoApi() {
  //Predefined Values & User Interactable States
  const methods = ["GET | Collection", "GET | Resource", "POST | Collection", "PUT | Resource", "PATCH | Resource", "DELETE | Resource"]
  const [ selectedMethod, setSelectedMethod ] = useState(methods[0])
  
  const [ inputJson, setInputJson ] = useState("")

  const tabs = ["Raw", "Graphical"]
  const [ activeTab, setActiveTab ] = useState("Raw")

  //API Response
  const [responseData, setResponseData] = useState([])

  //Calling the api.....
  const onRequestSubmit = async () => {
    console.log("Submitting request to the api...")
    let method = selectedMethod
    let json = inputJson
    console.log("Data:", {method: method, json: json})


  }

  return (
    <div className="min-h-screen bg-base-400 flex justify-center items-center p-10">
      <div className="flex flex-col w-full lg:flex-row">

        {/* Send Requuest */}
        <div className="grid flex-grow card bg-base-300 rounded-box place-items-center p-3">
          <div className="w-full">
            {/* API URL Placeholder */}
            <div className="flex w-full">
              <input readOnly value={process.env.NEXT_PUBLIC_API_URL} type="text" placeholder={process.env.NEXT_PUBLIC_API_URL} className="input input-bordered input-accent w-full" />
            </div>
            {/* Select method*/}
            <div className="flex w-full mt-3">
              <select onChange={(e) => setSelectedMethod(e.target.value)} defaultValue={"Select request method.."} className="select select-secondary w-full">
                <option disabled>Select request method..</option>
                {methods.map((method) => (
                  <option key={method} value={method}>{method}</option>
                ))}
              </select>
            </div>

            {/* Input Json / Text Area */}
            <div className="mt-3 flex w-full h-full place-content-center place-items-center">
              <textarea
                onChange={(e) => setInputJson(e.target.value)} 
                className="resize-none textarea textarea-secondary w-full h-full"
                placeholder="">
              </textarea>
            </div>
            {/* Send Request Button*/}
            <div className="mt-3">
              <button onClick={onRequestSubmit} className="btn btn-success w-full flex md:w-36">Send Request</button>
            </div>
          </div>
        </div> 

        {/* Divider */}
        <div className="divider lg:divider-horizontal"></div> 

        {/* Results */}
        <div className="grid flex-grow card bg-base-300 rounded-box p-3">
          {/* Tabs */}
          <div className="tabs tabs-boxed mb-2">
            {tabs.map((tab) => (
              <button key={tabs.indexOf(tab)} onClick={() => setActiveTab(tab)} className={activeTab === tab ? "tab tab-lg tab-active" : "tab tab-lg"}>{tab}</button> 
            ))}
          </div>
          <div className="flex h-72">
            {/* Raw */}
            {activeTab === tabs[0] && (
              <div className="flex w-full h-full place-content-center place-items-center">
                <textarea 
                  className="resize-none textarea textarea-secondary w-full h-full"
                  placeholder="{ id: 1, name: Arvid Anderson, age: 19 }">
                  
                </textarea>
              </div>
            )}
            {/* Graphical */}
            {activeTab === tabs[1] && (
              <div className="flex w-full h-full">
                <div class="card bg-secondary w-full h-full shadow-xl">
                  <div class="card-body">
                    <h2 class="card-title">Todo Title</h2>
                    <p>Todo Description</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>      
    </div>
  )
}
