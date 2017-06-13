import React, { Component } from 'react'
import { Scene, Router } from 'react-native-router-flux'
import { View, Text, Image } from 'react-native'

// screens identified by the router
import Profile from '../Containers/Profile'
import Splash from '../Containers/Splash'
import ForgetPassword from '../Containers/ForgetPassword'
import Notifikasi from '../Containers/Notifikasi'
import Register from '../Containers/Register'
import Login from '../Containers/LoginScreen'
import PasswordBaru from '../Containers/PasswordBaru'
import Home from '../Containers/Home'
import NotifikasiPengguna from '../Containers/NotifikasiPengguna'
import Transaksi from '../Containers/Transaksi'

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
          <Scene key='splash' component={Splash} hideNavBar />
          <Scene key='backtab'>
            <Scene
              key='tabbar'
              tabs
              tabBarStyle={styles.tabbar}>
              <Scene
                key='home'
                title='Home'
                icon={TabIcon}
                iconDefault={Images.home}
                iconActive={Images.homeActive}>
                <Scene
                  key='homeScreen'
                  component={Home}
                  title='Home'
                  navBar={CustomNavBar}
                  hideNavBar
                  hideBackImage />
              </Scene>
              <Scene
                key='transaction'
                title='Transaksi'
                icon={TabIcon}
                iconDefault={Images.transaksi}
                iconActive={Images.transaksiActive}>
                <Scene
                  key='transactionScreen'
                  component={Transaksi}
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
                iconActive={Images.notifikasiActive}>
                <Scene
                  key='notificationScreen'
                  component={NotifikasiPengguna}
                  title='Notifikasi'
                  navBar={CustomNavBar}
                  hideNavBar={false}
                  hideBackImage />
              </Scene>
              <Scene
                key='acccount'
                initial
                title='Profile'
                icon={TabIcon}
                iconDefault={Images.profile}
                iconActive={Images.profileActive}>
                <Scene
                  key='acccountScreen'
                  component={Profile}
                  title='Profile'
                  navBar={CustomNavBar}
                  hideNavBar={false}
                  hideBackImage />
              </Scene>
            </Scene>
          </Scene>
          <Scene
            key='forgetpassword'
            component={ForgetPassword}
            title='Lupa Password'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='notifikasi'
            component={Notifikasi}
            navBar={CustomNavBar}
            hideNavBar />
          <Scene
            key='register'
            component={Register}
            title='Register'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='login'
            component={Login}
            title='Login'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
          <Scene
            key='passwordbaru'
            component={PasswordBaru}
            title='Password Baru'
            navBar={CustomNavBar}
            hideNavBar={false}
            hideBackImage={false} />
        </Scene>
      </Router>
    )
  }
}

export default NavigationRouter
