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
  }
})
