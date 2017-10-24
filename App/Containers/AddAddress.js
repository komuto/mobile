import React from 'react'
import {
  ScrollView,
  ToastAndroid,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  BackAndroid,
  ListView,
  TouchableOpacity,
  Image,
  Modal
} from 'react-native'
import { connect } from 'react-redux'
import * as addressAction from '../actions/address'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import {isFetching, isError, isFound} from '../Services/Status'
import Reactotron from 'reactotron-react-native'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import * as locationAction from '../actions/location'

// Styles
import styles from './Styles/TambahAlamatScreenStyle'
import stylesLokasi from './Styles/ProductDetailScreenStyle'

import { Colors, Images } from '../Themes/'

class AddAddress extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.submitting = {
      province: false,
      district: false,
      subdistrict: false,
      village: false,
      addAddress: false,
      detailAddress: false,
      editAddress: false
    }
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
      idAlamat: this.props.idAlamat,
      colorNamaAlias: Colors.snow,
      colorNamaPenerima: Colors.snow,
      colorNoHape: Colors.snow,
      colorFulladdress: Colors.snow,
      colorProvince: Colors.snow,
      colorDistrict: Colors.snow,
      colorSubdistict: Colors.snow,
      colorVillage: Colors.snow,
      colorPostalcode: Colors.snow,
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
      isPrimary: false,
      loading: false,
      isDisable2: true,
      isDisable3: true,
      isDisable4: true
    }
  }

  componentWillReceiveProps (nextProps) {
    const {
      dataProvinsi,
      dataKota,
      dataSubDistrict,
      dataVilage,
      dataAddress,
      detailAddress,
      updateAddress
    } = nextProps

    if (!isFetching(dataProvinsi) && this.submitting.province) {
      this.submitting = { ...this.submitting, province: false }
      if (isError(dataProvinsi)) {
        ToastAndroid.show(dataProvinsi.message, ToastAndroid.SHORT)
      }
      if (isFound(dataProvinsi)) {
        this.setState({
          provinsi: dataProvinsi.provinces
        })
      }
    }

    if (!isFetching(dataKota) && this.submitting.district) {
      this.submitting = { ...this.submitting, district: false }
      if (isError(dataKota)) {
        ToastAndroid.show(dataKota.message, ToastAndroid.SHORT)
      }
      if (isFound(dataKota)) {
        this.setState({
          kabupaten: dataKota.districts,
          isDisable2: false
        })
      }
    }

    if (!isFetching(dataSubDistrict) && this.submitting.subdistrict) {
      this.submitting = { ...this.submitting, subdistrict: false }
      if (isError(dataSubDistrict)) {
        ToastAndroid.show(dataSubDistrict.message, ToastAndroid.SHORT)
      }
      if (isFound(dataSubDistrict)) {
        this.setState({
          kecamatan: dataSubDistrict.subdistricts,
          isDisable3: false
        })
      }
    }

    if (!isFetching(dataVilage) && this.submitting.village) {
      this.submitting = { ...this.submitting, village: false }
      if (isError(dataVilage)) {
        ToastAndroid.show(dataVilage.message, ToastAndroid.SHORT)
      }
      if (isFound(dataVilage)) {
        this.setState({
          kelurahan: dataVilage.villages,
          loading: false,
          isDisable4: false
        })
      }
    }

    if (!isFetching(dataAddress) && this.submitting.addAddress) {
      this.submitting = { ...this.submitting, addAddress: false }
      if (isError(dataVilage)) {
        ToastAndroid.show(dataAddress.message, ToastAndroid.SHORT)
      }
      if (isFound(dataAddress)) {
        this.setState({
          loading: false
        })
        this.props.getAlamat()
        NavigationActions.addressdata({
          type: ActionConst.PUSH,
          notif: true,
          pesanNotif: 'menambahkan alamat baru'
        })
      }
    }

    if (!isFetching(detailAddress) && this.props.edit && this.submitting.editAddress) {
      this.submitting = {
        ...this.submitting,
        editAddress: false
      }
      if (isError(dataVilage)) {
        ToastAndroid.show(detailAddress.message, ToastAndroid.SHORT)
      }
      if (isFound(detailAddress)) {
        this.setState({
          loading: false,
          namaAlias: detailAddress.address.alias_address,
          namaPenerima: detailAddress.address.name,
          nomerHape: detailAddress.address.phone_number,
          alamatLengkap: detailAddress.address.address,
          kodePos: detailAddress.address.postal_code,
          colorPickerProv: Colors.lightblack,
          colorPickerKab: Colors.lightblack,
          colorPickerKec: Colors.lightblack,
          colorPickerKel: Colors.lightblack,
          provinsiTerpilih: detailAddress.address.province.name,
          kabTerpilih: detailAddress.address.district.name,
          kecTerpilih: detailAddress.address.subDistrict.name,
          kelurahanterpilih: detailAddress.address.village.name,
          idProvinsiTerpilih: detailAddress.address.province.id,
          idKabTerpilih: detailAddress.address.district.id,
          idKecTerpilih: detailAddress.address.subDistrict.id,
          idkelTerpilih: detailAddress.address.village.id,
          isPrimary: detailAddress.address.is_primary_address
        })
        if (!this.submitting.district && !this.submitting.subDistrict && !this.submitting.village) {
          this.submitting = {
            ...this.submitting,
            district: true,
            subdistrict: true,
            village: true
          }
          this.props.getKota(detailAddress.address.province.id)
          this.props.getSubDistrict(detailAddress.address.district.id)
          this.props.getVillage(detailAddress.address.subDistrict.id)
        }
      }
    }

    if (!isFetching(updateAddress) && this.submitting.updateAddress) {
      this.submitting = { ...this.submitting, updateAddress: false }
      if (isError(dataVilage)) {
        ToastAndroid.show(updateAddress.message, ToastAndroid.SHORT)
      }
      if (isFound(updateAddress)) {
        this.setState({
          loading: false
        })
        this.props.getAlamat()
        NavigationActions.addressdata({
          type: ActionConst.PUSH,
          notif: true,
          pesanNotif: 'mengubah alamat'
        })
      }
    }
  }

  componentDidMount () {
    if (!this.submitting.province && this.props.edit && !this.submitting.editAddress) {
      this.submitting = {
        ...this.submitting,
        editAddress: true,
        province: true
      }
      this.props.getDetailAlamat(this.state.idAlamat)
      this.props.getProvinsi()
    } else {
      Reactotron.log('biasa')
      this.submitting = {
        ...this.submitting,
        province: true
      }
      this.props.getProvinsi()
    }

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
    switch (field) {
      case 'alias':
        this.setState({
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
      case 'fulladdress':
        this.setState({
          colorFulladdress: Colors.red
        })
        break
      case 'province':
        this.setState({
          colorProvince: Colors.red
        })
        break
      case 'distric':
        this.setState({
          colorDistrict: Colors.red
        })
        break
      case 'subdistric':
        this.setState({
          colorSubdistict: Colors.red
        })
        break
      case 'village':
        this.setState({
          colorVillage: Colors.red
        })
        break
      case 'postalCode':
        this.setState({
          colorPostalcode: Colors.red
        })
        break
      case 'empty':
        this.setState({
          colorNamaAlias: Colors.red,
          colorNamaPenerima: Colors.red,
          colorNoHape: Colors.red,
          colorFulladdress: Colors.red,
          colorProvince: Colors.red,
          colorDistrict: Colors.red,
          colorSubdistict: Colors.red,
          colorVillage: Colors.red,
          colorPostalcode: Colors.red
        })
        break
      default:
        window.alert('Internal Error')
        break
    }
  }

  onFocus = (field) => {
    switch (field) {
      case 'alias':
        this.setState({
          colorNamaAlias: Colors.snow
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
      case 'fulladdress':
        this.setState({
          colorFulladdress: Colors.snow
        })
        break
      case 'postalCode':
        this.setState({
          colorPostalcode: Colors.snow
        })
        break
      case 'empty':
        this.setState({
          colorNamaAlias: Colors.snow,
          colorNamaPenerima: Colors.snow,
          colorNoHape: Colors.snow,
          colorFulladdress: Colors.snow,
          colorProvince: Colors.snow,
          colorDistrict: Colors.snow,
          colorSubdistict: Colors.snow,
          colorVillage: Colors.snow,
          colorPostalcode: Colors.snow
        })
        break
      default:
        window.alert('Internal Error')
        break
    }
  }

  onBlur = (field) => {
    switch (field) {
      case 'alias':
        this.setState({
          colorNamaAlias: Colors.snow
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
      case 'fulladdress':
        this.setState({
          colorFulladdress: Colors.snow
        })
        break
      case 'postalCode':
        this.setState({
          colorPostalcode: Colors.snow
        })
        break
      case 'empty':
        this.setState({
          colorNamaAlias: Colors.snow,
          colorNamaPenerima: Colors.snow,
          colorNoHape: Colors.snow,
          colorFulladdress: Colors.snow,
          colorProvince: Colors.snow,
          colorDistrict: Colors.snow,
          colorSubdistict: Colors.snow,
          colorVillage: Colors.snow,
          colorPostalcode: Colors.snow
        })
        break
      default:
        window.alert('Internal Error')
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
        <Text style={[styles.textLabel, {color: colorNamaAlias}]}>Nama Alias harus diisi</Text>
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
          maxLength={13}
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
            modalProvinsi: false,
            colorProvince: Colors.snow })
          this.submitting.district = true
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
            modalKabupaten: false,
            colorDistrict: Colors.snow })
          this.submitting.subdistrict = true
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
            modalKecamatan: false,
            colorSubdistict: Colors.snow
          })
          this.submitting.village = true
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
            modalKelurahan: false,
            colorVillage: Colors.snow
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
        <TouchableOpacity style={styles.modalContainer} onPress={() => this.setState({modalProvinsi: false})}>
          <ListView
            style={styles.menuProvinsiContainer}
            contentContainerStyle={{ flex: 1, flexWrap: 'wrap' }}
            dataSource={this.dataSource.cloneWithRows(this.state.provinsi)}
            renderRow={this.renderListProvinsi.bind(this)}
            enableEmptySections
          />
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
        <TouchableOpacity style={[styles.modalContainer]} onPress={() => this.setState({modalKabupaten: false})}>
          <ListView
            style={styles.menuProvinsiContainer}
            contentContainerStyle={{ flex: 1, flexWrap: 'wrap' }}
            dataSource={this.dataSource.cloneWithRows(this.state.kabupaten)}
            renderRow={this.renderListKabupaten.bind(this)}
            enableEmptySections
          />
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
        <TouchableOpacity style={[styles.modalContainer]} onPress={() => this.setState({modalKecamatan: false})}>
          <ListView
            style={styles.menuProvinsiContainer}
            dataSource={this.dataSource.cloneWithRows(this.state.kecamatan)}
            renderRow={this.renderListKecamatan.bind(this)}
            enableEmptySections
          />
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
        <TouchableOpacity activeOpacity={1} style={[styles.modalContainer]} onPress={() => this.setState({modalKelurahan: false})}>
          <ListView
            style={styles.menuProvinsiContainer}
            dataSource={this.dataSource.cloneWithRows(this.state.kelurahan)}
            renderRow={this.renderListKelurahan.bind(this)}
            enableEmptySections
          />
        </TouchableOpacity>
      </Modal>
    )
  }

  renderInfoLokasi () {
    const {isPrimary, colorPickerProv, colorPickerKab, colorPickerKec, colorPickerKel, isDisable2, isDisable3, isDisable4} = this.state
    const {colorFulladdress, colorProvince, colorDistrict, colorSubdistict, colorVillage, colorPostalcode} = this.state
    const img = isPrimary ? Images.centangBiru : null
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
          onFocus={() => this.onFocus('fulladdress')}
          onBlur={() => this.onBlur('fulladdress')}
        />
        <Text style={[styles.textLabel, {color: colorFulladdress}]}>Alamat lengkap harus diisi</Text>
        <View style={[styles.lokasiSeparator, {marginTop: 25}]}>
          <TouchableOpacity style={styles.pilihDestinasi} onPress={() => this.setState({ modalProvinsi: true })}>
            <Text style={[styles.inputText2, {flex: 1, marginLeft: 0, color: colorPickerProv}]}>{this.state.provinsiTerpilih}</Text>
            <Image source={Images.down} style={styles.imagePicker} />
          </TouchableOpacity>
          <Text style={[styles.textLabelErrorInfo, {color: colorProvince}]}>Provinsi harus dipilih</Text>
        </View>
        <View style={styles.lokasiSeparator}>
          <TouchableOpacity disabled={isDisable2} style={styles.pilihDestinasi} onPress={() => this.setState({ modalKabupaten: true })}>
            <Text style={[styles.inputText2, {flex: 1, marginLeft: 0, color: colorPickerKab}]}>{this.state.kabTerpilih}</Text>
            <Image source={Images.down} style={styles.imagePicker} />
          </TouchableOpacity>
          <Text style={[styles.textLabelErrorInfo, {color: colorDistrict}]}>Kabupaten harus dipilih</Text>
        </View>
        <View style={styles.lokasiSeparator}>
          <TouchableOpacity disabled={isDisable3} style={styles.pilihDestinasi} onPress={() => this.setState({ modalKecamatan: true })}>
            <Text style={[styles.inputText2, {flex: 1, marginLeft: 0, color: colorPickerKec}]}>{this.state.kecTerpilih}</Text>
            <Image source={Images.down} style={styles.imagePicker} />
          </TouchableOpacity>
          <Text style={[styles.textLabelErrorInfo, {color: colorSubdistict}]}>Kecamatan harus dipilih</Text>
        </View>
        <View style={styles.lokasiSeparator}>
          <TouchableOpacity disabled={isDisable4} style={styles.pilihDestinasi} onPress={() => this.setState({ modalKelurahan: true })}>
            <Text style={[styles.inputText2, {flex: 1, marginLeft: 0, color: colorPickerKel}]}>{this.state.kelurahanterpilih}</Text>
            <Image source={Images.down} style={styles.imagePicker} />
          </TouchableOpacity>
          <Text style={[styles.textLabelErrorInfo, {color: colorVillage}]}>Kelurahan harus dipilih</Text>
        </View>
        <TextInput
          style={[styles.inputText, {marginTop: -5}]}
          value={this.state.kodePos}
          keyboardType='numeric'
          returnKeyType='done'
          autoCapitalize='none'
          autoCorrect
          maxLength={5}
          onChangeText={this.handleChangeKodePos}
          underlineColorAndroid='transparent'
          placeholder='Kode Pos'
          onFocus={() => this.onFocus('postalCode')}
          onBlur={() => this.onBlur('postalCode')}
        />
        <Text style={[styles.textLabelErrorInfo, {color: colorPostalcode}]}>Kode pos harus diisi</Text>
        <View style={[styles.lokasiSeparator, {marginBottom: 30.8}]} />
        <TouchableOpacity onPress={() => this.hadnleisPrimary()}>
          <View style={styles.containerEkspedisi}>
            <View style={styles.box}>
              <Image
                source={img}
                style={styles.gambarCentangBox}
              />
            </View>
            <Text style={[styles.title]}>Jadikan Alamat Utama</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  hadnleisPrimary () {
    if (this.state.isPrimary) {
      this.setState({isPrimary: false})
    } else {
      this.setState({isPrimary: true})
    }
  }

  createAlamat () {
    const {namaAlias, namaPenerima, nomerHape, alamatLengkap, kodePos, isPrimary, idProvinsiTerpilih, idKabTerpilih, idKecTerpilih, idkelTerpilih, idAlamat} = this.state
    if (namaAlias === '' && namaPenerima === '' && nomerHape === '' && alamatLengkap === '' && idProvinsiTerpilih === 0 && idKabTerpilih === 0 && idKecTerpilih === 0 && idkelTerpilih === 0 && kodePos === '') {
      this.onError('empty')
    } else if (namaAlias === '') {
      this.onError('alias')
    } else if (namaPenerima === '') {
      this.onError('penerima')
    } else if (nomerHape === '') {
      this.onError('nohape')
    } else if (alamatLengkap === '') {
      this.onError('fulladdress')
    } else if (idProvinsiTerpilih === 0) {
      this.onError('province')
    } else if (idKabTerpilih === 0) {
      this.onError('distric')
    } else if (idkelTerpilih === 0) {
      this.onError('subdistric')
    } else if (idkelTerpilih === 0) {
      this.onError('vilage')
    } else if (kodePos === '') {
      this.onError('postalCode')
    } else {
      if (this.state.edit) {
        this.setState({loading: true})
        this.submitting.updateAddress = true
        this.props.editAddress(idAlamat, idProvinsiTerpilih, idKabTerpilih, idKecTerpilih,
          idkelTerpilih, namaPenerima, nomerHape, kodePos, alamatLengkap, namaAlias, isPrimary)
        this.setState({edit: false})
      } else {
        this.setState({loading: true})
        this.submitting.addAddress = true
        this.props.createAddress(idProvinsiTerpilih, idKabTerpilih, idKecTerpilih,
          idkelTerpilih, namaPenerima, nomerHape, kodePos, alamatLengkap, namaAlias, isPrimary)
      }
    }
  }

  render () {
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
  return {
    dataProvinsi: state.provinces,
    dataKota: state.districts,
    dataSubDistrict: state.subdistricts,
    dataVilage: state.villages,
    dataAddress: state.addAddress,
    detailAddress: state.address,
    updateAddress: state.updateAddress
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProvinsi: () => dispatch(locationAction.getProvince()),
    getKota: (id) => dispatch(locationAction.getDistrict({ province_id: id })),
    getSubDistrict: (id) => dispatch(locationAction.getSubDistrict({ district_id: id })),
    getVillage: (id) => dispatch(locationAction.getVillage({ sub_district_id: id })),
    createAddress: (idProvinsiTerpilih, idKabTerpilih, idKecTerpilih,
        idkelTerpilih, namaPemilik, nomerHape, kodePos, alamatLengkap, namaAlias, isPrimary) =>
        dispatch(addressAction.addAddress({
          province_id: idProvinsiTerpilih,
          district_id: idKabTerpilih,
          sub_district_id: idKecTerpilih,
          village_id: idkelTerpilih,
          name: namaPemilik,
          phone_number: nomerHape,
          postal_code: kodePos,
          address: alamatLengkap,
          alias_address: namaAlias,
          is_primary: isPrimary
        })),
    getAlamat: () => dispatch(addressAction.getListAddress()),
    editAddress: (id, idProvinsiTerpilih, idKabTerpilih, idKecTerpilih,
        idkelTerpilih, namaPemilik, nomerHape, kodePos, alamatLengkap, namaAlias, isPrimary) =>
        dispatch(addressAction.updateAddress({
          id: id,
          province_id: idProvinsiTerpilih,
          district_id: idKabTerpilih,
          sub_district_id: idKecTerpilih,
          village_id: idkelTerpilih,
          name: namaPemilik,
          phone_number: nomerHape,
          postal_code: kodePos,
          address: alamatLengkap,
          alias_address: namaAlias,
          is_primary: isPrimary
        })),
    getDetailAlamat: (id) => dispatch(addressAction.getAddressDetail({id}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddAddress)
