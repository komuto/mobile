import React from 'react'
import { View, ScrollView, Text, Image, ListView, ToastAndroid } from 'react-native'
import { connect } from 'react-redux'
import moment from 'moment'
import RupiahFormat from '../Services/MaskedMoneys'

// Add Actions - replace 'Your' with whatever your reducer is called :)
import { Images } from '../Themes'
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/BalanceHistoryRefundStyle'

class BalanceHistoryRefund extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      date: '',
      total: 0,
      expand: false,
      arrow: Images.down,
      refundNumber: '',
      data: [],
      days: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
      months: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli',
        'Agustus', 'September', 'Oktober', 'November', 'Desember'],
      type: 1
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataHistory.status === 200) {
      try {
        const transaction = nextProps.dataHistory.historyDetail.transaction
        const refund = nextProps.dataHistory.historyDetail.refund
        const day = parseInt(moment.unix(transaction.date).format('DD'))
        const month = parseInt(moment.unix(transaction.date).format('MM')) - 1
        const textMonth = this.state.months[month]
        const year = moment.unix(transaction.date).format('YYYY')
        const tempLabel = (parseInt(month) + 1) + '/' + day + '/' + year
        const d = new Date(tempLabel)
        const textDay = this.state.days[d.getDay()]
        if (transaction.last_saldo > transaction.first_saldo) {
          this.setState({
            type: 1
          })
        } else {
          this.setState({
            type: 2
          })
        }
        this.setState({
          date: textDay + ', ' + day + ' ' + textMonth + ' ' + year,
          total: transaction.amount,
          refundNumber: refund.refund_number,
          data: refund.items
        })
        nextProps.dataHistory.status = 0
      } catch (e) {

      }
    } else if (nextProps.dataHistory.status !== 200 && nextProps.dataHistory.status !== 0) {
      ToastAndroid.show(nextProps.dataHistory.message, ToastAndroid.SHORT)
      nextProps.dataHistory.status = 0
    }
  }

  maskedMoney (value) {
    return 'Rp ' + RupiahFormat(value)
  }

  renderData (label, data) {
    return (
      <View style={styles.dataContainer}>
        <Text style={[styles.label, { flex: 1 }]}>{label}</Text>
        <Text style={styles.data}>{data}</Text>
      </View>
    )
  }

  renderMoney (data) {
    if (this.state.type === 1) {
      return (
        <View style={styles.dataContainer}>
          <Text style={[styles.label, { flex: 1 }]}>Uang yang Anda terima</Text>
          <Text style={styles.dataMoney}>{data}</Text>
        </View>
      )
    } else {
      return (
        <View style={styles.dataContainer}>
          <Text style={[styles.label, { flex: 1 }]}>Uang yang Anda bayar</Text>
          <Text style={styles.dataPaidMoney}>{data}</Text>
        </View>
      )
    }
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
    return (
      <View style={styles.rowDataContainer}>
        <Image source={{ uri: rowData.product_image }} style={styles.imageRow} />
        <Text style={styles.label}>{rowData.product_name}</Text>
      </View>
    )
  }

  render () {
    const { date, total, refundNumber } = this.state
    const moneyTotal = this.maskedMoney(total)
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.renderData('Jenis Transaksi', 'Refund Barang')}
          {this.renderData('Tanggal Transaksi', date)}
          {this.renderMoney(moneyTotal)}
          {this.renderData('Nomor Refund', refundNumber)}
          {this.renderSeparator()}
          {this.renderTitle('Daftar Barang yang di refund')}
          {this.renderListView()}
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

export default connect(mapStateToProps, mapDispatchToProps)(BalanceHistoryRefund)
