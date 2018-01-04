import React from 'react'
import {
  ScrollView,
  Text,
  View,
  ListView,
  Image,
  BackAndroid,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  ToastAndroid,
  TextInput
} from 'react-native'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import { connect } from 'react-redux'
import RupiahFormat from '../Services/MaskedMoneys'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import * as addressAction from '../actions/address'
import * as serviceAction from '../actions/expedition'
import * as cartAction from '../actions/cart'
import { Colors, Images } from '../Themes'
// Styles
import styles from './Styles/CartDetailItemStyle'

class CartDetailItem extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    const rowHasChanged = (r1, r2) => r1 !== r2
    const ds = new ListView.DataSource({rowHasChanged})
    const dataKurir = []
    const dataCost = []
    const dataAsuransi = []
    this.state = {
      idProduct: '',
      image: '',
      name: '',
      storeName: '',
      countProduct: 0,
      addressId: '',
      nameAddress: '',
      address: '',
      province: '',
      phone: '',
      courier: '',
      service: '',
      insurance: false,
      note: '',
      subtotal: 0,
      insuranceCost: 0,
      deliveryCost: 0,
      total: 0,
      dataAddress: [],
      modalAddress: false,
      loadingAddress: false,
      getData: true,
      dataCost: [],
      modalKurir: false,
      dataKurir: [],
      modalSubkurir: false,
      statusSubKurir: false,
      activeKurir: 0,
      activeSubKurir: 0,
      activeAsuransi: 0,
      modalAsuransi: false,
      dataAsuransi: [
        {
          'id': 1,
          'title': 'Ya'
        },
        {
          'id': 0,
          'title': 'Tidak'
        }
      ],
      weight: 0,
      originId: '',
      roIdDistrict: '',
      dataSourceKurir: ds.cloneWithRows(dataKurir),
      dataSourceSubKurir: ds.cloneWithRows(dataCost),
      dataSourceAsuransi: ds.cloneWithRows(dataAsuransi),
      idCourier: '',
      expeditionFee: 0,
      idSubKurir: '',
      ongkirSatuan: '',
      asuransi: '',
      idAsuransi: 0,
      height: 50,
      loadingCart: false,
      activeCartDetailItem: true
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
      this.setState({
        activeCartDetailItem: false
      })
      return true
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataCartItem.status === 200) {
      if (this.state.getData) {
        const item = nextProps.dataCartItem.item.product
        const shipping = nextProps.dataCartItem.item.shipping
        this.setState({
          idProduct: item.id,
          image: item.image,
          name: item.name,
          storeName: item.store.name,
          weight: nextProps.dataCartItem.item.weight,
          countProduct: nextProps.dataCartItem.item.qty,
          addressId: shipping.address.id,
          nameAddress: shipping.address.name,
          address: shipping.address.address,
          province: shipping.address.province.name,
          phone: shipping.address.phone_number,
          originId: item.location.district.ro_id,
          roIdDistrict: shipping.address.district.ro_id,
          courier: shipping.expedition_service.expedition.name,
          idKurir: shipping.expedition_service.expedition.id,
          idSubKurir: shipping.expedition_service.id,
          service: shipping.expedition_service.name,
          insurance: shipping.is_insurance,
          note: nextProps.dataCartItem.item.note,
          insuranceCost: shipping.insurance_fee || 0,
          deliveryCost: shipping.delivery_cost,
          total: nextProps.dataCartItem.item.total_price,
          dataKurir: item.expeditions,
          getData: false
        })
        if (item.is_wholesaler) {
          const dataGrosir = item.wholesale
          const tempCount = nextProps.dataCartItem.item.qty
          for (var i = 0; i < dataGrosir.length; i++) {
            if (tempCount >= dataGrosir[i].min && tempCount <= dataGrosir[i].max) {
              this.setState({
                subtotal: dataGrosir[i].price * tempCount
              })
              break
            } else {
              this.setState({
                subtotal: item.price * nextProps.dataCartItem.item.qty
              })
            }
          }
        } else {
          if (item.is_discount) {
            const discountPrice = item.price - item.price * item.discount / 100
            this.setState({
              subtotal: discountPrice * nextProps.dataCartItem.item.qty
            })
          } else {
            this.setState({
              subtotal: item.price * nextProps.dataCartItem.item.qty
            })
          }
        }
      }
      if (nextProps.dataServices.status === 200) {
        if (nextProps.dataServices.charges.length > 0) {
          this.setState({
            dataCost: nextProps.dataServices.charges,
            statusSubKurir: false
          })
        } else {
          this.setState({
            dataCost: [],
            statusSubKurir: false
          })
        }
      } else if (nextProps.dataServices.status > 200) {
        this.setState({
          dataCost: [],
          statusSubKurir: false
        })
      }
    }
    if (nextProps.dataCart.status === 200) {
      ToastAndroid.show('Keranjang berhasil di update silahkan refresh di halaman keranjang..', ToastAndroid.SHORT)
      if (this.state.activeCartDetailItem) {
        this.setState({ loadingCart: false })
      }
      this.props.resetCreateStatus()
    } else if (nextProps.dataCart.status !== 200 && nextProps.dataCart.status !== 0) {
      this.setState({ loadingCart: false })
      ToastAndroid.show(nextProps.dataCart.message, ToastAndroid.SHORT)
      this.props.resetCreateStatus()
    }
    if (nextProps.dataAddressList.status === 200) {
      console.log(nextProps.dataAddressList.address)
      this.setState({ dataAddress: nextProps.dataAddressList.address, loadingAddress: false })
    } else if (nextProps.dataAddressList.status !== 200 && nextProps.dataAddressList.status !== 0) {
      this.setState({ loadingAddress: false })
      ToastAndroid.show(nextProps.dataAddressList.message, ToastAndroid.SHORT)
    }
  }

  handleCatatan = (text) => {
    this.setState({ note: text })
  }

  renderListView () {
    const {
      image, name, storeName, nameAddress, address, province, phone, courier, service, insurance, note, subtotal, insuranceCost, deliveryCost
    } = this.state
    let insuranceText
    if (insurance) {
      insuranceText = 'Ya'
    } else {
      insuranceText = 'Tidak'
    }
    return (
      <View style={styles.dataContainer}>
        <View style={styles.product}>
          <Image source={{ uri: image }} style={styles.image} />
          <View style={styles.dataProduk}>
            <Text style={styles.textNamaProduk}>{name}</Text>
            <Text style={styles.textJumlah}>{storeName}</Text>
          </View>
        </View>
        <View style={styles.alamatContainer}>
          <View style={styles.titleContainer}>
            <Text style={[styles.textNamaProduk, {flex: 1}]}>Alamat Pengiriman</Text>
            <TouchableOpacity onPress={() => this.getListAlamat()}>
              <Text style={styles.textGanti}>Ganti</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.textAlamat}>{nameAddress}</Text>
          <Text style={styles.textAlamat}>{address}</Text>
          <Text style={styles.textAlamat}>{province}</Text>
          <Text style={styles.textAlamat}>Telp: {phone}</Text>
        </View>
        {this.renderInfo('Kurir Pengiriman', courier)}
        {this.renderInfo('Paket Pengiriman', service)}
        {this.renderInfo('Asuransi', insuranceText)}
        <View style={styles.catatanContainer}>
          <Text style={styles.textNamaProduk}>Catatan</Text>
          <TextInput
            style={[styles.textInput, { height: this.state.height }]}
            multiline
            value={note}
            onContentSizeChange={(event) => {
              this.setState({height: event.nativeEvent.contentSize.height})
            }}
            keyboardType='default'
            autoCapitalize='none'
            autoCorrect
            onChangeText={this.handleCatatan}
            underlineColorAndroid='transparent'
            placeholder='Contoh: saya pesan yang merah'
          />
        </View>
        {this.renderRincian(subtotal, insuranceCost, deliveryCost)}
      </View>
    )
  }

  renderInfo (label, data) {
    return (
      <TouchableOpacity style={styles.infoContainer} onPress={() => this.changeData(label)}>
        <View style={styles.labelContainer}>
          <Text style={styles.textNamaProduk}>{label}</Text>
        </View>
        <Text style={styles.textAlamat}>{data}</Text>
        <Image source={Images.down} style={[styles.imagePicker, { marginLeft: 10 }]} />
      </TouchableOpacity>
    )
  }

  changeData (label) {
    const { idKurir, originId, roIdDistrict, weight } = this.state
    if (label.includes('Kurir')) {
      this.setState({
        modalKurir: true
      })
    } else if (label.includes('Paket')) {
      this.props.getServices(idKurir, originId, roIdDistrict, weight)
      this.setState({
        modalSubkurir: true,
        statusSubKurir: true
      })
    } else if (label.includes('Asuransi')) {
      this.setState({
        modalAsuransi: true
      })
    }
  }

  maskedMoney (value) {
    return 'Rp ' + RupiahFormat(value)
  }

  renderRincian (subtotal, insuranceCost, deliveryCost) {
    const total = subtotal + insuranceCost + deliveryCost
    const totalSubtotal = this.maskedMoney(subtotal)
    const totalBiayaAsuransi = this.maskedMoney(insuranceCost)
    const totalOngkir = this.maskedMoney(deliveryCost)
    const totalBiaya = this.maskedMoney(total)
    return (
      <View style={styles.rincianContainer}>
        <View style={styles.labelRincianContainer}>
          <Text style={styles.textNamaProduk}>Rincian Harga</Text>
        </View>
        <View style={styles.rincian}>
          <View style={styles.labelContainer}>
            <Text style={styles.textRincian}>Harga Barang</Text>
          </View>
          <Text style={styles.textRincian}>{totalSubtotal}</Text>
        </View>
        <View style={styles.rincian}>
          <View style={styles.labelContainer}>
            <Text style={styles.textRincian}>Biaya Asuransi</Text>
          </View>
          <Text style={styles.textRincian}>{totalBiayaAsuransi}</Text>
        </View>
        <View style={styles.rincian}>
          <View style={styles.labelContainer}>
            <Text style={styles.textRincian}>Ongkos Kirim</Text>
          </View>
          <Text style={styles.textRincian}>{totalOngkir}</Text>
        </View>
        <View style={styles.rincian}>
          <View style={styles.labelContainer}>
            <Text style={styles.textRincianTotal}>Subtotal</Text>
          </View>
          <Text style={styles.textRincianTotal}>{totalBiaya}</Text>
        </View>
      </View>
    )
  }

  rendermodalAddress () {
    let viewAlamat
    const spinner = this.state.loadingAddress
    ? (<View style={styles.spinner}>
      <ActivityIndicator color={Colors.bluesky} size='large' />
    </View>) : (<View />)
    if (this.state.loadingAddress) {
      viewAlamat = (<View>{spinner}</View>)
    } else {
      viewAlamat = (
        <ListView
          dataSource={this.dataSource.cloneWithRows(this.state.dataAddress)}
          renderRow={this.renderListAlamat.bind(this)}
          enableEmptySections
        />
      )
    }
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.modalAddress}
        onRequestClose={() => this.setState({ modalAddress: false })}
        >
        <TouchableOpacity style={styles.modalContainer} onPress={() => this.setState({ modalAddress: false })}>
          <ScrollView style={styles.menuProvinsiContainer}>
            <View style={styles.headerListView}>
              <Text style={styles.headerTextListView}>Pilih Alamat Pengiriman</Text>
            </View>
            {viewAlamat}
            <TouchableOpacity
              style={styles.buttonAlamat}
              onPress={() => {
                NavigationActions.purchaseuserinfo({type: ActionConst.PUSH})
                this.setState({ modalAddress: false })
              }}
            >
              <Text style={styles.textGanti}>+ Tambah Alamat Baru</Text>
            </TouchableOpacity>
          </ScrollView>
        </TouchableOpacity>
      </Modal>
    )
  }

  renderListAlamat (rowData, section, row) {
    const centang = row === this.state.activeAlamat ? Images.centangBiru : null
    return (
      <TouchableOpacity
        style={[styles.menuLaporkan, { padding: 20 }]}
        onPress={() => this.setAddress(rowData)}
      >
        <View style={styles.listAlamatContainer}>
          <Text style={[styles.textBagikan, { marginLeft: 0, flex: 1 }]}>{rowData.alias_address}</Text>
          <Text style={[styles.textBagikan, { marginLeft: 0, flex: 1 }]}>{rowData.address}</Text>
          <Text style={[styles.textBagikan, { marginLeft: 0, flex: 1 }]}>{rowData.district.name}, {rowData.province.name}</Text>
          <Text style={[styles.textBagikan, { marginLeft: 0, flex: 1 }]}>{rowData.postal_code}</Text>
        </View>
        <Image source={centang} style={styles.gambarCentang} />
      </TouchableOpacity>
    )
  }

  renderModalKurir () {
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.modalKurir}
        onRequestClose={() => this.setState({ modalKurir: false })}
        >
        <TouchableOpacity style={styles.modalContainer} onPress={() => this.setState({ modalKurir: false })}>
          <ScrollView style={styles.menuProvinsiContainer}>
            <View style={styles.headerListView}>
              <Text style={styles.headerTextListView}>Pilih Ekspedisi Pengiriman</Text>
            </View>
            <ListView
              dataSource={this.dataSource.cloneWithRows(this.state.dataKurir)}
              renderRow={this.renderListKurir.bind(this)}
              enableEmptySections
            />
          </ScrollView>
        </TouchableOpacity>
      </Modal>
    )
  }

  renderModalSubKurir () {
    const { courier, modalSubkurir } = this.state
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={modalSubkurir}
        onRequestClose={() => this.setState({ modalSubkurir: false })}
        >
        <TouchableOpacity style={styles.modalContainer} onPress={() => this.setState({ modalSubkurir: false })}>
          <ScrollView style={styles.menuProvinsiContainer}>
            <View style={styles.headerListView}>
              <Text style={styles.headerTextListView}>Pilih paket pengiriman dari {courier}</Text>
            </View>
            {this.renderListViewSubKurir()}
          </ScrollView>
        </TouchableOpacity>
      </Modal>
    )
  }

  renderListViewSubKurir () {
    const { dataCost, statusSubKurir } = this.state
    if (dataCost.length > 0) {
      return (
        <ListView
          dataSource={this.dataSource.cloneWithRows(this.state.dataCost)}
          renderRow={this.renderListSubKurir.bind(this)}
          enableEmptySections
        />
      )
    }
    if (statusSubKurir) {
      return (
        <View style={[styles.menuLaporkan, { padding: 20 }]} >
          <Text style={[styles.textBagikan, { marginLeft: 0, flex: 1 }]}>Loading Data...</Text>
        </View>
      )
    }
    return (
      <View style={[styles.menuLaporkan, { padding: 20 }]} >
        <Text style={[styles.textBagikan, { marginLeft: 0, flex: 1 }]}>Tidak ada Data</Text>
      </View>
    )
  }

  renderModalAsuransi () {
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.modalAsuransi}
        onRequestClose={() => this.setState({ modalAsuransi: false })}
        >
        <TouchableOpacity style={styles.modalContainer} onPress={() => this.setState({ modalAsuransi: false })}>
          <ScrollView style={styles.menuProvinsiContainer}>
            <View style={styles.headerListView}>
              <Text style={styles.headerTextListView}>Anda ingin menggunakan Asuransi?</Text>
            </View>
            <ListView
              dataSource={this.dataSource.cloneWithRows(this.state.dataAsuransi)}
              renderRow={this.renderListAsuransi.bind(this)}
              enableEmptySections
            />
          </ScrollView>
        </TouchableOpacity>
      </Modal>
    )
  }

  renderListKurir (rowData, section, row) {
    const centang = row === this.state.activeKurir ? Images.centangBiru : null
    return (
      <TouchableOpacity
        style={[styles.menuLaporkan, { padding: 20 }]}
        activeOpacity={0.8}
        onPress={() => this.onPressKurir(row)}
      >
        <Image source={{ uri: rowData.logo }} style={styles.logoEkspedisi} />
        <Text style={[styles.textBagikan, { marginLeft: 0, flex: 1 }]}>{rowData.name}</Text>
        <Image source={centang} style={styles.gambarCentang} />
      </TouchableOpacity>
    )
  }

  onPressKurir (row) {
    const {weight, dataKurir, originId, roIdDistrict, activeKurir, dataSourceKurir} = this.state
    if (activeKurir !== row) {
      const newDataSource = dataKurir.map(data => {
        return {...data, activeKurir: row === data.id}
      })
      this.setState({
        dataSourceKurir: dataSourceKurir.cloneWithRows(newDataSource),
        activeKurir: row
      })
    }
    this.setState({
      courier: dataKurir[row].name,
      idKurir: dataKurir[row].id,
      expeditionFee: dataKurir[row].insurance_fee,
      service: 'Pilih Paket',
      modalKurir: false,
      statusSubKurir: true
    })
    this.props.getServices(dataKurir[row].id, originId, roIdDistrict, weight)
  }

  renderListSubKurir (rowData, section, row) {
    const centang = row === this.state.activeSubKurir ? Images.centangBiru : Images.closewhite
    return (
      <TouchableOpacity
        style={[styles.menuLaporkan, { padding: 20 }]}
        activeOpacity={1}
        onPress={() => this.onPressSubKurir(row)}
      >
        <Text style={[styles.textBagikan, { marginLeft: 0, flex: 1 }]}>{rowData.full_name}</Text>
        <Text style={[styles.textBagikan, { marginRight: 10 }]}>{rowData.etd} hari</Text>
        <Text style={[styles.textBagikan, { marginRight: 10 }]}>{rowData.cost}</Text>
        <Image source={centang} style={styles.gambarCentang} />
      </TouchableOpacity>
    )
  }

  onPressSubKurir (row) {
    const {dataCost, activeSubKurir, dataSourceSubKurir} = this.state
    if (activeSubKurir !== row) {
      const newDataSource = dataCost.map(data => {
        return {...data, activeSubKurir: row === data.id}
      })
      this.setState({
        dataSourceSubKurir: dataSourceSubKurir.cloneWithRows(newDataSource),
        activeSubKurir: row
      })
    }
    this.setState({
      service: dataCost[row].name,
      tipeKurir: dataCost[row].full_name,
      idSubKurir: dataCost[row].id,
      deliveryCost: dataCost[row].cost,
      modalSubkurir: false
    })
  }

  renderListAsuransi (rowData, section, row) {
    const centang = row === this.state.activeAsuransi ? Images.centangBiru : null
    return (
      <TouchableOpacity
        style={[styles.menuLaporkan, { padding: 20 }]}
        activeOpacity={0.8}
        onPress={() => this.onPressAsuransi(row)}
      >
        <Text style={[styles.textBagikan, { marginLeft: 0, flex: 1 }]}>{rowData.title}</Text>
        <Image source={centang} style={styles.gambarCentang} />
      </TouchableOpacity>
    )
  }

  onPressAsuransi (row) {
    const {dataAsuransi, activeAsuransi, dataSourceAsuransi} = this.state
    if (activeAsuransi !== row) {
      const newDataSource = dataAsuransi.map(data => {
        return {...data, activeKurir: row === data.id}
      })
      this.setState({
        dataSourceAsuransi: dataSourceAsuransi.cloneWithRows(newDataSource),
        activeAsuransi: row
      })
    }
    if (dataAsuransi[row].title === 'Ya') {
      this.setState({
        insuranceCost: this.props.dataCartItem.item.shipping.insurance_fee
      })
    } else {
      this.setState({
        insuranceCost: 0
      })
    }
    let temp
    if (dataAsuransi[row].id === 0) {
      temp = false
    } else {
      temp = true
    }
    this.setState({
      insurance: temp,
      idAsuransi: dataAsuransi[row].id,
      modalAsuransi: false
    })
  }

  renderButtonUpdate () {
    const { loadingCart } = this.state
    const spinner = loadingCart
    ? (
      <View style={styles.spinnerCart}>
        <ActivityIndicator color={Colors.snow} size='large' />
      </View>
    ) : (<Text style={styles.textButton}>Simpan Perubahan</Text>)
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => this.update()}>
          {spinner}
        </TouchableOpacity>
      </View>
    )
  }

  update () {
    this.setState({
      loadingCart: true
    })
    const { idProduct, idKurir, idSubKurir, countProduct, note, addressId, insurance, service, originId, roIdDistrict } = this.state
    this.props.addCart(idProduct, idKurir, idSubKurir, countProduct, note, addressId, insurance, service, originId, roIdDistrict)
  }

  setAddress (data) {
    this.setState({
      addressId: data.id,
      nameAddress: data.name,
      address: data.address,
      province: data.province.name,
      phone: data.phone_number,
      modalAddress: false
    })
  }

  getListAlamat () {
    this.setState({ modalAddress: true, loadingAddress: true })
    this.props.getListAlamat()
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.renderListView()}
          {this.renderButtonUpdate()}
        </ScrollView>
        {this.rendermodalAddress()}
        {this.renderModalKurir()}
        {this.renderModalSubKurir()}
        {this.renderModalAsuransi()}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataCartItem: state.item,
    dataCart: state.addToCart,
    dataServices: state.shippingCharges,
    dataAddressList: state.listAddress
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getListAlamat: () => dispatch(addressAction.getListAddress()),
    getServices: (id, originId, destinationId, weight) => dispatch(serviceAction.getShippingCharge({
      id: id, origin_id: originId, destination_id: destinationId, weight: weight
    })),
    addCart: (productId, expeditionId, expeditionServiceId, countProduct, catatan, idAlamat, asuransi, service, originId, destinationId) =>
      dispatch(cartAction.addToCart({
        product_id: productId,
        expedition_id: expeditionId,
        expedition_service_id: expeditionServiceId,
        qty: countProduct,
        note: catatan,
        address_id: idAlamat,
        is_insurance: asuransi,
        service: service,
        origin_ro_id: originId,
        destination_ro_id: destinationId
      })),
    resetCreateStatus: () => dispatch(cartAction.addToCartReset())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartDetailItem)
