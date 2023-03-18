import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { HTMLAttributes } from "react"

export type LayoutProps = HTMLAttributes<HTMLDivElement> & {
  title?: string
}

export default function Layout({ title, ...props }: LayoutProps) {
  const router = useRouter()

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
        <button onClick={() => viewDoc("1")}>1</button>
        <button onClick={() => viewDoc("2")}>2</button>
        <button onClick={() => viewDoc("3")}>3</button>
      </div>
      <div {...props} />
    </div>
  )
}
