import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ulasanContainer: {
    backgroundColor: Colors.paleGrey,
    marginTop: 10
  },
  border: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver,
    marginTop: 10,
    padding: 20,
    backgroundColor: Colors.snow
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 2,
    backgroundColor: Colors.background,
    marginBottom: 20
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
    height: 40,
    borderRadius: 0
  },
  styleFoto: {
    width: 40,
    height: 40,
    borderRadius: 21
  },
  qualityNoBorderContainer: {
    backgroundColor: Colors.background,
    flexDirection: 'row'
  },
  eachQualiyRate: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 0.5,
    borderRightColor: Colors.silver,
    flex: 1
  },
  eachQualiy: {
    flexDirection: 'column',
    flex: 1
  },
  qualityContainer: {
    backgroundColor: Colors.background,
    flexDirection: 'row',
    paddingLeft: 20,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderTopColor: Colors.silver,
    borderBottomColor: Colors.silver
  },
  qualityTextRate: {
    fontSize: Fonts.size.h3,
    fontFamily: Fonts.type.bold,
    color: Colors.darkgrey,
    marginBottom: 8
  },
  qualityText: {
    fontSize: Fonts.size.smallMed,
    fontFamily: Fonts.type.bold,
    color: Colors.darkgrey,
    marginBottom: 8
  },
  isiUlasan: {
    fontFamily: Fonts.type.regular,
    color: Colors.darkgrey,
    fontSize: Fonts.size.smallMed,
    paddingRight: 10
  },
  separator: {
    width: 1,
    marginRight: 25,
    borderRightWidth: 0.5,
    borderRightColor: Colors.silver
  },
  flexRow: {
    flexDirection: 'row'
  },
  avgTitle: {
    marginBottom: 21,
    fontFamily: Fonts.type.semiBolds,
    color: Colors.darkgrey,
    paddingLeft: 8.8,
    fontSize: Fonts.size.regular
  },
  ratingContainer: {
    elevation: 2,
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    backgroundColor: Colors.snow
  },
  ulasanContainerIsi: {
    backgroundColor: Colors.snow,
    marginTop: 20
  },
  produkContainer: {
    borderTopColor: Colors.silver,
    borderTopWidth: 0.5,
    borderBottomColor: Colors.silver,
    borderBottomWidth: 0.5,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: Colors.snow,
    flexDirection: 'row',
    marginBottom: 20
  },
  namaProduk: {
    marginRight: 20
  },
  imageContainer: {
    marginRight: 20
  },
  imageProduk: {
    width: 45,
    height: 45
  },
  namaProdukContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  rightArrow: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconArrow: {
    height: 24,
    width: 24
  }
})
