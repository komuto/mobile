import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.background
  },
  headerContainer: {
    padding: 20,
    backgroundColor: Colors.paleGrey,
    justifyContent: 'center'
  },
  headerText: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.medium,
    letterSpacing: 0.22,
    color: Colors.darkgrey
  },
  infoAlamatContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 30,
    flexDirection: 'column'
  },
  input: {
    fontFamily: Fonts.type.regular,
    paddingLeft: -3,
    paddingBottom: -5,
    fontSize: Fonts.size.medium,
    color: Colors.darkgrey,
    borderBottomWidth: 1,
    borderBottomColor: Colors.silver,
    letterSpacing: 0.2,
    marginTop: 30
  },
  teks: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    color: Colors.darkgrey,
    letterSpacing: 0.2,
    marginTop: 5
  },
  containerPicker: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.silver,
    marginTop: 40,
    paddingBottom: 5,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  teksPicker: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.medium,
    color: Colors.darkgrey,
    letterSpacing: 0.2,
    marginTop: 5
  },
  imagePicker: {
    height: 24,
    width: 24
  },
  buttonContainer: {
    padding: 20,
    backgroundColor: Colors.paleGrey,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  button: {
    height: 50,
    flex: 1,
    borderRadius: 5,
    backgroundColor: Colors.bluesky,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textButton: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.medium,
    color: Colors.snow,
    letterSpacing: 0.2
  },
  modalContainer: {
    position: 'absolute',
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  menuProvinsiContainer: {
    position: 'absolute',
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
  }
})
