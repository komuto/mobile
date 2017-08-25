import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.background
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
    borderWidth: 0.5,
    borderColor: Colors.silver,
    backgroundColor: Colors.paleGreyThree
  },
  list: {
    marginLeft: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver
  },
  row: {
    flexDirection: 'row',
    paddingLeft: 20.3,
    paddingTop: 20,
    paddingBottom: 20.3,
    alignItems: 'center'
  },
  title: {
    flex: 1,
    marginLeft: 11,
    fontFamily: Fonts.type.semiBolds,
    fontSize: Fonts.size.smallMed,
    color: Colors.darkgrey
  },
  check: {
    height: 25,
    width: 25
  },
  imageProduct: {
    height: 35,
    width: 35,
    borderRadius: 3,
    marginLeft: 19.3
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
  buttonNext: {
    height: 50,
    backgroundColor: Colors.bluesky,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textButtonNext: {
    color: Colors.background,
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.medium
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
  bgModal: {
    backgroundColor: 'rgba(0,0,0, 0.8)',
    flex: 1
  },
  contaierModal: {
    flex: 1,
    borderRadius: 5,
    marginTop: 126,
    marginBottom: 126,
    marginLeft: 30.5,
    marginRight: 30.5,
    paddingTop: 120,
    backgroundColor: Colors.snow,
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleModal: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.medium,
    color: Colors.darkgrey,
    letterSpacing: 0.19,
    textAlign: 'center',
    marginBottom: 6
  },
  verifikasiButton: {
    backgroundColor: Colors.bluesky,
    borderRadius: 5,
    marginTop: 31,
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
  headerCatalog: {
    backgroundColor: Colors.snow,
    padding: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver
  },
  headerText: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    color: Colors.lightblack,
    lineHeight: 20
  },
  containerHeader: {
    backgroundColor: Colors.paleGreyThree,
    paddingLeft: 20,
    paddingTop: 14.5,
    paddingBottom: 14.5,
    paddingRight: 47,
    borderWidth: 0.5,
    borderColor: Colors.silver
  }
})
