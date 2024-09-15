// Source: https://es.wikipedia.org/wiki/Matr%C3%ADculas_automovil%C3%ADsticas_de_Espa%C3%B1a

const provincial1900Enumeration = {
  "type": "ENUMERATION",
  "values": ["A","AL","ALB","AB","AV","B","BA","BI","BU","C","CA","CAC","CC","CAS","CS","CR","CO","CU","GE","GR","GU","H","HU","J","L","LE","LO","LU","M","MA","MU","O","OR","P","PA","NA","PM","PO","S","SA","SS","SEG","SG","SE","SO","T","TE","GC","TF","TER","TE","TO","V","VA","VI","Z","ZA","CE","ML","AOE","FP","I","IF","ME","RM","SHA","SH","TA","TEG","TG"]
}
const provincial1900 = {
  "country": "ES",
  "segments": [
    provincial1900Enumeration,
    {
      "type": "NUMERIC",
      "length": 6,
      "padding": false
    }
  ]
}

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
      "length": 4,
      "padding": true
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
      "length": 4,
      "padding": true
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
      "length": 4,
      "padding": true
    },
    {
      "type": "ALPHA_RESTRICTED",
      "length": 3,
      "allowed": ["B","C","D","F","G","H","J","K","L","M","N","P","R","S","T","V","W","X","Y","Z"]
    }
  ]
}

exports.templates = [current, provincial1970DoubleLetter, provincial1970SingleLetter, provincial1900]
exports.current = current
exports._1970AA = provincial1970DoubleLetter
exports._1970A = provincial1970SingleLetter
exports._1900 = provincial1900
