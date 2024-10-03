const fs = require('fs');
const path = require('path')

const Ajv = require("ajv/dist/jtd")
const ajv = new Ajv({allErrors: true})

const validator = require('./validator')

describe("all country templates are valid", () => {
  const validate = ajv.compile(validator.__internal.templateSchema)

  const templates = fs.readdirSync('./templates')
    .filter(file => path.extname(file) === '.json')

  test.each(templates)("%s is valid", (file) => {
    rawData = fs.readFileSync(path.join('./templates', file), {encoding: "utf8"});
    template = JSON.parse(rawData);
    expect(validate(template)).toBe(true);
  })
})

describe("validator works for all supported countries", () => {
  validateCountry("BE", "1ABC003")
  validateCountry("ES", "2008ZGZ")
})

it("fails gracefully when country is not supported", () => {
  expect(validator.validate("¯\_(ツ)_/¯", "ABC1234")).toBe(false)
})

function validateCountry(country, validPlate) {
  test(country+" plates", () => {
    expect(validator.validate(country, validPlate)).toBe(true)
    expect(validator.validate(country, "¯\_(ツ)_/¯")).toBe(false)
  })
}
