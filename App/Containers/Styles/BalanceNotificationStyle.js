import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.background
  },
  imagestyle: {
    height: 250,
    width: 250,
    alignSelf: 'center'
  },
  welcomeContainer: {
    width: Metrics.screenWidth,
    justifyContent: 'center'
  },
  welcomeText: {
    fontFamily: Fonts.type.bold,
    letterSpacing: 3,
    lineHeight: 24,
    fontSize: Fonts.size.regular,
    color: Colors.darkgrey,
    textAlign: 'center'
  },
  welcome2Container: {
    width: Metrics.screenWidth - 30,
    marginTop: 10,
    justifyContent: 'center'
  },
  welcome2Text: {
    fontFamily: Fonts.type.regular,
    letterSpacing: 4,
    lineHeight: 24,
    fontSize: Fonts.size.medium,
    color: Colors.lightgrey,
    textAlign: 'center'
  },
  containerButton: {
    width: Metrics.screenWidth - 30,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 20
  },
  buttonLogin: {
    flex: 1,
    marginRight: 20,
    marginLeft: 20,
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
  }
})
