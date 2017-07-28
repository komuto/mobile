import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  spinner: {
    position: 'absolute',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    opacity: 0.5
  },
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.snow
  },
  containerinfoDropshipping: {
    marginLeft: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver,
    paddingBottom: 20
  },
  containerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingRight: 22
  },
  title: {
    fontFamily: Fonts.type.semiBolds,
    fontSize: Fonts.size.smallMed,
    color: Colors.lightblack,
    flex: 1
  },
  desc: {
    fontFamily: Fonts.type.regular,
    lineHeight: 22,
    fontSize: Fonts.size.smallMed,
    color: Colors.brownishGrey,
    flex: 1,
    paddingTop: 10
  },
  buttonnext: {
    height: 50,
    backgroundColor: Colors.bluesky,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textButtonNext: {
    color: Colors.background,
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.medium
  }
})
