// Source: https://en.wikipedia.org/wiki/Vehicle_registration_plates_of_Belgium

const _1971 = {
  "country": "BE",
  "segments": [
    {
      "type": "ALPHA",
      "length": 1
    },
    {
      "type": "NUMERIC",
      "length": 3,
      "padding": true
    },
    {
      "type": "ALPHA",
      "length": 1
    }
  ]
}

const _1973 = {
  "country": "BE",
  "segments": [
    {
      "type": "ALPHA",
      "length": 3
    },
    {
      "type": "NUMERIC",
      "length": 3,
      "padding": true
    }
  ]
}

const _2008 = {
  "country": "BE",
  "segments": [
    {
      "type": "NUMERIC",
      "length": 3,
      "padding": true
    },
    {
      "type": "ALPHA",
      "length": 3
    }
  ]
}

const current = {
  "country": "BE",
  "segments": [
    {
      "type": "NUMERIC",
      "length": 1
    },
    {
      "type": "ALPHA",
      "length": 3
    },
    {
      "type": "NUMERIC",
      "length": 3,
      "padding": true
    }
  ]
}

exports.templates = [current, _2008, _1973]

// Visible for testing (TODO find a better way...)
exports.current = current
exports._2008 = _2008
exports._1973 = _1973
exports._1971 = _1971
