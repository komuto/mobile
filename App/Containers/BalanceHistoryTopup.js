import React from 'react'
import { View, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { MaskService } from 'react-native-masked-text'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/BalanceHistoryTopupStyle'

class BalanceHistoryTopup extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      date: 'Rabu, 25 Agustus 2018',
      topup: 250000,
      method: 'Transfer Bank',
      uniqueCode: 933
    }
  }

  renderData (label, data) {
    return (
      <View style={styles.dataContainer}>
        <Text style={[styles.label, { flex: 1 }]}>{label}</Text>
        <Text style={styles.data}>{data}</Text>
      </View>
    )
  }

  renderMoney (label, data) {
    return (
      <View style={styles.dataContainer}>
        <Text style={[styles.label, { flex: 1 }]}>{label}</Text>
        <Text style={styles.dataMoney}>{data}</Text>
      </View>
    )
  }

  renderSeparator () {
    return (
      <View style={{height: 20}} />
    )
  }

  renderTitle (title) {
    return (
      <Text style={styles.title}>{title}</Text>
    )
  }

  renderPayment (topup, uniqueCode) {
    const moneyTopup = MaskService.toMask('money', topup, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    const moneyUniq = MaskService.toMask('money', uniqueCode, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    const moneyTotal = MaskService.toMask('money', topup + uniqueCode, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    return (
      <View style={styles.paymentContainer}>
        <View style={styles.dataPaymentContainer}>
          <View style={{ flexDirection: 'row', marginBottom: 10 }}>
            <Text style={[styles.label, { flex: 1 }]}>Harga Saldo (nominal {topup})</Text>
            <Text style={styles.dataMoney}>{moneyTopup}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.label, { flex: 1 }]}>Kode Unik {uniqueCode}</Text>
            <Text style={styles.dataMoney}>{moneyUniq}</Text>
          </View>
        </View>
        {this.renderData('Total', moneyTotal)}
      </View>
    )
  }

  render () {
    const { date, topup, method, uniqueCode } = this.state
    const moneyTotal = MaskService.toMask('money', topup, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.renderData('Jenis Transaksi', 'Top-up Saldo')}
          {this.renderData('Tanggal Transaksi', date)}
          {this.renderMoney('Uang yang Anda terima', moneyTotal)}
          {this.renderData('Metode Pembayaran', method)}
          {this.renderSeparator()}
          {this.renderTitle('Detail Pembayaran')}
          {this.renderPayment(topup, uniqueCode)}
        </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(BalanceHistoryTopup)
