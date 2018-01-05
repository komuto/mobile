import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.background
  },
  borderContainer: {
    alignItems: 'center',
    height: 70.3,
    flexDirection: 'row',
    flex: 1,
    marginLeft: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver
  },
  dataProfileContainer: {
    backgroundColor: Colors.background,
    flexDirection: 'column',
    paddingLeft: 20,
    elevation: 1
  },
  profile: {
    height: 70.3,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20
  },
  imageCategory: {
    height: 24,
    width: 24
  },
  namaContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  textNama: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.medium,
    color: Colors.lightblack
  },
  rightArrow: {
    height: 24,
    width: 24,
    marginLeft: 10,
    marginRight: 13
  },
  containerNumber: {
    height: 24,
    width: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.red
  },
  number: {
    fontSize: Fonts.size.tiny,
    color: Colors.snow,
    fontFamily: Fonts.type.bold
  }
})
