import React from 'react'
import { View, ScrollView, Text, Image, ListView } from 'react-native'
import { connect } from 'react-redux'
import { MaskService } from 'react-native-masked-text'
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
      date: 'Rabu, 25 Agustus 2018',
      total: '250000',
      expand: false,
      arrow: Images.down,
      refundNumber: 'RF/12',
      data: [
        {
          'name': 'Indomie',
          'image': 'https://cdn.idntimes.com/content-images/post/20170315/7-0dc7a8345dbe940f25c6ec32276aecd5.jpg'
        },
        {
          'name': 'Indomie',
          'image': 'https://cdn.idntimes.com/content-images/post/20170315/7-0dc7a8345dbe940f25c6ec32276aecd5.jpg'
        }
      ]
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
        <Image source={{ uri: rowData.image }} style={styles.imageRow} />
        <Text style={styles.label}>{rowData.name}</Text>
      </View>
    )
  }

  render () {
    const { date, total, refundNumber } = this.state
    const moneyTotal = MaskService.toMask('money', total, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.renderData('Jenis Transaksi', 'Refund Barang')}
          {this.renderData('Tanggal Transaksi', date)}
          {this.renderMoney('Uang yang Anda terima', moneyTotal)}
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BalanceHistoryRefund)
