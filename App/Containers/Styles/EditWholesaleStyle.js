import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.background
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  imageProduct: {
    height: 40,
    width: 40,
    resizeMode: 'cover',
    borderRadius: 4
  },
  textProduct: {
    fontFamily: Fonts.type.semiBolds,
    letterSpacing: 0.22,
    fontSize: Fonts.size.smallMed,
    color: Colors.darkgrey,
    marginLeft: 15
  },
  saleContainer: {
    padding: 20,
    borderTopWidth: 0.5,
    borderTopColor: Colors.silver,
    flexDirection: 'row'
  },
  textContainer: {
    flexDirection: 'column',
    flex: 1
  },
  textTitle: {
    fontFamily: Fonts.type.semiBolds,
    letterSpacing: 0.22,
    fontSize: Fonts.size.smallMed,
    color: Colors.darkgrey
  },
  textDescription: {
    marginTop: 5,
    fontFamily: Fonts.type.regular,
    letterSpacing: 0.22,
    fontSize: Fonts.size.smallMed,
    color: Colors.brownishGrey
  },
  switch: {
    marginLeft: 30,
    marginTop: 10
  },
  titleContainer: {
    padding: 20,
    backgroundColor: Colors.paleGrey
  },
  textTitleWholesale: {
    fontFamily: Fonts.type.bold,
    letterSpacing: 0.22,
    fontSize: Fonts.size.smallMed,
    color: Colors.darkgrey
  },
  formContainer: {
    padding: 20,
    flexDirection: 'column'
  },
  rowContainer: {
    flexDirection: 'row'
  },
  wholesale: {
    flexDirection: 'column',
    flex: 1
  },
  textLabel: {
    fontFamily: Fonts.type.regular,
    letterSpacing: 0.22,
    fontSize: Fonts.size.smallMed,
    color: Colors.labelgrey
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputText: {
    color: Colors.darkgrey,
    flex: 1,
    textAlign: 'center',
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    borderBottomWidth: 1,
    borderBottomColor: Colors.silver,
    paddingLeft: -1
  },
  deleteButton: {
    alignItems: 'flex-end',
    marginTop: 30
  },
  textDelete: {
    fontFamily: Fonts.type.bold,
    letterSpacing: 0.22,
    fontSize: Fonts.size.smallMed,
    color: Colors.red
  },
  addButton: {
    padding: 20
  },
  textAddSale: {
    fontFamily: Fonts.type.bold,
    letterSpacing: 0.22,
    fontSize: Fonts.size.smallMed,
    color: Colors.bluesky
  },
  separator: {
    height: 10,
    backgroundColor: Colors.paleGrey
  },
  saveContainer: {
    backgroundColor: Colors.paleGrey,
    flexDirection: 'row',
    padding: 20
  },
  save: {
    flex: 1,
    backgroundColor: Colors.bluesky,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: 50
  },
  textButtonNext: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.smallMed,
    color: Colors.snow
  }
})
