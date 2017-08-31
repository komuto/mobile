import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.paleGrey
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
  headerProduct: {
    padding: 20,
    borderBottomColor: Colors.silver,
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.snow
  },
  maskedPhoto: {
    width: 40,
    height: 40,
    borderRadius: 2,
    marginRight: 14,
    backgroundColor: Colors.paleGreyFive
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 2,
    marginRight: 14
  },
  textProduct: {
    fontFamily: Fonts.type.semiBold,
    fontSize: Fonts.size.medium,
    color: Colors.lightblack
  },
  dropshipping: {
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: Colors.silver,
    borderBottomWidth: 0.5,
    paddingTop: 33.7,
    paddingBottom: 30,
    paddingRight: 20,
    marginBottom: 15.8
  },
  textDropshipping: {
    flex: 1,
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    color: Colors.darkgrey
  },
  link: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.smallMed,
    color: Colors.bluesky,
    paddingLeft: 20,
    paddingBottom: 10
  },
  buttonNext: {
    height: 50,
    backgroundColor: Colors.bluesky,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    marginTop: 20
  },
  textButtonNext: {
    color: Colors.background,
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.medium
  },
  containerStock: {
    marginLeft: 20,
    marginTop: 16.8,
    marginRight: 20,
    marginBottom: 10
  },
  textLabel: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    color: Colors.darkgrey,
    opacity: 0.50
  },
  inputContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver
  },
  inputText: {
    marginLeft: -4,
    color: Colors.darkgrey,
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.medium,
    paddingBottom: 8.3
  },
  containerDisplay: {
    paddingTop: 20.4
  },
  containerRadio: {
    backgroundColor: Colors.snow,
    paddingLeft: 5,
    paddingTop: 15.8,
    paddingBottom: 27,
    height: 240.5
  },
  textDesc: {
    color: Colors.labelgrey,
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.medium,
    lineHeight: 23,
    paddingLeft: 55,
    paddingRight: 20
  },
  headerModal: {
    elevation: 1,
    backgroundColor: Colors.snow,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 18,
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },
  texthapus: {
    color: Colors.red,
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.smallMed
  },
  imagePicker: {
    height: 24,
    width: 24
  }
})
