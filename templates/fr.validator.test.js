const utils = require('./test_utils')

describe("french plates", () => {
  describe("current system", () => {
    const {valid, invalid} = utils.testAgainst('./fr_siv.json')

    valid("AN154TS")

    valid("KK123AA")
    valid("AA123KK")
    valid("PD123AA")
    valid("AA123PD")
    valid("PQ123AA")
    valid("AA123PQ")
    valid("QQ123AA")
    valid("AA123QQ")
    valid("WC123AA")
    valid("AA123WC")

    invalid("AI123AA")
    invalid("AO123AA")
    invalid("AU123AA")
    invalid("AA123AI")
    invalid("AA123AO")
    invalid("AA123AU")

    invalid("A123AA")
    invalid("123AA")
    invalid("AA12AA")
    invalid("AA1AA")
    invalid("AA123A")
    invalid("AA123")
  })
})
