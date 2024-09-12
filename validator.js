const esTemplates = require('./es');

const templates = new Map([
    ["ES", esTemplates]
])

const segmentValidators = new Map([
    ["NUMERIC", validateNumericSegment],
    ["ALPHA", validateAlphaSegment],
    ["ALPHA_RESTRICTED", validateAlphaRestrictedSegment]
])

function validateNumericSegment(plateSegment, numericTemplate) {
    return plateSegment.search(/^[0-9]+$/i) >= 0 && plateSegment.length == numericTemplate.length
}

function validateAlphaSegment(plateSegment, alphaTemplate) {
    return plateSegment.search(/^[A-Z]+/i) >= 0 && plateSegment.length == alphaTemplate.length
}

function validateAlphaRestrictedSegment(plateSegment, alphaTemplate) {
    if (plateSegment.length != alphaTemplate.length) {
        return false
    }

    for (i in plateSegment) {
        var char = plateSegment[i]
        if (!alphaTemplate.allowed.includes(char)) {
            return false
        }
    }

    return true
}

function validatePlate(country, plate) {
    if (!templates.has(country)) {
        return false;
    }

    for(i in templates.get(country)) {
        var template = templates.get(country)[i]
        var valid = validatePlateAgainstTemplate(plate, template)
        if (valid) {
            return true
        }
    }

    return false
}

function validatePlateAgainstTemplate(plate, template) {
    var remainder = plate;
    var remainderIdx = 0
    for (i in template.segments) {
        var templateSegment = template.segments[i]
        var plateSegment = remainder.substr(0, templateSegment.length);

        var plateSegmentValid = segmentValidators.get(templateSegment.type)(plateSegment, templateSegment)
        if (!plateSegmentValid) {
            return false;
        }

        remainder = plate.substr(remainderIdx + templateSegment.length)
        remainderIdx = remainderIdx + templateSegment.length
    }

    return remainder.length == 0;
}

module.exports = validatePlate;
