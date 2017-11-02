import {StyleSheet} from 'react-native'
import {Colors, Metrics, Fonts} from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.paleGrey
  },
  textTab: {
    fontSize: Fonts.size.smallMed,
    fontFamily: Fonts.type.semiBolds,
    letterSpacing: 0.22,
    marginTop: 5
  },
  header: {
    backgroundColor: Colors.paleGreyThree,
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 70,
    marginBottom: 10.3
  },
  regularSlate: {
    fontSize: Fonts.size.smallMed,
    fontFamily: Fonts.type.regular,
    color: Colors.lightblack,
    lineHeight: 22
  },
  spinner: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Metrics.screenWidth,
    height: Metrics.screenHeight - Metrics.navBarHeight - 100
  },
  containerList: {
    backgroundColor: Colors.snow,
    marginBottom: 10.3
  },
  flexRowBorder: {
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.silver,
    paddingTop: 10,
    paddingBottom: 10.5
  },
  textSemiBoldGrey: {
    fontFamily: Fonts.type.semiBolds,
    fontSize: Fonts.size.smallMed,
    color: Colors.charcoalGrey,
    paddingLeft: 15,
    flex: 1
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 22.5,
    width: 22.5,
    borderRadius: 200,
    backgroundColor: Colors.red,
    marginRight: 18.8
  },
  textIcon: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.small,
    color: Colors.snow
  },
  imageArrow: {
    height: 24,
    width: 24
  },
  flexRowNoBorder: {
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 18.8
  },
  containerOrder: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10.6,
    paddingRight: 15,
    paddingLeft: 15,
    paddingBottom: 15.2
  },
  maskedImage: {
    height: 45,
    width: 45,
    backgroundColor: Colors.paleGreyTwo,
    borderRadius: 3,
    marginRight: 9.1
  },
  image: {
    height: 45,
    width: 45,
    borderRadius: 3,
    marginRight: 9.1
  },
  placeholder: {
    position: 'absolute',
    left: 1,
    backgroundColor: 'rgba(0,0,0,0.2)'
  },
  textPlaceHolder: {
    padding: 5,
    color: Colors.snow,
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.medium
  },
  loadingStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8
  },
  containerEmpty: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 63
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
