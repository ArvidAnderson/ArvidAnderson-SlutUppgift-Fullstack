import axios from "axios"
import { useState } from "react"

export default function DemoApi() {
  //Predefined Values & User Interactable States
  const methods = [
    {
      method: "GET",
      scope: "Collection"
    },
    {
      method: "GET",
      scope: "Resource"
    },
    {
      method: "POST",
      scope: "Collection"
    },
    {
      method: "PUT",
      scope: "Resource"
    },
    {
      method: "PATCH",
      scope: "Resource"
    },
    {
      method: "DELETE",
      scope: "Resource"
    }
  ]
  const [ selectedMethod, setSelectedMethod ] = useState(methods[0])
  
  const [ inputJson, setInputJson ] = useState("")

  const tabs = ["Raw", "Graphical"]
  const [ activeTab, setActiveTab ] = useState("Raw")

  //API Related States
  const [ fetchRelated, setfetchRelated ] = useState({
    loading: false,
    status: 0,
    data: {}
  })

  const decideScopeForRequest = (apiUrl, scope, pathParameter) => {
    if(scope == "Resource") {
      apiUrl = apiUrl + "/" + pathParameter
    }
    if(scope == "Collection") {
      apiUrl = apiUrl
    }
    return apiUrl
  }

  //Calling the api.....
  const onRequestSubmit = async () => {
    setfetchRelated({...fetchRelated, loading: true})
    console.log("Submitting request to the api...")
    let apiUrl = "https://jsonplaceholder.typicode.com/todos"
    let pathParameter = 3
    let method = selectedMethod.method
    let scope = selectedMethod.scope
    let json = JSON.stringify(inputJson)
    console.log("Data:", {method: method, json: json})

    //Decide scope for API URL
    apiUrl = decideScopeForRequest(apiUrl, scope, pathParameter)
    console.log(apiUrl)

    //Perfrom request
    let response = await axios({
      method: method.toLowerCase(),
      url: apiUrl,
      data: json
    })

    setfetchRelated({...fetchRelated, loading: false, status: response.status, data: response.data})
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
              <select onChange={(e) => setSelectedMethod(methods[e.target.value])} defaultValue={"Select request method.."} className="select select-secondary w-full">
                <option disabled>Select request method..</option>
                {methods.map((method) => (
                  <option key={method.method + method.scope} value={methods.indexOf(method)}>{`${method.method} | ${method.scope}`}</option>
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
            {Object.keys(fetchRelated.data).length == 0  ? (
              <div className="flex justify-center items-center w-full">
                <h1 className="text-xl text-semibold">Perform a request to display data.</h1>
              </div>
            ) : (
              <>
                {/* Raw */}
                {activeTab === tabs[0] && (
                  <div className="flex w-full h-full place-content-center place-items-center">
                    <textarea
                      readOnly
                      value={JSON.stringify(fetchRelated.data)} 
                      className="resize-none textarea textarea-secondary w-full h-full"
                      placeholder="{ id: 1, name: Arvid Anderson, age: 19 }">
                      
                    </textarea>
                  </div>
                )}
                {/* Graphical */}
                {activeTab === tabs[1] && (
                  <div className="flex w-full h-full">
                    <div className="card bg-secondary w-full h-full shadow-xl">
                      <div className="card-body">
                        <h2 className="card-title">{fetchRelated.data.title}</h2>
                        <p>Todo Description</p>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

      </div>      
    </div>
  )
}
