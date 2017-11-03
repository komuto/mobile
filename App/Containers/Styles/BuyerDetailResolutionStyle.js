import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.paleGrey,
    marginTop: Metrics.navBarHeight
  },
  scrollView: {
    paddingBottom: 10
  },
  maskedPhoto: {
    height: 40,
    width: 40,
    borderRadius: 200,
    backgroundColor: Colors.paleGreyFive
  },
  containerInfo: {
    paddingLeft: 20,
    backgroundColor: Colors.snow
  },
  containerMessage: {
    flexDirection: 'row',
    flex: 1,
    padding: 20
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
    flex: 2
  },
  date: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.mediumTiny,
    color: Colors.lightblack,
    opacity: 0.50,
    marginLeft: 14,
    paddingTop: 2,
    flex: 1,
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
  notif: {
    flexDirection: 'row',
    backgroundColor: Colors.duckEggBlue,
    alignItems: 'center',
    paddingRight: 19,
    position: 'relative'
  },
  textNotif: {
    flex: 1,
    padding: 20,
    color: Colors.greenish,
    fontFamily: Fonts.type.semiBolds,
    fontSize: Fonts.size.smallMed
  },
  image: {
    height: 25,
    width: 25
  },
  textTab: {
    fontSize: Fonts.size.smallMed,
    fontFamily: Fonts.type.semiBolds,
    letterSpacing: 0.22,
    marginTop: 5
  },
  row: {
    flexDirection: 'row',
    paddingBottom: 20,
    paddingTop: 20,
    paddingRight: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver,
    backgroundColor: Colors.background
  },
  textInfo: {
    flex: 1,
    fontSize: Fonts.size.smallMed,
    fontFamily: Fonts.type.semiBolds,
    color: Colors.lightblack,
    paddingBottom: 5
  },
  textInfoValue: {
    flex: 1,
    fontSize: Fonts.size.smallMed,
    fontFamily: Fonts.type.regular,
    color: Colors.lightblack,
    textAlign: 'right'
  },
  foto: {
    marginRight: 18
  },
  containerDiskon: {
    position: 'absolute',
    left: 85,
    bottom: 85
  },
  imageClose: {
    height: 25,
    width: 25
  },
  imageTambahProduk: {
    height: 30,
    width: 30
  },
  imageProduk: {
    height: 73,
    width: 73,
    borderRadius: 3
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
  tabWaiting: {
    backgroundColor: Colors.snow,
    marginTop: 10,
    padding: 20
  },
  containerResolution: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  textResolution: {
    flex: 1,
    fontFamily: Fonts.type.semiBolds,
    fontSize: Fonts.size.smallMed,
    color: Colors.darkgrey,
    lineHeight: 21,
    paddingBottom: 10
  },
  textStatus: {
    fontFamily: Fonts.type.semiBolds,
    fontSize: Fonts.size.smallMed,
    color: Colors.bluesky
  },
  label: {
    backgroundColor: 'rgba(86, 170, 239, 0.11)',
    marginLeft: 30,
    borderRadius: 5,
    paddingRight: 15.5,
    paddingLeft: 12.5,
    paddingTop: 3.5,
    paddingBottom: 3.5
  },
  date2: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    color: Colors.labelgrey
  },
  messages: {
    backgroundColor: Colors.snow,
    flex: 1
  },
  sendContainer: {
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  sendMessage: {
    height: 30,
    width: 30
  },
  textInputContainer: {
    height: 56,
    flexDirection: 'row',
    backgroundColor: Colors.snow,
    borderTopColor: Colors.silver,
    borderTopWidth: 1,
    borderBottomColor: Colors.silver,
    borderBottomWidth: 1,
    width: Metrics.screenWidth,
    alignItems: 'center'
  },
  textInput: {
    flex: 1,
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    color: Colors.darkgrey,
    letterSpacing: 0.22,
    paddingLeft: 10,
    paddingRight: 10
  }
})
