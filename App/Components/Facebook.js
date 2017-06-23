import React from 'react'
import { Alert, Text, TouchableOpacity, Image, View, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import FBSDK from 'react-native-fbsdk'
import Styles from './Styles/FacebookStyle'
import {Images} from '../Themes'
import * as loginAction from '../actions/user'
const { LoginManager, AccessToken } = FBSDK
class Facebook extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      providerName: 'facebook',
      providerUid: '',
      accessToken: ''
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.datalogin.status === 200) {
      this.props.getProfile()
      this.props.stateLogin(true)
      NavigationActions.backtab({ type: ActionConst.RESET })
    } else if (nextProps.datalogin.status > 200) {
      this.setState({
        loading: false
      })
      Alert.alert('Login gagal', nextProps.datalogin.message)
    } else if (nextProps.datalogin.status === 'ENOENT') {
      this.setState({
        loading: false
      })
      Alert.alert('Login gagal', nextProps.datalogin.message)
    }
  }

  _loginFB () {
    this.setState({
      loading: true
    })
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
          _this.setState({
            loading: false
          })
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
    const { providerName } = this.state
    fetch('https://graph.facebook.com/v2.9/me?fields=id,name,email,gender,picture{url}&access_token=' + token1)
    .then((response) => response.json())
    .then((json) => {
      this.setState({
        loading: false
      })
      console.log(json)
      this.props.loginSocial(providerName, json.id, token1)
      // AsyncStorage.setItem('nama', json.name)
      // AsyncStorage.setItem('saldo', '0')
      // AsyncStorage.setItem('foto', json.picture.data.url)
      // AsyncStorage.setItem('token', token1)
      // AsyncStorage.setItem('status', '0')
      // AsyncStorage.setItem('email', json.email)
    })
    .catch((err) => console.log(err))
  }

  renderLogin () {
    const spinner = this.state.loading
    ? (<View style={Styles.spinner}>
      <ActivityIndicator color='white' size='large' />
    </View>) : (<View />)
    if (this.state.loading) {
      return (
        <View style={Styles.containerText}>
          {spinner}
        </View>
      )
    }
    return (
      <View style={Styles.containerText}>
        <Image source={Images.facebook} style={Styles.loginIconThirdParty} />
        <Text style={Styles.loginTextThirdParty}>Login dengan Facebook</Text>
      </View>
    )
  }
  render () {
    return (
      <TouchableOpacity
        style={Styles.loginButtonThirdParty}
        onPress={() => this._loginFB()}
      >
        {this.renderLogin()}
      </TouchableOpacity>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    datalogin: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    stateLogin: (login) => dispatch(loginAction.stateLogin({login})),
    loginSocial: (providerName, providerUid, accessToken) => dispatch(loginAction.loginSocial({
      provider_name: providerName, provider_uid: providerUid, access_token: accessToken})),
    getProfile: (login) => dispatch(loginAction.getProfile())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Facebook)
