const type = {
  base: 'NunitoSans-Regular',
  bold: 'NunitoSans-Bold',
  semiBolds: 'NunitoSans-SemiBold',
  light: 'NunitoSans-Light',
  regular: 'NunitoSans-Regular',
  emphasis: 'NunitoSans-Regular',
  extrabold: 'NunitoSans-ExtraBold'
}

const size = {
  h1: 38,
  h2: 34,
  h3: 30,
  h4: 26,
  h5: 20,
  h6: 19,
  input: 18,
  regular: 17,
  medium: 14,
  smallMed: 13,
  small: 12,
  mediumTiny: 11,
  tiny: 10,
  extraTiny: 8
}

const style = {
  h1: {
    fontFamily: type.base,
    fontSize: size.h1
  },
  h2: {
    fontWeight: 'bold',
    fontSize: size.h2
  },
  h3: {
    fontFamily: type.emphasis,
    fontSize: size.h3
  },
  h4: {
    fontFamily: type.base,
    fontSize: size.h4
  },
  h5: {
    fontFamily: type.base,
    fontSize: size.h5
  },
  h6: {
    fontFamily: type.emphasis,
    fontSize: size.h6
  },
  normal: {
    fontFamily: type.base,
    fontSize: size.regular
  },
  description: {
    fontFamily: type.base,
    fontSize: size.medium
  },
  semiBold: {
    fontFamily: type.semiBolds,
    fontSize: size.tiny
  }
}

export default {
  type,
  size,
  style
}
