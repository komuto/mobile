import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.paleGrey
  },
  border: {
    marginLeft: 19.5
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingRight: 13,
    paddingTop: 20,
    paddingBottom: 19,
    borderBottomColor: Colors.whiteTwo,
    borderBottomWidth: 0.5,
    backgroundColor: Colors.background
  },
  styleFotoToko: {
    width: 30,
    height: 30,
    borderRadius: 3
  },
  namaContainer: {
    flexDirection: 'column',
    flex: 1,
    marginLeft: 20
  },
  textNama: {
    fontFamily: Fonts.type.semiBolds,
    fontSize: Fonts.size.smallMed,
    color: Colors.darkgrey
  },
  textKelola: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.small,
    color: Colors.lightgrey,
    opacity: 0.50,
    paddingTop: 3
  },
  styleFoto: {
    width: 24,
    height: 24
  },
  messages: {
    paddingBottom: 20,
    paddingTop: 10,
    paddingRight: 30,
    borderBottomColor: Colors.whiteTwo,
    borderBottomWidth: 0.5
  },
  textMessage: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    color: Colors.brownishGrey,
    lineHeight: 23
  },
  status: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 20,
    paddingTop: 20
  },
  renderRow: {
    marginBottom: 20,
    elevation: 0.1,
    backgroundColor: Colors.snow
  },
  iconStatus: {
    width: 15,
    height: 15,
    marginRight: 15,
    borderRadius: 200,
    backgroundColor: Colors.red
  }
})
