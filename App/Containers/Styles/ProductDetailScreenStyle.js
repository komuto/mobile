import { StyleSheet } from 'react-native'
import { Metrics, Fonts, Colors } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.paleGrey
  },
  headerTextContainer: {
    height: Metrics.navBarHeight,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: Colors.red
  },
  headerContainer: {
    backgroundColor: Colors.background,
    paddingLeft: 20,
    paddingTop: 19.3,
    paddingBottom: 22,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver
  },
  imageStyle: {
    height: 24,
    width: 24
  },
  headerText: {
    flex: 1,
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.bold,
    top: -1,
    marginLeft: 10,
    marginRight: 10,
    color: Colors.snow
  },
  imageCotainer: {
    flex: 1,
    marginRight: 10,
    height: 179.5,
    width: 179.5,
    flexDirection: 'row',
    backgroundColor: Colors.paleGreyTwo
  },
  image: {
    height: 157.9,
    width: 168.3
  },
  imageProduct: {
    height: 157.9,
    width: 168.3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollImage: {
    height: 179.5,
    marginBottom: 20.3
  },
  containerDiskon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: Colors.red,
    alignItems: 'center',
    justifyContent: 'center'
  },
  diskon: {
    fontSize: Fonts.size.smallMed,
    color: Colors.snow,
    fontFamily: Fonts.type.extrabold
  },
  titleContainer: {
    flexDirection: 'row',
    paddingRight: 16
  },
  title: {
    flex: 1,
    fontSize: Fonts.size.regular,
    color: Colors.darkgrey,
    fontFamily: Fonts.type.semiBolds
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
  price: {
    marginTop: 2,
    fontSize: Fonts.size.input,
    color: Colors.red,
    fontFamily: Fonts.type.bold
  },
  nominalDiskon: {
    textDecorationLine: 'line-through',
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.regular,
    color: Colors.labelgrey,
    marginTop: 10
  },
  nominalDiskon1: {
    textDecorationLine: 'line-through',
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.regular,
    color: Colors.snow,
    marginTop: 10
  },
  qualityContainer: {
    backgroundColor: Colors.background,
    flexDirection: 'row',
    paddingLeft: 20,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderTopColor: Colors.silver,
    borderBottomColor: Colors.silver
  },
  qualityNoBorderContainer: {
    backgroundColor: Colors.background,
    flexDirection: 'row',
    paddingLeft: 20,
    paddingBottom: 20
  },
  eachQualiy: {
    width: Metrics.screenWidth / 2 - 10,
    marginTop: 20
  },
  eachQualiyNoMargin: {
    width: Metrics.screenWidth / 2 - 10,
    paddingBottom: 24.8
  },
  qualityText: {
    fontSize: Fonts.size.smallMed,
    fontFamily: Fonts.type.bold,
    color: Colors.darkgrey,
    marginBottom: 8
  },
  avgTitle: {
    marginBottom: 21,
    fontFamily: Fonts.type.semiBolds,
    color: Colors.darkgrey,
    paddingLeft: 8.8,
    fontSize: Fonts.size.regular
  },
  staticContainer: {
    backgroundColor: Colors.paleGreyThree,
    paddingLeft: 20,
    paddingRight: 20,
    elevation: 1
  },
  staticList: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.coal
  },
  staticProduct: {
    flex: 1,
    fontFamily: Fonts.type.semiBolds,
    color: Colors.lightblack,
    fontSize: Fonts.size.smallMed,
    paddingTop: 16,
    paddingBottom: 16
  },
  staticProductVal: {
    fontFamily: Fonts.type.semiBolds,
    color: Colors.lightblack,
    fontSize: Fonts.size.smallMed,
    paddingTop: 16,
    paddingBottom: 16
  },
  bigTitle: {
    fontFamily: Fonts.type.bold,
    color: Colors.darkgrey,
    fontSize: Fonts.size.smallMed,
    paddingTop: 33,
    paddingBottom: 16,
    paddingLeft: 20
  },
  infoContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.background,
    paddingLeft: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver,
    elevation: 1
  },
  infoList: {
    flexDirection: 'column',
    width: Metrics.screenWidth / 2 - 10
  },
  infoProduct: {
    fontFamily: Fonts.type.semiBolds,
    color: Colors.lightblack,
    fontSize: Fonts.size.smallMed,
    paddingTop: 20,
    paddingBottom: 5
  },
  infoProductVal: {
    fontFamily: Fonts.type.regular,
    color: Colors.brownishGrey,
    fontSize: Fonts.size.smallMed,
    paddingBottom: 21
  },
  readMoreTextContainer: {
    marginTop: -15,
    paddingTop: 30,
    marginLeft: -20,
    backgroundColor: 'rgba(255, 255, 255, 0.5)'
  },
  readMoreTextContainer1: {
    paddingTop: 10,
    marginLeft: -20,
    backgroundColor: 'rgba(255, 255, 255, 0.5)'
  },
  imageDown: {
    height: 24,
    width: 24
  },
  ulasanContainer: {
    backgroundColor: Colors.background,
    elevation: 1
  },
  styleFoto: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingTop: 20,
    backgroundColor: Colors.background
  },
  border: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver
  },
  namaContainer: {
    flexDirection: 'column',
    flex: 1,
    marginLeft: 16
  },
  textNama: {
    fontFamily: Fonts.type.semiBolds,
    fontSize: Fonts.size.smallMed,
    color: Colors.darkgrey
  },
  textKelola: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.small,
    color: Colors.lightblack,
    opacity: 0.50
  },
  isiUlasan: {
    fontFamily: Fonts.type.regular,
    color: Colors.brownishGrey,
    fontSize: Fonts.size.smallMed,
    paddingBottom: 21.2,
    paddingLeft: 20
  },
  estimasiContainer: {
    backgroundColor: Colors.background
  },
  estimasiFieldContainer: {
    paddingLeft: 20
  },
  imageOperator: {
    width: 24,
    height: 24
  },
  staticList2: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginRight: 11,
    borderBottomWidth: 1,
    borderBottomColor: Colors.silver
  },
  pickerStyle: {
    marginTop: 22.7,
    flex: 1,
    flexWrap: 'wrap',
    paddingBottom: 8.3,
    marginLeft: 15
  },
  lokasiItem: {
    fontFamily: Fonts.type.semiBolds,
    color: Colors.lightblack,
    fontSize: Fonts.size.smallMed,
    marginTop: 22.7,
    width: 76,
    paddingBottom: 8.3
  },
  lokasiContainer: {
    paddingLeft: 20,
    borderBottomWidth: 0.5,
    paddingTop: 25,
    borderTopWidth: 0.5,
    borderTopColor: Colors.silver,
    borderBottomColor: Colors.silver,
    elevation: 1,
    paddingBottom: 28
  },
  allCategory: {
    height: 47.9,
    backgroundColor: Colors.snow,
    alignItems: 'center',
    paddingLeft: 23,
    paddingRight: 11,
    paddingTop: 15,
    paddingBottom: 13.9,
    flexDirection: 'row'
  },
  textAllCategory: {
    flexWrap: 'wrap',
    color: Colors.bluesky,
    flex: 1,
    fontSize: Fonts.size.smallMed,
    fontFamily: Fonts.type.bold,
    letterSpacing: 0.2
  },
  imageCategory: {
    height: 24,
    width: 24
  },
  buttonContainer: {
    height: 66,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: Colors.silver,
    backgroundColor: Colors.snow
  },
  buttonReset: {
    flexDirection: 'row',
    width: 164.4,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.silver,
    borderRadius: 5,
    backgroundColor: Colors.snow,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10
  },
  labelButtonReset: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.bold,
    color: Colors.darkgrey,
    letterSpacing: 0.23,
    marginLeft: 6.8
  },
  buttonOke: {
    width: 164.4,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: Colors.bluesky,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10
  },
  labelButtonOke: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.bold,
    color: Colors.snow,
    letterSpacing: 0.23
  },
  labelButtonFav: {
    fontSize: Fonts.size.smallMed,
    paddingLeft: 3,
    fontFamily: Fonts.type.regular,
    color: Colors.bluesky,
    textAlign: 'center'
  },
  buttonFav: {
    flexDirection: 'row',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.bluesky,
    borderWidth: 1,
    marginRight: 20.2,
    height: 35,
    paddingRight: 14,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 7.8
  },
  labelButtonEstimasi: {
    fontSize: Fonts.size.smallMed,
    paddingLeft: 3,
    fontFamily: Fonts.type.regular,
    color: Colors.bluesky,
    textAlign: 'center'
  },
  buttonEstimasi: {
    flexDirection: 'row',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.bluesky,
    borderWidth: 1,
    padding: 11
  },
  containerNamaToko: {
    flexDirection: 'row',
    flex: 1,
    width: Metrics.screenWidth - 20
  },
  image24p: {
    height: 24,
    width: 24
  },
  flexRow: {
    flexDirection: 'row'
  },
  modalContainer: {
    position: 'absolute',
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  menuLaporkanContainer: {
    position: 'absolute',
    bottom: 25,
    flexDirection: 'column',
    height: 100
  },
  menuProvinsiContainer: {
    position: 'absolute',
    bottom: 20,
    maxHeight: (Metrics.screenHeight * 3) / 4
  },
  menuLaporkan: {
    flex: 1,
    width: Metrics.screenWidth,
    backgroundColor: Colors.snow,
    borderBottomWidth: 1,
    borderBottomColor: Colors.silver,
    alignItems: 'center',
    paddingLeft: 20,
    flexDirection: 'row'
  },
  textBagikan: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.medium,
    letterSpacing: 0.23,
    color: Colors.darkgrey,
    marginLeft: 10
  },
  bukaEstimasiContainer: {
    backgroundColor: Colors.snow,
    padding: 20,
    flexDirection: 'column'
  },
  lokasiContainerKurir: {
    flexDirection: 'column',
    flex: 1
  },
  pilihLokasiContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.silver,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5
  },
  pilihDestinasi: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    flex: 0.75
  },
  imagePicker: {
    height: 24,
    width: 24
  }
})
