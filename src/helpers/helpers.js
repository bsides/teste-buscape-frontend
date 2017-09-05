const syncify = async fn => {
  try {
    const result = await fn()
    return () => {
      return result
    }
  } catch (e) {
    return () => {
      throw e
    }
  }
}

export async function asyncFetch(url, requestConfig = {}) {
  const response = await fetch(url, requestConfig)

  const isSuccess = response.status >= 200 && response.status < 300

  if (isSuccess) {
    const result = await response.json()
    return result
  }

  throw new [response.statusText, response.status]()
}

export default {
  syncify
}
