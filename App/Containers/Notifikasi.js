import React from 'react'
import { ScrollView, Text, View, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Images } from '../Themes'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/NotifikasiStyle'

class Notifikasi extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      type: 'welcome'
    }
  }

  renderNotifikasi () {
    if (this.state.type === 'resetpassword') {
      return (
        <View>
          <View style={styles.imagestyle} />
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>
              Link Reset Password telah terkirim
            </Text>
          </View>
          <View style={styles.welcome2Container}>
            <Text style={styles.welcome2Text}>
              Kami telah mengirim link reset password ke { '\n' }
              dwinawan@gmail.com. Silahkan periksa inbox { '\n' }
              Anda, dan ikuti petunjuk di email tersebut.
            </Text>
          </View>
          <View style={styles.containerButton}>
            <TouchableOpacity style={styles.buttonLogin}>
              <Text style={styles.textButtonLogin}>
                Kembali ke Halaman Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    } else if (this.state.type === 'newpassword') {
      return (
        <View>
          <Image source={Images.gembok} style={styles.imagestyle} />
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>
              Password berhasil diubah
            </Text>
          </View>
          <View style={styles.welcome2Container}>
            <Text style={styles.welcome2Text}>
              Password Anda telah berhasil diubah. Kini { '\n' }
              Anda bisa login menggunakan password { '\n' }
              Anda yang baru.
            </Text>
          </View>
          <View style={styles.containerButton}>
            <TouchableOpacity style={styles.buttonLogin}>
              <Text style={styles.textButtonLogin}>
                Kembali ke Halaman Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    } else if (this.state.type === 'register') {
      return (
        <View>
          <View style={styles.imagestyle} />
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>
              Link Verifikasi Email telah terkirim
            </Text>
          </View>
          <View style={styles.welcome2Container}>
            <Text style={styles.welcome2Text}>
              Kami telah mengirim link verifikasi email ke { '\n' }
              dwinawan@gmail.com. Silahkan periksa inbox { '\n' }
              Anda, dan ikuti petunjuk di email tersebut.
            </Text>
          </View>
          <View style={styles.containerButton}>
            <TouchableOpacity style={styles.buttonLogin}>
              <Text style={styles.textButtonLogin}>
                Kembali ke Halaman Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    } else if (this.state.type === 'welcome') {
      return (
        <View>
          <Image source={Images.welcome} style={styles.imagestyle} />
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>
              Selamat Datang di Komuto
            </Text>
          </View>
          <View style={styles.welcome2Container}>
            <Text style={styles.welcome2Text}>
              Selamat bergabung dengan komuto. Disini { '\n' }
              Anda bisa melakukan lorem ipsum dolor { '\n' }
              sit amet consequence dolor
            </Text>
          </View>
          <View style={styles.containerButton}>
            <TouchableOpacity style={styles.buttonLogin}>
              <Text style={styles.textButtonLogin}>
                Kembali ke Halaman Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        {this.renderNotifikasi()}
      </ScrollView>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(Notifikasi)
