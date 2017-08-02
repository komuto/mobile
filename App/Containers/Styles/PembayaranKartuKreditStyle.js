import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.paleGrey
  },
  batasPembayaran: {
    backgroundColor: Colors.paleGreyThree,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
    paddingBottom: 15,
    borderWidth: 0.5,
    borderColor: Colors.silver
  },
  textLabel: {
    fontFamily: Fonts.type.regular,
    flex: 1,
    fontSize: Fonts.size.smallMed,
    letterSpacing: 0.22,
    color: Colors.brownishGrey
  },
  time: {
    opacity: 0.7,
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    letterSpacing: 0.22,
    color: Colors.brownishGrey
  },
  infoContainer: {
    backgroundColor: Colors.snow,
    borderWidth: 0.5,
    borderColor: Colors.silver,
    flexDirection: 'column'
  },
  titleContainer: {
    flexDirection: 'row',
    padding: 20,
    borderBottomColor: Colors.silver,
    borderBottomWidth: 0.5,
    alignItems: 'center'
  },
  info: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 12,
    backgroundColor: Colors.bluesky,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textI: {
    color: Colors.snow,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.bold
  },
  textTitle: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.regular,
    lineHeight: 19,
    letterSpacing: 0.22,
    color: Colors.darkgrey
  },
  textGreen: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.regular,
    lineHeight: 19,
    letterSpacing: 0.22,
    color: Colors.green
  },
  bodyContainer: {
    flexDirection: 'column',
    padding: 20
  },
  inputContainer: {
    flexDirection: 'row',
    borderBottomColor: Colors.silver,
    borderBottomWidth: 0.5
  },
  input: {
    flex: 1,
    paddingLeft: -3,
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    paddingBottom: -3
  },
  inputRowContainer: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 30
  },
  listInfo: {
    flexDirection: 'row',
    marginTop: 15
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.black,
    marginTop: 7,
    marginLeft: 10,
    marginRight: 15
  },
  rincianContainer: {
    backgroundColor: Colors.snow,
    flexDirection: 'column',
    marginTop: 20
  },
  rincianTitle: {
    padding: 20,
    borderBottomColor: Colors.silver,
    borderBottomWidth: 0.5,
    justifyContent: 'center'
  },
  textBold: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.medium,
    lineHeight: 22,
    letterSpacing: 0.19,
    color: Colors.darkgrey
  },
  rincianBody: {
    margin: 20,
    paddingBottom: 20,
    borderBottomColor: Colors.silver,
    borderBottomWidth: 0.5,
    justifyContent: 'center'
  },
  rincianRow: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center'
  },
  sisaPembayaran: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    justifyContent: 'center'
  },
  containerButton: {
    padding: 20
  },
  button: {
    marginTop: 20,
    flex: 1,
    height: 56,
    borderRadius: 5,
    backgroundColor: Colors.bluesky,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 45,
    height: 30,
    resizeMode: 'center',
    marginRight: 5
  },
  modalContainer: {
    position: 'absolute',
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    backgroundColor: 'rgba(0,0,0,0.7)'
  },
  containerNotifikasi: {
    marginTop: 110,
    marginBottom: 110,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: Colors.snow,
    borderRadius: 5,
    padding: 20,
    flex: 1,
    alignItems: 'center'
  },
  empty: {
    height: 160
  },
  textGagal: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
    lineHeight: 22,
    letterSpacing: 0.4,
    textAlign: 'center',
    color: Colors.brownishGrey
  },
  metode: {
    marginTop: 10,
    flex: 1,
    height: 56,
    borderRadius: 5,
    backgroundColor: Colors.snow,
    borderColor: Colors.bluesky,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textBlue: {
    color: Colors.bluesky,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.bold
  }
})
