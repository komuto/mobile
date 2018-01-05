import {StyleSheet} from 'react-native'
import {Metrics, Colors, Fonts} from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.background
  },
  notif: {
    backgroundColor: Colors.doubleLightGrey
  },
  information: {
    flexDirection: 'row',
    backgroundColor: Colors.duckEggBlue,
    paddingLeft: 14,
    paddingRight: 18,
    paddingTop: 20.5,
    paddingBottom: 20.5,
    alignItems: 'flex-start'
  },
  textInfo: {
    fontFamily: Fonts.type.semiBolds,
    fontSize: Fonts.size.smallMed,
    color: Colors.blueText,
    marginLeft: 15,
    marginRight: 50,
    lineHeight: 20
  },
  title: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.medium,
    color: Colors.darkgrey,
    textAlign: 'center',
    marginTop: 20
  },
  titleNotif: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.smallMed,
    color: Colors.bluesky,
    marginTop: 14.2,
    marginBottom: 13.8,
    lineHeight: 22,
    paddingLeft: 20
  },
  containerCodeStyle: {
    flexDirection: 'row',
    marginLeft: 34.5,
    marginRight: 34.5,
    marginBottom: 0,
    marginTop: 80,
    justifyContent: 'space-around'
  },
  codeStyle: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.medium,
    alignSelf: 'center',
    textAlign: 'center',
    color: Colors.darkgrey,
    width: 35,
    height: 35,
    borderBottomWidth: 1,
    borderColor: Colors.silver
  },
  buttonLogin: {
    marginTop: 40,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 25,
    height: 50,
    backgroundColor: Colors.bluesky,
    borderRadius: 5,
    borderColor: Colors.bluesky,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textButtonLogin: {
    color: Colors.snow,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.bold
  },
  containerBanner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textBanner: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.regular,
    color: Colors.lightblack
  },
  textLogin: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.regular,
    color: Colors.bluesky
  },
  bgModal: {
    backgroundColor: 'rgba(72,74,76, 0.8)',
    flex: 1
  },
  contaierModal: {
    flex: 1,
    borderRadius: 5,
    marginTop: 135,
    marginBottom: 135,
    marginLeft: 30.5,
    marginRight: 30.5,
    backgroundColor: Colors.background,
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
  descModal: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    color: Colors.brownishGrey,
    letterSpacing: 0.22,
    textAlign: 'center',
    marginBottom: 23
  },
  verifikasiButton: {
    backgroundColor: Colors.bluesky,
    borderRadius: 5,
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
