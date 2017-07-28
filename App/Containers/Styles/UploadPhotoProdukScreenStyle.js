import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  spinner: {
    position: 'absolute',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    opacity: 0.5
  },
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.snow
  },
  header: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: Colors.background,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver,
    alignItems: 'center',
    justifyContent: 'center'
  },
  state: {
    borderRadius: 21,
    height: 21,
    width: 21,
    borderWidth: 0.8,
    borderColor: Colors.silver,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textState: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.tiny,
    color: Colors.labelgrey
  },
  line: {
    width: 21,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver
  },
  title: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    color: Colors.darkgrey,
    lineHeight: 21
  },
  stateOne: {
    flex: 1,
    marginTop: 27,
    marginLeft: 20,
    marginRight: 20
  },
  imageProduk: {
    height: 100,
    width: 100
  },
  fotoTumb: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: 100,
    borderRadius: 3,
    backgroundColor: Colors.paleGreyFour
  },
  imageTambahProduk: {
    height: 30,
    width: 30
  },
  foto: {
    marginTop: 25,
    marginRight: 18
  },
  containerDiskon: {
    position: 'absolute',
    left: 85,
    bottom: 85
  },
  imageClose: {
    height: 25,
    width: 25
  },
  buttonnext: {
    height: 50,
    backgroundColor: Colors.bluesky,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 33
  },
  textButtonNext: {
    color: Colors.background,
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.regular
  }
})
