import { StyleSheet } from 'react-native'
import { Colors, Fonts, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.paleGrey
  },
  notificationContainer: {
    backgroundColor: Colors.lightOrange,
    padding: 20,
    flexDirection: 'row'
  },
  notificationContainerBlue: {
    backgroundColor: Colors.blueBackground,
    padding: 20,
    flexDirection: 'row'
  },
  notificationContainerGreen: {
    backgroundColor: Colors.duckEggBlue,
    padding: 20,
    alignItems: 'center',
    flexDirection: 'row'
  },
  imageInfo: {
    height: 30,
    marginTop: 10,
    width: 30,
    marginRight: 15
  },
  textInfo: {
    fontFamily: Fonts.type.regular,
    width: Metrics.screenWidth - 70,
    fontSize: 13,
    lineHeight: 20,
    letterSpacing: 0.22,
    color: Colors.boldOrange
  },
  textInfoBlue: {
    fontFamily: Fonts.type.regular,
    width: Metrics.screenWidth - 70,
    fontSize: 13,
    lineHeight: 20,
    letterSpacing: 0.22,
    color: Colors.blueText
  },
  textInfoGreen: {
    fontFamily: Fonts.type.regular,
    width: Metrics.screenWidth - 70,
    fontSize: 13,
    lineHeight: 20,
    letterSpacing: 0.22,
    color: Colors.greenish
  },
  dataContainer: {
    padding: 20,
    borderBottomColor: Colors.silver,
    borderBottomWidth: 0.5,
    backgroundColor: Colors.snow,
    flexDirection: 'row',
    alignItems: 'center'
  },
  textLabel: {
    fontFamily: Fonts.type.regular,
    fontSize: 13,
    letterSpacing: 0.22,
    color: Colors.darkgrey
  },
  textData: {
    fontFamily: Fonts.type.regular,
    fontSize: 13,
    letterSpacing: 0.22,
    textAlign: 'right',
    color: Colors.brownishGrey
  },
  warna: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10
  },
  image: {
    height: 26,
    width: 26,
    borderRadius: 13,
    marginRight: 10
  },
  labelContainer: {
    marginTop: 30,
    paddingLeft: 20,
    marginBottom: 10
  },
  label: {
    fontFamily: Fonts.type.bold,
    fontSize: 13,
    letterSpacing: 0.22,
    color: Colors.darkgrey
  },
  imageProduct: {
    height: 30,
    width: 30,
    borderRadius: 5,
    marginRight: 10
  },
  proofContainer: {
    backgroundColor: Colors.snow,
    padding: 20
  },
  buttonContainer: {
    backgroundColor: Colors.snow,
    padding: 20,
    flexDirection: 'row'
  },
  button: {
    height: 56,
    flex: 1,
    backgroundColor: Colors.bluesky,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textButton: {
    fontFamily: Fonts.type.bold,
    fontSize: 14,
    letterSpacing: 0.23,
    color: Colors.snow
  }
})
