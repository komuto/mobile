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
    height: 24,
    marginRight: 5
  },
  centang: {
    tintColor: Colors.darkMint,
    width: 24,
    height: 24,
    marginRight: 5
  },
  titleMenu: {
    fontFamily: Fonts.type.regular,
    letterSpacing: 0.23,
    color: Colors.darkgrey
  },
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  textWaiting: {
    fontFamily: Fonts.type.bold,
    fontSize: 13,
    letterSpacing: 0.22,
    color: Colors.textYellow
  },
  textFailed: {
    fontFamily: Fonts.type.bold,
    fontSize: 13,
    letterSpacing: 0.22,
    color: Colors.red
  },
  textSuccess: {
    fontFamily: Fonts.type.bold,
    fontSize: 13,
    letterSpacing: 0.22,
    color: Colors.darkMint
  }
})
