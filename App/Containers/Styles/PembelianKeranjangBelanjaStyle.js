import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.background
  },
  border: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 2,
    backgroundColor: Colors.background
  },
  textHapus: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.type.smallMed,
    letterSpacing: 0.22,
    color: Colors.red,
    marginRight: 20
  },
  styleFotoToko: {
    width: 40,
    height: 40
  },
  namaContainer: {
    flexDirection: 'column',
    flex: 1,
    marginLeft: 16
  },
  textNama: {
    fontFamily: Fonts.type.semiBolds,
    fontSize: Fonts.size.smallMed,
    color: Colors.darkgrey,
    letterSpacing: 0.22,
    marginBottom: 3
  },
  textKelola: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.small,
    color: Colors.lightgrey,
    opacity: 0.50,
    letterSpacing: 0.2
  },
  qualityContainer: {
    backgroundColor: Colors.background,
    flexDirection: 'row',
    paddingLeft: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver
  },
  eachQualiyNoMargin: {
    width: Metrics.screenWidth / 2 - 10,
    paddingBottom: 24.8
  },
  qualityText: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.bold,
    color: Colors.darkgrey,
    marginBottom: 8
  },
  imageOperator: {
    width: 24,
    height: 24,
    marginRight: 5,
    marginLeft: 5
  },
  textJumlah: {
    flex: 1,
    textAlign: 'center',
    borderBottomColor: Colors.silver,
    borderBottomWidth: 1
  },
  alamatContainer: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver
  },
  alamat: {
    flexDirection: 'column',
    flex: 1
  },
  textAlamat: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    color: Colors.lightgrey,
    letterSpacing: 0.2,
    marginTop: 5
  },
  textGanti: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.type.smallMed,
    letterSpacing: 0.22,
    color: Colors.bluesky
  }
})
