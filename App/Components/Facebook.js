import React from 'react'
import { Text, TouchableOpacity, Image } from 'react-native'
import Styles from './Styles/FacebookStyle'
import {Images} from '../Themes'

export default class Facebook extends React.Component {

  render () {
    return (
      <TouchableOpacity style={Styles.loginButtonThirdParty}>
        <Image source={Images.facebook} style={Styles.loginIconThirdParty} />
        <Text style={Styles.loginTextThirdParty}>Login dengan Facebook</Text>
      </TouchableOpacity>
    )
  }
}

// // Prop type warnings
// Facebook.propTypes = {
//   someProperty: React.PropTypes.object,
//   someSetting: React.PropTypes.bool.isRequired
// }
//
// // Defaults for props
// Facebook.defaultProps = {
//   someSetting: false
// }
