import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.paleGrey
  },
  header: {
    backgroundColor: Colors.paleGreyThree,
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 70,
    marginBottom: 10.3
  },
  regularSlate: {
    fontSize: Fonts.size.smallMed,
    fontFamily: Fonts.type.regular,
    color: Colors.lightblack,
    lineHeight: 22
  },
  textTitle: {
    fontFamily: Fonts.type.regular,
    fontSize: 13,
    lineHeight: 20,
    letterSpacing: 0.22,
    color: Colors.darkgrey
  },
  rowContainer: {
    backgroundColor: Colors.snow,
    marginBottom: 10,
    flexDirection: 'column'
  },
  storeNameContainer: {
    borderBottomColor: Colors.silver,
    borderBottomWidth: 0.5,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  disputeNumber: {
    height: 22,
    width: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.red
  },
  dataSingle: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center'
  },
  imageContainer: {
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
  },
  arrow: {
    width: 24,
    height: 24
  },
  containerEmpty: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 63
  },
  textTitleEmpty: {
    paddingTop: 27.5,
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.medium,
    textAlign: 'center',
    color: Colors.darkgrey
  },
  textTitleEmpty2: {
    paddingTop: 5,
    lineHeight: 22,
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    textAlign: 'center',
    color: Colors.lightgrey
  }
})
