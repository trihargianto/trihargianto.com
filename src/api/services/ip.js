import axios from "axios"

export const getIpAddress = async () => {
  try {
    let result = await axios("https://www.cloudflare.com/cdn-cgi/trace")

    // Convert key-value pairs to JSON
    // https://stackoverflow.com/a/39284735/452587
    result = result.data
      .trim()
      .split("\n")
      .reduce(function (obj, pair) {
        pair = pair.split("=")
        return (obj[pair[0]] = pair[1]), obj
      }, {})

    return result.ip
  } catch (err) {
    console.error(err)

    return null
  }
}
