import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    marginTop: Metrics.navBarHeight,
    flex: 1,
    backgroundColor: Colors.snow
  },
  infoContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 40.6
  },
  textLabel: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    color: Colors.labelgrey
  },
  textLabelDark: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    color: Colors.lightgrey,
    textAlign: 'center'
  },
  textLabelBlue: {
    marginTop: 10,
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.medium,
    color: Colors.bluesky,
    textAlign: 'center'
  },
  textNomerHape: {
    fontFamily: Fonts.type.semiBolds,
    fontSize: Fonts.size.h4,
    color: Colors.lightblack,
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 15
  },
  inputText: {
    marginLeft: -1,
    color: Colors.darkgrey,
    fontFamily: Fonts.type.semiBolds,
    fontSize: Fonts.size.smallMed,
    borderBottomWidth: 1,
    borderBottomColor: Colors.silver,
    paddingBottom: 8.3,
    paddingLeft: -1
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
  spinner: {
    position: 'absolute',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    opacity: 0.5
  }
})
