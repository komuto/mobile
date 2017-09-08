import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.paleGrey
  },
  border: {
    marginLeft: 19.5
  },
  notif: {
    flexDirection: 'row',
    backgroundColor: Colors.duckEggBlue,
    alignItems: 'center',
    paddingRight: 19,
    position: 'relative'
  },
  textNotif: {
    flex: 1,
    padding: 20,
    color: Colors.greenish,
    fontFamily: Fonts.type.semiBolds,
    fontSize: Fonts.size.smallMed
  },
  image: {
    height: 25,
    width: 25
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
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingRight: 13,
    paddingTop: 20,
    paddingBottom: 19,
    borderBottomColor: Colors.whiteTwo,
    borderBottomWidth: 0.5,
    backgroundColor: Colors.background
  },
  styleFotoToko: {
    width: 30,
    height: 30,
    borderRadius: 3
  },
  namaContainer: {
    flexDirection: 'column',
    flex: 1,
    marginLeft: 20
  },
  textNama: {
    fontFamily: Fonts.type.semiBolds,
    fontSize: Fonts.size.smallMed,
    color: Colors.darkgrey
  },
  textKelola: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.small,
    color: Colors.lightgrey,
    opacity: 0.50,
    paddingTop: 3
  },
  styleFoto: {
    width: 24,
    height: 24
  },
  messages: {
    paddingBottom: 20,
    paddingTop: 10,
    paddingRight: 30,
    borderBottomColor: Colors.whiteTwo,
    borderBottomWidth: 0.5
  },
  textMessage: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    color: Colors.brownishGrey,
    lineHeight: 23
  },
  status: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 20,
    paddingTop: 20
  },
  renderRow: {
    marginBottom: 20,
    elevation: 0.1,
    backgroundColor: Colors.snow
  },
  iconStatus: {
    width: 15,
    height: 15,
    marginRight: 15,
    borderRadius: 200,
    backgroundColor: Colors.red
  },
  containerEmpty: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 63
  },
  textTitleEmpty: {
    paddingTop: 27.5,
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.medium,
    textAlign: 'center',
    color: Colors.darkgrey
  },
  textTitleEmpty2: {
    paddingTop: 5,
    lineHeight: 22,
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    textAlign: 'center',
    color: Colors.lightgrey
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
  tabWaiting: {
    backgroundColor: Colors.snow,
    marginTop: 10,
    padding: 20
  },
  containerResolution: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  textResolution: {
    flex: 1,
    fontFamily: Fonts.type.semiBolds,
    fontSize: Fonts.size.smallMed,
    color: Colors.darkgrey,
    lineHeight: 21,
    paddingBottom: 10
  },
  textStatus: {
    fontFamily: Fonts.type.semiBolds,
    fontSize: Fonts.size.smallMed,
    color: Colors.bluesky
  },
  label: {
    backgroundColor: 'rgba(86, 170, 239, 0.11)',
    marginLeft: 30,
    borderRadius: 5,
    paddingRight: 15.5,
    paddingLeft: 12.5,
    paddingTop: 3.5,
    paddingBottom: 3.5
  },
  containerStatus: {
    paddingBottom: 16.5,
    paddingTop: 16.5,
    backgroundColor: Colors.iceBlue,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 19
  },
  circle: {
    height: 20,
    width: 20,
    borderRadius: 200,
    backgroundColor: 'rgba(71, 191, 126, 0.27)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10.5
  },
  label2: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.small,
    color: Colors.darkMint
  },
  label3: {
    fontFamily: Fonts.type.semiBolds,
    fontSize: Fonts.size.smallMed,
    color: Colors.darkMint
  },
  date: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    color: Colors.labelgrey
  },
  create: {
    position: 'absolute',
    bottom: 100,
    right: 30,
    backgroundColor: Colors.bluesky,
    borderRadius: 200,
    height: 56,
    width: 56,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5
  },
  imageTambah: {
    height: 24,
    width: 24
  },
  header: {
    height: Metrics.navBarHeight,
    backgroundColor: Colors.red,
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center'
  },
  modalContainer: {
    width: Metrics.screenWidth,
    backgroundColor: Colors.snow
  },
  scrollViewModal: {
    position: 'absolute',
    bottom: 20
  },
  touchableClose: {
    flex: 1,
    alignItems: 'flex-end'
  },
  textHeader: {
    fontFamily: Fonts.type.bold,
    fontSize: 16,
    color: Colors.snow,
    flex: 4
  },
  containerComplaint: {
    flex: 1,
    padding: 20
  },
  textTitle: {
    fontFamily: Fonts.type.semiBolds,
    fontSize: Fonts.size.smallMed,
    color: Colors.labelgrey
  },
  continerCheckBox: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 15.7,
    paddingBottom: 5
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
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    color: Colors.lightblack
  },
  inputContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver
  },
  inputText: {
    marginLeft: -4,
    color: Colors.lightblack,
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    paddingBottom: 8.3
  },
  camera: {
    flex: 1,
    marginRight: 20
  },
  foto: {
    marginTop: 25,
    marginRight: 18
  },
  fotoTumb: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: 100,
    borderRadius: 3,
    backgroundColor: Colors.paleGreyFour
  },
  imageProduk: {
    height: 100,
    width: 100
  },
  containerDiskon: {
    position: 'absolute',
    left: 85,
    bottom: 85
  },
  imageClose: {
    height: 25,
    width: 25
  },
  imageTambahProduk: {
    height: 30,
    width: 30
  },
  buttonnext: {
    height: 50,
    backgroundColor: Colors.bluesky,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 20
  },
  textButtonNext: {
    color: Colors.background,
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.medium
  }
})
