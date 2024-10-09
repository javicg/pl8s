const utils = require('./test_utils')

describe("italian plates", () => {
  describe("current system", () => {
    const {valid, invalid} = utils.testAgainst('./it_1994.json')

    valid("AK514RH")
    valid("BA924NS")

    invalid("IA123AA")
    invalid("AI123AA")
    invalid("AA123IA")
    invalid("AA123AI")

    invalid("OA123AA")
    invalid("AO123AA")
    invalid("AA123OA")
    invalid("AA123AO")

    invalid("QA123AA")
    invalid("AQ123AA")
    invalid("AA123QA")
    invalid("AA123AQ")

    invalid("UA123AA")
    invalid("AU123AA")
    invalid("AA123UA")
    invalid("AA123AU")
  })
})
