import React from 'react'
import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  ListView,
  TextInput,
  ActivityIndicator,
  ToastAndroid
} from 'react-native'
import { connect } from 'react-redux'
import RupiahFormat from '../Services/MaskedMoneys'

import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import * as addressAction from '../actions/address'
import * as serviceAction from '../actions/expedition'
import * as cartAction from '../actions/cart'
import * as produkAction from '../actions/product'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Images, Colors } from '../Themes'

// Styles
import styles from './Styles/PembelianTambahKeKeranjangStyle'

class PurchaseAddToCart extends React.Component {

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
      idProduct: this.props.idProduct,
      price: this.props.price,
      tempPrice: this.props.price,
      foto: this.props.foto,
      namaProduk: this.props.namaProduk,
      namaToko: this.props.namaToko,
      countProduct: 1,
      stock: parseInt(this.props.stock),
      grosir: this.props.grosir,
      dataGrosir: this.props.dataGrosir,
      alamat: '',
      jalan: '',
      nama: '',
      provinsi: '',
      idProvinsi: '',
      kabupaten: '',
      idKabupaten: '',
      roIdDistrict: '',
      idDistrict: '',
      district: '',
      email: '',
      telepon: '',
      kodepos: '',
      weight: this.props.dataDetailProduk.detail.product.weight,
      kurir: '',
      tipeKurir: '',
      asuransi: 'Tidak',
      boolAsuransi: false,
      catatan: '',
      subtotal: this.props.dataDetailProduk.detail.product.price -
        ((this.props.dataDetailProduk.detail.product.discount / 100) * this.props.dataDetailProduk.detail.product.price) * 1,
      ongkir: 0,
      ongkirSatuan: 0,
      diskon: String((this.props.dataDetailProduk.detail.product.price * this.props.dataDetailProduk.detail.product.discount) / 100),
      total: '0',
      originId: this.props.dataDetailProduk.detail.location.district.ro_id,
      dataKurir: this.props.dataDetailProduk.detail.expeditions,
      dataCost: [],
      expeditionFee: '',
      dataAsuransi: [
        {
          'id': 1,
          'title': 'Ya'
        },
        {
          'id': 0,
          'title': 'Tidak'
        }
      ],
      activeKurir: 0,
      activeSubKurir: 0,
      activeAsuransi: 0,
      idKurir: '',
      idSubKurir: '',
      biayaAsuransi: 0,
      idAsuransi: 0,
      modalKurir: false,
      modalSubkurir: false,
      modalAsuransi: false,
      statusAlamat: true,
      dataKosong: false,
      height: 50,
      errorKurir: false,
      errorSubKurir: false,
      idAlamat: '',
      modalAlamat: false,
      dataAlamat: [],
      loadingAlamat: false,
      activeAlamat: 0,
      modalNotifikasi: false,
      loadingCart: false,
      statusSubKurir: false,
      service: '',
      activeScene: true
    }
  }

  componentDidMount () {
    this.props.getListAlamat()
  }

  componentWillReceiveProps (nextProps) {
    if (this.state.idProduct !== this.props.dataDetailProduk.detail.product.id) {
      this.setState({
        idProduct: this.props.dataDetailProduk.detail.product.id,
        price: this.props.dataDetailProduk.detail.product.price,
        foto: this.props.dataDetailProduk.detail.images[0].file,
        namaProduk: this.props.dataDetailProduk.detail.product.name,
        weight: this.props.dataDetailProduk.detail.product.weight,
        subtotal: this.props.dataDetailProduk.detail.product.price * 1,
        diskon: String((this.props.dataDetailProduk.detail.product.price * this.props.dataDetailProduk.detail.product.discount) / 100),
        originId: this.props.dataDetailProduk.detail.location.district.ro_id,
        dataKurir: this.props.dataDetailProduk.detail.expeditions
      })
    }
    if (nextProps.dataAddress.status === 200) {
      if (nextProps.dataAddress.address.address === '' || nextProps.dataAddress.address.address === null || nextProps.dataAddress.address.address === undefined) {
        if (this.state.dataAlamat.length > 0) {
          this.setState({
            statusAlamat: true
          })
        } else {
          this.setState({
            statusAlamat: false
          })
        }
      } else {
        this.setState({
          idAlamat: nextProps.dataAddress.address.id,
          alamat: nextProps.dataAddress.address.alias_address,
          jalan: nextProps.dataAddress.address.address,
          nama: nextProps.dataAddress.address.name,
          roIdDistrict: nextProps.dataAddress.address.district.ro_id,
          idDistrict: nextProps.dataAddress.address.district.id,
          district: nextProps.dataAddress.address.district.name,
          provinsi: nextProps.dataAddress.address.province.name,
          idProvinsi: nextProps.dataAddress.address.province.id,
          kabupaten: nextProps.dataAddress.address.subDistrict.name,
          idKabupaten: nextProps.dataAddress.address.subDistrict.id,
          kodepos: nextProps.dataAddress.address.postal_code,
          email: nextProps.dataAddress.address.email,
          telepon: 'Telp: ' + nextProps.dataAddress.address.phone_number
        })
        this.props.resetStatusAddress()
      }
    } else if (nextProps.dataAddress.status !== 200 && nextProps.dataAddress.status !== 0) {
      this.setState({
        statusAlamat: false
      })
      ToastAndroid.show(nextProps.dataAddress.message, ToastAndroid.SHORT)
      this.props.resetStatusAddress()
    }
    if (nextProps.dataServices.status === 200) {
      if (nextProps.dataServices.charges.length > 0) {
        this.setState({
          dataCost: nextProps.dataServices.charges,
          statusSubKurir: false
        })
      } else {
        this.setState({
          dataCost: [],
          statusSubKurir: false
        })
      }
    } else if (nextProps.dataServices.status !== 200 && nextProps.dataServices.status !== 0) {
      this.setState({
        dataCost: [],
        statusSubKurir: false
      })
      ToastAndroid.show(nextProps.dataServices.message, ToastAndroid.SHORT)
      nextProps.dataServices.status = 0
    }
    if (nextProps.dataCart.status === 200) {
      if (this.state.activeScene) {
        this.setState({ loadingCart: false, modalNotifikasi: true, activeScene: false })
        this.props.resetCreateStatus()
      }
    } else if (nextProps.dataCart.status !== 200 && nextProps.dataCart.status !== 0) {
      if (this.state.activeScene) {
        this.setState({ loadingCart: false })
        ToastAndroid.show(nextProps.dataCart.message, ToastAndroid.SHORT)
        this.props.resetCreateStatus()
      }
    }
    if (nextProps.dataAddressList.status === 200) {
      this.setState({ dataAlamat: nextProps.dataAddressList.address, loadingAlamat: false })
    } else if (nextProps.dataAddressList.status !== 200 && nextProps.dataAddressList.status !== 0) {
      this.setState({ loadingAlamat: false })
      ToastAndroid.show(nextProps.dataAddressList.message, ToastAndroid.SHORT)
      nextProps.dataAddressList.status = 0
    }
  }

  renderProduct () {
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
              {this.state.namaToko}
            </Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.textHapus} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  renderHargaSatuan () {
    const {price} = this.state
    return (
      <View style={[styles.qualityContainer, {paddingTop: 25}]}>
        <View style={[styles.eachQualiyNoMargin, {paddingBottom: 25, flex: 1}]}>
          <Text style={[styles.qualityText, {marginBottom: 0, paddingLeft: 5}]}>Harga Satuan</Text>
        </View>
        <Text style={[styles.qualityText, {marginBottom: 0, marginRight: 20}]}>{price}</Text>
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
    const {countProduct, price, ongkirSatuan, grosir, dataGrosir, tempPrice} = this.state
    if (countProduct > 1) {
      const tempCount = countProduct - 1
      const temp = tempCount * price
      const temp2 = Math.ceil(tempCount * this.state.weight / 1000) * ongkirSatuan
      if (grosir) {
        for (var i = 0; i < dataGrosir.length; i++) {
          if (tempCount >= dataGrosir[i].min && tempCount <= dataGrosir[i].max) {
            this.setState({
              countProduct: tempCount,
              subtotal: tempCount * dataGrosir[i].price,
              ongkir: temp2,
              price: dataGrosir[i].price
            })
            break
          } else if (tempCount < dataGrosir[0].min) {
            this.setState({
              countProduct: tempCount,
              subtotal: temp,
              ongkir: temp2,
              price: tempPrice
            })
          }
        }
      } else {
        this.setState({
          countProduct: tempCount,
          subtotal: temp,
          ongkir: temp2,
          price: tempPrice
        })
      }
    }
  }

  add () {
    const {countProduct, tempPrice, price, ongkirSatuan, stock, grosir, dataGrosir} = this.state
    const tempCount = countProduct + 1
    const temp = tempCount * price
    const temp2 = Math.ceil(tempCount * this.state.weight / 1000) * ongkirSatuan
    if (tempCount <= stock) {
      if (grosir) {
        for (var i = 0; i < dataGrosir.length; i++) {
          if (tempCount >= dataGrosir[i].min && tempCount <= dataGrosir[i].max) {
            this.setState({
              countProduct: tempCount,
              subtotal: tempCount * dataGrosir[i].price,
              ongkir: temp2,
              price: dataGrosir[i].price
            })
            break
          } else if (tempCount < dataGrosir[0].min) {
            this.setState({
              countProduct: tempCount,
              subtotal: temp,
              ongkir: temp2,
              price: tempPrice
            })
          }
        }
      } else {
        this.setState({
          countProduct: tempCount,
          subtotal: temp,
          ongkir: temp2,
          price: tempPrice
        })
      }
    }
  }

  renderSubtotal () {
    const {price, countProduct} = this.state
    const temp = parseInt(price) * countProduct
    const totalHarga = this.maskedMoney(temp)
    return (
      <View style={[styles.qualityContainer, {paddingTop: 25}]}>
        <View style={[styles.eachQualiyNoMargin, {paddingBottom: 25, flex: 1}]}>
          <Text style={[styles.qualityText, {marginBottom: 0, paddingLeft: 5}]}>Subtotal Harga Barang</Text>
        </View>
        <Text style={[styles.qualityText, {marginBottom: 0, marginRight: 20}]}>{totalHarga}</Text>
      </View>
    )
  }

  getListAlamat () {
    this.setState({ modalAlamat: true, loadingAlamat: true })
    this.props.getListAlamat()
  }

  renderAlamat () {
    const { jalan, nama, provinsi, telepon, statusAlamat, kodepos, kabupaten, district, email, dataKosong, dataAlamat } = this.state
    if (dataKosong && dataAlamat.length === 0) {
      return (
        <View style={{ flexDirection: 'column' }}>
          <TouchableOpacity
            style={styles.containerIsiInfo}
            onPress={() => NavigationActions.purchaseuserinfo({type: ActionConst.PUSH})}
          >
            <Text style={styles.buttonIsiInfoError}>Isi Informasi Data Pengiriman</Text>
            <Image source={Images.rightArrow} style={styles.imagePicker} />
          </TouchableOpacity>
        </View>
      )
    } else if (dataKosong && dataAlamat.length > 0) {
      return (
        <View style={{ flexDirection: 'column' }}>
          <TouchableOpacity
            style={styles.containerIsiInfo}
            onPress={() => this.getListAlamat()}
          >
            <Text style={styles.buttonIsiInfoError}>Isi Informasi Data Pengiriman</Text>
            <Image source={Images.rightArrow} style={styles.imagePicker} />
          </TouchableOpacity>
        </View>
      )
    } else if (statusAlamat && dataAlamat.length > 0 && jalan === '') {
      return (
        <TouchableOpacity
          style={styles.containerIsiInfo}
          onPress={() => this.getListAlamat()}
        >
          <Text style={styles.buttonIsiInfo}>Isi Informasi Data Pengiriman</Text>
          <Image source={Images.rightArrow} style={styles.imagePicker} />
        </TouchableOpacity>
      )
    } else if (statusAlamat) {
      let provinsiText
      if (provinsi === '') {
        provinsiText = null
      } else {
        provinsiText = (<Text style={styles.textAlamat}> {provinsi}, {kodepos} </Text>)
      }
      return (
        <View style={styles.alamat}>
          <View style={styles.titleInfo}>
            <Text style={[styles.textNama, { flex: 1 }]}> Informasi Data Pengiriman </Text>
            <TouchableOpacity onPress={() => this.getListAlamat()}>
              <Text style={styles.textGanti}>Ganti</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.containerInfoAlamat}>
            <Text style={styles.textLabel}> Nama Penerima </Text>
            <Text style={styles.textAlamat}> {nama} </Text>
            <Text style={styles.textLabel}> Alamat Email </Text>
            <Text style={styles.textAlamat}> {email} </Text>
            <Text style={styles.textLabel}> No Handphone </Text>
            <Text style={styles.textAlamat}> {telepon} </Text>
            <Text style={styles.textLabel}> Alamat </Text>
            <Text style={styles.textAlamat}> {jalan} </Text>
            <Text style={styles.textAlamat}> {kabupaten} </Text>
            <Text style={styles.textAlamat}> {district} </Text>
            {provinsiText}
          </View>
        </View>
      )
    }
    return (
      <TouchableOpacity
        style={styles.containerIsiInfo}
        onPress={() => NavigationActions.purchaseuserinfo({type: ActionConst.PUSH})}
      >
        <Text style={styles.buttonIsiInfo}>Isi Informasi Data Pengiriman</Text>
        <Image source={Images.rightArrow} style={styles.imagePicker} />
      </TouchableOpacity>
    )
  }

  renderInformasiPemesanan () {
    const { kurir, tipeKurir, asuransi, errorKurir, errorSubKurir } = this.state
    let renderkurir
    let rendersubkurir
    let renderasuransi

    if (kurir === '' && !errorKurir) {
      renderkurir = (
        <TouchableOpacity
          style={styles.containerPicker}
          onPress={() => this.setState({ modalKurir: true })}
        >
          <Text style={[styles.buttonIsiInfo, { flex: 1 }]}>Pilih Kurir Pengiriman</Text>
          <Image source={Images.down} style={styles.imagePicker} />
        </TouchableOpacity>
      )
    } else if (kurir === '' && errorKurir) {
      renderkurir = (
        <View>
          <TouchableOpacity
            style={styles.containerPicker}
            onPress={() => this.setState({ modalKurir: true })}
          >
            <Text style={[styles.buttonIsiInfoError, { marginTop: 5, flex: 1 }]}>Pilih Kurir Pengiriman</Text>
            <Image source={Images.down} style={styles.imagePicker} />
          </TouchableOpacity>
          <View style={styles.containerError}>
            <Text style={styles.error}>Mohon pilih kurir pengiriman</Text>
          </View>
        </View>
      )
    } else if (kurir !== '') {
      renderkurir = (
        <TouchableOpacity
          style={styles.containerPicker}
          onPress={() => this.setState({ modalKurir: true })}
        >
          <Text style={[styles.teksPicker, { flex: 1 }]}>Kurir Pengiriman</Text>
          <Text style={styles.teksPicker}>{kurir}</Text>
          <Image source={Images.down} style={styles.imagePicker} />
        </TouchableOpacity>
      )
    }

    if (kurir !== '' && tipeKurir !== '') {
      rendersubkurir =
      (<TouchableOpacity
        style={styles.containerPicker}
        onPress={() => this.setState({ modalSubkurir: true })}
      >
        <Text style={[styles.teksPicker, { flex: 1 }]}>Paket Pengiriman</Text>
        <Text style={styles.teksPicker}>{tipeKurir}</Text>
        <Image source={Images.down} style={styles.imagePicker} />
      </TouchableOpacity>)

      renderasuransi =
      (<TouchableOpacity
        style={styles.containerPicker}
        onPress={() => this.setState({ modalAsuransi: true })}
      >
        <Text style={[styles.teksPicker, { flex: 1 }]}>Asuransi</Text>
        <Text style={styles.teksPicker}>{asuransi}</Text>
        <Image source={Images.down} style={styles.imagePicker} />
      </TouchableOpacity>)
    } else if (kurir !== '' && tipeKurir === '' && !errorSubKurir) {
      rendersubkurir =
      (<View>
        <TouchableOpacity
          style={styles.containerPicker}
          onPress={() => this.setState({ modalSubkurir: true })}
        >
          <Text style={[styles.buttonIsiInfo, { flex: 1 }]}>Paket Pengiriman</Text>
          <Image source={Images.down} style={styles.imagePicker} />
        </TouchableOpacity>
        <View style={styles.separator} /></View>)
    } else if (kurir !== '' && tipeKurir === '' && errorSubKurir) {
      rendersubkurir =
      (<View>
        <TouchableOpacity
          style={styles.containerPicker}
          onPress={() => this.setState({ modalSubkurir: true })}
        >
          <Text style={[styles.buttonIsiInfoError, { marginTop: 5, flex: 1 }]}>Paket Pengiriman</Text>
          <Image source={Images.down} style={styles.imagePicker} />
        </TouchableOpacity>
        <View style={styles.containerError}>
          <Text style={styles.error}>Mohon pilih paket pengiriman</Text>
        </View></View>)
    }

    return (
      <View>
        {renderkurir}
        {rendersubkurir}
        {renderasuransi}
      </View>
    )
  }

  handleCatatan = (text) => {
    this.setState({ catatan: text })
  }

  renderCatatan () {
    const { catatan } = this.state
    return (
      <View style={styles.catatanContainer}>
        <Text style={styles.teksPicker}>Catatan (optional)</Text>
        <TextInput
          style={[styles.textInput, { height: this.state.height }]}
          multiline
          value={catatan}
          onContentSizeChange={(event) => {
            this.setState({height: event.nativeEvent.contentSize.height})
          }}
          keyboardType='default'
          autoCapitalize='none'
          autoCorrect
          onChangeText={this.handleCatatan}
          underlineColorAndroid='transparent'
          placeholder='Contoh: saya pesan yang merah'
        />
      </View>
    )
  }

  maskedMoney (value) {
    return 'Rp ' + RupiahFormat(value)
  }

  renderRincian () {
    const { subtotal, price, expeditionFee, ongkir, asuransi, countProduct } = this.state
    let temp2 = 0
    if (asuransi === 'Ya') {
      temp2 = price * expeditionFee * parseInt(countProduct) / 100
    } else if (asuransi === 'Tidak') {
      temp2 = 0
    }
    const total = parseInt(subtotal) + parseInt(temp2) + parseInt(ongkir)
    const hargaSubtotal = this.maskedMoney(subtotal)
    const hargaBiayaAsuransi = this.maskedMoney(temp2)
    const hargaOngkir = this.maskedMoney(ongkir)
    const hargaTotal = this.maskedMoney(total)
    return (
      <View style={styles.rincianContainer}>
        <View style={styles.labelRincianNoBorder}>
          <Text style={[styles.textBold, { marginTop: 0 }]}>Rincian Harga</Text>
        </View>
        <View style={styles.labelRincian}>
          <View style={[styles.rincian, { marginTop: 0 }]}>
            <Text style={[styles.teksPicker, { flex: 1 }]}>Harga Barang</Text>
            <Text style={styles.teksPicker}>{hargaSubtotal}</Text>
          </View>
          <View style={styles.rincian}>
            <Text style={[styles.teksPicker, { flex: 1 }]}>Ongkos Kirim</Text>
            <Text style={styles.teksPicker}>{hargaOngkir}</Text>
          </View>
          <View style={styles.rincian}>
            <Text style={[styles.teksPicker, { flex: 1 }]}>Asuransi</Text>
            <Text style={styles.teksPicker}>{hargaBiayaAsuransi}</Text>
          </View>
        </View>
        <View style={styles.labelRincianNoBorder}>
          <View style={[styles.rincian, { marginTop: 0 }]}>
            <Text style={[styles.textBold, { flex: 1 }]}>Total Harga</Text>
            <Text style={styles.textBold}>{hargaTotal}</Text>
          </View>
        </View>
      </View>
    )
  }

  renderButtonKode () {
    return (
      <View style={styles.containerPicker}>
        <Text style={[styles.teksPicker, { flex: 1 }]}>Kurir Pengiriman</Text>
        <TouchableOpacity>
          <Text style={styles.textGanti}>Gunakan Kode</Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderKode () {
    const { diskon } = this.state
    const hargaDiskon = this.maskedMoney(diskon)
    return (
      <View style={styles.rincianContainer}>
        <View style={styles.rincianDiskon}>
          <Text style={[styles.teksPicker, { flex: 1, marginTop: 0 }]}>Belanja Enak</Text>
          <TouchableOpacity>
            <Text style={styles.textHapus}>Batal</Text>
          </TouchableOpacity>
        </View>
        <Text allowFontScaling style={styles.diskon}>- {hargaDiskon}</Text>
      </View>
    )
  }

  renderKeranjang () {
    const spinner = this.state.loadingCart
    ? (<View style={[styles.spinner, {backgroundColor: Colors.bluesky}]}>
      <ActivityIndicator color={Colors.snow} size='large' />
    </View>) : (<View />)
    if (this.state.loadingCart) {
      return (
        <View style={styles.total}>
          <View style={[styles.button, { backgroundColor: Colors.bluesky }]}>
            {spinner}
          </View>
        </View>
      )
    } else if (!this.state.loadingCart) {
      return (
        <View style={styles.total}>
          <TouchableOpacity style={styles.button} onPress={() => this.addCart()}>
            <Text style={styles.textButton}>Masukkan Ke Keranjang</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  addCart () {
    const {
      jalan,
      nama,
      provinsi,
      telepon,
      statusAlamat,
      kodepos,
      kabupaten,
      district,
      email,
      kurir,
      tipeKurir,
      dataKosong,
      errorKurir,
      errorSubKurir,
      idProduct,
      idKurir,
      idSubKurir,
      countProduct,
      catatan,
      idAlamat,
      asuransi,
      service,
      originId,
      roIdDistrict
    } = this.state
    let boolAsuransi
    if (asuransi === 'Ya') {
      boolAsuransi = true
    } else if (asuransi === 'Tidak') {
      boolAsuransi = false
    }
    if (jalan === '' || nama === '' || provinsi === '' || telepon === '' || statusAlamat === '' || kodepos === '' || kabupaten === '' || district === '' || email === '') {
      this.setState({ dataKosong: true })
    } else if (jalan !== '' && nama !== '' && provinsi !== '' && telepon !== '' && statusAlamat !== '' && kodepos !== '' && kabupaten !== '' && district !== '' && email !== '') {
      this.setState({ dataKosong: false, statusAlamat: true })
    }

    if (kurir === '') {
      this.setState({ errorKurir: true })
    } else if (kurir !== '') {
      this.setState({ errorKurir: false })
    }
    if (kurir !== '' && tipeKurir === '') {
      this.setState({ errorSubKurir: true })
    } else if (kurir !== '' && tipeKurir !== '') {
      this.setState({ errorSubKurir: false })
    }
    if (tipeKurir !== '' && !dataKosong && !errorKurir && !errorSubKurir) {
      this.setState({ loadingCart: true })
      setTimeout(() => {
        this.props.addCart(String(idProduct), idKurir, idSubKurir, countProduct, catatan, idAlamat, boolAsuransi, service, originId, roIdDistrict)
      }, 200)
    }
  }

  keranjang () {
    this.setState({ modalNotifikasi: false })
    this.props.getCart()
    NavigationActions.purchasecart({
      type: ActionConst.REPLACE
    })
  }

  home () {
    NavigationActions.backtab({
      type: 'reset'
    })
  }

  renderModalNotifikasi () {
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.modalNotifikasi}
        onRequestClose={() => console.log('')}
        >
        <View style={styles.modalContainer}>
          <View style={styles.containerNotifikasi}>
            <Image source={Images.tas} style={styles.gambarNotifikasi} />
            <Text style={styles.textNotifikasi}>Produk telah berhasil dimasukkan{'\n'}ke Keranjang Belanja</Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={styles.buttonKeranjang} onPress={() => this.keranjang()}>
                <Text style={styles.textButton}>Lihat Keranjang Belanja</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={styles.buttonKembaliBelanja} onPress={() => this.home()}>
                <Text style={styles.textButtonBelanja}>Kembali Belanja</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View >
      </Modal>
    )
  }

  renderModalAlamat () {
    let viewAlamat
    const spinner = this.state.loadingAlamat
    ? (<View style={styles.spinner}>
      <ActivityIndicator color={Colors.bluesky} size='large' />
    </View>) : (<View />)
    if (this.state.loadingAlamat) {
      viewAlamat = (<View>{spinner}</View>)
    } else {
      viewAlamat = (
        <ListView
          dataSource={this.dataSource.cloneWithRows(this.state.dataAlamat)}
          renderRow={this.renderListAlamat.bind(this)}
          enableEmptySections
        />
      )
    }
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.modalAlamat}
        onRequestClose={() => this.setState({ modalAlamat: false })}
        >
        <TouchableOpacity style={styles.modalContainer} onPress={() => this.setState({ modalAlamat: false })}>
          <ScrollView style={styles.menuProvinsiContainer}>
            <View style={styles.headerListView}>
              <Text style={styles.headerTextListView}>Pilih Alamat Pengiriman</Text>
            </View>
            {viewAlamat}
            <TouchableOpacity
              style={styles.buttonAlamat}
              onPress={() => {
                NavigationActions.purchaseuserinfo({type: ActionConst.PUSH})
                this.setState({ modalAlamat: false })
              }}
            >
              <Text style={styles.textGanti}>+ Tambah Alamat Baru</Text>
            </TouchableOpacity>
          </ScrollView>
        </TouchableOpacity>
      </Modal>
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
            {this.renderListViewSubKurir()}
          </ScrollView>
        </TouchableOpacity>
      </Modal>
    )
  }

  renderListViewSubKurir () {
    const { dataCost, statusSubKurir } = this.state
    if (dataCost.length > 0) {
      return (
        <ListView
          dataSource={this.dataSource.cloneWithRows(this.state.dataCost)}
          renderRow={this.renderListSubKurir.bind(this)}
          enableEmptySections
        />
      )
    }
    if (statusSubKurir) {
      return (
        <View style={[styles.menuLaporkan, { padding: 20 }]} >
          <Text style={[styles.textBagikan, { marginLeft: 0, flex: 1 }]}>Loading Data...</Text>
        </View>
      )
    }
    return (
      <View style={[styles.menuLaporkan, { padding: 20 }]} >
        <Text style={[styles.textBagikan, { marginLeft: 0, flex: 1 }]}>Tidak ada Data</Text>
      </View>
    )
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

  renderListAlamat (rowData, section, row) {
    const centang = row === this.state.activeAlamat ? Images.centangBiru : null
    return (
      <TouchableOpacity
        style={[styles.menuLaporkan, { padding: 20 }]}
        onPress={() => this.onPressAlamat(row)}
      >
        <View style={styles.listAlamatContainer}>
          <Text style={[styles.textBagikan, { marginLeft: 0, flex: 1 }]}>{rowData.alias_address}</Text>
          <Text style={[styles.textBagikan, { marginLeft: 0, flex: 1 }]}>{rowData.address}</Text>
          <Text style={[styles.textBagikan, { marginLeft: 0, flex: 1 }]}>{rowData.district.name}, {rowData.province.name}</Text>
          <Text style={[styles.textBagikan, { marginLeft: 0, flex: 1 }]}>{rowData.postal_code}</Text>
        </View>
        <Image source={centang} style={styles.gambarCentang} />
      </TouchableOpacity>
    )
  }

  onPressAlamat (row) {
    const { dataAlamat } = this.state
    this.setState({
      modalAlamat: false,
      idAlamat: dataAlamat[row].id,
      alamat: dataAlamat[row].alias_address,
      jalan: dataAlamat[row].address,
      nama: dataAlamat[row].name,
      roIdDistrict: dataAlamat[row].district.ro_id,
      idDistrict: dataAlamat[row].district.id,
      district: dataAlamat[row].district.name,
      provinsi: dataAlamat[row].province.name,
      idProvinsi: dataAlamat[row].province.id,
      kabupaten: dataAlamat[row].subDistrict.name,
      idKabupaten: dataAlamat[row].subDistrict.id,
      kodepos: dataAlamat[row].postal_code,
      email: dataAlamat[row].email,
      telepon: 'Telp: ' + dataAlamat[row].phone_number,
      dataKosong: false,
      kurir: '',
      tipeKurir: ''
    })
  }

  renderListKurir (rowData, section, row) {
    const centang = row === this.state.activeKurir ? Images.centangBiru : null
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
    const {weight, dataKurir, originId, roIdDistrict, activeKurir, dataSourceKurir} = this.state
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
      expeditionFee: dataKurir[row].insurance_fee,
      modalKurir: false,
      statusSubKurir: true
    })
    this.props.getServices(dataKurir[row].id, originId, roIdDistrict, weight)
  }

  renderListSubKurir (rowData, section, row) {
    const centang = row === this.state.activeSubKurir ? Images.centangBiru : Images.closewhite
    let day
    if (rowData.etd.toLowerCase().includes('hari') || rowData.etd.toLowerCase().includes('jam')) {
      day = ''
    } else {
      day = 'hari'
    }
    return (
      <TouchableOpacity
        style={[styles.menuLaporkan, { padding: 20 }]}
        activeOpacity={1}
        onPress={() => this.onPressSubKurir(row)}
      >
        <Text style={[styles.textBagikan, { marginLeft: 0, flex: 1 }]}>{rowData.full_name}</Text>
        <Text style={[styles.textBagikan, { marginRight: 10 }]}>{rowData.etd} {day}</Text>
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
      service: dataCost[row].name,
      tipeKurir: dataCost[row].full_name,
      idSubKurir: dataCost[row].id,
      ongkirSatuan: dataCost[row].cost,
      ongkir: dataCost[row].cost * Math.ceil(this.state.countProduct * this.state.weight / 1000),
      modalSubkurir: false
    })
  }

  renderListAsuransi (rowData, section, row) {
    const centang = row === this.state.activeAsuransi ? Images.centangBiru : null
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
    const {dataAsuransi, activeAsuransi, dataSourceAsuransi, price, countProduct, expeditionFee} = this.state
    if (activeAsuransi !== row) {
      const newDataSource = dataAsuransi.map(data => {
        return {...data, activeKurir: row === data.id}
      })
      this.setState({
        dataSourceAsuransi: dataSourceAsuransi.cloneWithRows(newDataSource),
        activeAsuransi: row
      })
    }
    if (dataAsuransi[row].title === 'Ya') {
      this.setState({
        biayaAsuransi: price * expeditionFee * parseInt(countProduct) / 100
      })
    } else {
      this.setState({
        biayaAsuransi: 0
      })
    }
    this.setState({
      asuransi: dataAsuransi[row].title,
      idAsuransi: dataAsuransi[row].id,
      modalAsuransi: false
    })
  }

  renderErrorAlamat (errorAlamat) {
    if (errorAlamat) {
      return (
        <View style={styles.containerError}>
          <Text style={styles.error}>Mohon isi informasi data pengiriman terlebih dahulu.</Text>
        </View>
      )
    }
    return (
      <View style={styles.separator} />
    )
  }

  render () {
    const { dataKosong } = this.state
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.renderProduct()}
          {this.renderHargaSatuan()}
          {this.renderJumlah()}
          {this.renderSubtotal()}
          <View style={styles.separator} />
          {this.renderAlamat()}
          {this.renderErrorAlamat(dataKosong)}
          {this.renderInformasiPemesanan()}
          {this.renderCatatan()}
          <View style={styles.separator} />
          {this.renderRincian()}
          <View style={styles.separator} />
          {this.renderKeranjang()}
        </ScrollView>
        {this.renderModalAlamat()}
        {this.renderModalKurir()}
        {this.renderModalSubKurir()}
        {this.renderModalAsuransi()}
        {this.renderModalNotifikasi()}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataDetailProduk: state.productDetail,
    dataAddress: state.primaryAddress,
    dataAddressList: state.listAddress,
    dataServices: state.shippingCharges,
    dataCart: state.addToCart,
    dataCreateAlamat: state.addAddress
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAddress: dispatch(addressAction.getPrimaryAddress()),
    resetStatusAddress: () => dispatch(addressAction.resetPrimaryAddress()),
    getServices: (id, originId, destinationId, weight) => dispatch(serviceAction.getShippingCharge({
      id: id, origin_id: originId, destination_id: destinationId, weight: weight
    })),
    getListAlamat: () => dispatch(addressAction.getListAddress()),
    addCart: (productId, expeditionId, expeditionServiceId, countProduct, catatan, idAlamat, asuransi, service, originId, destinationId) =>
      dispatch(cartAction.addToCart({
        product_id: productId,
        expedition_id: expeditionId,
        expedition_service_id: expeditionServiceId,
        qty: countProduct,
        note: catatan,
        address_id: idAlamat,
        is_insurance: asuransi,
        service: service,
        origin_ro_id: originId,
        destination_ro_id: destinationId
      })),
    getDetailProduk: (id) => dispatch(produkAction.getProduct({id: id})),
    resetCreateStatus: () => dispatch(cartAction.addToCartReset()),
    getCart: () => dispatch(cartAction.getCart())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseAddToCart)
