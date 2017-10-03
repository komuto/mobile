import { StyleSheet } from 'react-native'
import { Colors, Fonts, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.background
  },
  spinner: {
    position: 'absolute',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: Metrics.screenWidth,
    height: Metrics.screenHeight
  },
  searchContainer: {
    backgroundColor: Colors.background,
    paddingLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    marginBottom: 11,
    borderBottomColor: Colors.silver,
    borderBottomWidth: 0.5
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
    fontSize: Fonts.size.smallMed,
    fontFamily: Fonts.type.regular,
    color: Colors.slate,
    marginLeft: 10
  },
  storeInfo: {
    flexDirection: 'row',
    borderBottomColor: Colors.silver,
    borderBottomWidth: 0.5,
    padding: 20
  },
  maskedBitmap: {
    height: 40,
    width: 40,
    borderRadius: 2,
    backgroundColor: Colors.paleGreyFive
  },
  bitmap: {
    height: 40,
    width: 40,
    borderRadius: 2
  },
  flexRow1: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 3
  },
  iconOval: {
    top: 1,
    height: 19.2,
    width: 19.2
  },
  fontboldSlate: {
    fontSize: Fonts.size.smallMed,
    fontFamily: Fonts.type.bold,
    color: Colors.slate,
    marginRight: 10
  },
  fontregularBrowGrey: {
    fontSize: Fonts.size.smallMed,
    fontFamily: Fonts.type.regular,
    color: Colors.brownishGrey
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 13,
    flex: 1
  },
  containerProduct: {
    backgroundColor: Colors.red
  },
  rowDataContainer: {
    borderRightWidth: 0.5,
    borderRightColor: Colors.silver,
    flexDirection: 'column',
    paddingTop: 20,
    paddingLeft: 20,
    paddingBottom: 20,
    paddingRight: 31,
    backgroundColor: Colors.snow
  },
  imageProduct: {
    height: 140,
    width: 140
  },
  maskedimageProduct: {
    height: 140,
    width: 140,
    backgroundColor: Colors.paleGreyFive
  },
  containerDiskon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: Colors.red,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 11,
    left: 10
  },
  diskon: {
    fontSize: Fonts.size.smallMed,
    color: Colors.snow,
    fontFamily: Fonts.type.extrabold
  },
  textTitleProduct: {
    fontSize: Fonts.size.smallMed,
    fontFamily: Fonts.type.regular,
    color: Colors.darkgrey,
    lineHeight: 18,
    letterSpacing: 0.2,
    marginTop: 20
  },
  tokoContainer: {
    flexDirection: 'row'
  },
  namaToko: {
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.regular,
    color: Colors.labelgrey,
    marginTop: 7
  },
  imageVerified: {
    height: 24,
    width: 24,
    marginTop: 2.6,
    marginLeft: 3.5
  },
  nominalDiskon: {
    textDecorationLine: 'line-through',
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.regular,
    color: Colors.labelgrey,
    marginTop: 10,
    marginBottom: 5
  },
  nominalDiskon1: {
    textDecorationLine: 'line-through',
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.regular,
    color: Colors.snow,
    marginTop: 11
  },
  harga: {
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.bold,
    color: Colors.red,
    letterSpacing: 0.2
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 11
  },
  like: {
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.regular,
    color: Colors.labelgrey,
    letterSpacing: 0.2,
    marginLeft: 5
  },
  imageStyleNotLike: {
    width: 24,
    height: 24,
    tintColor: Colors.labelgrey
  },
  imageStyleLike: {
    width: 24,
    height: 24,
    tintColor: Colors.red
  },
  iconflexColumn: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30
  },
  fontsemiBoldCharcoal: {
    marginTop: 15,
    fontSize: Fonts.size.smallMed,
    fontFamily: Fonts.type.semiBolds,
    color: Colors.charcoalGrey
  }
})
