import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import NavigationRouter from '../Navigation/NavigationRouter'

// Styles
import styles from './Styles/RootContainerStyles'
import { Colors } from '../Themes'
class RootContainer extends Component {

  render () {
    return (
      <View style={styles.applicationView}>
        <StatusBar backgroundColor={Colors.red} barStyle='light-content' />
        <NavigationRouter />
      </View>
    )
  }
}

export default RootContainer
