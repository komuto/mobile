import React from 'react'
import { ScrollView, Text, View, TextInput, TouchableOpacity } from 'react-native'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/PasswordBaruStyle'

class PasswordBaru extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      password: '',
      konfirmasipassword: ''
    }
  }

  handleChangePassword = (text) => {
    this.setState({ password: text })
  }

  handleChangeKonfirmasiPassword = (text) => {
    this.setState({ konfirmasipassword: text })
  }

  sukses () {
    NavigationActions.notifikasi({
      type: ActionConst.PUSH,
      tipeNotikasi: 'welcome'
    })
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            ref='password'
            style={styles.inputText}
            value={this.state.password}
            keyboardType='default'
            returnKeyType='go'
            autoCapitalize='none'
            autoCorrect
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
    )
  }
}

export default PasswordBaru
