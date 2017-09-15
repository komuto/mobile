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
import { Actions as NavigationActions } from 'react-native-router-flux'
import moment from 'moment'
import { MaskService } from 'react-native-masked-text'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/DetailSalesStyle'
import { Images, Fonts, Colors } from '../Themes'

class DetailSales extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      loading: false,
      tabViewStyle: {
        backgroundColor: 'transparent'
      },
      invoiceNumber: 'Invoice-83273847492/04/2017',
      status: this.props.status,
      storePhoto: Images.contohproduct,
      storeName: 'Dropshop Quality',
      priceProduct: 1250000,
      type: this.props.types,
      isWholeSale: this.props.isWholeSale,
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
      }]
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

  renderPhoto (photo) {
    if (this.state.photo.length > 4) {
      const mapFoto = photo.slice(0, 4).map((data, i) => {
        if (i === 3) {
          return (
            <View key={i} style={styles.maskedSmallImageProduct}>
              <Image source={data.name} style={styles.imageSmallProduct} />
              <View style={styles.placeholder}>
                <Text style={{padding: 5, color: Colors.snow, fontFamily: Fonts.type.bold, fontSize: Fonts.size.medium}}>+{this.state.photo.length - 4}</Text>
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

  checkStatus (data) {
    if (data === 1) {
      return (
        <View style={[styles.borderRow, {borderBottomWidth: 0, alignItems: 'center'}]}>
          <Text style={[styles.textSemiBoldslate]}>Status</Text>
          <View style={[styles.round, {backgroundColor: Colors.darkMint, marginTop: 5, marginRight: 10.8}]} />
          <Text style={[styles.textRegularSlate]}>Barang sudah diterima</Text>
        </View>
      )
    } if (data === 2) {
      return (
        <View style={[styles.borderRow, {borderBottomWidth: 0, alignItems: 'center'}]}>
          <Text style={[styles.textSemiBoldslate]}>Status</Text>
          <View style={[styles.round, {backgroundColor: Colors.bluesky, marginTop: 5, marginRight: 10.8}]} />
          <Text style={[styles.textRegularSlate]}>Menunggu Konfirmasi Pembeli</Text>
        </View>
      )
    } if (data === 3) {
      return (
        <View style={[styles.borderRow, {borderBottomWidth: 0, alignItems: 'center'}]}>
          <Text style={[styles.textSemiBoldslate]}>Status</Text>
          <View style={[styles.round, {backgroundColor: Colors.pumpkinOrange, marginTop: 5, marginRight: 10.8}]} />
          <Text style={[styles.textRegularSlate]}>Terdapat barang bermasalah</Text>
        </View>
      )
    }
  }

  checkReceiptStatus (data) {
    if (data === 1) {
      return (
        <View style={[styles.borderRow, {borderBottomWidth: 0, alignItems: 'center'}]}>
          <Text style={[styles.textSemiBoldslate]}>Status Resi</Text>
          <Text style={[styles.textRegularSlate]}>On Progress</Text>
        </View>
      )
    } if (data === 2) {
      return (
        <View style={[styles.borderRow, {borderBottomWidth: 0, alignItems: 'center'}]}>
          <Text style={[styles.textSemiBoldslate]}>Status Resi</Text>
          <Text style={[styles.textRegularSlate]}>Pending</Text>
        </View>
      )
    } if (data === 3) {
      return (
        <View style={[styles.borderRow, {borderBottomWidth: 0, alignItems: 'center'}]}>
          <Text style={[styles.textSemiBoldslate]}>Status Resi</Text>
          <Text style={[styles.textRegularSlate]}>Gagal</Text>
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
              <TouchableOpacity style={[styles.buttonnext, {margin: 20}]} onPress={() => this.setState({modalChangeReceiptNumber: false})}>
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

  checkReceiptNumber (data) {
    if (data === 2) {
      return (
        <Text onPress={() => this.setState({modalChangeReceiptNumber: true})} style={[styles.textSemiBoldslate, {marginLeft: 15, flex: 0, color: Colors.bluesky}]}>Ubah</Text>
      )
    }
    return (
      <View />
    )
  }

  renderDeliveryStatus () {
    return (
      <ScrollView>
        <View style={styles.containerBuyer}>
          <Text style={[styles.textSemiBold, styles.flexOne]}>Jonathan Hope</Text>
          <View style={styles.containerPhoto}>
            {this.renderPhoto(this.state.photo)}
          </View>
        </View>
        <View style={styles.viewColumn}>
          <View style={styles.borderRow}>
            <Text style={[styles.textSemiBoldslate]}>No Invoice</Text>
            <Text style={[styles.textRegularSlate]}>{this.state.invoiceNumber}</Text>
          </View>
          {this.checkStatus(this.state.status)}
        </View>
        <View style={styles.viewColumn}>
          <View style={styles.borderRow}>
            <Text style={[styles.textSemiBoldslate]}>Nomor Resi</Text>
            <Text style={[styles.textRegularSlate]}>{this.state.receiptNumber}</Text>
            {this.checkReceiptNumber(this.state.status)}
          </View>
          {this.checkReceiptStatus(this.state.statusReceipt)}
        </View>
        {this.renderReviewProduct(this.state.isWholeSale, this.state.status)}
        {this.renderItemproblem(this.state.status)}
      </ScrollView>
    )
  }

  renderReviewProduct (isWholeSale, status) {
    if (isWholeSale && status === 1) {
      return (
        <View>
          <Text style={styles.boldcharcoalGrey}>Review Produk</Text>
          <View style={styles.viewColumn}>
            <View style={[styles.borderRow, {borderBottomWidth: 0}]}>
              <Text style={[styles.textRegularSlate]}>Review menjadi milik Reseller</Text>
            </View>
          </View>
        </View>
      )
    } if (!isWholeSale && status === 1) {
      return (
        <View>
          <Text style={styles.boldcharcoalGrey}>Review Produk</Text>
          <View style={styles.viewColumn}>
            <View style={[styles.borderRow, {borderBottomWidth: 0}]}>
              <Text style={[styles.textRegularSlate]}>Review menjadi milik Reseller</Text>
            </View>
          </View>
        </View>
      )
    }
  }

  renderItemproblem (status) {
    if (status === 3) {
      return (
        <View>
          <Text style={styles.boldcharcoalGrey}>Barang bermasalah</Text>
          <View style={[styles.viewColumn, {marginBottom: 0}]}>
            {this.renderProductProblem(this.state.itemProblem)}
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

  renderProductProblem (data) {
    const mapFoto = data[0].product.map((data, i) => {
      return (
        <View style={[styles.borderRow, {alignItems: 'center'}]}>
          <Image source={data.images} style={{height: 30, width: 30, marginRight: 10}} />
          <Text style={[styles.labelMessage, {fontFamily: Fonts.type.semiBolds}]}>{data.productName}</Text>
        </View>
      )
    })
    return (
      <View>
        {mapFoto}
        <View style={[styles.viewColumn, {marginBottom: 0}]}>
          <View style={styles.borderRow}>
            <Text style={[styles.textSemiBoldslate]}>Masalah</Text>
            <Text style={[styles.textRegularSlate, {flex: 2, textAlign: 'right'}]}>{data[0].problem}</Text>
          </View>
          <View style={styles.borderRow}>
            <Text style={[styles.textSemiBoldslate]}>Pilihan Solusi</Text>
            <Text style={[styles.textRegularSlate]}>{data[0].solution}</Text>
          </View>
        </View>
      </View>
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
      </ScrollView>
    )
  }

  renderNotification (data) {
    if (data === 1) {
      return (
        <View style={[styles.information, {backgroundColor: Colors.duckEggBlue}]}>
          <Image source={Images.infoBlue} style={[styles.iconInfoBlue]} />
          <Text style={[styles.textInfo, {color: Colors.greenish}]}>Barang telah diterima oleh pembeli. Uang
          penjualan telah kami kirimkan ke saldo
          Anda. Silahkan diperiksa.</Text>
        </View>
      )
    } if (data === 2) {
      return (
        <View style={styles.information}>
          <Image source={Images.infoBlue} style={styles.iconInfoBlue} />
          <Text style={styles.textInfo}>Setelah buyer mengkonfirmasi telah
          menerima barang atau dalam jangka waktu
          5 hari, saldo akan langsung kami kirimkan.</Text>
        </View>
      )
    } if (data === 3) {
      return (
        <View style={[styles.information, {backgroundColor: 'rgba(239, 86, 86, 0.14)'}]}>
          <Image source={Images.infoBlue} style={[styles.iconInfoBlue]} />
          <Text style={[styles.textInfo, {color: Colors.red}]}>Terdapat barang yang bermasalah. Silahkan
          menyelesaikan masalah terlebih dahulu
          setelah masalah selesai, uang dari buyer akan
          kami kirimkan ke Anda.</Text>
        </View>
      )
    }
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
          <View tabLabel='Status Pengiriman' ref='deliveryStatus'>
            <ScrollView>
              {this.renderNotification(this.state.status)}
              {this.renderDeliveryStatus()}
            </ScrollView>
            {this.modalChangeReceiptNumber()}
            {spinner}
          </View>
          <View tabLabel='Detail' ref='detail'>
            {this.renderDetail()}
            {spinner}
          </View>
        </ScrollableTabView>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSales)
