import React from 'react'
import { View, Modal, Text, TouchableOpacity, Image } from 'react-native'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import styles from './Styles/ModalLoginStyle'
import { Images } from '../Themes'

export default class ModalLogin extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      visible: this.props.visible
    }
  }

  login () {
    NavigationActions.login({ type: ActionConst.PUSH })
    this.setState({
      visible: false
    })
  }

  register () {
    NavigationActions.register({ type: ActionConst.PUSH })
    this.setState({
      visible: false
    })
  }

  render () {
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.visible}
        onRequestClose={() => this.props.onClose()}
        >
        <View style={styles.modalContainer}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={[styles.textTitle, { flex: 1 }]}>
                Masuk
              </Text>
              <TouchableOpacity onPress={() => this.props.onClose()}>
                <Image source={Images.close} style={styles.imageClose} />
              </TouchableOpacity>
            </View>
            <View style={styles.body}>
              <Image source={Images.phone} style={styles.imagePhone} />
              <Text style={styles.textInfo}>
                Anda harus login terlebih dahulu
              </Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonLogin} onPress={() => this.login()}>
                  <Text style={styles.textWhite}>
                    Login
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonRegister} onPress={() => this.register()}>
                  <Text style={styles.textBlue}>
                    Register
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}

// // Prop type warnings
// ModalLogin.propTypes = {
//   someProperty: React.PropTypes.object,
//   someSetting: React.PropTypes.bool.isRequired
// }
//
// // Defaults for props
// ModalLogin.defaultProps = {
//   someSetting: false
// }
