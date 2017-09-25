import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.paleGrey
  },
  navbarContainer: {
    width: Metrics.screenWidth,
    height: Metrics.navBarHeight,
    backgroundColor: Colors.red,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
  arrow: {
    width: 24,
    height: 24
  },
  navbarText: {
    fontFamily: Fonts.type.bold,
    fontSize: 14,
    letterSpacing: 0.23,
    flex: 1,
    marginLeft: 10,
    color: Colors.snow
  },
  filterButton: {
    height: 34,
    width: 34,
    padding: 5
  },
  numberContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    height: 14,
    width: 14,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.snow
  },
  number: {
    fontFamily: Fonts.type.bold,
    fontSize: 10,
    color: Colors.red
  },
  rowContainer: {
    marginTop: 10,
    backgroundColor: Colors.snow,
    flexDirection: 'column',
    paddingLeft: 20,
    paddingBottom: 15
  },
  dataContainer: {
    flexDirection: 'row',
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver
  },
  data: {
    flexDirection: 'column',
    marginRight: 20
  },
  textTitle: {
    fontFamily: Fonts.type.regular,
    fontSize: 14,
    letterSpacing: 0.23,
    color: Colors.darkgrey
  },
  textDate: {
    fontFamily: Fonts.type.regular,
    fontSize: 12,
    letterSpacing: 0.23,
    color: Colors.brownishGrey
  },
  money: {
    flex: 1,
    flexDirection: 'row'
  },
  textMoneyGreen: {
    flex: 1,
    textAlign: 'right',
    marginRight: 5,
    fontFamily: Fonts.type.bold,
    fontSize: 14,
    letterSpacing: 0.23,
    color: Colors.darkMint
  },
  textMoneyRed: {
    flex: 1,
    textAlign: 'right',
    marginRight: 5,
    fontFamily: Fonts.type.bold,
    fontSize: 14,
    letterSpacing: 0.23,
    color: Colors.red
  },
  balanceContainer: {
    marginTop: 15
  },
  textBalance: {
    fontFamily: Fonts.type.regular,
    fontSize: 12,
    letterSpacing: 0.2,
    color: Colors.labelgrey
  },
  modalContainer: {
    position: 'absolute',
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  contentModalContainer: {
    position: 'absolute',
    backgroundColor: Colors.snow,
    width: Metrics.screenWidth,
    bottom: 20,
    padding: 20,
    maxHeight: Metrics.screenHeight
  },
  boxChecked: {
    width: 25,
    height: 25,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.bluesky,
    borderWidth: 0.5,
    borderColor: Colors.silver,
    marginRight: 10
  },
  box: {
    width: 25,
    height: 25,
    borderRadius: 5,
    backgroundColor: Colors.snow,
    borderWidth: 0.5,
    borderColor: Colors.silver,
    marginRight: 10
  },
  imageCheck: {
    height: 20,
    width: 20
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15
  },
  dateContainer: {
    flexDirection: 'row',
    borderBottomColor: Colors.silver,
    borderBottomWidth: 0.5
  },
  buttonApply: {
    flex: 1,
    backgroundColor: Colors.bluesky,
    height: 50,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  textButton: {
    fontFamily: Fonts.type.bold,
    fontSize: 14,
    letterSpacing: 0.23,
    color: Colors.snow
  }
})
