import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.paleGrey
  },
  barangContainer: {
    flexDirection: 'column',
    backgroundColor: Colors.snow
  },
  dataContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.snow,
    padding: 20,
    borderBottomColor: Colors.silver,
    borderBottomWidth: 0.5,
    alignItems: 'center'
  },
  image: {
    width: 45,
    height: 45
  },
  barang: {
    marginLeft: 20,
    flexDirection: 'column'
  },
  textTitle: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    lineHeight: 23,
    letterSpacing: 0.23,
    color: Colors.darkgrey
  },
  namaToko: {
    opacity: 0.5,
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.small,
    letterSpacing: 0.2,
    color: Colors.lightblack
  },
  voteContainer: {
    flexDirection: 'column',
    padding: 40,
    alignItems: 'center'
  },
  vote: {
    flexDirection: 'row',
    marginTop: 40,
    justifyContent: 'center'
  },
  voteNoDefault: {
    height: 114,
    width: 114,
    borderRadius: 57,
    elevation: 4,
    backgroundColor: Colors.snow,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  voteNo: {
    height: 114,
    width: 114,
    borderRadius: 57,
    elevation: 4,
    backgroundColor: Colors.red,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  separatorVote: {
    width: 30
  },
  voteYesDefault: {
    height: 114,
    width: 114,
    borderRadius: 57,
    elevation: 4,
    backgroundColor: Colors.snow,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  voteYes: {
    height: 114,
    width: 114,
    borderRadius: 57,
    elevation: 4,
    backgroundColor: Colors.darkMint,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textRed: {
    fontFamily: Fonts.type.bold,
    fontSize: 15,
    lineHeight: 23,
    letterSpacing: 0.23,
    color: Colors.red
  },
  textWhite: {
    fontFamily: Fonts.type.bold,
    fontSize: 15,
    lineHeight: 23,
    letterSpacing: 0.23,
    color: Colors.snow
  },
  textGreen: {
    fontFamily: Fonts.type.bold,
    fontSize: 15,
    lineHeight: 23,
    letterSpacing: 0.23,
    color: Colors.darkMint
  },
  imageVote: {
    height: 40,
    width: 40,
    marginBottom: 5
  },
  contentContainer: {
    flexDirection: 'column'
  },
  triangleContainer: {
    flexDirection: 'row',
    paddingLeft: 30,
    paddingRight: 30
  },
  triangleOuter: {
    flex: 1,
    alignItems: 'center'
  },
  triangle: {
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderLeftWidth: 20,
    borderTopWidth: 0,
    borderRightWidth: 20,
    borderBottomWidth: 20,
    borderLeftColor: 'transparent',
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: Colors.snow
  },
  content: {
    backgroundColor: Colors.snow,
    padding: 20
  },
  rateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: Colors.silver,
    borderBottomWidth: 0.5,
    paddingBottom: 10,
    marginTop: 20,
    marginBottom: 30
  },
  textReview: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    lineHeight: 23,
    letterSpacing: 0.23
  },
  questionContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver,
    flexDirection: 'column'
  },
  textInput: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    color: Colors.darkgrey,
    letterSpacing: 0.22,
    marginLeft: -3
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingTop: 30,
    paddingBottom: 50
  },
  button: {
    flex: 1,
    borderRadius: 5,
    backgroundColor: Colors.bluesky,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  box: {
    width: 25,
    height: 25,
    marginRight: 10,
    borderRadius: 5,
    backgroundColor: Colors.snow,
    borderWidth: 1,
    borderColor: Colors.silver,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageCheck: {
    width: 24,
    height: 24
  },
  imageContainer: {
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center'
  },
  photo: {
    height: 100,
    width: 100
  },
  buttonDeletePictureContainer: {
    position: 'absolute',
    top: 0,
    right: 0
  },
  scrollView: {
    flexDirection: 'row',
    height: 120,
    marginTop: 30,
    marginBottom: 30
  },
  addPhoto: {
    marginTop: 10,
    marginLeft: 10,
    height: 100,
    width: 100,
    borderRadius: 5,
    backgroundColor: Colors.paleGreyFour,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageplus: {
    height: 30,
    width: 30
  },
  warna: {
    marginRight: 10,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.bluesky,
    marginTop: 8
  },
  titleContainer: {
    padding: 20,
    backgroundColor: Colors.snow,
    borderBottomColor: Colors.silver,
    borderBottomWidth: 0.5
  }
})
