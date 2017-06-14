import React from 'react'
import { Alert, Text, TouchableOpacity, Image } from 'react-native'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import Styles from './Styles/FacebookStyle'
import {Images} from '../Themes'
import FBSDK from 'react-native-fbsdk'

const { LoginManager, AccessToken } = FBSDK
export default class Facebook extends React.Component {

  _loginFB () {
    AccessToken.getCurrentAccessToken()
    .then((data) => {
      if (data !== null) {
        this.initUser(data.accessToken)
      } else {
        this.fbAuth()
      }
    })
    .catch(err => {
      console.log(err)
    })
  }

  fbAuth () {
    const _this = this
    LoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_photos'])
    .then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled')
        } else {
          console.log('Login success with permissions: ' + result.grantedPermissions.toString())
          AccessToken.getCurrentAccessToken().then((data) => {
            _this.initUser(data.accessToken)
          }).catch(err => {
            console.log(err)
          })
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error)
        Alert.alert('Error', 'Login fail with error: ' + error)
      }
    )
    .catch((err) => console.log(err))
  }

  initUser = (token1) => {
    this.setState({ loading: true })
    fetch('https://graph.facebook.com/v2.9/me?fields=id,name,email,picture{url}&access_token=' + token1)
    .then((response) => response.json())
    .then((json) => {
      console.log(json)
      NavigationActions.passwordbaru({
        type: ActionConst.PUSH
      })
    })
    .catch((err) => console.log(err))
  }

  render () {
    return (
      <TouchableOpacity
        style={Styles.loginButtonThirdParty}
        onPress={() => this._loginFB()}
      >
        <Image source={Images.facebook} style={Styles.loginIconThirdParty} />
        <Text style={Styles.loginTextThirdParty}>Login dengan Facebook</Text>
      </TouchableOpacity>
    )
  }
}
