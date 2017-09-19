import React from 'react'
import { ScrollView, Text, ListView, View, Image } from 'react-native'
import { connect } from 'react-redux'
import { MaskService } from 'react-native-masked-text'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Colors } from '../Themes'
// Styles
import styles from './Styles/TransaksiDetailStatusPembelianStyle'

class TransactionDetailStatusPurchase extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      data: [],
      name: '',
      address: '',
      phone: '',
      postalCode: '',
      courier: '',
      subCourier: '',
      insurance: '',
      subtotal: 0,
      insuranceFee: '',
      shippingFee: ''
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataInvoice.status === 200) {
      this.setState({
        data: nextProps.dataInvoice.invoice.items,
        name: nextProps.dataInvoice.invoice.shipping.address.name,
        address: nextProps.dataInvoice.invoice.shipping.address.address,
        phone: nextProps.dataInvoice.invoice.shipping.address.phone_number,
        postalCode: nextProps.dataInvoice.invoice.shipping.address.postal_code,
        courier: nextProps.dataInvoice.invoice.shipping.expedition_service.expedition.name,
        subCourier: nextProps.dataInvoice.invoice.shipping.expedition_service.name,
        insurance: nextProps.dataInvoice.invoice.shipping.is_insurance,
        subtotal: nextProps.dataInvoice.invoice.total_price,
        insuranceFee: nextProps.dataInvoice.invoice.shipping.insurance_fee,
        shippingFee: nextProps.dataInvoice.invoice.shipping.delivery_cost
      })
    }
  }

  renderTitle (title) {
    return (
      <View style={styles.titleContainer}>
        <Text style={[styles.textTitle, { marginTop: 10 }]}>{title}</Text>
      </View>
    )
  }

  renderListView () {
    return (
      <ListView
        enableEmptySections
        dataSource={this.dataSource.cloneWithRows(this.state.data)}
        renderRow={this.renderRow.bind(this)}
      />
    )
  }

  renderRow (rowData) {
    const money = MaskService.toMask('money', rowData.product.price, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    return (
      <View style={styles.itemContainer}>
        <Image source={{ uri: rowData.product.image }} style={styles.image} />
        <View style={styles.dataContainer}>
          <Text style={[styles.textData, { marginBottom: 2 }]}>{rowData.product.name}</Text>
          <Text style={[styles.textData, { marginBottom: 2 }]}>Harga : {money} / item</Text>
          <Text style={[styles.textData, { marginBottom: 2 }]}>Jumlah : {rowData.qty}</Text>
          <Text style={[styles.textData, { marginBottom: 5, fontStyle: 'italic', color: Colors.labelgrey }]}>
            "{rowData.note}"
          </Text>
        </View>
      </View>
    )
  }

  renderShipping () {
    const { name, address, phone, postalCode, courier, subCourier, insurance } = this.state
    let insuranceText
    if (insurance) {
      insuranceText = 'Ya'
    } else {
      insuranceText = 'Tidak'
    }
    return (
      <View style={styles.shippingContainer}>
        <View style={styles.addressContainer}>
          <Text style={[styles.textData, { marginBottom: 5 }]}>Alamat Pengiriman</Text>
          <Text style={[styles.textData, { marginBottom: 2 }]}>{name}</Text>
          <Text style={[styles.textData, { marginBottom: 2 }]}>{address}</Text>
          <Text style={[styles.textData, { marginBottom: 2 }]}>{postalCode}</Text>
          <Text style={[styles.textData, { marginBottom: 2 }]}>{phone}</Text>
        </View>
        {this.renderCourier('Kurir Pengiriman', courier)}
        {this.renderCourier('Paket Pengiriman', subCourier)}
        {this.renderCourier('Asuransi', insuranceText)}
      </View>
    )
  }

  renderCourier (label, courier) {
    return (
      <View style={styles.courier}>
        <Text style={[styles.textData, { flex: 1 }]}>{label}</Text>
        <Text style={styles.textData}>{courier}</Text>
      </View>
    )
  }

  renderPrice () {
    const { subtotal, insuranceFee, shippingFee, insurance } = this.state
    let viewInsurance
    if (insurance) {
      const insuranceFeePrice = MaskService.toMask('money', insuranceFee, {
        unit: 'Rp ',
        separator: '.',
        delimiter: '.',
        precision: 3
      })
      viewInsurance = (
        this.renderDetailPrice('Biaya Asuransi', insuranceFeePrice)
      )
    } else {
      viewInsurance = null
    }
    const subtotalPrice = MaskService.toMask('money', subtotal - shippingFee - insuranceFee, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    const shippingFeePrice = MaskService.toMask('money', shippingFee, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    const totalPrice = MaskService.toMask('money', subtotal, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    return (
      <View style={styles.shippingContainer}>
        <View style={[styles.addressContainer, { paddingTop: 5 }]}>
          {this.renderDetailPrice('Subtotal', subtotalPrice)}
          {viewInsurance}
          {this.renderDetailPrice('Ongkos Kirim', shippingFeePrice)}
        </View>
        {this.renderCourier('Total', totalPrice)}
      </View>
    )
  }

  renderDetailPrice (label, courier) {
    return (
      <View style={[styles.courier, { borderBottomWidth: 0, padding: 0, marginTop: 10 }]}>
        <Text style={[styles.textData, { flex: 1 }]}>{label}</Text>
        <Text style={styles.textData}>{courier}</Text>
      </View>
    )
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        {this.renderTitle('Daftar Barang yang dibeli')}
        {this.renderListView()}
        {this.renderTitle('Informasi Pengiriman')}
        {this.renderShipping()}
        {this.renderTitle('Detail Harga')}
        {this.renderPrice()}
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataInvoice: state.buyerInvoiceDetail
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionDetailStatusPurchase)
