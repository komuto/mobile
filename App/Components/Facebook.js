import React from 'react'
import { Alert, Text, TouchableOpacity, Image } from 'react-native'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import Styles from './Styles/FacebookStyle'
import {Images} from '../Themes'
import FBSDK from 'react-native-fbsdk'
import { connect } from 'react-redux'
import * as userAction from '../actions/user'
const { LoginManager, AccessToken } = FBSDK
class Facebook extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      nama: '',
      gender: ''
    }
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.data.status === 200) {
      NavigationActions.passwordbaru({
        type: ActionConst.REPLACE
      })
    }
  }
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
    LoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_photos', 'pages_show_list'])
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
    fetch('https://graph.facebook.com/v2.9/me?fields=id,name,email,gender,picture{url}&access_token=' + token1)
    .then((response) => response.json())
    .then((json) => {
      console.log(json)
      this.setState({
        email: json.email,
        gender: json.gender,
        nama: json.name,
        picture: json.picture.data.url
      })
      const {email, nama, gender} = this.state
      this.props.loginFacebook(email, nama, gender)
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
const mapStateToProps = (state) => {
  return {
    data: state.user
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    loginFacebook: (email, nama, gender) => dispatch(userAction.loginSocial({email, nama, gender}))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Facebook)
