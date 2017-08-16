import React from 'react'
import { ScrollView, Text, View, Image, TouchableOpacity } from 'react-native'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import { Images } from '../Themes'
import { connect } from 'react-redux'
import * as storeAction from '../actions/stores'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/NotifikasiStyle'

class Notification extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      type: this.props.tipeNotikasi,
      email: this.props.email
    }
  }

  backToLogin () {
    NavigationActions.login({
      type: ActionConst.POP_AND_REPLACE
    })
  }

  backToProfile () {
    NavigationActions.backtab({
      type: ActionConst.RESET
    })
  }

  handleDaftarProduk () {
    this.props.getListProduk()
    NavigationActions.productlist({
      type: ActionConst.RESET
    })
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
              {this.state.email}. Silahkan periksa inbox { '\n' }
              Anda, dan ikuti petunjuk di email tersebut.
            </Text>
          </View>
          <View style={styles.containerButton}>
            <TouchableOpacity
              style={styles.buttonLogin}
              onPress={() => this.backToLogin()}
            >
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
            <TouchableOpacity
              style={styles.buttonLogin}
              onPress={() => this.backToProfile()}
            >
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
              {this.state.email}. Silahkan periksa inbox { '\n' }
              Anda, dan ikuti petunjuk di email tersebut.
            </Text>
          </View>
          <View style={styles.containerButton}>
            <TouchableOpacity
              style={styles.buttonLogin}
              onPress={() => this.backToLogin()}
            >
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
            <TouchableOpacity
              style={styles.buttonLogin}
              onPress={() => this.backToProfile()}
            >
              <Text style={styles.textButtonLogin}>
                Kembali ke Halaman Profil
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    } else if (this.state.type === 'successBukaToko') {
      return (
        <View>
          <Image source={Images.bukaToko} style={[styles.imagestyle, {height: 206.9, width: 206.9, marginTop: 30}]} />
          <View style={[styles.welcomeContainer, {marginTop: 11}]}>
            <Text style={styles.welcomeText}>
              Selamat, Anda telah membuka Toko
            </Text>
          </View>
          <View style={[styles.welcome2Container, {marginTop: 10}]}>
            <Text style={[styles.welcome2Text, {fontSize: 13}]}>
              Kami akan mengirim kode verifikasi toko anda{ '\n' }
              ke alamat toko anda via pengiriman kurir POS.{ '\n' }
              { '\n' }
              Sebelum toko anda terverifikasi sistem kami,{ '\n' }
              Toko anda hanya dapat menjual produk selama{ '\n' }
              30 hari dari Sekarang.
            </Text>
          </View>
          <View style={styles.containerButton}>
            <TouchableOpacity
              style={styles.buttonLogin}
              onPress={() => this.backToProfile()}
            >
              <Text style={styles.textButtonLogin}>
                Kembali ke Halaman Profil
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    } else if (this.state.type === 'succestambahproduk') {
      return (
        <View>
          <Image source={Images.susksesTambahProduk} style={[styles.imagestyle, {height: 200, width: 159, marginTop: 30}]} />
          <View style={[styles.welcomeContainer, {marginTop: 50}]}>
            <Text style={styles.welcomeText}>
              Berhasil Menambahkan Produk
            </Text>
          </View>
          <View style={[styles.welcome2Container, {marginTop: 10, marginBottom: 49}]}>
            <Text style={[styles.welcome2Text, {fontSize: 13}]}>
              Anda telah berhasil menambahkan produk{'\n'}baru ke dalam toko Anda.
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.buttonLogin, {marginRight: 40, marginLeft: 40}]}
            onPress={() => this.handleDaftarProduk()}
          >
            <Text style={styles.textButtonLogin}>
              Lihat Daftar Produk
            </Text>
          </TouchableOpacity>
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
    getListProduk: () => dispatch(storeAction.getStoreProducts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification)
