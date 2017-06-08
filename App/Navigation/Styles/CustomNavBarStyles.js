import { Colors, Metrics, Fonts } from '../../Themes/'

export default {
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: Metrics.navBarHeight,
    backgroundColor: Colors.tabbackground,
    flexDirection: 'row'
  },
  title: {
    flex: 1,
    textAlign: 'left',
    color: Colors.snow,
    marginTop: Metrics.doubleBaseMargin - 3,
    marginLeft: 20,
    backgroundColor: Colors.transparent,
    fontFamily: Fonts.style.bold,
    fontSize: 16,
    fontWeight: 'bold'
  },
  logo: {
    alignSelf: 'center',
    marginTop: Metrics.baseMargin,
    height: Metrics.icons.large,
    width: Metrics.icons.large
  },
  rightButtons: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row'
  },
  leftButtons: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'row'
  }
}
