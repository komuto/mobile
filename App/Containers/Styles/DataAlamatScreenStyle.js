import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.paleGrey,
    marginTop: Metrics.navBarHeight
  },
  infoAlamat: {
    backgroundColor: Colors.snow
  },
  imageDot: {
    height: 24,
    width: 24
  },
  textHeader: {
    flex: 1,
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.smallMed,
    color: Colors.lightblack
  },
  textHeader2: {
    flex: 1,
    paddingTop: 4,
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    color: Colors.lightblack,
    paddingBottom: 20
  },
  headerInfoAlamat: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver,
    marginLeft: 20,
    paddingTop: 16.5,
    paddingBottom: 13.5,
    paddingRight: 20
  },
  dataInfoAlamat: {
    paddingTop: 16.3,
    marginLeft: 20
  },
  bgModal: {
    backgroundColor: 'rgba(0,0,0, 0.8)',
    flex: 1
  },
  contaierModal: {
    flex: 1,
    borderRadius: 5,
    marginTop: 126,
    marginBottom: 126,
    marginLeft: 30.5,
    marginRight: 30.5,
    paddingTop: 120,
    backgroundColor: Colors.snow,
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleModal: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.medium,
    color: Colors.darkgrey,
    letterSpacing: 0.19,
    textAlign: 'center',
    marginBottom: 6
  },
  verifikasiButton: {
    backgroundColor: Colors.bluesky,
    borderRadius: 5,
    marginTop: 31,
    marginBottom: 25.5,
    height: 50,
    justifyContent: 'center',
    width: 250
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
  touch: {
    justifyContent: 'center',
    padding: 5
  },
  textEdit: {
    fontFamily: Fonts.type.semiBolds,
    fontSize: Fonts.size.smallMed,
    color: Colors.darkgrey
  },
  edit: {
    position: 'absolute',
    top: 23,
    right: 20,
    backgroundColor: Colors.snow
  },
  border: {
    borderBottomColor: Colors.silver,
    borderBottomWidth: 0.5
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
    height: 24,
    width: 24
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
  }
})
