import React from 'react'
import {
  Text,
  ListView,
  View,
  Image,
  TouchableOpacity,
  BackAndroid,
  Modal,
  ActivityIndicator,
  RefreshControl,
  Alert,
  ToastAndroid
} from 'react-native'
import { connect } from 'react-redux'
import { MaskService } from 'react-native-masked-text'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import Reactotron from 'reactotron-react-native'

import Filter from '../Components/Filter'
import {isFetching, isError, isFound} from '../Services/Status'
import ModalSearchGeneral from '../Components/Search'

// import YourActions from '../Redux/YourRedux'
import * as produkAction from '../actions/product'
import * as homeAction from '../actions/home'

// Styles
import styles from './Styles/ProdukTerbaruScreenStyle'
import stylesSearch from './Styles/SearchResultStyle'
import stylesHome from './Styles/HomeStyle'

import { Images, Colors, Metrics, Fonts } from '../Themes'

class NewProduct extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.submitting = {
      wishlist: false,
      product: false,
      search: false
    }
    this.state = {
      search: '',
      listDataSource: [],
      rowDataSource: [],
      dataProduct: props.propsProduct || null,
      header: this.props.header || 'search',
      tipeView: 'list',
      sortModal: false,
      terbaruColor: Colors.lightblack,
      termurahColor: Colors.lightblack,
      termahalColor: Colors.lightblack,
      terlarisColor: Colors.lightblack,
      terbaruCek: 0,
      termurahCek: 0,
      termahalCek: 0,
      terlarisCek: 0,
      filter: false,
      page: 1,
      loadmore: false,
      isRefreshing: true,
      isLoading: false,
      kondisi: '',
      pengiriman: '',
      price: '',
      address: '',
      brand: '',
      other: '',
      statusFilter: false,
      sort: 'newest',
      wishlist: props.propsWishlist || null,
      storeId: this.props.storeId || '',
      isFound: false,
      modalSearch: false,
      refreshSearch: false,
      valueSearch: this.props.query || '',
      resultSearch: []
    }
  }

  componentDidMount () {
    Reactotron.log('new product')
    if (!this.submitting.product) {
      this.submitting = {
        ...this.submitting,
        product: true
      }
      Reactotron.log('new product')
      this.props.getListProduct({page: 1, store_id: this.state.storeId, q: this.state.valueSearch})
    }
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
  }

  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
  }

  componentWillReceiveProps (nextProps) {
    const {propsWishlist, propsProduct, dataSearch} = nextProps

    if (!isFetching(propsProduct) && this.submitting.product) {
      this.submitting = { ...this.submitting, product: false }
      if (isError(propsProduct)) {
        ToastAndroid.show(propsProduct.message, ToastAndroid.SHORT)
      }
      if (isFound(propsProduct)) {
        const isFound = propsProduct.products.length
        this.setState({isRefreshing: false})
        if (isFound >= 10) {
          const data = [...this.state.listDataSource, ...propsProduct.products]
          this.setState({
            dataProduct: propsProduct,
            listDataSource: data,
            rowDataSource: data,
            isLoading: false,
            loadmore: true,
            page: this.state.page + 1,
            isRefreshing: false,
            gettingData: false
          })
        } else {
          const data = [...this.state.listDataSource, ...propsProduct.products]
          this.setState({
            dataProduct: propsProduct,
            listDataSource: data,
            rowDataSource: data,
            isLoading: false,
            loadmore: false,
            page: 1,
            isRefreshing: false
          })
        }
      }
    }

    if (!isFetching(dataSearch) && this.submitting.search) {
      this.submitting = { ...this.submitting, search: false }
      if (isError(dataSearch)) {
        ToastAndroid.show(dataSearch.message, ToastAndroid.SHORT)
      }
      if (isFound(dataSearch)) {
        const result = dataSearch.products
        if (result.length === 0) {
          this.setState({
            resultSearch: dataSearch.products,
            isFound: true,
            refreshSearch: false
          })
        } else {
          this.setState({
            resultSearch: dataSearch.products,
            isFound: false,
            refreshSearch: false
          })
        }
      }
    }

    if (!isFetching(propsWishlist) && this.submitting.wishlist) {
      this.submitting = { ...this.submitting, wishlist: false }
      if (isError(propsWishlist)) {
        ToastAndroid.show(propsWishlist.message, ToastAndroid.SHORT)
      }
      if (isFound(propsWishlist)) {
        this.setState({ wishlist: propsWishlist })
      }
    }
  }

  handleBack = () => {
    NavigationActions.pop()
    return true
  }

  handleTextSearch = (text) => {
    this.setState({ search: text, isFound: false, refreshSearch: true })
    this.submitting.search = true
    if (text !== '') {
      this.props.getSearch({q: text, store_id: this.state.storeId})
    } else {
      this.props.getSearch({q: 'null', store_id: this.state.storeId})
    }
  }

  detailResult (name) {
    this.setState({ gettingData: true, header: name, isRefreshing: true, listDataSource: [], rowDataSource: [], modalSearch: false, page: 1, resultSearch: [], search: '', valueSearch: name })
    if (!this.submitting.product) {
      this.submitting = {
        ...this.submitting,
        product: true
      }
      Reactotron.log('search result detail ' + name)
      this.props.getListProduct({q: name})
    }
  }

  searchFocus () {
    this.setState({
      isFound: false,
      search: ''
    })
  }

  renderRowSearch (rowData) {
    return (
      <TouchableOpacity style={styles.buttonStyle} onPress={() => this.detailResult(rowData.name)}>
        <Text style={styles.textResult}>
          {rowData.name}
        </Text>
      </TouchableOpacity>
    )
  }

  loadMore () {
    const {
      loadmore,
      isLoading
    } = this.state
    if (!isLoading) {
      if (loadmore) {
        this.submitting.product = true
        this.props.getListProduct({
          q: this.state.valueSearch,
          store_id: this.state.storeId,
          condition: this.state.kondisi,
          services: this.state.pengiriman,
          price: this.state.price,
          address: this.state.address,
          brands: this.state.brand,
          other: this.state.other,
          page: this.state.page,
          sort: this.state.sort
        })
      }
    }
  }

  refresh = () => {
    const { lightblack } = Colors
    this.setState({ gettingData: true, header: 'Produk Terbaru', isRefreshing: true, listDataSource: [], rowDataSource: [], page: 1, isLoading: true, valueSearch: '' })
    this.setState({ terbaruColor: lightblack, termurahColor: lightblack, termahalColor: lightblack, terlarisColor: lightblack, terbaruCek: 0, termurahCek: 0, termahalCek: 0, terlarisCek: 0, isRefreshing: true, sort: 'newest' })
    this.submitting = {
      wishlist: false,
      product: true
    }
    this.props.getListProduct({
      store_id: this.state.storeId,
      page: 1
    })
  }

  renderHeader () {
    return (
      <View style={stylesSearch.headerTextContainer}>
        <TouchableOpacity onPress={() => NavigationActions.pop()}>
          <Image
            source={Images.iconBack}
            style={stylesSearch.imageStyle}
          />
        </TouchableOpacity>
        <Text style={stylesSearch.headerText}>
          {this.state.header}
        </Text>
        <TouchableOpacity onPress={() => this.setState({modalSearch: true})}>
          <Image
            source={Images.searchWhite}
            style={stylesSearch.imageStyle}
          />
        </TouchableOpacity>
      </View>
    )
  }

  renderVerified (status) {
    if (status === 'verified') {
      return (
        <Image source={Images.verified} style={styles.imageVerified} />
      )
    }
    return (
      <Image source={Images.love} style={styles.imageVerified} />
    )
  }

  renderDiskon (status, nominal) {
    if (status) {
      const money = this.maskedMoney(nominal)
      return (
        <Text style={styles.nominalDiskon}>
          {money}
        </Text>
      )
    }
    return (
      <Text style={styles.nominalDiskon1}>
        asd
      </Text>
    )
  }

  addWishList (id) {
    const {listDataSource} = this.state
    if (this.props.datalogin.login) {
      this.submitting = {
        ...this.submitting,
        wishlist: true
      }
      listDataSource.map((myProduct) => {
        if (myProduct.product.id === id) {
          myProduct.product.is_liked ? myProduct.product.count_like -= 1 : myProduct.product.count_like += 1
          myProduct.product.is_liked = !myProduct.product.is_liked
        }
      })
      this.props.addWishList({id: id})
      this.setState({ listDataSource })
    } else {
      Alert.alert('Pesan', 'Anda belum login')
    }
  }

  renderLikes (status, id) {
    if (status) {
      return (
        <TouchableOpacity onPress={() => this.addWishList(id)}>
          <Image source={Images.lovered} style={styles.imageStyleLike} />
        </TouchableOpacity>
      )
    }
    return (
      <TouchableOpacity onPress={() => this.addWishList(id)}>
        <Image source={Images.love} style={styles.imageStyleNotLike} />
      </TouchableOpacity>
    )
  }

  discountCalculate (price, discount) {
    let hargaDiskon = price - ((discount / 100) * price)
    return hargaDiskon
  }

  checkDiscount (discount, isDiscount, isWholesaler) {
    if (isDiscount) {
      return (
        <View style={styles.containerDiskon}>
          <Text style={styles.diskon}>
            {discount}%
          </Text>
        </View>
      )
    } if (isWholesaler) {
      return (
        <View style={[styles.containerDiskon, {backgroundColor: Colors.green}]}>
          <Text style={[styles.diskon, {fontSize: Fonts.size.extraTiny}]}>
            GROSIR
          </Text>
        </View>
      )
    } else {
      return (<View />)
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

  renderRowList (rowData) {
    if (rowData.product.is_discount) {
      this.hargaDiskon = this.discountCalculate(rowData.product.price, rowData.product.discount)
    } else {
      this.hargaDiskon = rowData.product.price
    }

    const money = this.maskedMoney(this.hargaDiskon)
    return (
      <TouchableOpacity style={styles.rowDataContainer} activeOpacity={0.5} onPress={() =>
        this.produkDetail(rowData.product.id)}>
        <Image source={{ uri: rowData.product.image }} style={styles.imageProduct} />
        {this.checkDiscount(rowData.product.discount, rowData.product.is_discount, rowData.product.is_wholesaler)}
        <View style={styles.containerTitle}>
          <Text style={styles.textTitleProduct}>
            {rowData.product.name}
          </Text>
          <View style={styles.tokoContainer}>
            <Text style={styles.namaToko}>
              {rowData.store.name}
            </Text>
            {this.renderVerified(rowData.store.remarks_status)}
          </View>
          {this.renderDiskon(rowData.product.is_discount, rowData.product.price)}
          <View style={styles.moneyLikesContainer}>
            <View style={{flex: 1}}>
              <Text style={styles.harga}>
                {money}
              </Text>
            </View>
            <View style={styles.likesContainer}>
              {this.renderLikes(rowData.product.is_liked, rowData.product.id)}
              <Text style={styles.like}>
                {rowData.product.count_like}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  renderRowGrid (rowData) {
    if (rowData.product.is_discount) {
      this.hargaDiskon = this.discountCalculate(rowData.product.price, rowData.product.discount)
    } else {
      this.hargaDiskon = rowData.product.price
    }

    const money = this.maskedMoney(this.hargaDiskon)
    return (
      <TouchableOpacity style={stylesHome.rowDataContainer} activeOpacity={0.5} onPress={() =>
        this.produkDetail(rowData.product.id)}>
        <Image source={{ uri: rowData.product.image }} style={stylesHome.imageProduct} />
        {this.checkDiscount(rowData.product.discount, rowData.product.is_discount, rowData.product.is_wholesaler)}
        <Text style={stylesHome.textTitleProduct}>
          {rowData.product.name}
        </Text>
        <View style={stylesHome.tokoContainer}>
          <Text style={stylesHome.namaToko}>
            {rowData.store.name}
          </Text>
          {this.renderVerified(rowData.store.remarks_status)}
        </View>
        {this.renderDiskon(rowData.product.is_discount, rowData.product.price)}
        <Text style={stylesHome.harga}>
          {money}
        </Text>
        <View style={stylesHome.likesContainer}>
          {this.renderLikes(rowData.product.is_liked, rowData.product.id)}
          <Text style={stylesHome.like}>
            {rowData.product.count_like}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  produkDetail (id) {
    NavigationActions.detailproduct({
      type: ActionConst.PUSH,
      id: id
    })
    this.props.getDetailProduk(id)
  }

  changeView () {
    if (this.state.tipeView === 'grid') {
      this.setState({
        tipeView: 'list'
      })
    } else {
      this.setState({
        tipeView: 'grid'
      })
    }
  }

  viewProduk () {
    if (this.state.tipeView === 'grid') {
      return (
        <ListView
          contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
          enableEmptySections
          dataSource={this.dataSource.cloneWithRows(this.state.rowDataSource)}
          renderRow={this.renderRowGrid.bind(this)}
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
          onEndReached={this.loadMore.bind(this)}
          renderFooter={() => {
            if (this.state.loadmore) {
              return (
                <ActivityIndicator
                  style={[styles.loadingStyle, { height: 50, marginLeft: Metrics.screenWidth / 2 - 20 }]}
                  size='small'
                  color='#ef5656'
                />
              )
            }
            return <View />
          }}
          style={styles.listView}
        />
      )
    }
    return (
      <ListView
        contentContainerStyle={{ flexDirection: 'column', flexWrap: 'wrap' }}
        enableEmptySections
        dataSource={this.dataSource.cloneWithRows(this.state.listDataSource)}
        renderRow={this.renderRowList.bind(this)}
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
        onEndReached={this.loadMore.bind(this)}
        renderFooter={() => {
          if (this.state.loadmore) {
            return (
              <ActivityIndicator
                style={[styles.loadingStyle, { height: 50 }]}
                size='small'
                color='#ef5656'
              />
            )
          }
          return <View />
        }}
        style={styles.listView}
      />
    )
  }

  renderImageTypeView () {
    if (this.state.tipeView === 'grid') {
      return (
        <Image source={Images.grid} style={styles.searchImage} />
      )
    }
    return (
      <Image source={Images.list} style={styles.searchImage} />
    )
  }

  renderModalFilter () {
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.filter}
        onRequestClose={() => { this.setState({ filter: false }) }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeaderContainer}>
            <Text style={styles.modalHeaderText}>
              Filter
            </Text>
            <TouchableOpacity onPress={() => this.setState({filter: false})}>
              <Image
                source={Images.close}
                style={styles.imageCancel}
              />
            </TouchableOpacity>
          </View>
          <Filter
            handlingFilter={(kondisi, pengiriman, price, address, brand, other) =>
            this.handlingFilter(kondisi, pengiriman, price, address, brand, other)} />
        </View>
      </Modal>
    )
  }

  handlingFilter (kondisi, pengiriman, price, address, brand, other) {
    this.submitting.product = true
    this.setState({
      filter: false,
      page: 1,
      kondisi: kondisi,
      pengiriman: pengiriman,
      price: price,
      address: address,
      brand: brand,
      other: other,
      isRefreshing: true,
      rowDataContainer: [],
      listDataSource: [],
      gettingData: true
    })
    this.props.getListProduct({
      q: this.state.valueSearch,
      store_id: this.state.storeId,
      condition: kondisi,
      services: pengiriman,
      price: price,
      address: address,
      brands: brand,
      other: other,
      page: this.state.page,
      sort: this.state.sort
    })
  }

  modalSort () {
    const {terbaruColor, termurahColor, termahalColor, terlarisColor, terbaruCek, termurahCek, termahalCek, terlarisCek} = this.state
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.sortModal}
        onRequestClose={() => this.setState({ sortModal: false })}
        >
        <TouchableOpacity activeOpacity={1} style={styles.blackContainer} onPress={() => this.setState({ sortModal: false })} />
        <View style={styles.modalSortContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Urutkan Berdasarkan</Text>
          </View>
          <TouchableOpacity onPress={() => this.onClickSort('newest')}>
            <View style={styles.itemContainer}>
              <Text style={[styles.title, {color: terbaruColor}]}>Terbaru</Text>
              <Image style={[styles.checkImage, {opacity: terbaruCek}]} source={Images.centangBiru} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onClickSort('cheapest')}>
            <View style={styles.itemContainer}>
              <Text style={[styles.title, {color: termurahColor}]}>Termurah</Text>
              <Image style={[styles.checkImage, {opacity: termurahCek}]} source={Images.centangBiru} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onClickSort('expensive')}>
            <View style={styles.itemContainer}>
              <Text style={[styles.title, {color: termahalColor}]}>Termahal</Text>
              <Image style={[styles.checkImage, {opacity: termahalCek}]} source={Images.centangBiru} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onClickSort('selling')}>
            <View style={styles.itemContainer}>
              <Text style={[styles.title, {color: terlarisColor}]}>Terlaris</Text>
              <Image style={[styles.checkImage, {opacity: terlarisCek}]} source={Images.centangBiru} />
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    )
  }

  dispatchSort (typesort) {
    this.setState({
      isRefreshing: true,
      listDataSource: [],
      rowDataSource: [],
      page: 1,
      sortModal: false,
      sort: typesort,
      gettingData: true
    })
    const {
      valueSearch,
      kondisi,
      pengiriman,
      price,
      address,
      brand,
      other,
      id
    } = this.state
    this.submitting.product = true
    this.props.getListProduct({
      q: valueSearch,
      category_id: id,
      condition: kondisi,
      services: pengiriman,
      price: price,
      address: address,
      brands: brand,
      other: other,
      page: 1,
      sort: typesort
    })
  }

  onClickSort (field) {
    const {bluesky, lightblack} = Colors
    if (field === 'newest') {
      this.setState({terbaruColor: bluesky, termurahColor: lightblack, termahalColor: lightblack, terlarisColor: lightblack, terbaruCek: 1, termurahCek: 0, termahalCek: 0, terlarisCek: 0})
      this.dispatchSort(field)
    } else if (field === 'cheapest') {
      this.setState({terbaruColor: lightblack, termurahColor: bluesky, termahalColor: lightblack, terlarisColor: lightblack, terbaruCek: 0, termurahCek: 1, termahalCek: 0, terlarisCek: 0})
      this.dispatchSort(field)
    } else if (field === 'expensive') {
      this.setState({terbaruColor: lightblack, termurahColor: lightblack, termahalColor: bluesky, terlarisColor: lightblack, terbaruCek: 0, termurahCek: 0, termahalCek: 1, terlarisCek: 0})
      this.dispatchSort(field)
    } else if (field === 'selling') {
      this.setState({terbaruColor: lightblack, termurahColor: lightblack, termahalColor: lightblack, terlarisColor: bluesky, terbaruCek: 0, termurahCek: 0, termahalCek: 0, terlarisCek: 1})
      this.dispatchSort(field)
    }
  }

  render () {
    let background
    background = stylesSearch.kategori
    return (
      <View style={styles.container}>
        <View style={[styles.headerContainer, background]}>
          {this.renderHeader()}
        </View>
        {this.viewProduk()}
        <View style={styles.footerMenu}>
          <TouchableOpacity style={styles.blah} onPress={() => this.setState({sortModal: true})}>
            <View style={styles.buttonFooter}>
              <Image style={styles.imageFooter} source={Images.sort} />
              <Text style={styles.footerButton}>Urutkan</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.blah} onPress={() => this.setState({filter: true})}>
            <View style={styles.buttonFooter}>
              <Image style={styles.imageFooter} source={Images.filter} />
              <Text style={styles.footerButton}>Filter</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.blah} onPress={() => this.changeView()}>
            <View style={styles.buttonFooter}>
              {this.renderImageTypeView()}
              <Text style={styles.footerButton}>Tampilan</Text>
            </View>
          </TouchableOpacity>
        </View>
        <ModalSearchGeneral
          visible={this.state.modalSearch}
          onClose={() => this.setState({modalSearch: false})}
          onBack={() => this.setState({modalSearch: false})}
          refreshing={this.state.refreshSearch}
          value={this.state.search}
          onChangeText={this.handleTextSearch}
          notFound={this.state.isFound}
          dataSource={this.dataSource.cloneWithRows(this.state.resultSearch)}
          renderRow={this.renderRowSearch.bind(this)}
          onChangeSearch={() => this.searchFocus()}
        />
        {this.renderModalFilter()}
        {this.modalSort()}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    propsProduct: state.productBySearch,
    propsWishlist: state.addWishlist,
    datalogin: state.isLogin,
    dataSearch: state.searchProduct
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getListProduct: (param) => dispatch(produkAction.listProductBySearch(param)),
    addWishList: (param) => dispatch(produkAction.addToWishlist(param)),
    getDetailProduk: (id) => dispatch(produkAction.getProduct({id: id})),
    getSearch: (param) => dispatch(homeAction.search(param))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewProduct)
