import React from 'react'
import { View, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { MaskService } from 'react-native-masked-text'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/BalanceHistoryWithdrawStyle'

class BalanceHistoryWithdraw extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      date: 'Rabu, 25 Agustus 2018',
      topup: 250000,
      bank: 'Bank Mandiri',
      accountNumber: 13029,
      accountName: 'Qwerty'
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
        <Text style={styles.dataMoney}>- {data}</Text>
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

  render () {
    const { date, topup, bank, accountNumber, accountName } = this.state
    const moneyTotal = MaskService.toMask('money', topup, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.renderData('Jenis Transaksi', 'Penarikan Saldo')}
          {this.renderData('Tanggal Transaksi', date)}
          {this.renderMoney('Jumlah Penarikan', moneyTotal)}
          {this.renderSeparator()}
          {this.renderTitle('Info Rekening Tujuan')}
          {this.renderData('Bank', bank)}
          {this.renderData('Nomor Rekening', accountNumber)}
          {this.renderData('Pemilik Akun', accountName)}
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

export default connect(mapStateToProps, mapDispatchToProps)(BalanceHistoryWithdraw)
