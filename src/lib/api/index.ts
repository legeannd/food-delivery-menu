export async function request(url: string) {
  const host = process.env.NEXT_PUBLIC_API_ENDPOINT
  const normalizedUrl = url?.startsWith('/') ? url.replace('/', '') : url
  const endpoint = `${host}/${normalizedUrl}`

  const response = await fetch(endpoint).then(response => response.json())
  return response
}