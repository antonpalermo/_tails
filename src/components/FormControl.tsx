import { HTMLAttributes } from "react"

export interface FormControlProps extends HTMLAttributes<HTMLDivElement> {}

export default function FormControl({ ...props }: FormControlProps) {
  // TODO: add class styles here
  return <div className="mb-5" {...props} />
}
