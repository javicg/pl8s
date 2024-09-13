// https://es.wikipedia.org/wiki/Matr%C3%ADculas_automovil%C3%ADsticas_de_Espa%C3%B1a
const province1970Enumeration = {
  "type": "ENUMERATION",
  "values": ["A","AB","AL","AV","B","BA","BI","BU","C","CA","CC","CS","CE","CO","CR","CU","GC","GE","GI","GR","GU","H","HU","PM","IB","J","L","LE","LO","LU","M","MA","ML","MU","NA","O","OR","OU","P","PO","S","SA","SE","SG","SH","SO","SS","T","TE","TF","TO","V","VA","VI","Z","ZA"]
}
const province1970FirstAlpha = {
  "type": "ALPHA_RESTRICTED",
  "length": 1,
  "allowed": ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","S","T","U","V","W","X","Y","Z"]
}
const province1970SecondAlpha = {
  "type": "ALPHA_RESTRICTED",
  "length": 1,
  "allowed": ["B","C","D","F","G","H","J","K","L","M","N","P","S","T","U","V","W","X","Y","Z"]
}

const province1970SingleLetter = {
  "country": "ES",
  "segments": [
    province1970Enumeration,
    {
      "type": "NUMERIC",
      "length": 4
    },
    province1970FirstAlpha
  ]
}

const province1970DoubleLetter = {
  "country": "ES",
  "segments": [
    province1970Enumeration,
    {
      "type": "NUMERIC",
      "length": 4
    },
    province1970FirstAlpha,
    province1970SecondAlpha
  ]
}

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

const templates = [current, province1970DoubleLetter, province1970SingleLetter]
module.exports = templates
