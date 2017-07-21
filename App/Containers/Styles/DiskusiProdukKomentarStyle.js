import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.paleGrey
  },
  border: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver,
    marginBottom: 10
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 2,
    backgroundColor: Colors.background
  },
  styleFotoToko: {
    width: 40,
    height: 40
  },
  namaContainer: {
    flexDirection: 'column',
    flex: 1,
    marginLeft: 16
  },
  textNama: {
    fontFamily: Fonts.type.semiBolds,
    fontSize: Fonts.size.smallMed,
    color: Colors.darkgrey,
    letterSpacing: 0.22,
    marginBottom: 3
  },
  textKelola: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.small,
    color: Colors.lightgrey,
    opacity: 0.50,
    letterSpacing: 0.2
  },
  scrollView: {
    flex: 1
  },
  diskusiContainer: {
    flexDirection: 'column',
    backgroundColor: Colors.snow,
    padding: 20,
    marginBottom: 10
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  infoUser: {
    flexDirection: 'column',
    marginLeft: 15
  },
  foto: {
    height: 30,
    width: 30,
    borderRadius: 15
  },
  questionContainer: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.medium,
    color: Colors.brownishGrey,
    letterSpacing: 0.2,
    marginTop: 5,
    marginBottom: 15
  },
  komentarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.silver
  },
  infoContainerRow: {
    flexDirection: 'row',
    marginLeft: 15,
    alignItems: 'center',
    paddingTop: 10
  },
  logoDiskusi: {
    height: 24,
    width: 24,
    marginTop: 2,
    marginRight: 4,
    marginLeft: -5
  },
  textKomentarContainer: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.medium,
    color: Colors.brownishGrey,
    letterSpacing: 0.2
  },
  floatImageContainer: {
    height: 56,
    flexDirection: 'row',
    backgroundColor: Colors.snow,
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderTopColor: Colors.silver,
    borderTopWidth: 1,
    width: Metrics.screenWidth,
    alignItems: 'center'
  },
  textInput: {
    flex: 1,
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    color: Colors.darkgrey,
    letterSpacing: 0.22,
    paddingLeft: 10,
    paddingRight: 10
  }
})
