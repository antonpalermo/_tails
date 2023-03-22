import { ReactElement, ReactNode } from "react"

import Head from "next/head"
import { NextPage } from "next"
import { AppProps as NextAppProps } from "next/app"

import "@styles/globals.css"

import CourseDetailsProvider from "@contexts/CourseDetails"

type PageLayout<P = {}, IP = P> = NextPage<P, IP> & {
  pageLayout?: (page: ReactElement) => ReactNode
}

type AppProps = NextAppProps & {
  Component: PageLayout
}

export default function MainApp({ Component, pageProps }: AppProps) {
  const getLayout = Component.pageLayout ?? ((page: ReactElement) => page)

  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CourseDetailsProvider>
        {getLayout(<Component {...pageProps} />)}
      </CourseDetailsProvider>
    </>
  )
}
