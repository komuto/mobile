import React from 'react'
import {
  Text,
  ListView,
  View,
  Image,
  TouchableOpacity,
  TextInput,
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
import ModalSearchGeneral from '../Components/Search'

import Filter from '../Components/Filter'
import {isFetching, isError, isFound} from '../Services/Status'

// import YourActions from '../Redux/YourRedux'
import * as produkAction from '../actions/product'
import * as homeAction from '../actions/home'

// Styles
import styles from './Styles/ProdukTerbaruScreenStyle'
import stylesSearch from './Styles/SearchResultStyle'
import stylesHome from './Styles/HomeStyle'

import { Images, Colors, Metrics, Fonts } from '../Themes'

class SearchResult extends React.Component {

  constructor (props) {
    super(props)
    this.dataSourceList = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.dataSourceRow = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.dataSourceSearch = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.submitting = {
      wishlist: false,
      product: false,
      search: false,
      loadFromSearch: false
    }
    this.state = {
      search: '',
      listDataSource: [],
      rowDataSource: [],
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
      params: this.props.params || null,
      isFound: false,
      modalSearch: false,
      refreshSearch: false,
      resultSearch: []
    }
  }

  componentDidMount () {
    if (!this.submitting.product) {
      this.submitting = {
        ...this.submitting,
        product: true
      }
      this.props.getProdukTerbaru(this.state.params)
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
            page: this.state.page + 1
          })
        } else {
          const data = [...this.state.listDataSource, ...propsProduct.products]
          this.setState({
            dataProduct: propsProduct,
            listDataSource: data,
            rowDataSource: data,
            isLoading: false,
            loadmore: false,
            page: 1
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

  handlingFilter (kondisi, pengiriman, price, address, brand, other, sort) {
    this.props.getFilterProduk(kondisi, pengiriman, price, address, brand, other, 1, sort)
    this.setState({
      filter: false,
      page: 2,
      kondisi: kondisi,
      pengiriman: pengiriman,
      price: price,
      address: address,
      brand: brand,
      other: other,
      statusFilter: true,
      isRefreshing: true
    })
  }

  handleBack = () => {
    NavigationActions.pop()
  }

  backButton () {
    NavigationActions.pop()
  }

  handleTextSearch = (text) => {
    this.setState({ search: text, isFound: false, refreshSearch: true })
    this.trySearch(text)
  }

  trySearch (text) {
    if (text !== '') {
      this.submitting.search = true
      setTimeout(() => {
        this.props.getSearch(text)
      }, 1000)
    }
  }

  detailResult (name) {
    this.setState({ modalSearch: false, search: '', header: name, page: 1, resultSearch: [], rowDataSource: [], listDataSource: [] })
    if (!this.submitting.category) {
      this.submitting = {
        ...this.submitting,
        product: true,
        loadFromSearch: true
      }
      this.props.getProdukTerbaru({
        q: name,
        page: 1
      })
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

  loadMore = () => {
    // const { search, id, page, loadmore, isLoading, kondisi, pengiriman, price, address, brand, other } = this.state
    // const { search, id, page, loadmore, isLoading } = this.state
    // if (!isLoading) {
    //   if (loadmore) {
    //     this.submitting.category = true
    //     if (this.submitting.loadFromSearch) {
    //       Reactotron.log('search')
    //       this.props.getProdukTerbaru({
    //         q: search,
    //         page: page
    //       })
    //     } else {
    //       Reactotron.log('biasa')
    //       this.props.getProdukTerbaru({
    //         page: page
    //       })
    //     }
    //   }
    // }
  }

  refresh = () => {
    // const { search, id, page, kondisi, pengiriman, price, address, brand, other, sort } = this.state
    const { header } = this.state
    this.setState({ isRefreshing: true, listDataSource: [], rowDataSource: [], page: 1 })
    this.submitting.product = true
    this.props.getProdukTerbaru({
      q: header,
      page: 1
    })
  }

  renderHeader () {
    return (
      <View style={stylesSearch.headerTextContainer}>
        <TouchableOpacity onPress={() => this.backButton()}>
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

  openFilter () {
    this.setState({
      filter: true
    })
  }

  closeModal () {
    this.setState({
      filter: false
    })
  }

  setSortModal (visible) {
    this.setState({sortModal: visible})
  }

  _onPress (field) {
    const {bluesky, lightblack} = Colors
    const {kondisi, pengiriman, price, address, brand, other} = this.state
    if (field === 'terbaru') {
      this.setState({terbaruColor: bluesky, termurahColor: lightblack, termahalColor: lightblack, terlarisColor: lightblack, terbaruCek: 1, termurahCek: 0, termahalCek: 0, terlarisCek: 0, isRefreshing: true, statusFilter: true, sortModal: false, sort: 'newest'})
      this.props.getFilterProduk(kondisi, pengiriman, price, address, brand, other, 0, 'newest')
    } else if (field === 'termahal') {
      this.setState({terbaruColor: lightblack, termurahColor: lightblack, termahalColor: bluesky, terlarisColor: lightblack, terbaruCek: 0, termurahCek: 0, termahalCek: 1, terlarisCek: 0, isRefreshing: true, statusFilter: true, sortModal: false, sort: 'expensive'})
      this.props.getFilterProduk(kondisi, pengiriman, price, address, brand, other, 0, 'expensive')
    } else if (field === 'termurah') {
      this.setState({terbaruColor: lightblack, termurahColor: bluesky, termahalColor: lightblack, terlarisColor: lightblack, terbaruCek: 0, termurahCek: 1, termahalCek: 0, terlarisCek: 0, isRefreshing: true, statusFilter: true, sortModal: false, sort: 'cheapest'})
      return this.props.getFilterProduk(kondisi, pengiriman, price, address, brand, other, 0, 'cheapest')
    } else if (field === 'terlaris') {
      this.setState({terbaruColor: lightblack, termurahColor: lightblack, termahalColor: lightblack, terlarisColor: bluesky, terbaruCek: 0, termurahCek: 0, termahalCek: 0, terlarisCek: 1, isRefreshing: true, statusFilter: true, sortModal: false, sort: 'selling'})
      this.props.getFilterProduk(kondisi, pengiriman, price, address, brand, other, 0, 'selling')
    }
  }

  renderModalSort () {
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
          <TouchableOpacity onPress={() => this._onPress('terbaru')}>
            <View style={styles.itemContainer}>
              <Text style={[styles.title, {color: terbaruColor}]}>Terbaru</Text>
              <Image style={[styles.checkImage, {opacity: terbaruCek}]} source={Images.centangBiru} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this._onPress('termurah')}>
            <View style={styles.itemContainer}>
              <Text style={[styles.title, {color: termurahColor}]}>Termurah</Text>
              <Image style={[styles.checkImage, {opacity: termurahCek}]} source={Images.centangBiru} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this._onPress('termahal')}>
            <View style={styles.itemContainer}>
              <Text style={[styles.title, {color: termahalColor}]}>Termahal</Text>
              <Image style={[styles.checkImage, {opacity: termahalCek}]} source={Images.centangBiru} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this._onPress('terlaris')}>
            <View style={styles.itemContainer}>
              <Text style={[styles.title, {color: terlarisColor}]}>Terlaris</Text>
              <Image style={[styles.checkImage, {opacity: terlarisCek}]} source={Images.centangBiru} />
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
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
      const money = MaskService.toMask('money', nominal, {
        unit: 'Rp ',
        separator: '.',
        delimiter: '.',
        precision: 3
      })
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
        <TouchableOpacity onPress={() => this.addWishList({id: id})}>
          <Image source={Images.lovered} style={styles.imageStyleLike} />
        </TouchableOpacity>
      )
    }
    return (
      <TouchableOpacity onPress={() => this.addWishList({id: id})}>
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

  renderRowList (rowData) {
    if (rowData.product.is_discount) {
      this.hargaDiskon = this.discountCalculate(rowData.product.price, rowData.product.discount)
    } else {
      this.hargaDiskon = rowData.product.price
    }

    const money = MaskService.toMask('money', this.hargaDiskon, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })

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

    const money = MaskService.toMask('money', this.hargaDiskon, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
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
          dataSource={this.dataSourceRow.cloneWithRows(this.state.rowDataSource)}
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
        dataSource={this.dataSourceList.cloneWithRows(this.state.listDataSource)}
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
          <TouchableOpacity style={styles.blah} onPress={() => this.setSortModal(true)}>
            <View style={styles.buttonFooter}>
              <Image style={styles.imageFooter} source={Images.sort} />
              <Text style={styles.footerButton}>Urutkan</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.blah} onPress={() => this.openFilter()}>
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
              <TouchableOpacity onPress={() => this.closeModal()}>
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
        {this.renderModalSort()}
        <ModalSearchGeneral
          visible={this.state.modalSearch}
          onClose={() => this.setState({modalSearch: false})}
          onBack={() => this.setState({modalSearch: false})}
          refreshing={this.state.refreshSearch}
          value={this.state.search}
          onChangeText={this.handleTextSearch}
          notFound={this.state.isFound}
          dataSource={this.dataSourceSearch.cloneWithRows(this.state.resultSearch)}
          renderRow={this.renderRowSearch.bind(this)}
          onChangeSearch={() => this.searchFocus()}
        />
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
    getProdukTerbaru: (param) => dispatch(produkAction.listProductBySearch(param)),
    getSearch: (query) => dispatch(homeAction.search({query})),
    addWishList: (param) => dispatch(produkAction.addToWishlist(param)),
    getFilterProduk: (condition, services, price, address, brands, other, page, sort) => dispatch(produkAction.listProductBySearch({
      condition: condition,
      services: services,
      price: price,
      address: address,
      brands: brands,
      other: other,
      page: page,
      sort: sort
    })),
    getDetailProduk: (id) => dispatch(produkAction.getProduct({id: id}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult)
