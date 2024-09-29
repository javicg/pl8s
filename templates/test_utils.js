const validator = require('../validator/validator')
const fs = require('fs')

function testAgainst(templateName) {
  const templateData = fs.readFileSync(require.resolve(templateName), {encoding: "utf8"})
  const template = JSON.parse(templateData)

  return {
    valid: (plate) => {
      test("[OK] "+plate, () => {
        expect(validator.validateAgainstTemplate(plate, template)).toBe(true)
      })
    },
    invalid: (plate) => {
      test("[NOK] "+plate, () => {
        expect(validator.validateAgainstTemplate(plate, template)).toBe(false)
      })
    }
  }
}

exports.testAgainst = testAgainst
