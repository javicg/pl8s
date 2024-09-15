const validator = require('./validator')
const es = require('./es')

describe("spanish plates", () => {
  describe("current system", () => {
    function valid(plate) {
      test("[OK] "+plate, () => {
        expect(validator.validateAgainstTemplate(plate, es.current)).toBe(true)
      })
    }

    function invalid(plate) {
      test("[NOK] "+plate, () => {
        expect(validator.validateAgainstTemplate(plate, es.current)).toBe(false)
      })
    }

    valid("1234BBC")

    invalid("123BBC")
    invalid("12345BBC")

    invalid("1234BB")
    invalid("1234BBCD")
    invalid("1234AEI")

    invalid("XX1234BBC")
    invalid("1234BBCYY")
  })

  describe("provincial system (1970-2000)", () => {
    function valid(plate) {
      test("[OK] "+plate, () => {
        var singleLetter = validator.validateAgainstTemplate(plate, es._1970A)
        var doubleLetter = validator.validateAgainstTemplate(plate, es._1970AA)

        expect(singleLetter || doubleLetter).toBe(true)
      })
    }

    function invalid(plate) {
      test("[NOK] "+plate, () => {
        var singleLetter = validator.validateAgainstTemplate(plate, es._1970A)
        var doubleLetter = validator.validateAgainstTemplate(plate, es._1970AA)

        expect(singleLetter || doubleLetter).toBe(false)
      })
    }

    valid("PO9385BH")
    valid("SE1234DL")
    valid("M0001AC")
    valid("MA0001AC")
    valid("GC7777AC")

    invalid("G7777AC")
    invalid("ÑA0001AC")
    invalid("QA0001AC")
    invalid("RA0001AC")

    invalid("SE1234QL")
    invalid("SE1234ÑL")
    invalid("SE1234RL")

    invalid("SE1234DA")
    invalid("SE1234DE")
    invalid("SE1234DI")
    invalid("SE1234DO")
  })

  describe("provincial system (1900-1970)", () => {
    function valid(plate) {
      test("[OK] "+plate, () => {
        expect(validator.validateAgainstTemplate(plate, es._1900)).toBe(true)
      })
    }

    function invalid(plate) {
      test("[NOK] "+plate, () => {
        expect(validator.validateAgainstTemplate(plate, es._1900)).toBe(false)
      })
    }

    valid("A1")
    valid("A100000")
    valid("CAS100000")

    invalid("M0001")
    invalid("M1234567")
  })
})
