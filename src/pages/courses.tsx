export default function Courses() {
  async function createNewCourse() {
    const req = await fetch("/api/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Untitled Course" })
    })

    const course = await req.json()
    // TODO: mutate list
    console.log(course)
  }

  return (
    <div>
      <h1>Courses</h1>
      <button onClick={createNewCourse}>create</button>
    </div>
  )
}
