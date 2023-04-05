import fetcher from "@utils/fetcher"
import { Form, Formik, FormikHelpers } from "formik"
import { FormEvent } from "react"

interface CourseDetails {
  name: string
  description: string
}

export default function CourseCreate() {
  const initialData: CourseDetails = {
    name: "",
    description: ""
  }

  async function onSubmit(
    values: CourseDetails,
    helpers: FormikHelpers<CourseDetails>
  ) {
    const { data, error } = await fetcher("/api/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: values.name,
        description: values.description
      })
    })

    if (error && error.code === 405) {
      console.log(data)
    }
  }

  return (
    <div>
      <h1>Create new</h1>
      <Formik initialValues={initialData} onSubmit={onSubmit}>
        {({ values, isSubmitting, handleChange }) => (
          <Form>
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={values.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="name">Description</label>
              <input
                type="text"
                name="description"
                id="description"
                value={values.description}
                onChange={handleChange}
              />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Create
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
