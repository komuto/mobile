import { StyleSheet } from 'react-native'
import { Metrics, Fonts, Colors } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Metrics.titlePadding
  },
  buttonWrap: {
    marginLeft: 10,
    marginTop: 10
  },
  label: {
    fontFamily: Fonts.type.regular,
    letterSpacing: 0.22,
    fontSize: Fonts.size.smallMed,
    paddingTop: 6,
    color: Colors.darkgrey,
    marginRight: 20,
    marginLeft: 4
  }
})
