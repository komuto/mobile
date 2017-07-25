import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.paleGrey,
    padding: 15
  },
  totalContainer: {
    backgroundColor: Colors.snow,
    elevation: 1,
    margin: 5,
    borderRadius: 3,
    flexDirection: 'column'
  },
  total: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver,
    paddingLeft: 20,
    paddingTop: 15,
    paddingRight: 15,
    paddingBottom: 15,
    alignItems: 'center'
  },
  textLabel: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.medium,
    letterSpacing: 0.22,
    color: Colors.darkgrey
  },
  biaya: {
    flex: 1
  },
  textTotal: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.h5,
    letterSpacing: 0.33,
    color: Colors.darkgrey
  },
  buttonDetail: {
    width: 81,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.bluesky,
    backgroundColor: Colors.snow,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textBiru: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    letterSpacing: 0.22,
    color: Colors.bluesky
  },
  noteContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 12,
    paddingBottom: 12,
    alignItems: 'center'
  },
  textNote: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    lineHeight: 20,
    letterSpacing: 0.23,
    color: Colors.labelgrey
  },
  textPilihMetode: {
    marginTop: 40,
    marginBottom: 15,
    marginLeft: 5,
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.medium,
    letterSpacing: 0.23,
    color: Colors.darkgrey
  },
  textContainer: {
    flex: 1
  },
  imagePicker: {
    height: 24,
    width: 24,
    marginTop: 3
  },
  totalContainerBank: {
    backgroundColor: Colors.snow,
    elevation: 1,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    paddingLeft: 20,
    borderRadius: 3,
    flexDirection: 'column'
  },
  totalBank: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver,
    paddingTop: 15,
    paddingRight: 15,
    paddingBottom: 15,
    alignItems: 'center'
  }
})
