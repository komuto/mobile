import React from 'react'
import { ScrollView, View, Text, Image, TouchableOpacity, BackAndroid } from 'react-native'
import { connect } from 'react-redux'
import { MaskService } from 'react-native-masked-text'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import * as userAction from '../actions/user'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import { Images } from '../Themes'
import styles from './Styles/BalanceStyle'

class Balance extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      balance: String(this.props.dataProfile.user.user.saldo_wallet),
      balanceItems: 10
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataProfile.status === 200) {
      this.setState({
        balance: String(nextProps.dataProfile.user.user.saldo_wallet)
      })
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

  renderBalance () {
    const { balance } = this.state
    const money = MaskService.toMask('money', balance, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
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
        <View style={styles.containerNumber}>
          <Text style={styles.number}>
            {String(this.state.balanceItems)}
          </Text>
        </View>
        <Image source={Images.rightArrow} style={styles.icon} />
      </TouchableOpacity>
    )
  }

  refill () {
    NavigationActions.balancerefill({ type: ActionConst.PUSH })
  }

  status () {
    NavigationActions.balancestatusrefill({ type: ActionConst.PUSH })
  }

  pull () {
    NavigationActions.balancepull({ type: ActionConst.PUSH })
  }

  statusPullBalance () {
    // NavigationActions.login({ type: ActionConst.PUSH })
    console.log('status pull')
  }

  history () {
    // NavigationActions.login({ type: ActionConst.PUSH })
    console.log('history')
  }

  render () {
    return (
      <View style={styles.container}>
        {this.renderBalance()}
        <ScrollView>
          {this.renderTitle('Isi Ulang')}
          {this.renderMenu(Images.getBalance, 'Isi Ulang Saldo', this.refill)}
          {this.renderMenu(Images.status, 'Status Pengisian', this.status)}
          {this.renderTitle('Penarikan Saldo')}
          {this.renderMenu(Images.pullBalance, 'Tarik Saldo', this.pull)}
          {this.renderStatusPenarikan()}
          {this.renderTitle(null)}
          {this.renderMenu(Images.iconHistory, 'Riwayat Saldo', this.history)}
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
    getPhone: dispatch(userAction.getPhone())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Balance)
