import React from 'react'
import { ScrollView, Text, View, TouchableOpacity, Image, TextInput } from 'react-native'
import { MaskService } from 'react-native-masked-text'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Images } from '../Themes'
// Styles
import styles from './Styles/PembayaranMandiriPayStyle'

class PembayaranMandiriPay extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      kode: 'BELANJAENAK',
      total: 320000,
      diskon: 10000,
      kodeUnik: 2000,
      nomor: '',
      code1: '',
      code2: '',
      code3: '',
      responToken: ''
    }
  }

  handleNomor = (text) => {
    this.setState({ nomor: text })
  }

  handleCode1 = (text) => {
    this.setState({ code1: text })
  }

  handleCode2 = (text) => {
    this.setState({ code2: text })
  }

  handleCode3 = (text) => {
    this.setState({ code3: text })
  }

  handleResponToken = (text) => {
    this.setState({ responToken: text })
  }

  renderInfo () {
    const { nomor } = this.state
    return (
      <View style={styles.infoContainer}>
        <View style={styles.titleContainer}>
          <Text style={[styles.textBold, { flex: 1 }]}>Data Kartu Debet</Text>
          <Image source={Images.norton} style={styles.image} />
          <Image source={Images.mandiriClickPay} style={styles.image} />
        </View>
        <View style={styles.bodyContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={nomor}
              keyboardType='numeric'
              onChangeText={this.handleNomor}
              placeholder='Masukkan nomor kartu debet Mandiri Anda'
              underlineColorAndroid='transparent'
            />
          </View>
          <Text style={styles.textInfo}>
            Pastikan bahwa kartu Anda telah diaktivasi melalui
            layanan Mandiri Internet Banking pada menu
            Authorized Payment agar dapat melakukan transaksi
            Internet Payment
          </Text>
        </View>
      </View>
    )
  }

  renderCode () {
    const { code1, code2, code3 } = this.state
    return (
      <View style={styles.rincianContainer}>
        <View style={styles.peringatanContainer}>
          <Text style={styles.textPeringatan}>
            Gunakan Token PIN Mandiri untuk bertransaksi. Nilai
            yang dimasukkan pada token Anda (Metode APPLI 3)
          </Text>
        </View>
        <View style={styles.codeRow}>
          <Text style={[styles.textCode, { flex: 1 }]}>Challenge Code 1</Text>
          <View style={[styles.inputContainer, { flex: 1, borderBottomWidth: 0 }]}>
            <TextInput
              style={styles.inputCode}
              value={code1}
              keyboardType='numeric'
              onChangeText={this.handleCode1}
              placeholder='code'
              underlineColorAndroid='transparent'
            />
          </View>
        </View>
        <View style={styles.codeRow}>
          <Text style={[styles.textCode, { flex: 1 }]}>Challenge Code 2</Text>
          <View style={[styles.inputContainer, { flex: 1, borderBottomWidth: 0 }]}>
            <TextInput
              style={styles.inputCode}
              value={code2}
              keyboardType='numeric'
              onChangeText={this.handleCode2}
              placeholder='code'
              underlineColorAndroid='transparent'
            />
          </View>
        </View>
        <View style={[styles.codeRow, { borderBottomWidth: 0 }]}>
          <Text style={[styles.textCode, { flex: 1 }]}>Challenge Code 3</Text>
          <View style={[styles.inputContainer, { flex: 1, borderBottomWidth: 0 }]}>
            <TextInput
              style={styles.inputCode}
              value={code3}
              keyboardType='numeric'
              onChangeText={this.handleCode3}
              placeholder='code'
              underlineColorAndroid='transparent'
            />
          </View>
        </View>
      </View>
    )
  }

  renderRespon () {
    const { responToken } = this.state
    return (
      <View style={styles.rincianContainer}>
        <View style={styles.responContainer}>
          <TextInput
            style={[styles.inputCode, { textAlign: 'left' }]}
            value={responToken}
            keyboardType='numeric'
            onChangeText={this.handleResponToken}
            placeholder='Masukkan Respon Token'
            underlineColorAndroid='transparent'
          />
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
          {this.renderCode()}
          {this.renderRespon()}
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

export default connect(mapStateToProps, mapDispatchToProps)(PembayaranMandiriPay)
