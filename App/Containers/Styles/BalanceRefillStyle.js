import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.background
  },
  menuContainer: {
    padding: 20,
    flexDirection: 'row',
    backgroundColor: Colors.snow,
    borderBottomColor: Colors.silver,
    borderBottomWidth: 0.5,
    alignItems: 'center'
  },
  icon: {
    width: 24,
    height: 24
  },
  titleMenu: {
    flex: 1,
    marginLeft: 20,
    fontFamily: Fonts.type.regular,
    letterSpacing: 0.23,
    color: Colors.darkgrey
  }
})
