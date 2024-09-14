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
    segment = tail.substr(0, template.length)

    var match = (template.padding)
      ? segment.match(/[0-9]+/)
      : segment.match(/[1-9][0-9]*/)

    if (!match) {
        return {
            "valid": false
        }
    }

    var lengthOk = (m) => m.length == template.length || !template.padding

    return {
        "valid": match.index == 0 && lengthOk(match[0]),
        "tail": tail.substr(match[0].length)
    }
}

function processAlphaSegment(tail, template) {
    var valid = false
    if (tail.length >= template.length) {
        segment = tail.substr(0, template.length)
        valid = segment.search(/^[A-Z]+/i) >= 0
    }

    return {
        "valid": valid,
        "tail": tail.substr(template.length)
    }
}

function processAlphaRestrictedSegment(tail, template) {
    var valid = true
    if (tail.length >= template.length) {
        segment = tail.substr(0, template.length)
        for (i in segment) {
            var char = segment[i]
            if (!template.allowed.includes(char)) {
                valid = false
            }
        }
    } else {
        valid = false
    }

    return {
        "valid": valid,
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

function validatePlate(country, plate) {
    if (!templates.has(country)) {
        return false
    }

    for(i in templates.get(country)) {
        var template = templates.get(country)[i]
        if (validatePlateAgainstTemplate(plate, template)) {
            return true
        }
    }

    return false
}

function validatePlateAgainstTemplate(plate, template) {
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

exports.validatePlate = validatePlate
