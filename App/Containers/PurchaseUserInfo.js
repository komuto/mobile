import React from 'react'
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  ListView,
  ToastAndroid,
  ActivityIndicator
} from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import * as filterAction from '../actions/location'
import * as productAction from '../actions/product'
import * as addressAction from '../actions/address'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Images, Colors } from '../Themes'
// Styles
import styles from './Styles/PembelianInfoPenggunaStyle'

class PurchaseUserInfo extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      id: this.props.dataDetailProduk.detail.product.id,
      namaAlamat: '',
      nama: '',
      nomorHp: '',
      alamat: '',
      provinsi: 'Provinsi',
      kabupaten: 'Kota / Kabupaten',
      kecamatan: 'Kecamatan',
      kelurahan: 'Kelurahan',
      dataProvinsi: [],
      dataKabupaten: [],
      dataKecamatan: [],
      dataKelurahan: [],
      kodepos: '',
      tambahanProvinsi: [
        {
          'id': 0,
          'name': 'Pilih Provinsi'
        }
      ],
      tambahanKabupaten: [
        {
          'id': 0,
          'ro_id': 0,
          'name': 'Pilih Kota'
        }
      ],
      tambahanKecamatan: [
        {
          'id': 0,
          'name': 'Pilih Kecamatan'
        }
      ],
      tambahanKelurahan: [
        {
          'id': 0,
          'name': 'Pilih Kelurahan'
        }
      ],
      idProvinsi: 0,
      idKabupaten: 0,
      idKecamatan: 0,
      idKelurahan: 0,
      modalProvinsi: false,
      modalKabupaten: false,
      modalKecamatan: false,
      modalKelurahan: false,
      loadingCart: false
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataProvinsi.status === 200) {
      this.setState({
        dataProvinsi: this.state.tambahanProvinsi.concat(nextProps.dataProvinsi.provinces)
      })
    }
    if (nextProps.dataKota.status === 200) {
      this.setState({
        dataKabupaten: this.state.tambahanKabupaten.concat(nextProps.dataKota.districts)
      })
    }
    if (nextProps.dataSubDistrict.status === 200) {
      this.setState({
        dataKecamatan: this.state.tambahanKecamatan.concat(nextProps.dataSubDistrict.subdistricts)
      })
    }
    if (nextProps.dataVillage.status === 200) {
      this.setState({
        dataKelurahan: this.state.tambahanKelurahan.concat(nextProps.dataVillage.villages)
      })
    }
    if (nextProps.dataCreateAlamat.status === 200) {
      this.setState({
        loadingCart: false
      })
      ToastAndroid.show('Alamat berhasil dibuat', ToastAndroid.LONG)
      NavigationActions.purchaseaddtocart({
        type: ActionConst.PUSH,
        statusAlamat: true
      })
    } else if (nextProps.dataCreateAlamat.status > 200) {
      ToastAndroid.show(nextProps.dataCreateAlamat.message, ToastAndroid.LONG)
    }
  }

  handleNamaAlamat = (text) => {
    this.setState({ namaAlamat: text })
  }

  handleNama = (text) => {
    this.setState({ nama: text })
  }

  handleNomorHp = (text) => {
    this.setState({ nomorHp: text })
  }

  handleAlamat = (text) => {
    this.setState({ alamat: text })
  }

  handleKodePos = (text) => {
    this.setState({ kodepos: text })
  }

  renderModalProvinsi () {
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.modalProvinsi}
        onRequestClose={() => this.setState({ modalProvinsi: false })}
        >
        <TouchableOpacity style={styles.modalContainer} onPress={() => this.setState({ modalProvinsi: false })}>
          <ScrollView style={styles.menuProvinsiContainer}>
            <ListView
              dataSource={this.dataSource.cloneWithRows(this.state.dataProvinsi)}
              renderRow={this.renderListProvinsi.bind(this)}
              enableEmptySections
            />
          </ScrollView>
        </TouchableOpacity>
      </Modal>
    )
  }
  renderModalKabupaten () {
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.modalKabupaten}
        onRequestClose={() => this.setState({ modalKabupaten: false })}
        >
        <TouchableOpacity style={styles.modalContainer} onPress={() => this.setState({ modalKabupaten: false })}>
          <ScrollView style={styles.menuProvinsiContainer}>
            <ListView
              dataSource={this.dataSource.cloneWithRows(this.state.dataKabupaten)}
              renderRow={this.renderListKabupaten.bind(this)}
              enableEmptySections
            />
          </ScrollView>
        </TouchableOpacity>
      </Modal>
    )
  }
  renderModalKecamatan () {
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.modalKecamatan}
        onRequestClose={() => this.setState({ modalKecamatan: false })}
        >
        <TouchableOpacity style={styles.modalContainer} onPress={() => this.setState({ modalKecamatan: false })}>
          <ScrollView style={styles.menuProvinsiContainer}>
            <ListView
              dataSource={this.dataSource.cloneWithRows(this.state.dataKecamatan)}
              renderRow={this.renderListKecamatan.bind(this)}
              enableEmptySections
            />
          </ScrollView>
        </TouchableOpacity>
      </Modal>
    )
  }

  renderModalKelurahan () {
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.modalKelurahan}
        onRequestClose={() => this.setState({ modalKelurahan: false })}
        >
        <TouchableOpacity style={styles.modalContainer} onPress={() => this.setState({ modalKelurahan: false })}>
          <ScrollView style={styles.menuProvinsiContainer}>
            <ListView
              dataSource={this.dataSource.cloneWithRows(this.state.dataKelurahan)}
              renderRow={this.renderListKelurahan.bind(this)}
              enableEmptySections
            />
          </ScrollView>
        </TouchableOpacity>
      </Modal>
    )
  }

  renderListProvinsi (rowData) {
    return (
      <TouchableOpacity
        style={[styles.menuLaporkan, { padding: 15 }]}
        activeOpacity={0.8}
        onPress={() => {
          this.setState({
            provinsi: rowData.name,
            idProvinsi: rowData.id,
            modalProvinsi: false })
          this.props.getKota(rowData.id)
        }}
      >
        <Text style={[styles.textBagikan, { marginLeft: 0 }]}>{rowData.name}</Text>
      </TouchableOpacity>
    )
  }

  renderListKabupaten (rowData) {
    return (
      <TouchableOpacity
        style={[styles.menuLaporkan, { padding: 15 }]}
        activeOpacity={0.8}
        onPress={() => {
          this.setState({
            kabupaten: rowData.name,
            idKabupaten: rowData.id,
            modalKabupaten: false })
          this.props.getSubDistrict(rowData.id)
        }}
      >
        <Text style={[styles.textBagikan, { marginLeft: 0 }]}>{rowData.name}</Text>
      </TouchableOpacity>
    )
  }

  renderListKecamatan (rowData) {
    return (
      <TouchableOpacity
        style={[styles.menuLaporkan, { padding: 15 }]}
        activeOpacity={0.8}
        onPress={() => {
          this.setState({
            kecamatan: rowData.name,
            idKecamatan: rowData.id,
            modalKecamatan: false
          })
          this.props.getVillage(rowData.id)
        }}
      >
        <Text style={[styles.textBagikan, { marginLeft: 0 }]}>{rowData.name}</Text>
      </TouchableOpacity>
    )
  }

  renderListKelurahan (rowData) {
    return (
      <TouchableOpacity
        style={[styles.menuLaporkan, { padding: 15 }]}
        activeOpacity={0.8}
        onPress={() => {
          this.setState({
            kelurahan: rowData.name,
            idKelurahan: rowData.id,
            modalKelurahan: false
          })
        }}
      >
        <Text style={[styles.textBagikan, { marginLeft: 0 }]}>{rowData.name}</Text>
      </TouchableOpacity>
    )
  }

  buatAlamat () {
    this.setState({
      loadingCart: true
    })
    const {
      namaAlamat,
      nama,
      nomorHp,
      alamat,
      kodepos,
      idProvinsi,
      idKabupaten,
      idKecamatan,
      idKelurahan
  } = this.state
    this.props.createAddress(
      idProvinsi,
      idKabupaten,
      idKecamatan,
      idKelurahan,
      nama,
      nomorHp,
      kodepos,
      alamat,
      namaAlamat,
      true
    )
    this.props.getListAlamat()
  }

  render () {
    const { provinsi, kabupaten, kecamatan, kelurahan, namaAlamat, nama, nomorHp, alamat, kodepos, loadingCart } = this.state
    const spinner = loadingCart
    ? (<View style={[styles.spinner, {backgroundColor: Colors.bluesky}]}>
      <ActivityIndicator color={Colors.snow} size='large' />
    </View>) : (<View />)
    let tombol
    if (this.state.loadingCart) {
      tombol = (
        <View style={styles.button}>
          {spinner}
        </View>
      )
    } else {
      tombol = (
        <TouchableOpacity style={styles.button} onPress={() => this.buatAlamat()}>
          <Text style={styles.textButton}>Simpan Alamat</Text>
        </TouchableOpacity>
      )
    }
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Info Alamat</Text>
          </View>
          <View style={styles.infoAlamatContainer}>
            <TextInput
              ref='namaAlamat'
              style={styles.input}
              value={namaAlamat}
              returnKeyType='next'
              onSubmitEditing={() => this.refs.nama.focus()}
              keyboardType='default'
              autoCapitalize='none'
              autoCorrect
              onChangeText={this.handleNamaAlamat}
              underlineColorAndroid='transparent'
              placeholder='Nama Alias'
            />
            <Text style={styles.teks}>Contoh: Rumah Sendiri, Kantor</Text>
            <TextInput
              ref='nama'
              style={styles.input}
              value={nama}
              returnKeyType='next'
              onSubmitEditing={() => this.refs.nomorHp.focus()}
              keyboardType='default'
              autoCapitalize='none'
              autoCorrect
              onChangeText={this.handleNama}
              underlineColorAndroid='transparent'
              placeholder='Nama Penerima'
            />
            <TextInput
              ref='nomorHp'
              style={styles.input}
              value={nomorHp}
              returnKeyType='next'
              onSubmitEditing={() => this.refs.alamat.focus()}
              keyboardType='numeric'
              autoCapitalize='none'
              autoCorrect
              onChangeText={this.handleNomorHp}
              underlineColorAndroid='transparent'
              placeholder='Nomor Handphone'
            />
          </View>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Info Lokasi</Text>
          </View>
          <View style={styles.infoAlamatContainer}>
            <TextInput
              ref='alamat'
              style={styles.input}
              value={alamat}
              returnKeyType='next'
              keyboardType='default'
              autoCapitalize='none'
              autoCorrect
              onChangeText={this.handleAlamat}
              underlineColorAndroid='transparent'
              placeholder='Alamat Lengkap'
            />
            <TouchableOpacity
              style={styles.containerPicker}
              onPress={() => this.setState({ modalProvinsi: true })}
            >
              <Text style={[styles.teksPicker, { flex: 1 }]}>{provinsi}</Text>
              <Image source={Images.down} style={styles.imagePicker} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.containerPicker}
              onPress={() => this.setState({ modalKabupaten: true })}
            >
              <Text style={[styles.teksPicker, { flex: 1 }]}>{kabupaten}</Text>
              <Image source={Images.down} style={styles.imagePicker} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.containerPicker}
              onPress={() => this.setState({ modalKecamatan: true })}
            >
              <Text style={[styles.teksPicker, { flex: 1 }]}>{kecamatan}</Text>
              <Image source={Images.down} style={styles.imagePicker} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.containerPicker}
              onPress={() => this.setState({ modalKelurahan: true })}
            >
              <Text style={[styles.teksPicker, { flex: 1 }]}>{kelurahan}</Text>
              <Image source={Images.down} style={styles.imagePicker} />
            </TouchableOpacity>
            <TextInput
              ref='kodepos'
              style={styles.input}
              value={kodepos}
              keyboardType='numeric'
              autoCapitalize='none'
              autoCorrect
              onChangeText={this.handleKodePos}
              underlineColorAndroid='transparent'
              placeholder='Kode Pos'
            />
          </View>
          <View style={styles.buttonContainer}>
            {tombol}
          </View>
        </ScrollView>
        {this.renderModalProvinsi()}
        {this.renderModalKabupaten()}
        {this.renderModalKecamatan()}
        {this.renderModalKelurahan()}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataProvinsi: state.provinces,
    dataKota: state.districts,
    dataSubDistrict: state.subdistricts,
    dataVillage: state.villages,
    dataCreateAlamat: state.addAddress,
    dataDetailProduk: state.productDetail
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDetailProduk: (id) => dispatch(productAction.getProduct({id: id})),
    getProvinsi: dispatch(filterAction.getProvince()),
    getKota: (id) => dispatch(filterAction.getDistrict({ province_id: id })),
    getSubDistrict: (id) => dispatch(filterAction.getSubDistrict({ district_id: id })),
    getVillage: (id) => dispatch(filterAction.getVillage({ sub_district_id: id })),
    getListAlamat: () => dispatch(addressAction.getListAddress()),
    createAddress: (
      provinceId,
      districtId,
      subDistrictId,
      villageId,
      name,
      phoneNumber,
      postalCode,
      address,
      aliasAddress,
      isPrimary
    ) => dispatch(addressAction.addAddress(
      {
        province_id: provinceId,
        district_id: districtId,
        sub_district_id: subDistrictId,
        village_id: villageId,
        name: name,
        phone_number: phoneNumber,
        postal_code: postalCode,
        address: address,
        alias_address: aliasAddress,
        is_primary: isPrimary
      }
    ))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseUserInfo)
