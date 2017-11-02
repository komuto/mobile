import React from 'react'
import { View, ScrollView, Text, TouchableOpacity, Image, ListView, ToastAndroid } from 'react-native'
import { connect } from 'react-redux'
import { Images } from '../Themes'
import moment from 'moment'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import { MaskService } from 'react-native-masked-text'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import * as transactionAction from '../actions/transaction'
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/BalanceHistoryPurchaseStyle'

class BalanceHistoryPurchase extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      date: '',
      expand: false,
      arrow: Images.down,
      dataBarang: [],
      balance: 0,
      days: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
      months: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli',
        'Agustus', 'September', 'Oktober', 'November', 'Desember'],
      sisaPembayaran: 0,
      total: 0,
      kode: '',
      diskon: 0,
      kodeUnik: '',
      id: ''
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataHistory.status === 200) {
      const transaction = nextProps.dataHistory.historyDetail.transaction
      const bucket = nextProps.dataHistory.historyDetail.bucket
      const orders = nextProps.dataHistory.historyDetail.orders
      const day = parseInt(moment.unix(transaction.date).format('DD'))
      const month = parseInt(moment.unix(transaction.date).format('MM')) - 1
      const textMonth = this.state.months[month]
      const year = moment.unix(transaction.date).format('YYYY')
      const tempLabel = (parseInt(month) + 1) + '/' + day + '/' + year
      const d = new Date(tempLabel)
      const textDay = this.state.days[d.getDay()]
      this.setState({
        date: textDay + ', ' + day + ' ' + textMonth + ' ' + year,
        dataBarang: orders
      })
      const discount = bucket.promo
      if (discount === '' || discount === undefined || discount === null) {
        this.setState({
          sisaPembayaran: transaction.amount,
          total: transaction.amount - bucket.unique_code,
          balance: transaction.amount,
          kode: '',
          diskon: 0,
          kodeUnik: bucket.unique_code,
          id: bucket.id
        })
      } else {
        const typeDiscount = discount.type
        let nominalDiscount = 0
        if (typeDiscount === 0) {
          nominalDiscount = parseInt(discount.percentage) * (transaction.amount - bucket.unique_code) / 100
        } else {
          nominalDiscount = parseInt(discount.nominal)
        }
        this.setState({
          sisaPembayaran: transaction.amount,
          total: transaction.amount - bucket.unique_code + nominalDiscount,
          balance: transaction.amount,
          kode: discount.name,
          diskon: nominalDiscount,
          kodeUnik: bucket.unique_code,
          id: bucket.id
        })
      }
      nextProps.dataHistory.status = 0
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
    const { expand, total, diskon, kode, kodeUnik, sisaPembayaran } = this.state
    const totalHarga = this.maskedMoney(total)
    const hargaKodeUnik = this.maskedMoney(kodeUnik)
    const hargaSisaBayar = this.maskedMoney(sisaPembayaran)
    let kodevoucer
    if (kode === '' || kode === null || kode === undefined) {
      kodevoucer = null
    } else {
      const hargaDiskon = this.maskedMoney(diskon)
      kodevoucer = (
        <View style={styles.rowContainerRincian}>
          <Text style={[styles.textGreen, { flex: 1 }]}>Kode Voucher {kode}</Text>
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
              <Text style={[styles.textTitle, { flex: 1 }]}>Kode Unik</Text>
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

  renderMoney (label, data) {
    return (
      <View style={styles.dataContainer}>
        <Text style={[styles.label, { flex: 1 }]}>{label}</Text>
        <Text style={styles.dataMoney}>- {data}</Text>
      </View>
    )
  }

  renderListView () {
    return (
      <ListView
        enableEmptySections
        dataSource={this.dataSource.cloneWithRows(this.state.dataBarang)}
        renderRow={this.renderRowBarang.bind(this)}
      />
    )
  }

  renderRowBarang (rowData, section, row) {
    if (rowData.items.length > 1) {
      if (rowData.items.length <= 4) {
        const image = rowData.items.map((data, i) => {
          return (
            <Image key={i} source={{ uri: data.product.image }} style={styles.imageBarang} />
          )
        })
        return (
          <TouchableOpacity style={styles.containerStatusItem} onPress={() =>
            this.detailBarang(this.state.dataBarang[row].invoice.transaction_status, this.state.dataBarang[row].invoice.id)}
          >
            <View style={styles.containerBarang}>
              <Text style={[styles.textTitle, { marginBottom: 10 }]}>
                {this.state.dataBarang[row].invoice.store.name}
              </Text>
              <View style={styles.items}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  {image}
                </View>
                <Image source={Images.rightArrow} style={styles.arrow} />
              </View>
            </View>
          </TouchableOpacity>
        )
      } else {
        const gambar = rowData.items.length - 4
        return (
          <TouchableOpacity style={styles.containerStatusItem} onPress={() =>
            this.detailBarang(this.state.dataBarang[row].invoice.transaction_status, this.state.dataBarang[row].invoice.id)}
          >
            <View style={styles.containerBarang}>
              <Text style={[styles.textTitle, { marginBottom: 10 }]}>
                {this.state.dataBarang[row].invoice.store.name}
              </Text>
              <View style={styles.items}>
                <Image source={{ uri: rowData.items[0].product.image }} style={styles.imageBarang} />
                <Image source={{ uri: rowData.items[1].product.image }} style={styles.imageBarang} />
                <Image source={{ uri: rowData.items[2].product.image }} style={styles.imageBarang} />
                <Image source={{ uri: rowData.items[3].product.image }} style={styles.imageBarang} />
                <Image
                  source={{ uri: rowData.items[4].product.image }}
                  style={styles.imageRowStyle}
                  resizeMode='cover'
                  borderRadius={7}
                >
                  <View style={styles.morePictures}>
                    <Text style={[styles.textTitleWhite, { fontSize: 15 }]}>+{gambar}</Text>
                  </View>
                </Image>
                <Image source={Images.rightArrow} style={styles.arrow} />
              </View>
            </View>
          </TouchableOpacity>
        )
      }
    } else {
      return (
        <TouchableOpacity style={styles.containerStatusItem} onPress={() =>
          this.detailBarang(this.state.dataBarang[row].invoice.transaction_status, this.state.dataBarang[row].invoice.id)}
        >
          <View style={styles.containerBarang}>
            <Text style={[styles.textTitle, { marginBottom: 10 }]}>
              {this.state.dataBarang[row].invoice.store.name}
            </Text>
            <View style={styles.items}>
              <Image source={{ uri: rowData.items[0].product.image }} style={styles.imageBarang} />
              <View style={styles.namaBarangContainer}>
                <Text style={styles.textTitle}>{rowData.items[0].product.name}</Text>
              </View>
              <Image source={Images.rightArrow} style={styles.arrow} />
            </View>
          </View>
        </TouchableOpacity>
      )
    }
  }

  detailBarang (status, invoiceId) {
    const { id } = this.state
    this.props.getDetailInvoice(id, invoiceId)
    NavigationActions.transactiondetailstatus({
      type: ActionConst.PUSH,
      statusBarang: status,
      idBucket: this.state.id
    })
  }

  render () {
    const { date, balance } = this.state
    const moneyTotal = this.maskedMoney(balance)
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.renderData('Jenis Transaksi', 'Pembelian Barang')}
          {this.renderData('Tanggal Transaksi', date)}
          {this.renderTotal('Total Tagihan', moneyTotal)}
          {this.renderExpand()}
          {this.renderSeparator()}
          {this.renderMoney('Saldo yang digunakan', moneyTotal)}
          {this.renderSeparator()}
          {this.renderTitle('Daftar Barang yang dibeli')}
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
    getDetailInvoice: (id, invoiceId) => dispatch(transactionAction.getBuyerInvoiceDetail({id: id, invoiceId: invoiceId}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BalanceHistoryPurchase)
