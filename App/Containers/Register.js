import React from 'react'
import {
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage,
  ToastAndroid,
  BackAndroid
} from 'react-native'
import { marketplace } from '../config'
import { connect } from 'react-redux'
import FCM from 'react-native-fcm'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import Facebook from '../Components/Facebook'
import Hr from '../Components/Hr'
import * as registerAction from '../actions/user'
import * as EmailValidator from 'email-validator'
import Reactotron from 'reactotron-react-native'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/RegisterStyle'

import CustomRadio from '../Components/CustomRadioCatalog'

class Register extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      name: '',
      phoneNumber: '',
      email: '',
      password: '',
      konfirmasiPassword: '',
      gender: '',
      index: -1,
      data: [{'index': 0, 'label': 'Pria'}, {'index': 1, 'label': 'Wanita'}],
      loading: false
    }
  }

  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
  }

  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
  }

  handleBack = () => {
    NavigationActions.pop()
    return true
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataRegister.status === 200) {
      this.setState({
        loading: false
      })
      AsyncStorage.setItem('token', nextProps.dataRegister.user.token)
      this.props.getProfile()
      this.props.stateLogin(true)
      NavigationActions.backtab({
        type: ActionConst.RESET
      })
    } else if (nextProps.dataRegister.status !== 200 && nextProps.dataRegister.status !== 0) {
      this.setState({
        loading: false
      })
      ToastAndroid.show(nextProps.dataRegister.message, ToastAndroid.SHORT)
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
        gender: 'male',
        index: index
      })
    } else {
      this.setState({
        gender: 'female',
        index: index
      })
    }
  }

  handlePressRegister = () => {
    const {name, phoneNumber, email, password, konfirmasiPassword, gender} = this.state
    let errorEmail = false
    var format = /^([a-zA-Z0-9_\.])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
    if (format.test(email)) {
      errorEmail = false
    } else {
      errorEmail = true
    }
    if (EmailValidator.validate(email)) {
      if (name === '') {
        this.onError('name')
      } else if (name.length < 3) {
        this.onError('nameNotValid')
      } else if (email === '') {
        this.onError('email')
      } else if (errorEmail) {
        this.onError('emailNotValid')
      } else if (phoneNumber === '') {
        this.onError('phoneNumber')
      } else if (password === '') {
        this.onError('password')
      } else if (konfirmasiPassword === '') {
        this.onError('konfirmasiPassword')
      } else if (konfirmasiPassword !== password) {
        this.onError('passwordBeda')
      } else if (gender === '') {
        this.onError('genderNull')
      } else {
        FCM.getFCMToken().then(tokenFCM => {
          if (tokenFCM !== null && tokenFCM !== undefined) {
            console.log('token', tokenFCM)
            if (password.length > 4) {
              this.setState({
                loading: true
              })
              this.props.registers(name, phoneNumber, email, gender, password, tokenFCM)
            } else {
              ToastAndroid.show('Panjang password harus lebih dari 5 karakter', ToastAndroid.SHORT)
            }
          }
        })
      }
    } else {
      this.onError('emailNotValid')
    }
  }

  onError = (field) => {
    switch (field) {
      case 'emailNotValid':
        ToastAndroid.show('Email tidak valid', ToastAndroid.SHORT)
        break
      case 'email':
        ToastAndroid.show('Email harus diisi', ToastAndroid.SHORT)
        break
      case 'phoneNumber':
        ToastAndroid.show('Nomer hp harus diisi', ToastAndroid.SHORT)
        break
      case 'password':
        ToastAndroid.show('Password harus diisi', ToastAndroid.SHORT)
        break
      case 'name':
        ToastAndroid.show('Nama harus diisi', ToastAndroid.SHORT)
        break
      case 'nameNotValid':
        ToastAndroid.show('Nama tidak boleh kurang dari 3 karakter', ToastAndroid.SHORT)
        break
      case 'konfirmasiPassword':
        ToastAndroid.show('Konfirmasi Password harus diisi', ToastAndroid.SHORT)
        break
      case 'passwordBeda':
        ToastAndroid.show('Password tidak cocok', ToastAndroid.SHORT)
        break
      case 'genderNull':
        ToastAndroid.show('Pilih salah satu gender', ToastAndroid.SHORT)
        break
    }
  }

  login () {
    NavigationActions.login({
      type: ActionConst.PUSH
    })
  }

  render () {
    Reactotron.log(this.state.gender)
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
              <Text style={styles.textLogin}> Masuk Disini</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <TextInput
                ref='name'
                style={styles.inputText}
                value={name}
                maxLength={40}
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
                maxLength={12}
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
                index={this.state.index}
                handlingRadio={(index, value) =>
                  this.handlingRadio(index, value)}
                horizontal
              />
            </View>
            <View style={styles.containerText}>
              <Text style={styles.textBanner}>Dengan mendaftar Anda telah menyetujui</Text>
              <View style={styles.containerText2}>
                <TouchableOpacity>
                  <Text style={styles.textLogin}>Syarat dan Ketentuan </Text>
                </TouchableOpacity>
                <Text style={styles.textBanner}>dari {marketplace}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.buttonLogin}
              onPress={this.handlePressRegister}
            >
              <Text style={styles.textButtonLogin}>
                Daftar
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
    registers: (name, phoneNumber, email, gender, password, tokenFCM) => dispatch(registerAction.register({
      name, phone_number: phoneNumber, email, gender, password, reg_token: tokenFCM})),
    stateLogin: (login) => dispatch(registerAction.stateLogin({login})),
    getProfile: (login) => dispatch(registerAction.getProfile())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
