import React from 'react'
import { ScrollView, Text, View, TouchableOpacity, Image, BackAndroid, ListView } from 'react-native'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { MaskService } from 'react-native-masked-text'
import * as paymentAction from '../actions/payment'
import * as cartAction from '../actions/cart'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Images } from '../Themes'
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
      idCart: this.props.idCart
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
        this.setState({
          total: temp,
          getCartPayment: false
        })
        this.props.getCartReset()
      }
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
    return (
      <ListView
        dataSource={this.dataSource.cloneWithRows(this.state.data)}
        renderRow={this.renderRow.bind(this)}
        enableEmptySections
      />
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

  atm () {
    NavigationActions.paymentvirtualaccount({
      type: ActionConst.PUSH
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {this.renderTotal()}
          {this.renderSaldo()}
          {this.renderListPayment()}
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataPaymentMethod: state.paymentMethods,
    dataCart: state.cart
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    paymentAction: dispatch(paymentAction.getPaymentMethods()),
    getCartReset: () => dispatch(cartAction.getCartReset()),
    getCart: dispatch(cartAction.getCart())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Payment)
