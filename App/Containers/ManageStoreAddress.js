import React from 'react'
import { Modal, TouchableOpacity, View, Text, BackAndroid, Image } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import * as addressAction from '../actions/address'

// Styles
import styles from './Styles/KelolaAlamatTokoScreenStyle'
import { Images } from '../Themes/'

class ManageStoreAddress extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      alamatLengkap: '',
      kelurahan: '',
      idKelurahan: '',
      kecamatan: '',
      idKecamatan: '',
      provinsi: '',
      idProvinsi: '',
      kabupaten: '',
      idKabupaten: '',
      kodePos: '',
      idAlamat: '',
      modalConfrimHapus: false,
      notif: this.props.notif || false
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataAlamats.status === 200) {
      console.log('masuk')
      this.setState({
        alamatLengkap: nextProps.dataAlamats.storeAddress.address,
        kodePos: nextProps.dataAlamats.storeAddress.postal_code,
        provinsi: nextProps.dataAlamats.storeAddress.province.name,
        idProvinsi: nextProps.dataAlamats.storeAddress.province.id,
        kabupaten: nextProps.dataAlamats.storeAddress.district.name,
        idKabupaten: nextProps.dataAlamats.storeAddress.district.id,
        kecamatan: nextProps.dataAlamats.storeAddress.subDistrict.name,
        idKecamatan: nextProps.dataAlamats.storeAddress.subDistrict.id,
        kelurahan: nextProps.dataAlamats.storeAddress.village.name,
        idKelurahan: nextProps.dataAlamats.storeAddress.village.id
      })
    }
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

  notif () {
    if (this.state.notif) {
      return (
        <View style={styles.notif}>
          <Text style={styles.textNotif}>Selama belum terverifikasi, Anda tidak bisa mengubah alamat toko Anda.</Text>
        </View>
      )
    } else {
      return (
        <View />
      )
    }
  }

  buttonUbahAlamat () {
    if (this.state.notif) {
      return (
        <View />
      )
    } else {
      return (
        <Text onPress={() => this.setState({modalConfrimHapus: true})} style={styles.link}>Ubah Alamat</Text>
      )
    }
  }

  modalConfrimDelete () {
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.modalConfrimHapus}
        onRequestClose={() => this.setState({ Modal: false })}
        >
        <View style={styles.bgModal}>
          <View style={styles.contaierModal}>
            <Image source={Images.promptHapusAlamat} style={styles.image} />
            <Text style={styles.titleModal}>Dengan mengubah alamat, status{'\n'}Toko Anda menjadi tidak terverifikasi.</Text>
            <Text style={styles.titleModal2}>Anda harus memverifikasi Alamat baru{'\n'}Anda dengan kode yang akan kami{'\n'}kirim ke Alamat baru</Text>
            <TouchableOpacity style={styles.verifikasiButton} onPress={() => this.setState({modalConfrimHapus: false})}>
              <Text style={styles.textVerifikasiButton}>Batal</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.batalButton} onPress={() => this.handleEditAlamat()}>
              <Text style={styles.textBatalButton}>Lanjutkan Ubah Alamat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }

  handleEditAlamat () {
    this.setState({modalConfrimHapus: false})
    NavigationActions.updatestoreaddress({
      type: ActionConst.PUSH,
      provinsi: this.state.provinsi,
      kabupaten: this.state.kabupaten,
      kecamatan: this.state.kecamatan,
      kelurahan: this.state.kelurahan,
      idProvinsi: this.state.idProvinsi,
      idKabupaten: this.state.idKabupaten,
      idKecamatan: this.state.idKecamatan,
      idKelurahan: this.state.idKelurahan,
      alamat: this.state.alamatLengkap,
      kodePos: this.state.kodePos
    })
  }

  render () {
    const {alamatLengkap, provinsi, kabupaten, kecamatan, kelurahan, kodePos} = this.state
    return (
      <View style={styles.container}>
        {this.notif()}
        <View style={styles.containerAlamat}>
          <View style={styles.containerField}>
            <Text style={styles.title}>Alamat Lengkap</Text>
            <Text style={styles.value}>{alamatLengkap}</Text>
          </View>
          <View style={styles.flexRow}>
            <View style={styles.flexOne}>
              <Text style={styles.title}>Kelurahan</Text>
              <Text style={styles.value}>{kelurahan}</Text>
            </View>
            <View style={styles.flexOne}>
              <Text style={styles.title}>Kecamatan</Text>
              <Text style={styles.value}>{kecamatan}</Text>
            </View>
          </View>
          <View style={styles.flexRow}>
            <View style={styles.flexOne}>
              <Text style={styles.title}>Kota / Kabupaten</Text>
              <Text style={styles.value}>{kabupaten}</Text>
            </View>
            <View style={styles.flexOne}>
              <Text style={styles.title}>Provinsi</Text>
              <Text style={styles.value}>{provinsi}</Text>
            </View>
          </View>
          <Text style={styles.title}>Kode Pos</Text>
          <Text style={styles.value}>{kodePos}</Text>
          {this.buttonUbahAlamat()}
        </View>
        {this.modalConfrimDelete()}
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    dataAlamats: state.storeAddress
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAlamat: () => dispatch(addressAction.getListAddress())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageStoreAddress)
