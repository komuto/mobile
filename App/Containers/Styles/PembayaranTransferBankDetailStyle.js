import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.paleGrey
  },
  batasPembayaran: {
    backgroundColor: Colors.lightOrange,
    padding: 20,
    flexDirection: 'row',
    borderBottomColor: Colors.silver,
    borderBottomWidth: 0.5
  },
  image: {
    width: 30,
    height: 30
  },
  infoPembayaran: {
    marginLeft: 12,
    flexDirection: 'column'
  },
  textPembayaran: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    letterSpacing: 0.22,
    color: Colors.boldOrange
  },
  time: {
    opacity: 0.7,
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    letterSpacing: 0.22,
    color: Colors.brownishGrey
  },
  tagihanContainer: {
    flexDirection: 'column',
    backgroundColor: Colors.snow,
    borderBottomColor: Colors.silver,
    borderBottomWidth: 0.5
  },
  rowContainer: {
    padding: 20,
    borderBottomColor: Colors.silver,
    borderBottomWidth: 0.5,
    flexDirection: 'row'
  },
  bold: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.bold,
    lineHeight: 19,
    letterSpacing: 0.22,
    color: Colors.darkgrey
  },
  textTitle: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.regular,
    lineHeight: 21,
    letterSpacing: 0.22,
    color: Colors.darkgrey
  },
  arrow: {
    width: 24,
    height: 24
  },
  textBlue: {
    marginTop: 2,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.regular,
    lineHeight: 19,
    letterSpacing: 0.22,
    color: Colors.bluesky
  },
  expandButton: {
    flexDirection: 'row',
    marginLeft: 10
  },
  rincianContainer: {
    backgroundColor: Colors.paleGreyThree,
    flexDirection: 'column'
  },
  bodyRincian: {
    margin: 20,
    borderBottomColor: Colors.silver,
    borderBottomWidth: 0.5
  },
  rowContainerRincian: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingBottom: 10
  },
  textGreen: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.regular,
    lineHeight: 19,
    letterSpacing: 0.22,
    color: Colors.green
  },
  caraBayarContainer: {
    marginTop: 10,
    padding: 20
  },
  listViewContainer: {
    backgroundColor: Colors.snow,
    padding: 20,
    flexDirection: 'row',
    borderBottomColor: Colors.silver,
    borderBottomWidth: 0.5,
    marginBottom: 10
  },
  listView: {
    paddingRight: 20,
    flexDirection: 'column'
  },
  numberContainer: {
    backgroundColor: Colors.lightBlue,
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  number: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.type.smallMed,
    lineHeight: 21,
    marginTop: -3,
    letterSpacing: 0.22,
    color: Colors.blue
  },
  bankContainer: {
    flexDirection: 'column',
    borderBottomColor: Colors.silver,
    borderBottomWidth: 0.5,
    marginTop: 20,
    paddingBottom: 20,
    marginRight: -20,
    paddingRight: 20
  },
  namaBankContainer: {
    flexDirection: 'row',
    marginBottom: 15
  },
  imageBank: {
    width: 50,
    height: 25,
    resizeMode: 'contain',
    marginRight: 20
  },
  rekeningContainerRow: {
    flexDirection: 'row'
  },
  rekeningContainerColumn: {
    flexDirection: 'column',
    marginRight: 10
  },
  boxOrange: {
    padding: 20,
    backgroundColor: Colors.lightOrange
  },
  nominalBlack: {
    fontSize: 20,
    fontFamily: Fonts.type.bold,
    letterSpacing: 0.22,
    color: Colors.darkgrey
  },
  nominalOrange: {
    fontSize: 20,
    fontFamily: Fonts.type.bold,
    letterSpacing: 0.22,
    color: Colors.boldOrange
  },
  separator: {
    marginBottom: 10,
    backgroundColor: Colors.snow
  },
  button: {
    margin: 20,
    borderRadius: 3,
    height: 50,
    backgroundColor: Colors.bluesky,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textButton: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.medium,
    letterSpacing: 0.23,
    color: Colors.snow
  },
  containerBarang: {
    padding: 20,
    backgroundColor: Colors.snow,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver,
    flexDirection: 'row'
  },
  namaBarangContainer: {
    marginLeft: 15,
    flexDirection: 'column',
    flex: 1
  },
  imageBarang: {
    height: 60,
    width: 60
  }
})
