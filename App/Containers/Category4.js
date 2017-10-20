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
import Filter from '../Components/Filter'
import ModalSearch from '../Components/SearchByCategory'
import {isFetching, isError, isFound} from '../Services/Status'
import Reactotron from 'reactotron-react-native'

import * as produkAction from '../actions/product'
import * as homeAction from '../actions/home'

import styles from './Styles/ProdukTerbaruScreenStyle'
import stylesSearch from './Styles/SearchResultStyle'
import stylesHome from './Styles/HomeStyle'

import { Images, Colors, Fonts } from '../Themes'

class Category4 extends React.Component {

  constructor (props) {
    super(props)
    this.dataSourceList = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.submitting = {
      wishlist: false,
      category: false,
      search: false,
      loadFromSearch: false
    }
    this.state = {
      search: '',
      dataProduct: props.propsProduct || null,
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
      sort: 'newest',
      wishlist: props.propsWishlist || null,
      searchfrom: this.props.searchfrom,
      id: this.props.id,
      query: this.props.search,
      resultSearch: [],
      from: this.props.from,
      isFound: false,
      modalSearch: false,
      refreshSearch: false,
      valueSearch: ''
    }
  }

  componentDidMount () {
    if (!this.submitting.category) {
      this.submitting = {
        ...this.submitting,
        category: true
      }
      this.props.getProduct({category_id: this.state.id})
    }
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
  }

  componentWillUnmount () {
    this.submitting.loadFromSearch = false
    this.setState({search: ''})
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
  }

  componentWillReceiveProps (nextProps) {
    const {propsWishlist, propsProduct, dataSearch} = nextProps

    if (!isFetching(propsProduct) && this.submitting.category) {
      this.submitting = { ...this.submitting, category: false }
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
            isRefreshing: false
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
  }

  handleTextSearch = (text) => {
    this.setState({ search: text, valueSearch: text, isFound: false, refreshSearch: true })
    this.trySearch(text)
  }

  trySearch (text) {
    if (text !== '') {
      this.submitting.search = true
      setTimeout(() => {
        this.props.getSearch({q: text, category_id: this.state.id})
      }, 1000)
    }
  }

  detailResult (name) {
    this.setState({ modalSearch: false, header: name, page: 1, search: '', rowDataSource: [], listDataSource: [] })
    if (!this.submitting.category) {
      this.submitting = {
        ...this.submitting,
        category: true,
        loadFromSearch: true
      }
      this.props.getProduct({q: name, category_id: this.state.id, page: 1})
    }
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

  searchFocus () {
    this.setState({
      isFound: false,
      search: ''
    })
  }

  loadMore = () => {
    Reactotron.log('load more')
    const {isLoading, loadmore, valueSearch, kondisi, pengiriman, price, address, brand, other, page, sort, id} = this.state
    if (!isLoading) {
      if (loadmore) {
        this.submitting.category = true
        this.props.getProduct({
          q: valueSearch,
          category_id: id,
          condition: kondisi,
          services: pengiriman,
          price: price,
          address: address,
          brands: brand,
          other: other,
          page: page,
          sort: sort
        })
      }
    }
  }

  refresh = () => {
    const { id } = this.state
    const { lightblack } = Colors
    this.setState({ isRefreshing: true, listDataSource: [], rowDataSource: [], page: 1, isLoading: true, valueSearch: '' })
    this.setState({ terbaruColor: lightblack, termurahColor: lightblack, termahalColor: lightblack, terlarisColor: lightblack, terbaruCek: 0, termurahCek: 0, termahalCek: 0, terlarisCek: 0, isRefreshing: true, sort: 'newest' })
    this.submitting = {
      wishlist: false,
      category: true,
      search: false,
      loadFromSearch: false,
      sort: false
    }
    this.props.getProduct({
      category_id: id,
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

  onClickWishList (id) {
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
      this.props.addWishList({id})
      this.setState({ listDataSource })
    } else {
      Alert.alert('Pesan', 'Anda belum login')
    }
  }

  renderLikes (status, id) {
    if (status) {
      return (
        <TouchableOpacity onPress={() => this.onClickWishList(id)}>
          <Image source={Images.lovered} style={styles.imageStyleLike} />
        </TouchableOpacity>
      )
    }
    return (
      <TouchableOpacity onPress={() => this.onClickWishList(id)}>
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
        this.onClickProdukDetail(rowData.product.id)}>
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
        this.onClickProdukDetail(rowData.product.id)}>
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

  onClickProdukDetail (id) {
    NavigationActions.detailproduct({
      type: ActionConst.PUSH,
      id: id
    })
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
          contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap'}}
          enableEmptySections
          dataSource={this.dataSourceList.cloneWithRows(this.state.rowDataSource)}
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
          onEndReached={this.loadMore}
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
        onEndReached={this.loadMore}
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

  modalFilter () {
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
    const { id, valueSearch, page, sort } = this.state
    this.submitting.category = true
    this.props.getProduct({
      q: valueSearch,
      category_id: id,
      condition: kondisi,
      services: pengiriman,
      price: price,
      address: address,
      brands: brand,
      other: other,
      page: page,
      sort: sort
    })
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
      listDataSource: []
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
          <TouchableOpacity onPress={() => this.onClickSort('terbaru')}>
            <View style={styles.itemContainer}>
              <Text style={[styles.title, {color: terbaruColor}]}>Terbaru</Text>
              <Image style={[styles.checkImage, {opacity: terbaruCek}]} source={Images.centangBiru} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onClickSort('termurah')}>
            <View style={styles.itemContainer}>
              <Text style={[styles.title, {color: termurahColor}]}>Termurah</Text>
              <Image style={[styles.checkImage, {opacity: termurahCek}]} source={Images.centangBiru} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onClickSort('termahal')}>
            <View style={styles.itemContainer}>
              <Text style={[styles.title, {color: termahalColor}]}>Termahal</Text>
              <Image style={[styles.checkImage, {opacity: termahalCek}]} source={Images.centangBiru} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onClickSort('terlaris')}>
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
    const {lightblack} = Colors
    this.setState({
      isRefreshing: true,
      listDataSource: [],
      rowDataSource: [],
      page: 1,
      terbaruColor: lightblack,
      termurahColor: lightblack,
      termahalColor: lightblack,
      terlarisColor: lightblack,
      terbaruCek: 0,
      termurahCek: 0,
      termahalCek: 0,
      terlarisCek: 0
    })
    const {
      valueSearch,
      kondisi,
      pengiriman,
      price,
      address,
      brand,
      other,
      page,
      sort,
      id
    } = this.state
    this.submitting.category = true
    this.props.getProduct({
      q: valueSearch,
      category_id: id,
      condition: kondisi,
      services: pengiriman,
      price: price,
      address: address,
      brands: brand,
      other: other,
      page: page,
      sort: sort
    })
  }

  onClickSort (field) {
    const {bluesky, lightblack} = Colors
    if (field === 'terbaru') {
      this.setState({terbaruColor: bluesky, termurahColor: lightblack, termahalColor: lightblack, terlarisColor: lightblack, terbaruCek: 1, termurahCek: 0, termahalCek: 0, terlarisCek: 0, isRefreshing: true, sortModal: false, sort: 'newest'})
      this.dispatchSort('newest')
    } else if (field === 'termahal') {
      this.setState({terbaruColor: lightblack, termurahColor: lightblack, termahalColor: bluesky, terlarisColor: lightblack, terbaruCek: 0, termurahCek: 0, termahalCek: 1, terlarisCek: 0, isRefreshing: true, sortModal: false, sort: 'expensive'})
      this.dispatchSort('expensive')
    } else if (field === 'termurah') {
      this.setState({terbaruColor: lightblack, termurahColor: bluesky, termahalColor: lightblack, terlarisColor: lightblack, terbaruCek: 0, termurahCek: 1, termahalCek: 0, terlarisCek: 0, isRefreshing: true, sortModal: false, sort: 'cheapest'})
      this.dispatchSort('cheapest')
    } else if (field === 'terlaris') {
      this.setState({terbaruColor: lightblack, termurahColor: lightblack, termahalColor: lightblack, terlarisColor: bluesky, terbaruCek: 0, termurahCek: 0, termahalCek: 0, terlarisCek: 1, isRefreshing: true, sortModal: false, sort: 'selling'})
      this.dispatchSort('selling')
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
        {this.modalFilter()}
        {this.modalSort()}
        <ModalSearch
          visible={this.state.modalSearch}
          ref='searchCat'
          onClose={() => this.setState({modalSearch: false})}
          onBack={() => this.setState({modalSearch: false})}
          refreshing={this.state.refreshSearch}
          value={this.state.search}
          onChangeText={this.handleTextSearch}
          isFound={this.state.isFound}
          dataSource={this.dataSourceList.cloneWithRows(this.state.resultSearch)}
          renderRow={this.renderRowSearch.bind(this)}
          onChangeSearch={() => this.searchFocus()}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    propsProduct: state.productByCategory,
    propsWishlist: state.addWishlist,
    datalogin: state.isLogin,
    dataSearch: state.searchProduct
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addWishList: (param) => dispatch(produkAction.addToWishlist(param)),
    getProduct: (param) => dispatch(produkAction.listProductByCategory(param)),
    getSearch: (param) => dispatch(homeAction.search(param))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category4)
