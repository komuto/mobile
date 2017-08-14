import React from 'react'
import { AsyncStorage } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import { connect } from 'react-redux'
import * as loginaction from '../actions/user'

// Styles

class Splash extends React.Component {

  componentWillMount () {
    SplashScreen.show()
    AsyncStorage.getItem('token').then((value) => {
      if (value === null || value === undefined || value === '') {
      } else {
        this.props.stateLogin(true)
      }
      SplashScreen.hide()
      NavigationActions.transactionitemreceived({ type: ActionConst.REPLACE })
    }).done()
  }

  render () {
    return null
  }
}

const mapStateToProps = (state) => {
  return {
    datalogin: state.isLogin
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    stateLogin: (login) => dispatch(loginaction.stateLogin({login}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Splash)
