import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.background
  },
  ulasanContainer: {
    flex: 1
  },
  border: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver
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
  namaContainer: {
    flexDirection: 'column',
    flex: 1,
    marginLeft: 16
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
    opacity: 0.50
  },
  styleFotoToko: {
    width: 40,
    height: 40
  },
  styleFoto: {
    width: 40,
    height: 40,
    borderRadius: 21
  },
  qualityNoBorderContainer: {
    backgroundColor: Colors.background,
    flexDirection: 'row',
    paddingLeft: 20,
    paddingBottom: 22.3
  },
  listView: {
    flex: 1
  },
  qualityText: {
    fontSize: Fonts.size.smallMed,
    fontFamily: Fonts.type.bold,
    color: Colors.darkgrey,
    marginBottom: 8,
    paddingRight: 56.8
  },
  isiUlasan: {
    fontFamily: Fonts.type.regular,
    color: Colors.brownishGrey,
    fontSize: Fonts.size.smallMed,
    paddingBottom: 21.2,
    paddingLeft: 20,
    paddingRight: 10
  },
  separator: {
    width: 1,
    marginRight: 24.4,
    borderRightWidth: 0.5,
    borderRightColor: Colors.silver
  },
  loadingStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8
  }
})
