import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.paleGrey
  },
  dataContainer: {
    backgroundColor: Colors.snow,
    elevation: 2
  },
  product: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver,
    alignItems: 'center'
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10
  },
  dataProduk: {
    flexDirection: 'column',
    flex: 1
  },
  textNamaProduk: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.smallMed,
    letterSpacing: 0.22,
    color: Colors.darkgrey
  },
  textJumlah: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    letterSpacing: 0.22,
    color: Colors.labelgrey
  },
  alamatContainer: {
    flexDirection: 'column',
    padding: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver,
    justifyContent: 'center'
  },
  titleContainer: {
    marginBottom: 4,
    flexDirection: 'row'
  },
  textAlamat: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    lineHeight: 22,
    letterSpacing: 0.22,
    color: Colors.brownishGrey
  },
  infoContainer: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver
  },
  labelContainer: {
    flex: 1
  },
  catatanContainer: {
    padding: 20,
    flexDirection: 'column',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver
  },
  rincianContainer: {
    flexDirection: 'column',
    padding: 20,
    backgroundColor: Colors.paleGreyThree
  },
  labelRincianContainer: {
    marginBottom: 20
  },
  rincian: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textRincian: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    lineHeight: 22,
    marginTop: 5,
    marginBottom: 5,
    letterSpacing: 0.22,
    color: Colors.brownishGrey
  },
  textRincianTotal: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.smallMed,
    lineHeight: 22,
    marginTop: 5,
    marginBottom: 5,
    letterSpacing: 0.22,
    color: Colors.brownishGrey
  },
  totalHargaContainer: {
    backgroundColor: Colors.snow,
    flexDirection: 'column'
  },
  rincianTotalContainer: {
    flexDirection: 'column',
    padding: 20,
    backgroundColor: Colors.snow
  },
  textRincianTotalHijau: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    lineHeight: 22,
    marginTop: 5,
    marginBottom: 5,
    letterSpacing: 0.22,
    color: Colors.green
  },
  sisaPembayaran: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    marginTop: 20,
    borderTopColor: Colors.silver,
    borderTopWidth: 0.5
  },
  sisaPembayaranText: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.medium,
    lineHeight: 22,
    marginTop: 5,
    marginBottom: 5,
    letterSpacing: 0.22,
    color: Colors.darkgrey
  },
  textGanti: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.type.smallMed,
    letterSpacing: 0.22,
    color: Colors.bluesky
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
  buttonAlamat: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.silver,
    backgroundColor: Colors.white
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
  listAlamatContainer: {
    flexDirection: 'column',
    flex: 1,
    marginRight: 10
  },
  textBagikan: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.medium,
    letterSpacing: 0.23,
    color: Colors.darkgrey,
    marginLeft: 10
  },
  spinner: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Metrics.screenWidth,
    backgroundColor: Colors.snow,
    height: 50,
    opacity: 0.5
  },
  buttonContainer: {
    flexDirection: 'row',
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: Colors.bluesky,
    height: 50
  },
  textButton: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.medium,
    letterSpacing: 0.23,
    color: Colors.snow
  },
  imagePicker: {
    height: 24,
    width: 24,
    marginTop: 3
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
  textInput: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    color: Colors.darkgrey,
    letterSpacing: 0.22,
    marginLeft: -3
  },
  spinnerCart: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  }
})
