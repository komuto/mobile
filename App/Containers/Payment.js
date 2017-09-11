import React from 'react'
import { AsyncStorage, Text, View, TouchableOpacity, Image, BackAndroid, ListView } from 'react-native'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import { connect } from 'react-redux'
import Spinner from '../Components/Spinner'
import { MaskService } from 'react-native-masked-text'
import * as paymentAction from '../actions/payment'
import * as cartAction from '../actions/cart'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Images, Colors } from '../Themes'
// Styles
import styles from './Styles/PembayaranStyle'

class Payment extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      total: '0',
      saldo: '300000',
      data: [],
      getCartPayment: true,
      idCart: this.props.idCart,
      token: '',
      loading: false
    }
  }

  componentWillMount () {
    AsyncStorage.getItem('token').then(token => {
      this.setState({
        token
      })
    }).done()
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

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataPaymentMethod.status === 200) {
      this.setState({
        data: nextProps.dataPaymentMethod.paymentMethods
      })
    }
    if (nextProps.dataCart.status === 200) {
      if (this.state.getCartPayment) {
        let temp = 0
        nextProps.dataCart.cart.items.map((obj, i) =>
          (
            temp = temp + obj.total_price
          )
        )
        if (nextProps.dataCart.cart.promo !== null) {
          if (nextProps.dataCart.cart.promo.type === 0) {
            temp = temp - parseInt(nextProps.dataCart.cart.promo.percentage) * temp / 100
          } else {
            temp = temp - parseInt(nextProps.dataCart.cart.promo.nominal)
          }
        }
        this.setState({
          total: temp,
          getCartPayment: false
        })
        this.props.getCartReset()
      }
    } if (nextProps.dataCheckout.status === 200) {
      nextProps.dataCheckout.status = 0
      NavigationActions.paymentmidtrans({
        type: ActionConst.PUSH,
        token: nextProps.dataToken.token
      })
    }
    if (nextProps.dataToken.status === 200) {
      nextProps.dataToken.status = 0
      this.setState({
        loading: false
      })
      console.log('snap token', nextProps.dataToken.token)
      this.props.checkout(false)
    }
  }

  renderTotal () {
    const { total } = this.state
    const totalHarga = MaskService.toMask('money', total, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    return (
      <View style={styles.totalContainer}>
        <View style={styles.total}>
          <View style={styles.biaya}>
            <Text style={[styles.textLabel, { marginBottom: 7 }]}>Total Pembayaran</Text>
            <Text style={styles.textTotal}>{totalHarga}</Text>
          </View>
          <TouchableOpacity style={styles.buttonDetail} onPress={() => this.detail()}>
            <Text style={styles.textBiru}>Detail</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.noteContainer}>
          <Text style={styles.textNote}>Harga sudah termasuk pajak dan biaya lainnya</Text>
        </View>
      </View>
    )
  }

  renderSaldo () {
    const { saldo } = this.state
    const totalSaldo = MaskService.toMask('money', saldo, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    return (
      <TouchableOpacity activeOpacity={0.5} style={styles.totalContainer} onPress={() => this.saldo()}>
        <View style={styles.total}>
          <View style={styles.textContainer}>
            <Text style={styles.textLabel}>Saldo ({totalSaldo})</Text>
          </View>
          <Image source={Images.rightArrow} style={styles.imagePicker} />
        </View>
      </TouchableOpacity>
    )
  }

  renderListPayment () {
    const { loading } = this.state
    if (!loading) {
      return (
        <TouchableOpacity activeOpacity={0.5} style={styles.totalContainer} onPress={() => this.midtrans()}>
          <View style={styles.total}>
            <View style={styles.textContainer}>
              <Text style={styles.textLabel}>Metode Pembayaran Lain</Text>
            </View>
            <Image source={Images.rightArrow} style={styles.imagePicker} />
          </View>
        </TouchableOpacity>
      )
    }
    return (
      <View activeOpacity={0.5} style={styles.totalContainer}>
        <View style={[styles.total, { justifyContent: 'center' }]}>
          <Spinner color={Colors.red} />
        </View>
      </View>
    )
  }

  renderRow (rowData) {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={[styles.totalContainerBank, { marginBottom: 15 }]}
        onPress={() => this.detailPayment(rowData.type_text, rowData.id)}
      >
        <View style={styles.totalBank}>
          <View style={styles.textContainer}>
            <Text style={styles.textLabel}>{rowData.name}</Text>
          </View>
          <Image source={Images.rightArrow} style={styles.imagePicker} />
        </View>
        <View style={styles.totalBank}>
          <Image source={{ uri: rowData.logo }} style={styles.imageBank} />
        </View>
      </TouchableOpacity>
    )
  }

  detailPayment (typeText, idPayment) {
    const { idCart } = this.state
    if (typeText === null) {
      NavigationActions.paymenttransferbank({
        type: ActionConst.PUSH,
        idPayment: idPayment
      })
    } else if (typeText === 'klikpay-bca') {

    } else if (typeText === 'mandiri-clickpay') {
      NavigationActions.paymentmandiripay({
        type: ActionConst.PUSH,
        idCart: idCart
      })
    } else if (typeText === 'bri-epay') {
      NavigationActions.paymentbri({
        type: ActionConst.PUSH,
        idCart: idCart
      })
    } else if (typeText === 'kartu-kredit') {
      NavigationActions.paymentcreditcard({
        type: ActionConst.PUSH,
        idCart: idCart
      })
    } else if (typeText === 'alfamart') {
      NavigationActions.paymentalfamart({
        type: ActionConst.PUSH,
        idCart: idCart
      })
    } else if (typeText === 'doku-wallet') {
      NavigationActions.paymentdoku({
        type: ActionConst.PUSH,
        idCart: idCart
      })
    }
  }

  detail () {
    NavigationActions.paymentcart({
      type: ActionConst.PUSH
    })
  }

  saldo () {
    NavigationActions.paymentbalance({
      type: ActionConst.PUSH
    })
  }

  midtrans () {
    this.setState({
      loading: true
    })
    this.props.getSnapToken()
  }

  atm () {
    NavigationActions.paymentvirtualaccount({
      type: ActionConst.PUSH
    })
  }

  render () {
    return (
      <View style={styles.container}>
        {this.renderTotal()}
        {this.renderSaldo()}
        {this.renderListPayment()}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataPaymentMethod: state.paymentMethods,
    dataCart: state.cart,
    dataCheckout: state.checkout,
    dataToken: state.snapToken
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSnapToken: () => dispatch(paymentAction.getMidtransToken()),
    getCartReset: () => dispatch(cartAction.getCartReset()),
    getCart: dispatch(cartAction.getCart()),
    checkout: (wallet) => dispatch(cartAction.checkout({is_wallet: wallet}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Payment)
