import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
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
  headerTextContainer: {
    height: Metrics.navBarHeight,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: Colors.red
  },
  headerContainer: {
    backgroundColor: Colors.background,
    paddingLeft: 20,
    paddingTop: 19.3,
    paddingBottom: 22,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver
  },
  imageStyle: {
    height: 24,
    width: 24
  },
  headerText: {
    flex: 1,
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.bold,
    top: -1,
    marginLeft: 10,
    marginRight: 10,
    color: Colors.snow
  },
  headerMenuRow: {
    backgroundColor: Colors.snow,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: Colors.silver,
    borderBottomWidth: 0.5,
    marginBottom: 1
  },
  touch: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textMenu: {
    flex: 1,
    fontSize: Fonts.size.smallMed,
    fontFamily: Fonts.type.semiBolds,
    color: Colors.darkgrey
  },
  textValueMenu: {
    fontSize: Fonts.size.smallMed,
    fontFamily: Fonts.type.regular,
    color: Colors.brownishGrey,
    marginRight: 15
  },
  buttonChange: {
    fontSize: Fonts.size.smallMed,
    fontFamily: Fonts.type.bold,
    color: Colors.bluesky,
    paddingRight: 6
  },
  titleMenu: {
    flex: 1,
    fontSize: Fonts.size.smallMed,
    fontFamily: Fonts.type.bold,
    color: Colors.lightblack
  },
  scrollImage: {
    height: 73.5,
    marginBottom: 20.3,
    marginLeft: 20
  },
  imageCotainer: {
    flex: 1,
    marginRight: 10,
    height: 73,
    width: 73,
    borderRadius: 3,
    flexDirection: 'row',
    backgroundColor: Colors.paleGreyTwo
  },
  image: {
    height: 73,
    width: 73,
    borderRadius: 3
  },
  imageProduct: {
    height: 73,
    width: 73,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textMenuNoFlex: {
    fontSize: Fonts.size.smallMed,
    fontFamily: Fonts.type.semiBolds,
    color: Colors.darkgrey,
    paddingBottom: 4
  },
  containerNameProduct: {
    paddingLeft: 20,
    paddingTop: 16.3,
    paddingBottom: 18
  },
  rincianContainrer: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver,
    borderTopWidth: 0.5,
    borderTopColor: Colors.silver,
    backgroundColor: Colors.paleGrey,
    marginLeft: -20,
    marginRight: -20,
    paddingTop: 20,
    elevation: 1
  },
  title: {
    color: Colors.darkgrey,
    fontFamily: Fonts.type.semiBolds,
    fontSize: Fonts.size.medium,
    paddingLeft: 20,
    paddingTop: 19.3,
    paddingBottom: 10.7
  },
  containerRincian: {
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
    paddingBottom: 15.8,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver
  },
  textRincian: {
    flex: 1,
    paddingTop: 15.3,
    color: Colors.darkgrey,
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    paddingRight: 26
  }
})
