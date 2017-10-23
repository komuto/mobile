import { StyleSheet } from 'react-native'
import { Colors, Fonts, Metrics } from '../../Themes/'

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
  },
  modalContainer: {
    position: 'absolute',
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  listViewModal: {
    position: 'absolute',
    bottom: 95,
    left: 20,
    backgroundColor: Colors.snow,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: (Metrics.screenWidth * 3) / 4
  },
  floatButtonClose: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    backgroundColor: 'rgba(64,72,82,0.8)',
    borderRadius: 5,
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  floatImage: {
    width: 24,
    height: 24
  },
  containerData: {
    padding: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver
  },
  containerDataLast: {
    padding: 20
  },
  kategori2: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.medium,
    letterSpacing: 0.22,
    color: Colors.darkgrey
  },
  floatButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: 'rgba(64,72,82,0.8)',
    borderRadius: 5,
    width: 150,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  katalog: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.type.medium,
    letterSpacing: 0.22,
    color: Colors.snow,
    marginTop: -3,
    marginLeft: 3
  }
})
