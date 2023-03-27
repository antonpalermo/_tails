import { useCourseDetails } from "@contexts/CourseDetails"
import { Doc, Prisma } from "@prisma/client"
import fetcher from "@utils/fetcher"
import Head from "next/head"
import { useRouter } from "next/router"
import { HTMLAttributes, useEffect, useState } from "react"

export type LayoutProps = HTMLAttributes<HTMLDivElement> & {
  title?: string
}

type CourseDoc = Prisma.DocGetPayload<{ select: { title: true; id: true } }>

export default function Layout({ title, ...props }: LayoutProps) {
  const router = useRouter()
  const [docs, setDocs] = useState<CourseDoc[]>([])
  const { selectedCourse } = useCourseDetails()

  function viewDoc(doc: string) {
    router.push({
      pathname: `/courses/[course]/[doc]`,
      query: { ...router.query, doc }
    })
  }

  function viewDetails(course: string) {
    router.push({
      pathname: `/courses/${course}`
    })
  }

  useEffect(() => {
    fetcher<CourseDoc[]>(`/api/courses/${selectedCourse}/docs`).then(
      ({ data }) => {
        if (data) {
          setDocs(data)
        }
      }
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>

      <div>
        <button onClick={() => viewDetails(selectedCourse)}>details</button>
        <h2>docs</h2>

        {docs.map(doc => (
          <div key={doc.id}>
            <button key={doc.id} onClick={() => viewDoc(doc.id)}>
              {doc.title}
            </button>
          </div>
        ))}
      </div>
      <div {...props} />
    </div>
  )
}