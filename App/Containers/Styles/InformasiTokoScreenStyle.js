import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.snow
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
  foto: {
    height: 110,
    width: 110,
    backgroundColor: Colors.paleGrey,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 200,
    marginBottom: 21.1
  },
  fotoStyle: {
    height: 99,
    width: 99,
    borderRadius: 200
  },
  uploadText: {
    color: Colors.bluesky,
    fontSize: Fonts.size.smallMed,
    fontFamily: Fonts.type.bold
  },
  infoPemilikContainer: {
    paddingLeft: 22,
    paddingRight: 22,
    paddingTop: 26.8,
    paddingBottom: 10.8,
    backgroundColor: Colors.background
  },
  infoContainer: {
    paddingLeft: 22,
    paddingRight: 22,
    paddingTop: 45.5,
    backgroundColor: Colors.background
  },
  textLabel: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    color: Colors.labelgrey
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.silver
  },
  textInfoPemilik: {
    paddingTop: 8,
    paddingBottom: 30,
    fontFamily: Fonts.type.semiBolds,
    fontSize: Fonts.size.smallMed,
    color: Colors.darkgrey
  },
  inputText: {
    marginLeft: -4,
    color: Colors.darkgrey,
    fontFamily: Fonts.type.semiBolds,
    fontSize: Fonts.size.smallMed,
    paddingBottom: 8.3
  },
  buttonnext: {
    height: 50,
    backgroundColor: Colors.bluesky,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    marginTop: 10
  },
  textButtonNext: {
    color: Colors.background,
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.medium
  },
  titleEkspedisi: {
    backgroundColor: Colors.paleGrey,
    paddingLeft: 20,
    paddingBottom: 15,
    paddingTop: 20,
    paddingRight: 62
  },
  textTitle: {
    lineHeight: 21,
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    color: Colors.darkgrey
  },
  containerEkspedisi: {
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomColor: Colors.silver,
    borderBottomWidth: 0.5,
    paddingBottom: 16.7
  },
  box: {
    width: 25,
    height: 25,
    borderWidth: 1,
    borderColor: Colors.silver,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  gambarCentangBox: {
    height: 25,
    width: 25
  },
  title: {
    flex: 1,
    marginLeft: 11,
    fontFamily: Fonts.type.semiBolds,
    fontSize: Fonts.size.smallMed,
    color: Colors.darkgrey
  },
  name: {
    marginLeft: 0,
    fontFamily: Fonts.type.semiBolds,
    fontSize: Fonts.size.smallMed,
    color: Colors.darkgrey
  },
  containerSinge: {
    width: Metrics.screenWidth,
    backgroundColor: Colors.background,
    paddingLeft: 20,
    paddingRight: 14.5,
    paddingTop: 16.7,
    paddingBottom: 20.7
  },
  separator: {
    backgroundColor: Colors.paleGrey,
    height: 20.7
  },
  childEkspedisi: {
    paddingTop: 19.8,
    alignItems: 'center',
    flexDirection: 'row'
  },
  inputContainerMod: {
    marginTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: Colors.silver,
    backgroundColor: 'red'
  },
  inputTextMod: {
    height: 40,
    flex: 1,
    color: Colors.grey,
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
  bgModal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)'
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
  scrollView: {
    height: Metrics.screenHeight,
    paddingBottom: 21.5
  },
  pilihDestinasi: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 2.5
  },
  imagePicker: {
    height: 24,
    width: 24
  },
  lokasiSeparator: {
    marginBottom: 24.8
  },
  modalContainer: {
    flex: 1,
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    backgroundColor: 'rgba(0,0,0,0.5)'
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
  }
})
