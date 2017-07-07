import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.paleGrey,
    flexDirection: 'column',
    marginTop: 10
  },
  sloganContainer: {
    padding: 20,
    backgroundColor: Colors.snow,
    flexDirection: 'column',
    marginBottom: 20
  },
  title: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.medium,
    letterSpacing: 0.22,
    color: Colors.darkgrey,
    marginBottom: 5
  },
  isi: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.medium,
    lineHeight: 23,
    letterSpacing: 0.22,
    color: Colors.lightgrey
  },
  menuContainer: {
    backgroundColor: Colors.snow,
    flexDirection: 'column',
    paddingLeft: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20
  },
  image: {
    height: 24,
    width: 24
  },
  textContainer: {
    flexDirection: 'row',
    flex: 1,
    marginLeft: 15
  },
  text: {
    fontFamily: Fonts.type.regular,
    flex: 1,
    fontSize: Fonts.type.medium,
    color: Colors.darkgrey
  },
  textData: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.type.medium,
    alignSelf: 'flex-end',
    color: Colors.lightgrey
  }
})
