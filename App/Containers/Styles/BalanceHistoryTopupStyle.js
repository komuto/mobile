import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.paleGrey
  },
  dataContainer: {
    backgroundColor: Colors.snow,
    width: Metrics.screenWidth,
    paddingLeft: 20,
    paddingRight: 20,
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver
  },
  label: {
    fontFamily: Fonts.type.regular,
    fontSize: 13,
    letterSpacing: 0.22,
    color: Colors.darkgrey
  },
  data: {
    fontFamily: Fonts.type.regular,
    fontSize: 13,
    letterSpacing: 0.22,
    color: Colors.brownishGrey
  },
  dataMoney: {
    fontFamily: Fonts.type.regular,
    fontSize: 13,
    letterSpacing: 0.22,
    color: Colors.darkMint
  },
  title: {
    fontFamily: Fonts.type.bold,
    marginLeft: 20,
    marginBottom: 10,
    fontSize: 13,
    letterSpacing: 0.22,
    color: Colors.darkgrey
  },
  paymentContainer: {
    flexDirection: 'column',
    backgroundColor: Colors.snow
  },
  dataPaymentContainer: {
    flexDirection: 'column',
    backgroundColor: Colors.snow,
    borderBottomColor: Colors.silver,
    borderBottomWidth: 0.5,
    padding: 20
  }
})
