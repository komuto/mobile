import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 50,
    backgroundColor: Colors.paleGrey
  },
  headerContainer: {
    height: 120,
    backgroundColor: Colors.red,
    padding: 10
  },
  header: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  textHeader: {
    color: Colors.background,
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.bold,
    flex: 1
  },
  buttonHeader: {
    marginRight: 5,
    marginLeft: 5,
    marginTop: -5,
    padding: 2
  },
  imagestyle: {
    alignSelf: 'flex-end',
    height: 30,
    width: 30
  },
  containerNumber: {
    position: 'absolute',
    right: 0,
    top: 0,
    height: 16,
    width: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background
  },
  number: {
    fontSize: Fonts.size.tiny,
    color: Colors.red,
    fontFamily: Fonts.type.bold
  },
  searchContainer: {
    backgroundColor: Colors.background,
    borderRadius: 2,
    marginTop: 12,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: 43
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
  },
  slider: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageSlider: {
    flex: 1,
    width: Metrics.screenWidth
  },
  titleCategory: {
    fontSize: Fonts.size.smallMed,
    fontFamily: Fonts.type.bold,
    color: Colors.darkgrey,
    letterSpacing: 0.2,
    marginTop: 30,
    marginLeft: 20,
    marginBottom: 15
  },
  categoryContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.snow
  },
  categoryRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver
  },
  category: {
    flex: 1,
    paddingTop: 26,
    paddingBottom: 27.5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    borderRightWidth: 0.5,
    borderRightColor: Colors.silver
  },
  imageCategory: {
    height: 32,
    width: 32
  },
  textCategory: {
    marginTop: 9,
    color: Colors.lightblack,
    fontSize: Fonts.size.small,
    width: (Metrics.screenWidth / 3) - 40,
    textAlign: 'center',
    fontFamily: Fonts.type.regular
  },
  allCategory: {
    height: 50,
    backgroundColor: Colors.snow,
    alignItems: 'center',
    padding: 20,
    flexDirection: 'row',
    marginBottom: 10,
    elevation: 2
  },
  textAllCategory: {
    flexWrap: 'wrap',
    color: Colors.bluesky,
    flex: 1,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.bold,
    letterSpacing: 0.2
  },
  listViewContainer: {
    backgroundColor: Colors.snow,
    width: Metrics.screenWidth
  },
  rowDataContainer: {
    borderBottomWidth: 0.5,
    borderRightWidth: 0.5,
    borderRightColor: Colors.silver,
    borderBottomColor: Colors.silver,
    width: Metrics.screenWidth / 2,
    height: 354.5,
    flexDirection: 'column',
    padding: 20,
    backgroundColor: Colors.snow
  },
  imageProduct: {
    height: 140,
    width: 140
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
    marginTop: 11
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
    letterSpacing: 0.2,
    marginTop: 5
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
  floatingSearch: {
    elevation: 2,
    height: 50,
    backgroundColor: Colors.snow,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15
  }
})
