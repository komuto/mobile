import React from 'react'
import { ScrollView, Text, View, TextInput, ActivityIndicator, BackAndroid, ListView, TouchableOpacity, Image, Modal } from 'react-native'
import { connect } from 'react-redux'
import * as addressAction from '../actions/address'
import { Actions as NavigationActions } from 'react-native-router-flux'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import * as locationAction from '../actions/location'

// Styles
import styles from './Styles/EditAlamatScreenStyle'
import stylesLokasi from './Styles/ProductDetailScreenStyle'

import { Colors, Images } from '../Themes/'

class EditAlamatScreenScreen extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      titleButton: this.props.titleButton,
      edit: this.props.edit,
      namaPemilik: this.props.name,
      email: this.props.email,
      namaAlias: '',
      namaPenerima: '',
      nomerHape: '',
      alamatLengkap: '',
      kodePos: '',
      idAlamat: '' || this.props.idAlamat,
      namaAliasLabel: 'Contoh: Rumah Sendiri, Kantor',
      colorNamaAlias: Colors.lightblack,
      colorNamaPenerima: Colors.snow,
      colorNoHape: Colors.snow,
      colorPickerProv: Colors.labelgrey,
      colorPickerKab: Colors.labelgrey,
      colorPickerKec: Colors.labelgrey,
      colorPickerKel: Colors.labelgrey,
      provinsiTerpilih: 'Provinsi',
      kabTerpilih: 'Kota / Kabupaten',
      kecTerpilih: 'Kecamatan',
      kelurahanterpilih: 'Keluraahan',
      idProvinsiTerpilih: 0,
      idKabTerpilih: 0,
      idKecTerpilih: 0,
      idkelTerpilih: 0,
      provinsi: [],
      kabupaten: [],
      kecamatan: [],
      kelurahan: [],
      modalProvinsi: false,
      modalKabupaten: false,
      modalKecamatan: false,
      modalKelurahan: false,
      IsPrimary: true,
      loading: false,
      tambahanProvinsi: [
        {
          'id': 0,
          'name': 'Pilih Provinsi'
        }
      ],
      tambahanKota: [
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
      ]
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataProvinsi.status === 200) {
      this.setState({
        provinsi: this.state.tambahanProvinsi.concat(nextProps.dataProvinsi.provinces)
      })
    } else if (nextProps.dataKota.status === 200) {
      this.setState({
        kabupaten: this.state.tambahanKota.concat(nextProps.dataKota.districts)
      })
    } else if (nextProps.dataSubDistrict.status === 200) {
      this.setState({
        kecamatan: this.state.tambahanKecamatan.concat(nextProps.dataSubDistrict.subdistricts)
      })
    } else if (nextProps.dataVilage.status === 200) {
      this.setState({
        kelurahan: this.state.tambahanKelurahan.concat(nextProps.dataVilage.villages)
      })
    } else if (nextProps.detailalamat.status === 200) {
      console.log(nextProps)
      console.log('masuk')
      this.setState({
        namaAlias: nextProps.detailalamat.addresses.alias_address,
        namaPenerima: nextProps.detailalamat.addresses.name,
        nomerHape: nextProps.detailalamat.addresses.phone_number,
        alamatLengkap: nextProps.detailalamat.addresses.address,
        kodePos: nextProps.detailalamat.addresses.postal_code,
        colorPickerProv: Colors.lightblack,
        colorPickerKab: Colors.lightblack,
        colorPickerKec: Colors.lightblack,
        colorPickerKel: Colors.lightblack,
        idProvinsiTerpilih: nextProps.addresses.province.id,
        idKabTerpilih: nextProps.detailalamat.addresses.district.id,
        idKecTerpilih: nextProps.detailalamat.addresses.subDistrict.id,
        idkelTerpilih: nextProps.detailalamat.addresses.village.id,
        provinsiTerpilih: nextProps.detailalamat.addresses.province.name,
        kabTerpilih: nextProps.detailalamat.addresses.district.name,
        kecTerpilih: nextProps.detailalamat.addresses.subDistrict.name,
        kelurahanterpilih: nextProps.detailalamat.addresses.village.name
      })
    }
  }

  componentDidMount () {
    this.props.getAddress(this.state.idAlamat)
    this.props.getAddress
    this.props.getProvinsi()
    this.props.getKota(11)
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

  handleChangeNamaAlias = (text) => {
    this.setState({ namaAlias: text })
  }

  handleChangePenerima = (text) => {
    this.setState({ namaPenerima: text })
  }

  handleChangeNoHape = (text) => {
    this.setState({ nomerHape: text })
  }

  handleChangeAlamatLengkap = (text) => {
    this.setState({ alamatLengkap: text })
  }

  handleChangeKodePos = (text) => {
    this.setState({ kodePos: text })
  }

  onError = (field) => {
    console.tron.log('field', field)
    switch (field) {
      case 'alias':
        this.setState({
          namaAliasLabel: 'Nama Alias harus diisi',
          colorNamaAlias: Colors.red
        })
        break
      case 'penerima':
        this.setState({
          colorNamaPenerima: Colors.red
        })
        break
      case 'nohape':
        this.setState({
          colorNoHape: Colors.red
        })
        break
      case 'empty':
        this.setState({
          namaAliasLabel: 'Nama Pemilik harus diisi',
          colorNamaAlias: Colors.red,
          colorNamaPenerima: Colors.red,
          colorNoHape: Colors.red
        })
        break
      default:
        window.alert('Internal Error OnError')
        break
    }
  }

  onFocus = (field) => {
    switch (field) {
      case 'alias':
        this.setState({
          namaAliasLabel: 'Contoh: Rumah Sendiri, Kantor',
          colorNamaAlias: Colors.lightblack
        })
        break
      case 'penerima':
        this.setState({
          colorNamaPenerima: Colors.snow
        })
        break
      case 'nohape':
        this.setState({
          colorNoHape: Colors.snow
        })
        break
      case 'empty':
        this.setState({
          namaAliasLabel: 'Contoh: Rumah Sendiri, Kantor',
          colorNamaAlias: Colors.lightblack,
          colorNamaPenerima: Colors.snow,
          colorNoHape: Colors.snow
        })
        break
      default:
        window.alert('Internal Error Focus')
        break
    }
  }

  onBlur = (field) => {
    switch (field) {
      case 'alias':
        this.setState({
          namaAliasLabel: 'Contoh: Rumah Sendiri, Kantor',
          colorNamaAlias: Colors.lightblack
        })
        break
      case 'penerima':
        this.setState({
          colorNamaPenerima: Colors.snow
        })
        break
      case 'nohape':
        this.setState({
          colorNoHape: Colors.snow
        })
        break
      case 'empty':
        this.setState({
          namaAliasLabel: 'Contoh: Rumah Sendiri, Kantor',
          colorNamaAlias: Colors.lightblack,
          colorNamaPenerima: Colors.snow,
          colorNoHape: Colors.snow
        })
        break
      default:
        window.alert('Internal Error Blur')
        break
    }
  }

  renderInfoAlamat () {
    const {colorNamaAlias, colorNamaPenerima, colorNoHape} = this.state
    return (
      <View style={styles.textInput}>
        <TextInput
          ref='alias'
          style={styles.inputText}
          value={this.state.namaAlias}
          keyboardType='default'
          returnKeyType='next'
          autoCapitalize='none'
          autoCorrect
          onFocus={() => this.onFocus('alias')}
          onBlur={() => this.onBlur('alias')}
          onSubmitEditing={() => this.refs.penerima.focus()}
          onChangeText={this.handleChangeNamaAlias}
          underlineColorAndroid='transparent'
          placeholder='Nama Alias'
        />
        <Text style={[styles.textLabel, {color: colorNamaAlias}]}>{this.state.namaAliasLabel}</Text>
        <TextInput
          ref='penerima'
          style={styles.inputText}
          value={this.state.namaPenerima}
          keyboardType='default'
          returnKeyType='next'
          autoCapitalize='none'
          autoCorrect
          onFocus={() => this.onFocus('penerima')}
          onBlur={() => this.onBlur('penerima')}
          onSubmitEditing={() => this.refs.nohape.focus()}
          onChangeText={this.handleChangePenerima}
          underlineColorAndroid='transparent'
          placeholder='Nama Penerima'
        />
        <Text style={[styles.textLabel, {color: colorNamaPenerima}]}>Nama Penerima harus diisi</Text>
        <TextInput
          ref='nohape'
          style={styles.inputText}
          value={this.state.nomerHape}
          keyboardType='numeric'
          returnKeyType='done'
          autoCapitalize='none'
          autoCorrect
          onFocus={() => this.onFocus('nohape')}
          onBlur={() => this.onBlur('nohape')}
          onChangeText={this.handleChangeNoHape}
          underlineColorAndroid='transparent'
          placeholder='Nomor Handphone'
        />
        <Text style={[styles.textLabel, {color: colorNoHape}]}>Nomer Handphone harus diisi</Text>
      </View>
    )
  }

  renderListProvinsi (rowData) {
    return (
      <TouchableOpacity
        style={[stylesLokasi.menuLaporkan, { padding: 15 }]}
        activeOpacity={0.8}
        onPress={() => {
          this.setState({
            provinsiTerpilih: rowData.name,
            idProvinsiTerpilih: rowData.id,
            colorPickerProv: Colors.lightblack,
            modalProvinsi: false })
          this.props.getKota(rowData.id)
        }}
      >
        <Text style={[stylesLokasi.textBagikan, { marginLeft: 0 }]}>{rowData.name}</Text>
      </TouchableOpacity>
    )
  }

  renderListKabupaten (rowData) {
    return (
      <TouchableOpacity
        style={[stylesLokasi.menuLaporkan, { padding: 15 }]}
        activeOpacity={0.8}
        onPress={() => {
          this.setState({
            kabTerpilih: rowData.name,
            idKabTerpilih: rowData.id,
            colorPickerKab: Colors.lightblack,
            modalKabupaten: false })
          this.props.getSubDistrict(rowData.id)
        }}
      >
        <Text style={[stylesLokasi.textBagikan, { marginLeft: 0 }]}>{rowData.name}</Text>
      </TouchableOpacity>
    )
  }

  renderListKecamatan (rowData) {
    return (
      <TouchableOpacity
        style={[stylesLokasi.menuLaporkan, { padding: 15 }]}
        activeOpacity={0.8}
        onPress={() => {
          this.setState({
            kecTerpilih: rowData.name,
            idKecTerpilih: rowData.id,
            colorPickerKec: Colors.lightblack,
            modalKecamatan: false
          })
          this.props.getVillage(rowData.id)
        }}
      >
        <Text style={[stylesLokasi.textBagikan, { marginLeft: 0 }]}>{rowData.name}</Text>
      </TouchableOpacity>
    )
  }

  renderListKelurahan (rowData) {
    return (
      <TouchableOpacity
        style={[stylesLokasi.menuLaporkan, { padding: 15 }]}
        activeOpacity={0.8}
        onPress={() => {
          this.setState({
            kelurahanterpilih: rowData.name,
            colorPickerKel: Colors.lightblack,
            idkelTerpilih: rowData.id,
            modalKelurahan: false
          })
        }}
      >
        <Text style={[stylesLokasi.textBagikan, { marginLeft: 0 }]}>{rowData.name}</Text>
      </TouchableOpacity>
    )
  }

  renderModalProvinsi () {
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.modalProvinsi}
        onRequestClose={() => this.setState({ modalProvinsi: false })}
        >
        <View style={styles.rowContainer}>
          <TouchableOpacity activeOpacity={1} style={styles.bgModal} onPress={() => this.setState({modalProvinsi: false})} />
          <ScrollView>
            <ListView
              contentContainerStyle={{ flex: 1, flexWrap: 'wrap' }}
              dataSource={this.dataSource.cloneWithRows(this.state.provinsi)}
              renderRow={this.renderListProvinsi.bind(this)}
              enableEmptySections
            />
          </ScrollView>
        </View>
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
        <View style={styles.rowContainer}>
          <TouchableOpacity activeOpacity={1} style={[styles.bgModal]} onPress={() => this.setState({modalKabupaten: false})} />
          <ScrollView>
            <ListView
              contentContainerStyle={{ flex: 1, flexWrap: 'wrap' }}
              dataSource={this.dataSource.cloneWithRows(this.state.kabupaten)}
              renderRow={this.renderListKabupaten.bind(this)}
              enableEmptySections
            />
          </ScrollView>
        </View>
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
        <View style={styles.rowContainer}>
          <TouchableOpacity activeOpacity={1} style={[styles.bgModal, {flex: 1}]} onPress={() => this.setState({modalKecamatan: false})} />
          <ScrollView>
            <ListView
              dataSource={this.dataSource.cloneWithRows(this.state.kecamatan)}
              renderRow={this.renderListKecamatan.bind(this)}
              enableEmptySections
            />
          </ScrollView>
        </View>
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
        <View style={styles.rowContainer}>
          <TouchableOpacity activeOpacity={1} style={[styles.bgModal, {flex: 1}]} onPress={() => this.setState({modalKelurahan: false})} />
          <ScrollView>
            <ListView
              dataSource={this.dataSource.cloneWithRows(this.state.kelurahan)}
              renderRow={this.renderListKelurahan.bind(this)}
              enableEmptySections
            />
          </ScrollView>
        </View>
      </Modal>
    )
  }

  renderInfoLokasi () {
    const {colorPickerProv, colorPickerKab, colorPickerKec, colorPickerKel} = this.state
    return (
      <View style={styles.textInput}>
        <TextInput
          style={styles.inputText}
          value={this.state.alamatLengkap}
          keyboardType='default'
          returnKeyType='done'
          autoCapitalize='none'
          autoCorrect
          onChangeText={this.handleChangeAlamatLengkap}
          underlineColorAndroid='transparent'
          placeholder='Alamat Lengkap'
        />
        <View style={[styles.lokasiSeparator, {marginTop: 45}]}>
          <TouchableOpacity style={styles.pilihDestinasi} onPress={() => this.setState({ modalProvinsi: true })}>
            <Text style={[styles.inputText2, {flex: 1, marginLeft: 0, color: colorPickerProv}]}>{this.state.provinsiTerpilih}</Text>
            <Image source={Images.down} style={styles.imagePicker} />
          </TouchableOpacity>
        </View>
        <View style={styles.lokasiSeparator}>
          <TouchableOpacity style={styles.pilihDestinasi} onPress={() => this.setState({ modalKabupaten: true })}>
            <Text style={[styles.inputText2, {flex: 1, marginLeft: 0, color: colorPickerKab}]}>{this.state.kabTerpilih}</Text>
            <Image source={Images.down} style={styles.imagePicker} />
          </TouchableOpacity>
        </View>
        <View style={styles.lokasiSeparator}>
          <TouchableOpacity style={styles.pilihDestinasi} onPress={() => this.setState({ modalKecamatan: true })}>
            <Text style={[styles.inputText2, {flex: 1, marginLeft: 0, color: colorPickerKec}]}>{this.state.kecTerpilih}</Text>
            <Image source={Images.down} style={styles.imagePicker} />
          </TouchableOpacity>
        </View>
        <View style={styles.lokasiSeparator}>
          <TouchableOpacity style={styles.pilihDestinasi} onPress={() => this.setState({ modalKelurahan: true })}>
            <Text style={[styles.inputText2, {flex: 1, marginLeft: 0, color: colorPickerKel}]}>{this.state.kelurahanterpilih}</Text>
            <Image source={Images.down} style={styles.imagePicker} />
          </TouchableOpacity>
        </View>
        <TextInput
          style={[styles.inputText, {marginTop: -5}]}
          value={this.state.kodePos}
          keyboardType='default'
          returnKeyType='done'
          autoCapitalize='none'
          autoCorrect
          onChangeText={this.handleChangeKodePos}
          underlineColorAndroid='transparent'
          placeholder='Kode Pos'
        />
        <View style={[styles.lokasiSeparator, {marginBottom: 30.8}]} />
      </View>
    )
  }

  createAlamat () {
    const {namaAlias, namaPenerima, nomerHape,
      alamatLengkap, kodePos, email, namaPemilik, IsPrimary,
      idProvinsiTerpilih, idKabTerpilih, idKecTerpilih, idkelTerpilih} = this.state
    if (this.state.edit) {
      if (namaAlias === '' && namaPenerima === '' && nomerHape === '') {
        this.onError('empty')
      } else {
        this.setState({loading: true})
        this.props.editAddress(idProvinsiTerpilih, idKabTerpilih, idKecTerpilih,
          idkelTerpilih, namaPemilik, email, nomerHape, kodePos, alamatLengkap, namaAlias, IsPrimary)
      }
    } else {
      if (namaAlias === '' && namaPenerima === '' && nomerHape === '') {
        this.onError('empty')
      } else {
        this.setState({loading: true})
        this.props.createAddress(idProvinsiTerpilih, idKabTerpilih, idKecTerpilih,
          idkelTerpilih, namaPemilik, email, nomerHape, kodePos, alamatLengkap, namaAlias, IsPrimary)
      }
    }
  }

  render () {
    console.log(this.state.namaAlias)
    const spinner = this.state.loading
    ? (<View style={styles.spinner}>
      <ActivityIndicator color='white' size='large' />
    </View>) : (<View />)
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.textTitle}>Info Alamat</Text>
          {this.renderInfoAlamat()}
          <Text style={styles.textTitle}>Info Lokasi</Text>
          {this.renderInfoLokasi()}
          <TouchableOpacity style={[styles.buttonnext]} onPress={() => this.createAlamat()}>
            <Text style={styles.textButtonNext}>
              {this.state.titleButton}
            </Text>
          </TouchableOpacity>
        </ScrollView>
        {this.renderModalProvinsi()}
        {this.renderModalKabupaten()}
        {this.renderModalKecamatan()}
        {this.renderModalKelurahan()}
        {spinner}
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  console.log(state.address)
  return {
    dataProvinsi: state.provinces,
    dataKota: state.districts,
    dataSubDistrict: state.subdistricts,
    dataVilage: state.villages,
    detailalamat: state.address
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProvinsi: () => dispatch(locationAction.getProvince()),
    getKota: (id) => dispatch(locationAction.getDistrict({ id })),
    getSubDistrict: (id) => dispatch(locationAction.getSubDistrict({ id })),
    getVillage: (id) => dispatch(locationAction.getVillage({ id })),
    getAddress: (id) => dispatch(addressAction.getAddressDetail({ id })),
    UpdateAddress: (id) => dispatch(addressAction.getAddressDetail({ id }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAlamatScreenScreen)
