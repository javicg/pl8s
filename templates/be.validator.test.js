const utils = require('./test_utils')

describe("belgian plates", () => {
  describe("current system", () => {
    const {valid, invalid} = utils.testAgainst('./be_2010.json')

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

  describe("2008", () => {
    const {valid, invalid} = utils.testAgainst('./be_2008.json')

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
    const {valid, invalid} = utils.testAgainst('./be_1973.json')

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
    const {valid, invalid} = utils.testAgainst('./be_1971.json')

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
