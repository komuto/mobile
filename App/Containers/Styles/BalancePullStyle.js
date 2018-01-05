import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.background
  },
  infoContainer: {
    backgroundColor: Colors.paleGrey,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  textDate: {
    fontFamily: Fonts.type.regular,
    fontSize: 13,
    letterSpacing: 0.22,
    color: Colors.brownishGrey
  },
  textBalance: {
    fontFamily: Fonts.type.bold,
    fontSize: 13,
    letterSpacing: 0.22,
    color: Colors.brownishGrey
  },
  rowInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -10
  },
  inputContainer: {
    paddingTop: 10,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    flexDirection: 'column',
    borderBottomColor: Colors.silver,
    borderBottomWidth: 0.5
  },
  inputText: {
    flex: 1,
    fontFamily: Fonts.type.regular,
    fontSize: 13,
    letterSpacing: 0.22,
    color: Colors.brownishGrey,
    marginTop: 2
  },
  row: {
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
    margin: 20,
    flexDirection: 'row',
    borderBottomColor: Colors.silver,
    borderBottomWidth: 0.5
  },
  arrow: {
    width: 24,
    height: 24
  },
  buttonContainer: {
    height: 50,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    backgroundColor: Colors.bluesky,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textButton: {
    fontFamily: Fonts.type.bold,
    fontSize: 14,
    color: Colors.snow
  },
  modalContainer: {
    position: 'absolute',
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  menuModalContainer: {
    position: 'absolute',
    backgroundColor: Colors.snow,
    bottom: 20,
    maxHeight: (Metrics.screenHeight * 3) / 4
  },
  menuLaporkan: {
    flex: 1,
    width: Metrics.screenWidth,
    backgroundColor: Colors.snow,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver,
    alignItems: 'center',
    paddingLeft: 20,
    flexDirection: 'row'
  },
  textBagikan: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.medium,
    letterSpacing: 0.23,
    color: Colors.darkgrey,
    marginLeft: 10
  },
  textButtonBlue: {
    fontFamily: Fonts.type.bold,
    fontSize: 14,
    color: Colors.bluesky
  },
  buttonNewAccount: {
    height: 60,
    width: Metrics.screenWidth,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 0.5,
    borderTopColor: Colors.silver,
    backgroundColor: Colors.white
  },
  headerListView: {
    height: 60,
    width: Metrics.screenWidth,
    backgroundColor: Colors.snow,
    padding: 20,
    justifyContent: 'center',
    borderBottomColor: Colors.silver,
    borderBottomWidth: 0.5
  },
  headerTextListView: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.medium,
    letterSpacing: 0.23,
    color: Colors.darkgrey
  },
  rowAccount: {
    flex: 1,
    width: Metrics.screenWidth,
    backgroundColor: Colors.snow,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver,
    justifyContent: 'center',
    paddingLeft: 20,
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 15,
    flexDirection: 'column'
  }
})
