import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.paleGrey
  },
  balanceContainer: {
    paddingLeft: 43,
    paddingBottom: 20,
    backgroundColor: Colors.red,
    width: Metrics.screenWidth
  },
  textBalance: {
    fontFamily: Fonts.type.bold,
    fontSize: 23,
    fontWeight: 'bold',
    letterSpacing: 0.38,
    color: Colors.snow
  },
  titleContainer: {
    paddingTop: 30,
    paddingLeft: 20,
    paddingBottom: 10
  },
  title: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.medium,
    fontWeight: 'bold',
    letterSpacing: 0.38,
    color: Colors.darkgrey
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
  },
  containerNumber: {
    height: 24,
    width: 24,
    borderRadius: 12,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.red
  },
  number: {
    fontSize: Fonts.size.tiny,
    color: Colors.snow,
    fontFamily: Fonts.type.bold
  }
})
