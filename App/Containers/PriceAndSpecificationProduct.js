import React from 'react'
import { View, Text, ActivityIndicator, ToastAndroid, BackAndroid, Modal, ListView, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import RupiahFormat from '../Services/MaskedMoneys'

import CustomRadio from '../Components/CustomRadio'
import Switch from 'react-native-switch-pro'
import Dropshipping from './Dropshipping'
import * as katalogAction from '../actions/catalog'
import * as otherAction from '../actions/other'
import {isFetching, isError, isFound} from '../Services/Status'
import Reactotron from 'reactotron-react-native'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/InfoHargaDanSpesifikasiProdukScreenStyle'
import { Images, Colors, Fonts } from '../Themes'

class PriceAndSpecificationProduct extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.submitting = {
      catalog: false,
      commission: false,
      createCatalog: false
    }
    this.state = {
      images: this.props.images,
      loading: true,
      harga: '',
      diskon: 0,
      beratProduk: '',
      stokProduk: '',
      namaKatalog: '',
      jenisProduk: 'baru',
      indexKondisi: 0,
      data: [{label: 'Baru', value: 0}, {label: 'Bekas', value: 1}],
      jenisAsuransi: 'opsional',
      indexAsuransi: 0,
      isInsurance: false,
      dataAsuransi: [{label: 'Opsional', value: 0}, {label: 'Wajib', value: 1}],
      listKatalog: [],
      modalDropshipping: false,
      grosirAktif: false,
      dataGrosir: [],
      dataGrosirUpload: [],
      dropShippingActive: false,
      sembunyikanBarang: 1,
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
      commission: 0,
      colorCatalog: Colors.labelgrey,
      errorColorPrice: Colors.snow,
      errorColorWight: Colors.snow,
      errorColorStock: Colors.snow,
      errorColorCalatog: Colors.snow
    }
  }

  componentWillReceiveProps (nextProps) {
    const {dataCatalog, dataCommission, dataCreateCatalog} = nextProps

    if (!isFetching(dataCatalog) && this.submitting.catalog) {
      this.submitting = { ...this.submitting, catalog: false }
      if (isError(dataCatalog)) {
        ToastAndroid.show(dataCatalog.message, ToastAndroid.SHORT)
      }
      if (isFound(dataCatalog)) {
        this.setState({ listKatalog: dataCatalog.catalogs, loading: false })
      }
    }

    if (!isFetching(dataCommission) && this.submitting.commission) {
      this.submitting = { ...this.submitting, commission: false }
      if (isError(dataCommission)) {
        ToastAndroid.show(dataCommission.message, ToastAndroid.SHORT)
      }
      if (isFound(dataCommission)) {
        this.setState({
          commission: nextProps.dataCommission.commission.commission,
          loading: false
        })
      }
    }

    if (!isFetching(dataCreateCatalog) && this.submitting.createCatalog) {
      this.submitting = { ...this.submitting, createCatalog: false }
      if (isError(dataCreateCatalog)) {
        ToastAndroid.show(dataCreateCatalog.message, ToastAndroid.SHORT)
      }
      if (isFound(dataCreateCatalog)) {
        if (!this.submitting.catalog) {
          this.submitting = {
            ...this.submitting,
            catalog: true
          }
          this.props.getCatalog()
        }
      }
    }
  }

  componentDidMount () {
    if (!this.submitting.catalog) {
      this.submitting = {
        ...this.submitting,
        catalog: true
      }
      this.props.getCatalog()
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

  renderListCatalog (rowData) {
    return (
      <TouchableOpacity
        style={[styles.menuLaporkan, { padding: 15 }]}
        activeOpacity={0.8}
        onPress={() => {
          this.setState({
            katalogTerpilih: rowData.name,
            idKatalogTerpilih: rowData.id,
            colorCatalog: Colors.darkgrey,
            errorColorCalatog: Colors.snow,
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
    this.setState({modalTambahKatalog: false, loading: true})
    if (!this.submitting.createCatalog) {
      this.submitting = {
        ...this.submitting,
        createCatalog: true
      }
      this.props.createCatalog(this.state.namaKatalog)
    }
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
                onChangeText={(text) => this.setState({namaKatalog: text})}
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

  handleTextprice = (text) => {
    this.setState({ harga: text })
    this.trySearch(text)
  }

  handleTextDiscount = (text) => {
    Reactotron.log(text)
    if (text > 100) {
      text = ''
    }
    this.setState({ diskon: text })
  }

  trySearch (text) {
    if (text !== '') {
      this.submitting.commission = true
      this.setState({loading: true})
      let commission = +text
      setTimeout(() => {
        this.props.getCommissions({price: commission})
      }, 1000)
    }
  }

  spesifikasi () {
    const {errorColorPrice, errorColorStock, errorColorWight} = this.state
    return (
      <View>
        <Text style={styles.title}>Spesifikasi</Text>
        <View style={styles.spesifkasi}>
          <View style={styles.flexRow}>
            <Text style={[styles.inputText, { marginRight: 10, borderBottomWidth: 0, paddingLeft: 0 }]}>Rp </Text>
            <View style={styles.left}>
              <TextInput
                style={styles.inputText}
                value={String(this.state.harga)}
                keyboardType='numeric'
                returnKeyType='done'
                autoCapitalize='none'
                maxLength={10}
                autoCorrect={false}
                onFocus={() => this.onFocus('price')}
                onBlur={() => this.onBlur('price')}
                onChangeText={this.handleTextprice}
                underlineColorAndroid='transparent'
                placeholder='Harga Produk'
              />
            </View>
            <View style={styles.right}>
              <View style={styles.rowDiskon}>
                <TextInput
                  style={styles.inputNoBOrder}
                  value={this.state.diskon.toString()}
                  keyboardType='numeric'
                  returnKeyType='done'
                  autoCapitalize='none'
                  maxLength={3}
                  autoCorrect
                  onChangeText={this.handleTextDiscount}
                  underlineColorAndroid='transparent'
                  placeholder='Diskon'
                />
                <Text style={[styles.inputNoBOrder, {flex: 0}]}>%</Text>
              </View>
            </View>
          </View>
          <Text style={[styles.textError, {color: errorColorPrice}]}>Harga produk harus diisi</Text>
          {this.rincianDiskon()}
          <View style={styles.rowBerat}>
            <TextInput
              style={styles.inputNoBOrder}
              value={this.state.beratProduk.toString()}
              keyboardType='numeric'
              returnKeyType='done'
              autoCapitalize='none'
              maxLength={5}
              autoCorrect
              onFocus={() => this.onFocus('wight')}
              onBlur={() => this.onBlur('wight')}
              onChangeText={(text) => this.setState({beratProduk: text})}
              underlineColorAndroid='transparent'
              placeholder='Berat Produk'
            />
            <Text style={[styles.inputNoBOrder, {flex: 0}]}>gram</Text>
          </View>
          <Text style={[styles.textError, {color: errorColorWight}]}>Berat produk harus diisi</Text>
          <View style={styles.rowBerat}>
            <TextInput
              style={styles.inputNoBOrder}
              value={this.state.stokProduk.toString()}
              keyboardType='numeric'
              returnKeyType='done'
              autoCapitalize='none'
              maxLength={5}
              autoCorrect
              onFocus={() => this.onFocus('stock')}
              onBlur={() => this.onBlur('stock')}
              onChangeText={(text) => this.setState({stokProduk: text})}
              underlineColorAndroid='transparent'
              placeholder='Stock Produk'
            />
          </View>
          <Text style={[styles.textError, {color: errorColorStock}]}>Stok harus diisi</Text>
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
        jenisProduk: 'bekas',
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

  komisiCalculate (price, commission) {
    let value = (price * commission) / 100
    return value
  }

  maskedMoney (value) {
    return 'Rp ' + RupiahFormat(value)
  }

  maskedMoneyManual (value) {
    return 'Rp ' + RupiahFormat(value)
  }

  rincianDiskon () {
    let hargaTemp = Number(this.state.harga.replace(/[^0-9,]+/g, ''))
    let commissionTemp = String(this.state.commission)

    let salePrice = this.discountCalculate(hargaTemp, Number(this.state.diskon))
    let hargaMasked = this.maskedMoneyManual(salePrice)

    let commission = this.komisiCalculate(salePrice, this.state.commission)
    let commissionMasked = this.maskedMoneyManual(commission)

    let total = salePrice - commission
    let totalPriceMasked = this.maskedMoneyManual(total)

    if (this.state.harga.length > 0) {
      return (
        <View style={styles.rincianContainrer}>
          <Text style={[styles.title, {paddingLeft: 20, paddingTop: 0}]}>Rincian Penerimaan</Text>
          <View style={styles.borderBottom}>
            <View style={styles.containerRincian}>
              <Text style={styles.textRincian}>Harga Jual</Text>
              <Text style={[styles.textRincian, {flex: 0, fontFamily: Fonts.type.semiBolds, color: Colors.darkgrey}]}>{hargaMasked}</Text>
            </View>
            <View style={styles.containerRincian}>
              <Text style={styles.textRincian}>Komisi  ({commissionTemp}%  dari {hargaMasked})</Text>
              <Text style={[styles.textRincian, {flex: 0, fontFamily: Fonts.type.semiBolds, color: Colors.darkgrey}]}>{commissionMasked}</Text>
            </View>
            <View style={[styles.containerRincian, {borderBottomWidth: 0}]}>
              <Text style={styles.textRincian}>Uang yang akan Anda terima</Text>
              <Text style={[styles.textRincian, {flex: 0, fontFamily: Fonts.type.semiBolds, color: Colors.darkMint}]}>{totalPriceMasked}</Text>
            </View>
          </View>
        </View>
      )
    } else {
      return (
        <View />
      )
    }
  }

  handleDropshipping () {
    if (!this.state.dropShippingActive) {
      this.setState({dropShippingActive: true})
    } else {
      this.setState({dropShippingActive: false})
    }
  }

  handleSembuntikanBarang () {
    if (this.state.sembunyikanBarang === 1) {
      this.setState({sembunyikanBarang: 0})
    } else {
      this.setState({sembunyikanBarang: 1})
    }
  }

  opsi () {
    const centangDropshipping = this.state.dropShippingActive ? Images.centangBiru : null
    if (this.state.sembunyikanBarang === 1) {
      this.centangSebunyikanBarang = null
    } else {
      this.centangSebunyikanBarang = Images.centangBiru
    }
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
                  source={this.centangSebunyikanBarang}
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
    const {errorColorCalatog} = this.state
    return (
      <View>
        <Text style={styles.title}>Katalog Toko</Text>
        <View style={[styles.spesifkasi, {paddingTop: 18, paddingBottom: 20}]}>
          <Text style={[styles.titleDarkContainer]}>Katalog</Text>
          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.pilihDestinasi} onPress={() => this.setState({ modalListKatalog: true, kategoriIcon: Images.up })}>
              <Text style={[styles.inputPicker, {color: this.state.colorCatalog}]}>{this.state.katalogTerpilih}</Text>
              <Image source={Images.down} style={styles.imagePicker} />
            </TouchableOpacity>
          </View>
          <Text style={[styles.textError, {color: errorColorCalatog}]}>Katalog harus dipilih</Text>
          <TouchableOpacity onPress={() => this.setState({modalTambahKatalog: true})}>
            <Text style={[styles.linkDesc, {paddingBottom: 0}]}>+ Tambah Katalog</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  checkGrosir () {
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
    const { grosirAktif, dataGrosir } = this.state
    if (grosirAktif) {
      const mapFoto = dataGrosir.map((data, i) => {
        return (
          <View key={i}>
            <View style={styles.paddingSix}>
              <View style={[styles.spesifkasi, {paddingBottom: 20}]}>
                <View style={styles.flexRow}>
                  <View style={styles.flexOne}>
                    <Text style={[styles.titleContainer, {paddingBottom: -10}]}>Jumlah Produk</Text>
                    <View style={styles.flexRow}>
                      <View style={[styles.flexRow, {justifyContent: 'center'}]}>
                        <TextInput
                          style={[styles.inputText, {flex: 1}]}
                          value={data.min.toString()}
                          keyboardType='numeric'
                          returnKeyType='done'
                          autoCapitalize='none'
                          maxLength={3}
                          autoCorrect
                          onChange={(event) => this.changeStart(event.nativeEvent.text, i)}
                          underlineColorAndroid='transparent'
                        />
                        <Text style={{marginLeft: 10, marginRight: 10, flex: 1, textAlign: 'center'}}>s/d</Text>
                        <TextInput
                          style={[styles.inputText, {flex: 1}]}
                          value={data.max.toString()}
                          keyboardType='numeric'
                          returnKeyType='done'
                          autoCapitalize='none'
                          maxLength={3}
                          autoCorrect
                          onChange={(event) => this.changeEnd(event.nativeEvent.text, i)}
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
                      value={data.price.toString()}
                      keyboardType='numeric'
                      returnKeyType='done'
                      autoCapitalize='none'
                      maxLength={18}
                      autoCorrect
                      onChange={(event) => this.changePrice(event.nativeEvent.text, i)}
                      underlineColorAndroid='transparent'
                      placeholder='Harga Produk'
                    />
                  </View>
                </View>
                <TouchableOpacity style={styles.hapus} onPress={() => this.removeItem(i)}>
                  <Text style={[styles.texthapus]}>Hapus</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.separator} />
          </View>
        )
      })
      return (
        mapFoto
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
        <TouchableOpacity style={styles.buttonTambahDaftarHargaGrosir} onPress={() => this.addSale()}>
          <Text style={[styles.texthapus, {color: Colors.bluesky}]}>+ Tambah Daftar Harga Grosir</Text>
        </TouchableOpacity>
      )
    } else {
      return (
        <View />
      )
    }
  }

  addSale () {
    const { dataGrosir, dataGrosirUpload } = this.state
    let tempData = [...dataGrosir]
    let tempDataUpload = [...dataGrosirUpload]
    tempData.push({
      'min': 0,
      'max': 0,
      'price': 0
    })
    tempDataUpload.push({
      'min': 0,
      'max': 0,
      'price': 0
    })
    this.setState({
      dataGrosir: tempData,
      dataGrosirUpload: tempDataUpload
    })
  }

  removeItem (i) {
    const { dataGrosir } = this.state
    let tempData = dataGrosir
    tempData.splice(i, 1)
    this.setState({
      dataGrosir: tempData,
      dataGrosirUpload: tempData
    })
  }

  changeStart (text, id) {
    const { dataGrosir, dataGrosirUpload } = this.state
    let temp = dataGrosir
    let tempUpload = dataGrosirUpload
    temp[id].min = text
    tempUpload[id].min = Number(text.replace(/[^0-9,]+/g, ''))
    this.setState({
      dataGrosir: temp,
      dataGrosirUpload: tempUpload
    })
  }

  changeEnd (text, id) {
    const { dataGrosir, dataGrosirUpload } = this.state
    let temp = dataGrosir
    let tempUpload = dataGrosirUpload
    temp[id].max = text
    tempUpload[id].max = Number(text.replace(/[^0-9,]+/g, ''))
    this.setState({
      dataGrosir: temp,
      dataGrosirUpload: tempUpload
    })
  }

  changePrice (text, id) {
    const { dataGrosir, dataGrosirUpload } = this.state
    let temp = dataGrosir
    let tempUpload = dataGrosirUpload
    temp[id].price = text
    tempUpload[id].price = Number(text.replace(/[^0-9,]+/g, ''))
    this.setState({
      dataGrosir: temp,
      dataGrosirUpload: tempUpload
    })
  }

  onError = (field) => {
    switch (field) {
      case 'price':
        this.setState({
          errorColorPrice: Colors.red
        })
        break
      case 'wight':
        this.setState({
          errorColorWight: Colors.red
        })
        break
      case 'stock':
        this.setState({
          errorColorStock: Colors.red
        })
        break
      case 'catalog':
        this.setState({
          errorColorCalatog: Colors.red
        })
        break
    }
  }

  onFocus = (field) => {
    switch (field) {
      case 'price':
        this.setState({
          errorColorPrice: Colors.snow
        })
        break
      case 'wight':
        this.setState({
          errorColorWight: Colors.snow
        })
        break
      case 'stock':
        this.setState({
          errorColorStock: Colors.snow
        })
        break
      case 'catalog':
        this.setState({
          errorColorCalatog: Colors.snow
        })
        break
    }
  }

  onBlur = (field) => {
    switch (field) {
      case 'price':
        this.setState({
          errorColorPrice: Colors.snow
        })
        break
      case 'wight':
        this.setState({
          errorColorWight: Colors.snow
        })
        break
      case 'stock':
        this.setState({
          errorColorStock: Colors.snow
        })
        break
      case 'catalog':
        this.setState({
          errorColorCalatog: Colors.snow
        })
        break
    }
  }

  nextState () {
    const {harga, beratProduk, stokProduk, grosirAktif, dataGrosirUpload} = this.state
    if (harga === '') {
      this.onError('price')
    }
    if (beratProduk === '') {
      this.onError('wight')
    }
    if (stokProduk === '') {
      this.onError('stock')
    }
    if (grosirAktif && dataGrosirUpload.length === 0) {
      ToastAndroid.show('Harga grosir harus diisi', ToastAndroid.SHORT)
    }
    if (harga !== '' && beratProduk !== '' && stokProduk !== '') {
      if (grosirAktif && dataGrosirUpload.length === 0) {
        ToastAndroid.show('Harga grosir harus diisi', ToastAndroid.SHORT)
      } else {
        Reactotron.log('lanjut dalam')
        this.procced()
      }
    }
  }

  procced () {
    const {images, sembunyikanBarang, harga, diskon, dataProduk, beratProduk, stokProduk, indexKondisi, isInsurance, dropShippingActive, idKatalogTerpilih, minimalGrosir, maksimalGrosir, hargaGrosir, grosirAktif, dataGrosirUpload} = this.state
    Reactotron.log(images)
    let changeCondition
    if (indexKondisi === 0) {
      changeCondition = 1
    } else {
      changeCondition = 0
    }
    let detailGrosir = []
    let tempGrosir = []
    detailGrosir[0] = parseInt(minimalGrosir)
    detailGrosir[1] = parseInt(maksimalGrosir)
    detailGrosir[2] = Number(hargaGrosir.replace(/[^0-9,]+/g, ''))
    tempGrosir[0] = detailGrosir
    dataProduk[4] = Number(harga.replace(/[^0-9,]+/g, ''))
    dataProduk[5] = parseInt(beratProduk)
    dataProduk[6] = parseInt(stokProduk)
    dataProduk[7] = parseInt(changeCondition)
    dataProduk[8] = isInsurance
    dataProduk[9] = dropShippingActive
    dataProduk[10] = idKatalogTerpilih
    dataProduk[11] = sembunyikanBarang
    dataProduk[12] = parseInt(diskon)
    dataProduk[13] = grosirAktif
    dataProduk[14] = dataGrosirUpload
    NavigationActions.expeditionproduct({
      type: ActionConst.PUSH,
      dataProduk: dataProduk,
      images: images
    })
  }

  render () {
    const spinner = this.state.loading
    ? (<View style={styles.spinner}>
      <ActivityIndicator color='white' size='large' />
    </View>) : (<View />)
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
          <View style={styles.state}>
            <Text style={styles.textState}>4</Text>
          </View>
        </View>
        <ScrollView>
          {this.spesifikasi()}
          {this.opsi()}
          {this.katalog()}
          {this.checkGrosir()}
          {this.tambahHargaGrosir()}
          {this.buttonTambahDaftarHargaGrosir()}
          <View style={{flex: 1}}>
            <TouchableOpacity style={[styles.buttonnext]} onPress={() => this.nextState()}>
              <Text style={styles.textButtonNext}>
                Lanjutkan
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

const mapStateToProps = (state) => ({
  dataCatalog: state.getListCatalog,
  dataCreateCatalog: state.createCatalog,
  dataCommission: state.commission
})

const mapDispatchToProps = (dispatch) => ({
  getCatalog: () => dispatch(katalogAction.getListCatalog()),
  createCatalog: (name) => dispatch(katalogAction.createCatalog({name: name})),
  getCommissions: (param) => dispatch(otherAction.getCommission(param))
})

export default connect(mapStateToProps, mapDispatchToProps)(PriceAndSpecificationProduct)
