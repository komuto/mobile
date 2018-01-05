import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.snow
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
    height: Metrics.screenHeight - Metrics.navBarHeight - 100,
    alignItems: 'center',
    justifyContent: 'center',
    width: Metrics.screenWidth,
    opacity: 0.5
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
    marginTop: 50
  },
  image: {
    width: 173,
    height: 164
  },
  textLabel: {
    fontFamily: Fonts.type.bold,
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.19,
    textAlign: 'center',
    color: Colors.darkgrey,
    marginTop: 15,
    marginBottom: 5
  },
  textInfo: {
    fontFamily: Fonts.type.regular,
    fontSize: 13,
    lineHeight: 22,
    letterSpacing: 0.22,
    textAlign: 'center',
    color: Colors.brownishGrey
  },
  buttonContainer: {
    height: 56,
    flex: 1,
    flexDirection: 'row',
    marginTop: 20
  },
  button: {
    flex: 1,
    height: 56,
    backgroundColor: Colors.bluesky,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },
  textButton: {
    fontFamily: Fonts.type.bold,
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.19,
    textAlign: 'center',
    color: Colors.snow
  }
})
