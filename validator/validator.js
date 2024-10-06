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

const segmentTypeDefs = new Map([
    ["NUMERIC", {
        "processor": processNumericSegment,
        "schema": {
            properties: {
                length: {type: "int32"}
            },
            optionalProperties: {
                padding: {type: "boolean"}
            }
        }
    }],
    ["ALPHA", {
        "processor": processAlphaSegment,
        "schema": {
            properties: {
                length: {type: "int32"}
            }
        }
    }],
    ["UNIFORM_REGEX", {
        "processor": processUniformRegex,
        "schema": {
            properties: {
                length: {type: "int32"},
                regex: {type: "string"}
            }
        }
    }],
    ["ENUMERATION", {
        "processor": processEnumeration,
        "schema": {
            properties: {
                values: {
                    elements: {type: "string"}
                }
            }
        }
    }]
])

function getTemplateSchema() {
    var templateElements = {
        discriminator: "type",
        mapping: {}
    }
    segmentTypeDefs.forEach((def, name) => {
        templateElements.mapping[name] = def.schema
    })

    return {
        properties: {
            country: {type: "string"},
            segments: {
                elements: templateElements
            }
        }
    }
}

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

function processUniformRegex(tail, template) {
    var match = tail.match(new RegExp(template.regex + `{${template.length}}`))
    if (!match || match.index != 0) {
        return {
            "valid": false
        }
    }

    return {
        "valid": match[0].length == template.length,
        "tail": tail.substr(match[0].length)
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

        var result = segmentTypeDefs.get(templateSegment.type).processor(remainder, templateSegment)
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
    getTemplateSchema,
    validateAgainstTemplate
} : undefined
