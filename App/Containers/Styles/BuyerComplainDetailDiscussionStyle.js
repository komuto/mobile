import { StyleSheet } from 'react-native'
import { Colors, Fonts, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  rowContainer: {
    padding: 20,
    flexDirection: 'row'
  },
  photo: {
    height: 30,
    width: 30,
    borderRadius: 15,
    marginRight: 10
  },
  user: {
    flex: 1,
    flexDirection: 'column'
  },
  userName: {
    fontFamily: Fonts.type.bold,
    fontSize: 13,
    letterSpacing: 0.22,
    color: Colors.darkgrey
  },
  text: {
    fontFamily: Fonts.type.regular,
    fontSize: 13,
    letterSpacing: 0.22,
    color: Colors.darkgrey
  },
  date: {
    fontFamily: Fonts.type.regular,
    fontSize: 13,
    letterSpacing: 0.22,
    color: Colors.labelgrey
  },
  textInputContainer: {
    height: 56,
    flexDirection: 'row',
    backgroundColor: Colors.snow,
    borderTopColor: Colors.silver,
    borderTopWidth: 1,
    borderBottomColor: Colors.silver,
    borderBottomWidth: 1,
    width: Metrics.screenWidth,
    alignItems: 'center'
  },
  textInput: {
    flex: 1,
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    color: Colors.darkgrey,
    letterSpacing: 0.22,
    paddingLeft: 10,
    paddingRight: 10
  },
  sendContainer: {
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  sendMessage: {
    height: 30,
    width: 30
  }
})
