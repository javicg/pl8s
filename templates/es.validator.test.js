const utils = require('./test_utils')

describe("spanish plates", () => {
  describe("current system", () => {
    const {valid, invalid} = utils.testAgainst('./es_2000.json')

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
    describe('single-letter ending', () => {
      const {valid, invalid} = utils.testAgainst('./es_1970A.json')

      valid("PO9385B")
      valid("SE1234D")
      valid("M0001A")
      valid("MA0001C")
      valid("GC7777A")

      invalid("ÑA0001A")
      invalid("QA0001A")
      invalid("RA0001A")

      invalid("SE1234Q")
      invalid("SE1234Ñ")
      invalid("SE1234R")
    })

    describe('double-lettre ending', () => {
      const {valid, invalid} = utils.testAgainst('./es_1970AA.json')

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
  })

  describe("provincial system (1900-1970)", () => {
    const {valid, invalid} = utils.testAgainst('./es_1900.json')

    valid("A1")
    valid("A100000")
    valid("CAS100000")

    invalid("M0001")
    invalid("M1234567")
  })
})
