import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
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
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.paleGrey
  },
  header: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: Colors.background,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver,
    alignItems: 'center',
    justifyContent: 'center'
  },
  state: {
    borderRadius: 21,
    height: 21,
    width: 21,
    borderWidth: 0.8,
    borderColor: Colors.silver,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textState: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.tiny,
    color: Colors.labelgrey
  },
  line: {
    width: 21,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver
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
  title: {
    color: Colors.darkgrey,
    fontFamily: Fonts.type.semiBolds,
    fontSize: Fonts.size.medium,
    paddingLeft: 20,
    paddingTop: 19.3,
    paddingBottom: 10.7
  },
  spesifkasi: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 30,
    backgroundColor: Colors.snow
  },
  paddingSix: {
    paddingBottom: 6
  },
  buttonTambahDaftarHargaGrosir: {
    backgroundColor: Colors.snow,
    paddingLeft: 20,
    paddingTop: 18,
    paddingBottom: 18
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  titleContainer: {
    color: Colors.labelgrey,
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed
  },
  left: {
    flex: 3
  },
  flexOne: {
    flex: 1
  },
  right: {
    flex: 1,
    marginLeft: 40
  },
  rowBerat: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingTop: 30,
    borderBottomColor: Colors.silver
  },
  inputText: {
    color: Colors.darkgrey,
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    borderBottomWidth: 1,
    borderBottomColor: Colors.silver,
    paddingBottom: 3,
    paddingTop: 5,
    paddingLeft: -1
  },
  inputNoBOrder: {
    flex: 1,
    color: Colors.darkgrey,
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    paddingBottom: 3,
    paddingTop: 5,
    paddingLeft: 1
  },
  rowDiskon: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.silver
  },
  radio: {
    marginTop: 20
  },
  flexRowOpsi: {
    flexDirection: 'row',
    borderBottomColor: Colors.silver,
    borderBottomWidth: 0.5
  },
  checkBox: {
    width: 25,
    height: 25,
    borderWidth: 1,
    borderColor: Colors.silver,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  gambarCentangBox: {
    width: 24,
    height: 24
  },
  textTitleOpsi: {
    color: Colors.darkgrey,
    paddingBottom: 4,
    paddingRight: 10,
    fontFamily: Fonts.type.semiBolds,
    fontSize: Fonts.size.smallMed
  },
  textDescOpsi: {
    color: Colors.brownishGrey,
    lineHeight: 22,
    paddingBottom: 18,
    paddingRight: 10,
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed
  },
  linkDesc: {
    color: Colors.bluesky,
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.smallMed,
    paddingBottom: 20
  },
  titleDarkContainer: {
    color: Colors.darkgrey,
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.silver
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
  inputPicker: {
    flex: 1,
    color: Colors.darkgrey,
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    paddingBottom: 2,
    paddingTop: 5,
    paddingLeft: -1
  },
  borderBottom: {
    marginBottom: 0
  },
  rincianContainrer: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver,
    borderTopWidth: 0.5,
    borderTopColor: Colors.silver,
    backgroundColor: Colors.paleGrey,
    marginBottom: -10,
    paddingTop: 20,
    marginLeft: -20,
    marginRight: -20,
    marginTop: 20
  },
  hapus: {
    paddingTop: 24.4,
    alignItems: 'flex-end'
  },
  texthapus: {
    color: Colors.red,
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.smallMed
  },
  containerRincian: {
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
    paddingBottom: 15.8,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver
  },
  textRincian: {
    flex: 1,
    paddingTop: 15.3,
    color: Colors.darkgrey,
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed
  },
  padding: {
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: Colors.snow
  },
  title2: {
    color: Colors.darkgrey,
    fontFamily: Fonts.type.semiBolds,
    fontSize: Fonts.size.medium,
    paddingTop: 19.3,
    paddingBottom: 10.7
  },
  headerModal: {
    elevation: 1,
    backgroundColor: Colors.snow,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 18,
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center'
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
  // modalContainer: {
  //   position: 'absolute',
  //   width: Metrics.screenWidth,
  //   height: Metrics.screenHeight,
  //   backgroundColor: 'rgba(0,0,0,0.5)'
  // },
  menuProvinsiContainer: {
    position: 'absolute',
    bottom: 20,
    maxHeight: (Metrics.screenHeight * 3) / 4
  }
})
