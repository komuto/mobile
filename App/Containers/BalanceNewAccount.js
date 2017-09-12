import React from 'react'
import { View, ScrollView, Text, TouchableOpacity, Image, Modal, ListView, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import * as userAction from '../actions/user'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Images } from '../Themes'
// Styles
import styles from './Styles/BalanceNewAccountStyle'

class BalanceNewAccount extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      bank: 'Pilih Bank Tujuan',
      modalBank: false,
      dataBanks: [...[{
        code: -1,
        id: -1,
        logo: null,
        name: 'Pilih Bank Tujuan',
        status: -1,
        status_at: -1
      }], ...this.props.dataBanks.banks],
      nameBank: '',
      statusBank: false,
      branch: '',
      account: '',
      name: '',
      code: '',
      bankId: -1
    }
  }

  componentWillReceiveProps (nextProps) {
    const { bankId, name, account, branch } = this.state
    if (nextProps.codeOtp.status === 200) {
      this.setState({
        loading: false
      })
      NavigationActions.otpcode({
        type: ActionConst.PUSH,
        typeVerifikasi: 'newaccountbalance',
        fieldPass: this.props.dataPhone.phone,
        idAccount: -1,
        nameAccount: name,
        nomerRek: account,
        idBank: bankId,
        cabangBank: branch,
        title: 'New Account',
        textButton: 'Verifikasi kode OTP'
      })
      nextProps.codeOtp.status = 0
    }
  }

  handleNamebank = (text) => {
    this.setState({ nameBank: text })
  }

  handleBranch = (text) => {
    this.setState({ branch: text })
  }

  handleAccount = (text) => {
    this.setState({ account: text })
  }

  handleName = (text) => {
    this.setState({ name: text })
  }

  renderHeader () {
    return (
      <View style={styles.headerContainer}>
        <Text style={[styles.textTitle, { flex: 1 }]}>Tambah Data Rekening</Text>
        <TouchableOpacity onPress={() => NavigationActions.pop()}>
          <Image source={Images.close} style={styles.icon} />
        </TouchableOpacity>
      </View>
    )
  }

  renderInputBank () {
    const { bank } = this.state
    return (
      <TouchableOpacity style={styles.row} onPress={() => this.setState({ modalBank: true })}>
        <Text style={[styles.textDate, {flex: 1}]}>{bank}</Text>
        <Image style={styles.arrow} source={Images.down} />
      </TouchableOpacity>
    )
  }

  renderModalBank () {
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.modalBank}
        onRequestClose={() => this.setState({ modalBank: false })}
        >
        <TouchableOpacity style={styles.modalContainer} onPress={() => this.setState({ modalBank: false })}>
          <ScrollView style={styles.menuModalContainer}>
            <ListView
              dataSource={this.dataSource.cloneWithRows(this.state.dataBanks)}
              renderRow={this.renderListBank.bind(this)}
              enableEmptySections
            />
          </ScrollView>
        </TouchableOpacity>
      </Modal>
    )
  }

  renderListBank (rowData) {
    return (
      <TouchableOpacity
        style={[styles.menuLaporkan, { padding: 15 }]}
        activeOpacity={0.8}
        onPress={() => {
          this.onPressBank(rowData.name, rowData.id, rowData.code)
        }}
      >
        <Text style={[styles.textBagikan, { marginLeft: 0 }]}>{rowData.name}</Text>
      </TouchableOpacity>
    )
  }

  onPressBank (name, id, code) {
    this.setState({
      bank: name,
      modalBank: false,
      statusBank: false,
      bankId: id,
      code: code
    })
  }

  renderInputNameBank () {
    const { nameBank, statusBank } = this.state
    if (statusBank) {
      return (
        <View style={styles.inputContainer}>
          <View style={styles.rowInputContainer}>
            <TextInput
              style={styles.inputText}
              value={nameBank}
              keyboardType='default'
              onChangeText={this.handleNamebank}
              underlineColorAndroid='transparent'
              placeholder='Nama Bank'
            />
          </View>
        </View>
      )
    }
    return null
  }

  renderInputBranchBank () {
    const { branch } = this.state
    return (
      <View style={styles.inputContainer}>
        <View style={styles.rowInputContainer}>
          <TextInput
            style={styles.inputText}
            value={branch}
            keyboardType='default'
            onChangeText={this.handleBranch}
            underlineColorAndroid='transparent'
            placeholder='Cabang Bank'
          />
        </View>
      </View>
    )
  }

  renderInputAccount () {
    const { account } = this.state
    return (
      <View style={styles.inputContainer}>
        <View style={styles.rowInputContainer}>
          <TextInput
            style={styles.inputText}
            value={account}
            keyboardType='numeric'
            onChangeText={this.handleAccount}
            underlineColorAndroid='transparent'
            placeholder='Masukkan Nomor Rekening'
          />
        </View>
      </View>
    )
  }

  renderInputUser () {
    const { name } = this.state
    return (
      <View style={styles.inputContainer}>
        <View style={styles.rowInputContainer}>
          <TextInput
            style={styles.inputText}
            value={name}
            keyboardType='default'
            onChangeText={this.handleName}
            underlineColorAndroid='transparent'
            placeholder='Masukkan Nama Pemilik Rekening'
          />
        </View>
      </View>
    )
  }

  renderButton () {
    return (
      <TouchableOpacity style={styles.buttonContainer} onPress={() => this.createAccount()}>
        <Text style={styles.textButton}>Tambah Data Rekening</Text>
      </TouchableOpacity>
    )
  }

  createAccount () {
    this.props.sendOtp()
  }

  render () {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <ScrollView>
          {this.renderInputBank()}
          {this.renderInputNameBank()}
          {this.renderInputBranchBank()}
          {this.renderInputAccount()}
          {this.renderInputUser()}
          {this.renderButton()}
        </ScrollView>
        {this.renderModalBank()}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataBanks: state.banks,
    dataPhone: state.phone,
    codeOtp: state.sendOTPBank
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendOtp: () => dispatch(userAction.sendOTPBank())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BalanceNewAccount)
