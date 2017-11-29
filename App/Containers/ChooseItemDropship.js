import React from 'react'
import {
  Text,
  ScrollView,
  ToastAndroid,
  ListView,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  BackAndroid,
  Modal,
  ActivityIndicator,
  RefreshControl
} from 'react-native'
import { connect } from 'react-redux'
import RupiahFormat from '../Services/MaskedMoneys'

import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import Filter from '../Components/Filter'
import Reactotron from 'reactotron-react-native'

import * as produkAction from '../actions/product'
import * as categoriAction from '../actions/home'

import {isFetching, isError, isFound} from '../Services/Status'

import styles from './Styles/ProdukTerbaruScreenStyle'
import stylesHome from './Styles/HomeStyle'
import stylesDropshipping from './Styles/PilihBarangDropshippingScreenStyle'
import stylesLokasi from './Styles/ProductDetailScreenStyle'

import { Images, Colors, Metrics, Fonts } from '../Themes'

class ChooseItemDropship extends React.Component {

  constructor (props) {
    super(props)
    this.dataSourceList = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.dataSourceRow = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.submitting = {
      product: false,
      search: false,
      category1: false
    }
    this.state = {
      search: '',
      data: [],
      dataProduct: props.dataProduk || null,
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
      loading: true,
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
      category1: props.category1 || null,
      addCategory1: [
        {
          'id': 0,
          'name': 'Pilih Kategori'
        }
      ],
      modalCategory1: false,
      idCategory1: '',
      fieldCategory1: 'Semua Kategori',
      colorCategory1: Colors.labelgrey,
      iconCategory1: Images.down
    }
  }

  componentDidMount () {
    if (!this.submitting.product) {
      this.submitting = {
        ...this.submitting,
        product: true,
        category1: true
      }
      Reactotron.log('ChooseItemDropship')
      this.props.getCategory1()
      this.props.getDropshipper()
    }
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
  }

  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
  }

  componentWillReceiveProps (nextProps) {
    const {category1, dataProduk, propsWishlist} = nextProps

    if (!isFetching(category1) && this.submitting.category1) {
      this.submitting = { ...this.submitting, category1: false }
      if (isError(category1)) {
        ToastAndroid.show(category1.message, ToastAndroid.SHORT)
      }
      if (isFound(category1)) {
        this.setState({ category1: category1 })
      }
    }

    if (!isFetching(dataProduk)) {
      this.submitting = { ...this.submitting }
      if (isError(dataProduk)) {
        ToastAndroid.show(dataProduk.message, ToastAndroid.SHORT)
      }
      if (isFound(dataProduk)) {
        const isFound = dataProduk.products.length
        if (isFound >= 10) {
          let data = [...this.state.listDataSource, ...dataProduk.products]
          this.setState({
            dataProduct: dataProduk,
            listDataSource: data,
            rowDataSource: data,
            isLoading: false,
            loadmore: true,
            page: this.state.page + 1,
            isRefreshing: false
          })
        } else {
          let data = [...this.state.listDataSource, ...dataProduk.products]
          this.setState({
            dataProduct: dataProduk,
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

  handlingFilter (kondisi, pengiriman, price, address, brand, other) {
    const { search, page, sort, idCategory1 } = this.state
    this.submitting.category = true
    this.props.getDropshipper({
      q: search,
      category_id: idCategory1,
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

  checkDiscount (discount, isDiscount, isWholesaler) {
    if (isDiscount && isWholesaler) {
      return (
        <View stlye={{left: -10, flexDirection: 'column'}}>
          <View style={styles.containerDiskon}>
            <Text style={styles.diskon}>
              {discount}%
            </Text>
          </View>
          <View style={styles.containerDiskon2}>
            <Text style={[styles.diskon, {fontSize: Fonts.size.extraTiny}]}>
              GROSIR
            </Text>
          </View>
        </View>
      )
    } if (isDiscount) {
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

  handleBack = () => {
    NavigationActions.pop()
    return true
  }

  handleTextSearch = (text) => {
    this.setState({ search: text })
    this.setState({listDataSource: [], rowDataSource: []})
    this.props.getDropshipper({q: text})
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
      search,
      kondisi,
      pengiriman,
      price,
      address,
      brand,
      other,
      page,
      sort,
      idCategory1
    } = this.state
    this.submitting.category = true
    this.props.getDropshipper({
      q: search,
      category_id: idCategory1,
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
    )
  }

  renderVerified (status) {
    if (status) {
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
      ToastAndroid.show('Anda belum login', ToastAndroid.SHORT)
    }
  }

  discountCalculate (price, discount) {
    let hargaDiskon = price - ((discount / 100) * price)
    return hargaDiskon
  }

  produkDetail (id, commission) {
    NavigationActions.detailproduct({
      type: ActionConst.PUSH,
      id: id,
      dropship: true,
      buttonText: 'Pilih Barang ini',
      commission: commission
    })
    this.props.getDetailProduk({id: id})
  }

  renderRowList (rowData) {
    if (rowData.product.is_discount) {
      this.hargaDiskon = this.discountCalculate(rowData.product.price, rowData.product.discount)
    } else {
      this.hargaDiskon = rowData.product.price
    }

    const money = this.maskedMoney(this.hargaDiskon)
    const commission = (rowData.product.commission)

    return (
      <TouchableOpacity style={styles.rowDataContainer} activeOpacity={0.5} onPress={() => this.produkDetail(rowData.product.id, rowData.product.commission)}>
        <Image source={{ uri: rowData.product.image }} style={styles.imageProduct} >
          {this.checkDiscount(rowData.product.discount, rowData.product.is_discount, rowData.product.is_wholesaler)}
        </Image>
        <View style={styles.containerTitle}>
          <Text style={styles.textTitleProduct}>
            {rowData.product.name}
          </Text>
          <View style={[styles.tokoContainer, {marginRight: 30}]}>
            <Text style={styles.namaToko}>
              {rowData.store.name}
            </Text>
            {this.renderVerified(rowData.store.is_verified)}
          </View>
          {this.renderDiskon(rowData.product.is_discount, rowData.product.price)}
          <View style={{flex: 1, marginBottom: 20}}>
            <Text style={styles.harga}>
              {money}
            </Text>
          </View>
          <View style={styles.moneyLikesContainer}>
            <View style={{flex: 1}}>
              <Text style={styles.commissionText}>
                Komisi {commission}%
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
    const commission = (rowData.product.commission)

    return (
      <TouchableOpacity style={stylesHome.rowDataContainer} activeOpacity={0.5} onPress={() => this.produkDetail(rowData.product.id, rowData.product.commission)}>
        <Image source={{ uri: rowData.product.image }} style={stylesHome.imageProduct}>
          {this.checkDiscount(rowData.product.discount, rowData.product.is_discount, rowData.product.is_wholesaler)}
        </Image>
        <Text style={stylesHome.textTitleProduct}>
          {rowData.product.name}
        </Text>
        <View style={stylesHome.tokoContainer}>
          <Text style={stylesHome.namaToko}>
            {rowData.store.name}
          </Text>
          {this.renderVerified(rowData.store.is_verified)}
        </View>
        {this.renderDiskon(rowData.product.is_discount, rowData.product.price)}
        <Text style={stylesHome.harga}>
          {money}
        </Text>
        <View style={{flex: 1, marginTop: 20}}>
          <Text style={styles.commissionText}>
            Komisi {commission}%
          </Text>
        </View>
        <View style={stylesHome.likesContainer}>
          {this.renderLikes(rowData.product.is_liked, rowData.product.id)}
          <Text style={styles.like}>
            {rowData.product.count_like}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  maskedMoney (value) {
    return 'Rp ' + RupiahFormat(value)
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
        <View style={{flex: 1}}>
          <ListView
            contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
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
                    style={[styles.loadingStyle, { height: 50 }]}
                    size='small'
                    color='#ef5656'
                  />
                )
              }
              return <View />
            }}
            enableEmptySections
            style={styles.listView}
              />
        </View>
      )
    }
    return (
      <View style={{flex: 1}}>
        <ListView
          contentContainerStyle={{ flexDirection: 'column', flexWrap: 'wrap' }}
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
          enableEmptySections
          style={styles.listView}
        />
      </View>
    )
  }

  loadMore () {
    const {isLoading, loadmore, search, kondisi, pengiriman, price, address, brand, other, page, sort, idCategory1} = this.state
    if (!isLoading) {
      if (loadmore) {
        this.props.getDropshipper({
          q: search,
          category_id: idCategory1,
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
    this.setState({ isRefreshing: true, listDataSource: [], page: 1, search: '', idCategory1: '' })
    this.props.getDropshipper()
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

  renderSearch () {
    return (
      <View style={stylesDropshipping.searchContainer}>
        <Image source={Images.searchGrey} style={stylesDropshipping.searchImage} />
        <View style={stylesDropshipping.textInputContainer}>
          <TextInput
            ref='search'
            style={stylesDropshipping.inputText}
            value={this.state.search}
            keyboardType='default'
            autoCapitalize='none'
            autoCorrect
            onChangeText={this.handleTextSearch.bind(this)}
            underlineColorAndroid='transparent'
            placeholder='Cari Produk'
          />
        </View>
      </View>
    )
  }

  renderilihKategori () {
    return (
      <View style={stylesDropshipping.containerKategori}>
        <Text style={stylesDropshipping.textKategori}>Kategori : </Text>
        <TouchableOpacity style={{alignItems: 'center', flexDirection: 'row', flex: 1}} activeOpacity={0.5} onPress={() => this.setState({ modalCategory1: true, iconCategory1: Images.up })}>
          <Text style={[stylesDropshipping.textKategori, {flex: 1, color: this.state.colorCategory1}]}>{this.state.fieldCategory1}</Text>
          <Image source={this.state.iconCategory1} style={stylesDropshipping.image} />
        </TouchableOpacity>
      </View>
    )
  }

  renderRowCategory1 (rowData) {
    return (
      <TouchableOpacity
        style={[stylesLokasi.menuLaporkan, { padding: 15 }]}
        activeOpacity={0.9}
        onPress={() => {
          this.setState({
            fieldCategory1: rowData.name,
            idCategory1: rowData.id,
            colorCategory1: Colors.darkgrey,
            iconCategory1: Images.down,
            modalCategory1: false,
            listDataSource: [],
            rowDataSource: [],
            isRefreshing: true
          })
          this.props.getDropshipper({category_id: rowData.id})
        }}
      >
        <Text style={[stylesLokasi.textBagikan, { marginLeft: 0 }]}>{rowData.name}</Text>
      </TouchableOpacity>
    )
  }

  modalCategory1 () {
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.modalCategory1}
        onRequestClose={() => this.setState({ modalCategory1: false, iconCategory1: Images.down })}
        >
        <TouchableOpacity activeOpacity={1} style={styles.modalContainer2} onPress={() => this.setState({ modalCategory1: false, iconCategory1: Images.down })}>
          <ScrollView style={styles.menuProvinsiContainer}>
            <ListView
              contentContainerStyle={{ flex: 1, flexWrap: 'wrap' }}
              dataSource={this.dataSource.cloneWithRows(this.state.addCategory1.concat(this.state.category1.categories))}
              renderRow={this.renderRowCategory1.bind(this)}
              enableEmptySections
            />
          </ScrollView>
        </TouchableOpacity>
      </Modal>
    )
  }

  render () {
    return (
      <View style={[styles.container, {marginTop: Metrics.navBarHeight}]}>
        <View style={stylesDropshipping.header}>
          <View style={[stylesDropshipping.state, {borderColor: Colors.background, backgroundColor: Colors.red}]}>
            <Text style={[stylesDropshipping.textState, {color: Colors.background}]}>1</Text>
          </View>
          <View style={stylesDropshipping.line} />
          <View style={[stylesDropshipping.state]}>
            <Text style={[stylesDropshipping.textState]}>2</Text>
          </View>
          <View style={stylesDropshipping.line} />
          <View style={stylesDropshipping.state}>
            <Text style={stylesDropshipping.textState}>3</Text>
          </View>
        </View>
        {this.renderSearch()}
        {this.renderilihKategori()}
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
        {this.modalFilter()}
        {this.renderModalSort()}
        {this.modalCategory1()}
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  dataProduk: state.dropshipProducts,
  propsWishlist: state.addWishlist,
  datalogin: state.isLogin,
  category1: state.category
})

const mapDispatchToProps = (dispatch) => ({
  addWishList: (param) => dispatch(produkAction.addToWishlist(param)),
  getDetailProduk: (param) => dispatch(produkAction.getProduct(param)),
  getDropshipper: (param) => dispatch(produkAction.getDropshipProducts(param)),
  getCategory1: () => dispatch(categoriAction.categoryList())
})

export default connect(mapStateToProps, mapDispatchToProps)(ChooseItemDropship)
