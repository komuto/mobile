import React from 'react'
import { ScrollView, View, Text, TextInput, TouchableOpacity, Image, Modal, ListView } from 'react-native'
import { connect } from 'react-redux'
import { MaskService } from 'react-native-masked-text'
import * as bankAction from '../actions/bank'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Images } from '../Themes'
// Styles
import styles from './Styles/BalancePullStyle'

class BalancePull extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      dateData: '29 Maret 2017',
      balance: 1280000,
      nominal: '',
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
      otherBank: [
        {
          code: -1,
          id: -1,
          logo: null,
          name: 'Bank Lainnya',
          status: -1,
          status_at: -1
        }
      ],
      dataAccount: [],
      modalBank: false,
      statusBank: false
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataBanks.status === 200) {
      const { titleBank, otherBank } = this.state
      let data = [...titleBank, ...nextProps.dataBanks.banks, ...otherBank]
      this.setState({
        dataBanks: data
      })
    }
  }

  renderInformation () {
    const { dateData, balance } = this.state
    const money = MaskService.toMask('money', balance, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
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
      <TouchableOpacity style={styles.buttonContainer}>
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
    if (name.includes('Lain')) {
      this.setState({
        bank: name,
        modalBank: false,
        statusBank: true
      })
    } else {
      this.setState({
        bank: name,
        modalBank: false,
        statusBank: false
      })
    }
  }

  render () {
    return (
      <View style={styles.container}>
        {this.renderInformation()}
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

const mapStateToProps = (state) => {
  return {
    dataBanks: state.banks
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    listBank: dispatch(bankAction.listBank())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BalancePull)
