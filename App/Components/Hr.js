import React from 'react'
import { View, Text } from 'react-native'
import Styles from './Styles/HrStyle'

export default class Hr extends React.Component {

  render () {
    return (
      <View style={Styles.container}>
        <View style={Styles.line} />
        <Text style={Styles.text}>{this.props.text}</Text>
        <View style={Styles.line} />
      </View>
    )
  }
}

// // Prop type warnings
// Hr.propTypes = {
//   someProperty: React.PropTypes.object,
//   someSetting: React.PropTypes.bool.isRequired
// }
//
// // Defaults for props
// Hr.defaultProps = {
//   someSetting: false
// }
