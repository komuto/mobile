import React from 'react'
import {
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage
} from 'react-native'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import { connect } from 'react-redux'
import * as userAction from '../actions/user'
// Styles
import styles from './Styles/PasswordBaruStyle'
class PasswordBaru extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: this.props.email,
      nama: this.props.nama,
      gender: this.props.gender,
      password: '',
      konfirmasipassword: '',
      loading: false
    }
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.data.status === 200) {
      this.setState({
        loading: false
      })
      AsyncStorage.setItem('nama', nextProps.data.user.data.name)
      AsyncStorage.setItem('saldo', nextProps.data.user.data.saldo_wallet)
      AsyncStorage.setItem('foto', nextProps.data.user.data.photo)
      AsyncStorage.setItem('token', nextProps.data.user.data.token)
      this.props.stateLogin(true)
      NavigationActions.notifikasi({
        type: ActionConst.REPLACE,
        tipeNotikasi: 'welcome'
      })
    }
  }
  handleChangePassword = (text) => {
    this.setState({ password: text })
  }
  handleChangeKonfirmasiPassword = (text) => {
    this.setState({ konfirmasipassword: text })
  }
  sukses () {
    const {email, nama, gender, password, konfirmasipassword} = this.state
    this.setState({
      loading: true
    })
    this.props.newPassword(password, konfirmasipassword)
    this.props.loginFacebook(email, nama, gender)
  }
  render () {
    const spinner = this.state.loading
    ? (<View style={styles.spinner}>
      <ActivityIndicator color='white' size='large' />
    </View>) : (<View />)
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainerStyle}>
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
          <View style={styles.inputContainer}>
            <TextInput
              ref='konfirmasipassword'
              style={styles.inputText}
              value={this.state.konfirmasipassword}
              keyboardType='default'
              returnKeyType='go'
              autoCapitalize='none'
              secureTextEntry
              autoCorrect
              onChangeText={this.handleChangeKonfirmasiPassword}
              underlineColorAndroid='transparent'
              placeholder='Konfirmasi Password'
            />
          </View>
          <TouchableOpacity
            style={styles.buttonLogin}
            onPress={() => this.sukses()}
          >
            <Text style={styles.textButtonLogin}>
              Buat Password Baru
            </Text>
          </TouchableOpacity>
        </ScrollView>
        {spinner}
      </View>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    data: state.user
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    newPassword: (password, konfirmasipassword) => dispatch(userAction.newPassword({password, konfirmasipassword})),
    loginFacebook: (email, nama, gender) => dispatch(userAction.loginSocial({email, nama, gender})),
    stateLogin: (login) => dispatch(userAction.stateLogin({login}))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PasswordBaru)
