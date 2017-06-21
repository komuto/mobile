import { StyleSheet } from 'react-native'
import { Metrics, Fonts, Colors } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Metrics.titlePadding
  },
  loginButtonThirdParty: {
    height: 50,
    borderRadius: 5,
    backgroundColor: Colors.facebook,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1
  },
  loginIconThirdParty: {
    width: 9.3,
    height: 20,
    marginRight: 5
  },
  loginTextThirdParty: {
    fontSize: Fonts.size.medium,
    color: Colors.snow,
    alignSelf: 'center',
    marginLeft: Metrics.baseMargin,
    fontFamily: Fonts.type.bold
  },
  spinner: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Metrics.screenWidth,
    height: 40,
    marginTop: -10,
    opacity: 0.5
  },
  containerText: {
    flexDirection: 'row'
  }
})
