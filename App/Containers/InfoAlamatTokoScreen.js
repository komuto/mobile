import React from 'react'
import { ScrollView, Modal, Text, ListView, View, TouchableOpacity, Image, TextInput, Alert } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import * as cekAlamat from '../actions/address'
import * as storeAction from '../actions/stores'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import * as locationAction from '../actions/location'

import { Images, Colors } from '../Themes'

// Styles
import styles from './Styles/InfoAlamatTokoScreenStyle'
import stylesLokasi from './Styles/ProductDetailScreenStyle'

class InfoAlamatTokoScreenScreen extends React.Component {
  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      namaPelimilik: this.props.namaPelimilik,
      email: this.props.email,
      noHP: this.props.noHP,
      alamatPemilik: '',
      kodePos: '',
      alamatLain: [],
      dataListEkspedisi: [],
      provinsiTerpilih: 'Semua Wilayah',
      kabTerpilih: 'Semua Wilayah',
      kecTerpilih: 'Semua Wilayah',
      kelurahanterpilih: 'Semua Wilayah',
      idProvinsiTerpilih: 0,
      idKabTerpilih: 0,
      idKecTerpilih: 0,
      idkelTerpilih: 0,
      provinsi: [],
      kabupaten: [],
      kecamatan: [],
      kelurahan: [],
      modalAlamatLain: false,
      modalProvinsi: false,
      modalKabupaten: false,
      modalKecamatan: false,
      modalKelurahan: false,
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
      ],
      alamatToko: this.props.dataToko,
      addressTemp: []
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataAlamats.status === 200) {
      this.setState({
        alamatLain: nextProps.dataAlamats.address
      })
    } if (nextProps.dataProvinsi.status === 200) {
      this.setState({
        provinsi: this.state.tambahanProvinsi.concat(nextProps.dataProvinsi.provinces)
      })
    } if (nextProps.dataKota.status === 200) {
      this.setState({
        kabupaten: this.state.tambahanKota.concat(nextProps.dataKota.districts)
      })
    } if (nextProps.dataSubDistrict.status === 200) {
      this.setState({
        kecamatan: this.state.tambahanKecamatan.concat(nextProps.dataSubDistrict.subdistricts)
      })
    } if (nextProps.dataVilage.status === 200) {
      this.setState({
        kelurahan: this.state.tambahanKelurahan.concat(nextProps.dataVilage.villages)
      })
    } if (nextProps.dataStore.status > 200) {
      Alert.alert('Maaf..', nextProps.dataStore.message)
    }
  }

  componentDidMount () {
    this.props.getAlamat()
    this.props.getProvinsi()
    this.props.getKota(11)
  }

  handleChangeAlamat = (text) => {
    this.setState({ alamatPemilik: text })
  }

  handleChangeKodePos = (text) => {
    this.setState({ kodePos: text })
  }

  handleAlamatChange (alamat, provinsi, idProv, kabupaten, idKab, kecamatan, idKec, kelurahan, idKel, kodePos) {
    this.setState({
      modalAlamatLain: false,
      alamatPemilik: alamat,
      provinsiTerpilih: provinsi,
      kabTerpilih: kabupaten,
      kecTerpilih: kecamatan,
      kelurahanterpilih: kelurahan,
      kodePos: kodePos,
      idProvinsiTerpilih: idProv,
      idKabTerpilih: idKab,
      idKecTerpilih: idKec,
      idkelTerpilih: idKel
    })
  }

  renderRowAlamat (rowData) {
    return (
      <TouchableOpacity onPress={() =>
        this.handleAlamatChange(
          rowData.address,
          rowData.province.name,
          rowData.province.id,
          rowData.district.name,
          rowData.district.id,
          rowData.subDistrict.name,
          rowData.subDistrict.id,
          rowData.village.name,
          rowData.village.id,
          rowData.postal_code,
        )}>
        <View style={[styles.titlePilihAlamat]}>
          <Text style={styles.textJenisAlamat}>{rowData.alias_address}</Text>
          <Text style={styles.textAlamatLengkap}>{rowData.address}, {rowData.village.name}, {rowData.subDistrict.name}, {rowData.district.name}, {rowData.province.name} {rowData.postal_code}</Text>
        </View>
      </TouchableOpacity>
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
            idkelTerpilih: rowData.id,
            modalKelurahan: false
          })
        }}
      >
        <Text style={[stylesLokasi.textBagikan, { marginLeft: 0 }]}>{rowData.name}</Text>
      </TouchableOpacity>
    )
  }

  modalAlamatLain () {
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.modalAlamatLain}
        onRequestClose={() => this.setState({ modalAlamatLain: false })}
        >
        <View style={styles.rowContainer}>
          <TouchableOpacity activeOpacity={1} style={styles.bgModal} onPress={() => this.setState({modalAlamatLain: false})} />
          <View style={styles.renderRowContainer}>
            <View style={[styles.titlePilihAlamat, {height: 53}]}>
              <Text style={styles.textTitleAlamat}>Pilih Alamat</Text>
            </View>
            <ScrollView style={{marginBottom: 50}}>
              <ListView
                enableEmptySections
                dataSource={this.dataSource.cloneWithRows(this.state.alamatLain)}
                renderRow={this.renderRowAlamat.bind(this)}
              />
            </ScrollView>
          </View>
        </View>
      </Modal>
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

  renderPickerLokasi () {
    return (
      <View>
        <View style={styles.lokasiSeparator}>
          <Text style={[styles.textLabel]}>Provinsi</Text>
          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.pilihDestinasi} onPress={() => this.setState({ modalProvinsi: true })}>
              <Text style={[styles.inputText, {flex: 1, marginLeft: 0}]}>{this.state.provinsiTerpilih}</Text>
              <Image source={Images.down} style={styles.imagePicker} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.lokasiSeparator}>
          <Text style={[styles.textLabel]}>Kota / Kabupaten</Text>
          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.pilihDestinasi} onPress={() => this.setState({ modalKabupaten: true })}>
              <Text style={[styles.inputText, {flex: 1, marginLeft: 0}]}>{this.state.kabTerpilih}</Text>
              <Image source={Images.down} style={styles.imagePicker} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.lokasiSeparator}>
          <Text style={[styles.textLabel]}>Kecamatan</Text>
          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.pilihDestinasi} onPress={() => this.setState({ modalKecamatan: true })}>
              <Text style={[styles.inputText, {flex: 1, marginLeft: 0}]}>{this.state.kecTerpilih}</Text>
              <Image source={Images.down} style={styles.imagePicker} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.lokasiSeparator}>
          <Text style={[styles.textLabel]}>Kelurahan</Text>
          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.pilihDestinasi} onPress={() => this.setState({ modalKelurahan: true })}>
              <Text style={[styles.inputText, {flex: 1, marginLeft: 0}]}>{this.state.kelurahanterpilih}</Text>
              <Image source={Images.down} style={styles.imagePicker} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  renderStateFour () {
    const {alamatPemilik, kodePos} = this.state
    return (
      <View>
        <ScrollView style={{marginBottom: 40, backgroundColor: Colors.background}}>
          <View style={styles.infoAlamatContainer}>
            <TouchableOpacity style={styles.pilihAlamat} onPress={() => this.setState({ modalAlamatLain: true })}>
              <Text style={styles.textButtonPilihAlamat}>
                Ambil dari Alamat yang ada
              </Text>
              <Image source={Images.rightArrow} style={{height: 24, width: 24}} />
            </TouchableOpacity>
            <View style={{paddingLeft: 1}}>
              <Text style={styles.textLabel}>Alamat Pemilik</Text>
              <View style={[styles.inputContainer, {marginBottom: 24.8}]}>
                <TextInput
                  style={[styles.inputText, {paddingBottom: 3}]}
                  value={alamatPemilik}
                  keyboardType='default'
                  returnKeyType='next'
                  autoCapitalize='none'
                  autoCorrect
                  onChangeText={this.handleChangeAlamat}
                  underlineColorAndroid='transparent'
                  placeholder=''
                />
              </View>
              {this.renderPickerLokasi()}
              <Text style={styles.textLabel}>Kode Pos</Text>
              <View style={[styles.inputContainer, {marginBottom: 0}]}>
                <TextInput
                  style={[styles.inputText, {paddingBottom: 3}]}
                  value={kodePos}
                  keyboardType='default'
                  returnKeyType='next'
                  autoCapitalize='none'
                  autoCorrect
                  onChangeText={this.handleChangeKodePos}
                  underlineColorAndroid='transparent'
                  placeholder=''
                />
              </View>
            </View>
          </View>
          <TouchableOpacity style={[styles.buttonnext]} onPress={() => this.handlecreateStore()}>
            <Text style={styles.textButtonNext}>
              Lanjutkan
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }

  handlecreateStore () {
    const {alamatToko, addressTemp, idProvinsiTerpilih, idKabTerpilih, idKecTerpilih, idkelTerpilih, namaPelimilik, email, noHP, kodePos, alamatPemilik} = this.state
    addressTemp[0] = idProvinsiTerpilih
    addressTemp[1] = idKabTerpilih
    addressTemp[2] = idKecTerpilih
    addressTemp[3] = idkelTerpilih
    addressTemp[4] = namaPelimilik
    addressTemp[5] = email
    addressTemp[6] = noHP
    addressTemp[7] = kodePos
    addressTemp[8] = alamatPemilik
    alamatToko[3] = addressTemp
    console.log(alamatToko)
    this.props.createStores(alamatToko)
    NavigationActions.notifikasi({
      type: ActionConst.PUSH,
      tipeNotikasi: 'successBukaToko'
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={[styles.state, {borderColor: Colors.background, backgroundColor: Colors.red}]}>
            <Text style={[styles.textState, {color: Colors.background}]}>1</Text>
          </View>
          <View style={styles.line} />
          <View style={[styles.state, {borderColor: Colors.background, backgroundColor: Colors.red}]}>
            <Text style={[styles.textState, {color: Colors.background}]}>2</Text>
          </View>
          <View style={styles.line} />
          <View style={[styles.state, {borderColor: Colors.background, backgroundColor: Colors.red}]}>
            <Text style={[styles.textState, {color: Colors.background}]}>3</Text>
          </View>
          <View style={styles.line} />
          <View style={[styles.state, {borderColor: Colors.background, backgroundColor: Colors.red}]}>
            <Text style={[styles.textState, {color: Colors.background}]}>4</Text>
          </View>
        </View>
        {this.renderStateFour()}
        {this.modalAlamatLain()}
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
    dataAlamats: state.address,
    dataProvinsi: state.provinces,
    dataKota: state.districts,
    dataSubDistrict: state.subdistricts,
    dataVilage: state.villages,
    dataStore: state.createStore
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAlamat: () => dispatch(cekAlamat.getListAddress()),
    getProvinsi: () => dispatch(locationAction.getProvince()),
    getKota: (id) => dispatch(locationAction.getDistrict({ province_id: id })),
    getSubDistrict: (id) => dispatch(locationAction.getSubDistrict({ district_id: id })),
    getVillage: (id) => dispatch(locationAction.getVillage({ sub_district_id: id })),
    createStores: (stores) => dispatch(storeAction.createStore({store: stores[0], expedition_services: stores[1], user: stores[2], address: stores[3]}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoAlamatTokoScreenScreen)
