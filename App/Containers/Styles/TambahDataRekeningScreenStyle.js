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
  buttonnext: {
    height: 50,
    backgroundColor: Colors.bluesky,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20.8
  },
  textButtonNext: {
    color: Colors.background,
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.medium
  },
  infoContainer: {
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20
  },
  textLabel: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.small,
    color: Colors.labelgrey,
    textAlign: 'left'
  },
  rowContainer: {
    flexDirection: 'column',
    flex: 1
  },
  bgModal: {
    backgroundColor: 'rgba(0,0,0, 0.8)',
    flex: 1
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
  lokasiSeparator: {
    marginBottom: 20
  },
  pilihDestinasi: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 4.3,
    borderBottomWidth: 1,
    borderBottomColor: Colors.silver
  },
  inputText2: {
    marginLeft: -4,
    color: Colors.darkgrey,
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed
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
  menuProvinsiContainer: {
    position: 'absolute',
    bottom: 20,
    maxHeight: (Metrics.screenHeight * 3) / 4
  }
})
