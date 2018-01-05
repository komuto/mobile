import React from 'react'
import { ScrollView, Text, ListView, View, Image, ToastAndroid } from 'react-native'
import { connect } from 'react-redux'
import RupiahFormat from '../Services/MaskedMoneys'

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
    } else if (nextProps.dataInvoice.status !== 200 && nextProps.dataInvoice.status !== 0) {
      ToastAndroid.show(nextProps.dataInvoice.message, ToastAndroid.SHORT)
    }
  }

  maskedMoney (value) {
    return 'Rp ' + RupiahFormat(value)
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
    const money = this.maskedMoney(rowData.product.price)
    return (
      <View style={styles.itemContainer}>
        <Image source={{ uri: rowData.product.image }} style={styles.image} />
        <View style={styles.dataContainer}>
          <Text style={[styles.textData, { marginBottom: 2 }]}>{rowData.product.name}</Text>
          <Text style={[styles.textData, { marginBottom: 2 }]}>Harga : {money} / item</Text>
          <Text style={[styles.textData, { marginBottom: 2 }]}>Jumlah : {rowData.qty}</Text>
          <Text style={[styles.textData, { marginBottom: 5, fontStyle: 'italic', color: Colors.labelgrey }]}>
            {rowData.note}
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
      const insuranceFeePrice = this.maskedMoney(insuranceFee)
      viewInsurance = (
        this.renderDetailPrice('Biaya Asuransi', insuranceFeePrice)
      )
    } else {
      viewInsurance = null
    }
    const subtotalPrice = this.maskedMoney(subtotal - shippingFee - insuranceFee)
    const shippingFeePrice = this.maskedMoney(shippingFee)
    const totalPrice = this.maskedMoney(subtotal)
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
