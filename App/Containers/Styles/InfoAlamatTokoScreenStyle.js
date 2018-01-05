import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.snow
  },
  spinner: {
    position: 'absolute',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    opacity: 0.5
  },
  header: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: Colors.background,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver,
    alignItems: 'center',
    justifyContent: 'center'
  },
  state: {
    borderRadius: 21,
    height: 25,
    width: 25,
    borderWidth: 1,
    borderColor: Colors.silver,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textState: {
    fontSize: Fonts.size.smallMed,
    color: Colors.silver,
    letterSpacing: 0.22
  },
  line: {
    width: 25,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver
  },
  containerFoto: {
    paddingTop: 45.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background
  },
  textLabel: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    color: Colors.labelgrey,
    paddingBottom: 15
  },
  textLabelError1: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.small,
    color: Colors.lightblack,
    paddingTop: 5,
    paddingBottom: 20
  },
  textLabelErrorInfo: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.small,
    color: Colors.lightblack,
    paddingTop: 5
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.silver
  },
  inputText: {
    marginLeft: -4,
    color: Colors.lightblack,
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    paddingBottom: 8.3
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
  infoAlamatContainer: {
    paddingLeft: 20.8,
    paddingRight: 20.8,
    paddingTop: 17.8,
    backgroundColor: Colors.background
  },
  pilihAlamat: {
    flexDirection: 'row',
    backgroundColor: Colors.paleGrey,
    height: 45.7,
    borderRadius: 5,
    alignItems: 'center',
    paddingRight: 4,
    marginBottom: 19.3
  },
  textButtonPilihAlamat: {
    flex: 1,
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.smallMed,
    color: Colors.bluesky,
    marginLeft: 11.4
  },
  contaierModal: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center'
  },
  renderRowContainer: {
    backgroundColor: Colors.background
  },
  rowContainer: {
    flexDirection: 'column',
    flex: 1
  },
  titlePilihAlamat: {
    borderBottomColor: Colors.silver,
    borderBottomWidth: 0.5,
    justifyContent: 'center'
  },
  textTitleAlamat: {
    justifyContent: 'center',
    borderBottomColor: Colors.silver,
    borderBottomWidth: 0.5,
    paddingLeft: 20,
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.medium
  },
  textJenisAlamat: {
    paddingLeft: 20,
    paddingTop: 19,
    fontFamily: Fonts.type.semiBolds,
    fontSize: Fonts.size.smallMed,
    color: Colors.darkgrey
  },
  textAlamatLengkap: {
    paddingLeft: 20,
    paddingTop: 3,
    paddingRight: 80,
    paddingBottom: 20.5,
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    letterSpacing: 0.22,
    lineHeight: 23,
    color: Colors.lightgrey
  },
  pilihDestinasi: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 3
  },
  imagePicker: {
    height: 24,
    width: 24
  },
  lokasiSeparator: {
    marginBottom: 24.8
  },
  bgModal: {
    backgroundColor: 'rgba(0,0,0, 0.8)',
    flex: 1
  },
  menuProvinsiContainer: {
    position: 'absolute',
    bottom: 20,
    maxHeight: (Metrics.screenHeight * 3) / 4
  },
  modalContainer: {
    position: 'absolute',
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  contaierModalSukses: {
    flex: 1,
    borderRadius: 5,
    marginTop: 75,
    marginBottom: 75,
    marginLeft: 30.5,
    marginRight: 30.5,
    backgroundColor: Colors.snow,
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleModal: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.medium,
    color: Colors.darkgrey,
    lineHeight: 22,
    letterSpacing: 0.22,
    textAlign: 'center',
    marginBottom: 6,
    marginTop: 29.5
  },
  titleModal2: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    color: Colors.brownishGrey,
    letterSpacing: 0.22,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 6
  },
  verifikasiButton: {
    backgroundColor: Colors.bluesky,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 20,
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
  image: {
    height: 133,
    width: 132
  }
})
