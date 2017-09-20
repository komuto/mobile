import React from 'react'
import { View, Text, Image, TouchableOpacity, BackAndroid, ListView } from 'react-native'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import { connect } from 'react-redux'
import moment from 'moment'
import * as transactionAction from '../actions/transaction'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Colors } from '../Themes'
// Styles
import styles from './Styles/TransaksiDetailStatusBarangStyle'

class TransaksiDetailStatusBarang extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      id: '',
      nama: '',
      namaToko: '',
      image: '',
      invoice: '',
      status: this.props.statusBarang,
      resi: '238423423',
      alamat: '',
      storeId: 0,
      date: '',
      months: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli',
        'Agustus', 'September', 'Oktober', 'November', 'Desember'],
      dataDispute: [],
      dispute: '',
      idBucket: this.props.idBucket
    }
  }

  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
  }

  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
  }

  handleBack = () => {
    if (NavigationActions.pop()) {
      return true
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataInvoice.status === 200) {
      this.setState({
        id: nextProps.dataInvoice.invoice.id,
        nama: nextProps.dataInvoice.invoice.store.name,
        image: nextProps.dataInvoice.invoice.store.logo, // http://www.tokomesin.com/wp-content/uploads/2015/08/Sate-Ayam-Madura-tokomesin.jpeg
        invoice: nextProps.dataInvoice.invoice.invoice_number,
        storeId: nextProps.dataInvoice.invoice.store.id,
        date: nextProps.dataInvoice.invoice.created_at
      })
      if (this.state.status === 5) { // || status === 6 nunggu data dari back end
        this.setState({
          dispute: nextProps.dataInvoice.invoice.dispute,
          dataDispute: nextProps.dataInvoice.invoice.dispute.dispute_products
        })
      }
    }
  }

  renderNote () {
    const { status } = this.state
    if (status === 3) {
      return (
        <View style={styles.noteContainer}>
          <View style={styles.roundContainer}>
            <Text style={styles.textSecondButton}>i</Text>
          </View>
          <Text style={styles.note}>
            Barang sudah dikirim oleh Seller. Jika dalam
            waktu 5 hari Anda tidak mengkonfirmasi
            menerima barang. Maka otomatis uang Anda
            akan diteruskan ke Seller.
          </Text>
        </View>
      )
    }
  }

  renderTitle (teks) {
    return (
      <View style={styles.titleContainer}>
        <Text style={styles.textTitle}>{teks}</Text>
      </View>
    )
  }

  renderBarang () {
    const { nama, image } = this.state
    return (
      <View style={styles.barangContainer}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.barang}>
          <Text style={[styles.textTitle, { marginBottom: 3 }]}>{nama}</Text>
        </View>
        <TouchableOpacity style={styles.buttonSendMessage} onPress={() => this.sendMessage()}>
          <Text style={styles.textButton}>
            Kirim Pesan
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderInvoice () {
    const { invoice } = this.state
    return (
      <View style={styles.barangContainer}>
        <Text style={[styles.textTitle, { flex: 1 }]}>No Invoice</Text>
        <Text style={styles.teks}>{invoice}</Text>
      </View>
    )
  }

  renderDate () {
    const { date, months } = this.state
    const time = moment.unix(date)
    const month = months[moment(time).format('M') - 1]
    const day = moment(time).format('DD')
    const year = moment(time).format('YYYY')
    return (
      <View style={styles.barangContainer}>
        <Text style={[styles.textTitle, { flex: 1 }]}>Tanggal Transaksi</Text>
        <Text style={styles.teks}>{day} {month} {year}</Text>
      </View>
    )
  }

  renderStatus () {
    const { status } = this.state
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
      <View style={[styles.barangContainer, { alignItems: 'center' }]}>
        <Text style={[styles.textTitle, { flex: 1 }]}>Status</Text>
        <View style={[styles.warna, { backgroundColor: warna }]} />
        <Text style={styles.teks}>{teks}</Text>
      </View>
    )
  }

  renderResi () {
    const { status, resi } = this.state
    let teks
    if (status === 3) {
      if (status === 3) {
        teks = 'Dalam Pengiriman'
      }
      return (
        <View>
          <View style={styles.separator} />
          <View style={styles.barangContainer}>
            <Text style={[styles.textTitle, { flex: 1 }]}>Nomor Resi</Text>
            <Text style={styles.teksResi}>{resi}</Text>
          </View>
          <View style={[styles.barangContainer, { alignItems: 'center' }]}>
            <Text style={[styles.textTitle, { flex: 1 }]}>Status Resi</Text>
            <Text style={styles.teks}>{teks}</Text>
          </View>
        </View>
      )
    }
  }

  renderReminder () {
    const { status } = this.state
    if (status === 0) {
      return (
        <View style={styles.reminder}>
          <Text style={styles.teks}>
            Dana untuk pembelian barang ini telah dikembalikan ke saldo Anda. Silahkan memeriksa Saldo Anda.
          </Text>
        </View>
      )
    }
  }

  cekRenderButton () {
    const { status } = this.state
    if (status === 4) {
      return null
    } else {
      return this.renderButton()
    }
  }

  renderButton () {
    const { status } = this.state
    let teks
    if (status === 0) {
      teks = 'Lihat Saldo'
      return (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => this.buttonPressed(teks)}>
            <Text style={styles.textButton}>
              {teks}
            </Text>
          </TouchableOpacity>
        </View>
      )
    } else if (status === 5) {
      teks = 'Ke Detail Komplain'
      return (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => this.buttonPressed(teks)}>
            <Text style={styles.textButton}>
              {teks}
            </Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  renderSecondBottom () {
    const { status } = this.state
    if (status === 3) {
      return (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.secondButton}
            onPress={() => this.confirmItem()}
          >
            <Text style={styles.textSecondButton}>
              Barang sudah saya terima
            </Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  renderDispute () {
    const { status, dataDispute, dispute } = this.state
    if (status === 5) { // || status === 6 nunggu data dari back end
      let textSolution
      if (dispute.solution === 1) {
        textSolution = 'REFUND'
      } else {
        textSolution = 'Tukar Baru'
      }
      return (
        <View>
          {this.renderTitle('Barang Bermasalah')}
          <ListView
            dataSource={this.dataSource.cloneWithRows(dataDispute)}
            renderRow={this.renderRowDispute.bind(this)}
            enableEmptySections
          />
          <View style={styles.disputeContainer}>
            <Text style={[styles.textTitle, { marginRight: 30 }]}>Masalah</Text>
            <View style={{ flex: 1 }} />
            <Text style={[styles.teks, { marginRight: 80, textAlign: 'right' }]}>
              {dispute.problems}
            </Text>
          </View>
          <View style={styles.disputeContainer}>
            <Text style={[styles.textTitle, { marginRight: 30 }]}>Pilihan Solusi</Text>
            <Text style={[styles.teks, { flex: 1, textAlign: 'right' }]}>{textSolution}</Text>
          </View>
        </View>
      )
    }
  }

  renderRowDispute (rowData) {
    return (
      <View style={styles.disputeContainer}>
        <Image source={{ uri: rowData.product.image }} style={styles.imageRow} />
        <Text style={styles.textTitle}>{rowData.product.name}</Text>
      </View>
    )
  }

  sendMessage () {
    NavigationActions.kirimpesan({
      type: ActionConst.PUSH,
      id: this.state.storeId,
      foto: this.state.image,
      namaToko: this.state.namaToko,
      alamat: this.state.alamat,
      title: this.state.invoice
    })
  }

  buttonPressed (teks) {
    if (teks.toLowerCase().includes('saldo')) {
      // saldo
    } else {
      // komplain
    }
  }

  confirmItem () {
    NavigationActions.transactionitemreceived({
      type: ActionConst.PUSH
    })
    this.props.getDetailInvoice(this.state.idBucket, this.state.id)
  }

  render () {
    return (
      <View style={styles.container}>
        {this.renderNote()}
        {this.renderTitle('Info Penjual')}
        {this.renderBarang()}
        {this.renderTitle('Info Status')}
        {this.renderInvoice()}
        {this.renderDate()}
        {this.renderStatus()}
        {this.renderDispute()}
        {this.renderResi()}
        {this.renderReminder()}
        {this.cekRenderButton()}
        {this.renderSecondBottom()}
      </View>
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
    getDetailInvoice: (id, invoiceId) => dispatch(transactionAction.getBuyerInvoiceDetail({id: id, invoiceId: invoiceId}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransaksiDetailStatusBarang)
