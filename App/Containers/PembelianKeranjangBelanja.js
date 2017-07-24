import React from 'react'
import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  ListView,
  TextInput
} from 'react-native'
import { connect } from 'react-redux'
import { MaskService } from 'react-native-masked-text'
import * as serviceAction from '../actions/expedition'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Images } from '../Themes'

// Styles
import styles from './Styles/PembelianKeranjangBelanjaStyle'

class PembelianKeranjangBelanja extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    const rowHasChanged = (r1, r2) => r1 !== r2
    const ds = new ListView.DataSource({rowHasChanged})
    const dataKurir = []
    const dataCost = []
    const dataAsuransi = []
    this.state = {
      dataSourceKurir: ds.cloneWithRows(dataKurir),
      dataSourceSubKurir: ds.cloneWithRows(dataCost),
      dataSourceAsuransi: ds.cloneWithRows(dataAsuransi),
      idProduct: this.props.dataDetailProduk.detail.product.id,
      price: this.props.dataDetailProduk.detail.product.price,
      foto: this.props.dataDetailProduk.detail.images[0].file,
      namaProduk: this.props.dataDetailProduk.detail.product.name,
      countProduct: this.props.countProduct,
      weight: this.props.dataDetailProduk.detail.product.weight,
      originId: this.props.dataDetailProduk.detail.store.district.ro_id,
      alamat: this.props.alamat,
      jalan: this.props.jalan,
      nama: this.props.name,
      roIdDistrict: this.props.roIdDistrict,
      idDistrict: this.props.idDistrict,
      district: this.props.district,
      idProvinsi: this.props.idProvinsi,
      provinsi: this.props.provinsi,
      kabupaten: this.props.kabupaten,
      idKabupaten: this.props.idKabupaten,
      kodepos: this.props.kodepos,
      email: this.props.email,
      telepon: this.props.telepon,
      kurir: this.props.kurir,
      tipeKurir: this.props.tipeKurir,
      asuransi: this.props.asuransi,
      catatan: this.props.catatan,
      subtotal: parseInt(this.props.dataDetailProduk.detail.product.price) * parseInt(this.props.countProduct),
      biayaAsuransi: (parseInt(this.props.expeditionFee) * parseInt(this.props.countProduct) * parseInt(this.props.dataDetailProduk.detail.product.price)) / 100,
      expeditionFee: this.props.expeditionFee,
      ongkir: this.props.ongkir,
      diskon: '0',
      total: this.props.totalHarga,
      dataKurir: this.props.dataDetailProduk.detail.expeditions,
      dataCost: [],
      dataAsuransi: [
        {
          'id': 1,
          'title': 'Ya',
          'cost': '8000'
        },
        {
          'id': 0,
          'title': 'Tidak',
          'cost': '0'
        }
      ],
      activeKurir: 0,
      activeSubKurir: 0,
      activeAsuransi: 0,
      idKurir: '',
      idSubKurir: '',
      idAsuransi: 0,
      modalKurir: false,
      modalSubkurir: false,
      modalAsuransi: false,
      modalPromo: false,
      statusPromo: false,
      kodeVoucher: ''
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataServices.status === 200) {
      console.log(nextProps.dataServices.charges)
      this.setState({
        dataCost: nextProps.dataServices.charges
      })
    }
  }

  renderProduct () {
    const totalHarga = MaskService.toMask('money', this.state.price, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    return (
      <View style={styles.border}>
        <View style={styles.profile}>
          <Image
            source={{ uri: this.state.foto }}
            style={styles.styleFotoToko}
          />
          <View style={styles.namaContainer}>
            <Text style={styles.textNama}>
              {this.state.namaProduk}
            </Text>
            <Text style={styles.textKelola}>
              {totalHarga}
            </Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.textHapus}>Hapus</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  renderJumlah () {
    const {countProduct} = this.state
    return (
      <View style={[styles.qualityContainer, {paddingTop: 25}]}>
        <View style={[styles.eachQualiyNoMargin, {paddingBottom: 25}]}>
          <Text style={[styles.qualityText, {marginBottom: 0, paddingLeft: 5}]}>Jumlah:</Text>
        </View>
        <View style={[styles.eachQualiyNoMargin, {flexDirection: 'row', paddingRight: 20, paddingBottom: 0}]}>
          <TouchableOpacity onPress={() => this.substract()}>
            <Image source={Images.sub} style={styles.imageOperator} />
          </TouchableOpacity>
          <Text style={[styles.qualityText, styles.textJumlah]}>{countProduct}</Text>
          <TouchableOpacity onPress={() => this.add()}>
            <Image source={Images.add} style={styles.imageOperator} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  substract () {
    const {countProduct, price} = this.state
    if (countProduct > 0) {
      const temp = (countProduct - 1) * price
      this.setState({
        countProduct: countProduct - 1,
        subtotal: temp
      })
    }
  }

  add () {
    const {countProduct, price} = this.state
    const temp = (countProduct + 1) * price
    this.setState({
      countProduct: countProduct + 1,
      subtotal: temp
    })
  }

  renderAlamat () {
    const { alamat, jalan, nama, provinsi, telepon } = this.state
    return (
      <View style={styles.alamatContainer}>
        <View style={styles.alamat}>
          <Text style={styles.textNama}> {alamat} </Text>
          <Text style={styles.textAlamat}> {nama} </Text>
          <Text style={styles.textAlamat}> {jalan} </Text>
          <Text style={styles.textAlamat}> {provinsi} </Text>
          <Text style={styles.textAlamat}> {telepon} </Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.textGanti}>Ganti</Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderInformasiPemesanan () {
    const { kurir, tipeKurir, asuransi, catatan } = this.state
    return (
      <View>
        <TouchableOpacity
          style={styles.containerPicker}
          onPress={() => this.setState({ modalKurir: true })}
        >
          <Text style={[styles.teksPicker, { flex: 1 }]}>Kurir Pengiriman</Text>
          <Text style={styles.teksPicker}>{kurir}</Text>
          <Image source={Images.down} style={styles.imagePicker} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.containerPicker}
          onPress={() => this.setState({ modalSubkurir: true })}
        >
          <Text style={[styles.teksPicker, { flex: 1 }]}>Paket Pengiriman</Text>
          <Text style={styles.teksPicker}>{tipeKurir}</Text>
          <Image source={Images.down} style={styles.imagePicker} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.containerPicker}
          onPress={() => this.setState({ modalAsuransi: true })}
        >
          <Text style={[styles.teksPicker, { flex: 1 }]}>Asuransi</Text>
          <Text style={styles.teksPicker}>{asuransi}</Text>
          <Image source={Images.down} style={styles.imagePicker} />
        </TouchableOpacity>
        <View style={styles.catatanContainer}>
          <Text style={styles.teksPicker}>Catatan</Text>
          <Text style={styles.textAlamat}>{catatan}</Text>
        </View>
      </View>
    )
  }

  renderRincian () {
    const { subtotal, biayaAsuransi, ongkir } = this.state
    const total = parseInt(subtotal) + parseInt(biayaAsuransi) + parseInt(ongkir)
    const hargaSubtotal = MaskService.toMask('money', subtotal, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    const hargaBiayaAsuransi = MaskService.toMask('money', biayaAsuransi, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    const hargaOngkir = MaskService.toMask('money', ongkir, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    const hargaTotal = MaskService.toMask('money', total, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    return (
      <View style={styles.rincianContainer}>
        <Text style={[styles.textBold, { marginBottom: 10 }]}>Rincian Harga</Text>
        <View style={styles.rincian}>
          <Text style={[styles.teksPicker, { flex: 1 }]}>Subtotal</Text>
          <Text style={styles.teksPicker}>{hargaSubtotal}</Text>
        </View>
        <View style={styles.rincian}>
          <Text style={[styles.teksPicker, { flex: 1 }]}>Biaya Asuransi</Text>
          <Text style={styles.teksPicker}>{hargaBiayaAsuransi}</Text>
        </View>
        <View style={styles.rincian}>
          <Text style={[styles.teksPicker, { flex: 1 }]}>Ongkos Kirim</Text>
          <Text style={styles.teksPicker}>{hargaOngkir}</Text>
        </View>
        <View style={styles.rincian}>
          <Text style={[styles.textBold, { flex: 1 }]}>Total</Text>
          <Text style={styles.textBold}>{hargaTotal}</Text>
        </View>
      </View>
    )
  }

  renderButtonKode () {
    return (
      <View style={styles.containerPicker}>
        <Text style={[styles.teksPicker, { flex: 1, marginTop: 0 }]}>Punya Kode Voucher</Text>
        <TouchableOpacity onPress={() => this.setState({ modalPromo: true })}>
          <Text style={styles.textGanti}>Gunakan Kode</Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderKode () {
    const { statusDiskon } = this.state
    const { diskon } = this.state
    const hargaDiskon = MaskService.toMask('money', diskon, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    if (statusDiskon) {
      return (
        <View style={styles.rincianContainer}>
          <View style={styles.rincianDiskon}>
            <Text style={[styles.teksPicker, { flex: 1, marginTop: 0 }]}>Belanja Enak</Text>
            <TouchableOpacity>
              <Text style={styles.textHapus}>Batal</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.diskon}>- {hargaDiskon}</Text>
        </View>
      )
    } else {
      return null
    }
  }

  renderTotal () {
    const { subtotal, biayaAsuransi, ongkir, diskon } = this.state
    const total = parseInt(subtotal) + parseInt(biayaAsuransi) + parseInt(ongkir) - parseInt(diskon)
    const hargaTotal = MaskService.toMask('money', total, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    return (
      <View style={styles.totalContainer}>
        <View style={styles.total}>
          <Text style={styles.teksPicker}>Total Pembayaran</Text>
          <Text style={styles.hargaTotal}>{hargaTotal}</Text>
        </View>
        <View style={styles.total}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.textButton}>Bayar Sekarang</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  renderModalKurir () {
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.modalKurir}
        onRequestClose={() => this.setState({ modalKurir: false })}
        >
        <TouchableOpacity style={styles.modalContainer} onPress={() => this.setState({ modalKurir: false })}>
          <ScrollView style={styles.menuProvinsiContainer}>
            <View style={styles.headerListView}>
              <Text style={styles.headerTextListView}>Pilih Ekspedisi Pengiriman</Text>
            </View>
            <ListView
              dataSource={this.dataSource.cloneWithRows(this.state.dataKurir)}
              renderRow={this.renderListKurir.bind(this)}
              enableEmptySections
            />
          </ScrollView>
        </TouchableOpacity>
      </Modal>
    )
  }

  renderModalSubKurir () {
    const { kurir } = this.state
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.modalSubkurir}
        onRequestClose={() => this.setState({ modalSubkurir: false })}
        >
        <TouchableOpacity style={styles.modalContainer} onPress={() => this.setState({ modalSubkurir: false })}>
          <ScrollView style={styles.menuProvinsiContainer}>
            <View style={styles.headerListView}>
              <Text style={styles.headerTextListView}>Pilih paket pengiriman dari {kurir}</Text>
            </View>
            <ListView
              dataSource={this.dataSource.cloneWithRows(this.state.dataCost)}
              renderRow={this.renderListSubKurir.bind(this)}
              enableEmptySections
            />
          </ScrollView>
        </TouchableOpacity>
      </Modal>
    )
  }

  renderListSubKurir (rowData, section, row) {
    const centang = row === this.state.activeSubKurir ? Images.centang : Images.closewhite
    return (
      <TouchableOpacity
        style={[styles.menuLaporkan, { padding: 20 }]}
        activeOpacity={1}
        onPress={() => this.onPressSubKurir(row)}
      >
        <Text style={[styles.textBagikan, { marginLeft: 0, flex: 1 }]}>{rowData.full_name}</Text>
        <Text style={[styles.textBagikan, { marginRight: 10 }]}>{rowData.etd}</Text>
        <Text style={[styles.textBagikan, { marginRight: 10 }]}>{rowData.cost}</Text>
        <Image source={centang} style={styles.gambarCentang} />
      </TouchableOpacity>
    )
  }

  onPressSubKurir (row) {
    const {dataCost, activeSubKurir, dataSourceSubKurir} = this.state
    if (activeSubKurir !== row) {
      const newDataSource = dataCost.map(data => {
        return {...data, activeSubKurir: row === data.id}
      })
      this.setState({
        dataSourceSubKurir: dataSourceSubKurir.cloneWithRows(newDataSource),
        activeSubKurir: row
      })
    }
    this.setState({
      tipeKurir: dataCost[row].full_name,
      idSubKurir: dataCost[row].id,
      ongkir: dataCost[row].cost,
      modalSubkurir: false
    })
  }

  renderModalAsuransi () {
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.modalAsuransi}
        onRequestClose={() => this.setState({ modalAsuransi: false })}
        >
        <TouchableOpacity style={styles.modalContainer} onPress={() => this.setState({ modalAsuransi: false })}>
          <ScrollView style={styles.menuProvinsiContainer}>
            <View style={styles.headerListView}>
              <Text style={styles.headerTextListView}>Anda ingin menggunakan Asuransi?</Text>
            </View>
            <ListView
              dataSource={this.dataSource.cloneWithRows(this.state.dataAsuransi)}
              renderRow={this.renderListAsuransi.bind(this)}
              enableEmptySections
            />
          </ScrollView>
        </TouchableOpacity>
      </Modal>
    )
  }

  renderListKurir (rowData, section, row) {
    const centang = row === this.state.activeKurir ? Images.centang : null
    return (
      <TouchableOpacity
        style={[styles.menuLaporkan, { padding: 20 }]}
        activeOpacity={0.8}
        onPress={() => this.onPressKurir(row)}
      >
        <Image source={{ uri: rowData.logo }} style={styles.logoEkspedisi} />
        <Text style={[styles.textBagikan, { marginLeft: 0, flex: 1 }]}>{rowData.name}</Text>
        <Image source={centang} style={styles.gambarCentang} />
      </TouchableOpacity>
    )
  }

  onPressKurir (row) {
    const {idProduct, originId, roIdDistrict, dataKurir, activeKurir, dataSourceKurir} = this.state
    if (activeKurir !== row) {
      const newDataSource = dataKurir.map(data => {
        return {...data, activeKurir: row === data.id}
      })
      this.setState({
        dataSourceKurir: dataSourceKurir.cloneWithRows(newDataSource),
        activeKurir: row
      })
    }
    this.setState({
      kurir: dataKurir[row].name,
      idKurir: dataKurir[row].id,
      modalKurir: false
    })
    this.props.getServices(idProduct, originId, roIdDistrict, 1)
  }

  renderListAsuransi (rowData, section, row) {
    const centang = row === this.state.activeAsuransi ? Images.centang : null
    return (
      <TouchableOpacity
        style={[styles.menuLaporkan, { padding: 20 }]}
        activeOpacity={0.8}
        onPress={() => this.onPressAsuransi(row)}
      >
        <Text style={[styles.textBagikan, { marginLeft: 0, flex: 1 }]}>{rowData.title}</Text>
        <Image source={centang} style={styles.gambarCentang} />
      </TouchableOpacity>
    )
  }

  onPressAsuransi (row) {
    const {dataAsuransi, activeAsuransi, dataSourceAsuransi} = this.state
    if (activeAsuransi !== row) {
      const newDataSource = dataAsuransi.map(data => {
        return {...data, activeKurir: row === data.id}
      })
      this.setState({
        dataSourceAsuransi: dataSourceAsuransi.cloneWithRows(newDataSource),
        activeAsuransi: row
      })
    }
    this.setState({
      asuransi: dataAsuransi[row].title,
      idAsuransi: dataAsuransi[row].id,
      biayaAsuransi: dataAsuransi[row].cost,
      modalAsuransi: false })
  }

  handleCatatan = (text) => {
    this.setState({ kodeVoucher: text })
  }

  renderModalPromo () {
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.modalPromo}
        onRequestClose={() => this.setState({ modalPromo: false })}
        >
        <TouchableOpacity style={styles.modalContainer} onPress={() => this.setState({ modalPromo: false })}>
          <View style={styles.containerModalPromo}>
            <View style={styles.headerModalPromo}>
              <Text style={[styles.textBold, { flex: 1, marginTop: -3 }]}>Gunakan Kode Voucher</Text>
              <TouchableOpacity onPress={() => this.setState({ modalPromo: false })}>
                <Image source={Images.close} style={styles.imageOperator} />
              </TouchableOpacity>
            </View>
            <View style={styles.bodyModalPromo}>
              <Text style={[styles.textAlamat, { fontSize: 14 }]}>Masukkan Kode Voucher</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputKode}
                  value={this.state.kodeVoucher}
                  keyboardType='default'
                  autoCapitalize='characters'
                  onChangeText={this.handleCatatan}
                  underlineColorAndroid='transparent'
                />
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonVoucher}>
                  <Text style={styles.textButton}>
                    Gunakan Kode Voucher
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.renderProduct()}
          {this.renderJumlah()}
          {this.renderAlamat()}
          {this.renderInformasiPemesanan()}
          {this.renderRincian()}
          <View style={styles.separator} />
          {this.renderButtonKode()}
          {this.renderKode()}
          <View style={styles.separator} />
          {this.renderTotal()}
        </ScrollView>
        {this.renderModalKurir()}
        {this.renderModalSubKurir()}
        {this.renderModalAsuransi()}
        {this.renderModalPromo()}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataDetailProduk: state.productDetail,
    dataServices: state.estimatedCharges,
    dataAddress: state.primaryAddress
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getServices: (id, originId, destinationId, weight) => dispatch(serviceAction.estimatedShipping({
      id: id, origin_id: originId, destination_id: destinationId, weight: weight
    }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PembelianKeranjangBelanja)
