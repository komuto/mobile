import { StyleSheet } from 'react-native'
import { Colors, Fonts, Metrics } from '../../Themes/'

export default StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    width: Metrics.screenWidth - 60,
    backgroundColor: Colors.snow,
    borderRadius: 5,
    flexDirection: 'column'
  },
  header: {
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    height: 50,
    backgroundColor: Colors.paleGrey,
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 12,
    flexDirection: 'row'
  },
  textTitle: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.medium,
    lineHeight: 21,
    letterSpacing: 0.2,
    color: Colors.darkgrey
  },
  imageClose: {
    height: 24,
    width: 24,
    marginTop: 2
  },
  body: {
    padding: 30,
    flexDirection: 'column',
    alignItems: 'center'
  },
  imagePhone: {
    height: 186,
    width: 159,
    alignSelf: 'center'
  },
  textInfo: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.medium,
    lineHeight: 21,
    letterSpacing: 0.2,
    color: Colors.darkgrey,
    marginTop: 20
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20
  },
  buttonLogin: {
    height: 50,
    backgroundColor: Colors.bluesky,
    borderColor: Colors.bluesky,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginRight: 5
  },
  buttonRegister: {
    height: 50,
    backgroundColor: Colors.snow,
    borderColor: Colors.bluesky,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginLeft: 5
  },
  textWhite: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.medium,
    lineHeight: 21,
    letterSpacing: 0.2,
    color: Colors.snow
  },
  textBlue: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.medium,
    lineHeight: 21,
    letterSpacing: 0.2,
    color: Colors.bluesky
  }
})
