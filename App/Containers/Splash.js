import React from 'react'
import { connect } from 'react-redux'
import SplashScreen from 'react-native-splash-screen'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'

// Styles

class Splash extends React.Component {

  componentWillMount () {
    setTimeout(() => {
      SplashScreen.hide()
      NavigationActions.tabbar({ type: ActionConst.REPLACE })
    }, 2000)
    SplashScreen.show()
  }

  render () {
    return null
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

export default connect(mapStateToProps, mapDispatchToProps)(Splash)
