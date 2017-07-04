import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.background
  },
  floatingSearch: {
    borderBottomColor: Colors.silver,
    borderBottomWidth: 0.5,
    height: 50,
    backgroundColor: Colors.snow,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15
  },
  searchImage: {
    height: 24,
    width: 24
  },
  textInputContainer: {
    flex: 1
  },
  inputText: {
    flex: 1,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.regular
  }
})
