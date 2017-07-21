import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.paleGrey,
    marginTop: Metrics.navBarHeight
  },
  textTitle: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.smallMed,
    color: Colors.lightblack,
    paddingLeft: 15,
    paddingTop: 20.3,
    paddingBottom: 15.7
  },
  textLabel: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.small,
    color: Colors.lightblack,
    paddingTop: 5,
    paddingBottom: 20
  },
  textInput: {
    paddingTop: 40,
    paddingLeft: 20.5,
    paddingRight: 19.5,
    backgroundColor: Colors.snow
  },
  inputText: {
    marginLeft: -1,
    color: Colors.darkgrey,
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    borderBottomWidth: 1,
    borderBottomColor: Colors.silver,
    paddingBottom: 2,
    paddingTop: 5,
    paddingLeft: -1
  },
  buttonnext: {
    height: 50,
    backgroundColor: Colors.bluesky,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20.9,
    marginBottom: 19.1
  },
  textButtonNext: {
    color: Colors.background,
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.medium
  },
  rowContainer: {
    flexDirection: 'column',
    flex: 1
  },
  bgModal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  lokasiSeparator: {
    marginBottom: 45
  },
  textLabel2: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    color: Colors.labelgrey
  },
  pilihDestinasi: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 3,
    borderBottomWidth: 1,
    borderBottomColor: Colors.silver
  },
  inputText2: {
    marginLeft: -4,
    color: Colors.grey,
    fontSize: Fonts.size.smallMed,
    paddingBottom: -8.3,
    paddingTop: -10
  },
  imagePicker: {
    height: 24,
    width: 24
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
  }
})
