const validator = require('./validator')

describe("belgian plates", () => {
  describe("current system", () => {
      valid("1AAA111")

      invalid("AAA111")
      invalid("1AA111")
      invalid("1111")
      invalid("1AAA11")
      invalid("1AAA")

      invalid("11AAA111")
      invalid("1AAAA111")
      invalid("1AAA1111")
  })
})

function valid(plate) {
  test("[OK] "+plate, () => {
    expect(validator.validate("BE", plate)).toBe(true)
  })
}

function invalid(plate) {
  test("[NOK] "+plate, () => {
    expect(validator.validate("BE", plate)).toBe(false)
  })
}
