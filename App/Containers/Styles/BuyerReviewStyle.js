import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.paleGrey
  },
  spinner: {
    position: 'absolute',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    opacity: 0.5
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
    justifyContent: 'flex-start',
    paddingLeft: 20,
    paddingRight: 13,
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 2,
    backgroundColor: Colors.background
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
  styleFotoToko: {
    width: 45,
    height: 45,
    borderRadius: 3
  },
  styleFoto: {
    width: 24,
    height: 24
  },
  qualityNoBorderContainer: {
    backgroundColor: Colors.snow,
    flexDirection: 'row',
    paddingLeft: 20,
    paddingBottom: 22.3,
    paddingTop: 17.5
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
    paddingLeft: 21,
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
  },
  containerEmpty: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 54
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
