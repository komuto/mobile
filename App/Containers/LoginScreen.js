import React from 'react'
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  AsyncStorage
} from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import styles from './Styles/LoginScreenStyles'
import Facebook from '../Components/Facebook'
import Hr from '../Components/Hr'
import ForgotPassword from '../Components/ForgotPassword'
import * as loginAction from '../actions/user'

class LoginScreen extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      loading: false
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.datalogin.status === 200) {
      this.setState({
        loading: false
      })
      AsyncStorage.setItem('nama', nextProps.datalogin.user.data.name)
      AsyncStorage.setItem('saldo', nextProps.datalogin.user.data.saldo_wallet)
      AsyncStorage.setItem('foto', nextProps.datalogin.user.data.photo)
      AsyncStorage.setItem('token', nextProps.datalogin.user.data.token)
      NavigationActions.backtab({ type: ActionConst.RESET })
      NavigationActions.home()
    } else if (nextProps.datalogin.status > 200) {
      this.setState({
        loading: false
      })
      Alert.alert('Login gagal', 'Email atau password salah')
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

  loginfb () {
    NavigationActions.passwordbaru({
      type: ActionConst.PUSH
    })
  }

  handlePressLogin = () => {
    this.setState({
      loading: true
    })
    const { email, password } = this.state
    this.props.attemptLogin(email, password)
  }

  render () {
    const spinner = this.state.loading
    ? (<View style={styles.spinner}>
      <ActivityIndicator color='white' size='large' />
    </View>) : (<View />)
    const { email, password } = this.state
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainerStyle}>
          <View style={styles.containerBanner}>
            <Text style={styles.textBanner}>
              Sudah punya akun?
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

            <View style={styles.row}>
              <View style={styles.inputContainer}>
                <TextInput
                  ref='password'
                  style={styles.inputText}
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
              <Facebook
                onPress={() => this.loginfb()}
              />
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
    attemptLogin: (email, password) => dispatch(loginAction.login({email, password}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
