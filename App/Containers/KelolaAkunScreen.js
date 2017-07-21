import React from 'react'
import { View, Text, TouchableOpacity, Image, AsyncStorage, BackAndroid } from 'react-native'
import { connect } from 'react-redux'
// const LoginManager = require('react-native').NativeModules.FBLoginManager
import * as loginaction from '../actions/user'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/KelolaAkunScreenStyle'

import { Images } from '../Themes'

class KelolaAkunScreenScreen extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      token: '',
      name: '',
      email: '',
      statusNoHp: '',
      nomerHape: '',
      textStatusNoHP: 'Belum terverifikasi',
      notif: this.props.notif
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataProfile.status === 200) {
      this.setState({
        name: nextProps.dataProfile.user.user.name,
        email: nextProps.dataProfile.user.user.email,
        statusNoHp: nextProps.dataProfile.user.user.is_phone_verified,
        nomerHape: nextProps.dataProfile.user.user.phone_number
      })
    } else if (nextProps.dataProfile.status > 200) {
      this.setState({
        loading: false
      })
    }
  }

  componentDidMount () {
    this.props.getProfile()
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
  }

  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
  }

  handleBack = () => {
    NavigationActions.pop()
    return true
  }

  backButton () {
    NavigationActions.pop()
  }

  logout () {
    AsyncStorage.setItem('token', '')
    this.props.stateLogin(false)
    this.props.logout()
    // LoginManager.logOut()
  }

  handleBiodata () {
    NavigationActions.biodata({
      type: ActionConst.PUSH
    })
  }

  handlenomerHape () {
    NavigationActions.nomerhape({
      type: ActionConst.PUSH,
      statusVerifikasi: this.state.statusNoHp,
      nomerHape: this.state.nomerHape
    })
  }

  handleGantiPassword () {
    NavigationActions.gantipassword({
      type: ActionConst.PUSH,
      statusVerifikasi: this.state.statusNoHp,
      nomerHape: this.state.nomerHape
    })
  }

  handleDataRekening () {
    NavigationActions.tambahrekening({
      type: ActionConst.PUSH,
      email: this.state.email
    })
  }

  handlePengaturan () {
    NavigationActions.pengarutannotif({
      type: ActionConst.PUSH
    })
  }

  handleCekNoHp () {
    if (this.state.statusNoHp) {
      return (
        <Text />
      )
    } else {
      return (
        <Text style={styles.textKelola}>
          {this.state.textStatusNoHP}
        </Text>
      )
    }
  }

  handleDataAlamat () {
    NavigationActions.dataalamat({
      type: ActionConst.PUSH,
      name: this.state.name,
      email: this.state.email
    })
  }

  notif () {
    if (this.state.notif) {
      return (
        <View style={styles.notif}>
          <Text style={styles.textNotif}>Sukses mengubah password anda</Text>
          <TouchableOpacity onPress={() => this.setState({notif: false})}>
            <Image source={Images.closeGreen} style={styles.image} />
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <View />
      )
    }
  }

  render () {
    return (
      <View style={styles.container}>
        {this.notif()}
        <View style={styles.dataProfileContainer}>
          <TouchableOpacity onPress={() => this.handleBiodata()}>
            <View style={styles.profile}>
              <Image source={Images.biodata} style={styles.imageCategory} />
              <View style={styles.borderContainer}>
                <View style={styles.namaContainer}>
                  <Text style={styles.textNama}>
                    Biodata
                  </Text>
                </View>
                <Image source={Images.rightArrow} style={styles.rightArrow} />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handlenomerHape()}>
            <View style={[styles.profile]}>
              <Image source={Images.noHp} style={styles.imageCategory} />
              <View style={[styles.borderContainer]}>
                <View style={styles.namaContainer}>
                  <Text style={styles.textNama}>
                    Nomor Handphone
                  </Text>
                  {this.handleCekNoHp()}
                </View>
                <Image source={Images.rightArrow} style={styles.rightArrow} />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handleDataRekening()}>
            <View style={styles.profile}>
              <Image source={Images.rekening} style={styles.imageCategory} />
              <View style={styles.borderContainer}>
                <View style={styles.namaContainer}>
                  <Text style={styles.textNama}>
                    Rekening Bank
                  </Text>
                </View>
                <Image source={Images.rightArrow} style={styles.rightArrow} />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handleDataAlamat()}>
            <View style={styles.profile}>
              <Image source={Images.dataAlamat} style={styles.imageCategory} />
              <View style={styles.borderContainer}>
                <View style={styles.namaContainer}>
                  <Text style={styles.textNama}>
                    Data Alamat
                  </Text>
                </View>
                <Image source={Images.rightArrow} style={styles.rightArrow} />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handleGantiPassword()}>
            <View style={styles.profile}>
              <Image source={Images.gantiPassword} style={styles.imageCategory} />
              <View style={styles.borderContainer}>
                <View style={styles.namaContainer}>
                  <Text style={styles.textNama}>
                    Ganti Password
                  </Text>
                </View>
                <Image source={Images.rightArrow} style={styles.rightArrow} />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handlePengaturan()}>
            <View style={styles.profile}>
              <Image source={Images.pengaturanNotif} style={styles.imageCategory} />
              <View style={styles.borderContainer}>
                <View style={styles.namaContainer}>
                  <Text style={styles.textNama}>
                    Pengaturan Notifikasi
                  </Text>
                </View>
                <Image source={Images.rightArrow} style={styles.rightArrow} />
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={[styles.dataProfileContainer]}>
          <TouchableOpacity onPress={() => this.logout()}>
            <View style={styles.profile}>
              <Image source={Images.logout} style={styles.imageCategory} />
              <View style={styles.borderContainer}>
                <View style={styles.namaContainer}>
                  <Text style={styles.textNama}>
                    Logout
                  </Text>
                </View>
                <Image source={Images.rightArrow} style={styles.rightArrow} />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    dataProfile: state.profile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    stateLogin: (login) => dispatch(loginaction.stateLogin({login})),
    getProfile: (login) => dispatch(loginaction.getProfile()),
    logout: (login) => dispatch(loginaction.logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KelolaAkunScreenScreen)
