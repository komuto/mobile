import React from 'react'
import { ScrollView, Text, View, Image, TouchableOpacity, ListView, ToastAndroid } from 'react-native'
import { connect } from 'react-redux'
import { MaskService } from 'react-native-masked-text'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import * as transactionAction from '../actions/transaction'
import { Images, Colors } from '../Themes'
// Styles
import styles from './Styles/TransaksiDibayarStyle'

class TransactionPaid extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      sisaPembayaran: 0,
      total: 0,
      kode: '',
      diskon: 0,
      expand: false,
      dataBarang: [],
      id: ''
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataTransaction.status === 200) {
      const discount = nextProps.dataTransaction.transaction.bucket.promo
      if (discount === '' || discount === undefined || discount === null) {
        this.setState({
          sisaPembayaran: nextProps.dataTransaction.transaction.summary_transaction.total_price,
          total: nextProps.dataTransaction.transaction.summary_transaction.total_price,
          kode: '',
          diskon: 0,
          dataBarang: nextProps.dataTransaction.transaction.invoices,
          id: nextProps.dataTransaction.transaction.bucket.id
        })
      } else {
        const typeDiscount = nextProps.dataTransaction.transaction.bucket.promo.type
        let nominalDiscount = 0
        if (typeDiscount === 0) {
          nominalDiscount = parseInt(nextProps.dataTransaction.transaction.bucket.promo.percentage) * nextProps.dataTransaction.transaction.summary_transaction.total_price / 100
        } else {
          nominalDiscount = parseInt(nextProps.dataTransaction.transaction.bucket.promo.nominal)
        }
        this.setState({
          sisaPembayaran: nextProps.dataTransaction.transaction.summary_transaction.total_price - nominalDiscount,
          total: nextProps.dataTransaction.transaction.summary_transaction.total_price,
          kode: nextProps.dataTransaction.transaction.bucket.promo.promo_code,
          diskon: nominalDiscount,
          dataBarang: nextProps.dataTransaction.transaction.invoices,
          id: nextProps.dataTransaction.transaction.bucket.id
        })
      }
    } else if (nextProps.dataTransaction.status !== 200 && nextProps.dataTransaction.status !== 0) {
      ToastAndroid.show(nextProps.dataTransaction.message, ToastAndroid.LONG)
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

  renderInfo () {
    return (
      <View style={styles.batasPembayaran}>
        <Image source={Images.waktuHijau} style={styles.image} />
        <Text style={[styles.textPembayaran, { marginLeft: 10 }]}>
          Pembayaran Telah Diterima. Pesanan sudah
          dilanjutkan ke Seller.
        </Text>
      </View>
    )
  }

  renderExpand () {
    const { expand, total, diskon, kode, sisaPembayaran } = this.state
    const totalHarga = this.maskedMoney(total)
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

  renderTagihan () {
    const { expand, sisaPembayaran } = this.state
    const hargaSisaBayar = this.maskedMoney(sisaPembayaran)
    let arrow
    if (expand) {
      arrow = Images.arrowUp
    } else {
      arrow = Images.arrowDown
    }
    return (
      <View style={styles.tagihanContainer}>
        <View style={styles.rowContainer}>
          <Text style={[styles.bold, { flex: 1 }]}>Total Tagihan</Text>
          <Text style={styles.textTitle}>{hargaSisaBayar}</Text>
          <TouchableOpacity style={styles.expandButton} onPress={() => this.expand()}>
            <Text style={styles.textBlue}>Detail </Text>
            <Image source={arrow} style={styles.arrow} />
          </TouchableOpacity>
        </View>
        {this.renderExpand()}
      </View>
    )
  }

  renderBarang () {
    const { dataBarang } = this.state
    return (
      <View style={[styles.tagihanContainer, { backgroundColor: Colors.paleGrey, marginTop: 20 }]}>
        <View style={styles.rowContainer}>
          <Text style={[styles.bold, { flex: 1 }]}>Daftar Barang yang dibeli</Text>
        </View>
        <ListView
          dataSource={this.dataSource.cloneWithRows(dataBarang)}
          renderRow={this.renderRowBarang.bind(this)}
          enableEmptySections
        />
      </View>
    )
  }

  renderRowBarang (rowData) {
    if (rowData.items.length > 1) {
      if (rowData.items.length <= 4) {
        const image = rowData.items.map((data, i) => {
          return (
            <Image key={i} source={{ uri: data.product.image }} style={styles.imageBarang} />
          )
        })
        return (
          <TouchableOpacity style={styles.containerStatusItem} onPress={() => this.detailBarang(rowData.id, rowData.transaction_status)}>
            <View style={styles.containerBarang}>
              <Text style={[styles.textTitle, { marginBottom: 10 }]}>{rowData.store.name}</Text>
              <View style={styles.items}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  {image}
                </View>
                <Image source={Images.rightArrow} style={styles.arrow} />
              </View>
            </View>
            {this.renderStatus(rowData.transaction_status)}
          </TouchableOpacity>
        )
      } else {
        const gambar = rowData.items.length - 4
        return (
          <TouchableOpacity style={styles.containerStatusItem} onPress={() => this.detailBarang(rowData.id, rowData.transaction_status)}>
            <View style={styles.containerBarang}>
              <Text style={[styles.textTitle, { marginBottom: 10 }]}>{rowData.store.name}</Text>
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
            {this.renderStatus(rowData.transaction_status)}
          </TouchableOpacity>
        )
      }
    } else {
      return (
        <TouchableOpacity style={styles.containerStatusItem} onPress={() => this.detailBarang(rowData.id, rowData.transaction_status)}>
          <View style={styles.containerBarang}>
            <Text style={[styles.textTitle, { marginBottom: 10 }]}>{rowData.store.name}</Text>
            <View style={styles.items}>
              <Image source={{ uri: rowData.items[0].product.image }} style={styles.imageBarang} />
              <View style={styles.namaBarangContainer}>
                <Text style={styles.textTitle}>{rowData.items[0].product.name}</Text>
              </View>
              <Image source={Images.rightArrow} style={styles.arrow} />
            </View>
          </View>
          {this.renderStatus(rowData.transaction_status)}
        </TouchableOpacity>
      )
    }
  }

  renderStatus (status) {
    let warna
    let teks
    if (status === 0) {
      warna = Colors.red
      teks = 'Ditolak oleh Seller'
    } else if (status === 1) {
      warna = Colors.fullOrange
      teks = 'Menunggu konfirmasi Seller'
    } else if (status === 2) {
      warna = Colors.violet
      teks = 'Diproses oleh Seller'
    } else if (status === 3) {
      warna = Colors.bluesky
      teks = 'Barang sudah dikirim'
    } else if (status === 4) {
      warna = Colors.greenish
      teks = 'Barang sudah diterima'
    } else if (status === 5) {
      warna = Colors.darkOrange
      teks = 'Terdapat barang bermasalah'
    } else if (status === 6) {
      warna = Colors.pink
      teks = 'Komplain telah selesai'
    }
    return (
      <View style={styles.warnaContainer}>
        <View style={[styles.warna, { backgroundColor: warna }]} />
        <Text style={styles.textStatus}>
          {teks}
        </Text>
      </View>
    )
  }

  expand () {
    const { expand } = this.state
    if (expand) {
      this.setState({ expand: false })
    } else {
      this.setState({ expand: true })
    }
  }

  detailBarang (invoiceId, status) {
    const { id } = this.state
    // this.props.getDetailInvoice(id, invoiceId)
    NavigationActions.transactiondetailstatus({
      type: ActionConst.PUSH,
      statusBarang: status,
      idBucket: id,
      invoiceId: invoiceId
    })
  }

  render () {
    return (
      <View style={styles.container}>
        {this.renderInfo()}
        <ScrollView>
          {this.renderTagihan()}
          {this.renderBarang()}
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataTransaction: state.transaction
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDetailInvoice: (id, invoiceId) => dispatch(transactionAction.getBuyerInvoiceDetail({id: id, invoiceId: invoiceId}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionPaid)
