import { StyleSheet, Platform } from 'react-native'
import { Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  mainContainerFilter: {
    paddingTop: Platform.OS === 'ios' ? Metrics.doubleBaseMargin : 0,
    flexDirection: 'row',
    backgroundColor: Colors.snow,
    flex: 1
  },
  rowStyle: {
    paddingVertical: 0.5,
    backgroundColor: Colors.paleGrey,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver
  },
  rowStyleActive: {
    paddingVertical: 0.5,
    backgroundColor: Colors.snow
  },
  logo: {
    marginTop: Metrics.doubleSection,
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    flexGrow: 1,
    resizeMode: 'contain'
  },
  centered: {
    alignItems: 'center',
    flex: 1
  },
  firstView: {
    backgroundColor: Colors.paleGrey,
    flex: 0.25,
    marginRight: 20
  },
  secondView: {
    backgroundColor: Colors.snow,
    flex: 1.1
  },
  labelContainer: {
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: 'row'
  },
  labelContainerSecond: {
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: 'row'
  },
  label: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.regular,
    color: Colors.darkgrey,
    flex: 1
  },
  gambarCentang: {
    width: 24,
    height: 24,
    top: -2,
    marginRight: 15
  },
  buttonContainer: {
    height: 75,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: Colors.silver,
    backgroundColor: Colors.snow
  },
  buttonReset: {
    width: 150,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.silver,
    borderRadius: 5,
    backgroundColor: Colors.snow,
    margin: 10
  },
  labelButtonReset: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.bold,
    color: Colors.darkgrey,
    letterSpacing: 0.23
  },
  buttonOke: {
    width: 150,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: Colors.bluesky,
    margin: 10
  },
  labelButtonOke: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.bold,
    color: Colors.snow,
    letterSpacing: 0.23
  },
  rowButton: {
    backgroundColor: Colors.snow,
    paddingRight: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver
  },
  box: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: Colors.silver,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  gambarCentangBox: {
    height: 24,
    width: 24
  },
  rentanHargaContainer: {
    flexDirection: 'column',
    marginTop: 20
  },
  textHarga: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.medium,
    color: Colors.labelgrey,
    letterSpacing: 0.23
  },
  inputContainer: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: Colors.silver,
    marginBottom: 20
  },
  inputText: {
    height: 40,
    flex: 1,
    color: Colors.darkgrey,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.regular,
    marginLeft: -5
  },
  pickerStyle: {
    marginLeft: -7
  },
  separator: {
    width: Metrics.screenWidth,
    borderBottomColor: Colors.silver,
    borderBottomWidth: 0.5,
    marginBottom: 10
  }
})
