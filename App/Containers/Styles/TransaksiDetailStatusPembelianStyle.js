import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  titleContainer: {
    backgroundColor: Colors.paleGrey,
    justifyContent: 'center',
    padding: 20
  },
  textTitle: {
    fontFamily: Fonts.type.bold,
    fontSize: 13,
    letterSpacing: 0.22,
    color: Colors.darkgrey
  },
  itemContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver,
    flexDirection: 'row',
    padding: 20
  },
  image: {
    height: 50,
    width: 50,
    marginRight: 10,
    marginTop: 5
  },
  dataContainer: {
    flexDirection: 'column',
    flex: 1
  },
  textData: {
    fontFamily: Fonts.type.regular,
    fontSize: 13,
    letterSpacing: 0.22,
    color: Colors.darkgrey
  },
  shippingContainer: {
    flexDirection: 'column'
  },
  addressContainer: {
    flexDirection: 'column',
    padding: 20,
    borderBottomColor: Colors.silver,
    borderBottomWidth: 0.5
  },
  courier: {
    flexDirection: 'row',
    padding: 20,
    borderBottomColor: Colors.silver,
    borderBottomWidth: 0.5
  }
})
