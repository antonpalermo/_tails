import useSWR from "swr"
import fetcher from "@utils/fetcher"

export default function usePublishedCourses<T>(
  published: boolean,
  fallbackData?: T
) {
  const { data, error, isLoading, mutate } = useSWR<T>(
    { url: "/api/courses", params: { published } },
    fetchCourses,
    { fallbackData }
  )

  async function fetchCourses(args: {
    url: string
    params: { published: boolean }
  }) {
    const { url, params } = args
    const { data, error } = await fetcher<T>(
      `${url}?published=${params.published}`
    )

    if (error) {
      throw new Error(error.message)
    }

    return data
  }

  return { data, error, isLoading, mutate }
}
