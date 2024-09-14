const validator = require('./validator')

describe("spanish plates", () => {
  describe("current system", () => {
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
    valid("A1")
    valid("A100000")
    valid("CAS100000")

    invalid("M0001")
    invalid("M1234567")
  })
})

function valid(plate) {
  test("[OK] "+plate, () => {
    expect(validator.validate("ES", plate)).toBe(true)
  })
}

function invalid(plate) {
  test("[NOK] "+plate, () => {
    expect(validator.validate("ES", plate)).toBe(false)
  })
}
