// Source: https://en.wikipedia.org/wiki/Vehicle_registration_plates_of_Belgium

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

exports.templates = [current]
