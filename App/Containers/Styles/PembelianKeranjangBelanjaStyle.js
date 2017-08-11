import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.background
  },
  border: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 2,
    backgroundColor: Colors.background
  },
  textHapus: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.type.smallMed,
    letterSpacing: 0.22,
    color: Colors.red,
    marginRight: 20
  },
  styleFotoToko: {
    width: 40,
    height: 40
  },
  namaContainer: {
    flexDirection: 'column',
    flex: 1,
    marginLeft: 16
  },
  textNama: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.smallMed,
    color: Colors.darkgrey,
    letterSpacing: 0.22,
    marginBottom: 3
  },
  textKelola: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.small,
    color: Colors.lightgrey,
    opacity: 0.50,
    letterSpacing: 0.2
  },
  qualityContainer: {
    backgroundColor: Colors.background,
    flexDirection: 'row',
    paddingLeft: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver
  },
  eachQualiyNoMargin: {
    width: Metrics.screenWidth / 2 - 10,
    paddingBottom: 24.8
  },
  qualityText: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.bold,
    color: Colors.darkgrey,
    marginBottom: 8
  },
  qualityTextBlue: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.bold,
    color: Colors.bluesky
  },
  imageOperator: {
    width: 24,
    height: 24,
    marginRight: 5,
    marginLeft: 5
  },
  textJumlah: {
    flex: 1,
    textAlign: 'center',
    borderBottomColor: Colors.silver,
    borderBottomWidth: 1
  },
  alamatContainer: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver
  },
  alamat: {
    flexDirection: 'column',
    flex: 1
  },
  textAlamat: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    color: Colors.lightgrey,
    letterSpacing: 0.2,
    marginTop: 5
  },
  textGanti: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.type.smallMed,
    letterSpacing: 0.22,
    color: Colors.bluesky
  },
  containerPicker: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20
  },
  catatanContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 20
  },
  teksPicker: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.medium,
    color: Colors.darkgrey,
    letterSpacing: 0.2,
    marginTop: 5,
    marginRight: 10
  },
  imagePicker: {
    height: 24,
    width: 24,
    marginTop: 3
  },
  rincianContainer: {
    flexDirection: 'column',
    padding: 20,
    backgroundColor: Colors.paleGreyThree,
    borderBottomColor: Colors.silver,
    borderBottomWidth: 0.5
  },
  rincian: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10
  },
  rincianDiskon: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  textBold: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.medium,
    color: Colors.darkgrey,
    letterSpacing: 0.2,
    marginTop: 5,
    marginRight: 10
  },
  separator: {
    height: 20,
    backgroundColor: Colors.paleGrey
  },
  diskon: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    letterSpacing: 0.22,
    color: Colors.green,
    marginTop: 10
  },
  totalContainer: {
    flexDirection: 'row'
  },
  total: {
    flex: 1,
    padding: 17,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: Colors.bluesky,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: 40,
    width: Metrics.screenWidth / 2 - 36
  },
  textButton: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.type.medium,
    color: Colors.snow
  },
  hargaTotal: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.regular,
    letterSpacing: 0.3,
    color: Colors.red
  },
  modalContainer: {
    position: 'absolute',
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  menuProvinsiContainer: {
    position: 'absolute',
    backgroundColor: Colors.snow,
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
  headerListView: {
    height: 60,
    backgroundColor: Colors.snow,
    padding: 20,
    justifyContent: 'center',
    borderBottomColor: Colors.silver,
    borderBottomWidth: 1
  },
  headerTextListView: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.medium,
    letterSpacing: 0.23,
    color: Colors.darkgrey
  },
  logoEkspedisi: {
    height: 15,
    width: 50,
    resizeMode: 'contain',
    marginRight: 10,
    marginLeft: -5,
    marginTop: 3
  },
  gambarCentang: {
    width: 24,
    height: 24,
    top: -2,
    marginRight: 15
  },
  containerModalPromo: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 200,
    backgroundColor: Colors.snow,
    borderRadius: 5,
    flexDirection: 'column'
  },
  headerModalPromo: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lightgrey2
  },
  bodyModalPromo: {
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    padding: 20,
    flexDirection: 'column',
    backgroundColor: Colors.snow
  },
  inputContainer: {
    flexDirection: 'row',
    borderBottomColor: Colors.silver,
    borderBottomWidth: 1
  },
  inputKode: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.medium,
    color: Colors.darkgrey,
    letterSpacing: 0.22,
    marginLeft: -3,
    flex: 1
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20
  },
  buttonVoucher: {
    height: 50,
    borderRadius: 5,
    flex: 1,
    backgroundColor: Colors.bluesky,
    alignItems: 'center',
    justifyContent: 'center'
  },
  spinner: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Metrics.screenWidth,
    backgroundColor: Colors.snow,
    height: 50,
    opacity: 0.5
  },
  buttonAlamat: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.silver,
    backgroundColor: Colors.white
  },
  listAlamatContainer: {
    flexDirection: 'column',
    flex: 1,
    marginRight: 10
  },
  arrow: {
    width: 24,
    height: 24,
    marginRight: 20
  },
  bucketContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: 50
  },
  bucket: {
    width: 159,
    height: 126,
    marginBottom: 30
  },
  textBucket: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    lineHeight: 22,
    letterSpacing: 0.22,
    textAlign: 'center',
    color: Colors.labelgrey,
    marginBottom: 25
  },
  spinnerBucket: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.snow,
    flex: 1
  }
})
