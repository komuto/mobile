import React from 'react'
import { View, Text, Image, TouchableOpacity, BackAndroid } from 'react-native'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Colors } from '../Themes'
// Styles
import styles from './Styles/TransaksiDetailStatusBarangStyle'

class TransaksiDetailStatusBarang extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      id: 93,
      nama: 'Sepatu Jogging',
      namaToko: 'Sport Station Shop',
      image: 'http://www.tokomesin.com/wp-content/uploads/2015/08/Sate-Ayam-Madura-tokomesin.jpeg',
      invoice: 'Invoice-72342382320/01/2017',
      status: this.props.statusBarang,
      resi: '238423423',
      alamat: 'Jakarta Selatan, DKI Jakarta',
      storeId: 0
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

  renderNote () {
    const { status } = this.state
    if (status === 'dikirim') {
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

  renderBarang () {
    const { nama, namaToko, image } = this.state
    return (
      <View style={styles.barangContainer}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.barang}>
          <Text style={[styles.textTitle, { marginBottom: 3 }]}>{nama}</Text>
          <Text style={styles.namaToko}>{namaToko}</Text>
        </View>
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

  renderStatus () {
    const { status } = this.state
    let warna, teks
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
    if (status === 'dikirim' || status === 'diterima') {
      if (status === 'dikirim') {
        teks = 'Dalam Pengiriman'
      } else {
        teks = 'Sudah Sampai'
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
    if (status === 'ditolak') {
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
    if (status === 'diterima') {
      return null
    } else {
      return this.renderButton()
    }
  }

  renderButton () {
    const { status } = this.state
    let teks
    if (status === 'ditolak') {
      teks = 'Lihat Saldo'
    } else {
      teks = 'Kirim Pesan ke Seller'
    }
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

  renderSecondBottom () {
    const { status } = this.state
    if (status === 'dikirim') {
      return (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.secondButton}
            onPress={() => NavigationActions.transactionitemreceived({
              type: ActionConst.PUSH
            })}
          >
            <Text style={styles.textSecondButton}>
              Barang sudah saya terima
            </Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  buttonPressed (teks) {
    if (teks.toLowerCase().includes('saldo')) {

    } else {
      NavigationActions.kirimpesan({
        type: ActionConst.PUSH,
        id: this.state.storeId,
        foto: this.state.image,
        namaToko: this.state.namaToko,
        alamat: this.state.alamat
      })
    }
  }

  render () {
    return (
      <View style={styles.container}>
        {this.renderNote()}
        {this.renderBarang()}
        {this.renderInvoice()}
        {this.renderStatus()}
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransaksiDetailStatusBarang)
