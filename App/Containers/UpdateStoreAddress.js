import React from 'react'
import {
  ScrollView,
  ToastAndroid,
  Modal,
  ActivityIndicator,
  Text,
  ListView,
  View,
  TouchableOpacity,
  Image,
  TextInput
} from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import {isFetching, isError, isFound} from '../Services/Status'
import Reactotron from 'reactotron-react-native'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import * as locationAction from '../actions/location'
import * as storeAction from '../actions/stores'

import { Images, Colors } from '../Themes'

// Styles
import styles from './Styles/InfoAlamatTokoScreenStyle'
import stylesLokasi from './Styles/ProductDetailScreenStyle'

class UpdateStoreAddress extends React.Component {
  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.submitting = {
      update: false,
      province: false,
      district: false,
      subDistrict: false,
      village: false
    }
    this.state = {
      alamatPemilik: this.props.alamat,
      kodePos: this.props.kodePos,
      provinsiTerpilih: this.props.provinsi,
      kabTerpilih: this.props.kabupaten,
      kecTerpilih: this.props.kecamatan,
      kelurahanterpilih: this.props.kelurahan,
      idProvinsiTerpilih: this.props.idProvinsi,
      idKabTerpilih: this.props.idKabupaten,
      idKecTerpilih: this.props.idKecamatan,
      idkelTerpilih: this.props.idKelurahan,
      provinsi: [],
      kabupaten: [],
      kecamatan: [],
      kelurahan: [],
      modalProvinsi: false,
      modalKabupaten: false,
      modalKecamatan: false,
      modalKelurahan: false,
      loading: true,
      modalSuskesHapus: false,
      isDisable2: true,
      isDisable3: true,
      isDisable4: true,
      colorNamaAlias: Colors.snow,
      colorNamaPenerima: Colors.snow,
      colorNoHape: Colors.snow,
      colorFulladdress: Colors.snow,
      colorProvince: Colors.snow,
      colorDistrict: Colors.snow,
      colorSubdistict: Colors.snow,
      colorVillage: Colors.snow,
      colorPostalcode: Colors.snow
    }
  }

  componentWillReceiveProps (nextProps) {
    const {
      dataProvinsi,
      dataKota,
      dataSubDistrict,
      dataVillage,
      dataUpdate
    } = nextProps

    if (!isFetching(dataProvinsi) && this.submitting.province) {
      this.submitting = { ...this.submitting, province: false }
      if (isError(dataProvinsi)) {
        ToastAndroid.show(dataProvinsi.message, ToastAndroid.SHORT)
      }
      if (isFound(dataProvinsi)) {
        this.setState({
          provinsi: dataProvinsi.provinces,
          loading: false
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
          isDisable2: false,
          loading: false
        })
      }
    }

    if (!isFetching(dataSubDistrict) && this.submitting.subDistrict) {
      this.submitting = { ...this.submitting, subDistrict: false }
      if (isError(dataSubDistrict)) {
        ToastAndroid.show(dataSubDistrict.message, ToastAndroid.SHORT)
      }
      if (isFound(dataSubDistrict)) {
        this.setState({
          kecamatan: dataSubDistrict.subdistricts,
          isDisable3: false,
          loading: false
        })
      }
    }

    if (!isFetching(dataVillage) && this.submitting.village) {
      this.submitting = { ...this.submitting, village: false }
      if (isError(dataVillage)) {
        ToastAndroid.show(dataVillage.message, ToastAndroid.SHORT)
      }
      if (isFound(dataVillage)) {
        this.setState({
          kelurahan: dataVillage.villages,
          isDisable4: false,
          loading: false
        })
      }
    }

    if (!isFetching(dataUpdate) && this.submitting.updateAddress) {
      this.submitting = { ...this.submitting, updateAddress: false }
      if (isError(dataUpdate)) {
        ToastAndroid.show(dataUpdate.message, ToastAndroid.SHORT)
      }
      if (isFound(dataUpdate)) {
        this.setState({
          modalSuskesHapus: true,
          loading: false
        })
      }
    }
  }

  componentDidMount () {
    Reactotron
    Reactotron.log('update store address')
    if (!this.submitting.province && !this.props.district && !this.submitting.subDistrict && !this.submitting.village) {
      this.submitting = {
        ...this.submitting,
        province: true,
        district: true,
        subDistrict: true,
        village: true
      }
      this.props.getProvinsi()
      this.props.getKabupaten(this.state.idProvinsiTerpilih)
      this.props.getSubDistrict(this.state.idKabTerpilih)
      this.props.getVillage(this.state.idKecTerpilih)
    }
  }

  onError = (field) => {
    switch (field) {
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

  handleChangeAlamat = (text) => {
    this.setState({ alamatPemilik: text })
  }

  handleChangeKodePos = (text) => {
    this.setState({ kodePos: text })
  }

  handleSussesUpdate () {
    this.setState({modalSuskesHapus: false})
    this.props.getAlamatToko()
    NavigationActions.managestoreaddress({ type: ActionConst.PUSH, loading: true, notif: true })
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
            modalProvinsi: false,
            colorProvince: Colors.snow,
            loading: true })
          this.submitting.district = true
          this.props.getKabupaten(rowData.id)
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
            modalKabupaten: false,
            colorDistrict: Colors.snow,
            loading: true })
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
            modalKecamatan: false,
            colorSubdistict: Colors.snow,
            loading: true
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

  modalProvince () {
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

  modalDistrict () {
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

  modalSubdistrict () {
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

  modalVillage () {
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

  renderPickerLokasi () {
    const {isDisable2, isDisable3, isDisable4} = this.state
    const {colorProvince, colorDistrict, colorSubdistict, colorVillage} = this.state
    return (
      <View>
        <View style={styles.lokasiSeparator}>
          <Text style={[styles.textLabel]}>Provinsi</Text>
          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.pilihDestinasi} onPress={() => this.setState({ modalProvinsi: true })}>
              <Text style={[styles.inputText, {flex: 1, marginLeft: 0, paddingTop: 8, paddingBottom: 4.3}]}>{this.state.provinsiTerpilih}</Text>
              <Image source={Images.down} style={styles.imagePicker} />
            </TouchableOpacity>
          </View>
          <Text style={[styles.textLabelErrorInfo, {color: colorProvince}]}>Provinsi harus dipilih</Text>
        </View>
        <View style={styles.lokasiSeparator}>
          <Text style={[styles.textLabel]}>Kota / Kabupaten</Text>
          <View style={styles.inputContainer}>
            <TouchableOpacity disabled={isDisable2} style={styles.pilihDestinasi} onPress={() => this.setState({ modalKabupaten: true })}>
              <Text style={[styles.inputText, {flex: 1, marginLeft: 0, paddingTop: 8, paddingBottom: 4.3}]}>{this.state.kabTerpilih}</Text>
              <Image source={Images.down} style={styles.imagePicker} />
            </TouchableOpacity>
          </View>
          <Text style={[styles.textLabelErrorInfo, {color: colorDistrict}]}>Kabupaten harus dipilih</Text>
        </View>
        <View style={styles.lokasiSeparator}>
          <Text style={[styles.textLabel]}>Kecamatan</Text>
          <View style={styles.inputContainer}>
            <TouchableOpacity disabled={isDisable3} style={styles.pilihDestinasi} onPress={() => this.setState({ modalKecamatan: true })}>
              <Text style={[styles.inputText, {flex: 1, marginLeft: 0, paddingTop: 8, paddingBottom: 4.3}]}>{this.state.kecTerpilih}</Text>
              <Image source={Images.down} style={styles.imagePicker} />
            </TouchableOpacity>
          </View>
          <Text style={[styles.textLabelErrorInfo, {color: colorSubdistict}]}>Kecamatan harus dipilih</Text>
        </View>
        <View style={styles.lokasiSeparator}>
          <Text style={[styles.textLabel]}>Kelurahan</Text>
          <View style={styles.inputContainer}>
            <TouchableOpacity disabled={isDisable4} style={styles.pilihDestinasi} onPress={() => this.setState({ modalKelurahan: true })}>
              <Text style={[styles.inputText, {flex: 1, marginLeft: 0, paddingTop: 8, paddingBottom: 4.3}]}>{this.state.kelurahanterpilih}</Text>
              <Image source={Images.down} style={styles.imagePicker} />
            </TouchableOpacity>
          </View>
          <Text style={[styles.textLabelErrorInfo, {color: colorVillage}]}>Kelurahan harus dipilih</Text>
        </View>
      </View>
    )
  }

  modalSuccesUpdate () {
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.modalSuskesHapus}
        onRequestClose={() => this.setState({ Modal: false })}
        >
        <View style={styles.bgModal}>
          <View style={styles.contaierModalSukses}>
            <Image source={Images.sukesHapusAlamat} style={styles.image} />
            <Text style={styles.titleModal}>Alamat berhasil diubah. Kami{'\n'}akan mengirim kode Verifikasi{'\n'}ke alamat baru Anda</Text>
            <Text style={styles.titleModal2}>
            Dengan mengubah Alamat, status toko{'\n'}
            Anda menjadi tidak terverifikasi{'\n'}
            sampai Anda memasukkan kode{'\n'}
            verifikasi yang akan kami kirimkan{'\n'}
            ke alamat baru Anda</Text>
            <TouchableOpacity style={styles.verifikasiButton} onPress={() => this.handleSussesUpdate()}>
              <Text style={styles.textVerifikasiButton}>Tutup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }

  renderStateFour () {
    const {alamatPemilik, kodePos, colorFulladdress, colorPostalcode} = this.state
    return (
      <View>
        <ScrollView style={{backgroundColor: Colors.background}}>
          <View style={styles.infoAlamatContainer}>
            <View style={{paddingLeft: 1}}>
              <Text style={styles.textLabel}>Alamat Pemilik</Text>
              <View style={[styles.inputContainer]}>
                <TextInput
                  style={[styles.inputText]}
                  value={alamatPemilik}
                  keyboardType='default'
                  returnKeyType='next'
                  autoCapitalize='none'
                  autoCorrect
                  onChangeText={this.handleChangeAlamat}
                  underlineColorAndroid='transparent'
                  placeholder=''
                  onFocus={() => this.onFocus('fulladdress')}
                  onBlur={() => this.onBlur('fulladdress')}
                />
              </View>
              <Text style={[styles.textLabel, {color: colorFulladdress}]}>Alamat lengkap harus diisi</Text>
              {this.renderPickerLokasi()}
              <Text style={styles.textLabel}>Kode Pos</Text>
              <View style={[styles.inputContainer, {marginBottom: 0}]}>
                <TextInput
                  style={[styles.inputText]}
                  value={kodePos}
                  keyboardType='numeric'
                  returnKeyType='next'
                  autoCapitalize='none'
                  autoCorrect
                  maxLength={5}
                  onChangeText={this.handleChangeKodePos}
                  underlineColorAndroid='transparent'
                  placeholder=''
                  onFocus={() => this.onFocus('postalCode')}
                  onBlur={() => this.onBlur('postalCode')}
                />
              </View>
              <Text style={[styles.textLabelErrorInfo, {color: colorPostalcode}]}>Kode pos harus diisi</Text>
            </View>
          </View>
          <TouchableOpacity style={[styles.buttonnext]} onPress={() => this.handleNextState()}>
            <Text style={styles.textButtonNext}>
              Simpan Perubahan
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }

  handleNextState () {
    const {idProvinsiTerpilih, idKabTerpilih, idKecTerpilih, idkelTerpilih, kodePos, alamatPemilik} = this.state
    if (alamatPemilik === '') {
      this.onError('fulladdress')
    }
    if (idProvinsiTerpilih === 0) {
      this.onError('province')
    }
    if (idKabTerpilih === 0) {
      this.onError('distric')
    }
    if (idkelTerpilih === 0) {
      this.onError('subdistric')
    }
    if (idkelTerpilih === 0) {
      this.onError('village')
    }
    if (kodePos === '') {
      this.onError('postalCode')
    }
    if (alamatPemilik !== '' && idProvinsiTerpilih !== 0 && idKabTerpilih !== 0 && idKecTerpilih !== 0 && idkelTerpilih !== 0 && kodePos.length === 5) {
      this.setState({loading: true})
      this.submitting.updateAddress = true
      this.props.updateAlamatToko(idProvinsiTerpilih, idKabTerpilih, idKecTerpilih, idkelTerpilih, kodePos, alamatPemilik)
    } else {
      ToastAndroid.show('Kode Pos tidak valid', ToastAndroid.SHORT)
    }
  }

  render () {
    const spinner = this.state.loading
    ? (<View style={styles.spinner}>
      <ActivityIndicator color='#ef5656' size='large' />
    </View>) : (<View />)
    return (
      <View style={styles.container}>
        {this.renderStateFour()}
        {this.modalProvince()}
        {this.modalDistrict()}
        {this.modalSubdistrict()}
        {this.modalVillage()}
        {this.modalSuccesUpdate()}
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
    dataVillage: state.villages,
    dataUpdate: state.updateStoreAddress
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProvinsi: () => dispatch(locationAction.getProvince()),
    getKabupaten: (id) => dispatch(locationAction.getDistrict({ province_id: id })),
    getSubDistrict: (id) => dispatch(locationAction.getSubDistrict({ district_id: id })),
    getVillage: (id) => dispatch(locationAction.getVillage({ sub_district_id: id })),
    updateAlamatToko: (idProv, idKab, idKec, idKel, kodePos, alamat) => dispatch(storeAction.updateStoreAddress({
      province_id: idProv,
      district_id: idKab,
      sub_district_id: idKec,
      village_id: idKel,
      postal_code: kodePos,
      address: alamat
    })),
    getAlamatToko: () => dispatch(storeAction.getStoreAddress())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateStoreAddress)
