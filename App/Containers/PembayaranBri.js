import React from 'react'
import { ScrollView, Text, View, TouchableOpacity, Image, TextInput } from 'react-native'
import { MaskService } from 'react-native-masked-text'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Images } from '../Themes'
// Styles
import styles from './Styles/PembayaranBriStyle'

class PembayaranBri extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      kode: 'BELANJAENAK',
      total: 320000,
      diskon: 10000,
      kodeUnik: 2000,
      id: '',
      pass: ''
    }
  }

  handleID = (text) => {
    this.setState({ id: text })
  }

  handlePass = (text) => {
    this.setState({ pass: text })
  }

  renderInfo () {
    const { id, pass } = this.state
    return (
      <View style={styles.infoContainer}>
        <View style={styles.titleContainer}>
          <Text style={[styles.textBold, { flex: 1 }]}>Data Kartu Debet</Text>
          <Image source={Images.norton} style={styles.image} />
          <Image source={Images.epayBri} style={styles.image} />
        </View>
        <View style={styles.bodyContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={id}
              keyboardType='default'
              onChangeText={this.handleID}
              placeholder='User ID'
              underlineColorAndroid='transparent'
            />
          </View>
          <View style={[styles.inputContainer, { marginTop: 30 }]}>
            <TextInput
              style={styles.input}
              value={pass}
              keyboardType='default'
              onChangeText={this.handlePass}
              placeholder='Password'
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

export default connect(mapStateToProps, mapDispatchToProps)(PembayaranBri)
