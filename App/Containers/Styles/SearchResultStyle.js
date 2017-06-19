import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.snow
  },
  headerContainer: {
    height: Metrics.navBarHeight,
    borderBottomWidth: 0.5,
    justifyContent: 'center',
    borderBottomColor: Colors.silver
  },
  headerContainerRender: {
    height: Metrics.navBarHeight,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  imageStyle: {
    height: 24,
    width: 24
  },
  textInputContainer: {
    flex: 1
  },
  inputText: {
    flex: 1,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.regular,
    marginLeft: 10,
    color: Colors.darkgrey
  },
  kategori: {
    backgroundColor: Colors.red
  },
  search: {
    backgroundColor: Colors.snow
  },
  headerTextContainer: {
    height: Metrics.navBarHeight,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  headerText: {
    flex: 1,
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.bold,
    lineHeight: 18,
    top: -3,
    marginLeft: 10,
    marginRight: 10,
    color: Colors.snow
  }
})
