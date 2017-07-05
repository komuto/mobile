import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.paleGrey,
    flexDirection: 'column'
  },
  headerContainer: {
    backgroundColor: Colors.snow,
    flexDirection: 'column',
    padding: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver
  },
  infoContainer: {
    flexDirection: 'row'
  },
  profilContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.lightSilver,
    marginRight: 30
  },
  profilImage: {
    width: 78,
    height: 78,
    borderRadius: 39
  },
  info: {
    flexDirection: 'column'
  },
  imageVerify: {
    width: 32,
    height: 32,
    marginRight: 2
  },
  verifyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: -8
  },
  namaToko: {
    color: Colors.darkgrey,
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.regular,
    letterSpacing: 0.2,
    marginBottom: 5
  },
  alamatToko: {
    color: Colors.labelgrey,
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.medium,
    letterSpacing: 0.2
  },
  verifiedText: {
    color: Colors.darkgrey,
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.medium,
    letterSpacing: 0.2
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    backgroundColor: Colors.snow,
    borderColor: Colors.lightSilver,
    borderWidth: 1
  },
  separator: {
    width: 20
  },
  buttonContainer: {
    marginTop: 50,
    flexDirection: 'row'
  },
  image: {
    width: 24,
    height: 24,
    marginLeft: -10,
    marginRight: 3
  },
  textTab: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.regular,
    letterSpacing: 0.4,
    marginTop: 5
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
  katalog: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.type.medium,
    letterSpacing: 0.22,
    color: Colors.snow,
    marginTop: -3,
    marginLeft: 3
  },
  modalContainer: {
    position: 'absolute',
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  containerData: {
    padding: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver
  },
  containerDataLast: {
    padding: 20
  },
  kategori: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.medium,
    letterSpacing: 0.22,
    color: Colors.darkgrey
  }
})
