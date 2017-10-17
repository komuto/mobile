import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.snow
  },
  headerInfoAlamat: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver,
    paddingLeft: 20,
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20
  },
  textHeader: {
    flex: 1,
    fontFamily: Fonts.type.semiBolds,
    fontSize: Fonts.size.smallMed,
    color: Colors.lightblack,
    lineHeight: 23
  },
  imageDot: {
    height: 24,
    width: 24
  },
  dataInfoAlamat: {
    paddingTop: 16.3,
    marginLeft: 20
  },
  textHeader2: {
    flex: 1,
    paddingTop: 4,
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    color: Colors.lightblack
  },
  edit: {
    position: 'absolute',
    top: 23,
    right: 20,
    backgroundColor: Colors.snow
  },
  touch: {
    justifyContent: 'center',
    padding: 5
  },
  create: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: Colors.bluesky,
    borderRadius: 200,
    height: 56,
    width: 56,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5
  },
  imageTambah: {
    height: 20,
    width: 20
  },
  notif: {
    flexDirection: 'row',
    backgroundColor: Colors.duckEggBlue,
    alignItems: 'center',
    paddingRight: 19,
    position: 'relative'
  },
  textNotif: {
    flex: 1,
    padding: 20,
    color: Colors.greenish,
    fontFamily: Fonts.type.semiBolds,
    fontSize: Fonts.size.smallMed
  },
  image: {
    height: 25,
    width: 25
  },
  bgModal: {
    backgroundColor: 'rgba(0,0,0, 0.8)',
    flex: 1
  },
  contaierModal: {
    flex: 1,
    borderRadius: 5,
    marginTop: 100.5,
    marginBottom: 100.5,
    marginLeft: 30.5,
    marginRight: 30.5,
    paddingTop: 29.5,
    backgroundColor: Colors.snow,
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleModal: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.medium,
    color: Colors.darkgrey,
    letterSpacing: 0.22,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 6,
    marginTop: 30
  },
  titleModal2: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    color: Colors.brownishGrey,
    letterSpacing: 0.22,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 6
  },
  verifikasiButton: {
    backgroundColor: Colors.bluesky,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 25.5,
    height: 50,
    justifyContent: 'center',
    width: 260
  },
  batalButton: {
    borderRadius: 5
  },
  textVerifikasiButton: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.medium,
    color: Colors.background,
    letterSpacing: 0.23,
    textAlign: 'center'
  },
  textBatalButton: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.medium,
    color: Colors.bluesky,
    letterSpacing: 0.23
  },
  gambarHapus: {
    height: 117,
    width: 143
  },
  gambarSukses: {
    height: 143,
    width: 143
  },
  headerTextContainer: {
    height: Metrics.navBarHeight,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: Colors.red
  },
  imageStyle: {
    height: 24,
    width: 24
  },
  headerText: {
    flex: 1,
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.bold,
    top: -1,
    marginLeft: 10,
    marginRight: 10,
    color: Colors.snow
  }
})
