import React from 'react'
import {
  ScrollView,
  Text,
  Image,
  View,
  TouchableOpacity,
  BackAndroid,
  ActivityIndicator,
  Modal,
  ListView,
  ToastAndroid,
  RefreshControl
} from 'react-native'
import {connect} from 'react-redux'
import {Actions as NavigationActions, ActionConst} from 'react-native-router-flux'
import {MaskService} from 'react-native-masked-text'
import {isFetching, isError, isFound} from '../Services/Status'
import Reactotron from 'reactotron-react-native'

import * as storeAction from '../actions/stores'
import * as catalogAction from '../actions/catalog'

import styles from './Styles/DaftarProdukScreenStyle'

import {Colors, Images, Metrics} from '../Themes/'

class StoreProductDisplayed extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.position = []
    this.positionCatalog = []
    this.submitting = {
      showProduct: false,
      doneFetching: true
    }
    this.state = {
      product: props.dataProduk || [],
      activeCatalog: false,
      statusDotDisplay: false,
      statusDotHidden: false,
      rowTerpilih: '',
      loading: true,
      modal: false,
      callback: this.props.callback,
      isRefreshing: false
    }
  }

  componentWillReceiveProps (nextProps) {
    const {dataProduk, callback} = nextProps
    if (callback !== undefined) {
      if (callback !== this.state.callback) {
        Reactotron.log('callback show')
        this.refresh()
        this.setState({
          callback: callback
        })
      }
    }

    if (!isFetching(dataProduk) && this.submitting.showProduct) {
      this.submitting = { ...this.submitting, showProduct: false, doneFetching: false }
      if (isError(dataProduk)) {
        ToastAndroid.show(dataProduk.message, ToastAndroid.SHORT)
        this.submitting = { ...this.submitting, showProduct: false, doneFetching: true }
      }
      if (isFound(dataProduk)) {
        this.setState({ product: dataProduk })
      }
    }

    if (!isFetching(dataProduk) && this.state.isRefreshing) {
      this.setState({ isRefreshing: false })
      this.submitting = { ...this.submitting, doneFetching: false }
      if (isError(dataProduk)) {
        this.submitting = { ...this.submitting, showProduct: false, doneFetching: true }
        ToastAndroid.show(dataProduk.message, ToastAndroid.SHORT)
      }
      if (isFound(dataProduk)) {
        this.setState({ product: dataProduk })
      }
    }
  }

  componentDidMount () {
    const { product } = this.state
    if (!product.isFound || !this.submitting.showProduct) {
      this.submitting = {
        ...this.submitting,
        showProduct: true
      }
      this.props.getListProduk({hidden: false})
    }
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
  }

  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
  }

  handleBack = () => {
    NavigationActions.pop()
    return true
  }

  backButton () {
    NavigationActions.pop()
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

  discountCalculate (price, discount) {
    let hargaDiskon = price - ((discount / 100) * price)
    return hargaDiskon
  }

  discountCheck (data) {
    var priceAfterDiscount = this.discountCalculate(data.price, data.discount)
    var maskedPriceAfterDiscount = this.maskedMoney(priceAfterDiscount)
    return (
      <Text style={styles.textDetail}>Harga jual setelah diskon : {maskedPriceAfterDiscount}</Text>
    )
  }

  containerEditDisplay (i, id, hidden) {
    if (this.state.statusDotDisplay && this.state.rowTerpilih === i) {
      return (
        <TouchableOpacity style={styles.editContainer} onPress={() => this.setState({statusDotDisplay: false})}>
          <View style={{ flex: 1 }} />
          <View elevation={5} style={styles.edit}>
            <TouchableOpacity style={styles.touch} onPress={() => this.handleHideProduct(id, hidden, 'Sembunyikan')}>
              <Text style={styles.textEdit}>Sembunyikan Barang</Text>
            </TouchableOpacity>
            <View style={styles.border} />
            <TouchableOpacity style={styles.touch} onPress={() => this.handleDeleteProduct(id, hidden)}>
              <Text style={styles.textEdit}>Hapus Barang di Katalog</Text>
            </TouchableOpacity>
            <View style={styles.border} />
            <TouchableOpacity style={styles.touch} onPress={() => this.handleMoveToCatalog(id, hidden)}>
              <Text style={styles.textEdit}>Pindahkan barang ke Katalog Lain</Text>
            </TouchableOpacity>
            <View style={styles.border} />
            <TouchableOpacity style={styles.touch} onPress={() => this.handleMoveToDropshipper(id, hidden)}>
              <Text style={styles.textEdit}>Pindahkan barang ke Dropshipping</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )
    }
    return (
      <View />
    )
  }

  labeldaridropshipper (data) {
    if (data.is_dropship === true && data.dropship_origin) {
      var commisson = (data.dropship_origin.commission.nominal * 100)
      var maskedCommision = this.maskedMoney(commisson)
      return (
        <View>
          <View style={[styles.flexRow, {marginTop: 10, marginBottom: 10}]}>
            <View style={styles.laberDropShipping}>
              <Text style={styles.textDropShipping}>
                Dropship dari {data.dropship_origin.name}
              </Text>
            </View>
            <View style={styles.triangleLabel} />
          </View>
          <Text style={styles.textDetail}>Komisi yang diterima : {maskedCommision}</Text>
        </View>
      )
    } if (data.is_dropship) {
      var commission = (data.price * data.commission) / 100
      var fee = data.price - commission
      var feeMasked = this.maskedMoney(fee)
      return (
        <View>
          <View style={[styles.flexRow, {marginTop: 10, marginBottom: 10}]}>
            <View style={[styles.laberDropShipping, {backgroundColor: Colors.lightBlueGrey}]}>
              <Text style={[styles.textDropShipping, {color: Colors.darkMintTwo}]}>
                Terbuka untuk dropshipper
              </Text>
            </View>
            <View style={[styles.triangleLabel, {backgroundColor: Colors.lightBlueGrey}]} />
          </View>
          <Text style={styles.textDetail}>Jumlah Stok : {data.stock}</Text>
          {this.discountCheck(data)}
          <Text style={styles.textDetail}>Uang yang diterima : {feeMasked}</Text>
        </View>
      )
    } else {
      var commissions = (data.price * data.commission) / 100
      var fees = data.price - commissions
      var feeMaskeds = this.maskedMoney(fees)
      return (
        <View>
          <Text style={styles.textDetail}>Jumlah Stok : {data.stock}</Text>
          {this.discountCheck(data)}
          <Text style={styles.textDetail}>Uang yang diterima : {feeMaskeds}</Text>
        </View>
      )
    }
  }

  checkLabelProduct (productName, isDiscount, isWholesale) {
    if (isDiscount && isWholesale) {
      return (
        <View style={[styles.flexRow, {alignItems: 'flex-start'}]}>
          <Text style={styles.textTitle}>{productName}</Text>
          <TouchableOpacity>
            <Image source={Images.diskon} style={[styles.imageDot]} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={Images.grosir} style={[styles.imageDot, {marginLeft: 9}]} />
          </TouchableOpacity>
        </View>
      )
    } else if (isDiscount) {
      return (
        <View style={[styles.flexRow, {alignItems: 'flex-start'}]}>
          <Text style={styles.textTitle}>{productName}</Text>
          <TouchableOpacity>
            <Image source={Images.diskon} style={[styles.imageDot]} />
          </TouchableOpacity>
        </View>
      )
    } else if (isWholesale) {
      return (
        <View style={[styles.flexRow, {alignItems: 'flex-start'}]}>
          <Text style={styles.textTitle}>{productName}</Text>
          <TouchableOpacity>
            <Image source={Images.grosir} style={[styles.imageDot, {marginLeft: 9}]} />
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <View style={[styles.flexRow, {alignItems: 'flex-start'}]}>
          <Text style={styles.textTitle}>{productName}</Text>
        </View>
      )
    }
  }

  mapSingleProduk (data, id, catalogId) {
    const mapProduk = data.map((data, i) => {
      return (
        <TouchableOpacity key={i} style={styles.dataListProduk}
          onPress={() => this.produkDetail(data.id, data.name, data.image, data.price, data, catalogId)}>
          <View style={styles.flexRow}>
            <Image source={{uri: data.image}} style={styles.imageProduk} />
            <View style={styles.column}>
              {this.checkLabelProduct(data.name, data.is_discount, data.is_wholesaler)}
              {this.labeldaridropshipper(data)}
            </View>
          </View>
        </TouchableOpacity>
      )
    })
    return (
      <View>
        {mapProduk}
      </View>
    )
  }

  checkAmountCatalog (rowLenght, idRow) {
    if (rowLenght > 0) {
      this.setState({statusDotDisplay: true, rowTerpilih: idRow})
    }
  }

  DaftarProdukDiTampilkan (rowData, sectionId, rowId) {
    const product = rowData.storeProducts.map((data, i) => {
      return (
        <View key={i} style={styles.separaator} onLayout={this.onLayout}>
          <View style={styles.containerProduk}>
            <View style={styles.headerInfoAlamat}>
              <Text style={styles.textHeader}>{data.catalog.name} ({data.catalog.count_product})</Text>
              <TouchableOpacity activeOpacity={0.5} onPress={() => this.checkAmountCatalog(data.catalog.count_product, i)}>
                <Image source={Images.threeDotSilver} style={styles.imageDot} />
              </TouchableOpacity>
            </View>
            {this.mapSingleProduk(data.products, i, data.catalog.id)}
          </View>
          <TouchableOpacity activeOpacity={0.5} style={[styles.headerInfoAlamat, {backgroundColor: Colors.snow}]} onPress={() => this.handleListProduk(data.catalog.id, data.catalog.name, false)}>
            <Text style={[styles.textHeader, {color: Colors.bluesky}]}>Lihat semua produk di katalog ini</Text>
            <Image source={Images.rightArrow} style={styles.imageDot} />
          </TouchableOpacity>
          {this.containerEditDisplay(i, data.catalog.id, false)}
        </View>
      )
    })
    return (
      <View>
        {product}
      </View>
    )
  }

  produkDetail (id, name, photo, price, data, catalogId) {
    if (data.is_dropship === true && data.dropship_origin) {
      NavigationActions.placeincatalog({
        type: ActionConst.PUSH,
        title: 'Detail Barang Dropshipper',
        id: id,
        catalogId: catalogId,
        productName: name,
        fotoToko: photo,
        price: price,
        commission: data.dropship_origin.commission.percent
      })
    } else {
      NavigationActions.detailproductstore({
        type: ActionConst.PUSH,
        productName: name,
        idProduct: id
      })
    }
  }

  renderRowCatalog (rowData, sectionId, rowId) {
    const mapCatalog = rowData.storeProducts.map((data, i) => {
      return (
        <TouchableOpacity key={i} style={styles.containerData} onPress={() => this.clickCatalog(i)}>
          <Text style={styles.kategori}>{data.catalog.name}</Text>
        </TouchableOpacity>
      )
    })
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: (Metrics.screenHeight / 2) + 50 }}>
        {mapCatalog}
      </ScrollView>
    )
  }

  renderModal () {
    return (
      <Modal
        animationType={'none'}
        transparent
        visible={this.state.modal}
        onRequestClose={() => this.setState({ modal: false })}
        >
        <TouchableOpacity style={styles.modalContainer} onPress={() => this.openKatalog()}>
          <View style={styles.listViewModal}>
            {this.renderRowCatalog(this.state.product)}
          </View>
          <TouchableOpacity style={styles.floatButtonClose} onPress={() => this.openKatalog()}>
            <Image source={Images.closewhite} style={styles.floatImage} />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    )
  }

  openKatalog () {
    if (this.state.activeCatalog) {
      this.setState({
        activeCatalog: false,
        modal: false
      })
    } else {
      this.setState({
        modal: true,
        activeCatalog: true
      })
    }
  }

  renderKatalogtButton () {
    if (!this.state.activeCatalog) {
      return (
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.floatButton}
          onPress={() => this.openKatalog()}>
          <Image source={Images.katalog} style={styles.floatImage} />
          <Text style={styles.katalog}>Daftar Katalog</Text>
        </TouchableOpacity>
      )
    } else {
      return (
        <View />
      )
    }
  }

  renderTambahButton () {
    return (
      <TouchableOpacity activeOpacity={0.5} style={styles.create} onPress={() => this.handleTambahProduk()}>
        <View elevation={9}>
          <Image source={Images.tambahWhite} style={styles.floatImage} />
        </View>
      </TouchableOpacity>
    )
  }

  clickCatalog (rowId) {
    let temp = this.positionCatalog
    this.refs.produkTampil.scrollTo({y: temp[rowId]})
    this.setState({modal: false, activeCatalog: false})
  }

  onLayout = event => {
    let {y} = event.nativeEvent.layout
    this.position.push(y)
    this.positionCatalog = this.position
  }

  handleListProduk (id, name, hidden) {
    NavigationActions.productlistbycatalog({
      type: ActionConst.PUSH,
      title: name,
      catalogId: id
    })
  }

  handleHideProduct (id, hidden, textButton) {
    this.setState({statusDotDisplay: false})
    NavigationActions.movingproduct({
      type: ActionConst.PUSH,
      idCatalog: id,
      statusHidden: hidden,
      actionType: 'hideProduct',
      title: 'Pindahkan ke Katalog Lain',
      textButton: textButton + ' Barang Terpilih',
      callback: this.state.callback
    })
  }

  handleDeleteProduct (id, hidden) {
    this.setState({statusDotDisplay: false})
    NavigationActions.movingproduct({
      type: ActionConst.PUSH,
      actionType: 'deleteProduct',
      idCatalog: id,
      statusHidden: hidden,
      title: 'Hapus Barang',
      textButton: 'Hapus Barang Terpilih',
      callback: this.state.callback
    })
  }

  handleMoveToCatalog (id, hidden) {
    this.setState({statusDotDisplay: false})
    NavigationActions.movingproduct({
      type: ActionConst.PUSH,
      idCatalog: id,
      statusHidden: hidden,
      actionType: 'moveCatalog',
      title: 'Pindahkan ke Katalog Lain',
      textButton: 'Pindahkan Barang Terpilih',
      callback: this.state.callback
    })
  }

  handleMoveToDropshipper (id, hidden) {
    this.setState({statusDotDisplay: false})
    NavigationActions.movingproduct({
      type: ActionConst.PUSH,
      idCatalog: id,
      actionType: 'moveDropship',
      statusHidden: hidden,
      title: 'Jadikan Dropshipping',
      textButton: 'Jadikan Dropshipping untuk barang terpilih',
      callback: this.state.callback
    })
  }

  handleTambahProduk () {
    NavigationActions.addproduct({
      type: ActionConst.PUSH
    })
  }

  refresh = () => {
    this.setState({ isRefreshing: true })
    this.props.getListProduk({hidden: false})
  }

  renderEmpty () {
    return (
      <View style={styles.emptyContainer}>
        <Image source={Images.emptySales} style={styles.emptyImage} />
        <Text style={[styles.price, { textAlign: 'center', marginBottom: 10 }]}>
          Belum Ada Produk
        </Text>
        <Text style={styles.textNotif}>
          Anda belum memiliki produk yang ditambahkan
        </Text>
      </View>
    )
  }

  render () {
    if (this.submitting.doneFetching) {
      return (
        <View style={styles.spinner}>
          <ActivityIndicator color={Colors.red} size='large' />
        </View>
      )
    }
    let view, viewModal
    if (this.state.product.storeProducts.length > 0) {
      view = (
        this.DaftarProdukDiTampilkan(this.state.product)
      )
      viewModal = (
        this.renderKatalogtButton()
      )
    } else {
      view = (
        this.renderEmpty()
      )
      viewModal = null
    }
    return (
      <View>
        <ScrollView
          ref='produkTampil'
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
          {view}
        </ScrollView>
        {this.renderTambahButton()}
        {this.renderModal()}
        {viewModal}
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  dataProduk: state.storeProducts
})

const mapDispatchToProps = (dispatch) => ({
  getListProduk: (param) => dispatch(storeAction.getStoreProducts(param)),
  getCatalog: () => dispatch(catalogAction.getListCatalog())
})

export default connect(mapStateToProps, mapDispatchToProps)(StoreProductDisplayed)
