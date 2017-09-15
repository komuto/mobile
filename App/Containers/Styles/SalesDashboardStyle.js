import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.paleGrey
  },
  menuContainer: {
    backgroundColor: Colors.background,
    flexDirection: 'column',
    paddingLeft: 20,
    elevation: 1
  },
  menu: {
    height: 70.3,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20
  },
  icon: {
    height: 24,
    width: 24
  },
  nameContainer: {
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
  textName: {
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
  statusAmount: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.medium,
    color: Colors.lightblack
  },
  circleRed: {
    backgroundColor: Colors.red,
    borderRadius: 200,
    height: 25,
    width: 25,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
