import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  headerContainer: {
    height: Metrics.navBarHeight,
    backgroundColor: Colors.red,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 20,
    paddingLeft: 20
  },
  textTitle: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.medium,
    letterSpacing: 0.23,
    color: Colors.snow
  },
  imageStyle: {
    height: 24,
    width: 24
  },
  border: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver,
    marginBottom: 10
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 2,
    backgroundColor: Colors.background
  },
  styleFotoToko: {
    width: 40,
    height: 40
  },
  namaContainer: {
    flexDirection: 'column',
    flex: 1,
    marginLeft: 16
  },
  textNama: {
    fontFamily: Fonts.type.semiBolds,
    fontSize: Fonts.size.smallMed,
    color: Colors.darkgrey,
    letterSpacing: 0.22,
    marginBottom: 3
  },
  textKelola: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    color: Colors.lightgrey,
    opacity: 0.50,
    letterSpacing: 0.2
  },
  questionContainer: {
    margin: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.silver,
    flexDirection: 'column'
  },
  buttonContainer: {
    margin: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.bluesky,
    borderRadius: 5,
    height: 50
  },
  textInput: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    color: Colors.darkgrey,
    letterSpacing: 0.22,
    marginLeft: -3
  },
  textButton: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.medium,
    letterSpacing: 0.23,
    color: Colors.snow
  },
  spinner: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Metrics.screenWidth,
    height: 40,
    opacity: 0.5
  },
  containerText: {
    flexDirection: 'row'
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
  }
})
