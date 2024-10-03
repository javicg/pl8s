const validator = require('../validator/validator')
const fs = require('fs')

exports.testAgainst = (templateName) => {
  const templateData = fs.readFileSync(require.resolve(templateName), {encoding: "utf8"})
  const template = JSON.parse(templateData)

  return {
    valid: (plate) => {
      test("[OK] "+plate, () => {
        expect(validator.__internal.validateAgainstTemplate(plate, template)).toBe(true)
      })
    },
    invalid: (plate) => {
      test("[NOK] "+plate, () => {
        expect(validator.__internal.validateAgainstTemplate(plate, template)).toBe(false)
      })
    }
  }
}
