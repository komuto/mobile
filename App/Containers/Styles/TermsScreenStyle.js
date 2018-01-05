import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.snow,
    flex: 1
  },
  spinner: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    opacity: 0.5
  },
  headerTitle: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    color: Colors.lightblack,
    lineHeight: 21,
    padding: 20,
    paddingRight: 100,
    backgroundColor: Colors.paleGrey
  },
  body: {
    padding: 20,
    backgroundColor: Colors.snow
  },
  textInput: {
    paddingTop: 40,
    paddingLeft: 20.5,
    paddingRight: 19.5,
    backgroundColor: Colors.snow
  },
  inputText: {
    marginLeft: -1,
    color: Colors.darkgrey,
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    borderBottomWidth: 1,
    borderBottomColor: Colors.silver,
    paddingBottom: 8,
    paddingLeft: -1
  },
  contoh: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.small,
    color: Colors.darkgrey,
    lineHeight: 23,
    paddingTop: 15.8,
    paddingRight: 50
  },
  buttonBg: {
    position: 'absolute',
    paddingTop: 5,
    paddingBottom: 20,
    backgroundColor: Colors.snow
  },
  buttonnext: {
    width: Metrics.screenWidth - 40,
    height: 50,
    backgroundColor: Colors.bluesky,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 20,
    marginRight: 20
  },
  textButtonNext: {
    color: Colors.background,
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.medium
  }
})
