import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.snow
  },
  headerContainer: {
    height: Metrics.navBarHeight,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver
  },
  imageStyle: {
    height: 24,
    width: 24
  },
  textInputContainer: {
    flex: 1
  },
  inputText: {
    flex: 1,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.regular,
    marginLeft: 10,
    color: Colors.darkgrey
  },
  listViewContainer: {
    flex: 1
  },
  buttonStyle: {
    flex: 1,
    padding: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver
  },
  textResult: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.medium,
    color: Colors.darkgrey
  },
  notFoundContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 40,
    paddingRight: 40,
    flexDirection: 'column'
  },
  image: {
    marginTop: -20,
    width: 173,
    height: 164
  },
  textTitle: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.medium,
    lineHeight: 22,
    letterSpacing: 0.19,
    textAlign: 'center',
    color: Colors.darkgrey,
    marginTop: 20
  },
  textLabel: {
    fontFamily: Fonts.type.regular,
    fontSize: 13,
    lineHeight: 22,
    letterSpacing: 0.22,
    textAlign: 'center',
    color: Colors.labelgrey,
    marginTop: 5
  },
  buttonChange: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    flex: 1,
    backgroundColor: Colors.bluesky,
    marginTop: 25,
    borderRadius: 5
  },
  textButton: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.medium,
    lineHeight: 22,
    letterSpacing: 0.19,
    textAlign: 'center',
    color: Colors.snow
  }
})
