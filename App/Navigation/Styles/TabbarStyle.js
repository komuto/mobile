import { Metrics, Fonts, Colors } from '../../Themes'

export default {
  tabbar: {
    flex: 1,
    backgroundColor: Colors.snow,
    height: Metrics.tabBarHeight,
    borderWidth: 0.6,
    borderColor: '#e8e8e8'
  },
  buttonContainer: {
    height: Metrics.tabBarHeight,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonImage: {
    alignSelf: 'center',
    height: 25,
    width: 25,
    marginBottom: 4
  },
  buttonText: {
    alignSelf: 'center',
    height: 11,
    color: '#989296',
    fontFamily: Fonts.type.semiBold,
    fontSize: 10,
    lineHeight: 11
  }
}
