import React from 'react'
import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  AsyncStorage
} from 'react-native'
import { MaskService } from 'react-native-masked-text'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import * as loginaction from '../actions/user'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ProfileStyle'

// Images
import { Images } from '../Themes'

class Profile extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      token: '',
      nama: '',
      saldo: '',
      foto: 'https://ca.slack-edge.com/T02VD5GNR-USLACKBOT-sv1444671949-48',
      isLogin: this.props.datalogin.login
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.datalogin.login) {
      this.setState({
        isLogin: true
      })
    } else if (!nextProps.datalogin.login) {
      this.setState({
        isLogin: false
      })
    }
  }

  componentDidMount () {
    if (this.state.isLogin) {
      AsyncStorage.getItem('nama').then((value) => {
        if (value === null || value === undefined || value === '') {
        } else {
          this.setState({
            nama: value
          })
        }
      }).done()
      AsyncStorage.getItem('saldo').then((value) => {
        if (value === null || value === undefined || value === '') {
          this.setState({
            saldo: 0
          })
        } else {
          this.setState({
            saldo: value
          })
        }
      }).done()
      AsyncStorage.getItem('foto').then((value) => {
        this.setState({
          foto: value
        })
      }).done()
    }
  }

  login () {
    NavigationActions.login({ type: ActionConst.PUSH })
  }

  register () {
    NavigationActions.register({ type: ActionConst.PUSH })
  }

  logout () {
    AsyncStorage.setItem('nama', '')
    AsyncStorage.setItem('saldo', '')
    AsyncStorage.setItem('foto', '')
    AsyncStorage.setItem('token', '')
    this.props.stateLogin(false)
  }

  renderProfile () {
    if (!this.state.isLogin) {
      return (
        <View style={styles.loginContainer}>
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
        </View>
      )
    }
    const money = MaskService.toMask('money', this.state.saldo, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    return (
      <View>
        <View style={styles.profileContainer}>
          <View style={styles.dataProfileContainer}>
            <TouchableOpacity>
              <View style={styles.profile}>
                <Image
                  source={{ uri: this.state.foto }}
                  style={styles.styleFoto}
                />
                <View style={styles.namaContainer}>
                  <Text style={styles.textNama}>
                    {this.state.nama}
                  </Text>
                  <Text style={styles.textKelola}>
                    Kelola Akun
                  </Text>
                </View>
                <View style={styles.notifContainer}>
                  <Text style={styles.notif}>
                    1
                  </Text>
                </View>
                <Image source={Images.rightArrow} style={styles.rightArrow} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.profile}>
                <Image source={Images.saldo} style={styles.imageCategory} />
                <View style={styles.namaContainer}>
                  <Text style={styles.textNama}>
                    Saldo
                  </Text>
                </View>
                <Text style={styles.textNama}>
                  {money}
                </Text>
                <Image source={Images.rightArrow} style={styles.rightArrow} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.profile}>
                <Image source={Images.daftar} style={styles.imageCategory} />
                <View style={styles.namaContainer}>
                  <Text style={styles.textNama}>
                    Daftar Toko Favorit
                  </Text>
                </View>
                <Image source={Images.rightArrow} style={styles.rightArrow} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.dataProfileContainer}>
          <TouchableOpacity>
            <View style={styles.profile}>
              <Image source={Images.toko} style={styles.imageCategory} />
              <View style={styles.namaContainer}>
                <Text style={styles.textNama}>
                  Anda belum memiliki Toko
                </Text>
                <Text style={styles.textKelola}>
                  Buat Sekarang
                </Text>
              </View>
              <Image source={Images.rightArrow} style={styles.rightArrow} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.dataProfileContainer}>
          <TouchableOpacity onPress={() => this.logout()}>
            <View style={styles.profile}>
              <Image source={Images.logout} style={styles.imageCategory} />
              <View style={styles.namaContainer}>
                <Text style={styles.textNama}>
                  Logout
                </Text>
              </View>
              <Image source={Images.rightArrow} style={styles.rightArrow} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        {this.renderProfile()}
      </ScrollView>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    stateLogin: (login) => dispatch(loginaction.stateLogin({login}))
  }
}

const mapStateToProps = (state) => {
  return {
    datalogin: state.isLogin
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
