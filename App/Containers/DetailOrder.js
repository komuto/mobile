import React from 'react'
import { View, Text, TouchableOpacity, Modal, BackAndroid, Image, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import moment from 'moment'
import { MaskService } from 'react-native-masked-text'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/DetailOrderStyle'
import { Images, Fonts, Colors } from '../Themes'

class DetailOrder extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      invoiceNumbre: 'Invoice-83273847492/04/2017',
      dateTransaction: 1505088000,
      storePhoto: Images.contohproduct,
      storeName: 'Dropshop Quality',
      priceProduct: 1250000,
      modalOrderReceived: false,
      modalOrderReject: false,
      modalConfrimOrderReject: false,
      isDropship: this.props.isDropship || false,
      isWholeSale: this.props.isWholeSale || false
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

  renderInfoBuyer () {
    console.log('reseller', this.state.isWholeSale)
    if (this.state.isWholeSale) {
      return (
        <View>
          <Text style={styles.bigTitle}>Info Reseller</Text>
          <View style={[styles.continerOrder, {borderBottomWidth: 0}]}>
            <View style={styles.maskedImage}>
              <Image source={Images.contohproduct} style={styles.image} />
            </View>
            <Text style={[styles.labelStyle, {marginLeft: 14}]}>{this.state.storeName}</Text>
            <TouchableOpacity style={styles.buttonFav} onPress={() => this.sendMessageToSaller('Kirim Pesan ke Reseller')}>
              <Text style={styles.labelButtonFav}>Kirim Pesan</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    } else {
      return (
        <View>
          <Text style={styles.bigTitle}>Info Pembeli</Text>
          <View style={[styles.continerOrder, {borderBottomWidth: 0}]}>
            <View style={styles.maskedImage}>
              <Image source={Images.contohproduct} style={styles.image} />
            </View>
            <Text style={[styles.labelStyle, {marginLeft: 14}]}>{this.state.storeName}</Text>
            <TouchableOpacity style={styles.buttonFav} onPress={() => this.sendMessageToSaller('Kirim Pesan ke Pembeli')}>
              <Text style={styles.labelButtonFav}>Kirim Pesan</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
  }

  renderListProductBuyer () {
    var moneyMasked = this.maskedMoney(250000)
    return (
      <View>
        <View style={[styles.continerOrder, {alignItems: 'flex-start'}]}>
          <View style={styles.maskedImageProduct}>
            <Image source={Images.contohproduct} style={styles.imageProduct} />
          </View>
          <View style={styles.product}>
            <Text style={styles.labelProduct}>Sepatu Jogging Nike Hitam </Text>
            <Text style={styles.labelProduct2}>Harga: {moneyMasked} / item </Text>
            <Text style={styles.labelProduct2}>Jumlah: 3 </Text>
            <Text style={styles.labelMessage}>"Minta yang ukuran 42"</Text>
          </View>
        </View>
        <View style={[styles.continerOrder, {alignItems: 'flex-start'}]}>
          <View style={styles.maskedImageProduct}>
            <Image source={Images.contohproduct} style={styles.imageProduct} />
          </View>
          <View style={styles.product}>
            <Text style={styles.labelProduct}>Sepatu Jogging Nike Hitam </Text>
            <Text style={styles.labelProduct2}>Harga: {moneyMasked} / item </Text>
            <Text style={styles.labelProduct2}>Jumlah: 3 </Text>
            <Text style={styles.labelMessage}>"Minta yang ukuran 42"</Text>
          </View>
        </View>
        <View style={[styles.continerOrder, {alignItems: 'flex-start'}]}>
          <View style={styles.maskedImageProduct}>
            <Image source={Images.contohproduct} style={styles.imageProduct} />
          </View>
          <View style={styles.product}>
            <Text style={styles.labelProduct}>Sepatu Jogging Nike Hitam </Text>
            <Text style={styles.labelProduct2}>Harga: {moneyMasked} / item </Text>
            <Text style={styles.labelProduct2}>Jumlah: 3 </Text>
            <Text style={styles.labelMessage}>"Minta yang ukuran 42"</Text>
          </View>
        </View>
      </View>
    )
  }

  renderShippingInformation () {
    if (this.state.isWholeSale) {
      return (
        <View style={{backgroundColor: Colors.snow}}>
          <View style={[styles.continerOrder, {alignItems: 'flex-start'}]}>
            <View style={styles.continerAddress}>
              <Text style={styles.labelProduct2}>Alamat Pengiriman</Text>
              <Text style={[styles.labelMessage, {lineHeight: 22, paddingRight: 58, fontFamily: Fonts.type.regular}]}>
              Dwinawan Hariwijaya
              Kemanggisan Jakarta Barat,
              DKI Jakarta, 55673
              Telp: 0821 - 1310 - 1585</Text>
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
              <Text style={styles.labelProduct2}>Alamat Alamat Penjual</Text>
              <Text style={[styles.labelMessage, {lineHeight: 22, paddingRight: 58, fontFamily: Fonts.type.regular}]}>
              Samantha William (Dropshop Quality)
              Jalan Wates km 11.
              Bantul. Yogyakarta, 55752</Text>
            </View>
            <TouchableOpacity style={styles.buttonFav} onPress={() => this.handleSendMessageStore()}>
              <Text style={styles.labelButtonFav}>Cetak Alamat</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.continerOrder}>
            <Text style={styles.labelStyle}>Kurir Pengiriman</Text>
            <Text style={[styles.labelMessage, {fontFamily: Fonts.type.regular}]}>JNE</Text>
          </View>
          <View style={styles.continerOrder}>
            <Text style={styles.labelStyle}>Paket Pengiriman</Text>
            <Text style={[styles.labelMessage, {fontFamily: Fonts.type.regular}]}>Reguler</Text>
          </View>
          <View style={[styles.continerOrder, {borderBottomWidth: 0}]}>
            <Text style={styles.labelStyle}>Asuransi</Text>
            <Text style={[styles.labelMessage, {fontFamily: Fonts.type.regular}]}>Ya</Text>
          </View>
        </View>
      )
    } else {
      return (
        <View>
          <View style={[styles.continerOrder, {alignItems: 'flex-start'}]}>
            <View style={styles.continerAddress}>
              <Text style={styles.labelProduct2}>Alamat Pengiriman</Text>
              <Text style={[styles.labelMessage, {lineHeight: 22, paddingRight: 58, fontFamily: Fonts.type.regular}]}>
              Dwinawan Hariwijaya
              Kemanggisan Jakarta Barat,
              DKI Jakarta, 55673
              Telp: 0821 - 1310 - 1585</Text>
            </View>
            <TouchableOpacity style={styles.buttonFav} onPress={() => this.handleSendMessageStore()}>
              <Text style={styles.labelButtonFav}>Cetak Alamat</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.continerOrder, {alignItems: 'flex-start'}]}>
            <View style={styles.continerAddress}>
              <Text style={styles.labelProduct2}>Alamat Alamat Penjual</Text>
              <Text style={[styles.labelMessage, {lineHeight: 22, paddingRight: 58, fontFamily: Fonts.type.regular}]}>
              Samantha William
              Jalan Wates km 11.
              Bantul. Yogyakarta, 55752</Text>
            </View>
            <TouchableOpacity style={styles.buttonFav} onPress={() => this.handleSendMessageStore()}>
              <Text style={styles.labelButtonFav}>Cetak Alamat</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.continerOrder}>
            <Text style={styles.labelStyle}>Kurir Pengiriman</Text>
            <Text style={[styles.labelMessage, {fontFamily: Fonts.type.regular}]}>JNE</Text>
          </View>
          <View style={styles.continerOrder}>
            <Text style={styles.labelStyle}>Paket Pengiriman</Text>
            <Text style={[styles.labelMessage, {fontFamily: Fonts.type.regular}]}>Reguler</Text>
          </View>
          <View style={[styles.continerOrder, {borderBottomWidth: 0}]}>
            <Text style={styles.labelStyle}>Asuransi</Text>
            <Text style={[styles.labelMessage, {fontFamily: Fonts.type.regular}]}>Ya</Text>
          </View>
        </View>
      )
    }
  }

  renderPriceDetail () {
    var subTotal = this.maskedMoney(250000)
    var insuranceFee = this.maskedMoney(25000)
    var postalFee = this.maskedMoney(2500)

    var total = 250000 + 25000 + 2500
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
          <View style={styles.bgModal2}>
            <View style={styles.contaierModal}>
              <Image source={Images.confrimOrder} style={{height: 130, width: 195}} />
              <Text style={styles.titleModal}>Order Diterima</Text>
              <Text style={styles.titleModal2}>
                Order telah dipindahkan ke bagian{'\n'}
                konfirmasi pengiriman. Silahkan{'\n'}
                memproses order dan jika sudah dikirim{'\n'}
                Anda tinggal memasukkan nomor resinya</Text>
              <TouchableOpacity style={styles.verifikasiButton} onPress={() => this.handleAcceptOrder()}>
                <Text style={styles.textVerifikasiButton}>Lihat Daftar Pengiriman</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.batalButton} onPress={() => this.setState({modalOrderReceived: false})}>
                <Text style={styles.textBatalButton}>Kembali ke Daftar Pesanan</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    )
  }

  modalOrderReject () {
    return (
      <Modal
        animationType={'fade'}
        transparent
        visible={this.state.modalOrderReject}
        onRequestClose={() => this.setState({ modalOrderReject: false })}
        >
        <View style={styles.bgModal}>
          <View style={styles.bgModal2}>
            <View style={[styles.contaierModal, {marginBottom: 149, marginTop: 149}]}>
              <Image source={Images.rejectOrder} style={{height: 130, width: 195}} />
              <Text style={styles.titleModal}>Anda akan menolak order</Text>
              <Text style={styles.titleModal2}>
                Anda yakin akan menolak order ini?</Text>
              <View style={[styles.buttonContainer, {marginTop: 10}]}>
                <TouchableOpacity style={styles.buttonReset} onPress={() => this.setState({modalOrderReject: false, modalConfrimOrderReject: true})}>
                  <Text style={styles.labelButtonReset}>
                      Tolak
                  </Text>
                </TouchableOpacity>
                <View style={{width: 18}} />
                <TouchableOpacity style={styles.buttonOke} onPress={() => this.setState({modalOrderReject: false})}>
                  <Text style={styles.labelButtonOke}>
                    Batal
                  </Text>
                </TouchableOpacity>
              </View>
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
          <View style={styles.bgModal2}>
            <View style={[styles.contaierModal, {marginBottom: 149, marginTop: 149, paddingTop: 132}]}>
              <Text style={styles.titleModal}>Order telah ditolak</Text>
              <Text style={styles.titleModal2}>
                Anda telah menolak order dan order{'\n'}
                sudah dihilangkan dari daftar pesanan</Text>
              <TouchableOpacity style={styles.verifikasiButton} onPress={() => this.setState({modalConfrimOrderReject: false})}>
                <Text style={styles.textVerifikasiButton}>Lihat Daftar Pengiriman</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    )
  }

  sendMessageToSaller (titles) {
    NavigationActions.sendmessagestore({
      type: ActionConst.PUSH,
      title: titles,
      id: 28,
      foto: null,
      namaToko: 'Dummy toko',
      alamat: 'Dummy Alamat'
    })
  }

  handleRejectOrder () {
  }

  handleAcceptOrder () {
    this.setState({modalOrderReceived: false})
    NavigationActions.deliveryConfirmation({
      type: ActionConst.PUSH
    })
  }

  finalAction () {
    if (this.state.isDropship) {
      return (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonReset} onPress={() => this.sendMessageToSaller('Kirim Pesan ke Seller')}>
            <Text style={styles.labelButtonReset}>
                Kirim Pesan ke Seller
            </Text>
          </TouchableOpacity>
        </View>
      )
    } if (this.state.isWholeSale) {
      return (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonReset} onPress={() => this.setState({modalOrderReject: true})}>
            <Text style={styles.labelButtonReset}>
                Tolak
            </Text>
          </TouchableOpacity>
          <View style={{width: 20}} />
          <TouchableOpacity style={styles.buttonOke} onPress={() => this.setState({modalOrderReceived: true})}>
            <Text style={styles.labelButtonOke}>
              Terima
            </Text>
          </TouchableOpacity>
        </View>
      )
    } if (!this.state.isWholeSale && !this.state.isDropship) {
      return (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonReset} onPress={() => this.setState({modalOrderReject: true})}>
            <Text style={styles.labelButtonReset}>
                Tolak
            </Text>
          </TouchableOpacity>
          <View style={{width: 20}} />
          <TouchableOpacity style={styles.buttonOke} onPress={() => this.setState({modalOrderReceived: true})}>
            <Text style={styles.labelButtonOke}>
              Terima
            </Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  render () {
    var timeStampToDate = this.maskedDate(1505088000)
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.continerOrder}>
            <Text style={styles.labelStyle}>No Invoice</Text>
            <Text style={styles.valueStyle}>{this.state.invoiceNumbre}</Text>
          </View>
          <View style={[styles.continerOrder, {borderBottomWidth: 0}]}>
            <Text style={styles.labelStyle}>Tanggal Transaksi</Text>
            <Text style={styles.valueStyle}>{timeStampToDate}</Text>
          </View>
          {this.renderInfoBuyer()}
          <Text style={styles.bigTitle}>Daftar Barang yang dibeli</Text>
          {this.renderListProductBuyer()}
          <Text style={styles.bigTitle}>Informasi Pengiriman</Text>
          {this.renderShippingInformation()}
          <Text style={styles.bigTitle}>Detail Harga</Text>
          {this.renderPriceDetail()}
          {this.finalAction()}
        </ScrollView>
        {this.modalOrderReceived()}
        {this.modalOrderReject()}
        {this.modalConfrimOrderReject()}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailOrder)
