import React from 'react'
import {
  ScrollView,
  Text,
  Image,
  View,
  TouchableOpacity,
  TextInput,
  BackAndroid,
  ActivityIndicator,
  Modal,
  ListView
} from 'react-native'
import { connect } from 'react-redux'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import { MaskService } from 'react-native-masked-text'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import * as produkAction from '../actions/product'
import * as storeAction from '../actions/stores'
import * as catalogAction from '../actions/catalog'

// Styles
import styles from './Styles/DaftarProdukScreenStyle'
import { Colors, Images } from '../Themes/'

class ProductList extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.position = []
    this.state = {
      activeCatalog: false,
      katalog: [],
      product: [],
      productHidden: [],
      tabViewStyle: {
        backgroundColor: 'transparent'
      },
      search: '',
      statusDot: false,
      rowTerpilih: '',
      loading: true,
      modal: false,
      positionCatalog: []
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataProduk.status === 200 && nextProps.dataProductHidden.status === 200) {
      this.setState({
        product: nextProps.dataProduk.storeProducts,
        katalog: nextProps.dataProduk.storeProducts,
        productHidden: nextProps.dataProductHidden.hiddenStoreProducts,
        loading: false
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
    NavigationActions.pop()
    return true
  }

  backButton () {
    NavigationActions.pop()
  }

  nextState () {
    NavigationActions.notification({
      type: ActionConst.PUSH,
      tipeNotikasi: 'successBukaToko'
    })
  }

  clickCatalog (rowId) {
    let temp = this.state.positionCatalog
    this.refs.produkTampil.scrollTo({y: temp[rowId]})
    this.setState({modal: false, activeCatalog: false})
  }

  renderCatalogModal (rowData, sectionId, rowId) {
    return (
      <TouchableOpacity style={styles.containerData} onPress={() => this.clickCatalog(rowId)}>
        <Text style={styles.kategori}>{rowData.catalog.name}</Text>
      </TouchableOpacity>
    )
  }

  renderModal () {
    return (
      <Modal
        animationType={'fade'}
        transparent
        visible={this.state.modal}
        onRequestClose={() => this.setState({ modal: false })}
        >
        <TouchableOpacity style={styles.modalContainer} onPress={() => this.openKatalog()}>
          <View style={styles.listViewModal}>
            <ListView
              enableEmptySections
              contentContainerStyle={{ flexWrap: 'wrap' }}
              dataSource={this.dataSource.cloneWithRows(this.state.katalog)}
              renderRow={this.renderCatalogModal.bind(this)}
            />
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
        <TouchableOpacity style={styles.floatButton} onPress={() => this.openKatalog()}>
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
      <TouchableOpacity style={styles.create} onPress={() => this.handleTambahProduk()}>
        <View elevation={9}>
          <Image source={Images.tambahWhite} style={styles.floatImage} />
        </View>
      </TouchableOpacity>
    )
  }

  renderSearch () {
    return (
      <View style={styles.searchContainer}>
        <Image source={Images.searchGrey} style={styles.searchImage} />
        <View style={styles.textInputContainer}>
          <TextInput
            ref='search'
            style={styles.inputText}
            value={this.state.search}
            onSubmitEditing={() => this.search()}
            keyboardType='default'
            autoCapitalize='none'
            autoCorrect
            onChangeText={this.handleTextSearch}
            underlineColorAndroid='transparent'
            placeholder='Cari Produk'
          />
        </View>
      </View>
    )
  }

  onLayout = event => {
    let {y} = event.nativeEvent.layout
    this.position.push(y)
    this.setState({positionCatalog: this.position})
  }

  DaftarProdukDiTampilkan (rowData, sectionId, rowId) {
    return (
      <View key={rowId} style={styles.separaator} onLayout={this.onLayout}>
        <View style={styles.containerProduk}>
          <View style={styles.headerInfoAlamat}>
            <Text style={styles.textHeader}>{rowData.catalog.name} ({rowData.catalog.count_product})</Text>
            <TouchableOpacity onPress={() => this.setState({statusDot: true, rowTerpilih: rowId})}>
              <Image source={Images.threeDotSilver} style={styles.imageDot} />
            </TouchableOpacity>
          </View>
          {this.mapSingleProduk(rowData.products, rowId, rowData.catalog.id)}
        </View>
        <TouchableOpacity activeOpacity={0.5} style={[styles.headerInfoAlamat, {backgroundColor: Colors.snow}]} onPress={() => this.handleListProduk(rowData.catalog.id, rowData.catalog.name)}>
          <Text style={[styles.textHeader, {color: Colors.bluesky}]}>Lihat semua produk di katalog ini</Text>
          <Image source={Images.rightArrow} style={styles.imageDot} />
        </TouchableOpacity>
        {this.containerEdit(rowId, rowData.catalog.id)}
      </View>
    )
  }

  handleListProduk (id, name) {
    this.props.getProductByCatalog(id)
    NavigationActions.productlistbycatalog({
      type: ActionConst.PUSH,
      title: name
    })
  }

  handleHideProduct (id) {
    this.setState({statusDot: false})
    this.props.getProductByCatalog(id)
    NavigationActions.movingproduct({
      type: ActionConst.PUSH,
      idCatalog: id,
      actionType: 'hideProduct',
      title: 'Pindahkan ke Katalog Lain',
      textButton: 'Sembunyikan Barang Terpilih'
    })
  }

  handleDeleteProduct (id) {
    this.setState({statusDot: false})
    this.props.getProductByCatalog(id)
    NavigationActions.movingproduct({
      type: ActionConst.PUSH,
      actionType: 'deleteProduct',
      idCatalog: id,
      title: 'Hapus Barang',
      textButton: 'Hapus Barang Terpilih'
    })
  }

  handleMoveToCatalog (id) {
    this.setState({statusDot: false})
    this.props.getProductByCatalog(id)
    this.props.getCatalog()
    NavigationActions.movingproduct({
      type: ActionConst.PUSH,
      idCatalog: id,
      actionType: 'moveCatalog',
      title: 'Pindahkan ke Katalog Lain',
      textButton: 'Pindahkan Barang Terpilih'
    })
  }

  handleMoveToDropshipper (id) {
    this.setState({statusDot: false})
    this.props.getProductByCatalog(id)
    NavigationActions.movingproduct({
      type: ActionConst.PUSH,
      isDropshipper: true,
      actionType: 'moveDropship',
      title: 'Jadikan Dropshipping',
      textButton: 'Jadikan Dropshipping untuk barang terpilih'
    })
  }

  containerEdit (i, id) {
    if (this.state.statusDot && this.state.rowTerpilih === i) {
      return (
        <View elevation={5} style={styles.edit}>
          <TouchableOpacity style={styles.touch} onPress={() => this.handleHideProduct(id)}>
            <Text style={styles.textEdit}>Sembunyikan Barang</Text>
          </TouchableOpacity>
          <View style={styles.border} />
          <TouchableOpacity style={styles.touch} onPress={() => this.handleDeleteProduct(id)}>
            <Text style={styles.textEdit}>Hapus Barang di Katalog</Text>
          </TouchableOpacity>
          <View style={styles.border} />
          <TouchableOpacity style={styles.touch} onPress={() => this.handleMoveToCatalog(id)}>
            <Text style={styles.textEdit}>Pindahkan barang ke Katalog Lain</Text>
          </TouchableOpacity>
          <View style={styles.border} />
          <TouchableOpacity style={styles.touch} onPress={() => this.handleMoveToDropshipper(id)}>
            <Text style={styles.textEdit}>Pindahkan barang ke Dropshipping</Text>
          </TouchableOpacity>
        </View>
      )
    }
    return (
      <View />
    )
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

  maskedMoney (value) {
    const maskedPrice = MaskService.toMask('money', value, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    return maskedPrice
  }

  labeldaridropshipper (data) {
    if (data.is_dropshipper === true && data.dropship_origin) {
      var maskedCommision = this.maskedMoney(data.dropship_origin.commission)
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
    } if (data.is_dropshipper) {
      var maskedPrice = this.maskedMoney(data.price)
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
          <Text style={styles.textDetail}>Uang yang diterima : {maskedPrice}</Text>
        </View>
      )
    } else {
      var maskedPrices = this.maskedMoney(data.price)
      return (
        <View>
          <Text style={styles.textDetail}>Jumlah Stok : {data.stock}</Text>
          {this.discountCheck(data)}
          <Text style={styles.textDetail}>Uang yang diterima : {maskedPrices}</Text>
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
              <View style={[styles.flexRow, {alignItems: 'flex-start'}]}>
                <Text style={styles.textTitle}>{data.name}</Text>
                <TouchableOpacity>
                  <Image source={Images.diskon} style={styles.imageDot} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image source={Images.grosir} style={[styles.imageDot, {marginLeft: 9}]} />
                </TouchableOpacity>
              </View>
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

  DaftarProdukDiSembunyikan () {
    const { productHidden } = this.state
    const mapProduk = productHidden.map((data, i) => {
      return (
        <View key={i} style={styles.separaator}>
          <View style={styles.containerProduk}>
            <View style={styles.headerInfoAlamat}>
              <Text style={styles.textHeader}>{data.catalog.name} ({data.catalog.count_product})</Text>
            </View>
            {this.mapSingleProduk(data.products, i, data.catalog.id)}
          </View>
          <TouchableOpacity activeOpacity={0.5} style={[styles.headerInfoAlamat, {backgroundColor: Colors.snow}]} onPress={() => this.handleListProduk(data.catalog.id, data.catalog.name)}>
            <Text style={[styles.textHeader, {color: Colors.bluesky}]}>Lihat semua produk di katalog ini</Text>
            <Image source={Images.rightArrow} style={styles.imageDot} />
          </TouchableOpacity>
        </View>
      )
    })
    return (
      <View>
        {mapProduk}
      </View>
    )
  }

  handleTambahProduk () {
    NavigationActions.addproduct({
      type: ActionConst.PUSH
    })
  }

  produkDetail (id, name, photo, price, data, catalogId) {
    if (data.is_dropshipper === true && data.dropship_origin) {
      NavigationActions.placeincatalog({
        type: ActionConst.PUSH,
        title: 'Detail Barang Dropshipper',
        id: id,
        catalogId: catalogId,
        productName: name,
        fotoToko: photo,
        price: price
      })
      this.props.getCatalog()
    } else {
      NavigationActions.detailproductstore({
        type: ActionConst.PUSH,
        productName: name
      })
      this.props.getDetailStoreProduct(id)
    }
  }

  render () {
    const spinner = this.state.loading
    ? (<View style={styles.spinner}>
      <ActivityIndicator color='white' size='large' />
    </View>) : (<View />)
    return (
      <TouchableOpacity activeOpacity={100} onPress={() => this.setState({statusDot: false})} style={styles.container}>
        <ScrollableTabView
          prerenderingSiblingsNumber={2}
          style={this.state.tabViewStyle}
          tabBarBackgroundColor={Colors.red}
          tabBarActiveTextColor={Colors.snow}
          tabBarUnderlineStyle={{ backgroundColor: Colors.snow, height: 2 }}
          tabBarInactiveTextColor={Colors.snow}
          tabBarTextStyle={styles.textTab}
          locked
        >
          <ScrollView tabLabel='Ditampilkan di Toko' ref='produkTampil' style={styles.scrollView}>
            {this.renderSearch()}
            <ListView
              enableEmptySections
              contentContainerStyle={{ flexWrap: 'wrap' }}
              dataSource={this.dataSource.cloneWithRows(this.state.product)}
              renderRow={this.DaftarProdukDiTampilkan.bind(this)}
            />
          </ScrollView>
          <ScrollView tabLabel='Disembunyikan' ref='productHidden' style={styles.scrollView}>
            {this.renderSearch()}
            {this.DaftarProdukDiSembunyikan()}
          </ScrollView>
        </ScrollableTabView>
        {this.renderKatalogtButton()}
        {this.renderTambahButton()}
        {this.renderModal()}
        {spinner}
      </TouchableOpacity>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataProduk: state.storeProducts,
    dataProductHidden: state.hiddenStoreProducts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProductByCatalog: (id) => dispatch(storeAction.getStoreCatalogProducts({id})),
    getDetailProduk: (id) => dispatch(produkAction.getProduct({id: id})),
    getCatalog: () => dispatch(catalogAction.getListCatalog()),
    getDetailStoreProduct: (id) => dispatch(storeAction.getStoreProductDetail({id}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
