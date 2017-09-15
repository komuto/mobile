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
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import moment from 'moment'
import { MaskService } from 'react-native-masked-text'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/InputShippingInfoStyle'
import { Colors, Images, Fonts } from '../Themes/'

class InputShippingInfo extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      loading: false,
      tabViewStyle: {
        backgroundColor: 'transparent'
      },
      notif: this.props.notif,
      messageNotif: this.props.messageNotif,
      page: this.props.page,
      invoiceNumber: 'Invoice-83273847492/04/2017',
      dateTransaction: 1505088000,
      storePhoto: Images.contohproduct,
      storeName: 'Dropshop Quality',
      priceProduct: 1250000,
      isDropship: this.props.isDropship || false,
      isWholeSale: this.props.isWholeSale || false,
      modalNumberReceive: false,
      receipeNumber: '',
      photo: [{'name': Images.contohproduct}, {'name': Images.contohproduct}, {'name': Images.contohproduct}, {'name': Images.contohproduct}, {'name': Images.contohproduct}, {'name': Images.contohproduct}, {'name': Images.contohproduct}, {'name': Images.contohproduct}, {'name': Images.contohproduct}, {'name': Images.contohproduct}]
    }
  }

  componentWillReceiveProps (nextProps) {
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

  renderPhoto (photo) {
    if (this.state.photo.length > 4) {
      const mapFoto = photo.slice(0, 4).map((data, i) => {
        if (i === 3) {
          return (
            <View key={i} style={styles.maskedSmallImageProduct}>
              <Image source={data.name} style={styles.imageSmallProduct} />
              <View style={styles.placeholder}>
                <Text style={{padding: 5, color: Colors.snow, fontFamily: Fonts.type.bold, fontSize: Fonts.size.medium}}>+{this.state.photo - 4}</Text>
              </View>
            </View>
          )
        } else {
          return (
            <View key={i} style={styles.maskedSmallImageProduct}>
              <Image source={data.name} style={styles.imageSmallProduct} />
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
      const mapFoto = photo.slice(0, 4).map((data, i) => {
        return (
          <View key={i} style={styles.maskedSmallImageProduct}>
            <Image source={data.name} style={styles.imageSmallProduct} />
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
    console.log('reseller', this.state.isWholeSale)
    if (this.state.isWholeSale) {
      return (
        <View>
          <Text style={styles.bigTitle}>Info Reseller</Text>
          <View style={[styles.continerOrder, {borderBottomWidth: 0}]}>
            <View style={styles.maskedImageProfile}>
              <Image source={Images.contohproduct} style={styles.imageProfile} />
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
            <View style={styles.maskedImageProfile}>
              <Image source={Images.contohproduct} style={styles.imageProfile} />
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
          <View style={styles.informationReseller}>
            <Text style={styles.textInfoReseller}>Barang ini terjual dari reseller. Sehingga nama
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

  finalAction () {
    if (this.state.isDropship) {
      return (
        <View style={[styles.buttonContainer, {backgroundColor: Colors.snow, marginTop: 20}]}>
          <TouchableOpacity style={styles.buttonReset} onPress={() => this.sendMessageToSaller('Kirim Pesan ke Seller')}>
            <Text style={styles.labelButtonReset}>
                Kirim Pesan ke Seller
            </Text>
          </TouchableOpacity>
        </View>
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
              <TouchableOpacity style={styles.verifikasiButton} onPress={() => this.setState({modalNumberReceive: false})}>
                <Text style={styles.textVerifikasiButton}>Lihat Daftar Penjualan</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.batalButton} onPress={() => this.setState({modalNumberReceive: false})}>
                <Text style={styles.textBatalButton}>Kembali ke  Konfirmasi Pengiriman</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    )
  }

  renderDetail () {
    var timeStampToDate = this.maskedDate(1505088000)
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
        {this.renderListProductBuyer()}
        <Text style={styles.bigTitle}>Informasi Pengiriman</Text>
        {this.renderShippingInformation()}
        <Text style={styles.bigTitle}>Detail Harga</Text>
        {this.renderPriceDetail()}
        {this.finalAction()}
      </ScrollView>
    )
  }

  renderInputReceiptNumber () {
    return (
      <ScrollView>
        <View style={styles.information}>
          <Image source={Images.infoBlue} style={styles.iconInfoBlue} />
          <Text style={styles.textInfo}>Anda memiliki waktu 3 hari sampai tanggal
          17 Oktober 2017 untuk menginformasikan
          nomor resi. Jika tidak kami akan membatalkan
          pesanan ini </Text>
        </View>
        <View style={styles.containerBuyer}>
          <Text style={[styles.textSemiBold, styles.flexOne]}>Jonathan Hope</Text>
          <View style={styles.containerPhoto}>
            {this.renderPhoto(this.state.photo)}
          </View>
        </View>
        <View style={styles.viewColumn}>
          <View style={styles.border}>
            <Text style={[styles.textBold]}>Info Pengiriman</Text>
          </View>
          <View style={styles.borderRow}>
            <Text style={[styles.textSemiBoldslate]}>Kurir Pengiriman</Text>
            <Text style={[styles.textRegularSlate]}>JNE</Text>
          </View>
          <View style={styles.borderRow}>
            <Text style={[styles.textSemiBoldslate]}>Paket Pengiriman</Text>
            <Text style={[styles.textRegularSlate]}>Reguler</Text>
          </View>
          <View style={[styles.borderRow, {borderBottomWidth: 0}]}>
            <Text style={[styles.textSemiBoldslate]}>Asuransi</Text>
            <Text style={[styles.textRegularSlate]}>Ya</Text>
          </View>
        </View>
        {this.renderReceiptNumber()}
      </ScrollView>
    )
  }

  renderReceiptNumber () {
    if (this.state.isDropship) {
      return (
        <View>
          <View style={[styles.viewColumn, {marginBottom: 0}]}>
            <View style={[styles.borderRow, {borderBottomWidth: 0}]}>
              <Text style={[styles.textSemiBoldslate]}>No Resi</Text>
              <Text style={[styles.textRegularSlate]}>Menunggu No Resi dari Seller</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonReset} onPress={() => this.sendMessageToSaller('Kirim Pesan ke Seller')}>
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
                keyboardType='numeric'
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
            <TouchableOpacity style={[styles.buttonReset, {backgroundColor: Colors.bluesky}]} onPress={() => this.setState({modalNumberReceive: true})}>
              <Text style={[styles.labelButtonReset, {color: Colors.snow}]}>
                  Proses Info Pengiriman
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
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

  render () {
    const spinner = this.state.loading
    ? (<View style={styles.spinner}>
      <ActivityIndicator color='#ef5656' size='large' />
    </View>) : (<View />)
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
            {spinner}
          </View>
          <View tabLabel='Detail' ref='detail'>
            {this.renderDetail()}
            {spinner}
            {this.modalNumberReceive()}
          </View>
        </ScrollableTabView>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(InputShippingInfo)
