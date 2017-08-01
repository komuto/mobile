import React from 'react'
import { View, Text, Modal, TouchableOpacity } from 'react-native'
import styles from './Styles/CameraModalStyle'
import ImagePicker from 'react-native-image-crop-picker'

export default class CameraModal extends React.Component {
  pickSingleWithCamera () {
    ImagePicker.openCamera({
      cropping: true,
      width: 500,
      height: 500
    }).then(image => {
      console.log('received image', image.path)
      this.props.onPhotoCaptured(image.path)
    }).catch(e => window.alert(e))
  }

  pickSingleBase64 () {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true
    }).then(image => {
      console.log('received base64 image', image.path)
      this.props.onPhotoCaptured(image.path)
    }).catch(e => window.alert(e))
  }

  render () {
    const { onClose, visible } = this.props
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={visible}
        onRequestClose={onClose}
      >
        <View style={styles.bgMdalContainer}>
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={() => this.pickSingleBase64()}>
              <View style={styles.menuModal}>
                <Text style={styles.icon}>+</Text><Text style={styles.textMenu}>Pilih dari Koleksi Foto...</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.pickSingleWithCamera()}>
              <View style={styles.menuModal}>
                <Text style={styles.icon}>+</Text><Text style={styles.textMenu}>Ambil Foto...</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }
}
