import React from 'react'
import { ScrollView, View, Text, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { MaskService } from 'react-native-masked-text'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import { Images } from '../Themes'
import styles from './Styles/BalanceStyle'

class Balance extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      balance: 500000,
      balanceItems: 10
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Balance)
