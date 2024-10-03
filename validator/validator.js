const fs = require('fs');
const path = require('path')

const templates = new Map()

fs.readdirSync('./templates')
.filter(file => path.extname(file) === '.json')
.forEach(file => {
  rawData = fs.readFileSync(path.join('./templates', file), {encoding: "utf8"});
  template = JSON.parse(rawData);

  countryTemplates = templates.get(template.country) || []
  countryTemplates.push(template)
  templates.set(template.country, countryTemplates)
})

const templateSchema = {
    properties: {
        country: {type: "string"},
        segments: {
            elements: {
                discriminator: "type",
                mapping: {
                    "NUMERIC": {
                        properties: {
                            length: {type: "int32"}
                        },
                        optionalProperties: {
                            padding: {type: "boolean"}
                        }
                    },
                    "ALPHA": {
                        properties: {
                            length: {type: "int32"}
                        }
                    },
                    "ALPHA_RESTRICTED": {
                        properties: {
                            length: {type: "int32"},
                            allowed: {
                                elements: {type: "string"}
                            }
                        }
                    },
                    "ENUMERATION": {
                        properties: {
                            values: {
                                elements: {type: "string"}
                            }
                        }
                    }
                }
            }
        }
    }
}

const processors = new Map([
    ["NUMERIC", processNumericSegment],
    ["ALPHA", processAlphaSegment],
    ["ALPHA_RESTRICTED", processAlphaRestrictedSegment],
    ["ENUMERATION", processEnumeration]
])

function processNumericSegment(tail, template) {
    var match = (template.padding)
      ? tail.match(/^[0-9]+/)
      : tail.match(/^[1-9][0-9]*/)

    if (!match) {
        return {
            "valid": false
        }
    }

    var lengthOk = (m) => m.length == template.length || (!template.padding && m.length < template.length)
    return {
        "valid": lengthOk(match[0]),
        "tail": tail.substr(match[0].length)
    }
}

function processAlphaSegment(tail, template) {
    var match = tail.match(/^[A-Z]+/)
    if (!match) {
        return {
            "valid": false
        }
    }

    return {
        "valid": match[0].length == template.length,
        "tail": tail.substr(match[0].length)
    }
}

function processAlphaRestrictedSegment(tail, template) {
    if (tail.length < template.length) {
        return {
            "valid": false
        }
    }

    segment = tail.substr(0, template.length)
    for (i in segment) {
        var char = segment[i]
        if (!template.allowed.includes(char)) {
            return {
                "valid": false
            }
        }
    }

    return {
        "valid": true,
        "tail": tail.substr(template.length)
    }
}

function processEnumeration(tail, template) {
    var match = ""
    for(i in template.values) {
        var candidate = template.values[i]
        if (tail.search(candidate) == 0 && candidate.length > match.length) {
            match = candidate
        }
    }

    return {
        "valid": match.length > 0,
        "tail": tail.substr(match.length)
    }
}

function validateAgainstTemplate(plate, template) {
    var remainder = plate
    for (i in template.segments) {
        var templateSegment = template.segments[i]

        var result = processors.get(templateSegment.type)(remainder, templateSegment)
        if (!result.valid) {
            return false
        }

        remainder = result.tail
    }

    return remainder.length == 0
}

exports.validate = (country, plate) => {
    if (!templates.has(country)) {
        return false
    }

    for(i in templates.get(country)) {
        var template = templates.get(country)[i]
        if (validateAgainstTemplate(plate, template)) {
            return true
        }
    }

    return false
}

exports.__internal = process.env.NODE_ENV === "test" ? {
    templateSchema,
    validateAgainstTemplate
} : undefined
