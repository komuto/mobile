import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.paleGrey
  },
  dataContainer: {
    backgroundColor: Colors.snow,
    marginBottom: 20,
    elevation: 2
  },
  product: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver,
    alignItems: 'center'
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10
  },
  dataProduk: {
    flexDirection: 'column',
    flex: 1
  },
  textNamaProduk: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.smallMed,
    letterSpacing: 0.22,
    color: Colors.darkgrey
  },
  textJumlah: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    letterSpacing: 0.22,
    color: Colors.labelgrey
  },
  alamatContainer: {
    flexDirection: 'column',
    padding: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver,
    justifyContent: 'center'
  },
  titleContainer: {
    marginBottom: 4
  },
  textAlamat: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    lineHeight: 22,
    letterSpacing: 0.22,
    color: Colors.brownishGrey
  },
  infoContainer: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver
  },
  labelContainer: {
    flex: 1
  },
  catatanContainer: {
    padding: 20,
    flexDirection: 'column',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver
  },
  rincianContainer: {
    flexDirection: 'column',
    padding: 20,
    backgroundColor: Colors.paleGreyThree
  },
  labelRincianContainer: {
    marginBottom: 20
  },
  rincian: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textRincian: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    lineHeight: 22,
    marginTop: 5,
    marginBottom: 5,
    letterSpacing: 0.22,
    color: Colors.brownishGrey
  },
  textRincianTotal: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.smallMed,
    lineHeight: 22,
    marginTop: 5,
    marginBottom: 5,
    letterSpacing: 0.22,
    color: Colors.brownishGrey
  },
  totalHargaContainer: {
    backgroundColor: Colors.snow,
    flexDirection: 'column'
  },
  rincianTotalContainer: {
    flexDirection: 'column',
    padding: 20,
    backgroundColor: Colors.snow
  },
  textRincianTotalHijau: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    lineHeight: 22,
    marginTop: 5,
    marginBottom: 5,
    letterSpacing: 0.22,
    color: Colors.green
  },
  sisaPembayaran: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    marginTop: 20,
    borderTopColor: Colors.silver,
    borderTopWidth: 0.5
  },
  sisaPembayaranText: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.medium,
    lineHeight: 22,
    marginTop: 5,
    marginBottom: 5,
    letterSpacing: 0.22,
    color: Colors.darkgrey
  }
})
