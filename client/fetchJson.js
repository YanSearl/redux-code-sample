const HOST = 'http://localhost:3000'

export default function fetchJson (url, bodyJson) {
  return window.fetch(HOST + url, { method: 'POST', body: JSON.stringify(bodyJson) })
    .then((result) => result.json())
}