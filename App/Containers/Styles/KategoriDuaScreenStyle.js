import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.paleGrey
  },
  containerBanner: {
    height: 57,
    paddingLeft: 20,
    paddingRight: 13,
    backgroundColor: Colors.paleGrey,
    flexDirection: 'row',
    alignItems: 'center'
  },
  textBanner: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.semiBolds,
    color: Colors.darkgrey
  },
  fixMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingTop: 17,
    paddingRight: 20,
    paddingBottom: 20,
    backgroundColor: Colors.background,
    marginBottom: 5
  },
  itemList: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingTop: 17,
    paddingRight: 20,
    paddingBottom: 20,
    backgroundColor: Colors.background,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver
  },
  textNama: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.medium,
    color: Colors.lightblack
  },
  namaContainer: {
    flexDirection: 'column',
    flex: 1
  },
  imageCategory: {
    height: 24,
    width: 24
  },
  rightArrow: {
    height: 24,
    width: 24
  },
  spinnerProduk: {
    backgroundColor: Colors.background,
    height: 177.25,
    alignItems: 'center',
    justifyContent: 'center',
    width: Metrics.screenWidth,
    opacity: 0.5
  }
})
