import React from 'react'
import { ScrollView, Text, View, ListView, Image, BackAndroid } from 'react-native'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { MaskService } from 'react-native-masked-text'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/PembayaranDetailBarangStyle'

class PembayaranDetailBarang extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      image: 'https://slack-imgs.com/?c=1&o1=wi75.he75.si&url=https%3A%2F%2Fzeplin.io%2Fimg%2Ffavicon%2F228x228.png',
      name: 'Sepatu Vans',
      countProduct: '2',
      nameAddress: 'Rumah',
      address: 'Jalan Tampomas no 9',
      province: 'Sleman Yogyakarta, 55121',
      phone: '0973918',
      kurir: 'JNE',
      paket: 'Regular',
      asuransi: 'Tidak',
      catatan: 'Saya yang merah ada garis-garis',
      subtotal: 100000,
      biayaAsuransi: 2000,
      ongkir: 28000,
      total: 0,
      namaDiskon: 'BELANJAENAK',
      diskon: 20000
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

  renderListView () {
    const {
      image, name, countProduct, nameAddress, address, province, phone, kurir, paket, asuransi, catatan, subtotal, biayaAsuransi, ongkir
    } = this.state
    return (
      <View style={styles.dataContainer}>
        <View style={styles.product}>
          <Image source={{ uri: image }} style={styles.image} />
          <View style={styles.dataProduk}>
            <Text style={styles.textNamaProduk}>{name}</Text>
            <Text style={styles.textJumlah}>Jumlah: {countProduct}</Text>
          </View>
        </View>
        <View style={styles.alamatContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.textNamaProduk}>Alamat Pengiriman</Text>
          </View>
          <Text style={styles.textAlamat}>{nameAddress}</Text>
          <Text style={styles.textAlamat}>{address}</Text>
          <Text style={styles.textAlamat}>{province}</Text>
          <Text style={styles.textAlamat}>Telp: {phone}</Text>
        </View>
        {this.renderInfo('Kurir Pengiriman', kurir)}
        {this.renderInfo('Paket Pengiriman', paket)}
        {this.renderInfo('Asuransi', asuransi)}
        <View style={styles.catatanContainer}>
          <Text style={styles.textNamaProduk}>Catatan</Text>
          <Text style={styles.textAlamat}>{catatan}</Text>
        </View>
        {this.renderRincian(subtotal, biayaAsuransi, ongkir)}
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

  render () {
    return (
      <View style={styles.container}>
        <ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(PembayaranDetailBarang)
