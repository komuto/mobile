import React from 'react'
import { ScrollView, Text, View, TouchableOpacity } from 'react-native'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import { MaskService } from 'react-native-masked-text'
import { connect } from 'react-redux'
import Spinner from '../Components/Spinner'
import * as cartAction from '../actions/cart'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/PembayaranTransferBankStyle'

class PaymentTransferBank extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      kode: null,
      total: 0,
      diskon: 0,
      kodeUnik: 0,
      idPayment: this.props.idPayment,
      getDataCartPayment: true,
      loading: false
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataCart.status === 200) {
      if (this.state.getDataCartPayment) {
        let temp = 0
        nextProps.dataCart.cart.items.map((obj, i) =>
          (
            temp = temp + obj.total_price
          )
        )
        this.setState({
          total: temp,
          getDataCartPayment: false,
          idCart: nextProps.dataCart.cart.id,
          kodeUnik: nextProps.dataCart.cart.unique_code
        })
        if (nextProps.dataCart.cart.promo !== null) {
          if (nextProps.dataCart.cart.promo.type === 0) {
            this.setState({
              diskon: parseInt(nextProps.dataCart.cart.promo.percentage) * temp / 100,
              kode: nextProps.dataCart.cart.promo.promo_code
            })
          } else {
            this.setState({
              diskon: nextProps.dataCart.cart.promo,
              kode: nextProps.dataCart.cart.promo.promo_code
            })
          }
        }
        this.props.getCartReset()
      }
    } else if (nextProps.dataCart.status > 200) {
      this.setState({
        data: [],
        getDataCartPayment: false,
        isFetching: false
      })
    }
    if (nextProps.dataCheckout.status === 200) {
      this.setState({
        loading: false
      })
      NavigationActions.paymenttransferbankdetail({
        type: ActionConst.RESET
      })
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
            <Text style={styles.textLabel}>Transfer beda bank akan dikenakan biaya{'\n'}sebesar Rp 6.500</Text>
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

  renderRincian () {
    const { kode, total, diskon, kodeUnik } = this.state
    const sisaBayar = total - diskon + kodeUnik
    let viewDiscount
    const totalHarga = MaskService.toMask('money', total, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    if (kode !== null) {
      const hargaDiskon = MaskService.toMask('money', diskon, {
        unit: 'Rp -',
        separator: '.',
        delimiter: '.',
        precision: 3
      })
      viewDiscount = (
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
            <Text style={[styles.textTitle, { flex: 1 }]}>Kode Unik</Text>
            <Text style={styles.textTitle}>{kodeUnik}</Text>
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
    let viewButton
    if (!loading) {
      viewButton = (
        <TouchableOpacity style={styles.button} onPress={() => this.transferBank()}>
          <Text style={styles.textI}>Bayar dengan Transfer Bank</Text>
        </TouchableOpacity>
      )
    } else {
      viewButton = (
        <TouchableOpacity style={styles.button} onPress={() => this.transferBank()}>
          <Spinner />
        </TouchableOpacity>
      )
    }
    return (
      <View style={styles.containerButton}>
        <Text style={[styles.time, { fontSize: 12 }]}>
          Dengan menekan tombol "Lanjutkan" Anda telah menyetujui Syarat dan Ketentuan dari Komuto
        </Text>
        {viewButton}
      </View>
    )
  }

  transferBank () {
    const { idPayment } = this.state
    this.setState({
      loading: true
    })
    this.props.checkout(idPayment)
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
    dataCart: state.cart,
    dataCheckout: state.checkout
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCart: dispatch(cartAction.getCart()),
    getCartReset: () => dispatch(cartAction.getCartReset()),
    checkout: (idPayment) => dispatch(cartAction.checkout({payment_method_id: idPayment}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentTransferBank)
