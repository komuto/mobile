import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Styles from './Styles/ForgotPasswordStyle'

export default class ForgotPassword extends React.Component {

  render () {
    return (
      <View style={Styles.container}>
        <TouchableOpacity>
          <Text style={Styles.text}>{this.props.text}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

// // Prop type warnings
// ForgotPassword.propTypes = {
//   someProperty: React.PropTypes.object,
//   someSetting: React.PropTypes.bool.isRequired
// }
//
// // Defaults for props
// ForgotPassword.defaultProps = {
//   someSetting: false
// }
