import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Metrics.titlePadding
  },
  text: {
    textAlign: 'center',
    fontSize: 13,
    fontFamily: Fonts.type.bold,
    color: Colors.bluesky
  }
})
