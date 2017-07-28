import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.paleGrey,
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20
  },
  title: {
    fontFamily: Fonts.type.semiBolds,
    fontSize: Fonts.size.smallMed,
    color: Colors.lightblack
  },
  desc: {
    fontFamily: Fonts.type.regular,
    lineHeight: 20,
    fontSize: Fonts.size.smallMed,
    color: Colors.brownishGrey,
    paddingTop: 4.2
  },
  menu: {
    flexDirection: 'row',
    backgroundColor: Colors.snow,
    borderRadius: 3,
    marginBottom: 10.3,
    paddingTop: 17,
    paddingLeft: 14,
    paddingRight: 14,
    paddingBottom: 20.7
  },
  textMenuCol: {
    flex: 1,
    marginLeft: 13.2,
    paddingTop: 6.8
  },
  imageMenu: {
    height: 32,
    width: 32
  },
  imageArrow: {
    height: 24,
    width: 24
  }
})
