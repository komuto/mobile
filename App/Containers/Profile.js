import React from 'react'
import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  ToastAndroid,
  Modal
} from 'react-native'
import Spinner from '../Components/Spinner'
import { MaskService } from 'react-native-masked-text'
// const LoginManager = require('react-native').NativeModules.FBLoginManager
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import * as loginaction from '../actions/user'
import * as storeAction from '../actions/stores'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ProfileStyle'

// Images
import { Images, Colors } from '../Themes'

class Profile extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      token: '',
      nama: '',
      saldo: '0',
      status: '',
      email: '',
      foto: 'default',
      isLogin: this.props.datalogin.login,
      vefifikasiModal: false,
      namaToko: 'Toko',
      fotoToko: null,
      statusToko: '',
      verifyNoHp: '',
      nomerHape: '',
      loading: false,
      isStoreVerify: true,
      createStoresAt: '',
      verificationTime: 0
    }
  }

  componentWillReceiveProps (nextProps) {
    if (!nextProps.datalogin.login) {
      this.setState({
        isLogin: false
      })
    } else if (nextProps.dataProfile.status === 200) {
      this.setState({
        isLogin: true,
        nama: nextProps.dataProfile.user.user.name,
        saldo: String(nextProps.dataProfile.user.user.saldo_wallet),
        foto: nextProps.dataProfile.user.user.photo || 'default',
        status: nextProps.dataProfile.verifyStatus,
        email: nextProps.dataProfile.user.user.email,
        verifyNoHp: nextProps.dataProfile.user.user.is_phone_verified,
        nomerHape: nextProps.dataProfile.user.user.phone_number,
        namaToko: nextProps.dataProfile.user.store.name,
        fotoToko: nextProps.dataProfile.user.store.logo,
        statusToko: nextProps.dataProfile.user.store.status,
        isStoreVerify: nextProps.dataProfile.user.store.is_verified,
        createStoresAt: nextProps.dataProfile.user.store.created_at,
        verificationTime: nextProps.dataProfile.user.store.verification_left
      })
    } else if (nextProps.dataProfile.status !== 200 && nextProps.dataProfile.status !== 0) {
      ToastAndroid.show(nextProps.dataProfile.message, ToastAndroid.LONG)
    }
    if (nextProps.dataResendVerification.status === 200) {
      this.setState({
        loading: false
      })
      ToastAndroid.show(
        'Link verifikasi berhasil dikirimkan.. Silakan cek email ' +
        this.state.email + ' untuk melakukan verifikasi',
        ToastAndroid.LONG
      )
      nextProps.dataResendVerification.status = 0
    } else if (nextProps.dataResendVerification.status !== 200 && nextProps.dataResendVerification.status !== 0) {
      this.setState({
        loading: false
      })
      ToastAndroid.show('Terjadi kesalahan ' + nextProps.dataResendVerification.message, ToastAndroid.LONG)
      nextProps.dataResendVerification.status = 0
    }
  }

  componentDidMount () {
    if (this.state.isLogin) {
      this.props.getProfile()
    }
  }

  login () {
    NavigationActions.login({ type: ActionConst.PUSH })
  }

  register () {
    NavigationActions.register({ type: ActionConst.PUSH })
  }

  resend () {
    this.setState({
      loading: true
    })
    this.props.resendVerification()
  }

  renderStatus () {
    const { status, loading } = this.state
    let renderButton
    if (!loading) {
      renderButton = (
        <TouchableOpacity style={styles.buttonVerifikasi} onPress={() => this.resend()}>
          <Text style={styles.textButtonVerifikasi}>
            Kirim Ulang link verifikasi
          </Text>
        </TouchableOpacity>
      )
    } else {
      renderButton = (
        <View style={styles.buttonVerifikasi}>
          <Spinner color={Colors.orange} />
        </View>
      )
    }
    if (status === 0) {
      return (
        <View style={styles.verifikasiContainer}>
          <View style={styles.emailContainer}>
            <Image
              source={Images.email}
              style={styles.imageEmail}
            />
          </View>
          <View style={styles.pesanContainer}>
            <Text multiline style={styles.verifikasi}>
              Verifikasikan email untuk mengakses{'\n'}semua menu
            </Text>
            <Text multiline style={styles.klikLink}>
              Silahkan klik link verifikasi yang telah kami {'\n'}
              kirimkan ke {this.state.email}
            </Text>
            {renderButton}
          </View>
        </View>
      )
    }
  }

  renderFoto () {
    if (this.state.foto !== 'default') {
      return (
        <Image
          source={{ uri: this.state.foto }}
          style={styles.styleFoto}
        />
      )
    }
    return (
      <Image
        source={Images.defaultprofile}
        style={styles.styleFotoDefault}
      />
    )
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
          {/* <View style={styles.welcome2Container}>
            <Text style={styles.welcome2Text}>
              Terima Kasih, Anda telah berhasil melakukan { '\n' }
              pembelian Token Listrik. Untuk melihat Token { '\n' }
              silahkan menuju bagian Transaksi
            </Text>
          </View> */}
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
        {this.renderStatus()}
        <View style={styles.profileContainer}>
          <View style={styles.dataProfileContainer}>
            <TouchableOpacity onPress={() => this.handleKelolaAkun()} style={styles.profile}>
              {this.renderFoto()}
              <View style={styles.namaContainer}>
                <Text style={styles.textNama}>
                  {this.state.nama}
                </Text>
                <Text style={styles.textKelola}>
                  Kelola Akun
                </Text>
              </View>
              {this.verifikasiNoHp()}
              <Image source={Images.rightArrow} style={styles.rightArrow} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.profile, {marginBottom: 1}]}
              onPress={() => this.saldo()}
            >
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
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handleListFavStore()} style={[styles.profile, {borderBottomWidth: 0}]}>
              <Image source={Images.daftar} style={styles.imageCategory} />
              <View style={styles.namaContainer}>
                <Text style={styles.textNama}>
                  Daftar Toko Favorit
                </Text>
              </View>
              <Image source={Images.rightArrow} style={styles.rightArrow} />
            </TouchableOpacity>
          </View>
        </View>
        {this.rernderToko()}
        {this.modalVerifikasiNoTelepon()}
      </View>
    )
  }

  verifikasiNoHp () {
    if (!this.state.verifyNoHp) {
      return (
        <View style={styles.notifContainer}>
          <Text style={styles.notif}>
            !
          </Text>
        </View>
      )
    } else {
      return (
        <View />
      )
    }
  }

  handleKelolaAkun () {
    NavigationActions.accountmanage({
      type: ActionConst.PUSH
    })
  }

  saldo () {
    NavigationActions.balance({
      type: ActionConst.PUSH
    })
  }

  handleListFavStore () {
    NavigationActions.listfavoritestores({
      type: ActionConst.PUSH
    })
  }

  modalVerifikasiNoTelepon () {
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.vefifikasiModal}
        onRequestClose={() => this.setState({ vefifikasiModal: false })}
        >
        <View style={styles.bgModal}>
          <View style={styles.contaierModal}>
            <Image source={Images.noHpNotVerify} style={{height: 172, width: 172}} />
            <Text style={styles.titleModal}>Anda Belum Memverifikasi{'\n'}Nomor Telepon</Text>
            <Text style={styles.descModal}>
              Verifikasi Nomor Telepon Anda terlebih{'\n'}dahulu untuk melanjutkan proses{'\n'}membuka toko
            </Text>
            <TouchableOpacity style={styles.verifikasiButton} onPress={() => this.handleBukaToko()}>
              <Text style={styles.textVerifikasiButton}>Verifikasi Sekarang</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.batalButton} onPress={() => this.setState({vefifikasiModal: false})}>
              <Text style={styles.textBatalButton}>Batal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }

  rernderToko () {
    if (this.state.statusToko === 1) {
      return (
        <View style={styles.dataProfileContainer}>
          <TouchableOpacity onPress={() => this.handleCekNoHp()}>
            <View style={[styles.profile, {borderBottomWidth: 0}]}>
              <View style={{borderRadius: 200, backgroundColor: Colors.paleGreyFive}}>
                <Image source={{uri: this.state.fotoToko}} style={[styles.styleFoto]} />
              </View>
              <View style={styles.namaContainer}>
                <Text style={styles.textNama}>
                  {this.state.namaToko}
                </Text>
                <Text style={styles.textKelola}>
                  Kelola Toko Anda
                </Text>
              </View>
              <Image source={Images.rightArrow} style={styles.rightArrow} />
            </View>
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <View style={styles.dataProfileContainer}>
          <TouchableOpacity onPress={() => this.handleCekNoHp()}>
            <View style={[styles.profile, {borderBottomWidth: 0}]}>
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
      )
    }
  }

  handleCekNoHp () {
    if (this.state.verifyNoHp) {
      if (this.state.statusToko === 1) {
        NavigationActions.storedashboard({
          type: ActionConst.PUSH,
          title: 'Toko Anda',
          isStoreVerify: this.state.isStoreVerify,
          createStoresAt: this.state.createStoresAt,
          verificationTime: this.state.verificationTime
        })
        this.props.getUnreadDispute()
      } else {
        NavigationActions.infostore({
          type: ActionConst.PUSH,
          createStores: true,
          textButton: 'Lanjutkan'
        })
      }
    } else {
      this.setState({ vefifikasiModal: true })
    }
  }

  handleBukaToko () {
    this.props.sentOTP()
    this.setState({vefifikasiModal: false})
    NavigationActions.otpcode({
      type: ActionConst.PUSH,
      title: 'Verifikasi Nomor Telepon',
      fieldPass: this.state.nomerHape,
      typeVerifikasi: 'verifikasitelepon'
    })
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
    stateLogin: (login) => dispatch(loginaction.stateLogin({login})),
    getProfile: (login) => dispatch(loginaction.getProfile()),
    logout: (login) => dispatch(loginaction.logout()),
    sentOTP: () => dispatch(loginaction.sendOTPPhone()),
    resendVerification: () => dispatch(loginaction.resendSignup()),
    getUnreadDispute: () => dispatch(storeAction.getUnreadDisputeStore())
  }
}

const mapStateToProps = (state) => {
  return {
    datalogin: state.isLogin,
    dataProfile: state.profile,
    dataOTP: state.sendOTPPhone,
    dataResendVerification: state.alterUser
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
