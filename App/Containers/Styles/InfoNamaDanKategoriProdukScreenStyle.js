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
    backgroundColor: Colors.snow
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
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 33
  },
  textButtonNext: {
    color: Colors.background,
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.regular
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
    color: Colors.darkgrey
  },
  inputText: {
    color: Colors.darkgrey,
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    borderBottomWidth: 1,
    borderBottomColor: Colors.silver,
    paddingBottom: 2,
    paddingTop: 5,
    paddingLeft: -1
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
  textError: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.small,
    textAlign: 'center',
    opacity: 0.8,
    paddingBottom: 10.8
  },
  lokasiSeparator: {
    marginBottom: 24.8
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
    position: 'absolute',
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  menuLaporkanContainer: {
    position: 'absolute',
    bottom: 25,
    flexDirection: 'column',
    height: 100
  },
  menuProvinsiContainer: {
    position: 'absolute',
    bottom: 20,
    maxHeight: (Metrics.screenHeight * 3) / 4
  },
  box: {
    width: 25,
    height: 25,
    borderWidth: 1,
    borderColor: Colors.silver,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  gambarCentangBox: {
    height: 25,
    width: 25
  }
})
