import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight - 10,
    backgroundColor: Colors.background,
    padding: 20
  },
  rowContainer: {
    marginTop: 20,
    flexDirection: 'column',
    paddingBottom: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver
  },
  textLabel: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    letterSpacing: 0.23,
    marginBottom: 8,
    color: Colors.labelgrey
  },
  textTitle: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    letterSpacing: 0.23,
    color: Colors.darkgrey
  },
  rowLabel: {
    flexDirection: 'row'
  },
  arrow: {
    marginTop: -2,
    width: 24,
    height: 24
  },
  picker: {
    flex: 1,
    marginLeft: -7,
    marginRight: -10,
    marginBottom: -10
  },
  buktiTransferContainer: {
    marginTop: 30
  },
  input: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    letterSpacing: 0.23,
    color: Colors.darkgrey,
    marginBottom: -15,
    marginTop: -12,
    marginLeft: -2
  },
  labelUpload: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.medium,
    letterSpacing: 0.23,
    color: Colors.darkgrey
  },
  images: {
    width: 100,
    height: 100,
    borderRadius: 5,
    resizeMode: 'cover'
  },
  imageX: {
    width: 24,
    height: 24
  },
  deleteImage: {
    position: 'absolute',
    right: 0,
    top: 0
  },
  defaultImage: {
    backgroundColor: Colors.paleGreyFour,
    height: 100,
    width: 100,
    borderRadius: 5,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imagePlus: {
    height: 30,
    width: 30
  },
  button: {
    flex: 1,
    backgroundColor: Colors.bluesky,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50
  },
  textButton: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.medium,
    letterSpacing: 0.23,
    color: Colors.snow
  }
})
