import React from 'react'
import { ScrollView, Text, View, Image, TouchableOpacity, ListView } from 'react-native'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { MaskService } from 'react-native-masked-text'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Images, Colors } from '../Themes'
// Styles
import styles from './Styles/TransaksiDibayarStyle'

class TransactionPaid extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      invoice: 'Invoice-83273847492/04/2017',
      sisaPembayaran: 308582,
      total: 320000,
      kode: 'BELANJAENAK',
      diskon: 10000,
      kodeUnik: 2000,
      expand: false,
      dataBarang: [
        {
          'name': 'Sepatu Jogging Nike Hitam',
          'image': 'https://slack-imgs.com/?c=1&o1=wi75.he75.si&url=https%3A%2F%2Fzeplin.io%2Fimg%2Ffavicon%2F228x228.png',
          'namaToko': 'Sports Station Shop',
          'status': 'ditolak'
        },
        {
          'name': 'Sepatu Jogging Nike Hitam',
          'image': 'https://slack-imgs.com/?c=1&o1=wi75.he75.si&url=https%3A%2F%2Fzeplin.io%2Fimg%2Ffavicon%2F228x228.png',
          'namaToko': 'Sports Station Shop',
          'status': 'menunggu'
        },
        {
          'name': 'Sepatu Jogging Nike Hitam',
          'image': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNgv8Jo26_DoIpp8Cakvp20ZW3n0daHkA9XlZ1_hfa8G-hce8FaA',
          'namaToko': 'Sports Station Shop',
          'status': 'diproses'
        },
        {
          'name': 'Sepatu Jogging Nike Hitam',
          'image': 'https://slack-imgs.com/?c=1&o1=wi75.he75.si&url=https%3A%2F%2Fzeplin.io%2Fimg%2Ffavicon%2F228x228.png',
          'namaToko': 'Sports Station Shop',
          'status': 'dikirim'
        },
        {
          'name': 'Sepatu Jogging Nike Hitam',
          'image': 'https://slack-imgs.com/?c=1&o1=wi75.he75.si&url=https%3A%2F%2Fzeplin.io%2Fimg%2Ffavicon%2F228x228.png',
          'namaToko': 'Sports Station Shop',
          'status': 'diterima'
        }
      ]
    }
  }

  renderInfo () {
    return (
      <View style={styles.batasPembayaran}>
        <Image source={Images.waktuHijau} style={styles.image} />
        <Text style={[styles.textPembayaran, { marginLeft: 10 }]}>
          Pembayaran Telah Diterima. Pesanan sudah dilanjutkan ke Seller.
        </Text>
      </View>
    )
  }

  renderExpand () {
    const { expand, total, diskon, kode, kodeUnik, sisaPembayaran } = this.state
    const totalHarga = MaskService.toMask('money', total, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    const hargaDiskon = MaskService.toMask('money', diskon, {
      unit: 'Rp -',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    const hargaKodeUnik = MaskService.toMask('money', kodeUnik, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    const hargaSisaBayar = MaskService.toMask('money', sisaPembayaran, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    if (expand) {
      return (
        <View style={styles.rincianContainer}>
          <View style={styles.bodyRincian}>
            <View style={styles.rowContainerRincian}>
              <Text style={[styles.textTitle, { flex: 1 }]}>Total Belanja</Text>
              <Text style={styles.textTitle}>{totalHarga}</Text>
            </View>
            <View style={styles.rowContainerRincian}>
              <Text style={[styles.textGreen, { flex: 1 }]}>Kode Voucher {kode}</Text>
              <Text style={styles.textGreen}>{hargaDiskon}</Text>
            </View>
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

  renderTagihan () {
    const { expand, sisaPembayaran } = this.state
    const hargaSisaBayar = MaskService.toMask('money', sisaPembayaran, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
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
      <View style={[styles.tagihanContainer, { marginTop: 20 }]}>
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
    let border
    if (rowData.status === 'diproses') {
      border = { borderLeftWidth: 3, borderLeftColor: Colors.bluesky, backgroundColor: Colors.backgroundVerified }
    }
    return (
      <TouchableOpacity
        style={[styles.containerBarang, border]}
        onPress={() => this.detailBarang(rowData.status)}
      >
        <Image source={{ uri: rowData.image }} style={styles.imageBarang} />
        <View style={styles.namaBarangContainer}>
          <Text style={styles.bold}>{rowData.name}</Text>
          <Text style={styles.textTitle}>{rowData.namaToko}</Text>
          {this.renderStatus(rowData.status)}
        </View>
        <Image source={Images.rightArrow} style={styles.arrow} />
      </TouchableOpacity>
    )
  }

  renderStatus (status) {
    let warna
    let teks
    if (status === 'ditolak') {
      warna = Colors.red
      teks = 'Ditolak oleh Seller'
    } else if (status === 'menunggu') {
      warna = Colors.fullOrange
      teks = 'Menunggu konfirmasi Seller'
    } else if (status === 'diproses') {
      warna = Colors.violet
      teks = 'Diproses oleh Seller'
    } else if (status === 'dikirim') {
      warna = Colors.bluesky
      teks = 'Barang sudah dikirim'
    } else if (status === 'diterima') {
      warna = Colors.greenish
      teks = 'Barang sudah diterima'
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

  detailBarang (statusBarang) {
    NavigationActions.transactiondetailstatus({
      type: ActionConst.PUSH,
      statusBarang: statusBarang
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionPaid)
