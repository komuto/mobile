import React from 'react'
import { ScrollView, View, Text, Image, TouchableOpacity, BackAndroid, RefreshControl, ToastAndroid } from 'react-native'
import { connect } from 'react-redux'
import { MaskService } from 'react-native-masked-text'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import * as saldoAction from '../actions/saldo'
import * as userAction from '../actions/user'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import { Images, Colors } from '../Themes'
import styles from './Styles/BalanceStyle'

class BalanceX extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      balance: String(this.props.dataProfile.user.user.saldo_wallet),
      isRefreshing: false
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataProfile.status === 200) {
      this.setState({
        balance: String(nextProps.dataProfile.user.user.saldo_wallet),
        isRefreshing: false
      })
    } else if (nextProps.dataProfile.status !== 200 && nextProps.dataProfile.status !== 0) {
      this.setState({
        isRefreshing: false
      })
      ToastAndroid.show(nextProps.dataProfile.message, ToastAndroid.SHORT)
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

  renderBalance () {
    const { balance } = this.state
    const money = this.maskedMoney(balance)
    return (
      <View style={styles.balanceContainer}>
        <Text style={styles.textBalance}>{money}</Text>
      </View>
    )
  }

  renderTitle (title) {
    return (
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
    )
  }

  renderMenu (images, title, onpress) {
    return (
      <TouchableOpacity style={styles.menuContainer} onPress={() => onpress()}>
        <Image source={images} style={styles.icon} />
        <Text style={styles.titleMenu}>{title}</Text>
        <Image source={Images.rightArrow} style={styles.icon} />
      </TouchableOpacity>
    )
  }

  renderStatusPenarikan () {
    return (
      <TouchableOpacity style={styles.menuContainer} onPress={() => this.statusPullBalance()}>
        <Image source={Images.statusPullBalance} style={styles.icon} />
        <Text style={styles.titleMenu}>Status Penarikan Saldo</Text>
        {/* <View style={styles.containerNumber}>
          <Text style={styles.number}>
            {String(this.state.balanceItems)}
          </Text>
        </View> */}
        <Image source={Images.rightArrow} style={styles.icon} />
      </TouchableOpacity>
    )
  }

  refill () {
    NavigationActions.balancerefill({ type: ActionConst.PUSH })
  }

  status () {
    NavigationActions.balancestatusrefill({ type: ActionConst.PUSH })
    this.props.getStatusTopUp()
  }

  pull () {
    NavigationActions.balancepull({ type: ActionConst.PUSH })
  }

  statusPullBalance () {
    NavigationActions.balancestatuswithdraw({ type: ActionConst.PUSH })
    this.props.getStatusWitdhdraw()
  }

  history () {
    NavigationActions.balancehistory({ type: ActionConst.PUSH })
    this.props.getSaldoHistory()
  }

  refresh = () => {
    this.props.getBalance()
    this.setState({ isRefreshing: true })
  }

  render () {
    return (
      <View style={styles.container}>
        {this.renderBalance()}
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this.refresh}
              tintColor={Colors.red}
              colors={[Colors.red, Colors.bluesky, Colors.green, Colors.orange]}
              title='Loading...'
              titleColor={Colors.red}
              progressBackgroundColor={Colors.snow}
            />
          }
        >
          {this.renderTitle('Isi Ulang')}
          {this.renderMenu(Images.getBalance, 'Isi Ulang Saldo', this.refill)}
          {this.renderMenu(Images.status, 'Status Pengisian', this.status.bind(this))}
          {this.renderTitle('Penarikan Saldo')}
          {this.renderMenu(Images.pullBalance, 'Tarik Saldo', this.pull)}
          {this.renderStatusPenarikan()}
          {this.renderTitle(null)}
          {this.renderMenu(Images.iconHistory, 'Riwayat Saldo', this.history.bind(this))}
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataProfile: state.profile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPhone: dispatch(userAction.getPhone()),
    getBalance: () => dispatch(userAction.getProfile()),
    getSaldoHistory: () => dispatch(saldoAction.getSaldoHistory({
      page: 1,
      filter: ['commission', 'sale', 'topup', 'refund', 'buy', 'withdraw'],
      start_at: 1448841600,
      end_at: 1512000000}
    )),
    getStatusTopUp: () => dispatch(saldoAction.getTopupStatus()),
    getStatusWitdhdraw: () => dispatch(saldoAction.getWithdrawStatus())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BalanceX)
