import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.paleGrey
  },
  dataContainer: {
    backgroundColor: Colors.snow,
    width: Metrics.screenWidth,
    paddingLeft: 20,
    paddingRight: 20,
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver
  },
  label: {
    fontFamily: Fonts.type.regular,
    fontSize: 13,
    letterSpacing: 0.22,
    color: Colors.darkgrey
  },
  data: {
    fontFamily: Fonts.type.regular,
    fontSize: 13,
    letterSpacing: 0.22,
    color: Colors.brownishGrey
  },
  dataMoney: {
    fontFamily: Fonts.type.regular,
    fontSize: 13,
    letterSpacing: 0.22,
    color: Colors.darkMint
  },
  dataPaidMoney: {
    fontFamily: Fonts.type.regular,
    fontSize: 13,
    letterSpacing: 0.22,
    color: Colors.red
  },
  blueText: {
    fontFamily: Fonts.type.regular,
    fontSize: 13,
    letterSpacing: 0.22,
    color: Colors.bluesky
  },
  arrow: {
    height: 24,
    width: 24
  },
  title: {
    fontFamily: Fonts.type.bold,
    marginLeft: 20,
    marginBottom: 10,
    fontSize: 13,
    letterSpacing: 0.22,
    color: Colors.darkgrey
  },
  rowDataContainer: {
    backgroundColor: Colors.snow,
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    width: Metrics.screenWidth,
    borderBottomColor: Colors.silver,
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  imageRow: {
    width: 30,
    height: 30,
    borderRadius: 5,
    marginRight: 10
  }
})
