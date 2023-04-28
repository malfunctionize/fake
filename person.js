const Identity = require('fake-identity');
module.exports = async () => {
  return Identity.generate()
}
