import React from 'react'
import { View, Text, TouchableOpacity, Image, AsyncStorage, BackAndroid } from 'react-native'
import { connect } from 'react-redux'
// const LoginManager = require('react-native').NativeModules.FBLoginManager
import * as loginaction from '../actions/user'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import * as addressAction from '../actions/address'
import * as bankAction from '../actions/bank'

// Styles
import styles from './Styles/KelolaAkunScreenStyle'

import { Images } from '../Themes'

class AccountManage extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      token: '',
      name: '' || this.props.dataProfile.user.user.name,
      email: '' || this.props.dataProfile.user.user.email,
      statusNoHp: '' || this.props.dataProfile.user.user.is_phone_verified,
      nomerHape: '' || this.props.dataProfile.user.user.phone_number,
      textStatusNoHP: 'Belum terverifikasi',
      notif: this.props.notif,
      pesanNotif: this.props.pesanNotif
    }
  }

  componentWillReceiveProps (nextProps) {
  }

  componentDidMount () {
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
    NavigationActions.cellphone({
      type: ActionConst.PUSH,
      statusVerifikasi: this.state.statusNoHp,
      nomerHape: this.state.nomerHape
    })
  }

  handleGantiPassword () {
    NavigationActions.changepassword({
      type: ActionConst.PUSH,
      statusVerifikasi: this.state.statusNoHp,
      nomerHape: this.state.nomerHape
    })
  }

  handleDataRekening () {
    this.props.getListRekening()
    NavigationActions.accountdata({
      type: ActionConst.PUSH,
      email: this.state.email,
      nomerHape: this.state.nomerHape
    })
  }

  handlePengaturan () {
    this.props.getNotificationUser()
    NavigationActions.notificationsetting({
      type: ActionConst.PUSH
    })
  }

  handleCekNoHp () {
    if (this.state.statusNoHp) {
      return (
        <View />
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
    this.props.getAlamat()
    NavigationActions.addressdata({
      type: ActionConst.PUSH,
      name: this.state.name,
      email: this.state.email
    })
  }

  notif () {
    if (this.state.notif) {
      return (
        <View style={styles.notif}>
          <Text style={styles.textNotif}>Sukses {this.state.pesanNotif}</Text>
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
          <TouchableOpacity onPress={() => this.handleBiodata()} style={styles.profile}>
            <Image source={Images.biodata} style={styles.imageCategory} />
            <View style={styles.borderContainer}>
              <View style={styles.namaContainer}>
                <Text style={styles.textNama}>
                  Biodata
                </Text>
              </View>
              <Image source={Images.rightArrow} style={styles.rightArrow} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.profile]}onPress={() => this.handlenomerHape()}>
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
          </TouchableOpacity>
          <TouchableOpacity style={styles.profile} onPress={() => this.handleDataRekening()}>
            <Image source={Images.rekening} style={styles.imageCategory} />
            <View style={styles.borderContainer}>
              <View style={styles.namaContainer}>
                <Text style={styles.textNama}>
                  Rekening Bank
                </Text>
              </View>
              <Image source={Images.rightArrow} style={styles.rightArrow} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.profile} onPress={() => this.handleDataAlamat()}>
            <Image source={Images.dataAlamat} style={styles.imageCategory} />
            <View style={styles.borderContainer}>
              <View style={styles.namaContainer}>
                <Text style={styles.textNama}>
                  Data Alamat
                </Text>
              </View>
              <Image source={Images.rightArrow} style={styles.rightArrow} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.profile} onPress={() => this.handleGantiPassword()}>
            <Image source={Images.gantiPassword} style={styles.imageCategory} />
            <View style={styles.borderContainer}>
              <View style={styles.namaContainer}>
                <Text style={styles.textNama}>
                  Ganti Password
                </Text>
              </View>
              <Image source={Images.rightArrow} style={styles.rightArrow} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.profile} onPress={() => this.handlePengaturan()}>
            <Image source={Images.pengaturanNotif} style={styles.imageCategory} />
            <View style={[styles.borderContainer, {borderBottomWidth: 0}]}>
              <View style={styles.namaContainer}>
                <Text style={styles.textNama}>
                  Pengaturan Notifikasi
                </Text>
              </View>
              <Image source={Images.rightArrow} style={styles.rightArrow} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={[styles.dataProfileContainer]}>
          <TouchableOpacity style={styles.profile} onPress={() => this.logout()}>
            <Image source={Images.logout} style={styles.imageCategory} />
            <View style={[styles.borderContainer, {borderBottomWidth: 0}]}>
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

}

const mapStateToProps = (state) => {
  return {
    dataProfile: state.profile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    stateLogin: (login) => dispatch(loginaction.stateLogin({login})),
    logout: (login) => dispatch(loginaction.logout()),
    getAlamat: () => dispatch(addressAction.getListAddress()),
    getListRekening: () => dispatch(bankAction.getBankAccounts()),
    getNotificationUser: () => dispatch(loginaction.getNotifSettings())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountManage)
