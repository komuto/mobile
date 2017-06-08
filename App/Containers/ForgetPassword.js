import React from 'react'
import { ScrollView, Text, View, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
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

  handleChangeEmail = (text) => {
    this.setState({ email: text })
  }

  render () {
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
        <TouchableOpacity style={styles.buttonLogin}>
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword)
