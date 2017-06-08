import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.background
  },
  imagestyle: {
    height: 186,
    width: 159,
    marginTop: 30,
    alignSelf: 'center'
  },
  welcomeContainer: {
    width: Metrics.screenWidth,
    marginTop: 46,
    justifyContent: 'center'
  },
  welcomeText: {
    fontFamily: Fonts.type.bold,
    letterSpacing: 3,
    lineHeight: 24,
    fontSize: 16,
    color: '#404852',
    textAlign: 'center'
  },
  welcome2Container: {
    width: Metrics.screenWidth,
    marginTop: 10,
    justifyContent: 'center'
  },
  welcome2Text: {
    fontFamily: Fonts.type.regular,
    letterSpacing: 4,
    lineHeight: 24,
    fontSize: 14,
    color: '#666666',
    textAlign: 'center'
  }
})
