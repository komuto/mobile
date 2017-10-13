import React from 'react'
import { View, Text, Modal, TouchableOpacity, ToastAndroid } from 'react-native'
import styles from './Styles/CameraModalStyle'
import ImagePicker from 'react-native-image-crop-picker'

export default class CameraModal extends React.Component {
  pickSingleWithCamera () {
    ImagePicker.openCamera({
      cropping: true,
      width: 500,
      height: 500
    }).then(image => {
      this.props.onPhotoCaptured(image.path)
    }).catch(e => ToastAndroid.show('Terjadi Kesalahan..' + e, ToastAndroid.SHORT))
  }

  pickSingleBase64 () {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true
    }).then(image => {
      this.props.onPhotoCaptured(image.path)
    }).catch(e => ToastAndroid.show('Terjadi Kesalahan..' + e, ToastAndroid.SHORT))
  }

  render () {
    const { onClose, onPress, visible } = this.props
    return (
      <Modal
        animationType={'fade'}
        transparent
        visible={visible}
        onRequestClose={onClose}
      >
        <TouchableOpacity onPress={onPress} style={styles.bgMdalContainer}>
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
        </TouchableOpacity>
      </Modal>
    )
  }
}
