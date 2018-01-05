import {StyleSheet} from 'react-native'
import {Colors, Fonts, Metrics} from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.paleGrey
  },
  textTab: {
    fontSize: Fonts.size.smallMed,
    fontFamily: Fonts.type.semiBolds,
    letterSpacing: 0.22,
    marginTop: 5
  },
  iconOcher: {
    marginTop: 5,
    height: 30,
    width: 30
  },
  header: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    backgroundColor: Colors.lightOrange,
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 14,
    paddingRight: 60
  },
  semiboldOcher: {
    marginLeft: 15,
    fontSize: Fonts.size.smallMed,
    fontFamily: Fonts.type.semiBolds,
    color: Colors.ocher,
    lineHeight: 22
  },
  boldOrcher: {
    fontSize: Fonts.size.smallMed,
    fontFamily: Fonts.type.bold,
    color: Colors.ocher,
    lineHeight: 22
  },
  spinner: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Metrics.screenWidth,
    height: Metrics.screenHeight - Metrics.navBarHeight - 100
  },
  containerSnow: {
    backgroundColor: Colors.snow,
    marginBottom: 30.3,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 20,
    paddingBottom: 20.7
  },
  blueButton: {
    backgroundColor: Colors.bluesky,
    paddingBottom: 15.5,
    paddingTop: 15.5,
    borderRadius: 5
  },
  textboldWhite: {
    textAlign: 'center',
    color: Colors.snow,
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.medium
  },
  containerSnowNull: {
    backgroundColor: Colors.snow,
    marginBottom: 30.5
  },
  flexRowBorder: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver,
    alignItems: 'center',
    paddingTop: 15.5,
    paddingBottom: 15.8
  },
  semiboldSlateFlexOne: {
    flex: 1,
    paddingLeft: 15,
    fontSize: Fonts.size.smallMed,
    fontFamily: Fonts.type.semiBolds,
    color: Colors.slate
  },
  regularSlateFlexOne: {
    flex: 1,
    paddingLeft: 15,
    fontSize: Fonts.size.smallMed,
    fontFamily: Fonts.type.semiBolds,
    color: Colors.slate
  },
  semiboldSlate: {
    paddingLeft: 15,
    fontSize: Fonts.size.smallMed,
    fontFamily: Fonts.type.semiBolds,
    color: Colors.slate
  },
  regularBrowGreyFlextwo: {
    textAlign: 'right',
    flex: 2,
    paddingRight: 15,
    fontSize: Fonts.size.smallMed,
    fontFamily: Fonts.type.regular,
    color: Colors.brownishGrey
  },
  regularBrowGrey: {
    textAlign: 'right',
    paddingRight: 15,
    fontSize: Fonts.size.smallMed,
    fontFamily: Fonts.type.regular,
    color: Colors.brownishGrey
  },
  regularcharcoalGrey: {
    textAlign: 'right',
    paddingRight: 15,
    fontSize: Fonts.size.smallMed,
    fontFamily: Fonts.type.regular,
    color: Colors.brownishGrey
  },
  flexRowChild: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconStatus: {
    height: 12,
    width: 12,
    borderRadius: 200,
    backgroundColor: Colors.red,
    marginRight: 9
  },
  photoMasked: {
    height: 25,
    width: 25,
    borderRadius: 200,
    backgroundColor: Colors.paleGreyTwo,
    marginRight: 10
  },
  photo: {
    height: 25,
    width: 25,
    borderRadius: 200,
    marginRight: 10
  },
  flexRowNoBorder: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15.5,
    paddingBottom: 15.8
  },
  textBoldcharcoalGrey: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.smallMed,
    color: Colors.slate,
    paddingBottom: 10,
    paddingLeft: 15
  },
  viewColumn: {
    backgroundColor: Colors.snow,
    marginBottom: 20.4
  },
  borderRow: {
    flexDirection: 'row',
    marginLeft: 20,
    paddingTop: 18,
    paddingRight: 20,
    paddingBottom: 19,
    borderBottomWidth: 0.5,
    alignItems: 'center',
    borderBottomColor: Colors.silver
  },
  labelMessage: {
    fontFamily: Fonts.type.italic,
    fontSize: Fonts.size.smallMed,
    color: Colors.lightgrey
  },
  imageProof: {
    height: 73,
    width: 73,
    borderRadius: 3
  },
  scrollImage: {
    height: 73.5,
    margin: 15
  },
  bgModal: {
    backgroundColor: 'rgba(0,0,0, 0.5)',
    flex: 1
  },
  contaierModal: {
    flex: 1,
    borderRadius: 5,
    marginTop: 75,
    marginBottom: 75,
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
    color: Colors.charcoalGrey,
    letterSpacing: 0.19,
    textAlign: 'center',
    marginBottom: 5,
    marginTop: 150
  },
  titleModal2: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    color: Colors.brownishGrey,
    letterSpacing: 0.19,
    lineHeight: 20,
    textAlign: 'center'
  },
  verifikasiButton: {
    backgroundColor: Colors.bluesky,
    borderRadius: 5,
    marginTop: 25,
    marginBottom: 10,
    height: 50,
    justifyContent: 'center',
    width: 250
  },
  batalButton: {
    borderRadius: 5,
    borderColor: Colors.bluesky,
    borderWidth: 1,
    height: 50,
    justifyContent: 'center',
    width: 250
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
    letterSpacing: 0.23,
    textAlign: 'center'
  },
  border: {
    padding: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver
  },
  textBold: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.smallMed,
    color: Colors.lightblack
  },
  inputContainer: {
    paddingLeft: 15,
    paddingRight: 15
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 15
  },
  buttonReset: {
    borderWidth: 1,
    borderColor: Colors.bluesky,
    borderRadius: 5,
    flex: 1
  },
  labelButtonReset: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.bold,
    color: Colors.bluesky,
    textAlign: 'center',
    paddingBottom: 15.5,
    paddingTop: 15.5
  },
  inputText: {
    marginLeft: -4,
    color: Colors.grey,
    fontSize: Fonts.size.smallMed,
    fontFamily: Fonts.type.regular
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
  modalContainer: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalKatalog: {
    flex: 1,
    marginTop: 90,
    marginLeft: 30.5,
    marginRight: 30.5,
    marginBottom: 323,
    backgroundColor: Colors.snow,
    borderRadius: 5
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 18.5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: Colors.paleGreyFive
  },
  title: {
    color: Colors.darkgrey,
    fontFamily: Fonts.type.semiBolds,
    fontSize: Fonts.size.medium,
    paddingLeft: 20,
    paddingTop: 19.3,
    flex: 1,
    paddingBottom: 19.3
  },
  imagePicker: {
    height: 24,
    width: 24
  },
  flexOne1: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  inputText2: {
    color: Colors.darkgrey,
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    borderBottomWidth: 1,
    borderBottomColor: Colors.silver,
    paddingBottom: 3,
    paddingTop: 5,
    paddingLeft: -1,
    marginLeft: 20,
    marginRight: 20
  },
  buttonnext: {
    height: 50,
    backgroundColor: Colors.bluesky,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    margin: 20
  },
  textButtonNext: {
    color: Colors.background,
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.medium
  },
  inputTextMessage: {
    borderTopColor: Colors.silver,
    borderTopWidth: 0.5,
    paddingLeft: 20,
    paddingTop: 15,
    paddingBottom: 15,
    color: Colors.lightblack,
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed
  },
  containerMessage: {
    flexDirection: 'row',
    flex: 1,
    paddingBottom: 20,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20
  },
  maskedPhoto: {
    height: 40,
    width: 40,
    borderRadius: 200,
    backgroundColor: Colors.paleGreyFive
  },
  photoUser: {
    height: 40,
    width: 40,
    borderRadius: 200
  },
  flexRowMessage: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1
  },
  messageText: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    color: Colors.lightblack,
    lineHeight: 22,
    flex: 1,
    paddingRight: 4
  },
  titleMessage: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.smallMed,
    color: Colors.lightblack,
    flex: 1
  },
  date: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.mediumTiny,
    color: Colors.lightblack,
    opacity: 0.50,
    marginLeft: 14,
    paddingTop: 2,
    textAlign: 'right'
  },
  absolute: {
    position: 'absolute',
    left: Metrics.screenWidth / 2 - 15,
    top: Metrics.screenHeight / 2 + 80,
    backgroundColor: Colors.snow,
    borderRadius: 200,
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5
  }
})
