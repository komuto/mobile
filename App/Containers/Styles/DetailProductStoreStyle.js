import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.paleGrey
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
    borderRadius: 3,
    marginRight: 10
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
  }
})
