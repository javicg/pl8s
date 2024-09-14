// Source: https://en.wikipedia.org/wiki/Vehicle_registration_plates_of_Belgium

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

exports.templates = [current, _2008]
