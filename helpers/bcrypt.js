const bcrypt = require('bcryptjs')

const hashPassword = async (plain) => {
  return await bcrypt.hashSync(plain, 10)
}

const comparePassword = async (plain, hash) => {
  return await bcrypt.compareSync(plain, hash)
}

module.exports = {
  hashPassword,
  comparePassword
}