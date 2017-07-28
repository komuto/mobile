import React from 'react'
import { ScrollView, Text, View, TouchableOpacity, Image, Modal } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import * as bankAction from '../actions/bank'

import { Colors, Fonts, Images } from '../Themes/'

import styles from './Styles/DataRekeningScreenStyle'

class DataRekeningScreenScreen extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      listBank: [],
      list: [],
      deletRekening: false,
      statusDot: false,
      name: this.props.name,
      email: this.props.email,
      nomerHape: this.props.nomerHape,
      rowTerpilih: '',
      idDelete: '',
      notif: this.props.notif,
      pesanNotif: this.props.pesanNotif
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataRekening.status === 200) {
      this.setState({
        list: nextProps.dataRekening.listBankAccounts,
        listBank: nextProps.dataRekening.listBankAccounts
      })
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
    NavigationActions.tambahrekening({
      type: ActionConst.PUSH,
      name: this.state.name,
      email: this.state.email,
      nomerHape: this.state.nomerHape,
      titleButton: 'Tambah Rekening Baru'
    })
  }

  handlleEditRekening (id) {
    console.log(id)
    this.setState({statusDot: false})
    this.props.getDetailRekening(id)
    NavigationActions.tambahrekening({
      type: ActionConst.PUSH,
      edit: true,
      idRekening: id,
      name: this.state.name,
      email: this.state.email,
      nomerHape: this.state.nomerHape,
      titleButton: 'Simpan Alamat',
      title: 'Edit Data Rekening',
      loading: true
    })
  }

  handleDeleteRekening () {
    this.setState({deletRekening: false})
    // this.props.deleteAddress(this.state.idDelete)
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

  containerEdit (i, idAlamat) {
    if (this.state.statusDot && this.state.rowTerpilih === i) {
      return (
        <View elevation={5} style={styles.edit}>
          <TouchableOpacity style={styles.touch} onPress={() =>
            this.handlleEditRekening(idAlamat)}>
            <Text style={styles.textEdit}>Edit</Text>
          </TouchableOpacity>
          <View style={styles.border} />
          <TouchableOpacity style={styles.touch} onPress={() => this.setState({deletRekening: true, idDelete: idAlamat, statusDot: false})}>
            <Text style={styles.textEdit}>Hapus</Text>
          </TouchableOpacity>
        </View>
      )
    }
    return (
      <View />
    )
  }

  mapingRekening () {
    const { listBank } = this.state
    const mapparent = listBank.map((data, i) =>
    (<View key={i} >
      <View style={styles.headerInfoAlamat}>
        <Image source={{uri: data.bank.logo}} style={{flex: 1, width: 66.6, height: 35}} />
        <TouchableOpacity onPress={() => this.setState({statusDot: true, rowTerpilih: i})}>
          <Image source={Images.threeDotSilver} style={styles.imageDot} />
        </TouchableOpacity>
      </View>
      {this.containerEdit(i, data.id)}
      <View style={styles.dataInfoAlamat}>
        <Text style={[styles.textHeader, {fontFamily: Fonts.type.semiBolds}]}>Pemilik Akun</Text>
        <Text style={styles.textHeader2}>{data.holder_name}</Text>
        <Text style={[styles.textHeader, {fontFamily: Fonts.type.semiBolds}]}>Nomor Rekening</Text>
        <Text style={styles.textHeader2}>{data.holder_account_name}</Text>
        <Text style={[styles.textHeader, {fontFamily: Fonts.type.semiBolds}]}>Nama Bank</Text>
        <Text style={styles.textHeader2}>{data.bank.name}</Text>
        <Text style={[styles.textHeader, {fontFamily: Fonts.type.semiBolds}]}>Cabang Bank</Text>
        <Text style={styles.textHeader2}>{data.bank_branch_office_name}</Text>
      </View>
      <View style={{backgroundColor: Colors.paleGrey, height: 24.4}} />
    </View>
    ))
    return (
      <View>
        {mapparent}
      </View>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        {this.notif()}
        <ScrollView>
          <View style={styles.infoAlamat}>
            {this.mapingRekening()}
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
    dataRekening: state.listBankAccounts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // deleteAddress: (id) => dispatch(addressAction.deleteAddress({id})),
    // getAlamat: () => dispatch(addressAction.getListAddress()),
    getDetailRekening: (id) => dispatch(bankAction.getDetailBankAccounts({id}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataRekeningScreenScreen)
