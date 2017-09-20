import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.paleGrey,
    marginTop: Metrics.navBarHeight
  },
  textTab: {
    fontSize: Fonts.size.smallMed,
    fontFamily: Fonts.type.semiBolds,
    letterSpacing: 0.22,
    marginTop: 5
  },
  scrollView: {
    paddingBottom: 10
  },
  containerLoading: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0, 0.1)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loading: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  spinner: {
    position: 'absolute',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: Metrics.screenWidth,
    height: Metrics.screenHeight
  },
  information: {
    flexDirection: 'row',
    backgroundColor: Colors.duckEggBlue,
    paddingLeft: 14,
    paddingRight: 18,
    paddingTop: 20.5,
    paddingBottom: 20.5,
    alignItems: 'flex-start'
  },
  iconInfoBlue: {
    height: 30,
    width: 30,
    marginTop: 5
  },
  textInfo: {
    fontFamily: Fonts.type.semiBolds,
    fontSize: Fonts.size.smallMed,
    color: Colors.blueText,
    marginLeft: 15,
    marginRight: 66,
    lineHeight: 20
  },
  containerBuyer: {
    flexDirection: 'row',
    backgroundColor: Colors.snow,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 21.5,
    paddingBottom: 21.5,
    alignItems: 'center',
    marginBottom: 20.6
  },
  flexOne: {
    flex: 1
  },
  textSemiBold: {
    fontFamily: Fonts.type.semiBolds,
    fontSize: Fonts.size.smallMed,
    color: Colors.darkgrey
  },
  containerPhoto: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  labelText: {
    fontFamily: Fonts.type.semiBolds,
    fontSize: Fonts.size.smallMed,
    color: Colors.darkgrey,
    flex: 1
  },
  maskedImageProfile: {
    height: 30,
    width: 30,
    backgroundColor: Colors.paleGreyFive,
    borderRadius: 200
  },
  imageProfile: {
    height: 30,
    width: 30,
    borderRadius: 200
  },
  maskedSmallImageProduct: {
    height: 30,
    width: 30,
    backgroundColor: Colors.paleGreyFive,
    borderRadius: 3,
    marginRight: 5.1
  },
  imageSmallProduct: {
    height: 30,
    width: 30,
    borderRadius: 3,
    marginRight: 5.1
  },
  placeholder: {
    position: 'absolute',
    left: 1,
    backgroundColor: 'rgba(0,0,0,0.2)'
  },
  viewColumn: {
    backgroundColor: Colors.snow,
    marginBottom: 20.4
  },
  border: {
    paddingLeft: 20,
    paddingTop: 18,
    paddingBottom: 19,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver
  },
  textBold: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.smallMed,
    color: Colors.lightblack
  },
  textSemiBoldslate: {
    fontFamily: Fonts.type.semiBolds,
    fontSize: Fonts.size.smallMed,
    color: Colors.lightblack,
    flex: 1
  },
  textRegularSlate: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    color: Colors.lightblack
  },
  borderRow: {
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
    paddingTop: 18,
    paddingBottom: 19,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver
  },
  buttonContainer: {
    height: 86,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingRight: 20,
    paddingLeft: 20
  },
  buttonReset: {
    borderWidth: 1,
    borderColor: Colors.bluesky,
    borderRadius: 5,
    paddingTop: 13,
    paddingBottom: 13,
    flex: 1
  },
  labelButtonReset: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.bold,
    color: Colors.bluesky,
    textAlign: 'center'
  },
  inputText: {
    marginLeft: -4,
    color: Colors.grey,
    fontSize: Fonts.size.smallMed,
    paddingBottom: 8.3
  },
  inputContainer: {
    margin: 20
  },
  continerOrder: {
    backgroundColor: Colors.snow,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.silver,
    borderBottomWidth: 0.5
  },
  labelStyle: {
    fontFamily: Fonts.type.semiBolds,
    fontSize: Fonts.size.smallMed,
    color: Colors.lightblack,
    flex: 1
  },
  valueStyle: {
    fontFamily: Fonts.type.semiBolds,
    fontSize: Fonts.size.smallMed,
    color: Colors.lightgrey
  },
  bigTitle: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.smallMed,
    color: Colors.lightblack,
    marginTop: 30.7,
    marginBottom: 10,
    marginLeft: 15
  },
  buttonFav: {
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.bluesky,
    borderWidth: 1,
    height: 35,
    paddingRight: 14,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 14
  },
  labelButtonFav: {
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.bold,
    color: Colors.bluesky,
    textAlign: 'center'
  },
  maskedImageProduct: {
    height: 60,
    width: 60,
    backgroundColor: Colors.paleGreyFive,
    borderRadius: 3
  },
  imageProduct: {
    height: 60,
    width: 60,
    borderRadius: 3
  },
  product: {
    justifyContent: 'flex-start',
    paddingLeft: 15
  },
  labelProduct: {
    fontFamily: Fonts.type.semiBolds,
    fontSize: Fonts.size.smallMed,
    color: Colors.lightblack,
    paddingBottom: 5
  },
  labelProduct2: {
    fontFamily: Fonts.type.semiBolds,
    fontSize: Fonts.size.smallMed,
    color: Colors.darkgrey,
    paddingBottom: 5
  },
  labelMessage: {
    fontFamily: Fonts.type.italic,
    fontSize: Fonts.size.smallMed,
    color: Colors.lightgrey
  },
  continerAddress: {
    backgroundColor: Colors.snow,
    flexDirection: 'column',
    flex: 1
  },
  informationReseller: {
    borderRadius: 5,
    flexDirection: 'column',
    backgroundColor: Colors.duckEggBlue,
    margin: 15,
    paddingLeft: 15,
    paddingRight: 42,
    paddingTop: 15,
    paddingBottom: 15,
    alignItems: 'center'
  },
  textInfoReseller: {
    fontFamily: Fonts.type.semiBolds,
    fontSize: Fonts.size.smallMed,
    color: Colors.blueText,
    lineHeight: 20
  },
  continerOrderNoBorder: {
    backgroundColor: Colors.snow,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  bgModal: {
    backgroundColor: Colors.snow,
    // backgroundColor: 'rgba(0,0,0, 0.8)',
    flex: 1
  },
  bgModal2: {
    backgroundColor: 'rgba(0,0,0, 0.8)',
    flex: 1
  },
  contaierModal: {
    flex: 1,
    borderRadius: 5,
    marginTop: 68,
    marginBottom: 68,
    marginLeft: 30.5,
    marginRight: 30.5,
    paddingTop: 30,
    backgroundColor: Colors.snow,
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleModal: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.medium,
    color: Colors.lightblack,
    letterSpacing: 0.19,
    textAlign: 'center',
    marginBottom: 7.8,
    marginTop: 19
  },
  titleModal2: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.medium,
    color: Colors.lightgrey,
    letterSpacing: 0.19,
    lineHeight: 21,
    textAlign: 'center'
  },
  verifikasiButton: {
    backgroundColor: Colors.bluesky,
    borderRadius: 5,
    marginTop: 25,
    marginBottom: 25.5,
    height: 50,
    justifyContent: 'center',
    width: 250
  },
  batalButton: {
    borderRadius: 5
  },
  textVerifikasiButton: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.medium,
    color: Colors.background,
    letterSpacing: 0.23,
    textAlign: 'center'
  },
  textBatalButton: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.medium,
    color: Colors.bluesky,
    letterSpacing: 0.23
  }
})
