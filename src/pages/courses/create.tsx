import { Course } from "@prisma/client"
import { Form, Formik, FormikHelpers } from "formik"
import useSWRMutation, { MutationFetcher } from "swr/mutation"

import fetcher from "@utils/fetcher"

import Input from "@components/Input"
import Textarea from "@components/Textarea"
import FormControl from "@components/FormControl"

interface CourseDetails {
  name: string
  description: string
}

interface CourseDetailsFormProps {
  onSubmit: (
    values: CourseDetails,
    helpers: FormikHelpers<CourseDetails>
  ) => void
}

function CourseDetailsForm({ onSubmit }: CourseDetailsFormProps) {
  const initialData: CourseDetails = {
    name: "",
    description: ""
  }

  return (
    <Formik initialValues={initialData} onSubmit={onSubmit}>
      {({ values, isSubmitting, handleChange }) => (
        <Form>
          <FormControl>
            <label
              htmlFor="name"
              className="block mb-2 text-gray-500 font-medium"
            >
              Name
            </label>
            <Input
              name="name"
              autoComplete="off"
              type="text"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <label
              htmlFor="description"
              className="block mb-2 text-gray-500 font-medium"
            >
              Description
            </label>
            <Textarea name="description" rows={5} onChange={handleChange} />
          </FormControl>
          <button type="submit" disabled={isSubmitting}>
            Create
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default function CreateCourse() {
  async function onSubmit(
    values: CourseDetails,
    helpers: FormikHelpers<CourseDetails>
  ) {
    const { data } = await fetcher("/api/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    })
  }

  return (
    <div className="w-4/12 mx-auto">
      <h1 className="font-bold text-4xl leading-relaxed tracking-tight text-gray-800">
        Create new
      </h1>
      <p className="font-medium text-gray-500 leading-relaxed mb-5">
        Create and design a course tailored for your students needs and
        requirements.
      </p>
      <CourseDetailsForm onSubmit={onSubmit} />
    </div>
  )
}
