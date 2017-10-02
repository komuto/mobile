import React from 'react'
import { View, ScrollView, Text, ToastAndroid } from 'react-native'
import { connect } from 'react-redux'
import moment from 'moment'
import { MaskService } from 'react-native-masked-text'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/BalanceHistoryWithdrawStyle'

class BalanceHistoryWithdraw extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      date: '',
      topup: 0,
      bank: '',
      accountNumber: '',
      accountName: '',
      days: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
      months: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli',
        'Agustus', 'September', 'Oktober', 'November', 'Desember']
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataHistory.status === 200) {
      const transaction = nextProps.dataHistory.historyDetail.transaction
      const bank = nextProps.dataHistory.historyDetail.bankAccount
      const day = parseInt(moment.unix(transaction.date).format('DD'))
      const month = parseInt(moment.unix(transaction.date).format('MM')) - 1
      const textMonth = this.state.months[month]
      const year = moment.unix(transaction.date).format('YYYY')
      const tempLabel = (parseInt(month) + 1) + '/' + day + '/' + year
      const d = new Date(tempLabel)
      const textDay = this.state.days[d.getDay()]
      this.setState({
        date: textDay + ', ' + day + ' ' + textMonth + ' ' + year,
        topup: transaction.amount,
        bank: bank.bank.name,
        accountName: bank.holder_name,
        accountNumber: bank.holder_account_number
      })
      nextProps.dataHistory.status = 0
    } else if (nextProps.dataHistory.status > 200) {
      ToastAndroid.show('Terjadi Kesalahan..' + nextProps.dataHistory.message, ToastAndroid.LONG)
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
    dataHistory: state.saldoHistoryDetail
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BalanceHistoryWithdraw)
