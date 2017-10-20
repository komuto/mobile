import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.snow
  },
  headerContainer: {
    elevation: 2
  },
  searchImage: {
    height: 24,
    width: 24
  },
  listViewContainer: {
    backgroundColor: Colors.snow,
    width: Metrics.screenWidth
  },
  rowDataContainer: {
    borderBottomWidth: 0.5,
    borderRightColor: Colors.silver,
    borderBottomColor: Colors.silver,
    height: 159.3,
    flexDirection: 'row',
    padding: 20
  },
  imageProduct: {
    height: 120,
    width: 120
  },
  containerTitle: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 20,
    height: 120
  },
  containerDiskon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: Colors.red,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 9,
    left: 10
  },
  diskon: {
    fontSize: Fonts.size.medium,
    color: Colors.snow,
    fontFamily: Fonts.type.extrabold
  },
  textTitleProduct: {
    fontSize: Fonts.size.smallMed,
    fontFamily: Fonts.type.regular,
    color: Colors.darkgrey,
    lineHeight: 18,
    letterSpacing: 0.2
  },
  tokoContainer: {
    flexDirection: 'row',
    marginTop: 2.5
  },
  namaToko: {
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.regular,
    color: Colors.labelgrey,
    alignSelf: 'flex-end',
    paddingBottom: 3.5
  },
  imageVerified: {
    height: 24,
    width: 24,
    marginLeft: 3.9
  },
  nominalDiskon: {
    textDecorationLine: 'line-through',
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.regular,
    color: Colors.labelgrey,
    marginTop: 7.5
  },
  nominalDiskon1: {
    textDecorationLine: 'line-through',
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.regular,
    color: Colors.snow,
    marginTop: 7.5
  },
  harga: {
    fontSize: Fonts.size.regular16,
    fontFamily: Fonts.type.bold,
    color: Colors.red,
    letterSpacing: 0.2,
    marginTop: -2
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center'
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
  },
  footerButton: {
    marginLeft: 5,
    fontSize: Fonts.size.smallMed,
    fontFamily: Fonts.type.regular,
    textAlign: 'center',
    paddingTop: 2,
    paddingBottom: 2
  },
  imageFooter: {
    width: 24,
    height: 24
  },
  blah: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRightWidth: 0.5,
    borderRightColor: Colors.silver
  },
  buttonFooter: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    height: 24
  },
  footerMenu: {
    flexDirection: 'row',
    height: 47,
    backgroundColor: Colors.snow,
    elevation: 2
  },
  modalContainer: {
    flex: 1
  },
  modalHeaderContainer: {
    padding: 20,
    height: 56,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.snow
  },
  modalHeaderText: {
    flex: 1,
    color: Colors.darkgrey,
    letterSpacing: 0.4,
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.medium
  },
  imageCancel: {
    width: 24,
    height: 24
  },
  titleContainer: {
    height: 56,
    paddingLeft: 20,
    paddingTop: 18.5,
    paddingBottom: 18.5,
    borderBottomWidth: 1,
    borderBottomColor: Colors.silver,
    justifyContent: 'center'
  },
  itemContainer: {
    flexDirection: 'row',
    height: 56,
    paddingLeft: 20,
    paddingRight: 15,
    paddingTop: 18.5,
    paddingBottom: 18.5,
    borderBottomWidth: 1,
    borderBottomColor: Colors.silver,
    justifyContent: 'center'
  },
  title: {
    flex: 1,
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.medium,
    color: Colors.lightblack
  },
  checkImage: {
    width: 24,
    height: 24,
    opacity: 0
  },
  blackContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  modalSortContainer: {
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  spinnerProduk: {
    position: 'absolute',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    opacity: 0.5
  },
  moneyLikesContainer: {
    flexDirection: 'row',
    paddingBottom: 28.8,
    alignItems: 'center'
  },
  listView: {
    flex: 1
  },
  loadingStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    marginTop: 10
  },
  buttonStyle: {
    flex: 1,
    padding: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver
  },
  textResult: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.medium,
    color: Colors.darkgrey
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
