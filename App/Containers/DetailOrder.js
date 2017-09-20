import React from 'react'
import {
  View,
  ListView,
  Text,
  TouchableOpacity,
  Modal,
  BackAndroid,
  Image,
  ScrollView,
  ActivityIndicator
} from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import moment from 'moment'
import { MaskService } from 'react-native-masked-text'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import * as salesAction from '../actions/transaction'

// Styles
import styles from './Styles/DetailOrderStyle'
import { Images, Fonts, Colors } from '../Themes'

class DetailOrder extends React.Component {

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
      loading: true,
      idOrder: this.props.idOrder,
      statusAcceptOrder: false,
      statusRejectOrder: false,
      typeInvoice: '',
      loadingProcess: false
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataDetailOrder.status === 200) {
      this.setState({
        detailOrder: nextProps.dataDetailOrder.orderDetail,
        buyer: nextProps.dataDetailOrder.orderDetail.buyer,
        invoice: nextProps.dataDetailOrder.orderDetail.invoice,
        typeInvoice: nextProps.dataDetailOrder.orderDetail.invoice.type,
        items: nextProps.dataDetailOrder.orderDetail.items,
        seller: nextProps.dataDetailOrder.orderDetail.seller,
        reseller: nextProps.dataDetailOrder.orderDetail.reseller,
        invoiceNumber: nextProps.dataDetailOrder.orderDetail.invoice.invoice_number,
        dateTransaction: nextProps.dataDetailOrder.orderDetail.invoice.created_at,
        expeditionName: nextProps.dataDetailOrder.orderDetail.invoice.expedition.expedition.name,
        expeditionServices: nextProps.dataDetailOrder.orderDetail.invoice.expedition.name,
        isInsurance: nextProps.dataDetailOrder.orderDetail.invoice.is_insurance,
        addressBuyer: nextProps.dataDetailOrder.orderDetail.buyer.address,
        addressSeller: nextProps.dataDetailOrder.orderDetail.seller.address,
        loading: false
      })
    } if (nextProps.dataOrders.status === 200 && this.state.statusAcceptOrder) {
      this.setState({
        modalOrderReceived: true,
        modalLoading: false
      })
      nextProps.dataOrders.status = 0
    } if (nextProps.dataOrders.status === 200 && this.state.statusRejectOrder) {
      this.setState({
        modalConfrimOrderReject: true,
        modalLoading: false
      })
      nextProps.dataOrders.status = 0
    }
  }

  componentDidMount () {
    this.props.getDetailOrder(this.props.idOrder)
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

  renderInfoBuyer (data) {
    const {buyer, reseller, invoice} = this.state
    if (data === 'reseller' || data === 'buyer') {
      return (
        <View>
          <Text style={styles.bigTitle}>Info Pembeli</Text>
          <View style={[styles.continerOrder, {borderBottomWidth: 0}]}>
            <View style={styles.maskedImage}>
              <Image source={{uri: buyer.photo}} style={styles.image} />
            </View>
            <Text style={[styles.labelStyle, {marginLeft: 14}]}>{buyer.name}</Text>
            <TouchableOpacity style={styles.buttonFav} onPress={() => this.handleSendMessage('Kirim Pesan ke Pembeli', invoice.id, buyer, 'Pembeli', 'sendMessageBuyer')}>
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
              <Image source={{uri: reseller.store.photo}} style={styles.image} />
            </View>
            <Text style={[styles.labelStyle, {marginLeft: 14}]}>{reseller.store.name}</Text>
            <TouchableOpacity style={styles.buttonFav} onPress={() => this.handleSendMessage('Kirim Pesan ke Reseller', invoice.id, reseller.store, 'Reseller', 'sendMessageReseller')}>
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

  renderShippingInformation (data) {
    const {addressSeller, seller, reseller, invoice} = this.state
    if (data === 'seller') {
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
          {this.renderExpedition(invoice)}
        </View>
      )
    } if (data === 'reseller') {
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
          {this.renderExpedition(invoice)}
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
          {this.renderExpedition(invoice)}
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

  modalOrderReceived () {
    return (
      <Modal
        animationType={'fade'}
        transparent
        visible={this.state.modalOrderReceived}
        onRequestClose={() => this.setState({ modalOrderReceived: false })}
        >
        <View style={styles.bgModal}>
          <View style={styles.contaierModal}>
            <Image source={Images.confrimOrder} style={{height: 130, width: 195}} />
            <Text style={styles.titleModal}>Order Diterima</Text>
            <Text style={styles.titleModal2}>
              Order telah dipindahkan ke bagian{'\n'}
              konfirmasi pengiriman. Silahkan{'\n'}
              memproses order dan jika sudah dikirim{'\n'}
              Anda tinggal memasukkan nomor resinya</Text>
            <TouchableOpacity style={styles.verifikasiButton} onPress={() => this.handleCheckListDeliveryConfrim()}>
              <Text style={styles.textVerifikasiButton}>Lihat Daftar Pengiriman</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.batalButton} onPress={() => this.handleBackToListOrder()}>
              <Text style={styles.textBatalButton}>Kembali ke Daftar Pesanan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }

  popupOrderReject () {
    return (
      <Modal
        animationType={'fade'}
        transparent
        visible={this.state.popupOrderReject}
        onRequestClose={() => this.setState({ popupOrderReject: false })}
        >
        <View style={styles.bgModal}>
          <View style={[styles.contaierModal, {marginBottom: 130, marginTop: 130}]}>
            <Image source={Images.rejectOrder} style={{height: 130, width: 195}} />
            <Text style={styles.titleModal}>Anda akan menolak order</Text>
            <Text style={styles.titleModal2}>
              Anda yakin akan menolak order ini?</Text>
            <View style={[styles.buttonContainer, {marginTop: 10}]}>
              <TouchableOpacity style={styles.buttonReset} onPress={() => this.handleRejectOrder()}>
                <Text style={styles.labelButtonReset}>
                    Tolak
                </Text>
              </TouchableOpacity>
              <View style={{width: 18}} />
              <TouchableOpacity style={styles.buttonOke} onPress={() => this.setState({popupOrderReject: false})}>
                <Text style={styles.labelButtonOke}>
                  Batal
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    )
  }

  modalConfrimOrderReject () {
    return (
      <Modal
        animationType={'fade'}
        transparent
        visible={this.state.modalConfrimOrderReject}
        onRequestClose={() => this.setState({ modalConfrimOrderReject: false })}
        >
        <View style={styles.bgModal}>
          <View style={[styles.contaierModal, {marginBottom: 149, marginTop: 149, paddingTop: 132}]}>
            <Text style={styles.titleModal}>Order telah ditolak</Text>
            <Text style={styles.titleModal2}>
              Anda telah menolak order dan order{'\n'}
              sudah dihilangkan dari daftar pesanan</Text>
            <TouchableOpacity style={styles.verifikasiButton} onPress={() => this.handleBackToListOrder()}>
              <Text style={styles.textVerifikasiButton}>Lihat Daftar Pesanan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
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

  handleBackToListOrder () {
    this.setState({
      modalOrderReceived: false,
      statusRejectOrder: true
    })
    NavigationActions.listneworder({
      type: ActionConst.POP_AND_REPLACE })
  }

  handleCheckListDeliveryConfrim () {
    this.setState({modalOrderReceived: false})
    NavigationActions.deliveryConfirmation({
      type: ActionConst.PUSH })
  }

  handleAcceptOrder () {
    this.setState({statusAcceptOrder: true, modalLoading: true})
    this.props.acceptOrders(this.state.idOrder)
  }

  handleRejectOrder () {
    this.setState({popupOrderReject: false, modalLoading: true, statusRejectOrder: true})
    this.props.rejectOrders(this.state.idOrder)
  }

  finalAction (data) {
    const {seller, invoice} = this.state
    if (data === 'reseller') {
      return (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonReset} onPress={() => this.handleSendMessage('Kirim Pesan ke Seller', invoice.id, seller, 'Seller', 'sendMessageSeller')}>
            <Text style={styles.labelButtonReset}>
                Kirim Pesan ke Seller
            </Text>
          </TouchableOpacity>
        </View>
      )
    }
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonReset} onPress={() => this.setState({popupOrderReject: true})}>
          <Text style={styles.labelButtonReset}>
              Tolak
          </Text>
        </TouchableOpacity>
        <View style={{width: 20}} />
        <TouchableOpacity style={styles.buttonOke} onPress={() => this.handleAcceptOrder()}>
          <Text style={styles.labelButtonOke}>
            Terima
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  render () {
    const {buyer, addressBuyer, typeInvoice, items, invoiceNumber, invoice} = this.state
    var timeStampToDate = this.maskedDate(this.state.dateTransaction)
    if (this.state.loading) {
      return (
        <View style={styles.spinner}>
          <ActivityIndicator color={Colors.red} size='large' />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.continerOrder}>
            <Text style={styles.labelStyle}>No Invoice</Text>
            <Text style={styles.valueStyle}>{invoiceNumber}</Text>
          </View>
          <View style={[styles.continerOrder, {borderBottomWidth: 0}]}>
            <Text style={styles.labelStyle}>Tanggal Transaksi</Text>
            <Text style={styles.valueStyle}>{timeStampToDate}</Text>
          </View>
          {this.renderInfoBuyer(typeInvoice)}
          <Text style={styles.bigTitle}>Daftar Barang yang dibeli</Text>
          <ListView
            dataSource={this.dataSource.cloneWithRows(items)}
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
            {this.renderShippingInformation(typeInvoice)}
          </View>
          <Text style={styles.bigTitle}>Detail Harga</Text>
          {this.renderPriceDetail(invoice)}
          {this.finalAction(typeInvoice)}
        </ScrollView>
        {this.modalOrderReceived()}
        {this.popupOrderReject()}
        {this.modalConfrimOrderReject()}
        {this.modalLoading()}
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  dataDetailOrder: state.newOrderDetail,
  dataOrders: state.updateStatus
})

const mapDispatchToProps = (dispatch) => ({
  acceptOrders: (id) => dispatch(salesAction.acceptOrder({id: id})),
  rejectOrders: (id) => dispatch(salesAction.rejectOrder({id: id})),
  getListOrder: (page) => dispatch(salesAction.getNewOrders({page: page})),
  getListProcessingOrder: () => dispatch(salesAction.getProcessingOrders()),
  getDetailOrder: (id) => dispatch(salesAction.getNewOrderDetail({id: id}))
})

export default connect(mapStateToProps, mapDispatchToProps)(DetailOrder)
