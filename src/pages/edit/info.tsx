import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function CourseInfo() {
  const [details, setDetails] = useState()

  useEffect(() => {
    const currentCourse = JSON.parse(window.sessionStorage.getItem("current"))
    fetch(`/api/courses/${currentCourse}`)
      .then(res => res.json())
      .then(data => setDetails(data))
  }, [])

  return (
    <div>
      <h1>Course Editor</h1>
      {JSON.stringify(details)}
    </div>
  )
}
