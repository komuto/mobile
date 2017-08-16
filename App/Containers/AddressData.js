import React from 'react'
import { ScrollView, Text, View, TouchableOpacity, Image, Modal } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import * as addressAction from '../actions/address'
import { Colors, Fonts, Images } from '../Themes/'

// Styles
import styles from './Styles/DataAlamatScreenStyle'

class AddressData extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      listAlamat: [],
      deletAlamat: false,
      statusDot: false,
      name: this.props.name,
      email: this.props.email,
      rowTerpilih: '',
      idDelete: '',
      notif: this.props.notif,
      pesanNotif: this.props.pesanNotif
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataAlamats.status === 200 || nextProps.dataAlamats.status === 0) {
      this.setState({
        listAlamat: nextProps.dataAlamats.address
      })
      nextProps.dataAlamats.status = 0
    }
    if (nextProps.dataDeletAlamat.status === 200) {
      this.props.getAlamat()
      this.setState({
        notif: true,
        pesanNotif: 'Berhasil menghapus Alamat'
      })
      nextProps.dataDeletAlamat.status = 0
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

  handleCreateAlamat () {
    NavigationActions.addaddress({
      type: ActionConst.PUSH,
      name: this.state.name,
      email: this.state.email,
      titleButton: 'Buat Alamat Baru'
    })
  }

  handlleEditAlamat (idAlamat) {
    console.log(idAlamat)
    this.setState({statusDot: false})
    this.props.getDetailAlamat(idAlamat)
    NavigationActions.addaddress({
      type: ActionConst.PUSH,
      edit: true,
      idAlamat: idAlamat,
      name: this.state.name,
      email: this.state.email,
      titleButton: 'Simpan Alamat'
    })
  }

  handleDeleteAlamat () {
    this.setState({deletAlamat: false})
    this.props.deleteAddress(this.state.idDelete)
  }

  modalConfrimDeletAlamat () {
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.deletAlamat}
        onRequestClose={() => this.setState({ deletAlamat: false })}
        >
        <View style={styles.bgModal}>
          <View style={styles.contaierModal}>
            <Text style={styles.titleModal}>Anda yakin akan menghapus{'\n'}Alamat tersebut?</Text>
            <TouchableOpacity style={styles.verifikasiButton} onPress={() => this.handleDeleteAlamat()}>
              <Text style={styles.textVerifikasiButton}>Ya, Hapus Alamat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.batalButton} onPress={() => this.setState({deletAlamat: false})}>
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
            this.handlleEditAlamat(idAlamat)}>
            <Text style={styles.textEdit}>Edit</Text>
          </TouchableOpacity>
          <View style={styles.border} />
          <TouchableOpacity style={styles.touch} onPress={() => this.setState({deletAlamat: true, idDelete: idAlamat, statusDot: false})}>
            <Text style={styles.textEdit}>Hapus</Text>
          </TouchableOpacity>
        </View>
      )
    }
    return (
      <View />
    )
  }

  mapingAlamat () {
    const { listAlamat } = this.state
    const mapparent = listAlamat.map((alamat, i) =>
    (<View key={i} >
      <View style={styles.headerInfoAlamat}>
        <Text style={styles.textHeader}>{alamat.alias_address}</Text>
        <TouchableOpacity onPress={() => this.setState({statusDot: true, rowTerpilih: i})}>
          <Image source={Images.threeDotSilver} style={styles.imageDot} />
        </TouchableOpacity>
      </View>
      {this.containerEdit(i, alamat.id)}
      <View style={styles.dataInfoAlamat}>
        <Text style={[styles.textHeader, {fontFamily: Fonts.type.semiBolds}]}>Nama Penerima</Text>
        <Text style={styles.textHeader2}>{alamat.name}</Text>
        <Text style={[styles.textHeader, {fontFamily: Fonts.type.semiBolds}]}>No Handphone</Text>
        <Text style={styles.textHeader2}>{alamat.phone_number}</Text>
        <Text style={[styles.textHeader, {fontFamily: Fonts.type.semiBolds}]}>Alamat</Text>
        <Text numberOfLines={3} style={[styles.textHeader2, {paddingRight: 100}]}>{alamat.address}, {alamat.village.name}, {alamat.subDistrict.name}, {alamat.district.name}, {alamat.province.name}, {alamat.postal_code}</Text>
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
            {this.mapingAlamat()}
            {this.modalConfrimDeletAlamat()}
          </View>
        </ScrollView>
        <TouchableOpacity style={styles.create} onPress={() => this.handleCreateAlamat()}>
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
    dataAlamats: state.listAddress,
    dataDeletAlamat: state.deleteAddress
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteAddress: (id) => dispatch(addressAction.deleteAddress({id})),
    getAlamat: () => dispatch(addressAction.getListAddress()),
    getDetailAlamat: (id) => dispatch(addressAction.getAddressDetail({id}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddressData)
