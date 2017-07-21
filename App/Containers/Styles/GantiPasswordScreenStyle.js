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
  }
})
