import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.paleGrey
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
  maskedImage: {
    height: 30,
    width: 30,
    backgroundColor: Colors.paleGreyFive,
    borderRadius: 200
  },
  image: {
    height: 30,
    width: 30,
    borderRadius: 200
  },
  boldLabel: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.smallMed,
    color: Colors.lightblack
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
  continerColumn: {
    backgroundColor: Colors.snow,
    paddingRight: 15,
    paddingLeft: 15,
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: 'column',
    borderColor: Colors.silver,
    borderBottomWidth: 0.5
  },
  continerAddress: {
    backgroundColor: Colors.snow,
    flexDirection: 'column',
    flex: 1
  },
  continerOrderNoBorder: {
    backgroundColor: Colors.snow,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonContainer: {
    marginTop: 30,
    height: 86,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.snow,
    paddingRight: 20.5,
    paddingLeft: 20.5
  },
  buttonReset: {
    borderWidth: 1,
    borderColor: Colors.bluesky,
    borderRadius: 5,
    backgroundColor: Colors.snow,
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
  buttonOke: {
    borderRadius: 5,
    backgroundColor: Colors.bluesky,
    paddingTop: 13,
    paddingBottom: 13,
    flex: 1
  },
  labelButtonOke: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.bold,
    color: Colors.snow,
    textAlign: 'center'
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
  },
  information: {
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
  textInfo: {
    fontFamily: Fonts.type.semiBolds,
    fontSize: Fonts.size.smallMed,
    color: Colors.blueText,
    lineHeight: 20
  }
})
