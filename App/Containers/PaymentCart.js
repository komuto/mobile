import React from 'react'
import { ScrollView, Text, View, ListView, Image } from 'react-native'
import { connect } from 'react-redux'
import { MaskService } from 'react-native-masked-text'
import * as cartAction from '../actions/cart'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/PembayaranKeranjangBelanjaStyle'

class PaymentCart extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      dataPembayaran: [],
      total: 0,
      namaDiskon: '',
      diskon: 0,
      getCartPaymentDetail: true
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataCart.status === 200) {
      if (this.state.getCartPaymentDetail) {
        let temp = 0
        nextProps.dataCart.cart.items.map((obj, i) =>
          (
            temp = temp + obj.total_price
          )
        )
        this.setState({
          dataPembayaran: nextProps.dataCart.cart.items,
          getCartPaymentDetail: false
        })
        if (nextProps.dataCart.cart.promo !== null) {
          if (nextProps.dataCart.cart.promo.type === 0) {
            this.setState({
              diskon: parseInt(nextProps.dataCart.cart.promo.percentage) * temp / 100,
              total: temp - parseInt(nextProps.dataCart.cart.promo.percentage) * temp / 100,
              namaDiskon: nextProps.dataCart.cart.promo.promo_code
            })
          } else {
            this.setState({
              diskon: nextProps.dataCart.cart.promo.nominal,
              total: temp - parseInt(nextProps.dataCart.cart.promo.nominal),
              namaDiskon: nextProps.dataCart.cart.promo.promo_code
            })
          }
        }
        this.props.getCartReset()
      }
    }
  }

  renderListView () {
    return (
      <ListView
        dataSource={this.dataSource.cloneWithRows(this.state.dataPembayaran)}
        renderRow={this.renderRow.bind(this)}
        enableEmptySections
      />
    )
  }

  renderRow (rowData) {
    let insurance
    if (rowData.shipping.is_insurance) {
      insurance = 'Ya'
    } else {
      insurance = 'Tidak'
    }
    return (
      <View style={styles.dataContainer}>
        <View style={styles.product}>
          <Image source={{ uri: rowData.product.image }} style={styles.image} />
          <View style={styles.dataProduk}>
            <Text style={styles.textNamaProduk}>{rowData.product.name}</Text>
            <Text style={styles.textJumlah}>Jumlah: {rowData.qty}</Text>
          </View>
        </View>
        <View style={styles.alamatContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.textNamaProduk}>Alamat Pengiriman</Text>
          </View>
          <Text style={styles.textAlamat}>{rowData.shipping.address.name}</Text>
          <Text style={styles.textAlamat}>{rowData.shipping.address.address}</Text>
          <Text style={styles.textAlamat}>{rowData.shipping.address.province.name}</Text>
          <Text style={styles.textAlamat}>Telp: {rowData.shipping.address.phone_number}</Text>
        </View>
        {this.renderInfo('Kurir Pengiriman', rowData.shipping.expedition_service.expedition.name)}
        {this.renderInfo('Paket Pengiriman', rowData.shipping.expedition_service.name)}
        {this.renderInfo('Asuransi', insurance)}
        <View style={styles.catatanContainer}>
          <Text style={styles.textNamaProduk}>Catatan</Text>
          <Text style={styles.textAlamat}>{rowData.shipping.note}</Text>
        </View>
        {this.renderRincian(
          rowData.total_price - rowData.shipping.delivery_cost,
          rowData.shipping.insurance_fee,
          rowData.shipping.delivery_cost
        )}
      </View>
    )
  }

  renderInfo (label, data) {
    return (
      <View style={styles.infoContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.textNamaProduk}>{label}</Text>
        </View>
        <Text style={styles.textAlamat}>{data}</Text>
      </View>
    )
  }

  renderRincian (subtotal, biayaAsuransi, ongkir) {
    const total = subtotal + biayaAsuransi + ongkir
    const totalSubtotal = MaskService.toMask('money', subtotal, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    const totalBiayaAsuransi = MaskService.toMask('money', biayaAsuransi, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    const totalOngkir = MaskService.toMask('money', ongkir, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    const totalBiaya = MaskService.toMask('money', total, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    return (
      <View style={styles.rincianContainer}>
        <View style={styles.labelRincianContainer}>
          <Text style={styles.textNamaProduk}>Rincian Harga</Text>
        </View>
        <View style={styles.rincian}>
          <View style={styles.labelContainer}>
            <Text style={styles.textRincian}>Subtotal</Text>
          </View>
          <Text style={styles.textRincian}>{totalSubtotal}</Text>
        </View>
        <View style={styles.rincian}>
          <View style={styles.labelContainer}>
            <Text style={styles.textRincian}>Biaya Asuransi</Text>
          </View>
          <Text style={styles.textRincian}>{totalBiayaAsuransi}</Text>
        </View>
        <View style={styles.rincian}>
          <View style={styles.labelContainer}>
            <Text style={styles.textRincian}>Ongkos Kirim</Text>
          </View>
          <Text style={styles.textRincian}>{totalOngkir}</Text>
        </View>
        <View style={styles.rincian}>
          <View style={styles.labelContainer}>
            <Text style={styles.textRincianTotal}>Total</Text>
          </View>
          <Text style={styles.textRincianTotal}>{totalBiaya}</Text>
        </View>
      </View>
    )
  }

  renderTotal () {
    const { total, diskon, namaDiskon } = this.state
    const totalBiaya = MaskService.toMask('money', total + diskon, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    const totalDiskon = MaskService.toMask('money', diskon, {
      unit: 'Rp -',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    const totalSisa = MaskService.toMask('money', total, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    return (
      <View style={styles.totalHargaContainer}>
        {this.renderInfo('Rincian Harga Total')}
        <View style={styles.rincianTotalContainer}>
          <View style={styles.rincian}>
            <View style={styles.labelContainer}>
              <Text style={styles.textRincianTotal}>Total Belanja</Text>
            </View>
            <Text style={styles.textRincianTotal}>{totalBiaya}</Text>
          </View>
          <View style={styles.rincian}>
            <View style={styles.labelContainer}>
              <Text style={styles.textRincianTotalHijau}>Kode Voucher {namaDiskon}</Text>
            </View>
            <Text style={styles.textRincianTotalHijau}>{totalDiskon}</Text>
          </View>
          <View style={styles.sisaPembayaran}>
            <View style={styles.labelContainer}>
              <Text style={styles.sisaPembayaranText}>Sisa Pembayaran</Text>
            </View>
            <Text style={styles.sisaPembayaranText}>{totalSisa}</Text>
          </View>
        </View>
      </View>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.renderListView()}
          {this.renderTotal()}
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataCart: state.cart
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCartReset: () => dispatch(cartAction.getCartReset()),
    getCart: dispatch(cartAction.getCart())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentCart)
