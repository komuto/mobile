import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.paleGrey,
    marginTop: Metrics.navBarHeight
  },
  touch: {
    justifyContent: 'center',
    padding: 5,
    backgroundColor: 'red',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver
  },
  textEdit: {
    fontFamily: Fonts.type.semiBolds,
    fontSize: Fonts.size.smallMed,
    color: Colors.darkgrey
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
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(64,72,82,0.8)',
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
    bottom: 10,
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
    fontSize: Fonts.size.smallMed,
    fontFamily: Fonts.type.regular,
    marginLeft: 10
  },
  laberDropShipping: {
    width: 180,
    backgroundColor: Colors.veryLighBlue,
    height: 30,
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
  }
})
