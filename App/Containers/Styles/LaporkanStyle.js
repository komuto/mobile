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
    lineHeight: 22,
    color: Colors.darkgrey
  },
  hargaBarang: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.medium,
    letterSpacing: 0.22,
    color: Colors.labelgrey
  },
  radioContainer: {
    flexDirection: 'column',
    margin: 20,
    paddingBottom: 10,
    borderBottomColor: Colors.silver,
    borderBottomWidth: 1
  },
  radio: {
    marginLeft: -10,
    marginTop: 5,
    marginBottom: 30
  },
  laporan: {
    marginTop: 5,
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.medium,
    letterSpacing: 0.22,
    lineHeight: 22,
    color: Colors.darkgrey
  },
  tombol: {
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.bluesky,
    padding: 15,
    borderRadius: 5
  },
  tombolKembali: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.bluesky,
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 5
  },
  textTombol: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.medium,
    letterSpacing: 0.23,
    color: Colors.snow
  },
  modalContainer: {
    position: 'absolute',
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  notifikasiContainer: {
    backgroundColor: Colors.snow,
    height: 350,
    width: 320,
    padding: 20,
    borderRadius: 5,
    flexDirection: 'column'
  },
  notifikasi: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
