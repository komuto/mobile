import React from 'react'
import { ScrollView, Text, View, Image, TouchableOpacity } from 'react-native'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ProfileStyle'

// Images
import { Images } from '../Themes'

class Profile extends React.Component {

  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  login () {
    NavigationActions.login({ type: ActionConst.PUSH })
  }

  register () {
    NavigationActions.register({ type: ActionConst.PUSH })
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <Image source={Images.phone} style={styles.imagestyle} />
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>
            Masuk ke Akun Anda untuk { '\n' }mempermudah proses pembelian
          </Text>
        </View>
        <View style={styles.welcome2Container}>
          <Text style={styles.welcome2Text}>
            Terima Kasih, Anda telah berhasil melakukan { '\n' }
            pembelian Token Listrik. Untuk melihat Token { '\n' }
            silahkan menuju bagian Transaksi
          </Text>
        </View>
        <View style={styles.containerButton}>
          <TouchableOpacity style={styles.buttonRegister} onPress={() => this.register()}>
            <Text style={styles.textButtonRegister}>
              Register
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonLogin} onPress={() => this.login()}>
            <Text style={styles.textButtonLogin}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}

export default Profile
