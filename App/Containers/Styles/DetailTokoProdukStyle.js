import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -10,
    backgroundColor: Colors.paleGrey,
    flexDirection: 'column'
  },
  headerContainer: {
    alignItems: 'center',
    padding: 20,
    flexDirection: 'row'
  },
  containerListView: {
    flexDirection: 'column',
    marginTop: 20,
    borderBottomColor: Colors.silver,
    borderBottomWidth: 0.5
  },
  containerKategori: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    backgroundColor: Colors.snow,
    borderColor: Colors.silver,
    borderWidth: 0.5
  },
  kategori: {
    flex: 1
  },
  lihat: {
    alignItems: 'flex-end'
  },
  textKategori: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.medium,
    letterSpacing: 0.22,
    color: Colors.darkgrey
  },
  textButton: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.medium,
    letterSpacing: 0.22,
    color: Colors.bluesky
  }
})
