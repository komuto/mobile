import React from 'react'
import {
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage,
  Alert
} from 'react-native'
import { connect } from 'react-redux'
// import FCM from 'react-native-fcm'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import Facebook from '../Components/Facebook'
import Hr from '../Components/Hr'
import * as registerAction from '../actions/user'
import * as EmailValidator from 'email-validator'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/RegisterStyle'

import CustomRadio from '../Components/CustomRadio'

class Register extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      name: '',
      phoneNumber: '',
      email: '',
      password: '',
      konfirmasiPassword: '',
      gender: 'male',
      index: 0,
      label: 'Pria',
      data: [{label: 'Pria', value: 0}, {label: 'Wanita', value: 1}],
      loading: false
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataRegister.status === 200) {
      console.log(nextProps.dataRegister)
      this.setState({
        loading: false
      })
      AsyncStorage.setItem('token', nextProps.dataRegister.user.token)
      this.props.getProfile()
      this.props.stateLogin(true)
      NavigationActions.backtab({
        type: ActionConst.RESET
      })
    } else if (nextProps.dataRegister.status > 200) {
      console.log('anu')
      this.setState({
        loading: false
      })
      Alert.alert('Error', nextProps.dataRegister.message)
    } else if (nextProps.dataRegister.status === 'ENOENT') {
      this.setState({
        loading: false
      })
      Alert.alert('Error', nextProps.dataRegister.message)
    }
  }

  handleChangename = (text) => {
    this.setState({ name: text })
  }

  handleChangeHape = (text) => {
    this.setState({ phoneNumber: text })
  }

  handleChangeEmail = (text) => {
    this.setState({ email: text })
  }

  handleChangePassword = (text) => {
    this.setState({ password: text })
  }

  handleChangeKonfirmasiPassword = (text) => {
    this.setState({ konfirmasiPassword: text })
  }

  handlingRadio (index, value) {
    if (value.toLowerCase() === 'pria') {
      this.setState({
        gender: 'male'
      })
    } else {
      this.setState({
        gender: 'female'
      })
    }
  }

  handlePressRegister = () => {
    // FCM.getFCMToken().then(tokenFCM => {
    //   if (tokenFCM !== null && tokenFCM !== undefined) {
    //     console.log('token', tokenFCM)
    //   }
    // })
    const {name, phoneNumber, email, password, konfirmasiPassword, gender} = this.state
    if (EmailValidator.validate(email)) {
      if (name === '') {
        this.onError('name')
      } else if (email === '') {
        this.onError('email')
      } else if (phoneNumber === '') {
        this.onError('phoneNumber')
      } else if (password === '') {
        this.onError('password')
      } else if (konfirmasiPassword === '') {
        this.onError('konfirmasiPassword')
      } else if (konfirmasiPassword !== password) {
        this.onError('passwordBeda')
      } else {
        this.setState({
          loading: true
        })
        this.props.registers(name, phoneNumber, email, gender, password)
      }
    } else {
      this.onError('emailNotValid')
    }
  }

  onError = (field) => {
    console.tron.log('field')
    console.tron.log(field)
    switch (field) {
      case 'emailNotValid':
        window.alert('Email tidak valid')
        break
      case 'email':
        window.alert('Email harus diisi')
        break
      case 'phoneNumber':
        window.alert('Nomer hp harus diisi')
        break
      case 'password':
        window.alert('Password harus diisi')
        break
      case 'name':
        window.alert('name harus diisi')
        break
      case 'konfirmasiPassword':
        window.alert('Konfirmasi Password harus diisi')
        break
      case 'passwordBeda':
        window.alert('Password tidak cocok')
        break
      case 'NETWORK_ERROR':
        window.alert('Gangguan Jaringan')
        break
      case 'CLIENT_ERROR':
        window.alert('Terjadi kesalahan')
        break
      case 'empty':
        window.alert('Field tidak boleh kosong')
        break
      default:
        window.alert('Internal Error')
        break
    }
  }

  login () {
    NavigationActions.login({
      type: ActionConst.PUSH
    })
  }

  render () {
    const spinner = this.state.loading
    ? (<View style={styles.spinner}>
      <ActivityIndicator color='white' size='large' />
    </View>) : (<View />)
    const { name, phoneNumber, email, password, konfirmasiPassword } = this.state
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainerStyle}>
          <View style={styles.containerBanner}>
            <Text style={styles.textBanner}>
              Sudah punya akun?
            </Text>
            <TouchableOpacity onPress={() => this.login()}>
              <Text style={styles.textLogin}> Login Disini</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <TextInput
                ref='name'
                style={styles.inputText}
                value={name}
                keyboardType='default'
                returnKeyType='next'
                onSubmitEditing={() => this.refs.phoneNumber.focus()}
                autoCapitalize='none'
                autoCorrect
                onChangeText={this.handleChangename}
                underlineColorAndroid='transparent'
                placeholder='Nama Lengkap'
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                ref='phoneNumber'
                style={styles.inputText}
                value={phoneNumber}
                keyboardType='numeric'
                returnKeyType='next'
                onSubmitEditing={() => this.refs.email.focus()}
                autoCapitalize='none'
                autoCorrect
                onChangeText={this.handleChangeHape}
                underlineColorAndroid='transparent'
                placeholder='Nomor Handphone'
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                ref='email'
                style={styles.inputText}
                value={email}
                keyboardType='default'
                returnKeyType='next'
                onSubmitEditing={() => this.refs.password.focus()}
                autoCapitalize='none'
                autoCorrect
                onChangeText={this.handleChangeEmail}
                underlineColorAndroid='transparent'
                placeholder='Email'
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                ref='password'
                style={styles.inputText}
                value={password}
                keyboardType='default'
                returnKeyType='next'
                onSubmitEditing={() => this.refs.konfirmasipassword.focus()}
                autoCapitalize='none'
                autoCorrect
                onChangeText={this.handleChangePassword}
                secureTextEntry
                underlineColorAndroid='transparent'
                placeholder='Password'
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                ref='konfirmasipassword'
                style={styles.inputText}
                value={konfirmasiPassword}
                keyboardType='default'
                secureTextEntry
                returnKeyType='next'
                autoCapitalize='none'
                autoCorrect
                onChangeText={this.handleChangeKonfirmasiPassword}
                underlineColorAndroid='transparent'
                placeholder='Konfirmasi Password'
              />
            </View>
            <View style={styles.radio}>
              <Text style={styles.radioLabel}>Gender</Text>
              <CustomRadio
                data={this.state.data}
                handlingRadio={(index1, value1) =>
                  this.handlingRadio(index1, value1)}
                horizontal
              />
            </View>
            <View style={styles.containerText}>
              <Text style={styles.textBanner}>Dengan mendaftar Anda telah menyetujui</Text>
              <View style={styles.containerText2}>
                <TouchableOpacity>
                  <Text style={styles.textLogin}>Syarat dan Ketentuan </Text>
                </TouchableOpacity>
                <Text style={styles.textBanner}>dari Komuto</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.buttonLogin}
              onPress={this.handlePressRegister}
            >
              <Text style={styles.textButtonLogin}>
                Register
              </Text>
            </TouchableOpacity>
            <View style={styles.line}>
              <Hr text='Atau' />
            </View>
            <View style={styles.loginRow}>
              <Facebook />
            </View>
          </View>
        </ScrollView>
        {spinner}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataRegister: state.register
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    registers: (name, phoneNumber, email, gender, password) => dispatch(registerAction.register({
      name, phone_number: phoneNumber, email, gender, password})),
    stateLogin: (login) => dispatch(registerAction.stateLogin({login})),
    getProfile: (login) => dispatch(registerAction.getProfile())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
