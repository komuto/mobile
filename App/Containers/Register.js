import React from 'react'
import { ScrollView, Text, View, TextInput, TouchableOpacity } from 'react-native'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import Facebook from '../Components/Facebook'
import Hr from '../Components/Hr'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/RegisterStyle'

import CustomRadio from '../Components/CustomRadio'

class Register extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      nama: '',
      hape: '',
      email: '',
      password: '',
      konfirmasiPassword: '',
      gender: '',
      index: 0,
      label: 'Pria',
      data: [{label: 'Pria', value: 0}, {label: 'Wanita', value: 1}]
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

  handlingRadio () {
    console.log(this.state.index, this.state.label)
  }

  register () {
    NavigationActions.notifikasi({
      type: ActionConst.PUSH,
      tipeNotikasi: 'register'
    })
  }

  login () {
    NavigationActions.login({
      type: ActionConst.PUSH
    })
  }

  loginfb () {
    NavigationActions.passwordbaru({
      type: ActionConst.PUSH
    })
  }

  render () {
    return (
      <ScrollView style={styles.container}>
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
          <View style={styles.radio}>
            <Text style={styles.radioLabel}>Gender</Text>
            <CustomRadio
              data={this.state.data}
              handlingRadio={(index1, value1) =>
                this.setState({
                  index: index1,
                  label: value1
                })}
              horizontal
            />
          </View>
          <View style={styles.containerText}>
            <Text style={styles.textBanner}>Dengan mendaftar Anda telah menyetujui</Text>
            <View style={styles.containerText2}>
              <TouchableOpacity onPress={() => this.handlingRadio()}>
                <Text style={styles.textLogin}>Syarat dan Ketentuan </Text>
              </TouchableOpacity>
              <Text style={styles.textBanner}>dari Komuto</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.buttonLogin}
            onPress={() => this.register()}
          >
            <Text style={styles.textButtonLogin}>
              Register
            </Text>
          </TouchableOpacity>
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
