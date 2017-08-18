import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.snow
  },
  headerTextContainer: {
    height: Metrics.navBarHeight,
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
  titleMessage: {
    fontSize: Fonts.size.smallMed,
    fontFamily: Fonts.type.bold,
    lineHeight: 22,
    color: Colors.lightblack
  },
  containerTitle: {
    paddingBottom: 20,
    paddingLeft: 20,
    paddingTop: 20,
    paddingRight: 45,
    borderBottomColor: Colors.silver,
    borderBottomWidth: 0.5
  },
  containerMessage: {
    flexDirection: 'row',
    flex: 1,
    paddingBottom: 20,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 40 + 20 + 10
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 200
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
  storesText: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.small,
    color: Colors.lightblack,
    opacity: 0.50,
    paddingTop: 5
  },
  scrollView: {
    paddingBottom: 10
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
  imageDot: {
    height: 24,
    width: 24
  },
  modal: {
    backgroundColor: Colors.snow,
    borderRadius: 3,
    elevation: 2,
    width: 210,
    marginTop: 24,
    marginLeft: Metrics.screenWidth / 2.5,
    marginBottom: 1
  },
  textMenu: {
    fontFamily: Fonts.type.semiBolds,
    fontSize: Fonts.size.semiBolds,
    color: Colors.darkgrey,
    padding: 19
  },
  border: {
    borderBottomColor: Colors.silver,
    borderBottomWidth: 0.5
  }
})
