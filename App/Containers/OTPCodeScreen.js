import React from 'react'
import { Text, View, TextInput, TouchableOpacity, Modal, Image } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// styles
import styles from './Styles/OTPCodeScreenStyle'
import { Images } from '../Themes'

class OTPCodeScreen extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      fieldPass: this.props.fieldPass,
      typeVerifikasi: this.props.typeVerifikasi,
      code1: '',
      code2: '',
      code3: '',
      code4: '',
      code5: '',
      focusCode1: true,
      focusCode2: false,
      focusCode3: false,
      focusCode4: false,
      focusCode5: false,
      vefifikasiModal: false
    }
  }

  componentDidUpdate () {
    if (this.refs[this.state.nextField]) {
      this.refs[this.state.nextField].focus()
    }
  }

  verifikaksi () {
    this.setState({vefifikasiModal: true})
  }

  handleVerifikasi () {
    this.setState({vefifikasiModal: false})
    NavigationActions.infotoko({
      type: ActionConst.PUSH
    })
  }

  modalVerifikasiSukses () {
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.vefifikasiModal}
        onRequestClose={() => this.setState({ vefifikasiModal: false })}
        >
        <View style={styles.bgModal}>
          <View style={styles.contaierModal}>
            <Image source={Images.hpVerify} style={{height: 172, width: 172}} />
            <Text style={styles.titleModal}>Nomor Telepon Telah Terverifikasi</Text>
            <Text style={styles.descModal}>
              Nomor Telepon telah terverifikasi{'\n'}kini Anda bisa melanjutkan proses{'\n'}aktivasi toko Anda
            </Text>
            <TouchableOpacity style={styles.verifikasiButton} onPress={() => this.handleVerifikasi()}>
              <Text style={styles.textVerifikasiButton}>Lanjutkan Proses Aktivasi Toko</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }

  renderOTP () {
    const {typeVerifikasi, fieldPass} = this.state
    if (typeVerifikasi === 'verifikasitelepon') {
      return (
        <View>
          <Text style={styles.title}>Silahkan menuliskan kode verifikasi yang telah{'\n'}kami kirim ke {fieldPass}</Text>
          <View style={styles.containerCodeStyle}>
            <View>
              <TextInput
                autoFocus
                keyboardType='numeric'
                maxLength={1}
                returnKeyType='next'
                underlineColorAndroid='transparent'
                value={this.state.code1}
                style={styles.codeStyle}
                blurOnSubmit={false}
                onChange={(event) =>
                  this.setState({
                    code1: event.nativeEvent.text,
                    nextField: 2
                  })
                }
              />
            </View>
            <View>
              <TextInput
                ref='2'
                underlineColorAndroid='transparent'
                keyboardType='numeric'
                maxLength={1}
                returnKeyType='next'
                value={this.state.code2}
                style={styles.codeStyle}
                blurOnSubmit={false}
                onChange={(event) =>
                  this.setState({
                    code2: event.nativeEvent.text,
                    nextField: 3
                  })
                }
              />
            </View>
            <View>
              <TextInput
                ref='3'
                underlineColorAndroid='transparent'
                keyboardType='numeric'
                maxLength={1}
                returnKeyType='next'
                value={this.state.code3}
                style={styles.codeStyle}
                blurOnSubmit={false}
                onChange={(event) =>
                  this.setState({
                    code3: event.nativeEvent.text,
                    nextField: 4
                  })
                }
              />
            </View>
            <View>
              <TextInput
                ref='4'
                underlineColorAndroid='transparent'
                keyboardType='numeric'
                maxLength={1}
                returnKeyType='next'
                value={this.state.code4}
                style={styles.codeStyle}
                blurOnSubmit={false}
                onChange={(event) =>
                  this.setState({
                    code4: event.nativeEvent.text,
                    nextField: 5
                  })
                }
              />
            </View>
            <View>
              <TextInput
                ref='5'
                underlineColorAndroid='transparent'
                keyboardType='numeric'
                maxLength={1}
                returnKeyType='next'
                value={this.state.code5}
                style={styles.codeStyle}
                blurOnSubmit={false}
                onChange={(event) =>
                  this.setState({
                    code5: event.nativeEvent.text
                  })
                }
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => this.verifikaksi()}
            style={styles.buttonLogin}
          >
            <Text style={styles.textButtonLogin}>
              Verifikasikan Verifikasi Nomor Telepon
            </Text>
          </TouchableOpacity>
          <View style={styles.containerBanner}>
            <Text style={styles.textBanner}>
              Belum menerima kode aktifasi
            </Text>
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.textLogin}> Klik Disini</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    } else if (typeVerifikasi === 'verifikasitoko') {
      return (
        <View>
          <View style={styles.notif}>
            <Text style={styles.titleNotif}>Kode Verifikasi sedang dalam proses pengantaran{'\n'}ke alamat toko Anda.</Text>
          </View>
          <Text style={styles.title}>Silahkan menuliskan kode yang telah{'\n'}kami kirimkan ke alamat Toko Anda</Text>
          <View style={styles.containerCodeStyle}>
            <View>
              <TextInput
                autoFocus
                keyboardType='numeric'
                maxLength={1}
                returnKeyType='next'
                underlineColorAndroid='transparent'
                value={this.state.code1}
                style={styles.codeStyle}
                blurOnSubmit={false}
                onChange={(event) =>
                  this.setState({
                    code1: event.nativeEvent.text,
                    nextField: 2
                  })
                }
              />
            </View>
            <View>
              <TextInput
                ref='2'
                underlineColorAndroid='transparent'
                keyboardType='numeric'
                maxLength={1}
                returnKeyType='next'
                value={this.state.code2}
                style={styles.codeStyle}
                blurOnSubmit={false}
                onChange={(event) =>
                  this.setState({
                    code2: event.nativeEvent.text,
                    nextField: 3
                  })
                }
              />
            </View>
            <View>
              <TextInput
                ref='3'
                underlineColorAndroid='transparent'
                keyboardType='numeric'
                maxLength={1}
                returnKeyType='next'
                value={this.state.code3}
                style={styles.codeStyle}
                blurOnSubmit={false}
                onChange={(event) =>
                  this.setState({
                    code3: event.nativeEvent.text,
                    nextField: 4
                  })
                }
              />
            </View>
            <View>
              <TextInput
                ref='4'
                underlineColorAndroid='transparent'
                keyboardType='numeric'
                maxLength={1}
                returnKeyType='next'
                value={this.state.code4}
                style={styles.codeStyle}
                blurOnSubmit={false}
                onChange={(event) =>
                  this.setState({
                    code4: event.nativeEvent.text,
                    nextField: 5
                  })
                }
              />
            </View>
            <View>
              <TextInput
                ref='5'
                underlineColorAndroid='transparent'
                keyboardType='numeric'
                maxLength={1}
                returnKeyType='next'
                value={this.state.code5}
                style={styles.codeStyle}
                blurOnSubmit={false}
                onChange={(event) =>
                  this.setState({
                    code5: event.nativeEvent.text
                  })
                }
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => this.verifikaksi()}
            style={styles.buttonLogin}
          >
            <Text style={styles.textButtonLogin}>
              Konfirmasi Kode Verifikasi
            </Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  render () {
    return (
      <View style={styles.container}>
        {this.renderOTP()}
        {this.modalVerifikasiSukses()}
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OTPCodeScreen)
