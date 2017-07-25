import React from 'react'
import { ScrollView, Text, View, ListView, Image } from 'react-native'
import { connect } from 'react-redux'
import { MaskService } from 'react-native-masked-text'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/PembayaranKeranjangBelanjaStyle'

class PembayaranKeranjangBelanja extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      dataPembayaran: [
        {
          'image': 'https://slack-imgs.com/?c=1&o1=wi75.he75.si&url=https%3A%2F%2Fzeplin.io%2Fimg%2Ffavicon%2F228x228.png',
          'name': 'Sepatu Vans',
          'countProduct': '2',
          'nameAddress': 'Rumah',
          'address': 'Jalan Tampomas no 9',
          'province': 'Sleman Yogyakarta, 55121',
          'phone': '0973918',
          'kurir': 'JNE',
          'paket': 'Regular',
          'asuransi': 'Tidak',
          'catatan': 'Saya yang merah ada garis-garis',
          'subtotal': 100000,
          'biayaAsuransi': 2000,
          'ongkir': 28000
        },
        {
          'image': 'https://slack-imgs.com/?c=1&o1=wi75.he75.si&url=https%3A%2F%2Fzeplin.io%2Fimg%2Ffavicon%2F228x228.png',
          'name': 'Sepatu Nike',
          'countProduct': '1',
          'nameAddress': 'Kantor',
          'address': 'Jalan Lele no 9',
          'province': 'Bantul Yogyakarta, 55121',
          'phone': '23848',
          'kurir': 'TIKI',
          'paket': 'Regular',
          'asuransi': 'Ya',
          'catatan': 'Yang biru kalau bisa ngirimnya cepet',
          'subtotal': 100000,
          'biayaAsuransi': 2000,
          'ongkir': 28000
        }
      ],
      total: 0,
      namaDiskon: 'BELANJAENAK',
      diskon: 20000
    }
  }

  renderListView () {
    return (
      <ListView
        dataSource={this.dataSource.cloneWithRows(this.state.dataPembayaran)}
        renderRow={this.renderRow.bind(this)}
        enableEmptySections
      />
    )
  }

  renderRow (rowData) {
    return (
      <View style={styles.dataContainer}>
        <View style={styles.product}>
          <Image source={{ uri: rowData.image }} style={styles.image} />
          <View style={styles.dataProduk}>
            <Text style={styles.textNamaProduk}>{rowData.name}</Text>
            <Text style={styles.textJumlah}>Jumlah: {rowData.countProduct}</Text>
          </View>
        </View>
        <View style={styles.alamatContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.textNamaProduk}>Alamat Pengiriman</Text>
          </View>
          <Text style={styles.textAlamat}>{rowData.nameAddress}</Text>
          <Text style={styles.textAlamat}>{rowData.address}</Text>
          <Text style={styles.textAlamat}>{rowData.province}</Text>
          <Text style={styles.textAlamat}>Telp: {rowData.phone}</Text>
        </View>
        {this.renderInfo('Kurir Pengiriman', rowData.kurir)}
        {this.renderInfo('Paket Pengiriman', rowData.paket)}
        {this.renderInfo('Asuransi', rowData.asuransi)}
        <View style={styles.catatanContainer}>
          <Text style={styles.textNamaProduk}>Catatan</Text>
          <Text style={styles.textAlamat}>{rowData.catatan}</Text>
        </View>
        {this.renderRincian(rowData.subtotal, rowData.biayaAsuransi, rowData.ongkir)}
      </View>
    )
  }

  renderInfo (label, data) {
    return (
      <View style={styles.infoContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.textNamaProduk}>{label}</Text>
        </View>
        <Text style={styles.textAlamat}>{data}</Text>
      </View>
    )
  }

  renderRincian (subtotal, biayaAsuransi, ongkir) {
    const total = subtotal + biayaAsuransi + ongkir
    const totalSubtotal = MaskService.toMask('money', subtotal, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    const totalBiayaAsuransi = MaskService.toMask('money', biayaAsuransi, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    const totalOngkir = MaskService.toMask('money', ongkir, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    const totalBiaya = MaskService.toMask('money', total, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    return (
      <View style={styles.rincianContainer}>
        <View style={styles.labelRincianContainer}>
          <Text style={styles.textNamaProduk}>Rincian Harga</Text>
        </View>
        <View style={styles.rincian}>
          <View style={styles.labelContainer}>
            <Text style={styles.textRincian}>Subtotal</Text>
          </View>
          <Text style={styles.textRincian}>{totalSubtotal}</Text>
        </View>
        <View style={styles.rincian}>
          <View style={styles.labelContainer}>
            <Text style={styles.textRincian}>Biaya Asuransi</Text>
          </View>
          <Text style={styles.textRincian}>{totalBiayaAsuransi}</Text>
        </View>
        <View style={styles.rincian}>
          <View style={styles.labelContainer}>
            <Text style={styles.textRincian}>Ongkos Kirim</Text>
          </View>
          <Text style={styles.textRincian}>{totalOngkir}</Text>
        </View>
        <View style={styles.rincian}>
          <View style={styles.labelContainer}>
            <Text style={styles.textRincianTotal}>Total</Text>
          </View>
          <Text style={styles.textRincianTotal}>{totalBiaya}</Text>
        </View>
      </View>
    )
  }

  renderTotal () {
    const { dataPembayaran, diskon, namaDiskon } = this.state
    let total = 0
    dataPembayaran.map((data, i) => {
      total = total + data.subtotal + data.biayaAsuransi + data.ongkir
    })
    const sisaPembayaran = total - diskon
    const totalBiaya = MaskService.toMask('money', total, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    const totalDiskon = MaskService.toMask('money', diskon, {
      unit: 'Rp -',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    const totalSisa = MaskService.toMask('money', sisaPembayaran, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    return (
      <View style={styles.totalHargaContainer}>
        {this.renderInfo('Rincian Harga Total')}
        <View style={styles.rincianTotalContainer}>
          <View style={styles.rincian}>
            <View style={styles.labelContainer}>
              <Text style={styles.textRincianTotal}>Total Belanja</Text>
            </View>
            <Text style={styles.textRincianTotal}>{totalBiaya}</Text>
          </View>
          <View style={styles.rincian}>
            <View style={styles.labelContainer}>
              <Text style={styles.textRincianTotalHijau}>Kode Voucher {namaDiskon}</Text>
            </View>
            <Text style={styles.textRincianTotalHijau}>{totalDiskon}</Text>
          </View>
          <View style={styles.sisaPembayaran}>
            <View style={styles.labelContainer}>
              <Text style={styles.sisaPembayaranText}>Sisa Pembayaran</Text>
            </View>
            <Text style={styles.sisaPembayaranText}>{totalSisa}</Text>
          </View>
        </View>
      </View>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.renderListView()}
          {this.renderTotal()}
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

export default connect(mapStateToProps, mapDispatchToProps)(PembayaranKeranjangBelanja)
