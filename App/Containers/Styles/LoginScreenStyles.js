import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes'

export default StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: Colors.background,
    flex: 1
  },
  form: {
    backgroundColor: Colors.snow,
    borderRadius: 4
  },
  form_header: {
    height: 58,
    backgroundColor: Colors.doubleLightGrey,
    padding: 20
  },

  form_header_image: {
    flex: 0
  },
  form_header_text: {
    flex: 0.5,
    fontSize: 13,
    fontFamily: Fonts.type.base,
    color: Colors.bright_grey
  },
  row: {
    borderBottomWidth: 0.5,
    borderColor: Colors.grey,
    margin: 20
  },
  rowLabel: {
    paddingBottom: Metrics.baseMargin,
    fontSize: 12.6,
    color: Colors.grey
  },
  textInput: {
    height: 40,
    fontFamily: Fonts.type.base,
    color: Colors.thin_grey
  },
  textInputReadonly: {
    height: 40,
    fontFamily: Fonts.type.base,
    color: Colors.thin_grey
  },
  loginRow: {
    paddingTop: Metrics.doubleBaseMargin,
    paddingBottom: Metrics.baseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
    flexDirection: 'row'
  },
  loginButtonWrapper: {
    flex: 1
  },
  loginButton: {
    flex: 1,
    borderRadius: 5,
    backgroundColor: Colors.bluesky,
    padding: 16,
    height: 50,
    paddingBottom: Metrics.baseMargin
  },
  loginText: {
    textAlign: 'center',
    color: Colors.snow,
    fontFamily: Fonts.type.bold,
    fontSize: 14
  },
  topLogo: {
    alignSelf: 'center',
    resizeMode: 'contain'
  },
  line: {
    paddingTop: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
    paddingBottom: Metrics.baseMargin
  },
  text_sign_up: {
    textAlign: 'center',
    fontSize: 13,
    fontFamily: Fonts.type.bold,
    color: Colors.bluesky
  },
  inputContainer: {
    borderBottomWidth: 1,
    marginTop: 10,
    borderBottomColor: Colors.silver
  },
  inputText: {
    height: 40,
    flex: 1,
    color: Colors.grey,
    fontSize: 13.5
  },
  contentContainerStyle: {
    justifyContent: 'center'
  },
  containerBanner: {
    height: 50,
    paddingLeft: 20,
    backgroundColor: Colors.doubleLightGrey,
    flexDirection: 'row',
    alignItems: 'center'
  },
  textBanner: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.regular,
    color: Colors.lightblack
  },
  textLogin: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.bold,
    color: Colors.bluesky
  },
  spinner: {
    position: 'absolute',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    opacity: 0.5
  },
  labelError: {
    flex: 1,
    marginTop: -10,
    marginBottom: 10,
    marginLeft: 20,
    color: Colors.red,
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.small
  },
  labelError1: {
    flex: 1,
    marginTop: -10,
    marginBottom: -10,
    color: Colors.snow,
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.small,
    textAlign: 'center'
  }
})
