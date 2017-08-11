import React from 'react'
import { ScrollView, Modal, ActivityIndicator, Text, ListView, View, TouchableOpacity, Image, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import * as locationAction from '../actions/location'
import * as storeAction from '../actions/stores'

import { Images, Colors } from '../Themes'

// Styles
import styles from './Styles/InfoAlamatTokoScreenStyle'
import stylesLokasi from './Styles/ProductDetailScreenStyle'

class UpdateAlamatTokoScreen extends React.Component {
  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
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
      loading: false,
      modalSuskesHapus: false
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataProvinsi.status === 200) {
      this.setState({
        provinsi: nextProps.dataProvinsi.provinces
      })
    } if (nextProps.dataKota.status === 200) {
      this.setState({
        kabupaten: nextProps.dataKota.districts
      })
    } if (nextProps.dataSubDistrict.status === 200) {
      this.setState({
        kecamatan: nextProps.dataSubDistrict.subdistricts
      })
    } if (nextProps.dataVilage.status === 200) {
      this.setState({
        kelurahan: nextProps.dataVilage.villages
      })
    } if (nextProps.dataUpdate.status === 200) {
      this.setState({
        modalSuskesHapus: true
      })
    }
  }

  componentDidMount () {
    this.props.getProvinsi(this.state.idProvinsiTerpilih)
    this.props.getKabupaten(this.state.idKabTerpilih)
    this.props.getSubDistrict(this.state.idKecTerpilih)
    this.props.getVillage(this.state.idkelTerpilih)
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
    NavigationActions.kelolaalamattoko({ type: ActionConst.PUSH, loading: true, notif: true })
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
            modalProvinsi: false
          })
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

  renderModalProvinsi () {
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.modalProvinsi}
        onRequestClose={() => this.setState({ modalProvinsi: false })}
        >
        <TouchableOpacity style={styles.modalContainer} onPress={() => this.setState({modalProvinsi: false})}>
          <ScrollView style={styles.menuProvinsiContainer}>
            <ListView
              contentContainerStyle={{ flex: 1, flexWrap: 'wrap' }}
              dataSource={this.dataSource.cloneWithRows(this.state.provinsi)}
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
        <TouchableOpacity style={[styles.modalContainer]} onPress={() => this.setState({modalKabupaten: false})}>
          <ScrollView style={styles.menuProvinsiContainer}>
            <ListView
              contentContainerStyle={{ flex: 1, flexWrap: 'wrap' }}
              dataSource={this.dataSource.cloneWithRows(this.state.kabupaten)}
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
        <TouchableOpacity style={[styles.modalContainer]} onPress={() => this.setState({modalKecamatan: false})}>
          <ScrollView style={styles.menuProvinsiContainer}>
            <ListView
              dataSource={this.dataSource.cloneWithRows(this.state.kecamatan)}
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
        <TouchableOpacity activeOpacity={1} style={[styles.modalContainer]} onPress={() => this.setState({modalKelurahan: false})}>
          <ScrollView style={styles.menuProvinsiContainer}>
            <ListView
              dataSource={this.dataSource.cloneWithRows(this.state.kelurahan)}
              renderRow={this.renderListKelurahan.bind(this)}
              enableEmptySections
            />
          </ScrollView>
        </TouchableOpacity>
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
              <Text style={[styles.inputText, {flex: 1, marginLeft: 0, paddingTop: 8, paddingBottom: 4.3}]}>{this.state.provinsiTerpilih}</Text>
              <Image source={Images.down} style={styles.imagePicker} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.lokasiSeparator}>
          <Text style={[styles.textLabel]}>Kota / Kabupaten</Text>
          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.pilihDestinasi} onPress={() => this.setState({ modalKabupaten: true })}>
              <Text style={[styles.inputText, {flex: 1, marginLeft: 0, paddingTop: 8, paddingBottom: 4.3}]}>{this.state.kabTerpilih}</Text>
              <Image source={Images.down} style={styles.imagePicker} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.lokasiSeparator}>
          <Text style={[styles.textLabel]}>Kecamatan</Text>
          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.pilihDestinasi} onPress={() => this.setState({ modalKecamatan: true })}>
              <Text style={[styles.inputText, {flex: 1, marginLeft: 0, paddingTop: 8, paddingBottom: 4.3}]}>{this.state.kecTerpilih}</Text>
              <Image source={Images.down} style={styles.imagePicker} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.lokasiSeparator}>
          <Text style={[styles.textLabel]}>Kelurahan</Text>
          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.pilihDestinasi} onPress={() => this.setState({ modalKelurahan: true })}>
              <Text style={[styles.inputText, {flex: 1, marginLeft: 0, paddingTop: 8, paddingBottom: 4.3}]}>{this.state.kelurahanterpilih}</Text>
              <Image source={Images.down} style={styles.imagePicker} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  modalSuksesUpdateAlamat () {
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
    const {alamatPemilik, kodePos} = this.state
    return (
      <View>
        <ScrollView style={{backgroundColor: Colors.background}}>
          <View style={styles.infoAlamatContainer}>
            <View style={{paddingLeft: 1}}>
              <Text style={styles.textLabel}>Alamat Pemilik</Text>
              <View style={[styles.inputContainer, {marginBottom: 24.8}]}>
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
                />
              </View>
              {this.renderPickerLokasi()}
              <Text style={styles.textLabel}>Kode Pos</Text>
              <View style={[styles.inputContainer, {marginBottom: 0}]}>
                <TextInput
                  style={[styles.inputText]}
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
    this.setState({loading: true})
    this.props.updateAlamatToko(idProvinsiTerpilih, idKabTerpilih, idKecTerpilih, idkelTerpilih, kodePos, alamatPemilik)
  }

  render () {
    const spinner = this.state.loadign
    ? (<View style={styles.spinner}>
      <ActivityIndicator color='#ef5656' size='small' />
    </View>) : (<View />)
    return (
      <View style={styles.container}>
        {this.renderStateFour()}
        {this.renderModalProvinsi()}
        {this.renderModalKabupaten()}
        {this.renderModalKecamatan()}
        {this.renderModalKelurahan()}
        {this.modalSuksesUpdateAlamat()}
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

export default connect(mapStateToProps, mapDispatchToProps)(UpdateAlamatTokoScreen)
