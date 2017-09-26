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
  image: {
    height: 26,
    width: 26,
    borderRadius: 13,
    marginRight: 10
  },
  itemContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver,
    flexDirection: 'row',
    padding: 20,
    backgroundColor: Colors.snow
  },
  imageProduct: {
    height: 50,
    width: 50,
    marginRight: 10,
    marginTop: 5
  },
  rowDataContainer: {
    flexDirection: 'column',
    flex: 1
  },
  textData: {
    fontFamily: Fonts.type.regular,
    fontSize: 13,
    letterSpacing: 0.22,
    color: Colors.darkgrey
  }
})
