import { Colors, Metrics, Fonts } from '../../Themes/'

export default {
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.tabbackground,
    flexDirection: 'row',
    height: Metrics.navBarHeight
  },
  middleContainer: {
    justifyContent: 'center',
    flex: 6
  },
  title: {
    color: Colors.snow,
    backgroundColor: Colors.transparent,
    fontFamily: Fonts.style.bold,
    fontSize: 16,
    fontWeight: 'bold'
  },
  leftContainer: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  rightContainer: {
    flex: 0.6
  },
  buttonContainer: {
    height: Metrics.navBarHeight,
    justifyContent: 'center',
    marginRight: 5
  },
  buttonIcon: {
    height: 24,
    width: 24
  },
  leftLogo: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginLeft: Metrics.marginHorizontal,
    marginRight: Metrics.marginHorizontal,
    height: Metrics.icons.large
  },
  logoImage: {
    marginLeft: Metrics.marginHorizontal,
    width: Metrics.images.logoMedium,
    resizeMode: 'contain'
  }
}
