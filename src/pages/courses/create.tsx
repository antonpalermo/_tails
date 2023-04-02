import fetcher from "@utils/fetcher"
import { FormEvent } from "react"

export default function CourseCreate() {
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const { data, error } = await fetcher("/api/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: "Introduction to APIs",
        description: "A complete introduction to computer programming!"
      })
    })

    if (error && error.code === 405) {
      console.log(data)
    }

    console.log(data)
  }

  return (
    <div>
      <h1>Create new</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" />
        </div>
        <div>
          <label htmlFor="name">Description</label>
          <input type="text" name="description" id="description" />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}
