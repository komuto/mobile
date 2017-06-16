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
    marginTop: 10,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: 48
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
    fontSize: Fonts.size.medium
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
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.bold,
    color: Colors.darkgrey,
    letterSpacing: 0.2,
    marginTop: 30,
    marginLeft: 20,
    marginBottom: 20
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
    padding: 20,
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
    color: Colors.lightblack,
    fontSize: Fonts.size.small,
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
    height: 350,
    flexDirection: 'column',
    padding: 20
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
    top: 5,
    left: 5
  },
  diskon: {
    fontSize: Fonts.size.medium,
    color: Colors.snow,
    fontFamily: Fonts.type.extrabold
  },
  textTitleProduct: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.regular,
    color: Colors.darkgrey,
    lineHeight: 18,
    letterSpacing: 0.2,
    marginTop: 10
  },
  tokoContainer: {
    flexDirection: 'row',
    marginTop: 7
  },
  namaToko: {
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.regular,
    color: Colors.labelgrey
  },
  imageVerified: {
    height: 24,
    width: 24,
    marginTop: -5,
    marginLeft: 5
  },
  nominalDiskon: {
    textDecorationLine: 'line-through',
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.regular,
    color: Colors.labelgrey
  },
  nominalDiskon1: {
    textDecorationLine: 'line-through',
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.regular,
    color: Colors.snow
  },
  noDiskon: {
    marginTop: 20
  },
  harga: {
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.bold,
    color: Colors.red,
    letterSpacing: 0.2,
    marginTop: 30
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15
  },
  like: {
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.regular,
    color: Colors.labelgrey,
    letterSpacing: 0.2,
    marginLeft: 5,
    marginTop: -2
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
  }
})
