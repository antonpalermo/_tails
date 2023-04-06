import { useField } from "formik"
import { InputHTMLAttributes } from "react"

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
}

export default function Input({ ...props }: InputProps) {
  const [fields, meta] = useField({ ...props })

  // TODO: add styles here
  return (
    <>
      <input
        className="w-full rounded-md border-gray-300"
        {...fields}
        {...props}
      />
      {meta.touched && meta.error ? <span>{meta.error}</span> : null}
    </>
  )
}
