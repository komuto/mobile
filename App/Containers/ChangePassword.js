import React from 'react'
import { ScrollView, Text, View, TextInput, TouchableOpacity, ActivityIndicator, ToastAndroid } from 'react-native'
import { connect } from 'react-redux'
import * as EmailValidator from 'email-validator'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import * as userActions from '../actions/user'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/GantiPasswordScreenStyle'

import { Colors } from '../Themes/'

class ChangePassword extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      email: '',
      passwordLama: '',
      passwordBaru: '',
      ulangPasswordBaru: '',
      colorEmail: Colors.snow,
      colorPassLama: Colors.snow,
      colorPassBaru: Colors.snow,
      colorUlangPass: Colors.snow,
      loading: false
    }
  }

  componentWillReceiveProps (nextProps) {
    console.log(nextProps.dataPassword)
    if (nextProps.dataPassword.status === 200) {
      this.setState({loading: false})
      NavigationActions.manageaccount({
        type: ActionConst.PUSH,
        notif: true,
        pesanNotif: 'Sukses mengganti password Anda'
      })
    } else if (nextProps.dataPassword.status !== 200 && nextProps.dataPassword.status !== 0) {
      this.setState({
        loading: false
      })
      ToastAndroid.show(nextProps.dataPassword.message, ToastAndroid.LONG)
    }
  }

  handleChangeEmail = (text) => {
    this.setState({ email: text })
  }

  handleChangePassLama = (text) => {
    this.setState({ passwordLama: text })
  }

  handleChangePassNew = (text) => {
    this.setState({ passwordBaru: text })
  }

  handleChangePassTwo = (text) => {
    this.setState({ ulangPasswordBaru: text })
  }

  onError = (field) => {
    console.tron.log('field', field)
    switch (field) {
      case 'emailNotValid':
        window.alert('Email tidak valid')
        break
      case 'email':
        this.setState({
          colorEmail: Colors.red
        })
        break
      case 'passlama':
        this.setState({
          colorPassLama: Colors.red
        })
        break
      case 'passbaru':
        this.setState({
          colorPassBaru: Colors.red
        })
        break
      case 'ulangpass':
        this.setState({
          colorUlangPass: Colors.red
        })
        break
      case 'tidakcocok':
        window.alert('Password ulang tidak sama')
        break
      case 'empty':
        this.setState({
          colorEmail: Colors.red,
          colorPassLama: Colors.red,
          colorPassBaru: Colors.red,
          colorUlangPass: Colors.red
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
          colorEmail: Colors.snow
        })
        break
      case 'passlama':
        this.setState({
          colorPassLama: Colors.snow
        })
        break
      case 'passbaru':
        this.setState({
          colorPassBaru: Colors.snow
        })
        break
      case 'ulangpass':
        this.setState({
          colorUlangPass: Colors.snow
        })
        break
      case 'empty':
        this.setState({
          colorEmail: Colors.snow,
          colorPassLama: Colors.snow,
          colorPassBaru: Colors.snow,
          colorUlangPass: Colors.snow
        })
        break
      default:
        window.alert('Internal Error')
        break
    }
  }

  onBlur = (field) => {
    switch (field) {
      case 'email':
        this.setState({
          colorEmail: Colors.snow
        })
        break
      case 'passlama':
        this.setState({
          colorPassLama: Colors.snow
        })
        break
      case 'passbaru':
        this.setState({
          colorPassBaru: Colors.snow
        })
        break
      case 'ulangpass':
        this.setState({
          colorUlangPass: Colors.snow
        })
        break
      default:
        this.setState({
          colorEmail: Colors.snow,
          colorPassLama: Colors.snow,
          colorPassBaru: Colors.snow,
          colorUlangPass: Colors.snow
        })
        break
    }
  }

  gantiPassword () {
    const {email, passwordLama, passwordBaru, ulangPasswordBaru} = this.state
    if (EmailValidator.validate(email)) {
      if (email === '' && passwordLama === '' && passwordBaru === '' && ulangPasswordBaru === '') {
        this.onError('empty')
      } if (email === '') {
        this.onError('email')
      } if (passwordLama === '') {
        this.onError('passlama')
      } if (passwordBaru === '') {
        this.onError('passbaru')
      } if (ulangPasswordBaru === '') {
        this.onError('ulangpass')
      } else if (passwordBaru !== ulangPasswordBaru) {
        this.onError('tidakcocok')
      } else {
        this.setState({loading: true})
        this.props.updatePassword(email, passwordBaru, passwordLama)
      }
    } else {
      this.onError('emailNotValid')
    }
  }

  render () {
    const {colorEmail, colorPassLama, colorPassBaru, colorUlangPass} = this.state
    const spinner = this.state.loading
    ? (<View style={styles.spinner}>
      <ActivityIndicator color='white' size='large' />
    </View>) : (<View />)
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.infoContainer}>
            <TextInput
              ref='name'
              style={styles.inputText}
              value={this.state.email}
              keyboardType='email-address'
              returnKeyType='next'
              onFocus={() => this.onFocus('email')}
              onBlur={() => this.onBlur('email')}
              onSubmitEditing={() => this.refs.slogan.focus()}
              autoCapitalize='none'
              autoCorrect
              onChangeText={this.handleChangeEmail}
              underlineColorAndroid='transparent'
              placeholder='Alamat Email'
            />
            <Text style={[styles.textLabel, {color: colorEmail}]}>Alamat Email harus diisi</Text>
            <TextInput
              ref='name'
              style={styles.inputText}
              value={this.state.passwordLama}
              keyboardType='default'
              returnKeyType='next'
              onFocus={() => this.onFocus('passlama')}
              onBlur={() => this.onBlur('passlama')}
              onSubmitEditing={() => this.refs.slogan.focus()}
              autoCapitalize='none'
              autoCorrect
              secureTextEntry
              onChangeText={this.handleChangePassLama}
              underlineColorAndroid='transparent'
              placeholder='Password Lama'
            />
            <Text style={[styles.textLabel, {color: colorPassLama}]}>Password Lama harus diisi</Text>
            <TextInput
              ref='name'
              style={styles.inputText}
              value={this.state.passwordBaru}
              keyboardType='default'
              returnKeyType='next'
              onFocus={() => this.onFocus('passbaru')}
              onBlur={() => this.onBlur('passbaru')}
              onSubmitEditing={() => this.refs.slogan.focus()}
              autoCapitalize='none'
              autoCorrect
              secureTextEntry
              onChangeText={this.handleChangePassNew}
              underlineColorAndroid='transparent'
              placeholder='Password Baru'
            />
            <Text style={[styles.textLabel, {color: colorPassBaru}]}>Password Baru harus diisi</Text>
            <TextInput
              ref='name'
              style={styles.inputText}
              value={this.state.ulangPasswordBaru}
              keyboardType='default'
              returnKeyType='next'
              onFocus={() => this.onFocus('ulangpass')}
              onBlur={() => this.onBlur('ulangpass')}
              onSubmitEditing={() => this.refs.slogan.focus()}
              autoCapitalize='none'
              autoCorrect
              secureTextEntry
              onChangeText={this.handleChangePassTwo}
              underlineColorAndroid='transparent'
              placeholder='Ketik ulang password baru'
            />
            <Text style={[styles.textLabel, {color: colorUlangPass}]}>Password Baru harus diisi</Text>
            <TouchableOpacity style={[styles.buttonnext]} onPress={() => this.gantiPassword()}>
              <Text style={styles.textButtonNext}>
                Ganti Password
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        {spinner}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataPassword: state.changePassword
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updatePassword: (email, passbaru, passlama) => dispatch(userActions.changePassword({email: email, password: passbaru, old_password: passlama}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)
