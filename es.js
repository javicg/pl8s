const es_current = {
  "country": "ES",
  "segments": [
      {
          "type": "NUMERIC",
          "length": 4
      },
      {
          "type": "ALPHA", // TODO Implement proper validation (only B, C, D, F, G, H, J, K, L, M, N, P, R, S, T, V, W, X, Y and Z)
          "length": 3
      }
  ]
}

const es_templates = [es_current]
module.exports = es_templates
