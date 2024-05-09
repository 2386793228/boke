export function readTextFile(fileName: any): Promise<string> {
  return new Promise((resolve, reject) => {
    var rawFile = new XMLHttpRequest()
    var filePath = location.origin + '/' + fileName
    rawFile.open('GET', fileName, false)
    rawFile.onreadystatechange = function () {
      // console.log(rawFile.readyState )
      if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status == 0) {
          var allText = rawFile.responseText
          // console.log(666.20001, allText, location)
          resolve(allText)
        }
      }
    }
    rawFile.send(null)
  })
}
