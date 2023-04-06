import { useField } from "formik"
import { TextareaHTMLAttributes } from "react"

export interface InputProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string
}

export default function Textarea({ ...props }: InputProps) {
  const [fields, meta] = useField({ ...props })

  // TODO: add styles here
  return (
    <>
      <textarea
        className="w-full rounded-md border-gray-300"
        {...fields}
        {...props}
      />
      {meta.touched && meta.error ? <span>{meta.error}</span> : null}
    </>
  )
}
