import React, { Component } from 'react'
import { Scene, Router, ActionConst } from 'react-native-router-flux'
import { View, Text, Image } from 'react-native'

// screens identified by the router
import ProfileNotLogin from '../Containers/ProfileNotLogin'

// custom navbar
import CustomNavBar from './CustomNavBar'
import { Images, Colors } from '../Themes'

// style
import styles from './Styles/TabbarStyle'
// Simple component to render something in place of icon
const TabIcon = ({ selected, opacity, borderTopWidth, borderTopColor, title, iconDefault, iconActive }) => {
  return (
    <View style={[styles.buttonContainer, {borderTopWidth: selected ? 1 : 1}, {borderTopColor: selected ? Colors.red : Colors.clear}]}>
      <Image resizeMode='contain' source={selected ? iconActive : iconDefault} style={styles.buttonImage} />
      <Text style={[styles.buttonText, {color: selected ? Colors.red : Colors.grey, opacity: selected ? 1 : 0.5}]}>{title}</Text>
    </View>
  )
}

/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/

class NavigationRouter extends Component {
  render () {
    return (
      <Router>
        <Scene key='root'>
          <Scene key='loggedIn'>
            <Scene
              key='tabbar'
              tabs
              type={ActionConst.REPLACE}
              tabBarStyle={styles.tabbar}>
              <Scene
                key='home'
                title='Home'
                icon={TabIcon}
                iconDefault={Images.home}
                iconActive={Images.home}>
                <Scene
                  key='homeScreen'
                  component={ProfileNotLogin}
                  title='Home'
                  navBar={CustomNavBar}
                  hideNavBar={false}
                  hideBackImage />
              </Scene>
              <Scene
                key='transaction'
                title='Transaksi'
                icon={TabIcon}
                iconDefault={Images.transaksi}
                iconActive={Images.transaksi}>
                <Scene
                  key='transactionScreen'
                  component={ProfileNotLogin}
                  title='Transaksi'
                  navBar={CustomNavBar}
                  hideNavBar={false}
                  hideBackImage />
              </Scene>
              <Scene
                key='notification'
                title='Notifikasi'
                icon={TabIcon}
                iconDefault={Images.notifikasi}
                iconActive={Images.notifikasi}>
                <Scene
                  key='notificationScreen'
                  component={ProfileNotLogin}
                  title='Notifikasi'
                  navBar={CustomNavBar}
                  hideNavBar={false}
                  hideBackImage />
              </Scene>
              <Scene
                key='acccount'
                title='Profile'
                icon={TabIcon}
                iconDefault={Images.profile}
                iconActive={Images.profile}>
                <Scene
                  key='acccountScreen'
                  component={ProfileNotLogin}
                  title='Profile'
                  navBar={CustomNavBar}
                  hideNavBar={false}
                  hideBackImage />
              </Scene>
            </Scene>
          </Scene>
        </Scene>
      </Router>
    )
  }
}

export default NavigationRouter
