import React from 'react'
import { ScrollView, Text, View, TextInput, TouchableOpacity } from 'react-native'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import { connect } from 'react-redux'
import * as forgotPasswordAction from '../actions/user'
import * as EmailValidator from 'email-validator'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ForgetPasswordStyle'

class ForgetPassword extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      email: ''
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataPassword.status === 200) {
      NavigationActions.notifikasi({
        type: ActionConst.PUSH,
        tipeNotikasi: 'resetpassword'
      })
    }
  }

  handleChangeEmail = (text) => {
    this.setState({ email: text })
  }

  sukses = () => {
    const {email} = this.state
    if (EmailValidator.validate(email)) {
      if (email === '') {
        this.onError('email')
      } else {
        this.props.forgotPass(email)
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
      default:
        window.alert('Internal Error')
        break
    }
  }

  render () {
    const {email} = this.state
    return (
      <ScrollView style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            Silahkan menuliskan alamat email yang Anda{'\n'}
            gunakan untuk mendaftar di Komuto
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            ref='password'
            style={styles.inputText}
            value={email}
            keyboardType='default'
            returnKeyType='go'
            autoCapitalize='none'
            autoCorrect
            onChangeText={this.handleChangeEmail}
            underlineColorAndroid='transparent'
            placeholder='Alamat Email'
          />
        </View>
        <TouchableOpacity
          style={styles.buttonLogin}
          onPress={this.sukses}
        >
          <Text style={styles.textButtonLogin}>
            Reset Password
          </Text>
        </TouchableOpacity>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataPassword: state.forgetPassword
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    forgotPass: (email) => dispatch(forgotPasswordAction.forgetPassword({email}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword)

