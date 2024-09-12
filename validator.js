const es_templates = require('./es');

const templates = new Map([
    ["ES", es_templates]
])

const segment_validators = new Map([
    ["NUMERIC", /^[0-9]+$/i],
    ["ALPHA", /^[A-Z]+/i]
])

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
        var segment = template.segments[i]

        var plate_segment = remainder.substr(0, segment.length);
        // Assumption: template is well-formed (i.e. there is a validator for the segment type)
        var plate_segment_invalid = plate_segment.search(segment_validators.get(segment.type)) < 0
        var plate_segment_length_invalid = plate_segment.length != segment.length

        if (plate_segment_invalid || plate_segment_length_invalid) {
            return false;
        }

        remainder = plate.substr(remainderIdx + segment.length)
        remainderIdx = remainderIdx + segment.length
    }

    return remainder.length == 0;
}

module.exports = validatePlate;
