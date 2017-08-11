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
    marginBottom: 21.1,
    borderWidth: 7,
    borderColor: Colors.coolGreyThree
  },
  fotoStyle: {
    height: 100,
    width: 100,
    borderRadius: 200
  },
  uploadText: {
    color: Colors.bluesky,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.bold
  },
  buttonnext: {
    height: 50,
    backgroundColor: Colors.bluesky,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 20.3,
    marginRight: 20.3,
    marginTop: 20.8,
    marginBottom: 20
  },
  textButtonNext: {
    color: Colors.background,
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.medium
  },
  infoContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 40.6,
    backgroundColor: Colors.background
  },
  textLabel: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    color: Colors.labelgrey
  },
  inputText: {
    marginLeft: -1,
    color: Colors.darkgrey,
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    borderBottomWidth: 1,
    borderBottomColor: Colors.silver,
    paddingBottom: 8.3,
    paddingLeft: -1
  },
  radioLabel: {
    marginTop: 20.8,
    color: Colors.labelgrey,
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    marginBottom: 4
  },
  lokasiSeparator: {
  },
  inputContainer: {
    marginTop: 40,
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
  bgModal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  rowContainer: {
    flexDirection: 'column'
  },
  modalContainer: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  menuProvinsiContainer: {
    maxHeight: (Metrics.screenHeight - 20)
  },
  modalHeader: {
    backgroundColor: Colors.snow,
    flexDirection: 'row',
    paddingLeft: 20.1,
    paddingTop: 16.5,
    paddingBottom: 18,
    paddingRight: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.silver,
    justifyContent: 'center'
  },
  modalSearch: {
    backgroundColor: Colors.snow,
    flexDirection: 'row',
    paddingLeft: 15,
    paddingTop: 15,
    paddingBottom: 5,
    paddingRight: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.silver,
    justifyContent: 'center'
  },
  closeImage: {
    height: 24,
    width: 24
  },
  textModalTitle: {
    flex: 1,
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.medium
  },
  textSearch: {
    textAlign: 'left',
    flex: 1,
    marginLeft: 21.4,
    color: Colors.labelgrey,
    fontSize: Fonts.size.smallMed,
    fontFamily: Fonts.type.regular,
    height: 45.8,
    backgroundColor: Colors.snow,
    paddingBottom: 5,
    marginTop: -15
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
  }
})

