
const price = (value) => {
  return parseFloat(isNaN(value) ? '' : value).toFixed(2)
}

const imgScale = function (url, width){
  const pattern = /http:\/\/.*?(gif|png|jpg)/gi
  if (url.indexOf('.jpg') > -1 || url.indexOf('.png') > -1) {
    const scaleImage = url.replace(pattern,(res) => {
      if (res.indexOf('http://cdn.oudianyun.com') > -1) {
        return `${res}@base@tag=imgScale&q=85&m=1&w=${width}`
      } else {
        return res
      }
    })
    return scaleImage
  } else {
    return url
  }
}

export default { price, imgScale }
