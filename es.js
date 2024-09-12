const current = {
  "country": "ES",
  "segments": [
      {
          "type": "NUMERIC",
          "length": 4
      },
      {
          "type": "ALPHA_RESTRICTED",
          "length": 3,
          "allowed": ["B","C","D","F","G","H","J","K","L","M","N","P","R","S","T","V","W","X","Y","Z"]
      }
  ]
}

const templates = [current]
module.exports = templates
