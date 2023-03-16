import useSWR from "swr"

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
    const response = await fetch(
      `${args.url}?published=${args.params.published}`
    )
    return await response.json()
  }

  return { data, error, isLoading, mutate }
}
