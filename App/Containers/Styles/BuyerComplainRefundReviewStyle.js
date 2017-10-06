import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.paleGrey
  },
  labelContainer: {
    marginTop: 30,
    paddingLeft: 20,
    marginBottom: 10
  },
  label: {
    fontFamily: Fonts.type.bold,
    fontSize: 13,
    letterSpacing: 0.22,
    color: Colors.darkgrey
  },
  dataContainer: {
    padding: 20,
    borderBottomColor: Colors.silver,
    borderBottomWidth: 0.5,
    backgroundColor: Colors.snow,
    flexDirection: 'row',
    alignItems: 'center'
  },
  textLabel: {
    fontFamily: Fonts.type.regular,
    fontSize: 13,
    letterSpacing: 0.22,
    color: Colors.darkgrey
  },
  textData: {
    fontFamily: Fonts.type.regular,
    fontSize: 13,
    letterSpacing: 0.22,
    textAlign: 'right',
    color: Colors.darkMint
  },
  imageProduct: {
    height: 30,
    width: 30,
    borderRadius: 5,
    marginRight: 10
  },
  check: {
    tintColor: Colors.darkMint,
    height: 20,
    marginTop: 3,
    width: 20,
    marginRight: 10
  },
  textReview: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    lineHeight: 23,
    letterSpacing: 0.23
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  imageData: {
    height: 45,
    width: 45,
    borderRadius: 3,
    marginRight: 10
  },
  textTitle: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    lineHeight: 23,
    letterSpacing: 0.23,
    color: Colors.darkgrey
  },
  rateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: Colors.silver,
    borderBottomWidth: 0.5,
    paddingBottom: 10,
    marginTop: 20,
    marginBottom: 30
  },
  questionContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver,
    flexDirection: 'column'
  },
  textInput: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    color: Colors.darkgrey,
    letterSpacing: 0.22,
    marginLeft: -3
  },
  contentContainer: {
    padding: 20,
    flex: 1,
    backgroundColor: Colors.snow
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 20
  },
  button: {
    flex: 1,
    borderRadius: 5,
    backgroundColor: Colors.bluesky,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textWhite: {
    fontFamily: Fonts.type.bold,
    fontSize: 15,
    lineHeight: 23,
    letterSpacing: 0.23,
    color: Colors.snow
  }
})
