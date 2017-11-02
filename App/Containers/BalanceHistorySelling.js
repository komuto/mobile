import React from 'react'
import { View, ScrollView, Text, TouchableOpacity, Image, ListView, ToastAndroid } from 'react-native'
import { connect } from 'react-redux'
import { Images, Colors } from '../Themes'
import moment from 'moment'
import { MaskService } from 'react-native-masked-text'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/BalanceHistorySellingStyle'

class BalanceHistorySelling extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      date: '',
      total: 0,
      expand: false,
      invoice: '',
      image: null,
      name: '',
      arrow: Images.down,
      data: [],
      days: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
      months: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli',
        'Agustus', 'September', 'Oktober', 'November', 'Desember'],
      diskon: 0,
      biayaOngkir: 0,
      comission: 0,
      comissionText: '',
      balance: 0
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataHistory.status === 200) {
      try {
        const transaction = nextProps.dataHistory.historyDetail.transaction
        const buyer = nextProps.dataHistory.historyDetail.buyer
        const invoice = nextProps.dataHistory.historyDetail.invoice
        const commission = nextProps.dataHistory.historyDetail.commission
        const day = parseInt(moment.unix(transaction.date).format('DD'))
        const month = parseInt(moment.unix(transaction.date).format('MM')) - 1
        const textMonth = this.state.months[month]
        const year = moment.unix(transaction.date).format('YYYY')
        const tempLabel = (parseInt(month) + 1) + '/' + day + '/' + year
        const d = new Date(tempLabel)
        const textDay = this.state.days[d.getDay()]
        this.setState({
          date: textDay + ', ' + day + ' ' + textMonth + ' ' + year,
          total: invoice.total_price,
          invoice: invoice.invoice_number,
          image: buyer.photo,
          name: buyer.name,
          data: invoice.items,
          diskon: invoice.promo,
          biayaOngkir: invoice.delivery_cost,
          comission: commission.nominal,
          comissionText: commission.percent.toString().substring(0, 3),
          balance: transaction.amount
        })
        nextProps.dataHistory.status = 0
      } catch (e) {

      }
    } else if (nextProps.dataHistory.status !== 200 && nextProps.dataHistory.status !== 0) {
      ToastAndroid.show('Terjadi Kesalahan..' + nextProps.dataHistory.message, ToastAndroid.LONG)
      nextProps.dataHistory.status = 0
    }
  }

  maskedMoney (value) {
    let price
    if (value < 1000) {
      price = 'Rp ' + value
    }
    if (value >= 1000) {
      price = MaskService.toMask('money', value, {
        unit: 'Rp ',
        separator: '.',
        delimiter: '.',
        precision: 3
      })
    }
    return price
  }

  renderData (label, data) {
    return (
      <View style={styles.dataContainer}>
        <Text style={[styles.label, { flex: 1 }]}>{label}</Text>
        <Text style={styles.data}>{data}</Text>
      </View>
    )
  }

  renderTotal (label, data) {
    return (
      <View style={styles.dataContainer}>
        <Text style={[styles.label, { flex: 1 }]}>{label}</Text>
        <Text style={[styles.data, { marginRight: 10 }]}>{data}</Text>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={() => this.expand()}>
          <Text style={[styles.blueText, { marginRight: 10 }]}>Detail</Text>
          <Image source={this.state.arrow} style={styles.arrow} />
        </TouchableOpacity>
      </View>
    )
  }

  renderExpand () {
    const { expand, total, diskon, biayaOngkir } = this.state
    const totalHarga = this.maskedMoney(total - biayaOngkir + diskon)
    const hargaKodeUnik = this.maskedMoney(biayaOngkir)
    const hargaSisaBayar = this.maskedMoney(total)
    let kodevoucer
    if (diskon === 0) {
      kodevoucer = null
    } else {
      const hargaDiskon = this.maskedMoney(diskon)
      kodevoucer = (
        <View style={styles.rowContainerRincian}>
          <Text style={[styles.textGreen, { flex: 1 }]}>Diskon</Text>
          <Text style={styles.textGreen}>{hargaDiskon}</Text>
        </View>
      )
    }
    if (expand) {
      return (
        <View style={styles.rincianContainer}>
          <View style={styles.bodyRincian}>
            <View style={styles.rowContainerRincian}>
              <Text style={[styles.textTitle, { flex: 1 }]}>Total Belanja</Text>
              <Text style={styles.textTitle}>{totalHarga}</Text>
            </View>
            {kodevoucer}
            <View style={styles.rowContainerRincian}>
              <Text style={[styles.textTitle, { flex: 1 }]}>Ongkos Kirim</Text>
              <Text style={styles.textTitle}>{hargaKodeUnik}</Text>
            </View>
          </View>
          <View style={[styles.rowContainerRincian, { paddingLeft: 20, paddingRight: 20 }]}>
            <Text style={[styles.bold, { flex: 1 }]}>Total Pembayaran</Text>
            <Text style={styles.bold}>{hargaSisaBayar}</Text>
          </View>
        </View>
      )
    }
    return null
  }

  expand () {
    const { expand } = this.state
    if (expand) {
      this.setState({
        expand: false,
        arrow: Images.arrowDown
      })
    } else {
      this.setState({
        expand: true,
        arrow: Images.arrowUp
      })
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

  renderBuyer () {
    const { image, name } = this.state
    return (
      <View style={styles.dataContainer}>
        <Text style={[styles.label, { flex: 1 }]}>Pembeli</Text>
        <Image source={{uri: image}} style={styles.image} />
        <Text style={styles.data}>{name}</Text>
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
        <Image source={{ uri: rowData.product.image }} style={styles.imageProduct} />
        <View style={styles.rowDataContainer}>
          <Text style={[styles.textData, { marginBottom: 2 }]}>{rowData.product.name}</Text>
          <Text style={[styles.textData, { marginBottom: 2 }]}>Harga : {money} / item</Text>
          <Text style={[styles.textData, { marginBottom: 2 }]}>Jumlah : {rowData.item.qty}</Text>
          <Text style={[styles.textData, { marginBottom: 5, fontStyle: 'italic', color: Colors.labelgrey }]}>
            "{rowData.item.note}"
          </Text>
        </View>
      </View>
    )
  }

  render () {
    const { date, total, invoice, comissionText, balance, comission } = this.state
    const moneyTotal = this.maskedMoney(total)
    const moneyComission = this.maskedMoney(comission)
    const paidMoney = this.maskedMoney(balance)

    return (
      <View style={styles.container}>
        <ScrollView>
          {this.renderData('Jenis Transaksi', 'Penjualan Barang')}
          {this.renderData('Tanggal Transaksi', date)}
          {this.renderTotal('Total Tagihan', moneyTotal)}
          {this.renderExpand()}
          {this.renderSeparator()}
          {this.renderData('Komisi Komuto (' + comissionText + '%)', moneyComission)}
          {this.renderMoney('Uang yang Anda terima', paidMoney)}
          {this.renderSeparator()}
          {this.renderTitle('Info Penjualan')}
          {this.renderData('No Invoice', invoice)}
          {this.renderBuyer()}
          {this.renderSeparator()}
          {this.renderTitle('Daftar Barang yang dijual')}
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

export default connect(mapStateToProps, mapDispatchToProps)(BalanceHistorySelling)
