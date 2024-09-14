const es = require('./es')

const templates = new Map([
    ["ES", es.templates]
])

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

function validate(country, plate) {
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

exports.validate = validate
