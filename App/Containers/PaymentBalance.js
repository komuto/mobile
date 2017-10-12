import React from 'react'
import { ScrollView, Text, View, TouchableOpacity, ToastAndroid } from 'react-native'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import { MaskService } from 'react-native-masked-text'
import { connect } from 'react-redux'
import Spinner from '../Components/Spinner'
import { Colors } from '../Themes'
import * as userAction from '../actions/user'
import * as paymentAction from '../actions/payment'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
// Styles
import styles from './Styles/PembayaranKartuKreditStyle'

class PaymentBalance extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      kode: '',
      total: 0,
      diskon: 0,
      saldo: 0,
      idCart: '',
      loading: false
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataTransaction.status === 200) {
      this.setState({
        dataPembayaran: nextProps.dataTransaction.transaction.invoices[0].items,
        dataInvoice: nextProps.dataTransaction.transaction.invoices[0],
        getCartPaymentDetail: false,
        idCart: nextProps.dataTransaction.transaction.bucket.id
      }) //
      const discount = nextProps.dataTransaction.transaction.bucket.promo
      if (discount === '' || discount === undefined || discount === null) {
        this.setState({
          total: nextProps.dataTransaction.transaction.summary_transaction.total_price
        })
      } else {
        const typeDiscount = nextProps.dataTransaction.transaction.bucket.promo.type
        const tempTotal = nextProps.dataTransaction.transaction.summary_transaction.total_price
        if (typeDiscount === 0) {
          this.setState({
            diskon: parseInt(nextProps.dataTransaction.transaction.bucket.promo.percentage) * nextProps.dataTransaction.transaction.summary_transaction.total_price / 100,
            total: tempTotal - parseInt(nextProps.dataTransaction.transaction.bucket.promo.percentage) * nextProps.dataTransaction.transaction.summary_transaction.total_price / 100,
            kode: nextProps.dataTransaction.transaction.bucket.promo.promo_code
          })
        } else {
          this.setState({
            diskon: parseInt(nextProps.dataTransaction.transaction.bucket.promo.nominal),
            total: tempTotal - parseInt(nextProps.dataTransaction.transaction.bucket.promo.nominal),
            kode: nextProps.dataTransaction.transaction.bucket.promo.promo_code
          })
        }
      }
    } else if (nextProps.dataTransaction.status !== 200 && nextProps.dataTransaction.status !== 0) {
      ToastAndroid.show(nextProps.dataTransaction.message, ToastAndroid.LONG)
    }
    if (nextProps.dataBalance.status === 200) {
      this.setState({
        saldo: nextProps.dataBalance.balance
      })
    } else if (nextProps.dataBalance.status !== 200 && nextProps.dataBalance.status !== 0) {
      ToastAndroid.show(nextProps.dataBalance.message, ToastAndroid.LONG)
    }
    if (nextProps.dataPayment.status === 200) {
      NavigationActions.paymentsuccess({
        type: ActionConst.PUSH,
        from: 'payment'
      })
      this.setState({
        loading: false
      })
      nextProps.dataPayment.status = 0
    } else if (nextProps.dataPayment.status !== 200 && nextProps.dataPayment.status !== 0) {
      this.setState({
        loading: false
      })
      ToastAndroid.show('Pembayaran Gagal.. ' + nextProps.dataPayment.message, ToastAndroid.LONG)
    }
  }

  renderRincian () {
    const { kode, total, diskon, saldo } = this.state
    let sisaBayar = total - saldo
    let balanceUsed = total
    if (sisaBayar < 0) {
      sisaBayar = 0
      balanceUsed = saldo
    }
    let hargaDiskon, viewDiscount
    const totalHarga = MaskService.toMask('money', total + diskon, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    if (kode !== '') {
      hargaDiskon = MaskService.toMask('money', diskon, {
        unit: 'Rp -',
        separator: '.',
        delimiter: '.',
        precision: 3
      })
      balanceUsed = total - diskon
      return (
        <View style={styles.rincianRow}>
          <Text style={[styles.textGreen, { flex: 1 }]}>Kode Voucher {kode}</Text>
          <Text style={styles.textGreen}>{hargaDiskon}</Text>
        </View>
      )
    }
    const hargaSisaBayar = MaskService.toMask('money', sisaBayar, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    const hargaSaldo = MaskService.toMask('money', balanceUsed, {
      unit: 'Rp -',
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
          {viewDiscount}
          <View style={styles.rincianRow}>
            <Text style={[styles.textGreen, { flex: 1 }]}>Saldo</Text>
            <Text style={styles.textGreen}>{hargaSaldo}</Text>
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
    const { loading } = this.state
    if (!loading) {
      return (
        <View style={styles.containerButton}>
          <Text style={[styles.time, { fontSize: 12 }]}>
            Dengan menekan tombol "Lanjutkan" Anda telah menyetujui Syarat dan Ketentuan dari Komuto
          </Text>
          <TouchableOpacity style={styles.button} onPress={() => this.pay()}>
            <Text style={styles.textI}>Bayar dengan Saldo</Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <View style={styles.containerButton}>
          <Text style={[styles.time, { fontSize: 12 }]}>
            Dengan menekan tombol "Lanjutkan" Anda telah menyetujui Syarat dan Ketentuan dari Komuto
          </Text>
          <View style={styles.button}>
            <Spinner color={Colors.snow} />
          </View>
        </View>
      )
    }
  }

  pay () {
    this.setState({
      loading: true
    })
    this.props.payment(this.state.idCart)
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.renderRincian()}
          {this.renderButton()}
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataTransaction: state.transaction,
    dataBalance: state.balance,
    dataPayment: state.confirmation
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBalance: dispatch(userAction.getBalance()),
    payment: (id) => dispatch(paymentAction.balancePayment({id: id}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentBalance)
