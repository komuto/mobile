import React from 'react'
import { ScrollView, View, Text, TextInput, TouchableOpacity, ToastAndroid, Image, Modal, ListView } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import { MaskService } from 'react-native-masked-text'
import * as bankAction from '../actions/bank'
import * as userAction from '../actions/user'
import moment from 'moment'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Images, Colors } from '../Themes'
import Spinner from '../Components/Spinner'
// Styles
import styles from './Styles/BalancePullStyle'

class BalancePull extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      dateData: '',
      balance: String(this.props.dataProfile.user.user.saldo_wallet),
      nominal: null,
      branch: '',
      account: '',
      name: '',
      nameBank: '',
      bank: 'Pilih Bank Tujuan',
      titleBank: [
        {
          code: -1,
          id: -1,
          logo: null,
          name: 'Pilih Bank Tujuan',
          status: -1,
          status_at: -1
        }
      ],
      dataBanks: [],
      dataAccount: [],
      modalBank: false,
      statusBank: false,
      haveAccount: true,
      modalAccount: false,
      accountBank: 'Pilih Rekening',
      loadingAccount: false,
      phone: this.props.dataPhone.phone,
      id: null,
      active: false
    }
    this.props.getBankAccount()
  }

  componentDidMount () {
    this.setState({
      dateData: moment().format('DD MM YYYY')
    })
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataBanks.status === 200) {
      const { titleBank } = this.state
      let data = [...titleBank, ...nextProps.dataBanks.banks]
      this.setState({
        dataBanks: data
      })
    } else if (nextProps.dataBanks.status !== 200 && nextProps.dataBanks.status !== 0) {
      ToastAndroid.show(nextProps.dataBanks.message, ToastAndroid.LONG)
    }
    if (nextProps.dataAccountBank.status === 200) {
      if (nextProps.dataAccountBank.listBankAccounts.length > 0) {
        this.setState({
          dataAccount: nextProps.dataAccountBank.listBankAccounts,
          loadingAccount: false
        })
      } else {
        this.setState({
          loadingAccount: false
        })
      }
      nextProps.dataAccountBank.status = 0
    } else if (nextProps.dataAccountBank.status !== 200 && nextProps.dataAccountBank.status !== 0) {
      ToastAndroid.show(nextProps.dataAccountBank.message, ToastAndroid.LONG)
      nextProps.dataAccountBank.status = 0
    }
    if (nextProps.codeOtp.status === 200) {
      if (this.state.active) {
        const { id, nominal } = this.state
        this.setState({
          loading: false
        })
        NavigationActions.otpcode({
          type: ActionConst.PUSH,
          typeVerifikasi: 'withdraw',
          fieldPass: this.props.dataPhone.phone,
          idBankAccount: id,
          amount: nominal,
          title: 'Withdraw',
          textButton: 'Verifikasi kode OTP'
        })
        nextProps.codeOtp.status = 0
      }
    } else if (nextProps.codeOtp.status !== 200 && nextProps.codeOtp.status !== 0) {
      ToastAndroid.show(nextProps.codeOtp.message, ToastAndroid.LONG)
      nextProps.codeOtp.status = 0
    }
    if (nextProps.dataProfile.status === 200) {
      this.setState({
        balance: String(nextProps.dataProfile.user.user.saldo_wallet)
      })
    } else if (nextProps.dataProfile.status !== 200 && nextProps.dataProfile.status !== 0) {
      ToastAndroid.show(nextProps.codeOtp.message, ToastAndroid.LONG)
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

  renderInformation () {
    const { dateData, balance } = this.state
    const money = this.maskedMoney(balance)
    return (
      <View style={styles.infoContainer}>
        <Text style={[styles.textDate, { flex: 1 }]}>Saldo per {dateData}</Text>
        <Text style={styles.textBalance}>{money}</Text>
      </View>
    )
  }

  handleNominal = (text) => {
    this.setState({ nominal: text })
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

  renderInputNominal () {
    const { nominal } = this.state
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.textDate}>Nominal Penarikan Dana</Text>
        <View style={styles.rowInputContainer}>
          <Text style={styles.textDate}>Rp</Text>
          <TextInput
            style={styles.inputText}
            value={nominal}
            keyboardType='numeric'
            onChangeText={this.handleNominal}
            underlineColorAndroid='transparent'
            placeholder='100000'
          />
        </View>
      </View>
    )
  }

  renderInputBank () {
    const { bank } = this.state
    return (
      <TouchableOpacity style={styles.row} onPress={() => this.openBank()}>
        <Text style={[styles.textDate, {flex: 1}]}>{bank}</Text>
        <Image style={styles.arrow} source={Images.down} />
      </TouchableOpacity>
    )
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
      <TouchableOpacity style={styles.buttonContainer} onPress={() => this.withdraw()}>
        <Text style={styles.textButton}>Tarik Saldo</Text>
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
          this.onPressBank(rowData.name)
        }}
      >
        <Text style={[styles.textBagikan, { marginLeft: 0 }]}>{rowData.name}</Text>
      </TouchableOpacity>
    )
  }

  openBank () {
    this.setState({
      modalBank: true
    })
  }

  onPressBank (name) {
    this.setState({
      bank: name,
      modalBank: false,
      statusBank: false
    })
  }

  renderAccountBank () {
    const { accountBank } = this.state
    return (
      <TouchableOpacity style={styles.row} onPress={() => {
        this.props.getBankAccount()
        this.setState({ modalAccount: true, loadingAccount: true })
      }}
      >
        <Text style={[styles.textDate, {flex: 1}]}>{accountBank}</Text>
        <Image style={styles.arrow} source={Images.down} />
      </TouchableOpacity>
    )
  }

  renderModalAccount () {
    const { loadingAccount } = this.state
    let listview
    if (loadingAccount) {
      listview = (
        <View style={{ padding: 5 }}>
          <Spinner color={Colors.bluesky} />
        </View>
      )
    } else {
      if (this.state.dataAccount.length > 0) {
        listview = (
          <ListView
            dataSource={this.dataSource.cloneWithRows(this.state.dataAccount)}
            renderRow={this.renderListAccount.bind(this)}
            enableEmptySections
          />
        )
      } else {
        listview = (
          <View style={[styles.menuLaporkan, { padding: 15 }]}>
            <Text style={[styles.textBagikan, { marginLeft: 0 }]}>Belum ada data</Text>
          </View>
        )
      }
    }
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.modalAccount}
        onRequestClose={() => this.setState({ modalAccount: false })}
        >
        <TouchableOpacity style={styles.modalContainer} onPress={() => this.setState({ modalAccount: false })}>
          <ScrollView style={styles.menuModalContainer}>
            <View style={styles.headerListView}>
              <Text style={styles.headerTextListView}>Pilih Rekening Tujuan</Text>
            </View>
            {listview}
            <TouchableOpacity
              style={styles.buttonNewAccount}
              activeOpacity={0.8}
              onPress={() => {
                this.setState({
                  modalAccount: false,
                  active: false
                })
                NavigationActions.balancenewaccount({
                  type: ActionConst.PUSH
                })
              }}
            >
              <Text style={styles.textButtonBlue}>+ Bank Rekening Baru</Text>
            </TouchableOpacity>
          </ScrollView>
        </TouchableOpacity>
      </Modal>
    )
  }

  renderListAccount (rowData) {
    return (
      <TouchableOpacity
        style={styles.rowAccount}
        activeOpacity={0.8}
        onPress={() => {
          this.setState({
            accountBank: rowData.bank.name + ' ' + rowData.holder_account_number,
            modalAccount: false,
            id: rowData.id
          })
        }}
      >
        <Text style={[styles.textBagikan, { marginLeft: 0 }]}>{rowData.bank.name}</Text>
        <Text style={[styles.textBagikan, { marginLeft: 0 }]}>{rowData.holder_account_number}</Text>
        <Text style={[styles.textBagikan, { marginLeft: 0 }]}>{rowData.holder_name}</Text>
      </TouchableOpacity>
    )
  }

  withdraw () {
    const { id, nominal } = this.state
    if (id === null || id === '' || nominal === null || nominal === '') {
      ToastAndroid.show('Bank dan nomimal penarikan tidak boleh kosong..', ToastAndroid.LONG)
    } else {
      this.setState({
        active: true
      })
      this.props.sendOtp()
    }
  }

  renderView () {
    const { haveAccount } = this.state
    if (haveAccount) {
      return (
        <View>
          {this.renderInputNominal()}
          {this.renderAccountBank()}
          {this.renderModalAccount()}
          {this.renderButton()}
        </View>
      )
    } else {
      return (
        <View>
          <ScrollView>
            {this.renderInputNominal()}
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

  render () {
    return (
      <View style={styles.container}>
        {this.renderInformation()}
        {this.renderView()}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataBanks: state.banks,
    dataAccountBank: state.listBankAccounts,
    dataPhone: state.phone,
    codeOtp: state.sendOTPBank,
    dataProfile: state.profile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    listBank: dispatch(bankAction.listBank()),
    getBankAccount: () => dispatch(bankAction.getBankAccounts()),
    sendOtp: () => dispatch(userAction.sendOTPBank())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BalancePull)
