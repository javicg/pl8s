const { validate } = require('./validator')

describe("validator works for all supported countries", () => {
  validateCountry("BE", "1ABC003")
  validateCountry("ES", "2008ZGZ")
})

function validateCountry(country, validPlate) {
  test(country, () => {
    expect(validate(country, validPlate)).toBe(true)
  })
}
