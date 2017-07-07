import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.background
  },
  containerData: {
    flexDirection: 'column'
  },
  headerContainer: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    borderBottomColor: Colors.silver,
    borderBottomWidth: 1
  },
  imageStyle: {
    height: 30,
    width: 30
  },
  barangContainer: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 15
  },
  namaBarang: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.medium,
    letterSpacing: 0.22,
    color: Colors.darkgrey
  },
  hargaBarang: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.medium,
    letterSpacing: 0.22,
    color: Colors.labelgrey
  }
})
