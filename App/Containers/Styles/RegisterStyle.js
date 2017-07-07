import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: Colors.background,
    flex: 1
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
  form: {
    padding: 20
  },
  inputContainer: {
    marginTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: Colors.silver
  },
  inputText: {
    height: 40,
    flex: 1,
    color: Colors.grey,
    fontSize: Fonts.size.medium
  },
  buttonLogin: {
    flex: 1,
    marginTop: 20,
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
  line: {
    paddingTop: Metrics.doubleBaseMargin,
    paddingBottom: Metrics.baseMargin
  },
  loginRow: {
    paddingTop: Metrics.doubleBaseMargin,
    paddingBottom: Metrics.baseMargin,
    flexDirection: 'row'
  },
  containerText: {
    width: Metrics.screenWidth - 40,
    marginTop: 10
  },
  containerText2: {
    flexDirection: 'row',
    width: Metrics.screenWidth - 40
  },
  radioLabel: {
    marginTop: 40,
    marginLeft: 4,
    color: Colors.labelgrey,
    marginBottom: 4
  },
  radio: {

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
  contentContainerStyle: {
    justifyContent: 'center'
  }
})
