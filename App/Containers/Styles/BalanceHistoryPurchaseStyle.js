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
    width: Metrics.screenWidth,
    paddingLeft: 20,
    paddingRight: 20,
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver
  },
  label: {
    fontFamily: Fonts.type.regular,
    fontSize: 13,
    letterSpacing: 0.22,
    color: Colors.darkgrey
  },
  data: {
    fontFamily: Fonts.type.regular,
    fontSize: 13,
    letterSpacing: 0.22,
    color: Colors.brownishGrey
  },
  dataMoney: {
    fontFamily: Fonts.type.regular,
    fontSize: 13,
    letterSpacing: 0.22,
    color: Colors.red
  },
  blueText: {
    fontFamily: Fonts.type.regular,
    fontSize: 13,
    letterSpacing: 0.22,
    color: Colors.bluesky
  },
  arrow: {
    height: 24,
    width: 24
  },
  title: {
    fontFamily: Fonts.type.bold,
    marginLeft: 20,
    marginBottom: 10,
    fontSize: 13,
    letterSpacing: 0.22,
    color: Colors.darkgrey
  },
  image: {
    height: 26,
    width: 26,
    borderRadius: 13,
    marginRight: 10
  },
  namaBarangContainer: {
    flexDirection: 'row',
    marginTop: -3,
    flex: 1
  },
  imageBarang: {
    height: 45,
    width: 45,
    resizeMode: 'cover',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },
  containerStatusItem: {
    flexDirection: 'column',
    backgroundColor: Colors.snow,
    marginBottom: 10
  },
  containerBarang: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingTop: 10,
    backgroundColor: Colors.snow,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver,
    flexDirection: 'column'
  },
  textTitle: {
    fontSize: Fonts.size.smallMed,
    fontFamily: Fonts.type.regular,
    lineHeight: 21,
    letterSpacing: 0.22,
    color: Colors.darkgrey
  },
  items: {
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
  morePictures: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 5,
    height: 45,
    width: 45,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textTitleWhite: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    lineHeight: 21,
    letterSpacing: 0.2,
    color: Colors.snow
  }
})
