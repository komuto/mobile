import React from 'react'
import { View, ScrollView, Text, Image, ListView, TouchableOpacity, ToastAndroid } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import moment from 'moment'
import { Images, Colors } from '../Themes'
import * as transactionAction from '../actions/transaction'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/BuyerComplainDetailItemStyle'

class BuyerComplainDetailItem extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      months: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli',
        'Agustus', 'September', 'Oktober', 'November', 'Desember'],
      dateNotification: '',
      invoiceNumber: '',
      date: '',
      image: null,
      shopName: '',
      status: -1,
      statusSolution: 1,
      dataProduct: [],
      data: [],
      resi: '',
      problem: '',
      note: '',
      callback: false,
      disputeId: '',
      complainSolved: false,
      refundNumber: '',
      responseStatus: -1,
      fineProductsTotal: 0
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.callback !== undefined) {
      if (nextProps.callback !== this.state.callback) {
        this.props.getDetailDispute(this.state.disputeId)
        this.setState({
          callback: nextProps.callback,
          complainSolved: true
        })
      }
    }
    if (nextProps.dataComplain.status === 200) {
      const data = nextProps.dataComplain.orderDetail
      const limitDay = parseInt(moment.unix(data.limit_send_product).format('DD'))
      const limitMonth = parseInt(moment.unix(data.limit_send_product).format('MM')) - 1
      const limitTextMonth = this.state.months[limitMonth]
      const limitYear = moment.unix(data.limit_send_product).format('YYYY')

      this.setState({
        date: data.created_at,
        invoiceNumber: data.invoice.invoice_number,
        image: data.store.logo,
        shopName: data.store.name,
        status: data.status,
        statusSolution: data.solution,
        dataProduct: data.dispute_products,
        data: data.proofs,
        problem: data.problems,
        note: data.note,
        dateNotification: limitDay + ' ' + limitTextMonth + ' ' + limitYear,
        resi: data.dispute_number,
        disputeId: data.id,
        responseStatus: data.response_status,
        fineProductsTotal: data.fine_products.length
      })
      if (data.solution === 1) {
        this.setState({
          refundNumber: data.refund.refund_number
        })
      }
    } else if (nextProps.dataComplain.status !== 200 && nextProps.dataComplain.status !== 0) {
      ToastAndroid.show(nextProps.dataComplain.message, ToastAndroid.LONG)
    }
  }

  maskedDate (value) {
    const timeStampToDate = moment.unix(value).format('DD MMMM YYYY').toString()
    return timeStampToDate
  }

  renderNotification () {
    const { dateNotification, statusSolution, status, responseStatus, complainSolved, fineProductsTotal } = this.state
    let solution, responseSeller
    if (responseStatus !== 0 && fineProductsTotal > 0 && status === 8) {
      return (
        <View style={styles.notificationContainerBlue}>
          <Image source={Images.infoBlue} style={styles.imageInfo} />
          <Text style={styles.textInfoBlue}>
            Silahkan mengisi review dari beberapa barang barang di invoice ini, setelah itu kami akan
            mengirim dana refund ke saldo Anda
          </Text>
        </View>
      )
    } else if (complainSolved || status === 8 || status === 9) {
      return (
        <View style={styles.notificationContainerGreen}>
          <Image source={Images.infoDone} style={[styles.imageInfo, { marginTop: 2 }]} />
          <Text style={styles.textInfoGreen}>
            Komplain telah terselesaikan
          </Text>
        </View>
      )
    } else {
      if (statusSolution === 1) {
        solution = 'Refund Dana'
        responseSeller = 'Terima kasih telah bersifat kooperatif. Kini Admin akan mengirimkan ' +
          'kembali uang Anda. Dan segera setelah itu Admin akan menandai komplain ini ' +
          'sudah terselesaikan'
      } else {
        solution = 'Tukar Barang'
        responseSeller = 'Penjual telah mengirim ulang barang. Klik tombol ' +
        '"barang sudah saya terima" setelah Anda menerima barang tersebut.'
      }
      if (status === 1) {
        return (
          <View style={styles.notificationContainer}>
            <Image source={Images.infoOcher} style={styles.imageInfo} />
            <Text style={styles.textInfo}>
              Anda memilih solusi {solution}, untuk itu Anda harus mengirim barang kembali ke
              Seller , paling lambat tanggal {dateNotification}. Atau admin akan mengirimkan
              dana ke Seller
            </Text>
          </View>
        )
      } else if (status === 5) {
        return (
          <View style={styles.notificationContainerBlue}>
            <Image source={Images.infoBlue} style={styles.imageInfo} />
            <Text style={styles.textInfoBlue}>
              {responseSeller}
            </Text>
          </View>
        )
      } else if (responseStatus === 1 && fineProductsTotal === 0) {
        return (
          <View style={styles.notificationContainerBlue}>
            <Image source={Images.infoBlue} style={styles.imageInfo} />
            <Text style={styles.textInfoBlue}>
              Refund dana masih dalam proses
            </Text>
          </View>
        )
      }
    }
  }

  renderVerification () {
    const { status, resi, statusSolution } = this.state
    if (statusSolution === 2) {
      if (status === 5) {
        return (
          <View>
            {this.renderInfo('Nomor Resi', resi)}
            {this.renderInfo('Status Resi', 'Dalam Pengiriman')}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={() => this.confirm()}>
                <Text style={styles.textButton}>
                  Barang sudah saya terima
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )
      }
    }
  }

  renderButtonAddReview () {
    const { responseStatus, fineProductsTotal, status } = this.state
    if (responseStatus !== 0 && fineProductsTotal > 0 && status === 8) {
      return (
        <View style={[styles.dataContainer, { marginBottom: 30 }]}>
          <TouchableOpacity style={styles.button} onPress={() => this.review()}>
            <Text style={styles.textButton}>
              Beri Review untuk barang lainnya
            </Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  renderInfo (label, data) {
    return (
      <View style={styles.dataContainer}>
        <Text style={[styles.textLabel, {flex: 1}]}>{label}</Text>
        <Text style={styles.textData}>{data}</Text>
      </View>
    )
  }

  renderStatus () {
    let warna = Colors.red
    let teks = 'Menunggu Penyelesaian'
    if (this.state.complainSolved || this.state.status === 8 || this.state.status === 9) {
      warna = Colors.greenish
      teks = 'Terselesaikan'
    }
    return (
      <View style={styles.dataContainer}>
        <Text style={[styles.textLabel, {flex: 1}]}>Status Komplain</Text>
        <View style={[styles.warna, { backgroundColor: warna }]} />
        <Text style={styles.textData}>{teks}</Text>
      </View>
    )
  }

  renderSeller () {
    const { image, shopName } = this.state
    return (
      <View style={styles.dataContainer}>
        <Text style={[styles.textLabel, {flex: 1}]}>Penjual</Text>
        <Image source={{ uri: image }} style={styles.image} />
        <Text style={[styles.textData, { flex: 1 }]}>{shopName}</Text>
      </View>
    )
  }

  renderSolution () {
    const { statusSolution } = this.state
    let data
    if (statusSolution === 1) {
      data = 'REFUND'
    } else {
      data = 'EXCHANGE'
    }
    return (
      <View style={styles.dataContainer}>
        <Text style={[styles.textLabel, {flex: 1}]}>Solusi yang diinginkan</Text>
        <Text style={styles.textData}>{data}</Text>
      </View>
    )
  }

  renderRefund () {
    const { refundSolved, refundNominal, refundNumber } = this.state
    if (refundSolved) {
      return (
        <View>
          {this.renderInfo('Uang yang direfund', refundNominal)}
          {this.renderInfo('Nomor Refund', refundNumber)}
        </View>
      )
    }
  }

  renderLabel (label) {
    return (
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
      </View>
    )
  }

  renderProduct () {
    return (
      <ListView
        dataSource={this.dataSource.cloneWithRows(this.state.dataProduct)}
        renderRow={this.renderRow.bind(this)}
        enableEmptySections
      />
    )
  }

  renderRow (rowData) {
    return (
      <View style={styles.dataContainer}>
        <Image source={{uri: rowData.image}} style={styles.imageProduct} />
        <Text style={[styles.textData, { flex: 1, textAlign: 'left' }]}>{rowData.name}</Text>
      </View>
    )
  }

  renderProblem (problem) {
    return (
      <View style={styles.dataContainer}>
        <Text style={[styles.textData, { flex: 1, textAlign: 'left' }]}>{problem}</Text>
      </View>
    )
  }

  renderProof () {
    return (
      <View style={{ backgroundColor: Colors.snow, padding: 20 }}>
        <ListView
          horizontal
          enableEmptySections
          contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
          showsHorizontalScrollIndicator={false}
          dataSource={this.dataSource.cloneWithRows(this.state.data)}
          renderRow={this.renderRowProof.bind(this)}
        />
      </View>
    )
  }

  renderRowProof (rowData) {
    return (
      <Image source={{ uri: rowData.image }} style={styles.imageProduct} />
    )
  }

  confirm () {
    NavigationActions.buyercomplainconfirmation({
      type: ActionConst.PUSH,
      callback: this.state.callback
    })
  }

  review () {
    NavigationActions.buyercomplainrefundreview({
      type: ActionConst.PUSH,
      callback: this.state.callback
    })
  }

  render () {
    const { invoiceNumber, date, problem, note } = this.state
    var tempTransactionDate = this.maskedDate(date)
    return (
      <View style={styles.container}>
        {this.renderNotification()}
        <ScrollView>
          {this.renderVerification()}
          {this.renderButtonAddReview()}
          {this.renderInfo('No Invoice', invoiceNumber)}
          {this.renderInfo('Tanggal Transaksi', tempTransactionDate)}
          {this.renderStatus()}
          {this.renderSeller()}
          {this.renderSolution()}
          {this.renderRefund()}
          {this.renderLabel('Daftar Barang bermasalah')}
          {this.renderProduct()}
          {this.renderLabel('Masalah yang terjadi')}
          {this.renderProblem(problem)}
          {this.renderLabel('Foto Barang')}
          {this.renderProof()}
          {this.renderLabel('Keterangan')}
          {this.renderProblem(note)}
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataComplain: state.buyerComplainedOrderDetail
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDetailDispute: (id) => dispatch(transactionAction.getComplainedOrderDetailBuyer({id: id}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuyerComplainDetailItem)
