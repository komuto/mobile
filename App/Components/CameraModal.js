import React from 'react'
import { View, Text, Modal, Image, TouchableOpacity } from 'react-native'
import styles from './Styles/CameraModalStyle'
import Camera from 'react-native-camera'

export default class CameraModal extends React.Component {

  state = {
    type: Camera.constants.Type.back
  }

  capture () {
    const options = {}
    // this.camera.capture({
    //   jpegQuality: config.camera.quality
    // })
    this.camera.capture({metadata: options})
    .then(({ path }) => {
      this.props.onPhotoCaptured(path)
    }).catch(err => console.log('error capturing: ', err))
  }

  renderCamOrPic () {
    if (this.props.showPreview) {
      const { photo, type, onRetakePhoto, onSavePhoto } = this.props
      return (
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, backgroundColor: '#000000' }}>
            <Image
              source={{ uri: photo }}
              style={{ flex: 1, width: null, height: null }}
            />
          </View>
          <View style={styles.footerWithPic}>
            <Text style={styles.instructionTextStyle}>
              Pastikan hasil foto {type} ini terbaca.
            </Text>
            <View style={styles.footerButtonAreaStyle}>
              <View style={{ flex: 1 }}>
                <Text onPress={onRetakePhoto}>AMBIL ULANG</Text>
              </View>
              <View style={{ width: 8 }} />
              <View style={{ flex: 1 }}>
                <Text onPress={onSavePhoto}>SIMPAN</Text>
              </View>
            </View>
          </View>
        </View>
      )
    }

    const { CaptureTarget, CaptureQuality, Aspect } = Camera.constants
    return (
      <View style={{ flex: 1 }}>
        <Camera
          ref={(cam) => {
            this.camera = cam
          }}
          style={styles.preview}
          captureTarget={CaptureTarget.disk}
          captureQuality={CaptureQuality.medium}
          aspect={Aspect.fill}
        />
        <View style={styles.footer} >
          <TouchableOpacity style={styles.capture} onPress={this.capture.bind(this)}>
            <View style={styles.captureInside} />
          </TouchableOpacity>
        </View>
      </View>
    )
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
        <View style={{flex: 1, alignItems: 'stretch'}}>
          {this.renderCamOrPic()}
        </View>
      </Modal>
    )
  }
}
