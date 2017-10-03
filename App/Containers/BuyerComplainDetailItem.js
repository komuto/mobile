import React from 'react'
import { View, ScrollView, Text, Image, ListView } from 'react-native'
import { connect } from 'react-redux'
import moment from 'moment'
import { Images, Colors } from '../Themes'
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
      problem: 'Barang tidak sesuai deskripsi, Produk tidak lengkap, Barang rusak',
      note: 'Sepatu yang merah terdapat sobek pada sisi pinggirnya dan terlihat sudah lecekseperti sudah pernah dipakai karena ada bekas tanahnya'
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataComplain.status === 200) {
      const data = nextProps.dataComplain.orderDetail
      const day = parseInt(moment.unix(data.created_at).format('DD'))
      const month = parseInt(moment.unix(data.created_at).format('MM')) - 1
      const textMonth = this.state.months[month]
      const year = moment.unix(data.created_at).format('YYYY')
      this.setState({
        date: day + ' ' + textMonth + ' ' + year,
        invoiceNumber: data.invoice.invoice_number,
        image: data.store.logo,
        shopName: data.store.name,
        status: data.status,
        statusSolution: data.solution,
        dataProduct: data.dispute_products,
        data: data.proofs,
        problem: data.problems,
        note: data.note
      })
    }
  }

  renderNotification () {
    const { dateNotification } = this.state
    return (
      <View style={styles.notificationContainer}>
        <Image source={Images.infoOcher} style={styles.imageInfo} />
        <Text style={styles.textInfo}>
          Anda memilih solusi Refund Dana, untuk itu Anda harus mengirim barang kembali ke
          Seller , paling lambat tanggal {dateNotification}. atau admin akan mengirimkan
          dana ke Seller
        </Text>
      </View>
    )
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
        <Text style={styles.textData}>{shopName}</Text>
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

  render () {
    const { invoiceNumber, date, problem, note } = this.state
    return (
      <View style={styles.container}>
        {this.renderNotification()}
        <ScrollView>
          {this.renderInfo('No Invoice', invoiceNumber)}
          {this.renderInfo('Tanggal Transaksi', date)}
          {this.renderStatus()}
          {this.renderSeller()}
          {this.renderSolution()}
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuyerComplainDetailItem)
