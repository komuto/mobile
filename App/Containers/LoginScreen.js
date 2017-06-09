import React from 'react'
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import styles from './Styles/LoginScreenStyles'
import LoginActions from '../Redux/LoginRedux'
import Facebook from '../Components/Facebook'
import Hr from '../Components/Hr'
import ForgotPassword from '../Components/ForgotPassword'

class LoginScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: ''
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

  render () {
    return (
      <ScrollView contentContainerStyle={styles.contentContainerStyle} style={styles.container}>
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
                value={this.state.email}
                keyboardType='default'
                returnKeyType='go'
                autoCapitalize='none'
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
                value={this.state.password}
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
            <TouchableOpacity style={styles.loginButtonWrapper} onPress={this.handlePressLogin}>
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
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.login.fetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogin: (username, password) => dispatch(LoginActions.loginRequest(username, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
