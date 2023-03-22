import { useSessionStorage } from "react-use"
import { createContext, ReactNode, useContext } from "react"

interface CourseDetails {
  selectedCourse: string
  setSelectedCourse: (value: string) => void
}

const CourseDetailsContext = createContext<null | CourseDetails>(null)

export interface CourseDetailsProviderProps {
  children: ReactNode
}

export function useCourseDetails() {
  const context = useContext(CourseDetailsContext)
  if (context === null) {
    throw new Error("useCourseDetails possibly null or undefined")
  }
  return context
}

export default function CourseDetailsProvider({
  children
}: CourseDetailsProviderProps) {
  const [selectedCourse, setSelectedCourse] =
    useSessionStorage<string>("selectedCourse")

  return (
    <CourseDetailsContext.Provider
      value={{
        selectedCourse,
        setSelectedCourse
      }}
    >
      {children}
    </CourseDetailsContext.Provider>
  )
}
