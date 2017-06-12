import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import NavigationRouter from '../Navigation/NavigationRouter'

// Styles
import styles from './Styles/RootContainerStyles'

class RootContainer extends Component {

  render () {
    return (
      <View style={styles.applicationView}>
        <StatusBar backgroundColor='#e34c4c' barStyle='light-content' />
        <NavigationRouter />
      </View>
    )
  }
}

export default RootContainer
