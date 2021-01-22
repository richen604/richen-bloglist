const info = (...params) => {
  //for jest testing purposes only
  /*if (process.env.NODE_ENV !== 'test') {
    console.log(...params)
    return
  }*/
  console.log(...params)
  return
}

const error = (...params) => {
  console.error(...params)
}

module.exports = {
  info,
  error,
}
