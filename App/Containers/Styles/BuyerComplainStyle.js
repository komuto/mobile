import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.background
  },
  textTab: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.regular,
    letterSpacing: 0.4,
    marginTop: 5
  },
  scrollView: {
    paddingBottom: 10
  }
})
