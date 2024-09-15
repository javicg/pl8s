const validator = require('./validator')
const be = require('./be')

describe("belgian plates", () => {
  describe("current system", () => {
    function valid(plate) {
      test("[OK] "+plate, () => {
        expect(validator.validateAgainstTemplate(plate, be.current)).toBe(true)
      })
    }

    function invalid(plate) {
      test("[NOK] "+plate, () => {
        expect(validator.validateAgainstTemplate(plate, be.current)).toBe(false)
      })
    }

    valid("1AAA111")

    // FIXME Valid on older systems, but not the new one
    // Tests should use a particular system, without fallbacks
    invalid("AAA111")

    invalid("1AA111")
    invalid("1111")
    invalid("1AAA11")
    invalid("1AAA")

    invalid("11AAA111")
    invalid("1AAAA111")
    invalid("1AAA1111")
  })

  describe("2008", () => {
    function valid(plate) {
      test("[OK] "+plate, () => {
        expect(validator.validateAgainstTemplate(plate, be._2008)).toBe(true)
      })
    }

    function invalid(plate) {
      test("[NOK] "+plate, () => {
        expect(validator.validateAgainstTemplate(plate, be._2008)).toBe(false)
      })
    }

    valid("123ABC")

    invalid("12ABC")
    invalid("123AB")
    invalid("123")
    invalid("ABC")

    invalid("1234ABC")
    invalid("123ABCD")
    invalid("1234ABCD")
  })

  describe("1973", () => {
    function valid(plate) {
      test("[OK] "+plate, () => {
        expect(validator.validateAgainstTemplate(plate, be._1973)).toBe(true)
      })
    }

    function invalid(plate) {
      test("[NOK] "+plate, () => {
        expect(validator.validateAgainstTemplate(plate, be._1973)).toBe(false)
      })
    }

    valid("ABC123")

    invalid("ABC12")
    invalid("AB123")
    invalid("ABC")
    invalid("123")

    invalid("ABC1234")
    invalid("ABCD123")
    invalid("ABCD1234")
  })

  describe("1971", () => {
    function valid(plate) {
      test("[OK] "+plate, () => {
        expect(validator.validateAgainstTemplate(plate, be._1971)).toBe(true)
      })
    }

    function invalid(plate) {
      test("[NOK] "+plate, () => {
        expect(validator.validateAgainstTemplate(plate, be._1971)).toBe(false)
      })
    }

    valid("A123A")

    invalid("123A")
    invalid("A123")
    invalid("A12A")

    invalid("AA")
    invalid("123")
    invalid("123AA")
    invalid("AA123")
  })
})
