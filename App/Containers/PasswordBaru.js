import React from 'react'
import {
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert
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
      NavigationActions.notifikasi({
        type: ActionConst.REPLACE,
        tipeNotikasi: 'newpassword'
      })
    } else if (nextProps.data.status > 200) {
      this.setState({
        loading: false
      })
      Alert.alert('Error', nextProps.data.message)
    } else if (nextProps.data.status === 'ENOENT') {
      this.setState({
        loading: false
      })
      Alert.alert('Error', nextProps.data.message)
    }
  }

  handleChangePassword = (text) => {
    this.setState({ password: text })
  }

  handleChangeKonfirmasiPassword = (text) => {
    this.setState({ konfirmasipassword: text })
  }
  sukses () {
    const {password, konfirmasipassword} = this.state
    if (password === '' || konfirmasipassword === '') {
      Alert.alert('Pesan', 'Mohon isi password dan konfirmasi password')
    } else if (password !== konfirmasipassword) {
      Alert.alert('Pesan', 'Password tidak sama')
    } else {
      const { password, konfirmasipassword } = this.state
      this.setState({
        loading: true
      })
      this.props.newPassword(password, konfirmasipassword)
    }
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
    data: state.newPassword
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    newPassword: (password, konfirmasipassword) => dispatch(userAction.newPassword({password, konfirmasipassword}))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PasswordBaru)
