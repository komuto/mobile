import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.background
  },
  textContainer: {
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: Fonts.size.medium,
    letterSpacing: 4,
    lineHeight: 24,
    fontFamily: Fonts.type.regular,
    color: Colors.grey,
    textAlign: 'center'
  },
  inputContainer: {
    marginLeft: 20,
    marginRight: 20,
    borderBottomWidth: 1,
    marginTop: 10,
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
    margin: 20,
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
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.bold
  }
})
