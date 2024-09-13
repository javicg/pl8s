const esTemplates = require('./es');

const templates = new Map([
    ["ES", esTemplates]
])

const processors = new Map([
    ["NUMERIC", processNumericSegment],
    ["ALPHA", processAlphaSegment],
    ["ALPHA_RESTRICTED", processAlphaRestrictedSegment],
    ["ENUMERATION", processEnumeration]
])

function processNumericSegment(tail, numericTemplate) {
    var valid = false
    if (tail.length >= numericTemplate.length) {
        segment = tail.substr(0, numericTemplate.length);
        valid = segment.search(/^[0-9]+$/i) >= 0
    }

    return {
        "valid": valid,
        "tail": tail.substr(numericTemplate.length)
    };
}

function processAlphaSegment(tail, alphaTemplate) {
    var valid = false
    if (tail.length >= alphaTemplate.length) {
        segment = tail.substr(0, alphaTemplate.length);
        valid = segment.search(/^[A-Z]+/i) >= 0
    }

    return {
        "valid": valid,
        "tail": tail.substr(alphaTemplate.length)
    };
}

function processAlphaRestrictedSegment(tail, alphaTemplate) {
    var valid = true
    if (tail.length >= alphaTemplate.length) {
        segment = tail.substr(0, alphaTemplate.length);
        for (i in segment) {
            var char = segment[i]
            if (!alphaTemplate.allowed.includes(char)) {
                valid = false
            }
        }
    } else {
        valid = false
    }

    return {
        "valid": valid,
        "tail": tail.substr(alphaTemplate.length)
    }
}

function processEnumeration(tail, enumTemplate) {
    var match = ""
    for(i in enumTemplate.values) {
        var candidate = enumTemplate.values[i]
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
        return false;
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
    var remainder = plate;
    for (i in template.segments) {
        var templateSegment = template.segments[i]

        var result = processors.get(templateSegment.type)(remainder, templateSegment)
        if (!result.valid) {
            return false;
        }

        remainder = result.tail
    }

    return remainder.length == 0;
}

module.exports = validatePlate;
