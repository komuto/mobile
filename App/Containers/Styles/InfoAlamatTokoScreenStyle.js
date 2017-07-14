import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.paleGrey
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
    borderColor: Colors.silver
  },
  textState: {
    fontSize: Fonts.size.smallMed,
    color: Colors.steel,
    textAlign: 'center',
    letterSpacing: 0.22,
    padding: 2.5
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
    color: Colors.labelgrey
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.silver
  },
  inputText: {
    marginLeft: -4,
    color: Colors.grey,
    fontSize: Fonts.size.smallMed,
    paddingBottom: -8.3,
    paddingTop: -10
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
    marginBottom: 54
  },
  textButtonNext: {
    color: Colors.background,
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.regular
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
  modalContainer: {
    flex: 1,
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    backgroundColor: 'rgba(0,0,0,0.5)'
  }
})
