import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.snow,
    marginTop: Metrics.navBarHeight
  },
  scrollView: {
    paddingBottom: 10
  },
  containerMessage: {
    flexDirection: 'row',
    flex: 1,
    paddingTop: 26,
    paddingLeft: 20
  },
  photo: {
    height: 45,
    width: 45
  },
  title: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.smallMed,
    color: Colors.lightblack,
    flex: 2
  },
  date: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.mediumTiny,
    color: Colors.lightblack,
    opacity: 0.50,
    marginLeft: 14,
    paddingTop: 1,
    flex: 1,
    textAlign: 'right'
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1
  },
  border: {
    marginLeft: 20,
    borderBottomWidth: 0.5,
    paddingBottom: 20,
    borderBottomColor: Colors.silver,
    paddingRight: 40 + 20 + 10
  },
  messageText: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    color: Colors.lightgrey,
    lineHeight: 22,
    flex: 1,
    paddingRight: 4
  }
})
