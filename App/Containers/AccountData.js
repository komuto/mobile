import React from 'react'
import { ScrollView, Text, View, TouchableOpacity, Image, Modal, ListView } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import * as bankAction from '../actions/bank'

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
      notif: this.props.notif,
      pesanNotif: this.props.pesanNotif
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataRekenings.status === 200) {
      this.setState({
        listBank: nextProps.dataRekenings.listBankAccounts
      })
      console.log(nextProps.dataRekenings.listBankAccounts)
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

  handleCreateRekening () {
    NavigationActions.addaccount({
      type: ActionConst.PUSH,
      name: this.state.name,
      email: this.state.email,
      nomerHape: this.state.nomerHape,
      titleButton: 'Tambah Rekening Baru'
    })
  }

  handlleEditRekening (id, norek) {
    this.setState({statusDot: false})
    this.props.getBankAccounts(id)
    NavigationActions.addaccount({
      type: ActionConst.PUSH,
      edit: true,
      idRekening: id,
      name: this.state.name,
      email: this.state.email,
      nomerHape: this.state.nomerHape,
      titleButton: 'Simpan Rekening',
      title: 'Edit Data Rekening',
      loading: true
    })
  }

  handleDeleteRekening () {
    this.setState({deletRekening: false})
    this.props.deleteBankAccount(this.state.idBankAccount)
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
            <TouchableOpacity style={styles.verifikasiButton} onPress={() => this.handleDeleteRekening()}>
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
          <TouchableOpacity style={styles.touch} onPress={() =>
            this.handlleEditRekening(id)}>
            <Text style={styles.textEdit}>Edit</Text>
          </TouchableOpacity>
          <View style={styles.border} />
          <TouchableOpacity style={styles.touch} onPress={() => this.setState({deletRekening: true, idBankAccount: id, statusDot: false})}>
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
        <View>
          <View style={styles.headerInfoAlamat}>
            <Image source={{uri: rowData.bank.logo}} style={{flex: 1, width: 66.6, height: 35}} />
            <TouchableOpacity onPress={() => this.setState({statusDot: true, rowTerpilih: rowId})}>
              <Image source={Images.threeDotSilver} style={styles.imageDot} />
            </TouchableOpacity>
          </View>
          {this.containerEdit(rowId, rowData.id)}
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
          <View style={{backgroundColor: Colors.paleGrey, height: 24.4}} />
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
        <TouchableOpacity style={styles.create} onPress={() => this.handleCreateRekening()}>
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
    deleteBankAccount: (id) => dispatch(bankAction.deleteBankAccount({id})),
    getBankAccounts: (id) => dispatch(bankAction.getBankAccounts({id}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountData)
