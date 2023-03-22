import { useCourseDetails } from "@contexts/CourseDetails"
import { Doc } from "@prisma/client"
import fetcher from "@utils/fetcher"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { HTMLAttributes, useEffect, useState } from "react"

export type LayoutProps = HTMLAttributes<HTMLDivElement> & {
  title?: string
}

export default function Layout({ title, ...props }: LayoutProps) {
  const router = useRouter()
  const [docs, setDocs] = useState<Pick<Doc, "id" | "title">[]>([])
  const { selectedCourse } = useCourseDetails()

  function viewDoc(doc: string) {
    router.push({
      pathname: `/drafts/[cid]/[doc]`,
      query: { ...router.query, doc }
    })
  }

  function viewDetails(cid: string) {
    router.push({
      pathname: "/drafts/[cid]",
      query: { cid }
    })
  }

  useEffect(() => {
    fetcher(`/api/courses/${selectedCourse}/docs`).then(({ data }) => {
      if (data) {
        setDocs(data as Pick<Doc, "id" | "title">[])
      }
    })
  }, [])

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>

      <div>
        <button onClick={() => viewDetails("clfbv49jp0000vjkg2gdcllz5")}>
          details
        </button>
        <h2>docs</h2>

        {docs.map(doc => (
          <div>
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
