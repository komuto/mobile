import React from 'react'
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import FCM from 'react-native-fcm'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import * as EmailValidator from 'email-validator'
import styles from './Styles/LoginScreenStyles'
import Facebook from '../Components/Facebook'
import Hr from '../Components/Hr'
import ForgotPassword from '../Components/ForgotPassword'
import * as loginAction from '../actions/user'
import { Colors } from '../Themes'
// import Reactotron from 'reactotron-react-native'
class Login extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      loading: false,
      emailText: 'Email',
      passwordText: 'Password',
      emailErrorColor: Colors.snow,
      passErrorColor: Colors.snow
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.datalogin.status === 200) {
      this.setState({
        loading: false
      })
      this.props.stateLogin(true)
    } else if (nextProps.datalogin.status !== 200 && nextProps.datalogin.status !== 0) {
      this.setState({
        loading: false
      })
      // ToastAndroid.show(nextProps.datalogin.message, ToastAndroid.LONG)
    }
  }
  handleChangeEmail = (text) => {
    this.setState({ email: text })
  }

  handleChangePassword = (text) => {
    this.setState({ password: text })
  }

  lupaPassword () {
    NavigationActions.forgetpassword({ type: ActionConst.PUSH })
  }

  daftar () {
    NavigationActions.register({ type: ActionConst.PUSH })
  }

  handlePressLogin = () => {
    const { email, password } = this.state
    if (EmailValidator.validate(email)) {
      if (password === '') {
        this.onError('password')
      } else {
        this.setState({
          loading: true
        })

        FCM.getFCMToken().then(tokenFCM => {
          if (tokenFCM !== null && tokenFCM !== undefined) {
            this.props.attemptLogin(email, password, tokenFCM)
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
        this.setState({
          emailText: 'Email tidak valid',
          emailErrorColor: Colors.red
        })
        break
      case 'email':
        this.setState({
          emailText: 'Email harus diisi',
          emailErrorColor: Colors.red
        })
        break
      case 'password':
        this.setState({
          passwordText: 'Password harus diisi',
          passErrorColor: Colors.red
        })
        break
      case 'NETWORK_ERROR':
        window.alert('Gangguan Jaringan')
        break
      case 'CLIENT_ERROR':
        this.setState({
          emailText: 'Email tidak terdaftar',
          emailErrorColor: Colors.red
        })
        break
      case 'empty':
        this.setState({
          emailText: 'Email harus diisi',
          passwordText: 'Password harus diisi'
        })
        break
      default:
        window.alert('Internal Error')
        break
    }
  }

  onFocus = (field) => {
    switch (field) {
      case 'email':
        this.setState({
          emailText: 'Email',
          emailErrorColor: Colors.snow
        })
        break
      default:
        this.setState({
          passText: 'Password shit',
          passErrorColor: Colors.snow
        })
        break
    }
  }

  onBlur = (field) => {
    switch (field) {
      case 'email':
        this.setState({
          emailErrorColor: Colors.snow
        })
        break
      default:
        this.setState({
          passErrorColor: Colors.snow
        })
        break
    }
  }

  render () {
    const spinner = this.state.loading
    ? (<View style={styles.spinner}>
      <ActivityIndicator color='white' size='large' />
    </View>) : (<View />)
    const { email, password, emailText, passwordText, emailErrorColor, passErrorColor } = this.state
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainerStyle}>
          <View style={styles.containerBanner}>
            <Text style={styles.textBanner}>
              Belum punya akun?
            </Text>
            <TouchableOpacity onPress={() => this.daftar()}>
              <Text style={styles.textLogin}> Daftar Disini</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.form}>
            <View style={styles.row}>
              <View style={styles.inputContainer}>
                <TextInput
                  ref='email'
                  style={styles.inputText}
                  onFocus={() => this.onFocus('email')}
                  onBlur={() => this.onBlur('email')}
                  value={email}
                  keyboardType='default'
                  returnKeyType='next'
                  autoCapitalize='none'
                  onSubmitEditing={() => this.refs.password.focus()}
                  autoCorrect
                  onChangeText={this.handleChangeEmail}
                  underlineColorAndroid='transparent'
                  placeholder='Alamat Email'
                />
              </View>
            </View>
            <Text style={[styles.labelError, {color: emailErrorColor}]}>{emailText}</Text>
            <View style={styles.row}>
              <View style={styles.inputContainer}>
                <TextInput
                  ref='password'
                  style={styles.inputText}
                  onBlur={() => this.onBlur('email')}
                  onFocus={() => this.onFocus('password')}
                  value={password}
                  keyboardType='default'
                  returnKeyType='go'
                  autoCapitalize='none'
                  autoCorrect
                  secureTextEntry
                  onChangeText={this.handleChangePassword}
                  underlineColorAndroid='transparent'
                  placeholder='Password'
                />
              </View>
            </View>
            <Text style={[styles.labelError, {color: passErrorColor}]}>{passwordText}</Text>
            <View style={styles.loginRow}>
              <TouchableOpacity
                style={styles.loginButtonWrapper}
                onPress={this.handlePressLogin}
              >
                <View style={styles.loginButton}>
                  <Text style={styles.loginText}>Login</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.line}>
              <ForgotPassword
                text='Lupa Password?'
                onPress={() => this.lupaPassword()}
              />
            </View>
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
    datalogin: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogin: (email, password, token) => dispatch(loginAction.login({
      email: email,
      password: password,
      reg_token: token
    })),
    stateLogin: (login) => dispatch(loginAction.stateLogin({login})),
    getProfile: (login) => dispatch(loginAction.getProfile())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
