import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40
  },
  image: {
    height: 250,
    width: 250,
    marginBottom: 15
  },
  textTitle: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.medium,
    letterSpacing: 0.23,
    color: Colors.darkgrey,
    marginBottom: 10
  },
  textIsi: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    lineHeight: 22,
    letterSpacing: 0.4,
    textAlign: 'center',
    color: Colors.brownishGrey
  },
  button: {
    height: 56,
    backgroundColor: Colors.bluesky,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    flex: 1
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 25
  },
  textButton: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.medium,
    letterSpacing: 0.23,
    color: Colors.snow
  }
})
