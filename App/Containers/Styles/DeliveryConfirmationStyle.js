import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.paleGrey
  },
  listOrder: {
    backgroundColor: Colors.snow,
    margin: 10,
    borderRadius: 3
  },
  spinner: {
    position: 'absolute',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: Metrics.screenWidth,
    height: Metrics.screenHeight
  },
  labelOrder: {
    flexDirection: 'row',
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10,
    alignItems: 'center',
    borderColor: Colors.silver,
    borderBottomWidth: 0.5
  },
  labelText: {
    fontFamily: Fonts.type.semiBolds,
    fontSize: Fonts.size.smallMed,
    color: Colors.darkgrey,
    flex: 1
  },
  labelTextInput: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.smallMed,
    color: Colors.bluesky,
    textAlign: 'center',
    flex: 1
  },
  labelTextWaitInput: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.smallMed,
    color: Colors.labelgrey,
    textAlign: 'center',
    flex: 1
  },
  labelDate: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.small,
    color: Colors.labelgrey
  },
  containerOrder: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10.6,
    paddingRight: 15,
    paddingLeft: 15,
    paddingBottom: 15.2
  },
  maskedImage: {
    height: 30,
    width: 30,
    backgroundColor: Colors.paleGreyFive,
    borderRadius: 3,
    marginRight: 5.1
  },
  image: {
    height: 30,
    width: 30,
    borderRadius: 3,
    marginRight: 5.1
  },
  placeholder: {
    position: 'absolute',
    left: 1,
    backgroundColor: 'rgba(0,0,0,0.2)'
  },
  textPlaceHolder: {
    padding: 5,
    color: Colors.snow,
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.medium
  },
  labelMoney: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.smallMed,
    color: Colors.darkgrey
  },
  flexRow: {
    flexDirection: 'row'
  },
  laberDropShipping: {
    width: 130,
    backgroundColor: Colors.veryLighBlue,
    height: 30,
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
    justifyContent: 'center'
  },
  textDropShipping: {
    fontSize: Fonts.size.smallMed,
    fontFamily: Fonts.type.bold,
    color: Colors.darkBlueSky,
    marginLeft: 8,
    paddingBottom: 2
  },
  triangleLabel: {
    borderTopWidth: 30 / 2.0,
    borderRightWidth: 5,
    borderBottomWidth: 30 / 2.0,
    borderLeftWidth: 0,
    borderTopColor: 'transparent',
    borderRightColor: Colors.snow,
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    backgroundColor: Colors.veryLighBlue,
    width: 20
  }
})
