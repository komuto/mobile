import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.background
  },
  title: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.medium,
    color: Colors.darkgrey,
    textAlign: 'center',
    marginTop: 20
  },
  containerCodeStyle: {
    flexDirection: 'row',
    marginLeft: 34.5,
    marginRight: 34.5,
    marginBottom: 0,
    marginTop: 80,
    justifyContent: 'space-around'
  },
  codeStyle: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.medium,
    alignSelf: 'center',
    textAlign: 'center',
    color: Colors.darkgrey,
    width: 35,
    height: 35,
    borderBottomWidth: 1,
    borderColor: Colors.silver
  },
  buttonLogin: {
    marginTop: 40,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 25,
    height: 50,
    backgroundColor: Colors.bluesky,
    borderRadius: 5,
    borderColor: Colors.bluesky,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textButtonLogin: {
    color: Colors.snow,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.bold
  },
  containerBanner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textBanner: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.regular,
    color: Colors.lightblack
  },
  textLogin: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.regular,
    color: Colors.bluesky
  }
})
