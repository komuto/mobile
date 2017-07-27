import React from 'react'
import { ScrollView, Text, View, TouchableOpacity, Image, TextInput } from 'react-native'
import { MaskService } from 'react-native-masked-text'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Images } from '../Themes'
// Styles
import styles from './Styles/PembayaranKartuKreditStyle'

class PembayaranKartuKredit extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      kode: 'BELANJAENAK',
      total: 320000,
      diskon: 10000,
      kodeUnik: 2000,
      nomor: '',
      masaBerlaku: '',
      cvv: '',
      nama: ''
    }
  }

  handleNomor = (text) => {
    this.setState({ nomor: text })
  }

  handleMasa = (text) => {
    this.setState({ masaBerlaku: text })
  }

  handleCVV = (text) => {
    this.setState({ cvv: text })
  }

  handleNama = (text) => {
    this.setState({ nama: text })
  }

  renderInfo () {
    const { nomor, masaBerlaku, cvv, nama } = this.state
    return (
      <View style={styles.infoContainer}>
        <View style={styles.titleContainer}>
          <Text style={[styles.textBold, { flex: 1 }]}>Data Kartu Kredit</Text>
          <Image source={Images.norton} style={styles.image} />
          <Image source={Images.verifiedVisa} style={styles.image} />
          <Image source={Images.verifiedMaster} style={styles.image} />
        </View>
        <View style={styles.bodyContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={nomor}
              keyboardType='numeric'
              onChangeText={this.handleNomor}
              placeholder='Nomor Kartu Kredit'
              underlineColorAndroid='transparent'
            />
          </View>
          <View style={styles.inputRowContainer}>
            <View style={[styles.inputContainer, { flex: 0.4, marginRight: 40 }]}>
              <TextInput
                style={styles.input}
                value={masaBerlaku}
                keyboardType='default'
                onChangeText={this.handleMasa}
                placeholder='Masa Berlaku (MM/YY)'
                underlineColorAndroid='transparent'
              />
            </View>
            <View style={[styles.inputContainer, { flex: 0.25 }]}>
              <TextInput
                style={styles.input}
                value={cvv}
                maxLength={3}
                keyboardType='numeric'
                onChangeText={this.handleCVV}
                placeholder='3 Digit CVV'
                underlineColorAndroid='transparent'
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={nama}
              keyboardType='numeric'
              autoCapitalize='characters'
              onChangeText={this.handleNama}
              placeholder='Nama Pemegang Kartu'
              underlineColorAndroid='transparent'
            />
          </View>
        </View>
      </View>
    )
  }

  renderRincian () {
    const { kode, total, diskon, kodeUnik } = this.state
    const sisaBayar = total - diskon - kodeUnik
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
    const hargaSisaBayar = MaskService.toMask('money', sisaBayar, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    return (
      <View style={styles.rincianContainer}>
        <View style={styles.rincianTitle}>
          <Text style={styles.textBold}>Rincian Harga</Text>
        </View>
        <View style={styles.rincianBody}>
          <View style={styles.rincianRow}>
            <Text style={[styles.textTitle, { flex: 1 }]}>Total Belanja</Text>
            <Text style={styles.textTitle}>{totalHarga}</Text>
          </View>
          <View style={styles.rincianRow}>
            <Text style={[styles.textGreen, { flex: 1 }]}>Kode Voucher {kode}</Text>
            <Text style={styles.textGreen}>{hargaDiskon}</Text>
          </View>
          <View style={styles.rincianRow}>
            <Text style={[styles.textTitle, { flex: 1 }]}>Kode Unik</Text>
            <Text style={styles.textTitle}>{hargaKodeUnik}</Text>
          </View>
        </View>
        <View style={styles.sisaPembayaran}>
          <View style={styles.rincianRow}>
            <Text style={[styles.textBold, { flex: 1 }]}>Sisa Pembayaran</Text>
            <Text style={styles.textBold}>{hargaSisaBayar}</Text>
          </View>
        </View>
      </View>
    )
  }

  renderButton () {
    return (
      <View style={styles.containerButton}>
        <Text style={[styles.time, { fontSize: 12 }]}>
          Dengan menekan tombol "Lanjutkan" Anda telah menyetujui Syarat dan Ketentuan dari Komuto
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => this.bayarKartuKredit()}>
          <Text style={styles.textI}>Proses Pembayaran</Text>
        </TouchableOpacity>
      </View>
    )
  }

  bayarKartuKredit () {
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.renderInfo()}
          {this.renderRincian()}
          {this.renderButton()}
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

export default connect(mapStateToProps, mapDispatchToProps)(PembayaranKartuKredit)
