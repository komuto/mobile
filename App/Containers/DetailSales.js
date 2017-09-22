import React from 'react'
import {
  ScrollView,
  Text,
  Image,
  View,
  TouchableOpacity,
  ListView,
  BackAndroid,
  ActivityIndicator,
  TextInput,
  Modal
} from 'react-native'
import { connect } from 'react-redux'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import moment from 'moment'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import { MaskService } from 'react-native-masked-text'
import StarRating from 'react-native-star-rating'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import * as salesAction from '../actions/transaction'

// Styles
import styles from './Styles/DetailSalesStyle'
import { Images, Fonts, Colors } from '../Themes'

class DetailSales extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      invoiceNumber: '',
      dateTransaction: 0,
      storePhoto: null,
      storeName: '',
      priceProduct: 0,
      modalOrderReceived: false,
      popupOrderReject: false,
      modalConfrimOrderReject: false,
      modalLoading: false,
      isDropship: false,
      isWholeSale: false,
      detailOrder: [],
      invoice: [],
      buyer: [],
      items: [],
      seller: [],
      reseller: [],
      expeditionName: '',
      expeditionServices: '',
      isInsurance: '',
      addressBuyer: '',
      addressSeller: '',
      loadingPage: true,
      idOrder: this.props.idOrder,
      statusAcceptOrder: false,
      statusRejectOrder: false,
      typeInvoice: '',
      loadingProcess: false,
      tabViewStyle: {
        backgroundColor: 'transparent'
      },
      status: this.props.status,
      type: this.props.types,
      receiptNumber: 123412341234,
      statusReceipt: 1,
      modalChangeReceiptNumber: false,
      photo: [{'name': Images.contohproduct}, {'name': Images.contohproduct}, {'name': Images.contohproduct}, {'name': Images.contohproduct}, {'name': Images.contohproduct}, {'name': Images.contohproduct}, {'name': Images.contohproduct}, {'name': Images.contohproduct}, {'name': Images.contohproduct}, {'name': Images.contohproduct}],
      itemProblem: [{
        product: [
          {
            images: Images.contohproduct, productName: 'Sepatu Jogging Nike Hitam'
          },
          {
            images: Images.contohproduct, productName: 'Sepatu Jogging Nike Hitam '
          }
        ],
        problem: 'Barang tidak sesuai deskripsi, Produk tidak lengkap, Barang rusak',
        solution: 'Refund Dana'
      }],
      dataReview: [
        {
          'id': 142,
          'review': 'Mantap gan barangnya',
          'quality': 5,
          'accuracy': 5,
          'created_at': 1505433716,
          'product': {
            'id': 96.42,
            'name': 'TV Kecil',
            'image': 'https://komutodev.aptmi.com/uploads/produk/8011774ba21b8cc99a20583008bc07e43d19bdc1_klepon1.jpg',
            'store': {
              'id': 42,
              'name': 'Toko TV',
              'logo': 'https://komutodev.aptmi.com/uploads/toko/5c36c93e1e5246008eb520b0e1d2372202e10da3_YouTube-icon-full_color.png'
            }
          },
          'user': {
            'id': 32,
            'name': 'bleble',
            'photo': 'https://komutodev.aptmi.com/uploads/user/https://scontent.xx.fbcdn.net/v/t1.0-1/s200x200/12190927_1051452451551693_3353738072722896044_n.jpg?oh=1a89bdfda8446cc6b3c82a4536970ba3&oe=599E476F'
          }
        },
        {
          'id': 141,
          'review': 'Mantap gan barangnya',
          'quality': 5,
          'accuracy': 5,
          'created_at': 1505433486,
          'product': {
            'id': 96.42,
            'name': 'TV Kecil',
            'image': 'https://komutodev.aptmi.com/uploads/produk/8011774ba21b8cc99a20583008bc07e43d19bdc1_klepon1.jpg',
            'store': {
              'id': 42,
              'name': 'Toko TV',
              'logo': 'https://komutodev.aptmi.com/uploads/toko/5c36c93e1e5246008eb520b0e1d2372202e10da3_YouTube-icon-full_color.png'
            }
          },
          'user': {
            'id': 32,
            'name': 'bleble',
            'photo': 'https://komutodev.aptmi.com/uploads/user/https://scontent.xx.fbcdn.net/v/t1.0-1/s200x200/12190927_1051452451551693_3353738072722896044_n.jpg?oh=1a89bdfda8446cc6b3c82a4536970ba3&oe=599E476F'
          }
        }],
      stateDetailSale: [],
      dispute: [],
      shipping: [],
      idSales: this.props.idSales,
      statusUpdate: false
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataDetailSale.status === 200) {
      this.setState({
        detailOrder: nextProps.dataDetailSale.sale,
        buyer: nextProps.dataDetailSale.sale.buyer,
        invoice: nextProps.dataDetailSale.sale.invoice,
        typeInvoice: nextProps.dataDetailSale.sale.invoice.type,
        items: nextProps.dataDetailSale.sale.items,
        seller: nextProps.dataDetailSale.sale.seller,
        reseller: nextProps.dataDetailSale.sale.reseller,
        invoiceNumber: nextProps.dataDetailSale.sale.invoice.invoice_number,
        dateTransaction: nextProps.dataDetailSale.sale.invoice.created_at,
        expeditionName: nextProps.dataDetailSale.sale.invoice.expedition.expedition.name,
        expeditionServices: nextProps.dataDetailSale.sale.invoice.expedition.name,
        isInsurance: nextProps.dataDetailSale.sale.invoice.is_insurance,
        addressBuyer: nextProps.dataDetailSale.sale.buyer.address,
        addressSeller: nextProps.dataDetailSale.sale.seller.address,
        dispute: nextProps.dataDetailSale.sale.dispute,
        shipping: nextProps.dataDetailSale.sale.shipping,
        loadingPage: false
      })
    } if (nextProps.dataUpdate === 200 && this.state.statusUpdate) {
      this.setState({modalLoading: false, statusUpdate: false})
      this.props.getDetailSales(this.state.idSales)
      nextProps.dataUpdate === 0
    }
  }

  componentDidMount () {
    this.props.getDetailSales(this.state.idSales)
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
  }

  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
  }

  handleBack = () => {
    NavigationActions.pop()
    return true
  }

  maskedMoney (value) {
    const priceMasked = MaskService.toMask('money', value, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    return priceMasked
  }

  maskedDate (value) {
    const timeStampToDate = moment.unix(value).format('DD MMMM YYYY').toString()
    return timeStampToDate
  }

  renderPhoto (products) {
    if (products.length > 4) {
      const mapFoto = products.slice(0, 4).map((data, i) => {
        if (i === 3) {
          return (
            <View style={styles.containerOrder}>
              <View key={i} style={styles.maskedSmallImageProduct}>
                <Image source={{uri: data.product.image}} style={styles.imageSmallProduct} />
                <View style={styles.placeholder}>
                  <Text style={styles.textPlaceHolder}>+{products.length - 4}</Text>
                </View>
              </View>
            </View>
          )
        } else {
          return (
            <View style={styles.containerOrder}>
              <View key={i} style={styles.maskedSmallImageProduct}>
                <Image source={{uri: data.product.image}} style={styles.imageSmallProduct} />
              </View>
            </View>
          )
        }
      })
      return (
        <View style={{flexDirection: 'row'}}>
          {mapFoto}
        </View>
      )
    } else {
      const mapFoto = products.slice(0, 4).map((data, i) => {
        return (
          <View key={i} style={styles.maskedSmallImageProduct}>
            <Image source={{uri: data.product.image}} style={styles.imageSmallProduct} />
          </View>
        )
      })
      return (
        <View style={{flexDirection: 'row'}}>
          {mapFoto}
        </View>
      )
    }
  }

  renderInfoBuyer () {
    if (this.state.typeInvoice === 'reseller' || this.state.typeInvoice === 'buyer') {
      return (
        <View>
          <Text style={styles.bigTitle}>Info Pembeli</Text>
          <View style={[styles.continerOrder, {borderBottomWidth: 0}]}>
            <View style={styles.maskedImage}>
              <Image source={{uri: this.state.buyer.photo}} style={styles.image} />
            </View>
            <Text style={[styles.labelStyle, {marginLeft: 14}]}>{this.state.buyer.name}</Text>
            <TouchableOpacity style={styles.buttonFav} onPress={() => this.handleSendMessage('Kirim Pesan ke Pembeli', this.state.invoice.id, this.state.buyer, 'Pembeli', 'sendMessageBuyer')}>
              <Text style={styles.labelButtonFav}>Kirim Pesan</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    } else {
      return (
        <View>
          <Text style={styles.bigTitle}>Info Reseller</Text>
          <View style={[styles.continerOrder, {borderBottomWidth: 0}]}>
            <View style={styles.maskedImage}>
              <Image source={{uri: this.state.reseller.store.photo}} style={styles.image} />
            </View>
            <Text style={[styles.labelStyle, {marginLeft: 14}]}>{this.state.reseller.store.name}</Text>
            <TouchableOpacity style={styles.buttonFav} onPress={() => this.handleSendMessage('Kirim Pesan ke Reseller', this.state.invoice.id, this.state.reseller.store, 'Reseller', 'sendMessageReseller')}>
              <Text style={styles.labelButtonFav}>Kirim Pesan</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
  }

  renderRowProduct (rowData, x, y) {
    var moneyMasked = this.maskedMoney(rowData.total_price)
    return (
      <View>
        <View style={[styles.continerOrder, {alignItems: 'flex-start'}]}>
          <View style={styles.maskedImageProduct}>
            <Image source={{uri: rowData.image}} style={styles.imageProduct} />
          </View>
          <View style={styles.product}>
            <Text style={styles.labelProduct}>{rowData.product.name}</Text>
            <Text style={styles.labelProduct2}>Harga: {moneyMasked} / item </Text>
            <Text style={styles.labelProduct2}>Jumlah: {rowData.qty}</Text>
            <Text style={styles.labelMessage}>{rowData.note}</Text>
          </View>
        </View>
      </View>
    )
  }

  renderShippingInformation () {
    const {addressSeller, seller, reseller} = this.state
    if (this.state.typeInvoice === 'reseller') {
      return (
        <View>
          <View style={styles.information}>
            <Text style={styles.textInfo}>Barang ini terjual dari reseller. Sehingga nama
            toko reseller disertakan.</Text>
          </View>
          <View style={[styles.continerOrder, {alignItems: 'flex-start'}]}>
            <View style={styles.continerAddress}>
              <Text style={styles.labelProduct2}>Info Alamat Penjual</Text>
              <Text style={[styles.labelMessage, {lineHeight: 22, paddingRight: 58, fontFamily: Fonts.type.regular}]}>
                {seller.name} ({reseller.store.name}){'\n'}{addressSeller.address}, {addressSeller.village.name}, {addressSeller.subdistrict.name}, {addressSeller.district.name}, {addressSeller.province.name}, {addressSeller.postal_code}
              </Text>
            </View>
            <TouchableOpacity style={styles.buttonFav} onPress={() => {}}>
              <Text style={styles.labelButtonFav}>Cetak Alamat</Text>
            </TouchableOpacity>
          </View>
          {this.renderExpedition(this.state.invoice)}
        </View>
      )
    } if (this.state.typeInvoice === 'seller') {
      return (
        <View>
          <View style={[styles.continerOrder, {alignItems: 'flex-start'}]}>
            <View style={styles.continerAddress}>
              <Text style={styles.labelProduct2}>Info Alamat Penjual</Text>
              <Text style={[styles.labelMessage, {lineHeight: 22, paddingRight: 58, fontFamily: Fonts.type.regular}]}>
                {seller.name} ({reseller.store.name}){'\n'}{addressSeller.address}, {addressSeller.village.name}, {addressSeller.subdistrict.name}, {addressSeller.district.name}, {addressSeller.province.name}, {addressSeller.postal_code}
              </Text>
            </View>
            <TouchableOpacity style={styles.buttonFav} onPress={() => {}}>
              <Text style={styles.labelButtonFav}>Cetak Alamat</Text>
            </TouchableOpacity>
          </View>
          {this.renderExpedition(this.state.invoice)}
        </View>
      )
    } else {
      return (
        <View>
          <View style={[styles.continerOrder, {alignItems: 'flex-start'}]}>
            <View style={styles.continerAddress}>
              <Text style={styles.labelProduct2}>Info Alamat Penjual</Text>
              <Text style={[styles.labelMessage, {lineHeight: 22, paddingRight: 58, fontFamily: Fonts.type.regular}]}>
                {seller.name}{'\n'}{addressSeller.address}, {addressSeller.village.name}, {addressSeller.subdistrict.name}, {addressSeller.district.name}, {addressSeller.province.name}, {addressSeller.postal_code}
              </Text>
            </View>
            <TouchableOpacity style={styles.buttonFav} onPress={() => {}}>
              <Text style={styles.labelButtonFav}>Cetak Alamat</Text>
            </TouchableOpacity>
          </View>
          {this.renderExpedition(this.state.invoice)}
        </View>
      )
    }
  }

  checkInsurance (data) {
    if (data) {
      this.status = 'Ya'
    } else {
      this.status = 'Tidak'
    }
    return (
      <Text style={[styles.labelMessage, {fontFamily: Fonts.type.regular}]}>{this.status}</Text>
    )
  }

  renderExpedition () {
    const {expeditionName, expeditionServices, isInsurance} = this.state
    return (
      <View>
        <View style={styles.continerOrder}>
          <Text style={styles.labelStyle}>Kurir Pengiriman</Text>
          <Text style={[styles.labelMessage, {fontFamily: Fonts.type.regular}]}>{expeditionName}</Text>
        </View>
        <View style={styles.continerOrder}>
          <Text style={styles.labelStyle}>Paket Pengiriman</Text>
          <Text style={[styles.labelMessage, {fontFamily: Fonts.type.regular}]}>{expeditionServices}</Text>
        </View>
        <View style={[styles.continerOrder, {borderBottomWidth: 0}]}>
          <Text style={styles.labelStyle}>Asuransi</Text>
          {this.checkInsurance(isInsurance)}
        </View>
      </View>
    )
  }

  renderPriceDetail (data) {
    var subTotal = this.maskedMoney(data.total_bill)
    var insuranceFee = this.maskedMoney(data.insurance_fee)
    var postalFee = this.maskedMoney(data.delivery_cost)

    var total = data.total_bill + data.insurance_fee + data.delivery_cost
    var totalMasked = this.maskedMoney(total)

    return (
      <View>
        <View style={[styles.continerOrderNoBorder, {paddingTop: 15}]}>
          <Text style={[styles.labelStyle]}>Subtotal</Text>
          <Text style={styles.valueStyle}>{subTotal}</Text>
        </View>
        <View style={styles.continerOrderNoBorder}>
          <Text style={styles.labelStyle}>Biaya Asuransi</Text>
          <Text style={styles.valueStyle}>{insuranceFee}</Text>
        </View>
        <View style={[styles.continerOrderNoBorder, {borderColor: Colors.silver, borderBottomWidth: 0.5}]}>
          <Text style={styles.labelStyle}>Biaya Asuransi</Text>
          <Text style={styles.valueStyle}>{postalFee}</Text>
        </View>
        <View style={[styles.continerOrderNoBorder, {padding: 15}]}>
          <Text style={styles.labelStyle}>Total</Text>
          <Text style={styles.valueStyle}>{totalMasked}</Text>
        </View>
      </View>
    )
  }

  checkStatus (data) {
    if (data === 0) {
      return (
        <View style={[styles.borderRow, {borderBottomWidth: 0, alignItems: 'center'}]}>
          <Text style={[styles.textSemiBoldslate]}>Status</Text>
          <View style={[styles.round, {backgroundColor: Colors.lightblack, marginTop: 2, marginRight: 10.8}]} />
          <Text style={[styles.textRegularSlate]}>REJECTED</Text>
        </View>
      )
    } if (data === 1) {
      return (
        <View style={[styles.borderRow, {borderBottomWidth: 0, alignItems: 'center'}]}>
          <Text style={[styles.textSemiBoldslate]}>Status</Text>
          <View style={[styles.round, {backgroundColor: Colors.lightBlue, marginTop: 2, marginRight: 10.8}]} />
          <Text style={[styles.textRegularSlate]}>WAITING</Text>
        </View>
      )
    } if (data === 2) {
      return (
        <View style={[styles.borderRow, {borderBottomWidth: 0, alignItems: 'center'}]}>
          <Text style={[styles.textSemiBoldslate]}>Status</Text>
          <View style={[styles.round, {backgroundColor: Colors.lightBlueGrey, marginTop: 2, marginRight: 10.8}]} />
          <Text style={[styles.textRegularSlate]}>PROCEED</Text>
        </View>
      )
    } if (data === 3) {
      return (
        <View style={[styles.borderRow, {borderBottomWidth: 0, alignItems: 'center'}]}>
          <Text style={[styles.textSemiBoldslate]}>Status</Text>
          <View style={[styles.round, {backgroundColor: Colors.bluesky, marginTop: 2, marginRight: 10.8}]} />
          <Text style={[styles.textRegularSlate]}>Menunggu Konfrimasi Pembeli</Text>
        </View>
      )
    } if (data === 4) {
      return (
        <View style={[styles.borderRow, {borderBottomWidth: 0, alignItems: 'center'}]}>
          <Text style={[styles.textSemiBoldslate]}>Status</Text>
          <View style={[styles.round, {backgroundColor: Colors.darkMint, marginTop: 2, marginRight: 10.8}]} />
          <Text style={[styles.textRegularSlate]}>Barrang sudah diterima</Text>
        </View>
      )
    } if (data === 5) {
      return (
        <View style={[styles.borderRow, {borderBottomWidth: 0, alignItems: 'center'}]}>
          <Text style={[styles.textSemiBoldslate]}>Status</Text>
          <View style={[styles.round, {backgroundColor: Colors.pumpkinOrange, marginTop: 2, marginRight: 10.8}]} />
          <Text style={[styles.textRegularSlate]}>Terdapat barang bermasalah</Text>
        </View>
      )
    } if (data === 6) {
      return (
        <View style={[styles.borderRow, {borderBottomWidth: 0, alignItems: 'center'}]}>
          <Text style={[styles.textSemiBoldslate]}>Status</Text>
          <View style={[styles.round, {backgroundColor: Colors.orange, marginTop: 2, marginRight: 10.8}]} />
          <Text style={[styles.textRegularSlate]}>COMPLAINT_DONE</Text>
        </View>
      )
    }
  }

  checkReceiptStatus (data) {
    if (data === 1) {
      return (
        <View style={[styles.borderRow, {borderBottomWidth: 0, alignItems: 'center'}]}>
          <Text style={[styles.textSemiBoldslate]}>Status Resi</Text>
          <Text style={[styles.textRegularSlate]}>DEFAULT</Text>
        </View>
      )
    } if (data === 2) {
      return (
        <View style={[styles.borderRow, {borderBottomWidth: 0, alignItems: 'center'}]}>
          <Text style={[styles.textSemiBoldslate]}>Status Resi</Text>
          <Text style={[styles.textRegularSlate]}>ACCEPT</Text>
        </View>
      )
    } if (data === 3) {
      return (
        <View style={[styles.borderRow, {borderBottomWidth: 0, alignItems: 'center'}]}>
          <Text style={[styles.textSemiBoldslate]}>Status Resi</Text>
          <Text style={[styles.textRegularSlate]}>DECLINE</Text>
        </View>
      )
    } if (data === 4) {
      return (
        <View style={[styles.borderRow, {borderBottomWidth: 0, alignItems: 'center'}]}>
          <Text style={[styles.textSemiBoldslate]}>Status Resi</Text>
          <Text style={[styles.textRegularSlate]}>SENT</Text>
        </View>
      )
    }
  }

  changeReceiptNumber = (text) => {
    this.setState({inputReceiptNumber: text})
  }

  modalChangeReceiptNumber () {
    return (
      <Modal
        animationType={'none'}
        transparent
        visible={this.state.modalChangeReceiptNumber}
        onRequestClose={() => this.setState({ modalChangeReceiptNumber: false })}
        >
        <TouchableOpacity style={styles.modalContainer} onPress={() => this.setState({modalChangeReceiptNumber: false})}>
          <View style={[styles.modalKatalog]}>
            <View style={[styles.flexRow, {alignItems: 'center', paddingRight: 18.5, borderTopLeftRadius: 5, borderTopRightRadius: 5, backgroundColor: Colors.paleGreyFive}]}>
              <Text style={[styles.title, {flex: 1, paddingBottom: 19.3}]}>Masukkan Nomor Resi Baru</Text>
              <TouchableOpacity onPress={() => this.setState({modalChangeReceiptNumber: false})}>
                <Image source={Images.close} style={styles.imagePicker} />
              </TouchableOpacity>
            </View>
            <View style={[styles.flexOne1, {justifyContent: 'flex-end'}]}>
              <TextInput
                style={[styles.inputText, {marginLeft: 20, marginRight: 20}]}
                value={this.state.inputReceiptNumber}
                keyboardType='numeric'
                returnKeyType='done'
                autoCapitalize='none'
                maxLength={30}
                autoCorrect
                onChangeText={this.changeReceiptNumber}
                underlineColorAndroid='transparent'
                placeholder='Nomer Resi'
              />
              <TouchableOpacity style={[styles.buttonnext, {margin: 20}]} onPress={() => this.handleChangeReceipeNumber()}>
                <Text style={styles.textButtonNext}>
                  Perbarui Nomor Resi
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    )
  }

  handleChangeReceipeNumber () {
    this.setState({modalChangeReceiptNumber: false, modalLoading: true})
    this.props.updateReceipeNumber(this.state.idSales, +this.state.inputReceiptNumber)
  }

  modalLoading () {
    return (
      <Modal
        animationType={'fade'}
        transparent
        visible={this.state.modalLoading}
        onRequestClose={() => this.setState({ modalLoading: false })}
        >
        <View style={[styles.containerLoading]}>
          <View style={styles.loading}>
            <ActivityIndicator color='white' size='large' />
          </View>
        </View>
      </Modal>
    )
  }

  checkReceiptNumber (data) {
    if (data === 1) {
      return (
        <Text onPress={() => this.setState({modalChangeReceiptNumber: true})} style={[styles.textSemiBoldslate, {marginLeft: 15, flex: 0, color: Colors.bluesky}]}>Ubah</Text>
      )
    }
    return (
      <View />
    )
  }

  renderDeliveryStatus () {
    const {buyer, items, invoice, invoiceNumber, shipping, typeInvoice, dispute} = this.state
    return (
      <ScrollView>
        <View style={styles.containerBuyer}>
          <Text style={[styles.textSemiBold, styles.flexOne]}>{buyer.name}</Text>
          <View style={styles.containerPhoto}>
            {this.renderPhoto(items)}
          </View>
        </View>
        <View style={styles.viewColumn}>
          <View style={styles.borderRow}>
            <Text style={[styles.textSemiBoldslate]}>No Invoice</Text>
            <Text style={[styles.textRegularSlate]}>{invoiceNumber}</Text>
          </View>
          {this.checkStatus(invoice.transaction_status)}
        </View>
        <View style={styles.viewColumn}>
          <View style={styles.borderRow}>
            <Text style={[styles.textSemiBoldslate]}>Nomor Resi</Text>
            <Text style={[styles.textRegularSlate]}>{shipping.airway_bill}</Text>
            {this.checkReceiptNumber(shipping.sender_status)}
          </View>
          {this.checkReceiptStatus(shipping.sender_status)}
        </View>
        {this.renderReviewProduct(items, typeInvoice, invoice.transaction_status)}
        {this.renderItemproblem(invoice.transaction_status, dispute)}
      </ScrollView>
    )
  }

  renderReviewProduct (items, typeInvoice, transactionStatus) {
    if (transactionStatus === 4) {
      return (
        <View>
          <Text style={styles.boldcharcoalGrey}>Review Produk</Text>
          <ListView
            dataSource={this.dataSource.cloneWithRows(this.state.items)}
            renderRow={this.renderRow.bind(this)}
            enableEmptySections
          />
        </View>
      )
    } else {
      return (
        <View />
      )
    }
  }

  renderRow (rowData) {
    if (rowData.review) {
      return (
        <View style={{marginBottom: 20, elevation: 0.1}}>
          <View style={styles.border2}>
            <View style={styles.profile}>
              <Image
                source={{ uri: rowData.product.image }}
                style={styles.styleFotoToko}
              />
              <View style={styles.namaContainer}>
                <Text style={styles.textNama}>
                  {rowData.product.name}
                </Text>
              </View>
            </View>
          </View>
          <View>
            {this.renderRatingUlasan(rowData.review.accuracy, rowData.review.quality, rowData.review.review)}
          </View>
        </View>
      )
    } else {
      return (
        <View style={styles.viewColumn}>
          <View style={[styles.borderRow, {borderBottomWidth: 0}]}>
            <Text style={[styles.textRegularSlate]}>Tidak ada Review dari pembeli</Text>
          </View>
        </View>
      )
    }
  }

  renderRatingUlasan (starAccurate, starQuantity, isiulasan) {
    return (
      <View style={{backgroundColor: Colors.snow}}>
        <View style={styles.qualityNoBorderContainer}>
          <View style={styles.eachQualiy}>
            <Text style={[styles.qualityText]}> Kualitas Produk </Text>
            <View style={{flexDirection: 'row'}}>
              <View style={{paddingTop: 4, marginLeft: 3}}>
                <StarRating
                  disabled
                  maxStars={5}
                  starColor={'#ffcd00'}
                  emptyStarColor={'#d9e1e9'}
                  starSize={16}
                  rating={starQuantity}
                />
              </View>
            </View>
          </View>
          <View style={styles.separator} />
          <View style={[styles.eachQualiy]}>
            <Text style={styles.qualityText}> Akurasi Produk </Text>
            <View style={{flexDirection: 'row'}}>
              <View style={{paddingTop: 4, marginLeft: 3}}>
                <StarRating
                  disabled
                  maxStars={5}
                  starColor={'#ffcd00'}
                  emptyStarColor={'#d9e1e9'}
                  starSize={16}
                  rating={starAccurate}
                />
              </View>
            </View>
          </View>
        </View>
        <Text style={styles.isiUlasan}>{isiulasan}</Text>
      </View>
    )
  }

  renderItemproblem (status, dispute) {
    if (status === 5) {
      return (
        <View>
          <Text style={styles.boldcharcoalGrey}>Barang bermasalah</Text>
          <View style={[styles.viewColumn, {marginBottom: 0}]}>
            {this.renderProductProblem(this.state.items, dispute)}
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonReset} onPress={() => {}}>
              <Text style={styles.labelButtonReset}>
                  Ke Detail Komplain
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
  }

  renderProductProblem (data, dispute) {
    const mapFoto = data.map((data, i) => {
      return (
        <View key={i} style={[styles.borderRow, {alignItems: 'center'}]}>
          <View style={{height: 30, width: 30, backgroundColor: Colors.paleGreyFive, marginRight: 10}}>
            <Image source={{uri: data.product.image}} style={{height: 30, width: 30, marginRight: 10}} />
          </View>
          <Text style={[styles.labelMessage, {fontFamily: Fonts.type.semiBolds}]}>{data.product.name}</Text>
        </View>
      )
    })
    return (
      <View>
        {mapFoto}
        <View style={[styles.viewColumn, {marginBottom: 0}]}>
          <View style={styles.borderRow}>
            <Text style={[styles.textSemiBoldslate]}>Masalah</Text>
            <Text style={[styles.textRegularSlate, {flex: 2, textAlign: 'right'}]}>{dispute.problems}</Text>
          </View>
          <View style={styles.borderRow}>
            <Text style={[styles.textSemiBoldslate]}>Pilihan Solusi</Text>
            <Text style={[styles.textRegularSlate, {flex: 2, textAlign: 'right'}]}>{dispute.note}</Text>
          </View>
        </View>
      </View>
    )
  }

  renderDetail () {
    var tempTransactionDate = this.maskedDate(this.state.dateTransaction)
    const {buyer, addressBuyer} = this.state
    return (
      <ScrollView>
        <View style={styles.continerOrder}>
          <Text style={styles.labelStyle}>No Invoice</Text>
          <Text style={styles.valueStyle}>{this.state.invoiceNumber}</Text>
        </View>
        <View style={[styles.continerOrder, {borderBottomWidth: 0}]}>
          <Text style={styles.labelStyle}>Tanggal Transaksi</Text>
          <Text style={styles.valueStyle}>{tempTransactionDate}</Text>
        </View>
        {this.renderInfoBuyer()}
        <Text style={styles.bigTitle}>Daftar Barang yang dibeli</Text>
        <ListView
          dataSource={this.dataSource.cloneWithRows(this.state.items)}
          renderRow={this.renderRowProduct.bind(this)}
          enableEmptySections
        />
        <Text style={styles.bigTitle}>Informasi Pengiriman</Text>
        <View style={{backgroundColor: Colors.snow}}>
          <View style={[styles.continerOrder, {alignItems: 'flex-start'}]}>
            <View style={styles.continerAddress}>
              <Text style={styles.labelProduct2}>Alamat Pengiriman</Text>
              <Text style={[styles.labelMessage, {lineHeight: 22, paddingRight: 58, fontFamily: Fonts.type.regular}]}>
                {buyer.name}{'\n'}{addressBuyer.address}, {addressBuyer.village.name}, {addressBuyer.subdistrict.name}, {addressBuyer.district.name}, {addressBuyer.province.name}, {addressBuyer.postal_code}
              </Text>
            </View>
            <TouchableOpacity style={styles.buttonFav} onPress={() => {}}>
              <Text style={styles.labelButtonFav}>Cetak Alamat</Text>
            </TouchableOpacity>
          </View>
          {this.renderShippingInformation()}
        </View>
        <Text style={styles.bigTitle}>Detail Harga</Text>
        {this.renderPriceDetail(this.state.invoice)}
        {this.finalAction()}
      </ScrollView>
    )
  }

  finalAction () {
    if (this.state.typeInvoice === 'reseller') {
      return (
        <View style={[styles.buttonContainer, {marginTop: 20}]}>
          <TouchableOpacity style={styles.buttonReset} onPress={() => this.handleSendMessage('Kirim Pesan ke Seller', this.state.invoice.id, this.state.seller, 'Seller', 'sendMessageSeller')}>
            <Text style={styles.labelButtonReset}>
                Kirim Pesan ke Seller
            </Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <View />
      )
    }
  }

  renderNotification (data) {
    if (data === 0) {
      return (
        <View style={[styles.information, {backgroundColor: Colors.paleGrey}]}>
          <Image source={Images.infoBlue} style={[styles.iconInfoBlue]} />
          <Text style={[styles.textInfo, {color: Colors.lightblack}]}>REJECTED</Text>
        </View>
      )
    } if (data === 1) {
      return (
        <View style={[styles.information, {backgroundColor: Colors.paleGrey}]}>
          <Image source={Images.infoBlue} style={[styles.iconInfoBlue]} />
          <Text style={[styles.textInfo, {color: Colors.lightblack}]}>WAITING</Text>
        </View>
      )
    } if (data === 2) {
      return (
        <View style={[styles.information, {backgroundColor: Colors.paleGrey}]}>
          <Image source={Images.infoBlue} style={styles.iconInfoBlue} />
          <Text style={[styles.textInfo, {color: Colors.lightblack}]}>PROCEED</Text>
        </View>
      )
    } if (data === 3) {
      return (
        <View style={[styles.information, {backgroundColor: Colors.blueBackground}]}>
          <Image source={Images.infoBlue} style={[styles.iconInfoBlue]} />
          <Text style={[styles.textInfo, {color: Colors.bluesky}]}>Setelah buyer mengkonfirmasi telah
          menerima barang atau dalam jangka waktu
          5 hari, saldo akan langsung kami kirimkan.</Text>
        </View>
      )
    } if (data === 4) {
      return (
        <View style={[styles.information, {backgroundColor: Colors.duckEggBlue}]}>
          <Image source={Images.infoBlue} style={[styles.iconInfoBlue]} />
          <Text style={[styles.textInfo, {color: Colors.greenish}]}>Barang telah diterima oleh pembeli. Uang
          penjualan telah kami kirimkan ke saldo
          Anda. Silahkan diperiksa.</Text>
        </View>
      )
    } if (data === 5) {
      return (
        <View style={[styles.information, {backgroundColor: 'rgba(239, 86, 86, 0.14)'}]}>
          <Image source={Images.infoBlue} style={[styles.iconInfoBlue]} />
          <Text style={[styles.textInfo, {color: Colors.red}]}>Terdapat barang yang bermasalah. Silahkan
          menyelesaikan masalah terlebih dahulu
          setelah masalah selesai, uang dari buyer akan
          kami kirimkan ke Anda.</Text>
        </View>
      )
    } if (data === 6) {
      return (
        <View style={[styles.information, {backgroundColor: Colors.paleGrey}]}>
          <Image source={Images.infoBlue} style={[styles.iconInfoBlue]} />
          <Text style={[styles.textInfo, {color: Colors.lightblack}]}>COMPLAINT_DONE</Text>
        </View>
      )
    }
  }

  handleSendMessage (titles, invoiceId, data, type, actionType) {
    NavigationActions.sendmessagestore({
      type: ActionConst.PUSH,
      title: titles,
      id: invoiceId,
      foto: data.photo,
      namaToko: data.name,
      alamat: type,
      typeMessage: actionType
    })
  }

  render () {
    if (this.state.loadingPage) {
      return (
        <View style={styles.spinner}>
          <ActivityIndicator color={Colors.red} size='large' />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <ScrollableTabView
          prerenderingSiblingsNumber={2}
          style={this.state.tabViewStyle}
          tabBarBackgroundColor={Colors.red}
          tabBarActiveTextColor={Colors.snow}
          tabBarUnderlineStyle={{ backgroundColor: Colors.snow, height: 2 }}
          tabBarInactiveTextColor={Colors.snow}
          tabBarTextStyle={styles.textTab}
          locked
        >
          <View tabLabel='Status Pengiriman' ref='deliveryStatus'>
            <ScrollView>
              {this.renderNotification(this.state.invoice.transaction_status)}
              {this.renderDeliveryStatus()}
            </ScrollView>
            {this.modalChangeReceiptNumber()}
          </View>
          <View tabLabel='Detail' ref='detail'>
            {this.renderDetail()}
          </View>
        </ScrollableTabView>
        {this.modalLoading()}
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  dataDetailSale: state.saleDetail,
  dataUpdate: state.updateStatus
})

const mapDispatchToProps = (dispatch) => ({
  getDetailSales: (id) => dispatch(salesAction.getSaleDetail({id: id})),
  updateReceipeNumber: (id, receipeNumber) => dispatch(salesAction.inputAirwayBill({id: id, airway_bill: receipeNumber}))
})

export default connect(mapStateToProps, mapDispatchToProps)(DetailSales)
