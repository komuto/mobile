import React from 'react'
import { ScrollView, Text, View, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/RegisterStyle'

class Register extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      nama: '',
      hape: '',
      email: '',
      password: '',
      konfirmasiPassword: '',
      gender: ''
    }
  }

  handleChangeNama = (text) => {
    this.setState({ nama: text })
  }

  handleChangeHape = (text) => {
    this.setState({ hape: text })
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

  render () {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.containerBanner}>
          <Text style={styles.textBanner}>
            Sudah punya akun?
          </Text>
          <TouchableOpacity>
            <Text style={styles.textLogin}> Login Disini</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <TextInput
              ref='nama'
              style={styles.inputText}
              value={this.state.nama}
              keyboardType='default'
              returnKeyType='next'
              autoCapitalize='none'
              autoCorrect
              onChangeText={this.handleChangeNama}
              underlineColorAndroid='transparent'
              placeholder='Nama Lengkap'
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              ref='hape'
              style={styles.inputText}
              value={this.state.hape}
              keyboardType='numeric'
              returnKeyType='next'
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
              value={this.state.email}
              keyboardType='default'
              returnKeyType='next'
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
              value={this.state.password}
              keyboardType='default'
              returnKeyType='next'
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
              value={this.state.konfirmasiPassword}
              keyboardType='default'
              returnKeyType='next'
              autoCapitalize='none'
              autoCorrect
              onChangeText={this.handleChangeKonfirmasiPassword}
              underlineColorAndroid='transparent'
              placeholder='Konfirmasi Password'
            />
          </View>
        </View>
      </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(Register)
