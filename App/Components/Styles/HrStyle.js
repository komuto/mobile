import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  line: {
    alignSelf: 'center',
    flex: 1,
    backgroundColor: Colors.grey,
    height: 1
  },
  text: {
    marginLeft: Metrics.baseMargin,
    marginRight: Metrics.baseMargin,
    textAlign: 'center',
    fontSize: 13,
    fontFamily: Fonts.type.base,
    color: Colors.double_grey
  }
})
