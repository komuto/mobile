import React from 'react'
import { View, ScrollView, Text, ToastAndroid } from 'react-native'
import { connect } from 'react-redux'
import moment from 'moment'
import { MaskService } from 'react-native-masked-text'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/BalanceHistoryTopupStyle'

class BalanceHistoryTopup extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      date: '',
      topup: 0,
      total: 0,
      method: 'Manual Transfer',
      uniqueCode: 0,
      days: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
      months: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli',
        'Agustus', 'September', 'Oktober', 'November', 'Desember']
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataHistory.status === 200) {
      try {
        const data = nextProps.dataHistory.historyDetail
        const day = parseInt(moment.unix(data.date).format('DD'))
        const month = parseInt(moment.unix(data.date).format('MM')) - 1
        const textMonth = this.state.months[month]
        const year = moment.unix(data.date).format('YYYY')
        const tempLabel = (parseInt(month) + 1) + '/' + day + '/' + year
        const d = new Date(tempLabel)
        const textDay = this.state.days[d.getDay()]
        this.setState({
          date: textDay + ', ' + day + ' ' + textMonth + ' ' + year,
          topup: data.amount,
          total: data.amount
        })
        nextProps.dataHistory.status = 0
      } catch (e) {

      }
    } else if (nextProps.dataHistory.status !== 200 && nextProps.dataHistory.status !== 0) {
      ToastAndroid.show('Terjadi Kesalahan..' + nextProps.dataHistory.message, ToastAndroid.LONG)
      nextProps.dataHistory.status = 0
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

  renderPayment (topup, total) {
    const moneyTopup = MaskService.toMask('money', topup, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    // const moneyUniq = MaskService.toMask('money', total - topup, {
    //   unit: 'Rp ',
    //   separator: '.',
    //   delimiter: '.',
    //   precision: 3
    // })
    const moneyTotal = MaskService.toMask('money', total, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    return (
      <View style={styles.paymentContainer}>
        <View style={styles.dataPaymentContainer}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.label, { flex: 1 }]}>Harga Saldo (nominal {topup})</Text>
            <Text style={styles.dataMoney}>{moneyTopup}</Text>
          </View>
          {/* <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.label, { flex: 1 }]}>Biaya</Text>
            <Text style={styles.dataMoney}>{moneyUniq}</Text>
          </View> */}
        </View>
        {this.renderData('Total', moneyTotal)}
      </View>
    )
  }

  render () {
    const { date, topup, method, total } = this.state
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
          {this.renderMoney('Jumlah Top-up Saldo', moneyTotal)}
          {this.renderData('Metode Pembayaran', method)}
          {this.renderSeparator()}
          {this.renderTitle('Detail Pembayaran')}
          {this.renderPayment(topup, total)}
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

export default connect(mapStateToProps, mapDispatchToProps)(BalanceHistoryTopup)
