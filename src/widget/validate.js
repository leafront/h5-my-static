const validate = {
  /**
   * @param {string} phone
   * @return {boolean}
   */
  isMobile (text) {

    const pattern = /^1[3-9]\d{9}$/

    return pattern.test(text)

  },
  /**
   * 邮箱验证
   * @param {string} email
   * @return {boolean}
   * @example
   * validate.isEmail('leafront@126.com')
   */
  isEmail (text) {

    const pattern = /^([a-zA-Z0-9]+[-_.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[-_.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,6}$/

    return pattern.test(text)
  },
  /**
   * @param {string} zipCode
   * @returns {boolean}
   * @example
   * Lizard.isZipCode('430406')
   */
  isZipCode (text){

    const pattern = /^[0-9]{6}$/;

    return pattern.test(text);
  }
}

export default validate
