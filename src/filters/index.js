
const price = (value) => {
	if (!value || isNaN(value)) {
		value = '0'
	}
  return parseFloat(value).toFixed(2)
}

const httpsImg = (text) =>{
  const pattern = /http:\/\//
  return text.replace(pattern,'https://')
}

const hideMobile = (text) =>{
  const pattern = /^(\d{3})(\d{4})(\d{4})$/
  return text.replace(pattern,'$1****$3')
}

export default { price, hideMobile, httpsImg }
