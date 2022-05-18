export default function Graphical({ data, method }) {
  return (
    <div className="flex w-full h-full">
      {data.length > 0 && method === "get" && (
        <div className="flex justify-center items-center w-full">
          <h1 className="text-xl text-semibold text-center">Cannot graphicaly display multiple todos..</h1>
        </div>
      )}
      {data.length === undefined && method === "get" && (
        <div className="card bg-secondary w-full h-full shadow-xl">
          <div className="card-body">
            <h2 className="card-title">{data.title}</h2>
            <p>{data.description}</p>
          </div>
        </div>
      )}
      {method === "delete" && (
        <div className="flex justify-center items-center w-full">
          <div class="alert alert-success shadow-lg">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>TODO has been deleted!</span>
            </div>
          </div>
        </div>        
      )}
    </div>
  )
}
