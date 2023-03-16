export default async function fetcher(
  input: RequestInfo | URL,
  init?: RequestInit
) {
  const request = await fetch(input, init)
  return await request.json()
}
