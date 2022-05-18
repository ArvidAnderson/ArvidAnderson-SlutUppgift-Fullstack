import axios from "axios"
import { useState } from "react"
import Graphical from "./graphical"
import Raw from "./raw"
import Tabs from "./tabs"

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
    loading: null,
    status: 0,
    data: {},
    method: null
  })

  //Timeout functioon
  function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
  } 

  //Function for deciding scope
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

    await timeout(2000)
    setfetchRelated({...fetchRelated, loading: false, status: response.status, data: response.data, method: method.toLowerCase()})
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
                placeholder="Input json to forward to the api on request">
              </textarea>
            </div>
            {/* Send Request Button*/}
            <div className="mt-3">
              {fetchRelated.loading && (<button class="btn loading w-full md:w-52">Sending Request</button>)}
              {!fetchRelated.loading && (
                <button onClick={onRequestSubmit} className="btn btn-success w-full flex md:w-52">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                  Send Request
                </button>
              )}
            </div>
          </div>
        </div> 

        {/* Divider */}
        <div className="divider lg:divider-horizontal"></div> 

        {/* Results */}
        <div className="grid flex-grow card bg-base-300 rounded-box p-3">
          {/* Tabs */}
          <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="flex h-72">
            {/* Make sure a fetch has been done */}
            {Object.keys(fetchRelated.data).length == 0  ? (
              <div className="flex justify-center items-center w-full">
                <h1 className="text-xl text-semibold text-center">Perform a request to display data.</h1>
              </div>
            ) : (
              <>
                {fetchRelated.loading ? (
                  <div className="flex justify-center items-center w-full">
                    <progress class="progress w-96"></progress>
                  </div>
                ) : (
                  <div className="flex w-full">
                  {/* Raw */}
                  {activeTab === tabs[0] && (
                    <Raw data={fetchRelated.data}/>
                  )}

                  {/* Graphical */}
                  {activeTab === tabs[1] && (
                    <Graphical data={fetchRelated.data} method={fetchRelated.method}/>
                  )}
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
