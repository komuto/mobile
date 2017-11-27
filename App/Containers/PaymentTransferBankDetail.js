import React from 'react'
import { ScrollView, Text, View, Image, TouchableOpacity, ListView, Modal, BackAndroid } from 'react-native'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import { connect } from 'react-redux'
import RupiahFormat from '../Services/MaskedMoneys'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Images } from '../Themes'
// Styles
import styles from './Styles/PembayaranTransferBankDetailStyle'
import * as bankAction from '../actions/bank'

class PaymentTransferBankDetail extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      invoice: 'Invoice-83273847492/04/2017',
      sisaPembayaran: this.props.totalPayment,
      total: this.props.total,
      kode: this.props.kode,
      diskon: this.props.discount,
      kodeUnik: this.props.kodeUnik,
      expand: false,
      data: [],
      dataBarang: [
        {
          'name': 'Sepatu Jogging Nike Hitam',
          'image': 'https://slack-imgs.com/?c=1&o1=wi75.he75.si&url=https%3A%2F%2Fzeplin.io%2Fimg%2Ffavicon%2F228x228.png',
          'namaToko': 'Sports Station Shop'
        },
        {
          'name': 'Sepatu Jogging Nike Hitam',
          'image': 'https://slack-imgs.com/?c=1&o1=wi75.he75.si&url=https%3A%2F%2Fzeplin.io%2Fimg%2Ffavicon%2F228x228.png',
          'namaToko': 'Sports Station Shop'
        }
      ],
      modalTransaksi: false
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
    } else {
      this.setState({ modalTransaksi: true })
    }
    return true
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataBanks.status === 200) {
      console.log(nextProps.dataBanks.komutoAccounts)
      this.setState({
        data: nextProps.dataBanks.komutoAccounts
      })
    }
  }

  renderNavigator () {
    return (
      <View style={styles.navigatorContainer}>
        <TouchableOpacity
          style={styles.buttonBackContainer}
          onPress={() => this.setState({ modalTransaksi: true })}
        >
          <Image source={Images.iconBack} style={styles.back} />
        </TouchableOpacity>
        <Text style={styles.navigatorTitle}>
          Detail Transaksi
        </Text>
      </View>
    )
  }

  renderInfo () {
    return (
      <View style={styles.batasPembayaran}>
        <Image source={Images.waktu} style={styles.image} />
        <View style={styles.infoPembayaran}>
          <Text style={[styles.textPembayaran, { marginBottom: 4 }]}>Menunggu Pembayaran</Text>
          <Text style={styles.time}>1 hari : 20 jam : 30 menit</Text>
        </View>
      </View>
    )
  }

  maskedMoney (value) {
    return 'Rp ' + RupiahFormat(value)
  }

  renderExpand () {
    const { expand, total, diskon, kode, kodeUnik, sisaPembayaran } = this.state
    const totalHarga = this.maskedMoney(total)
    const hargaDiskon = this.maskedMoney(diskon)
    const hargaKodeUnik = this.maskedMoney(kodeUnik)
    const hargaSisaBayar = this.maskedMoney(sisaPembayaran)
    if (expand) {
      return (
        <View style={styles.rincianContainer}>
          <View style={styles.bodyRincian}>
            <View style={styles.rowContainerRincian}>
              <Text style={[styles.textTitle, { flex: 1 }]}>Total Belanja</Text>
              <Text style={styles.textTitle}>{totalHarga}</Text>
            </View>
            <View style={styles.rowContainerRincian}>
              <Text style={[styles.textGreen, { flex: 1 }]}>Kode Voucher {kode}</Text>
              <Text style={styles.textGreen}>{hargaDiskon}</Text>
            </View>
            <View style={styles.rowContainerRincian}>
              <Text style={[styles.textTitle, { flex: 1 }]}>Kode Unik</Text>
              <Text style={styles.textTitle}>{hargaKodeUnik}</Text>
            </View>
          </View>
          <View style={[styles.rowContainerRincian, { paddingLeft: 20, paddingRight: 20 }]}>
            <Text style={[styles.bold, { flex: 1 }]}>Total Pembayaran</Text>
            <Text style={styles.bold}>{hargaSisaBayar}</Text>
          </View>
        </View>
      )
    }
    return null
  }

  renderTagihan () {
    const { expand, sisaPembayaran } = this.state
    const hargaSisaBayar = this.maskedMoney(sisaPembayaran)
    let arrow
    if (expand) {
      arrow = Images.arrowUp
    } else {
      arrow = Images.arrowDown
    }
    return (
      <View style={styles.tagihanContainer}>
        <View style={styles.rowContainer}>
          <Text style={[styles.bold, { flex: 1 }]}>Total Tagihan</Text>
          <Text style={styles.textTitle}>{hargaSisaBayar}</Text>
          <TouchableOpacity style={styles.expandButton} onPress={() => this.expand()}>
            <Text style={styles.textBlue}>Detail </Text>
            <Image source={arrow} style={styles.arrow} />
          </TouchableOpacity>
        </View>
        {this.renderExpand()}
      </View>
    )
  }

  renderDaftarBank () {
    const { data } = this.state
    return (
      <View style={styles.listViewContainer}>
        <View style={styles.numberContainer}>
          <Text style={styles.number}>1</Text>
        </View>
        <View style={styles.listView}>
          <Text style={styles.textTitle}>
            Lakukan Transfer ke salah satu rekening dibawah ini:
          </Text>
          <ListView
            dataSource={this.dataSource.cloneWithRows(data)}
            renderRow={this.renderRow.bind(this)}
            enableEmptySections
          />
        </View>
      </View>
    )
  }

  renderRow (rowData) {
    return (
      <View style={styles.bankContainer}>
        <View style={styles.namaBankContainer}>
          <Text style={[styles.bold, { flex: 1 }]}>{rowData.bank.name}</Text>
          <Image source={{ uri: rowData.bank.logo }} style={styles.imageBank} />
        </View>
        <View style={styles.rekeningContainerRow}>
          <View style={[styles.rekeningContainerColumn, { marginRight: 20 }]}>
            <Text style={[styles.textTitle, { marginBottom: 5 }]}>No Rek</Text>
            <Text style={[styles.time, { marginBottom: 5 }]}>Atas Nama</Text>
            <Text style={[styles.time, { marginBottom: 5 }]}>Cabang</Text>
          </View>
          <View style={styles.rekeningContainerColumn}>
            <Text style={[styles.textTitle, { marginBottom: 5 }]}>:{'   '}{rowData.holder_account_number}</Text>
            <Text style={[styles.time, { marginBottom: 5 }]}>:{'   '}{rowData.holder_name}</Text>
            <Text style={[styles.time, { marginBottom: 5 }]}>:{'   '}{rowData.bank_branch_office_name}</Text>
          </View>
        </View>
      </View>
    )
  }

  renderPembayaran () {
    const { sisaPembayaran } = this.state
    const hargaSisaBayar = this.maskedMoney(sisaPembayaran)

    const leng = hargaSisaBayar.length

    const teks1 = hargaSisaBayar.substr(0, (leng - 3))
    const teks2 = hargaSisaBayar.substr(leng - 3)

    return (
      <View style={styles.separator}>
        <View style={[styles.listViewContainer, { marginBottom: 0 }]}>
          <View style={styles.numberContainer}>
            <Text style={styles.number}>2</Text>
          </View>
          <View style={styles.listView}>
            <Text style={[styles.textTitle, { marginBottom: 8 }]}>
              Lakukan Pembayaran sampai 3 digit terakhir
            </Text>
            <View style={styles.rekeningContainerRow}>
              <Text style={styles.nominalBlack}>
                {teks1}
              </Text>
              <Text style={styles.nominalOrange}>
                {teks2}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.boxOrange}>
          <Text style={styles.textPembayaran}>
            Lakukan pembayaran sampai 3 digit terakhir agar
            pembayaran bisa diproses
          </Text>
        </View>
      </View>
    )
  }

  renderKonfirmasi () {
    return (
      <View style={styles.separator}>
        <View style={[styles.listViewContainer, { marginBottom: 0 }]}>
          <View style={styles.numberContainer}>
            <Text style={styles.number}>3</Text>
          </View>
          <View style={styles.listView}>
            <Text style={[styles.textTitle, { marginBottom: 8 }]}>
              Lakukan konfirmasi agar pembayaran Anda
              dapat diproses.
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => this.konfirmasi()}>
          <Text style={styles.textButton}>
            Konfirmasikan Pembayaran
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderBarang () {
    const { dataBarang } = this.state
    return (
      <View style={styles.tagihanContainer}>
        <View style={styles.rowContainer}>
          <Text style={[styles.bold, { flex: 1 }]}>Daftar Barang yang dibeli</Text>
        </View>
        <ListView
          dataSource={this.dataSource.cloneWithRows(dataBarang)}
          renderRow={this.renderRowBarang.bind(this)}
          enableEmptySections
        />
      </View>
    )
  }

  renderRowBarang (rowData) {
    return (
      <TouchableOpacity style={styles.containerBarang} onPress={() => this.detailBarang()}>
        <Image source={{ uri: rowData.image }} style={styles.imageBarang} />
        <View style={styles.namaBarangContainer}>
          <Text style={styles.bold}>{rowData.name}</Text>
          <Text style={styles.textTitle}>{rowData.namaToko}</Text>
        </View>
        <Image source={Images.rightArrow} style={styles.arrow} />
      </TouchableOpacity>
    )
  }

  renderModalTransaksi () {
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.modalTransaksi}
        onRequestClose={() => console.log('')}
        >
        <View style={styles.modalContainer}>
          <View style={styles.containerNotifikasi}>
            <Image source={Images.daftarTransaksi} style={styles.empty} />
            <Text style={styles.textBold}>Ke Halaman Transaksi</Text>
            <Text style={styles.textGagal}>
              Kami akan mengarahkan Anda ke
              Daftar Transaksi Anda
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={styles.button} onPress={() => this.transaksi()}>
                <Text style={styles.textI}>Ke Daftar Transaksi</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View >
      </Modal>
    )
  }

  transaksi () {
    NavigationActions.backtab({
      type: ActionConst.RESET
    })
    NavigationActions.transaction()
  }

  expand () {
    const { expand } = this.state
    if (expand) {
      this.setState({ expand: false })
    } else {
      this.setState({ expand: true })
    }
  }

  detailBarang () {
    NavigationActions.paymentitemdetail({
      type: ActionConst.PUSH
    })
  }

  konfirmasi () {
    this.props.getBank()
    NavigationActions.transactionpaymentconfirmation({
      type: ActionConst.PUSH,
      totalPayment: this.state.sisaPembayaran
    })
  }

  render () {
    return (
      <View style={styles.container}>
        {this.renderNavigator()}
        {this.renderInfo()}
        <ScrollView>
          {this.renderTagihan()}
          <View style={styles.caraBayarContainer}>
            <Text style={styles.textTitle}>Cara Pembayaran</Text>
          </View>
          {this.renderDaftarBank()}
          {this.renderPembayaran()}
          {this.renderKonfirmasi()}
          {this.renderBarang()}
        </ScrollView>
        {this.renderModalTransaksi()}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataBanks: state.komutoAccounts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBank: () => dispatch(bankAction.listBank())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentTransferBankDetail)
