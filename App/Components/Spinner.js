import React from 'react'
import { ActivityIndicator } from 'react-native'
import { Colors } from '../Themes'

export default class Spinner extends React.Component {

  render () {
    return (
      <ActivityIndicator color={Colors.snow} size='large' />
    )
  }
}

// // Prop type warnings
// Spinner.propTypes = {
//   someProperty: React.PropTypes.object,
//   someSetting: React.PropTypes.bool.isRequired
// }
//
// // Defaults for props
// Spinner.defaultProps = {
//   someSetting: false
// }
