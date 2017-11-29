import React from 'react'
import { View, Text, ActivityIndicator, BackAndroid, Modal, ListView, TextInput, TouchableOpacity, Image, ScrollView, ToastAndroid } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import RupiahFormat from '../Services/MaskedMoneys'

import CustomRadio from '../Components/CustomRadio'
import Switch from 'react-native-switch-pro'
import Dropshipping from './Dropshipping'
import * as katalogAction from '../actions/catalog'
import * as productAction from '../actions/product'
import * as otherAction from '../actions/other'
import Reactotron from 'reactotron-react-native'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/EditProductPriceAndSpecificationStyle'
import { Images, Colors, Fonts } from '../Themes'

class EditProductPriceAndSpecification extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      id: this.props.id,
      images: this.props.images,
      imageProduct: this.props.dataDetailProduct.storeProductDetail.images[0].file,
      namaProduk: this.props.name,
      loading: false,
      harga: this.props.price,
      diskon: this.props.discount,
      beratProduk: this.props.weight,
      stokProduk: '',
      namaKatalog: '',
      jenisProduk: 'baru',
      indexKondisi: this.props.condition,
      data: [{label: 'Bekas', value: 0}, {label: 'Baru', value: 1}],
      jenisAsuransi: 'opsional',
      indexAsuransi: 0,
      isInsurance: this.props.insurance,
      dataAsuransi: [{label: 'Opsional', value: 0}, {label: 'Wajib', value: 1}],
      listKatalog: [],
      modalDropshipping: false,
      grosirAktif: false,
      tambahDaftarGrosir: false,
      dropShippingActive: false,
      sembunyikanBarang: false,
      modalTambahKatalog: false,
      modalListKatalog: false,
      katalogTerpilih: 'Katalog Anda',
      colorPickerKatalog: Colors.labelgrey,
      idKatalogTerpilih: '',
      dataProduk: this.props.dataProduk,
      numberPrice: 0,
      minimalGrosir: '0',
      maksimalGrosir: '0',
      hargaGrosir: '0',
      normalizePrice: 0,
      callback: this.props.callback,
      commission: this.props.commission
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataCatalog.status === 200) {
      this.setState({
        listKatalog: nextProps.dataCatalog.catalogs
      })
    } else if (nextProps.dataCatalog.status !== 200 && nextProps.dataCatalog.status !== 0) {
      ToastAndroid.show(nextProps.dataCatalog.message, ToastAndroid.SHORT)
    }
    if (nextProps.dataCreateCatalog.status === 200) {
      nextProps.dataCreateCatalog.status = 0
      this.props.getCatalog()
    } else if (nextProps.dataCreateCatalog.status !== 200 && nextProps.dataCreateCatalog.status !== 0) {
      ToastAndroid.show(nextProps.dataCreateCatalog.message, ToastAndroid.SHORT)
    }
    if (nextProps.dataCommission.status === 200) {
      nextProps.dataCommission.status = 0
      this.setState({
        commission: nextProps.dataCommission.commission.commission,
        loading: false
      })
    } else if (nextProps.dataCommission.status !== 200 && nextProps.dataCommission.status !== 0) {
      nextProps.dataCommission.status = 0
      ToastAndroid.show(nextProps.dataCommission.message, ToastAndroid.SHORT)
    } if (nextProps.dataUpdateData.status === 200) {
      nextProps.dataUpdateData.status = 0
      NavigationActions.pop({ refresh: { callback: !this.state.callback } })
      ToastAndroid.show('Produk berhasil diubah', ToastAndroid.SHORT)
    } else if (nextProps.dataUpdateData.status !== 200 && nextProps.dataUpdateData.status !== 0) {
      nextProps.dataUpdateData.status = 0
      ToastAndroid.show(nextProps.dataUpdateData.message, ToastAndroid.SHORT)
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

  backButton () {
    NavigationActions.pop()
  }

  changeDiscount = (text) => {
    if (text > 100) {
      text = ''
    }
    this.setState({diskon: text})
  }

  changeHarga = (text) => {
    this.setState({harga: text})
    this.trySearch(text)
  }

  trySearch (text) {
    if (text !== '') {
      this.setState({loading: true})
      let commission = +text
      setTimeout(() => {
        this.props.getCommissions({price: commission})
      }, 1000)
    }
  }

  changeBeratProduk = (text) => {
    this.setState({beratProduk: text})
  }

  changeStokProduk = (text) => {
    this.setState({stokProduk: text})
  }

  changeNamaKatalog = (text) => {
    this.setState({namaKatalog: text})
  }

  changeMinimalGrosir = (text) => {
    this.setState({minimalGrosir: text})
  }

  changeMaksimalGrosir = (text) => {
    this.setState({maksimalGrosir: text})
  }

  changeHargaGrosir = (text) => {
    this.setState({hargaGrosir: text})
  }

  renderListCatalog (rowData) {
    return (
      <TouchableOpacity
        style={[styles.menuLaporkan, { padding: 15 }]}
        activeOpacity={0.8}
        onPress={() => {
          this.setState({
            katalogTerpilih: rowData.name,
            idKatalogTerpilih: rowData.id,
            modalListKatalog: false })
        }}
      >
        <Text style={[styles.textBagikan, { marginLeft: 0 }]}>{rowData.name}</Text>
      </TouchableOpacity>
    )
  }

  renderModalKatalog () {
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.modalListKatalog}
        onRequestClose={() => this.setState({ modalListKatalog: false })}
        >
        <TouchableOpacity style={styles.modalContainer} onPress={() => this.setState({ modalListKatalog: false })}>
          <ScrollView style={styles.menuProvinsiContainer}>
            <ListView
              dataSource={this.dataSource.cloneWithRows(this.state.listKatalog)}
              renderRow={this.renderListCatalog.bind(this)}
              enableEmptySections
            />
          </ScrollView>
        </TouchableOpacity>
      </Modal>
    )
  }

  handleTambahKatalog () {
    this.setState({modalTambahKatalog: false})
    this.props.createCatalog(this.state.namaKatalog)
  }

  modalDropshipping () {
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.modalDropshipping}
        onRequestClose={() => this.setState({ modalDropshipping: false })}
        >
        <View style={[styles.headerModal]}>
          <Text style={[styles.texthapus, {flex: 1, color: Colors.darkgrey}]}>Tentang Dropshipping</Text>
          <TouchableOpacity onPress={() => this.setState({modalDropshipping: false})}>
            <Image source={Images.close} style={styles.imagePicker} />
          </TouchableOpacity>
        </View>
        <Dropshipping marginNavbars={0} visibleButton={false} />
      </Modal>
    )
  }

  modalTambahCatalog () {
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.modalTambahKatalog}
        onRequestClose={() => this.setState({ modalTambahKatalog: false })}
        >
        <TouchableOpacity style={styles.modalContainer} onPress={() => this.setState({modalTambahKatalog: false})}>
          <View style={[styles.modalKatalog]}>
            <View style={[styles.flexRow, {alignItems: 'center', paddingRight: 18.5, borderTopLeftRadius: 5, borderTopRightRadius: 5, backgroundColor: Colors.paleGreyFive}]}>
              <Text style={[styles.title, {flex: 1, paddingBottom: 19.3}]}>Buat Katalog Baru</Text>
              <TouchableOpacity onPress={() => this.setState({modalTambahKatalog: false})}>
                <Image source={Images.close} style={styles.imagePicker} />
              </TouchableOpacity>
            </View>
            <View style={[styles.flexOne, {justifyContent: 'flex-end'}]}>
              <TextInput
                style={[styles.inputText, {marginLeft: 20, marginRight: 20}]}
                value={this.state.namaKatalog}
                keyboardType='default'
                returnKeyType='done'
                autoCapitalize='none'
                maxLength={30}
                autoCorrect
                onChangeText={this.changeNamaKatalog}
                underlineColorAndroid='transparent'
                placeholder='Masukkan nama katalog'
              />
              <TouchableOpacity style={[styles.buttonnext]} onPress={() => this.handleTambahKatalog()}>
                <Text style={styles.textButtonNext}>
                  Buat Katalog Baru
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    )
  }

  spesifikasi () {
    return (
      <View>
        <View style={styles.spesifkasi}>
          <View style={styles.flexRow}>
            <View style={styles.left}>
              <Text style={styles.textLabel}>Harga Produk</Text>
              <TextInput
                style={styles.inputText}
                value={String(this.state.harga)}
                keyboardType='numeric'
                returnKeyType='done'
                autoCapitalize='none'
                maxLength={10}
                autoCorrect
                onChangeText={this.changeHarga}
                underlineColorAndroid='transparent'
                placeholder='Harga Produk'
              />
            </View>
            <View style={styles.right}>
              <Text style={styles.textLabel}>Diskon</Text>
              <View style={styles.rowDiskon}>
                <TextInput
                  style={styles.inputNoBOrder}
                  value={this.state.diskon.toString()}
                  keyboardType='numeric'
                  returnKeyType='done'
                  autoCapitalize='none'
                  maxLength={3}
                  autoCorrect
                  onChangeText={this.changeDiscount}
                  underlineColorAndroid='transparent'
                  placeholder='Diskon'
                />
                <Text style={[styles.inputNoBOrder, {flex: 0}]}>%</Text>
              </View>
            </View>
          </View>
          {this.rincianDiskon()}
          <Text style={[styles.textLabel, { marginTop: 20, marginBottom: -5, marginLeft: 1 }]}>Berat Produk</Text>
          <View style={styles.rowBerat}>
            <TextInput
              style={styles.inputNoBOrder}
              value={this.state.beratProduk.toString()}
              keyboardType='numeric'
              returnKeyType='done'
              autoCapitalize='none'
              maxLength={5}
              autoCorrect
              onChangeText={this.changeBeratProduk}
              underlineColorAndroid='transparent'
              placeholder='Berat Produk'
            />
            <Text style={[styles.inputNoBOrder, {flex: 0}]}>Kg</Text>
          </View>
          <View style={styles.radio}>
            <Text style={[styles.titleContainer, {paddingBottom: -10}]}>Jenis Produk</Text>
            <CustomRadio
              data={this.state.data}
              index={this.state.indexKondisi}
              handlingRadio={(index1, value1) =>
                this.handlingRadioJenisProduk(index1, value1)}
              horizontal
            />
          </View>
          <View style={styles.radio}>
            <Text style={[styles.titleContainer, {paddingBottom: -10}]}>Asuransi Produk</Text>
            <CustomRadio
              data={this.state.dataAsuransi}
              index={this.state.indexAsuransi}
              handlingRadio={(index1, value1) =>
                this.handlingRadioAsuransi(index1, value1)}
              horizontal
            />
          </View>
        </View>
      </View>
    )
  }

  discountCalculate (price, discount) {
    let hargaDiskon = price - ((discount / 100) * price)
    Reactotron.log(hargaDiskon)
    return hargaDiskon
  }

  handlingRadioJenisProduk (index, value) {
    if (value.toLowerCase() === 'baru') {
      this.setState({
        jenisProduk: 'baru',
        indexKondisi: index
      })
    } else {
      this.setState({
        gender: 'bekas',
        indexKondisi: index
      })
    }
  }

  handlingRadioAsuransi (index, value) {
    if (value.toLowerCase() === 'opsional') {
      this.setState({
        jenisAsuransi: 'opsional',
        indexAsuransi: index,
        isInsurance: false
      })
    } else {
      this.setState({
        jenisAsuransi: 'wajib',
        indexAsuransi: index,
        isInsurance: true
      })
    }
  }

  komisiCalculate (value1, value2) {
    let value = (value1 * value2) / 100
    return value
  }

  maskedMoney (value) {
    return 'Rp ' + RupiahFormat(value)
  }

  maskedMoneyManual (value) {
    return 'Rp ' + RupiahFormat(value)
  }

  rincianDiskon () {
    let hargaTemp = Number(this.state.harga)
    let diskonCalculate = this.discountCalculate(hargaTemp, this.state.diskon)
    let discountMasked = this.maskedMoneyManual(diskonCalculate)

    let commission = this.komisiCalculate(diskonCalculate, this.state.commission)
    let commissionMasked = this.maskedMoneyManual(commission)

    let total = diskonCalculate - commission
    let totalMasked = this.maskedMoneyManual(total)

    return (
      <View style={styles.rincianContainrer}>
        <Text style={[styles.title, {paddingLeft: 20, paddingTop: 0}]}>Rincian Penerimaan</Text>
        <View style={styles.borderBottom}>
          <View style={styles.containerRincian}>
            <Text style={styles.textRincian}>Harga Jual</Text>
            <Text style={[styles.textRincian, {flex: 0, fontFamily: Fonts.type.semiBolds, color: Colors.darkgrey}]}>{discountMasked}</Text>
          </View>
          <View style={styles.containerRincian}>
            <Text style={styles.textRincian}>Komisi  ({this.state.commission}%  dari {discountMasked})</Text>
            <Text style={[styles.textRincian, {flex: 0, fontFamily: Fonts.type.semiBolds, color: Colors.darkgrey}]}>{commissionMasked}</Text>
          </View>
          <View style={[styles.containerRincian, {borderBottomWidth: 0}]}>
            <Text style={styles.textRincian}>Uang yang akan Anda terima</Text>
            <Text style={[styles.textRincian, {flex: 0, fontFamily: Fonts.type.semiBolds, color: Colors.darkMint}]}>{totalMasked}</Text>
          </View>
        </View>
      </View>
    )
  }

  handleDropshipping () {
    if (!this.state.dropShippingActive) {
      this.setState({dropShippingActive: true})
    } else {
      this.setState({dropShippingActive: false})
    }
  }

  handleSembuntikanBarang () {
    if (!this.state.sembunyikanBarang) {
      this.setState({sembunyikanBarang: true})
    } else {
      this.setState({sembunyikanBarang: false})
    }
  }

  opsi () {
    const centangDropshipping = this.state.dropShippingActive ? Images.centangBiru : null
    const centangSebunyikanBarang = this.state.sembunyikanBarang ? Images.centangBiru : null
    return (
      <View>
        <Text style={styles.title}>Opsi</Text>
        <View style={[styles.spesifkasi, {paddingBottom: 0}]}>
          <View style={styles.flexRowOpsi}>
            <View style={[styles.left, {flex: 0}]}>
              <TouchableOpacity style={styles.checkBox} onPress={() => this.handleDropshipping()}>
                <Image
                  source={centangDropshipping}
                  style={styles.gambarCentangBox}
                />
              </TouchableOpacity>
            </View>
            <View style={[styles.right, {marginLeft: 14}]}>
              <Text style={styles.textTitleOpsi}>Jadikan Dropshipping</Text>
              <Text style={[styles.textDescOpsi]}>Memungkinkan penjual lain untuk menjual barang ini di toko mereka</Text>
              <TouchableOpacity onPress={() => this.setState({modalDropshipping: true})}>
                <Text style={[styles.linkDesc]}>Pelajari Lebih Lanjut tentang dropshipping</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.flexRowOpsi, {paddingTop: 20, borderBottomWidth: 0}]}>
            <View style={[styles.left, {flex: 0}]}>
              <TouchableOpacity style={styles.checkBox} onPress={() => this.handleSembuntikanBarang()}>
                <Image
                  source={centangSebunyikanBarang}
                  style={styles.gambarCentangBox}
                />
              </TouchableOpacity>
            </View>
            <View style={[styles.right, {marginLeft: 14}]}>
              <Text style={styles.textTitleOpsi}>Sembunyikan Barang</Text>
              <Text style={[styles.textDescOpsi]}>Barang yang disembunyikan tidak akan muncul di toko Anda. Tapi tetap dapat di dropshipping kan</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }

  katalog () {
    return (
      <View>
        <Text style={styles.title}>Katalog Toko</Text>
        <View style={[styles.spesifkasi, {paddingTop: 18, paddingBottom: 20}]}>
          <Text style={[styles.titleDarkContainer]}>Katalog</Text>
          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.pilihDestinasi} onPress={() => this.setState({ modalListKatalog: true, kategoriIcon: Images.up })}>
              <Text style={[styles.inputPicker, {color: Colors.darkgrey}]}>{this.state.katalogTerpilih}</Text>
              <Image source={Images.down} style={styles.imagePicker} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => this.setState({modalTambahKatalog: true})}>
            <Text style={[styles.linkDesc, {paddingBottom: 0, paddingTop: 19.8}]}>+ Tambah Katalog</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  checkrosir () {
    return (
      <View style={styles.paddingSix}>
        <Text style={styles.title}>Grosir</Text>
        <View style={[styles.spesifkasi, {paddingTop: 23, paddingBottom: 0, marginBottom: 0}]}>
          <View style={[styles.flexRowOpsi, {borderBottomWidth: 0}]}>
            <View style={[styles.right, {marginLeft: 0}]}>
              <Text style={styles.textTitleOpsi}>Aktifkan Harga Grosir</Text>
              <Text style={[styles.textDescOpsi]}>Memberikan harga spesial kepada pembeli untuk pembelian dalam jumlah tertentu</Text>
            </View>
            <View style={[styles.left, {flex: 0, marginLeft: 45}]}>
              <Switch
                width={34}
                height={16}
                onSyncPress={(value) => this.setState({grosirAktif: value})}
              />
            </View>
          </View>
        </View>
      </View>
    )
  }

  tambahHargaGrosir () {
    if (this.state.tambahDaftarGrosir) {
      return (
        <View style={styles.paddingSix}>
          <View style={[styles.spesifkasi, {paddingBottom: 20}]}>
            <View style={styles.flexRow}>
              <View style={styles.flexOne}>
                <Text style={[styles.titleContainer, {paddingBottom: -10}]}>Jumlah Produk</Text>
                <View style={styles.flexRow}>
                  <View style={[styles.flexRow, {justifyContent: 'center'}]}>
                    <TextInput
                      style={[styles.inputText, {flex: 1}]}
                      value={this.state.minimalGrosir}
                      keyboardType='numeric'
                      returnKeyType='done'
                      autoCapitalize='none'
                      maxLength={3}
                      autoCorrect
                      onChangeText={this.changeMinimalGrosir}
                      underlineColorAndroid='transparent'
                    />
                    <Text style={{marginLeft: 10, marginRight: 10, flex: 1, textAlign: 'center'}}>s/d</Text>
                    <TextInput
                      style={[styles.inputText, {flex: 1}]}
                      value={this.state.maksimalGrosir}
                      keyboardType='numeric'
                      returnKeyType='done'
                      autoCapitalize='none'
                      maxLength={3}
                      autoCorrect
                      onChangeText={this.changeMaksimalGrosir}
                      underlineColorAndroid='transparent'
                    />
                  </View>
                </View>
              </View>
              <View style={{marginLeft: 35}} />
              <View style={styles.flexOne}>
                <Text style={[styles.titleContainer, {paddingBottom: -10}]}>Harga Produk</Text>
                <TextInput
                  style={styles.inputText}
                  value={this.state.hargaGrosir}
                  keyboardType='numeric'
                  returnKeyType='done'
                  autoCapitalize='none'
                  maxLength={18}
                  autoCorrect
                  onChangeText={this.changeHargaGrosir}
                  underlineColorAndroid='transparent'
                  placeholder='Harga Produk'
                />
              </View>
            </View>
            <TouchableOpacity style={styles.hapus} onPress={() => this.setState({tambahDaftarGrosir: false})}>
              <Text style={[styles.texthapus]}>Hapus</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    } else {
      return (
        <View />
      )
    }
  }

  buttonTambahDaftarHargaGrosir () {
    if (this.state.grosirAktif) {
      return (
        <TouchableOpacity style={styles.buttonTambahDaftarHargaGrosir} onPress={() => this.setState({tambahDaftarGrosir: true})}>
          <Text style={[styles.texthapus, {color: Colors.bluesky}]}>+ Tambah Daftar Harga Grosir</Text>
        </TouchableOpacity>
      )
    } else {
      return (
        <View />
      )
    }
  }

  save () {
    const { id, harga, beratProduk, indexKondisi, isInsurance, diskon } = this.state
    let price
    try {
      price = Number(harga.replace(/[^0-9,]+/g, ''))
    } catch (e) {
      price = harga
    }
    let weight = parseInt(beratProduk)
    let condition = parseInt(indexKondisi)
    this.props.updateData(id, price, weight, condition, isInsurance, diskon)
  }

  render () {
    const spinner = this.state.loading
    ? (<View style={styles.spinner}>
      <ActivityIndicator color='white' size='large' />
    </View>) : (<View />)
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={{ uri: this.state.imageProduct }} style={styles.imageProduct} />
          <Text style={styles.textProduct}>
            {this.state.namaProduk}
          </Text>
        </View>
        <ScrollView>
          {this.spesifikasi()}
          <View style={{flex: 1}}>
            <TouchableOpacity style={[styles.buttonnext]} onPress={() => this.save()}>
              <Text style={styles.textButtonNext}>
                Simpan Perubahan
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        {this.modalDropshipping()}
        {this.modalTambahCatalog()}
        {this.renderModalKatalog()}
        {spinner}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataCatalog: state.getListCatalog,
    dataCreateCatalog: state.createCatalog,
    dataUpdateData: state.alterProducts,
    dataDetailProduct: state.storeProductDetail,
    dataCommission: state.commission
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCatalog: () => dispatch(katalogAction.getListCatalog()),
    createCatalog: (name) => dispatch(katalogAction.createCatalog({name: name})),
    updateData: (id, price, weight, condition, isInsurance, discount) => dispatch(productAction.updateProduct({
      id: id, price: price, weight: weight, condition: condition, is_insurance: isInsurance, discount: discount
    })),
    getCommissions: (param) => dispatch(otherAction.getCommission(param))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProductPriceAndSpecification)
