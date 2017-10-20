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

import Filter from '../Components/Filter'
import {isFetching, isError, isFound} from '../Services/Status'

// import YourActions from '../Redux/YourRedux'
import * as produkAction from '../actions/product'

// Styles
import styles from './Styles/ProdukTerbaruScreenStyle'
import stylesSearch from './Styles/SearchResultStyle'
import stylesHome from './Styles/HomeStyle'

import { Images, Colors, Metrics, Fonts } from '../Themes'

class NewProduct extends React.Component {

  constructor (props) {
    super(props)
    this.dataSourceList = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.dataSourceRow = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.submitting = {
      wishlist: false
    }
    this.state = {
      search: '',
      listDataSource: [],
      rowDataSource: [],
      header: this.props.header || 'search',
      tipe: this.props.tipe || 'kategori',
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
      params: this.props.params || null
    }
  }

  componentDidMount () {
    Reactotron.log(this.state.params)
    this.props.getProdukTerbaru(this.state.params)
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
  }

  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
  }

  componentWillReceiveProps (nextProps) {
    const {propsWishlist, dataFilter} = nextProps
    if (dataFilter.status === 200) {
      if (!this.state.statusFilter) {
        if (dataFilter.products.length > 0) {
          let data = [...this.state.listDataSource, ...dataFilter.products]
          this.setState({
            listDataSource: data,
            rowDataSource: data,
            isRefreshing: false,
            isLoading: false,
            loadmore: true,
            page: this.state.page + 1
          })
        } else {
          this.setState({
            loadmore: false,
            isLoading: false
          })
        }
      } else {
        this.setState({
          listDataSource: dataFilter.products,
          rowDataSource: dataFilter.products,
          isRefreshing: false,
          isLoading: false,
          loadmore: true,
          statusFilter: false,
          page: 2
        })
      }
    } else if (dataFilter.status > 200) {
      this.setState({
        isRefreshing: false,
        isLoading: false,
        loadmore: true
      })
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
    if (this.state.tipe === 'search') {
      this.setState({
        tipe: 'data'
      })
      return true
    } else if (NavigationActions.pop()) {
      return true
    }
  }

  handleTextSearch = (text) => {
    this.setState({ search: text })
  }

  search () {
    console.log('dispatch search')
  }

  backButton () {
    NavigationActions.pop()
  }

  backSearch () {
    this.setState({
      tipe: 'data'
    })
  }

  loadMore () {
    const { page, loadmore, isLoading, kondisi, pengiriman, price, address, brand, other } = this.state
    if (!isLoading) {
      if (loadmore) {
        this.props.getFilterProduk(kondisi, pengiriman, price, address, brand, other, page)
      }
    }
  }

  refresh = () => {
    const { kondisi, pengiriman, price, address, brand, other, sort } = this.state
    this.setState({ isRefreshing: true, listDataSource: [], rowDataSource: [], page: 1, isLoading: true })
    this.props.getFilterProduk(kondisi, pengiriman, price, address, brand, other, 1, sort)
  }

  renderHeader () {
    const { search } = this.state
    if (this.state.tipe === 'search') {
      return (
        <View style={stylesSearch.headerContainerRender}>
          <TouchableOpacity onPress={() => this.backSearch()}>
            <Image
              source={Images.leftArrow}
              style={stylesSearch.imageStyle}
            />
          </TouchableOpacity>
          <View style={stylesSearch.textInputContainer}>
            <TextInput
              ref='search'
              autoFocus
              onSubmitEditing={() => this.search()}
              style={stylesSearch.inputText}
              value={search}
              keyboardType='default'
              autoCapitalize='none'
              autoCorrect
              onChangeText={this.handleTextSearch}
              underlineColorAndroid='transparent'
              placeholder='Cari Barang'
            />
          </View>
        </View>
      )
    }
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
        <TouchableOpacity onPress={() => this.openSearch()}>
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

  openSearch () {
    NavigationActions.search({ type: ActionConst.PUSH, from: 'product' })
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
    if (this.state.tipe === 'search') {
      background = stylesSearch.search
    } else {
      background = stylesSearch.kategori
    }
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
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataProduk: state.products,
    dataFilter: state.productBySearch,
    propsWishlist: state.addWishlist,
    datalogin: state.isLogin
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProdukTerbaru: (param) => dispatch(produkAction.listProductBySearch(param)),
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

export default connect(mapStateToProps, mapDispatchToProps)(NewProduct)
