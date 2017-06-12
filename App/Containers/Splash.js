import React from 'react'
import SplashScreen from 'react-native-splash-screen'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'

// Styles

class Splash extends React.Component {

  componentWillMount () {
    setTimeout(() => {
      SplashScreen.hide()
      NavigationActions.backtab({ type: ActionConst.REPLACE })
    }, 2000)
    SplashScreen.show()
  }

  render () {
    return null
  }
}

export default Splash
