import React from 'react'
import { ScrollView, Text, View, TouchableOpacity, Image, Modal, ListView } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import * as bankAction from '../actions/bank'
import * as userAction from '../actions/user'

import { Colors, Fonts, Images } from '../Themes/'

import styles from './Styles/DataRekeningScreenStyle'

class AccountData extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      listBank: [],
      deletRekening: false,
      statusDot: false,
      name: this.props.name,
      email: this.props.email,
      nomerHape: this.props.nomerHape,
      rowTerpilih: '',
      idBankAccount: '',
      notif: false,
      pesanNotif: this.props.pesanNotif,
      callback: false
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataRekenings.status === 200) {
      this.setState({
        listBank: nextProps.dataRekenings.listBankAccounts
      })
    }
    if (nextProps.callback !== undefined) {
      if (nextProps.callback !== this.state.callback) {
        this.setState({
          callback: nextProps.callback,
          pesanNotif: nextProps.pesanNotif,
          notif: true
        })
      }
    }
  }

  componentDidMount () {
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

  handleCreateAccount () {
    console.log(this.state.nomerHape)
    NavigationActions.addaccount({
      type: ActionConst.PUSH,
      title: 'Tambah Data Rekening',
      titles: 'Tambah Data Rekening',
      phoneNumber: this.state.nomerHape,
      titleButton: 'Verifikasi kode OTP',
      typeVerifikasi: 'otptambahrekening'
    })
    this.setState({
      notif: false
    })
  }

  handleEditAccount (id) {
    this.setState({statusDot: false})
    this.props.getBankAccounts(id)
    NavigationActions.addaccount({
      type: ActionConst.PUSH,
      edit: true,
      loading: true,
      idAccount: id,
      title: 'Edit Data Rekening',
      phoneNumber: this.state.nomerHape,
      titles: 'Edit Data Rekening',
      titleButton: 'Simpan Rekening',
      typeVerifikasi: 'verificationeditaccount'
    })
  }

  handleDeleteAccount () {
    this.setState({deletRekening: false})
    this.props.sendOtpBank()
    NavigationActions.otpcode({
      type: ActionConst.PUSH,
      idBank: this.state.idBankAccount,
      fieldPass: this.state.nomerHape,
      textButton: 'Verifikasi kode OTP',
      title: 'Hapus Data Rekening',
      typeVerifikasi: 'verificationdeleteaccount',
      callback: this.state.callback
    })
  }

  modalConfrimdeletRekening () {
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.deletRekening}
        onRequestClose={() => this.setState({ deletRekening: false })}
        >
        <View style={styles.bgModal}>
          <View style={styles.contaierModal}>
            <Text style={styles.titleModal}>Anda yakin akan menghapus{'\n'}rekening tersebut?</Text>
            <TouchableOpacity style={styles.verifikasiButton} onPress={() => this.handleDeleteAccount()}>
              <Text style={styles.textVerifikasiButton}>Ya, Hapus Rekening</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.batalButton} onPress={() => this.setState({deletRekening: false})}>
              <Text style={styles.textBatalButton}>Batal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }

  containerEdit (i, id) {
    if (this.state.statusDot && this.state.rowTerpilih === i) {
      return (
        <View elevation={5} style={styles.edit}>
          <TouchableOpacity style={styles.touch} onPress={() => this.handleEditAccount(id)}>
            <Text style={styles.textEdit}>Edit</Text>
          </TouchableOpacity>
          <View style={styles.border} />
          <TouchableOpacity style={styles.touch} onPress={() => this.setState({deletRekening: true, statusDot: false})}>
            <Text style={styles.textEdit}>Hapus</Text>
          </TouchableOpacity>
        </View>
      )
    }
    return (
      <View />
    )
  }

  renderRowBank (rowData, sectionId, rowId) {
    if (rowData !== null) {
      return (
        <TouchableOpacity activeOpacity={100} onPress={() => this.setState({statusDot: false})}>
          <View style={styles.headerInfoAlamat}>
            <View style={{flex: 1}}>
              <Image source={{uri: rowData.bank.logo}} style={{width: 66.6, height: 35}} resizeMode={'contain'} />
            </View>
            <TouchableOpacity onPress={() => this.setState({statusDot: true, rowTerpilih: rowId, idBankAccount: rowData.id})}>
              <Image source={Images.threeDotSilver} style={styles.imageDot} />
            </TouchableOpacity>
          </View>
          <View style={styles.dataInfoAlamat}>
            <Text style={[styles.textHeader, {fontFamily: Fonts.type.semiBolds}]}>Pemilik Akun</Text>
            <Text style={styles.textHeader2}>{rowData.holder_name}</Text>
            <Text style={[styles.textHeader, {fontFamily: Fonts.type.semiBolds}]}>Nomor Rekening</Text>
            <Text style={styles.textHeader2}>{rowData.holder_account_number}</Text>
            <Text style={[styles.textHeader, {fontFamily: Fonts.type.semiBolds}]}>Nama Bank</Text>
            <Text style={styles.textHeader2}>{rowData.bank.name}</Text>
            <Text style={[styles.textHeader, {fontFamily: Fonts.type.semiBolds}]}>Cabang Bank</Text>
            <Text style={styles.textHeader2}>{rowData.bank_branch_office_name}</Text>
          </View>
          {this.containerEdit(rowId, rowData.id)}
          <View style={{backgroundColor: Colors.paleGrey, height: 24.4}} />
        </TouchableOpacity>
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
        <ScrollView>
          <View style={styles.infoAlamat}>
            <ListView
              dataSource={this.dataSource.cloneWithRows(this.state.listBank)}
              renderRow={this.renderRowBank.bind(this)}
              enableEmptySections
            />
            {this.modalConfrimdeletRekening()}
          </View>
        </ScrollView>
        <TouchableOpacity style={styles.create} onPress={() => this.handleCreateAccount()}>
          <View elevation={9}>
            <Image source={Images.tambahWhite} style={styles.imageTambah} />
          </View>
        </TouchableOpacity>
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    dataRekenings: state.listBankAccounts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendOtpBank: () => dispatch(userAction.sendOTPBank()),
    getBankAccounts: (id) => dispatch(bankAction.getBankAccountDetail({id: id}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountData)
