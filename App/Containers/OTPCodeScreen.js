import React from 'react'
import { Text, View, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// styles
import styles from './Styles/OTPCodeScreenStyle'

class OTPCodeScreen extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      fieldPass: this.props.email || 'admin@komuto.com',
      tipe: this.props.tipe || 'verifikasi',
      code1: '',
      code2: '',
      code3: '',
      code4: '',
      code5: '',
      focusCode1: true,
      focusCode2: false,
      focusCode3: false,
      focusCode4: false,
      focusCode5: false
    }
  }

  componentDidUpdate () {
    if (this.refs[this.state.nextField]) {
      this.refs[this.state.nextField].focus()
    }
  }

  verifikaksi () {
    NavigationActions.passwordbaru({
      type: ActionConst.PUSH
    })
  }

  render () {
    const {fieldPass, tipe} = this.state
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Silahkan menuliskan kode {tipe} yang telah{'\n'}kami kirim ke {fieldPass}</Text>
        <View style={styles.containerCodeStyle}>
          <View>
            <TextInput
              autoFocus
              keyboardType='numeric'
              maxLength={1}
              returnKeyType='next'
              underlineColorAndroid='transparent'
              value={this.state.code1}
              style={styles.codeStyle}
              blurOnSubmit={false}
              onChange={(event) =>
                this.setState({
                  code1: event.nativeEvent.text,
                  nextField: 2
                })
              }
            />
          </View>
          <View>
            <TextInput
              ref='2'
              underlineColorAndroid='transparent'
              keyboardType='numeric'
              maxLength={1}
              returnKeyType='next'
              value={this.state.code2}
              style={styles.codeStyle}
              blurOnSubmit={false}
              onChange={(event) =>
                this.setState({
                  code2: event.nativeEvent.text,
                  nextField: 3
                })
              }
            />
          </View>
          <View>
            <TextInput
              ref='3'
              underlineColorAndroid='transparent'
              keyboardType='numeric'
              maxLength={1}
              returnKeyType='next'
              value={this.state.code3}
              style={styles.codeStyle}
              blurOnSubmit={false}
              onChange={(event) =>
                this.setState({
                  code3: event.nativeEvent.text,
                  nextField: 4
                })
              }
            />
          </View>
          <View>
            <TextInput
              ref='4'
              underlineColorAndroid='transparent'
              keyboardType='numeric'
              maxLength={1}
              returnKeyType='next'
              value={this.state.code4}
              style={styles.codeStyle}
              blurOnSubmit={false}
              onChange={(event) =>
                this.setState({
                  code4: event.nativeEvent.text,
                  nextField: 5
                })
              }
            />
          </View>
          <View>
            <TextInput
              ref='5'
              underlineColorAndroid='transparent'
              keyboardType='numeric'
              maxLength={1}
              returnKeyType='next'
              value={this.state.code5}
              style={styles.codeStyle}
              blurOnSubmit={false}
              onChange={(event) =>
                this.setState({
                  code5: event.nativeEvent.text
                })
              }
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => this.verifikaksi()}
          style={styles.buttonLogin}
        >
          <Text style={styles.textButtonLogin}>
            Verifikasikan Email
          </Text>
        </TouchableOpacity>
        <View style={styles.containerBanner}>
          <Text style={styles.textBanner}>
            Belum menerima kode aktifasi
          </Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.textLogin}> Klik Disini</Text>
          </TouchableOpacity>
        </View>
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(OTPCodeScreen)
