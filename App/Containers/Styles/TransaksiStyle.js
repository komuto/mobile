import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    marginBottom: 45,
    backgroundColor: Colors.background
  },
  rowContainer: {
    flexDirection: 'column',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver
  },
  rowContainerVerified: {
    flexDirection: 'column',
    backgroundColor: Colors.backgroundVerified,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver,
    borderLeftColor: Colors.bluesky,
    borderLeftWidth: 3
  },
  dataSingle: {
    flexDirection: 'row',
    padding: 20
  },
  imageStyle: {
    height: 45,
    width: 45,
    borderRadius: 5,
    resizeMode: 'contain'
  },
  productContainer: {
    flexDirection: 'column',
    marginLeft: 20,
    marginRight: 20,
    flex: 1,
    justifyContent: 'center'
  },
  hargaContainer: {
    flexDirection: 'column',
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'center'
  },
  textTitle: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    lineHeight: 21,
    letterSpacing: 0.2,
    color: Colors.darkgrey
  },
  textTitleWhite: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    lineHeight: 21,
    letterSpacing: 0.2,
    color: Colors.snow
  },
  arrow: {
    width: 24,
    height: 24
  },
  price: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.medium,
    letterSpacing: 0.23,
    color: Colors.darkgrey
  },
  pembayaranContainer: {
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: Colors.lightOrange,
    borderRadius: 5,
    padding: 12,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  titlePembayaran: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    letterSpacing: 0.22,
    color: Colors.yellow,
    marginBottom: 5
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  imageRowStyle: {
    height: 45,
    width: 45,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    resizeMode: 'cover'
  },
  imageRowStyle2: {
    height: 45,
    width: 45,
    alignItems: 'center',
    justifyContent: 'center'
  },
  morePictures: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 5,
    height: 45,
    width: 45,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyContainer: {
    flexDirection: 'column',
    padding: 20,
    marginTop: 30,
    alignItems: 'center'
  },
  emptyImage: {
    width: 173,
    height: 201,
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
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 25,
    paddingLeft: 10,
    paddingRight: 10
  },
  startShopping: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: Colors.bluesky,
    height: 50
  },
  textButton: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.medium,
    lineHeight: 21,
    letterSpacing: 0.2,
    color: Colors.snow
  }
})
