export default async function asyncFetch(url, requestConfig = {}) {
  const response = await fetch(url, requestConfig)

  const isSuccess = response.status >= 200 && response.status < 300

  if (isSuccess) {
    return response
  }

  throw new [response.statusText, response.status]()
}
