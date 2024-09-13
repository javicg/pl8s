// https://es.wikipedia.org/wiki/Matr%C3%ADculas_automovil%C3%ADsticas_de_Espa%C3%B1a
// TODO Add provincial system 1900-1970

const provincial1970Enumeration = {
  "type": "ENUMERATION",
  "values": ["A","AB","AL","AV","B","BA","BI","BU","C","CA","CC","CS","CE","CO","CR","CU","GC","GE","GI","GR","GU","H","HU","PM","IB","J","L","LE","LO","LU","M","MA","ML","MU","NA","O","OR","OU","P","PO","S","SA","SE","SG","SH","SO","SS","T","TE","TF","TO","V","VA","VI","Z","ZA"]
}
const provincial1970FirstAlpha = {
  "type": "ALPHA_RESTRICTED",
  "length": 1,
  "allowed": ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","S","T","U","V","W","X","Y","Z"]
}
const provincial1970SecondAlpha = {
  "type": "ALPHA_RESTRICTED",
  "length": 1,
  "allowed": ["B","C","D","F","G","H","J","K","L","M","N","P","S","T","U","V","W","X","Y","Z"]
}

const provincial1970SingleLetter = {
  "country": "ES",
  "segments": [
    provincial1970Enumeration,
    {
      "type": "NUMERIC",
      "length": 4
    },
    provincial1970FirstAlpha
  ]
}

const provincial1970DoubleLetter = {
  "country": "ES",
  "segments": [
    provincial1970Enumeration,
    {
      "type": "NUMERIC",
      "length": 4
    },
    provincial1970FirstAlpha,
    provincial1970SecondAlpha
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

const templates = [current, provincial1970DoubleLetter, provincial1970SingleLetter]
module.exports = templates
