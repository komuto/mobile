import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.snow,
    marginTop: Metrics.navBarHeight
  },
  header: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver,
    height: 62.3,
    justifyContent: 'center',
    paddingLeft: 20
  },
  textHeader: {
    fontFamily: Fonts.type.semiBolds,
    fontSize: Fonts.size.smallMed,
    color: Colors.darkgrey
  },
  containerMain: {
    marginLeft: 20
  },
  textMenu: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    color: Colors.lightblack,
    flex: 1
  },
  menu: {
    flexDirection: 'row',
    height: 62,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    paddingRight: 20,
    borderBottomColor: Colors.silver
  },
  buttonnext: {
    height: 50,
    backgroundColor: Colors.bluesky,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 17.5,
    marginBottom: 20
  },
  textButtonNext: {
    color: Colors.background,
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.medium
  },
  notif: {
    flexDirection: 'row',
    backgroundColor: Colors.duckEggBlue,
    alignItems: 'center',
    paddingRight: 19
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
