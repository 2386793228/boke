export function readTextFile(fileName: any): Promise<string> {
  return new Promise((resolve) => {
    var rawFile = new XMLHttpRequest()
    rawFile.open('GET', fileName, false)
    rawFile.onreadystatechange = function () {
      if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status == 0) {
          var allText = rawFile.responseText
          resolve(allText)
        }
      }
    }
    rawFile.send(null)
  })
}
