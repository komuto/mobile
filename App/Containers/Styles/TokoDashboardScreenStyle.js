import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.paleGrey
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
  borderContainer: {
    alignItems: 'center',
    height: 70.3,
    flexDirection: 'row',
    flex: 1,
    marginLeft: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver
  },
  noBorderContainer: {
    alignItems: 'center',
    height: 70.3,
    flexDirection: 'row',
    flex: 1,
    marginLeft: 15
  },
  textNama: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.medium,
    color: Colors.lightblack
  },
  textMenu: {
    fontFamily: Fonts.type.semiBolds,
    fontSize: Fonts.size.medium,
    color: Colors.darkgrey,
    paddingLeft: 21,
    paddingTop: 29.7,
    paddingBottom: 15.2
  },
  rightArrow: {
    height: 24,
    width: 24,
    marginLeft: 10,
    marginRight: 13
  },
  textKelola: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.small,
    color: Colors.labelgrey,
    marginTop: 5.5
  },
  buttonnext: {
    width: Metrics.screenWidth - 40,
    height: 40,
    backgroundColor: Colors.bluesky,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 30
  },
  textButtonNext: {
    color: Colors.background,
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.medium
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
