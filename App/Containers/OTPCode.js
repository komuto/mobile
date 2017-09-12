import React from 'react'
import { Text, View, TextInput, TouchableOpacity, Modal, ActivityIndicator, Image, ToastAndroid } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import * as userAction from '../actions/user'
import * as bankAction from '../actions/bank'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// styles
import styles from './Styles/OTPCodeScreenStyle'
import { Images } from '../Themes'

class OTPCode extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      fieldPass: this.props.fieldPass,
      typeVerifikasi: this.props.typeVerifikasi,
      code1: '',
      code2: '',
      code3: '',
      code4: '',
      code5: '',
      focusCode1: true,
      focusCode2: false,
      focusCode3: false,
      focusCode4: false,
      focusCode5: false,
      vefifikasiModal: false,
      codeOtp: [],
      idAccount: this.props.idAccount,
      email: this.props.email,
      namaPemilik: this.props.nameAccount,
      nomerRek: this.props.nomerRek,
      idBank: this.props.idBank,
      namaCabang: this.props.cabangBank,
      loading: false,
      textButton: this.props.textButton || 'Verifikasi Nomor Telepon'
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataOTP.status === 200 && nextProps.typeVerifikasi === 'verifikasiKelolatelepon') {
      this.setState({loading: false})
      this.props.getProfile()
      NavigationActions.cellphone({
        type: ActionConst.REPLACE,
        statusVerifikasi: 'true',
        gantiNoHape: 'false',
        nomerHape: this.state.fieldPass
      })
      nextProps.dataOTP.status = 0
    } if (nextProps.dataOTP.status === 200 && nextProps.typeVerifikasi === 'verifikasitelepon') {
      this.setState({loading: false, vefifikasiModal: true})
      this.props.getProfile()
      nextProps.dataOTP.status = 0
    } if (nextProps.deleteAccount.status === 200 && nextProps.typeVerifikasi === 'verificationdeleteaccount') {
      this.setState({loading: false})
      this.props.getListRekening()
      NavigationActions.accountdata({
        type: ActionConst.RESET,
        notif: true,
        pesanNotif: 'menghapus rekening'
      })
      nextProps.deleteAccount.status = 0
    } if (nextProps.createRek.status === 200 && nextProps.typeVerifikasi === 'otptambahrekening') {
      this.setState({loading: false})
      this.props.getListRekening()
      NavigationActions.accountdata({
        type: ActionConst.RESET,
        notif: true,
        pesanNotif: 'menambah rekening'
      })
      nextProps.createRek.status = 0
    } if (nextProps.createRek.status === 200 && nextProps.typeVerifikasi === 'verificationeditaccount') {
      this.setState({loading: false})
      this.props.getListRekening()
      NavigationActions.accountdata({
        type: ActionConst.RESET,
        notif: true,
        pesanNotif: 'mengubah rekening'
      })
      nextProps.createRek.status = 0
    }
    if (nextProps.createRek.status === 200 && nextProps.typeVerifikasi === 'newaccountbalance') {
      ToastAndroid.show('Rekening berhasil ditambah..', ToastAndroid.LONG)
      this.setState({loading: false})
      NavigationActions.popTo('balancepull')
      this.props.getListRekening()
      nextProps.dataOTP.status = 0
    }
  }

  componentDidUpdate () {
    if (this.refs[this.state.nextField]) {
      this.refs[this.state.nextField].focus()
    }
  }

  handleVerifikasi () {
    this.setState({vefifikasiModal: false})
    NavigationActions.infostore({
      type: ActionConst.PUSH,
      createStores: true,
      textButton: 'lanjutkan'
    })
  }

  modalVerifikasiSukses () {
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.vefifikasiModal}
        onRequestClose={() => this.setState({ vefifikasiModal: false })}
        >
        <View style={styles.bgModal}>
          <View style={styles.contaierModal}>
            <Image source={Images.hpVerify} style={{height: 172, width: 172}} />
            <Text style={styles.titleModal}>Nomor Telepon Telah Terverifikasi</Text>
            <Text style={styles.descModal}>
              Nomor Telepon telah terverifikasi{'\n'}kini Anda bisa melanjutkan proses{'\n'}aktivasi toko Anda
            </Text>
            <TouchableOpacity style={styles.verifikasiButton} onPress={() => this.handleVerifikasi()}>
              <Text style={styles.textVerifikasiButton}>Lanjutkan Proses Aktivasi Toko</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }

  renderOTP () {
    const {fieldPass, textButton} = this.state
    return (
      <View>
        <Text style={styles.title}>Silahkan menuliskan kode verifikasi yang telah{'\n'}kami kirim ke {fieldPass}</Text>
        <View style={styles.containerCodeStyle}>
          <View>
            <TextInput
              autoFocus
              keyboardType='numeric'
              maxLength={1}
              returnKeyType='next'
              underlineColorAndroid='transparent'
              value={this.state.code1}
              style={styles.codeStyle}
              blurOnSubmit={false}
              onChange={(event) =>
                this.setState({
                  code1: event.nativeEvent.text,
                  nextField: 2
                })
              }
            />
          </View>
          <View>
            <TextInput
              ref='2'
              underlineColorAndroid='transparent'
              keyboardType='numeric'
              maxLength={1}
              returnKeyType='next'
              value={this.state.code2}
              style={styles.codeStyle}
              blurOnSubmit={false}
              onChange={(event) =>
                this.setState({
                  code2: event.nativeEvent.text,
                  nextField: 3
                })
              }
            />
          </View>
          <View>
            <TextInput
              ref='3'
              underlineColorAndroid='transparent'
              keyboardType='numeric'
              maxLength={1}
              returnKeyType='next'
              value={this.state.code3}
              style={styles.codeStyle}
              blurOnSubmit={false}
              onChange={(event) =>
                this.setState({
                  code3: event.nativeEvent.text,
                  nextField: 4
                })
              }
            />
          </View>
          <View>
            <TextInput
              ref='4'
              underlineColorAndroid='transparent'
              keyboardType='numeric'
              maxLength={1}
              returnKeyType='next'
              value={this.state.code4}
              style={styles.codeStyle}
              blurOnSubmit={false}
              onChange={(event) =>
                this.setState({
                  code4: event.nativeEvent.text,
                  nextField: 5
                })
              }
            />
          </View>
          <View>
            <TextInput
              ref='5'
              underlineColorAndroid='transparent'
              keyboardType='numeric'
              maxLength={1}
              returnKeyType='next'
              value={this.state.code5}
              style={styles.codeStyle}
              blurOnSubmit={false}
              onChange={(event) =>
                this.setState({
                  code5: event.nativeEvent.text
                })
              }
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => this.verify()}
          style={styles.buttonLogin}
        >
          <Text style={styles.textButtonLogin}>
            {textButton}
          </Text>
        </TouchableOpacity>
        <View style={styles.containerBanner}>
          <Text style={styles.textBanner}>
            Belum menerima kode aktifasi
          </Text>
          <TouchableOpacity onPress={() => this.sendCode()}>
            <Text style={styles.textLogin}> Klik Disini</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  verify () {
    const { typeVerifikasi } = this.state
    if (typeVerifikasi === 'verifikasitelepon') {
      this.setState({loading: true})
      let tempOTp = this.state.code1 + this.state.code2 + this.state.code3 + this.state.code4 + this.state.code5
      this.props.verifyOtp(tempOTp)
    } else if (typeVerifikasi === 'verifikasiKelolatelepon') {
      this.setState({loading: true})
      let tempOTp = this.state.code1 + this.state.code2 + this.state.code3 + this.state.code4 + this.state.code5
      this.props.verifyOtp(tempOTp)
    } else if (typeVerifikasi === 'otptambahrekening') {
      this.setState({loading: true})
      let tempOTp = this.state.code1 + this.state.code2 + this.state.code3 + this.state.code4 + this.state.code5
      this.props.createRekening(
        tempOTp,
        this.state.idBank,
        this.state.namaPemilik,
        this.state.nomerRek,
        this.state.namaCabang
      )
    } else if (typeVerifikasi === 'verificationeditaccount') {
      this.setState({loading: true})
      let tempOTp = this.state.code1 + this.state.code2 + this.state.code3 + this.state.code4 + this.state.code5
      this.props.updateAccount(
        this.state.idAccount,
        tempOTp,
        this.state.idBank,
        this.state.namaPemilik,
        this.state.nomerRek,
        this.state.namaCabang
      )
    } else if (typeVerifikasi === 'verificationdeleteaccount') {
      this.setState({loading: true})
      let tempOTp = this.state.code1 + this.state.code2 + this.state.code3 + this.state.code4 + this.state.code5
      this.props.deleteAccounts(
        tempOTp,
        this.state.idBank
      )
    } else if (typeVerifikasi === 'newaccountbalance') {
      this.setState({loading: true})
      let tempOTp = this.state.code1 + this.state.code2 + this.state.code3 + this.state.code4 + this.state.code5
      this.props.createRekening(
        tempOTp,
        this.state.idBank,
        this.state.namaPemilik,
        this.state.nomerRek,
        this.state.namaCabang
      )
    }
  }

  sendCode () {
    const { typeVerifikasi } = this.state
    if (typeVerifikasi === 'verifikasitelepon') {
      this.props.sentOTPCode()
    } else if (typeVerifikasi === 'verifikasiKelolatelepon') {
      this.props.sentOTPCode()
    } else if (typeVerifikasi === 'otptambahrekening') {
      this.props.sendOtpEmail()
    } else if (typeVerifikasi === 'verificationeditaccount') {
      this.props.sendOtpEmail()
    } else if (typeVerifikasi === 'verificationdeleteaccount') {
      this.props.sendOtpEmail()
    } else if (typeVerifikasi === 'newaccountbalance') {
      this.props.sentOTPCode()
    }
  }

  render () {
    const spinner = this.state.loading
    ? (<View style={styles.spinner}>
      <ActivityIndicator color='white' size='large' />
    </View>) : (<View />)
    return (
      <View style={styles.container}>
        {this.renderOTP()}
        {this.modalVerifikasiSukses()}
        {spinner}
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    dataOTP: state.verifyPhone,
    createRek: state.bankAccount,
    deleteAccount: state.bankAccount
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    verifyOtp: (otp) => dispatch(userAction.verifyPhone({code: otp})),
    sentOTPCode: () => dispatch(userAction.sendOTPPhone()),
    sendOtpEmail: () => dispatch(userAction.sendOTPBank()),
    createRekening: (code, idBank, namaPemilik, nomerRek, namaCabang) =>
    dispatch(bankAction.addBankAccount({
      code: code,
      master_bank_id: idBank,
      holder_name: namaPemilik,
      holder_account_number: nomerRek,
      bank_branch_office_name: namaCabang
    })),
    updateAccount: (id, code, idBank, namaPemilik, nomerRek, namaCabang) =>
    dispatch(bankAction.updateBankAccount({
      id: id,
      code: code,
      master_bank_id: idBank,
      holder_name: namaPemilik,
      holder_account_number: nomerRek,
      bank_branch_office_name: namaCabang
    })),
    deleteAccounts: (code, id) => dispatch(bankAction.deleteBankAccount({code: code, id: id})),
    getListRekening: () => dispatch(bankAction.getBankAccounts()),
    getProfile: (login) => dispatch(userAction.getProfile())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OTPCode)
