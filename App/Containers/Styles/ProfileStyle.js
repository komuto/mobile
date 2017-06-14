import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.paleGrey
  },
  loginContainer: {
    backgroundColor: Colors.snow,
    paddingBottom: 50
  },
  imagestyle: {
    height: 186,
    width: 159,
    marginTop: 30,
    alignSelf: 'center'
  },
  welcomeContainer: {
    width: Metrics.screenWidth,
    marginTop: 46,
    justifyContent: 'center'
  },
  welcomeText: {
    fontFamily: Fonts.type.bold,
    letterSpacing: 3,
    lineHeight: 24,
    fontSize: 16,
    color: Colors.darkgrey,
    textAlign: 'center'
  },
  welcome2Container: {
    width: Metrics.screenWidth,
    marginTop: 10,
    justifyContent: 'center'
  },
  welcome2Text: {
    fontFamily: Fonts.type.regular,
    letterSpacing: 4,
    lineHeight: 24,
    fontSize: 14,
    color: Colors.lightgrey,
    textAlign: 'center'
  },
  containerButton: {
    width: Metrics.screenWidth,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30
  },
  buttonRegister: {
    width: 150,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: Colors.bluesky,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
  },
  buttonLogin: {
    width: 150,
    height: 50,
    backgroundColor: Colors.bluesky,
    borderRadius: 5,
    borderColor: Colors.bluesky,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
  },
  textButtonRegister: {
    color: Colors.bluesky,
    fontSize: 16,
    fontFamily: Fonts.type.bold
  },
  textButtonLogin: {
    color: Colors.snow,
    fontSize: 16,
    fontFamily: Fonts.type.bold
  },
  profileContainer: {
    flex: 1
  },
  dataProfileContainer: {
    backgroundColor: Colors.background,
    flexDirection: 'column',
    paddingLeft: 20,
    marginBottom: 20,
    elevation: 2
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver
  },
  styleFoto: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  namaContainer: {
    flexDirection: 'column',
    flex: 1,
    marginLeft: 15
  },
  textNama: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.medium,
    color: Colors.lightblack
  },
  textKelola: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.small,
    color: Colors.labelgrey
  },
  notifContainer: {
    width: 26,
    height: 26,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 13,
    backgroundColor: Colors.red
  },
  notif: {
    color: Colors.snow,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.semiBolds
  },
  imageCategory: {
    height: 24,
    width: 24
  },
  rightArrow: {
    height: 24,
    width: 24,
    marginLeft: 10
  }
})
