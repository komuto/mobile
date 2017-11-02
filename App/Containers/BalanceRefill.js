import React from 'react'
import { ScrollView, Text, ListView, TouchableOpacity, Image, ToastAndroid } from 'react-native'
import { MaskService } from 'react-native-masked-text'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import { connect } from 'react-redux'
import * as saldoAction from '../actions/saldo'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import { Images } from '../Themes'
import styles from './Styles/BalanceRefillStyle'

class BalanceRefill extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      data: [],
      id: ''
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataSaldo.status === 200) {
      this.setState({
        data: nextProps.dataSaldo.nominals
      })
    } else if (nextProps.dataSaldo.status !== 200 && nextProps.dataSaldo.status !== 0) {
      ToastAndroid.show(nextProps.dataSaldo.message, ToastAndroid.LONG)
    }
    if (nextProps.dataSaldoToken.status === 200) {
      NavigationActions.paymentmidtrans({
        type: ActionConst.PUSH,
        token: nextProps.dataSaldoToken.token,
        from: 'balance'
      })
      nextProps.dataSaldoToken.status = 0
    } else if (nextProps.dataSaldoToken.status !== 200 && nextProps.dataSaldoToken.status !== 0) {
      ToastAndroid.show(nextProps.dataSaldoToken.message, ToastAndroid.LONG)
      nextProps.dataSaldoToken.status = 0
    }
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

  renderRow (rowData) {
    const money = this.maskedMoney(rowData.amount)
    return (
      <TouchableOpacity style={styles.menuContainer} onPress={() => this.refill(rowData.id)}>
        <Text style={styles.titleMenu}>{money}</Text>
        <Image source={Images.rightArrow} style={styles.icon} />
      </TouchableOpacity>
    )
  }

  refill (id) {
    this.setState({
      id: id
    })
    this.props.getSaldoToken(id)
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <ListView
          dataSource={this.dataSource.cloneWithRows(this.state.data)}
          renderRow={this.renderRow.bind(this)}
          enableEmptySections
        />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataSaldo: state.nominals,
    dataSaldoToken: state.saldoToken
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getNominals: dispatch(saldoAction.getNominals()),
    getSaldoToken: (id) => dispatch(saldoAction.getSaldoToken({id: id, platform: 'apps'}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BalanceRefill)
