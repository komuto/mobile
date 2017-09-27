import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.paleGrey
  },
  rowContainer: {
    backgroundColor: Colors.snow,
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: 'column',
    marginTop: 15
  },
  dataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
    paddingRight: 20,
    borderBottomColor: Colors.silver,
    borderBottomWidth: 0.5
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
    paddingRight: 20
  },
  textTitle: {
    fontFamily: Fonts.type.regular,
    fontSize: 13,
    letterSpacing: 0.23,
    color: Colors.darkgrey
  },
  textDate: {
    fontFamily: Fonts.type.regular,
    fontSize: 13,
    letterSpacing: 0.23,
    color: Colors.labelgrey
  },
  textRed: {
    fontFamily: Fonts.type.bold,
    fontSize: 13,
    letterSpacing: 0.23,
    color: Colors.red
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 5
  }
})
