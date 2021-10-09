function addMarks(jsonObj) {
  if (Array.isArray(jsonObj)) {
    for (const item of jsonObj) {
      if (typeof item === 'object' && item) {
        addMarks(item)
      }
    }
  } else {
    for (const key in jsonObj) {
      if (Object.hasOwnProperty.call(jsonObj, key)) {
        jsonObj['<' + key + '>'] = jsonObj[key]
        if (typeof jsonObj[key] === 'object' && jsonObj[key]) {
          addMarks(jsonObj[key])

        }
        delete jsonObj[key]
      }
    }
  }


}
function delQuotes(jsonStr) {
  let jsonObj = JSON.parse(jsonStr)
  addMarks(jsonObj)
  return JSON.stringify(jsonObj).replace(/"<|>"/g, "")

}

export {
  delQuotes
};

