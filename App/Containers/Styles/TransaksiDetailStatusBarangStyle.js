import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  barangContainer: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver
  },
  image: {
    width: 45,
    height: 45
  },
  barang: {
    marginLeft: 20,
    flexDirection: 'column'
  },
  textTitle: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.smallMed,
    letterSpacing: 0.22,
    color: Colors.darkgrey
  },
  namaToko: {
    opacity: 0.5,
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.small,
    letterSpacing: 0.2,
    color: Colors.lightblack
  },
  teks: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.smallMed,
    letterSpacing: 0.22,
    marginTop: -1,
    color: Colors.brownishGrey
  },
  warna: {
    marginRight: 10,
    width: 10,
    height: 10,
    borderRadius: 5
  },
  reminder: {
    padding: 20,
    marginBottom: -20,
    marginRight: 20
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 20
  },
  button: {
    flex: 1,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.bluesky,
    backgroundColor: Colors.snow,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50
  },
  textButton: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.medium,
    letterSpacing: 0.23,
    color: Colors.bluesky
  },
  secondButton: {
    flex: 1,
    marginTop: -25,
    borderRadius: 5,
    backgroundColor: Colors.bluesky,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50
  },
  textSecondButton: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.medium,
    letterSpacing: 0.23,
    color: Colors.snow
  },
  teksResi: {
    fontFamily: Fonts.type.regular,
    fontSize: 15,
    letterSpacing: 1,
    color: Colors.red
  },
  separator: {
    height: 20,
    backgroundColor: Colors.paleGrey
  },
  noteContainer: {
    backgroundColor: Colors.blueBackground,
    padding: 20,
    borderBottomColor: Colors.silver,
    borderBottomWidth: 0.5,
    flexDirection: 'row'
  },
  roundContainer: {
    height: 28,
    width: 28,
    marginRight: 20,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.blueText
  },
  note: {
    marginTop: -5,
    marginRight: 40,
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.smallMed,
    letterSpacing: 0.22,
    color: Colors.blueText
  }
})
