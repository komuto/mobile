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
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.snow
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
  searchContainer: {
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderBottomColor: Colors.silver,
    borderBottomWidth: 0.5,
    backgroundColor: Colors.snow
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
  containerKategori: {
    backgroundColor: Colors.paleGrey,
    height: 44,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20
  },
  textKategori: {
    fontFamily: Fonts.type.semiBolds,
    fontSize: Fonts.size.smallMed,
    color: Colors.darkgrey
  },
  image: {
    height: 24,
    width: 24
  }
})
