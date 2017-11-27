import React from 'react'
import { ScrollView, Text, View, Image, TouchableOpacity, ListView, Modal, BackAndroid } from 'react-native'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import { connect } from 'react-redux'
import RupiahFormat from '../Services/MaskedMoneys'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Images } from '../Themes'
// Styles
import styles from './Styles/PembayaranAlfamartDetailStyle'

class PaymentTransferBankDetail extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      invoice: 'Invoice-83273847492/04/2017',
      sisaPembayaran: 308582,
      total: 320000,
      kode: 'BELANJAENAK',
      kodePembayaran: 123321212,
      diskon: 10000,
      kodeUnik: 2000,
      expand: false,
      data: [
        {
          'nameBank': 'Bank Mandiri',
          'image': 'https://slack-imgs.com/?c=1&o1=wi75.he75.si&url=https%3A%2F%2Fzeplin.io%2Fimg%2Ffavicon%2F228x228.png',
          'name': 'PT Aptamedia Indonesia',
          'rekening': '8179  8387  28',
          'cabang': 'Yogyakarta'
        },
        {
          'nameBank': 'Bank BNI',
          'image': 'https://slack-imgs.com/?c=1&o1=wi75.he75.si&url=https%3A%2F%2Fzeplin.io%2Fimg%2Ffavicon%2F228x228.png',
          'name': 'PT Aptamedia Indonesia',
          'rekening': '8179  8387  28',
          'cabang': 'Jakarta'
        }
      ],
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
    const { expand, invoice, sisaPembayaran } = this.state
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
          <Text style={[styles.bold, { flex: 1 }]}>No Invoice</Text>
          <Text style={styles.textTitle}>{invoice}</Text>
        </View>
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

  renderKodePembayaran () {
    const { kodePembayaran } = this.state
    return (
      <View style={styles.tagihanContainer}>
        <View style={styles.rowContainer}>
          <Text style={[styles.bold, { flex: 1 }]}>Kode Pembayaran</Text>
          <Text style={styles.textCode}>{kodePembayaran}</Text>
        </View>
      </View>
    )
  }

  renderKonfirmasi () {
    const { kodePembayaran } = this.state
    return (
      <View style={styles.separator}>
        <View style={[styles.listViewContainer, { marginBottom: 0 }]}>
          <View style={styles.listView}>
            <Text style={styles.textTitle}>
              Cara Pembayaran
            </Text>
          </View>
        </View>
        <View style={[styles.listViewContainer, { marginBottom: 0 }]}>
          <View style={styles.numberContainer}>
            <Text style={styles.number}>1</Text>
          </View>
          <View style={styles.listView}>
            <Text style={[styles.textTitle, { marginBottom: 8, marginRight: 15 }]}>
              Catat Kode Pembayaran Anda dan pergilah ke Indomaret terdekat
            </Text>
          </View>
        </View>
        <View style={[styles.listViewContainer, { marginBottom: 0 }]}>
          <View style={styles.numberContainer}>
            <Text style={styles.number}>2</Text>
          </View>
          <View style={styles.listView}>
            <Text style={[styles.textTitle, { marginBottom: 8, marginRight: 15 }]}>
              Bilang pada Kasir bahwa anda ingin melakukan pembayaran DOKU
            </Text>
          </View>
        </View>
        <View style={[styles.listViewContainer, { marginBottom: 0 }]}>
          <View style={styles.numberContainer}>
            <Text style={styles.number}>3</Text>
          </View>
          <View style={styles.listView}>
            <Text style={[styles.textTitle, { marginBottom: 8, marginRight: 15 }]}>
              Jika Kasir belum familiar dengan  DOKU, maka beritahu bahwa kode transaksinya
              adalah 2 lalu 2 lalu 2
            </Text>
          </View>
        </View>
        <View style={[styles.listViewContainer, { marginBottom: 0 }]}>
          <View style={styles.numberContainer}>
            <Text style={styles.number}>4</Text>
          </View>
          <View style={styles.listView}>
            <Text style={[styles.textTitle, { marginBottom: 8, marginRight: 15 }]}>
              Kasir akan meminta kode pembayaran Anda. Sebutkan kode pembayaran Anda {kodePembayaran}
            </Text>
          </View>
        </View>
        <View style={[styles.listViewContainer, { marginBottom: 0 }]}>
          <View style={styles.numberContainer}>
            <Text style={styles.number}>5</Text>
          </View>
          <View style={styles.listView}>
            <Text style={[styles.textTitle, { marginBottom: 8, marginRight: 15 }]}>
              Lakukan pembayaran sesuai dengan total bayar Anda ditambah dengan biaya transaksi dari Indomaret
            </Text>
          </View>
        </View>
        <View style={[styles.listViewContainer, { marginBottom: 0 }]}>
          <View style={styles.numberContainer}>
            <Text style={styles.number}>6</Text>
          </View>
          <View style={styles.listView}>
            <Text style={[styles.textTitle, { marginBottom: 8, marginRight: 15 }]}>
              Dapatkan bukti pembayaran dari kasir. Dan Merchant akan diberikan notifikasi mengenai
              status pembayaran Anda
            </Text>
          </View>
        </View>
        <View style={[styles.listViewContainer, { marginBottom: 0 }]}>
          <View style={styles.numberContainer}>
            <Text style={styles.number}>7</Text>
          </View>
          <View style={styles.listView}>
            <Text style={[styles.textTitle, { marginBottom: 8, marginRight: 15 }]}>
              Selesai
            </Text>
          </View>
        </View>
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

  render () {
    return (
      <View style={styles.container}>
        {this.renderNavigator()}
        {this.renderInfo()}
        <ScrollView>
          {this.renderTagihan()}
          <View style={styles.caraBayarContainer} />
          {this.renderKodePembayaran()}
          <View style={styles.caraBayarContainer} />
          {this.renderKonfirmasi()}
          <View style={styles.caraBayarContainer} />
          {this.renderBarang()}
        </ScrollView>
        {this.renderModalTransaksi()}
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

export default connect(mapStateToProps, mapDispatchToProps)(PaymentTransferBankDetail)
