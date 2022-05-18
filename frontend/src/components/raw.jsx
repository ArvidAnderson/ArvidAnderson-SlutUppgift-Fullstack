export default function Raw({ data }) {
  return (
    <div className="flex w-full h-full place-content-center place-items-center">
      <textarea
        readOnly
        value={JSON.stringify(data, undefined, 4)}
        className="resize-none textarea textarea-secondary w-full h-full"
        placeholder="{ id: 1, name: Arvid Anderson, age: 19 }">
      </textarea>
    </div>
  )
}
