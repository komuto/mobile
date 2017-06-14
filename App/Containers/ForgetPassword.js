import React from 'react'
import { ScrollView, Text, View, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import * as forgotPasswordAction from '../actions/user'

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
    this.props.forgotPass(email)
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
    dataPassword: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    forgotPass: (email) => dispatch(forgotPasswordAction.userRegister({email}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword)

