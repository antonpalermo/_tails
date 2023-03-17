export default async function fetcher(
  input: string | URL,
  init?: RequestInit
): Promise<Response> {
  const baseUrl = new URL(input, process.env.BASE_URL)
  return await fetch(baseUrl, init)
}
