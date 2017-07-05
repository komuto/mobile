import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    height: Metrics.screenHeight,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.background
  },
  floatingSearch: {
    borderBottomColor: Colors.silver,
    borderBottomWidth: 0.5,
    height: 50,
    backgroundColor: Colors.snow,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15
  },
  searchImage: {
    height: 24,
    width: 24
  },
  textInputContainer: {
    flex: 1
  },
  inputText: {
    flex: 1,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.regular
  },
  menuBottomContainer: {
    height: 50,
    position: 'absolute',
    bottom: 0,
    width: Metrics.screenWidth,
    marginTop: 10,
    elevation: 4,
    backgroundColor: Colors.snow,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  urutkanContainer: {
    flex: 1,
    borderRightWidth: 0.5,
    borderRightColor: Colors.silver,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  textMenuBawah: {
    fontSize: Fonts.size.smallMed,
    fontFamily: Fonts.type.regular,
    color: Colors.darkgrey,
    marginLeft: 5
  },
  keranjangContainer: {
    flex: 1,
    alignItems: 'flex-end',
    zIndex: 99
  }
})
