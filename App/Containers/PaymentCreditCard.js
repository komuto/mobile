import React from 'react'
import { ScrollView, Text, View, TouchableOpacity, Image, TextInput, Modal } from 'react-native'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import { MaskService } from 'react-native-masked-text'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Images } from '../Themes'
// Styles
import styles from './Styles/PembayaranKartuKreditStyle'

class PaymentCreditCard extends React.Component {

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
      nama: '',
      modalGagal: false
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

  renderRincian () {
    const { kode, total, diskon, kodeUnik } = this.state
    const sisaBayar = total - diskon - kodeUnik
    const totalHarga = this.maskedMoney(total)
    const hargaDiskon = this.maskedMoney(diskon)
    const hargaKodeUnik = this.maskedMoney(kodeUnik)
    const hargaSisaBayar = this.maskedMoney(sisaBayar)
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
        <TouchableOpacity style={styles.button} onPress={() => this.notifikasi()}>
          <Text style={styles.textI}>Proses Pembayaran</Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderModalGagal () {
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.modalGagal}
        onRequestClose={() => this.setState({ modalGagal: false })}
        >
        <View style={styles.modalContainer}>
          <View style={styles.containerNotifikasi}>
            <View style={styles.empty} />
            <Text style={styles.textBold}>Pembayaran Gagal</Text>
            <Text style={styles.textGagal}>
              Mohon maaf kami tidak berhasil
              melakukan pembayaran Anda
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={styles.button} onPress={() => this.cobaLagi()}>
                <Text style={styles.textI}>Coba Lagi</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={styles.metode} onPress={() => this.pembayaran()}>
                <Text style={styles.textBlue}>Pilih Metode Pembayaran Lain</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View >
      </Modal>
    )
  }

  notifikasi () {
    NavigationActions.paymentsuccess({
      type: ActionConst.PUSH
    })
    // this.setState({
    //   modalGagal: true
    // })
  }

  cobaLagi () {
    this.setState({
      modalGagal: false
    })
  }

  pembayaran () {
    this.setState({
      modalGagal: false
    })
    NavigationActions.pop()
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.renderInfo()}
          {this.renderRincian()}
          {this.renderButton()}
        </ScrollView>
        {this.renderModalGagal()}
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

export default connect(mapStateToProps, mapDispatchToProps)(PaymentCreditCard)
