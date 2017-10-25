import React from 'react'
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid
} from 'react-native'
import {connect} from 'react-redux'
import {Actions as NavigationActions} from 'react-native-router-flux'
import {isFetching, isError, isFound} from '../Services/Status'

import * as storeAction from '../actions/stores'

import styles from './Styles/StoreInputCodeVerificationStyle'

class StoreInputCodeVerification extends React.Component {

  constructor (props) {
    super(props)
    this.submitting = {
      verify: false
    }
    this.state = {
      code1: '',
      code2: '',
      code3: '',
      code4: '',
      code5: '',
      code6: '',
      focusCode1: true,
      focusCode2: false,
      focusCode3: false,
      focusCode4: false,
      focusCode5: false,
      focusCode6: false,
      codeOtp: [],
      loading: false,
      callback: this.props.callback
    }
  }

  componentWillReceiveProps (nextProps) {
    const {verifyStore} = nextProps

    if (!isFetching(verifyStore) && this.submitting.verify) {
      this.submitting = { ...this.submitting, verify: false }
      if (isError(verifyStore)) {
        ToastAndroid.show(verifyStore.message, ToastAndroid.SHORT)
      }
      if (isFound(verifyStore)) {
        this.setState({ loading: false })
        NavigationActions.pop(
          {refresh: { callback: !this.state.callback, title: 'Toko Anda', isStoreVerify: true }})
        return true
      }
    }
  }

  componentDidUpdate () {
    if (this.refs[this.state.nextField]) {
      this.refs[this.state.nextField].focus()
    }
  }

  renderOTP () {
    return (
      <View>
        <View style={styles.information}>
          <Text style={styles.textInfo}>Kode Verifikasi sedang dalam proses pengantaran ke alamat toko anda</Text>
        </View>
        <Text style={styles.title}>Silahkan menuliskan kode verifikasi yang telah{'\n'}kami kirim ke alamat Toko Anda</Text>
        <View style={styles.containerCodeStyle}>
          <View>
            <TextInput
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
                  code5: event.nativeEvent.text,
                  nextField: 6
                })
              }
            />
          </View>
          <View>
            <TextInput
              ref='6'
              underlineColorAndroid='transparent'
              keyboardType='numeric'
              maxLength={1}
              returnKeyType='done'
              value={this.state.code6}
              style={styles.codeStyle}
              blurOnSubmit={false}
              onChange={(event) =>
                this.setState({
                  code6: event.nativeEvent.text
                })
              }
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => this.onVerify()}
          style={styles.buttonLogin}
        >
          <Text style={styles.textButtonLogin}>
            Konfirmasi Kode Verifikasi
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  onVerify () {
    this.setState({loading: true})
    this.submitting.verify = true
    let tempOTp = this.state.code1 + this.state.code2 + this.state.code3 + this.state.code4 + this.state.code5 + this.state.code5
    this.props.verifyStores({code: tempOTp})
  }

  render () {
    const spinner = this.state.loading
    ? (<View style={styles.spinner}>
      <ActivityIndicator color='white' size='large' />
    </View>) : (<View />)
    return (
      <View style={styles.container}>
        {this.renderOTP()}
        {spinner}
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  verifyStore: state.verifyStore
})

const mapDispatchToProps = (dispatch) => ({
  verifyStores: (params) => dispatch(storeAction.verifyStore(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(StoreInputCodeVerification)
