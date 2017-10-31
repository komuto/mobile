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
  ToastAndroid,
  Modal
} from 'react-native'
import { connect } from 'react-redux'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import moment from 'moment'
import { MaskService } from 'react-native-masked-text'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import * as salesAction from '../actions/transaction'

// Styles
import styles from './Styles/InputShippingInfoStyle'
import { Colors, Images, Fonts } from '../Themes/'

class InputShippingInfo extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      loading: true,
      tabViewStyle: {
        backgroundColor: 'transparent'
      },
      notif: this.props.notif,
      messageNotif: this.props.messageNotif,
      page: this.props.page,
      modalNumberReceive: false,
      idInvoice: this.props.idInvoice,
      receipeNumber: '',
      invoiceNumber: '',
      dateTransaction: 0,
      storePhoto: null,
      storeName: '',
      priceProduct: 0,
      modalOrderReceived: false,
      modalOrderReject: false,
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
      statusConfrim: false,
      photo: [{'name': Images.contohproduct}, {'name': Images.contohproduct}, {'name': Images.contohproduct}, {'name': Images.contohproduct}, {'name': Images.contohproduct}, {'name': Images.contohproduct}, {'name': Images.contohproduct}, {'name': Images.contohproduct}, {'name': Images.contohproduct}, {'name': Images.contohproduct}]
    }
    moment.locale('id')
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataDetail.status === 200) {
      this.setState({
        detailOrder: nextProps.dataDetail.orderDetail,
        buyer: nextProps.dataDetail.orderDetail.buyer,
        invoice: nextProps.dataDetail.orderDetail.invoice,
        items: nextProps.dataDetail.orderDetail.items,
        seller: nextProps.dataDetail.orderDetail.seller,
        reseller: nextProps.dataDetail.orderDetail.reseller,
        invoiceNumber: nextProps.dataDetail.orderDetail.invoice.invoice_number,
        dateTransaction: nextProps.dataDetail.orderDetail.invoice.created_at,
        expeditionName: nextProps.dataDetail.orderDetail.invoice.expedition.expedition.name,
        expeditionServices: nextProps.dataDetail.orderDetail.invoice.expedition.name,
        isInsurance: nextProps.dataDetail.orderDetail.invoice.is_insurance,
        addressBuyer: nextProps.dataDetail.orderDetail.buyer.address,
        addressSeller: nextProps.dataDetail.orderDetail.seller.address,
        loading: false,
        typeInvoice: nextProps.dataDetail.orderDetail.invoice.type
      })
    } else if (nextProps.dataDetail.status !== 0 && nextProps.dataDetail.status !== 200) {
      this.setState({loading: false})
      ToastAndroid.show(nextProps.dataDetail.message, ToastAndroid.LONG)
    }
    if (nextProps.dataProcessDeliveryOrder.status === 200 && this.state.statusConfrim) {
      this.setState({modalNumberReceive: true, modalLoading: false, statusConfrim: false})
      nextProps.dataProcessDeliveryOrder.status = 0
    } else if (nextProps.dataProcessDeliveryOrder.status !== 0 && nextProps.dataProcessDeliveryOrder.status !== 200) {
      this.setState({loading: false})
      ToastAndroid.show(nextProps.dataProcessDeliveryOrder.message, ToastAndroid.LONG)
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

  handleChangeReceipeNumber = (text) => {
    this.setState({ receipeNumber: text })
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
    if (!this.state.detailOrder.reseller) {
      return (
        <View>
          <Text style={styles.bigTitle}>Info Pembeli</Text>
          <View style={[styles.continerOrder, {borderBottomWidth: 0}]}>
            <View style={styles.maskedImageProfile}>
              <Image source={{uri: this.state.buyer.photo}} style={styles.imageProfile} />
            </View>
            <Text style={[styles.labelStyle, {marginLeft: 14}]}>{this.state.buyer.name}</Text>
            <TouchableOpacity style={styles.buttonFav} onPress={() => this.sendMessageToSaller('Kirim Pesan ke Pembeli', this.state.invoice.id, this.state.buyer, 'Pembeli', 'sendMessageBuyer')}>
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
            <View style={styles.maskedImageProfile}>
              <Image source={{uri: this.state.reseller.store.photo}} style={styles.imageProfile} />
            </View>
            <Text style={[styles.labelStyle, {marginLeft: 14}]}>{this.state.reseller.store.name}</Text>
            <TouchableOpacity style={styles.buttonFav} onPress={() => this.sendMessageToSaller('Kirim Pesan ke Reseller', this.state.invoice.id, this.state.reseller.store, 'Reseller', 'sendMessageReseller')}>
              <Text style={styles.labelButtonFav}>Kirim Pesan</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
  }

  renderRowProduct (rowData, x, y) {
    var moneyMasked = this.maskedMoney(rowData.product.price)
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
    const {buyer, addressBuyer, addressSeller, seller, reseller} = this.state
    if (this.state.detailOrder.reseller) {
      return (
        <View style={{backgroundColor: Colors.snow}}>
          <View style={[styles.continerOrder, {alignItems: 'flex-start'}]}>
            <View style={styles.continerAddress}>
              <Text style={styles.labelProduct2}>Alamat Pengiriman</Text>
              <Text style={[styles.labelMessage, {lineHeight: 22, paddingRight: 58, fontFamily: Fonts.type.regular}]}>
                {buyer.name}{'\n'}{addressBuyer.address}, {addressBuyer.village.name}, {addressBuyer.subdistrict.name}, {addressBuyer.district.name}, {addressBuyer.province.name}, {addressBuyer.postal_code}
              </Text>
            </View>
            <TouchableOpacity style={styles.buttonFav} onPress={() => this.handleSendMessageStore()}>
              <Text style={styles.labelButtonFav}>Cetak Alamat</Text>
            </TouchableOpacity>
          </View>
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
            <TouchableOpacity style={styles.buttonFav} onPress={() => this.handleSendMessageStore()}>
              <Text style={styles.labelButtonFav}>Cetak Alamat</Text>
            </TouchableOpacity>
          </View>
          {this.renderExpedition()}
        </View>
      )
    } else {
      return (
        <View>
          <View style={[styles.continerOrder, {alignItems: 'flex-start'}]}>
            <View style={styles.continerAddress}>
              <Text style={styles.labelProduct2}>Alamat Pengiriman</Text>
              <Text style={[styles.labelMessage, {lineHeight: 22, paddingRight: 58, fontFamily: Fonts.type.regular}]}>
                {buyer.name}{'\n'}{addressBuyer.address}, {addressBuyer.village.name}, {addressBuyer.subdistrict.name}, {addressBuyer.district.name}, {addressBuyer.province.name}, {addressBuyer.postal_code}
              </Text>
            </View>
            <TouchableOpacity style={styles.buttonFav} onPress={() => this.handleSendMessageStore()}>
              <Text style={styles.labelButtonFav}>Cetak Alamat</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.continerOrder, {alignItems: 'flex-start'}]}>
            <View style={styles.continerAddress}>
              <Text style={styles.labelProduct2}>Info Alamat Penjual</Text>
              <Text style={[styles.labelMessage, {lineHeight: 22, paddingRight: 58, fontFamily: Fonts.type.regular}]}>
                {seller.name}{'\n'}{addressSeller.address}, {addressSeller.village.name}, {addressSeller.subdistrict.name}, {addressSeller.district.name}, {addressSeller.province.name}, {addressSeller.postal_code}
              </Text>
            </View>
            <TouchableOpacity style={styles.buttonFav} onPress={() => this.handleSendMessageStore()}>
              <Text style={styles.labelButtonFav}>Cetak Alamat</Text>
            </TouchableOpacity>
          </View>
          {this.renderExpedition()}
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
    var subTotal = this.maskedMoney(data.total_bill - data.insurance_fee - data.delivery_cost)
    var insuranceFee = this.maskedMoney(data.insurance_fee)
    var postalFee = this.maskedMoney(data.delivery_cost)

    var total = data.total_bill
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
          <Text style={styles.labelStyle}>Ongkos Kirim</Text>
          <Text style={styles.valueStyle}>{postalFee}</Text>
        </View>
        <View style={[styles.continerOrderNoBorder, {padding: 15}]}>
          <Text style={styles.labelStyle}>Total</Text>
          <Text style={styles.valueStyle}>{totalMasked}</Text>
        </View>
      </View>
    )
  }

  finalAction () {
    if (this.state.typeInvoice === 'seller') {
      return (
        <View style={[styles.buttonContainer, {backgroundColor: Colors.snow, marginTop: 20}]}>
          <TouchableOpacity style={styles.buttonReset} onPress={() => this.sendMessageToSaller('Kirim Pesan ke Seller', this.state.invoice.id, this.state.seller, 'Seller', 'sendMessageSeller')}>
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

  modalNumberReceive () {
    return (
      <Modal
        animationType={'fade'}
        transparent
        visible={this.state.modalNumberReceive}
        onRequestClose={() => this.setState({ modalNumberReceive: false })}
        >
        <View style={styles.bgModal}>
          <View style={styles.bgModal2}>
            <View style={styles.contaierModal}>
              <Image source={Images.receiptSend} style={{height: 130, width: 195}} />
              <Text style={styles.titleModal}>Nomor Resi telah diinfokan</Text>
              <Text style={styles.titleModal2}>
                Nomor Resi telah diinfokan ke buyer.{'\n'}
                Order ini dipindahkan ke daftar penjualan.{'\n'}
                Silahkan cek untuk melihat status{'\n'}
                transaksi Anda</Text>
              <TouchableOpacity style={styles.verifikasiButton} onPress={() => this.handleListSales()}>
                <Text style={styles.textVerifikasiButton}>Lihat Daftar Penjualan</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.batalButton} onPress={() => this.handleListDelivery()}>
                <Text style={styles.textBatalButton}>Kembali ke  Konfirmasi Pengiriman</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    )
  }

  handleListSales () {
    this.setState({
      modalNumberReceive: false
    })
    NavigationActions.saleslist({
      type: ActionConst.PUSH })
  }

  handleListDelivery () {
    this.setState({
      modalNumberReceive: false
    })
    NavigationActions.deliveryConfirmation({
      type: ActionConst.POP_AND_REPLACE })
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

  renderDetail () {
    var timeStampToDate = this.maskedDate(this.state.dateTransaction)
    return (
      <ScrollView>
        <View style={styles.continerOrder}>
          <Text style={styles.labelStyle}>No Invoice</Text>
          <Text style={styles.valueStyle}>{this.state.invoiceNumber}</Text>
        </View>
        <View style={[styles.continerOrder, {borderBottomWidth: 0}]}>
          <Text style={styles.labelStyle}>Tanggal Transaksi</Text>
          <Text style={styles.valueStyle}>{timeStampToDate}</Text>
        </View>
        {this.renderInfoBuyer()}
        <Text style={styles.bigTitle}>Daftar Barang yang dibeli</Text>
        <ListView
          dataSource={this.dataSource.cloneWithRows(this.state.items)}
          renderRow={this.renderRowProduct.bind(this)}
          enableEmptySections
        />
        <Text style={styles.bigTitle}>Informasi Pengiriman</Text>
        {this.renderShippingInformation()}
        <Text style={styles.bigTitle}>Detail Harga</Text>
        {this.renderPriceDetail(this.state.invoice)}
        {this.finalAction()}
      </ScrollView>
    )
  }

  checkInsurances (data) {
    if (data) {
      this.status = 'Ya'
    } else {
      this.status = 'Tidak'
    }
    return (
      <Text style={[styles.textRegularSlate]}>{this.status}</Text>
    )
  }

  renderExpeditions () {
    const {expeditionName, expeditionServices, isInsurance} = this.state
    return (
      <View style={styles.viewColumn}>
        <View style={styles.border}>
          <Text style={[styles.textBold]}>Info Pengiriman</Text>
        </View>
        <View style={styles.borderRow}>
          <Text style={[styles.textSemiBoldslate]}>Kurir Pengiriman</Text>
          <Text style={[styles.textRegularSlate]}>{expeditionName}</Text>
        </View>
        <View style={styles.borderRow}>
          <Text style={[styles.textSemiBoldslate]}>Paket Pengiriman</Text>
          <Text style={[styles.textRegularSlate]}>{expeditionServices}</Text>
        </View>
        <View style={[styles.borderRow, {borderBottomWidth: 0}]}>
          <Text style={[styles.textSemiBoldslate]}>Asuransi</Text>
          {this.checkInsurances(isInsurance)}
        </View>
      </View>
    )
  }

  renderInputReceiptNumber () {
    var tempTransactionDate = this.maskedDate(this.state.dateTransaction)
    var dayLeft = moment(tempTransactionDate, 'DD MMMM YYYY').add(3, 'days').format('DD MMMM YYYY').toString()
    return (
      <ScrollView>
        <View style={styles.information}>
          <Image source={Images.infoBlue} style={styles.iconInfoBlue} />
          <Text style={styles.textInfo}>Anda memiliki waktu 3 hari sampai tanggal {dayLeft} untuk menginformasikan nomor resi. Jika tidak kami akan membatalkan pesanan ini </Text>
        </View>
        <View style={styles.containerBuyer}>
          <Text style={[styles.textSemiBold, styles.flexOne]}>{this.state.buyer.name}</Text>
          <View style={styles.containerPhoto}>
            {this.renderPhoto(this.state.items)}
          </View>
        </View>
        {this.renderExpeditions()}
        {this.renderReceiptNumber()}
      </ScrollView>
    )
  }

  renderReceiptNumber () {
    if (this.state.typeInvoice === 'seller') {
      return (
        <View>
          <View style={[styles.viewColumn, {marginBottom: 0}]}>
            <View style={[styles.borderRow, {borderBottomWidth: 0}]}>
              <Text style={[styles.textSemiBoldslate]}>No Resi</Text>
              <Text style={[styles.textRegularSlate]}>Menunggu No Resi dari Seller</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonReset} onPress={() => this.sendMessageToSaller('Kirim Pesan ke Seller', this.state.invoice.id, this.state.seller, 'Seller', 'sendMessageSeller')}>
              <Text style={styles.labelButtonReset}>
                  Kirim Pesan ke Seller
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    } else {
      return (
        <View>
          <View style={[styles.viewColumn, {marginBottom: 0}]}>
            <View style={styles.border}>
              <Text style={[styles.textBold]}>Nomor Resi</Text>
            </View>
            <View style={[styles.inputContainer]}>
              <TextInput
                ref='noindentitas'
                maxLength={30}
                style={[styles.inputText]}
                value={this.state.receipeNumber}
                keyboardType='default'
                returnKeyType='done'
                autoCapitalize='none'
                autoCorrect
                onChangeText={this.handleChangeReceipeNumber}
                underlineColorAndroid='transparent'
                placeholder='Masukkan nomor resi disini'
              />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.buttonReset, {backgroundColor: Colors.bluesky}]} onPress={() => this.onclickProcessInfoDelivery()}>
              <Text style={[styles.labelButtonReset, {color: Colors.snow}]}>
                  Proses Info Pengiriman
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
  }

  onclickProcessInfoDelivery (data) {
    this.setState({statusConfrim: true, modalLoading: true})
    this.props.processDeliveryConfrim(this.state.invoice.id, this.state.receipeNumber)
  }

  sendMessageToSaller (titles, invoiceId, data, type, actionType) {
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
    if (this.state.loading) {
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
          <View tabLabel='Nomer Resi' ref='receiptNumber'>
            {this.renderInputReceiptNumber()}
          </View>
          <View tabLabel='Detail' ref='detail'>
            {this.renderDetail()}
            {this.modalNumberReceive()}
          </View>
        </ScrollableTabView>
        {this.modalLoading()}
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  dataDetail: state.processingOrderDetail,
  dataProcessDeliveryOrder: state.updateStatus
})

const mapDispatchToProps = (dispatch) => ({
  processDeliveryConfrim: (id, receipeNumber) => dispatch(salesAction.inputAirwayBill({id: id, airway_bill: receipeNumber}))
})

export default connect(mapStateToProps, mapDispatchToProps)(InputShippingInfo)
