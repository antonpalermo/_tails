async function fetcher<T>(
  url: string,
  options?: RequestInit
): Promise<{
  data?: T | undefined
  error?: { code: number; message: string } | undefined
}> {
  const baseURL =
    typeof window === "undefined" ? new URL(url, process.env.BASE_URL) : url

  const request = await fetch(baseURL, options)

  if (!request.ok) {
    return { error: { code: request.status, message: request.statusText } }
  }

  return { data: (await request.json()) as T, error: undefined }
}

export default fetcher
