import React from 'react'
import { ActivityIndicator } from 'react-native'
import { Colors } from '../Themes'

export default class Spinner extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      color: this.props.color
    }
  }

  render () {
    let warna
    if (this.state.color === null || this.state.color === undefined) {
      warna = Colors.snow
    } else {
      warna = this.state.color
    }
    return (
      <ActivityIndicator color={warna} size='large' />
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
