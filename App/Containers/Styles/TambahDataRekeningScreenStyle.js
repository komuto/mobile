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
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20
  },
  textLabel: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.small,
    color: Colors.labelgrey,
    textAlign: 'center'
  },
  rowContainer: {
    flexDirection: 'column',
    flex: 1
  },
  bgModal: {
    backgroundColor: 'rgba(72,74,76, 0.8)',
    flex: 1
  },
  inputText: {
    marginLeft: -1,
    color: Colors.darkgrey,
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    borderBottomWidth: 1,
    borderBottomColor: Colors.silver,
    paddingBottom: 5,
    paddingLeft: -1,
    paddingTop: 20
  },
  lokasiSeparator: {
    marginTop: 20
  },
  pilihDestinasi: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 3,
    borderBottomWidth: 1,
    borderBottomColor: Colors.silver
  },
  inputText2: {
    marginLeft: -4,
    color: Colors.grey,
    fontSize: Fonts.size.smallMed,
    fontFamily: Fonts.type.regular,
    paddingBottom: -8.3,
    paddingTop: -10
  },
  imagePicker: {
    height: 24,
    width: 24
  }
})
