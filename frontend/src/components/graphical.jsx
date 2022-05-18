export default function Graphical({ data }) {
  return (
    <div className="flex w-full h-full">
      <div className="card bg-secondary w-full h-full shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{data.title}</h2>
          <p>Todo Description</p>
        </div>
      </div>
    </div>
  )
}
