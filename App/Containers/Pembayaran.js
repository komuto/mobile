import React from 'react'
import { ScrollView, Text, View, TouchableOpacity, Image, BackAndroid, ListView } from 'react-native'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { MaskService } from 'react-native-masked-text'
import * as paymentAction from '../actions/payment'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Images } from '../Themes'
// Styles
import styles from './Styles/PembayaranStyle'

class Pembayaran extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      total: '250219',
      saldo: '300000',
      data: []
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
        onPress={() => this.detailPayment(rowData.type_text)}
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

  detailPayment (typeText) {
    if (typeText === null) {
      NavigationActions.pembayarantransferbank({
        type: ActionConst.PUSH
      })
    } else if (typeText === 'klikpay-bca') {

    } else if (typeText === 'mandiri-clickpay') {
      NavigationActions.pembayaranmandiripay({
        type: ActionConst.PUSH
      })
    } else if (typeText === 'bri-epay') {
      NavigationActions.pembayaranbri({
        type: ActionConst.PUSH
      })
    } else if (typeText === 'kartu-kredit') {
      NavigationActions.pembayarankartukredit({
        type: ActionConst.PUSH
      })
    } else if (typeText === 'alfamart') {
      NavigationActions.pembayaranalfamart({
        type: ActionConst.PUSH
      })
    } else if (typeText === 'doku-wallet') {
      NavigationActions.pembayarandoku({
        type: ActionConst.PUSH
      })
    }
  }

  detail () {
    NavigationActions.pembayarankeranjangbelanja({
      type: ActionConst.PUSH
    })
  }

  saldo () {
    NavigationActions.pembayaransaldo({
      type: ActionConst.PUSH
    })
  }

  atm () {
    NavigationActions.pembayaranvirtualaccount({
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
    dataPaymentMethod: state.paymentMethods
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    paymentAction: dispatch(paymentAction.getPaymentMethods())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pembayaran)
