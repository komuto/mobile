import React from 'react'
import { ScrollView, Text, View, TouchableOpacity } from 'react-native'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import { MaskService } from 'react-native-masked-text'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/PembayaranTransferBankStyle'

class PaymentVirtualAccount extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      kode: 'BELANJAENAK',
      total: 320000,
      diskon: 10000,
      kodeUnik: 2000
    }
  }

  renderBatasPembayaran () {
    return (
      <View style={styles.batasPembayaran}>
        <Text style={styles.textLabel}>Batas Pembayaran</Text>
        <Text style={styles.time}>1 hari : 20 jam : 30 menit</Text>
      </View>
    )
  }

  renderInfo () {
    return (
      <View style={styles.infoContainer}>
        <View style={styles.titleContainer}>
          <View style={styles.info}>
            <Text style={styles.textI}>i</Text>
          </View>
          <Text style={styles.textTitle}>Informasi Penting</Text>
        </View>
        <View style={styles.bodyContainer}>
          <View style={styles.listInfo}>
            <View style={styles.dot} />
            <Text style={styles.textLabel}>
              Hanya bisa menggunakan mesin ATM dan akan
              dikenakan biaya transfer sebesar Rp 6.500
            </Text>
          </View>
          <View style={styles.listInfo}>
            <View style={styles.dot} />
            <Text style={styles.textLabel}>
              Setelah menekan tombol "Bayar", Anda
              tidak bisa mengubah metode pembayaran
              untuk transaksi ini
            </Text>
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
        <TouchableOpacity style={styles.button} onPress={() => this.transferBank()}>
          <Text style={styles.textI}>Bayar dengan Virtual Account</Text>
        </TouchableOpacity>
      </View>
    )
  }

  transferBank () {
    NavigationActions.paymenttransferbankdetail({
      type: ActionConst.PUSH
    })
  }

  render () {
    return (
      <View style={styles.container}>
        {this.renderBatasPembayaran()}
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

export default connect(mapStateToProps, mapDispatchToProps)(PaymentVirtualAccount)
