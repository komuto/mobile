import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    height: Metrics.screenHeight,
    backgroundColor: Colors.paleGrey
  },
  spinner: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Metrics.screenWidth,
    height: Metrics.screenHeight - Metrics.navBarHeight - 100
  },
  textHeader: {
    flex: 1,
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.smallMed,
    color: Colors.lightblack
  },
  headerInfoAlamat: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    height: 50
  },
  imageDot: {
    height: 24,
    width: 24
  },
  containerProduk: {
    backgroundColor: Colors.snow
  },
  flexRow: {
    flexDirection: 'row'
  },
  flexOne: {
    flex: 1
  },
  dataListProduk: {
    paddingLeft: 20,
    paddingTop: 20,
    borderBottomColor: Colors.silver,
    borderBottomWidth: 0.5,
    backgroundColor: Colors.snow
  },
  imageProduk: {
    height: 45,
    width: 45,
    borderRadius: 3
  },
  column: {
    flex: 1,
    marginLeft: 15,
    marginRight: 26,
    marginTop: -10,
    paddingBottom: 22
  },
  textTitle: {
    flex: 1,
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.smallMed,
    color: Colors.darkgrey,
    lineHeight: 23
  },
  textDetail: {
    flex: 1,
    paddingTop: 10,
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.small,
    color: Colors.darkgrey
  },
  separaator: {
    paddingBottom: 20
  },
  floatButton: {
    position: 'absolute',
    top: Metrics.screenHeight - Metrics.navBarHeight - 90,
    left: 10,
    backgroundColor: 'rgba(64,72,82,0.6)',
    borderRadius: 5,
    width: 150,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  floatImage: {
    width: 24,
    height: 24
  },
  katalog: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.type.medium,
    letterSpacing: 0.22,
    color: Colors.snow,
    marginTop: -3,
    marginLeft: 3
  },
  create: {
    position: 'absolute',
    top: Metrics.screenHeight - Metrics.navBarHeight - 100,
    right: 10,
    backgroundColor: Colors.bluesky,
    borderRadius: 200,
    height: 56,
    width: 56,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5
  },
  scrollView: {
    paddingBottom: 10
  },
  textTab: {
    fontSize: Fonts.size.smallMed,
    fontFamily: Fonts.type.semiBolds,
    letterSpacing: 0.22,
    marginTop: 5
  },
  searchContainer: {
    backgroundColor: Colors.background,
    borderRadius: 2,
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    marginBottom: 20
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
    fontFamily: Fonts.type.regular,
    marginLeft: 10
  },
  laberDropShipping: {
    width: 180,
    backgroundColor: Colors.veryLighBlue,
    height: 40,
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
    justifyContent: 'center'
  },
  textDropShipping: {
    fontSize: Fonts.size.smallMed,
    fontFamily: Fonts.type.bold,
    color: Colors.darkBlueSky,
    marginLeft: 8,
    paddingBottom: 2
  },
  triangleLabel: {
    borderTopWidth: 30 / 2.0,
    borderRightWidth: 5,
    borderBottomWidth: 30 / 2.0,
    borderLeftWidth: 0,
    borderTopColor: 'transparent',
    borderRightColor: Colors.snow,
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    backgroundColor: Colors.veryLighBlue,
    width: 20
  },
  touch: {
    justifyContent: 'center',
    flex: 0.7,
    paddingLeft: 20,
    paddingTop: 15,
    paddingBottom: 15
  },
  textEdit: {
    fontFamily: Fonts.type.semiBolds,
    fontSize: Fonts.size.smallMed,
    color: Colors.darkgrey
  },
  edit: {
    right: 0,
    height: 212,
    width: 243,
    margin: 5,
    borderRadius: 3,
    backgroundColor: Colors.snow
  },
  editContainer: {
    position: 'absolute',
    top: 45,
    right: 20,
    height: Metrics.screenHeight,
    flexDirection: 'row',
    width: Metrics.screenWidth
  },
  border: {
    borderBottomColor: Colors.silver,
    borderBottomWidth: 0.5
  },
  modalContainer: {
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
  containerDataLast: {
    padding: 20
  },
  kategori: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.medium,
    letterSpacing: 0.22,
    color: Colors.darkgrey
  },
  containerData: {
    padding: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver
  },
  emptyContainer: {
    flexDirection: 'column',
    padding: 20,
    marginTop: 80,
    alignItems: 'center'
  },
  emptyImage: {
    width: 195,
    height: 172,
    resizeMode: 'contain',
    marginBottom: 10
  },
  textNotif: {
    fontFamily: Fonts.type.regular,
    fontSize: 13,
    lineHeight: 22,
    letterSpacing: 0.22,
    textAlign: 'center',
    color: Colors.labelgrey
  },
  price: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.medium,
    letterSpacing: 0.23,
    color: Colors.darkgrey
  }
})
