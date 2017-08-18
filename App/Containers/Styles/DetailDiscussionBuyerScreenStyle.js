import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.snow
  },
  headerTextContainer: {
    height: Metrics.navBarHeight + 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 13,
    paddingRight: 20,
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
    color: 'transparent'
  },
  imageProduct: {
    height: 30,
    width: 30,
    borderRadius: 2,
    marginLeft: 10.3
  },
  containerProduct: {
    marginLeft: 14.3
  },
  textProduct: {
    flex: 1,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.semiBolds,
    color: Colors.snow,
    paddingTop: 18.3,
    paddingBottom: 1.7
  },
  priceProduct: {
    fontSize: Fonts.size.smallMed,
    fontFamily: Fonts.type.regular,
    color: Colors.snow,
    paddingBottom: 19.7
  },
  allCategory: {
    height: 55.3,
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 8,
    paddingBottom: 20,
    paddingTop: 20,
    flexDirection: 'row',
    marginBottom: 10,
    elevation: 0.5
  },
  textAllCategory: {
    flexWrap: 'wrap',
    color: Colors.bluesky,
    flex: 1,
    fontSize: Fonts.size.smallMed,
    fontFamily: Fonts.type.bold,
    letterSpacing: 0.2
  },
  imageCategory: {
    height: 32,
    width: 32
  },
  inputText: {
    borderTopColor: Colors.silver,
    borderTopWidth: 0.5,
    paddingLeft: 20,
    paddingTop: 15,
    paddingBottom: 15,
    color: Colors.lightblack,
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 200
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1
  },
  messageText: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    color: Colors.lightblack,
    lineHeight: 22,
    flex: 1,
    paddingRight: 4
  },
  title: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.smallMed,
    color: Colors.lightblack,
    flex: 1
  },
  date: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.mediumTiny,
    color: Colors.lightblack,
    opacity: 0.50,
    marginLeft: 14,
    paddingTop: 2,
    textAlign: 'right'
  },
  containerMessage: {
    flexDirection: 'row',
    flex: 1,
    paddingBottom: 20,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 40 + 20 + 10
  },
  spinner: {
    position: 'absolute',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    opacity: 0.5
  }
})
