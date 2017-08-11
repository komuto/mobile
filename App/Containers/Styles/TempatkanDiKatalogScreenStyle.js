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
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.snow
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
  border: {
    elevation: 1
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
  namaContainer: {
    flexDirection: 'column',
    flex: 1,
    marginLeft: 16
  },
  rowContainer: {
    flexDirection: 'row'
  },
  textNama: {
    fontFamily: Fonts.type.semiBolds,
    fontSize: Fonts.size.smallMed,
    color: Colors.darkgrey
  },
  textKelola: {
    fontFamily: Fonts.type.semiBolds,
    fontSize: Fonts.size.small,
    color: Colors.red
  },
  styleFotoToko: {
    width: 40,
    height: 40
  },
  bigTitle: {
    fontFamily: Fonts.type.semiBolds,
    fontSize: Fonts.size.smallMed,
    color: Colors.darkgrey,
    padding: 20
  },
  containerCatalog: {
    backgroundColor: Colors.snow,
    flex: 1
  },
  buttonAddCatalog: {
    marginLeft: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver
  },
  bubttonAddCatalog: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.smallMed,
    color: Colors.bluesky,
    paddingTop: 19,
    paddingBottom: 19
  },
  radioContainer: {
    flex: 1,
    paddingLeft: 5,
    paddingTop: 15.8,
    paddingBottom: 27
  },
  buttonnext: {
    height: 50,
    backgroundColor: Colors.bluesky,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    margin: 15
  },
  textButtonNext: {
    color: Colors.background,
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.medium
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
    alignItems: 'center'
  },
  title: {
    color: Colors.darkgrey,
    fontFamily: Fonts.type.semiBolds,
    fontSize: Fonts.size.medium,
    paddingLeft: 20,
    paddingTop: 19.3,
    paddingBottom: 10.7
  },
  imagePicker: {
    height: 24,
    width: 24
  },
  flexOne: {
    flex: 1
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
  }
})
