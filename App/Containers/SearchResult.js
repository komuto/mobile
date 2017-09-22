import React from 'react'
import {
  ScrollView,
  Text,
  ListView,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  BackAndroid,
  Modal,
  Alert
} from 'react-native'
import { connect } from 'react-redux'
import { MaskService } from 'react-native-masked-text'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import Filter from '../Components/Filter'
import * as produkAction from '../actions/product'
import * as homeAction from '../actions/home'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ProdukTerbaruScreenStyle'
import stylesSearch from './Styles/SearchResultStyle'
import stylesHome from './Styles/HomeStyle'

import { Images, Colors } from '../Themes'

class ProdukTerbaruScreenScreen extends React.Component {

  constructor (props) {
    super(props)
    var menu = [
      { diskon: '58%', gambar: Images.contohproduct, title: 'Casual and Light Nike Shoes Running', toko: 'GadgetArena', status: 'verified', statusDiskon: true, nominalDiskon: 90000, harga: 90000, like: true, jumlahlikes: 130, dateCreate: '06/19/2017' },
      { diskon: '58%', gambar: Images.contohproduct, title: 'Army simple Sling Bag for daily usage', toko: 'GadgetArena', status: 'unverified', statusDiskon: true, nominalDiskon: 80000, harga: 80000, like: false, jumlahlikes: 140, dateCreate: '06/18/2017' },
      { diskon: '58%', gambar: Images.contohproduct, title: 'Casual and Light Nike Shoes Running', toko: 'GadgetArena', status: 'unverified', statusDiskon: false, nominalDiskon: 70000, harga: 70000, like: true, jumlahlikes: 150, dateCreate: '06/21/2017' },
      { diskon: '58%', gambar: Images.contohproduct, title: 'Casual and Light Nike Shoes Running', toko: 'GadgetArena', status: 'verified', statusDiskon: true, nominalDiskon: 60000, harga: 60000, like: true, jumlahlikes: 120, dateCreate: '06/20/2017' }
    ]
    this.dataSourceList = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.dataSourceRow = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      query: this.props.querys,
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
      sortData: menu,
      filter: false,
      from: this.props.from
    }
  }

  componentDidMount () {
    this.props.getFilterProduk(this.props.querys)
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
  }

  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
  }

  componentWillReceiveProps (nextProps) {
    if (this.state.query !== nextProps.querys) {
      this.props.getSearch(this.props.querys)
    }
    if (nextProps.dataProduk.status === 200) {
      this.setState({
        listDataSource: nextProps.dataProduk.products,
        rowDataSource: nextProps.dataProduk.products,
        loadingProduk: false
      })
    } else if (nextProps.dataProduk.status > 200) {
      this.setState({
        loadingProduk: true
      })
      Alert.alert('Terjadi kesalahan', nextProps.dataProduk.message)
    } else if (nextProps.dataProduk.status === 'ENOENT') {
      this.setState({
        loadingProduk: true
      })
      Alert.alert('Terjadi kesalahan', nextProps.dataProduk.message)
    }
    if (nextProps.dataFilter.status === 200) {
      this.setState({
        listDataSource: nextProps.dataFilter.products,
        rowDataSource: nextProps.dataFilter.products
      })
    } else if (nextProps.dataFilter.status > 200) {
      console.log(nextProps.dataFilter.status)
    }
  }

  handlingFilter (kondisi, pengiriman, price, address, brand, other) {
    this.props.getFilterProduk(kondisi, pengiriman, price, address, brand, other)
  }

  handleBack = () => {
    if (this.state.tipe === 'search') {
      this.setState({
        tipe: 'data'
      })
      return true
    } else if (NavigationActions.pop()) {
      if (this.state.from === 'home') {
        NavigationActions.popTo('backtab')
      } else {
        NavigationActions.popTo('newproduct')
      }
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
    if (this.state.from === 'home') {
      NavigationActions.backtab({
        type: ActionConst.RESET
      })
    } else {
      NavigationActions.popTo('newproduct')
    }
  }

  popSearch () {
    NavigationActions.pop()
  }

  backSearch () {
    this.setState({
      tipe: 'data'
    })
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
              placeholder='Cari barang atau toko'
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
        <TouchableOpacity onPress={() => this.popSearch()}>
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

  sortArrayAsc (array, key, field) {
    const {bluesky, lightblack} = Colors
    switch (field) {
      case 'terbaru':
        this.setState({terbaruColor: bluesky, termurahColor: lightblack, termahalColor: lightblack, terlarisColor: lightblack, terbaruCek: 1, termurahCek: 0, termahalCek: 0, terlarisCek: 0})
        return array.sort(function (a, b) {
          return new Date(a.product.created_at).getTime() - new Date(b.product.dateCreate).getTime()
        }).reverse()
      case 'termurah':
        this.setState({terbaruColor: lightblack, termurahColor: bluesky, termahalColor: lightblack, terlarisColor: lightblack, terbaruCek: 0, termurahCek: 1, termahalCek: 0, terlarisCek: 0})
        return array.sort(function (a, b) {
          return b.product.price - a.product.price
        }).reverse()
      case 'termahal':
        this.setState({terbaruColor: lightblack, termurahColor: lightblack, termahalColor: bluesky, terlarisColor: lightblack, terbaruCek: 0, termurahCek: 0, termahalCek: 1, terlarisCek: 0})
        return array.sort(function (a, b) {
          return b.product.price - a.product.price
        })
      case 'terlaris':
        this.setState({terbaruColor: lightblack, termurahColor: lightblack, termahalColor: lightblack, terlarisColor: bluesky, terbaruCek: 0, termurahCek: 0, termahalCek: 0, terlarisCek: 1})
        return array.sort(function (a, b) {
          return b.product.stock - a.product.stock
        })
      default:
        window.alert('Internal Error')
        break
    }
  }

  _onPress (field) {
    const {listDataSource} = this.state
    let sortedData = this.sortArrayAsc(listDataSource, 'price', field)
    this.setState({
      listDataSource: sortedData
    })
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
    this.setState({
      tipe: 'search'
    })
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

  renderLikes (status) {
    if (status) {
      return (
        <TouchableOpacity>
          <Image source={Images.love} style={styles.imageStyleLike} />
        </TouchableOpacity>
      )
    }
    return (
      <TouchableOpacity>
        <Image source={Images.love} style={styles.imageStyleNotLike} />
      </TouchableOpacity>
    )
  }

  discountCalculate (price, discount) {
    let hargaDiskon = price - ((discount / 100) * price)
    return hargaDiskon
  }

  renderRowList (rowData) {
    if (rowData.product.discount > 0) {
      this.statusDiskon = true
      this.hargaDiskon = this.discountCalculate(rowData.product.price, rowData.product.discount)
    } else {
      this.statusDiskon = false
      this.hargaDiskon = rowData.product.price
    }

    const money = MaskService.toMask('money', this.hargaDiskon, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })

    return (
      <TouchableOpacity
        style={styles.rowDataContainer}
        activeOpacity={0.5}
        onPress={() => this.produkDetail(rowData.product.id)}
      >
        <Image source={{ uri: rowData.product.image }} style={styles.imageProduct} />
        <View style={styles.containerDiskon}>
          <Text style={styles.diskon}>
            {rowData.product.discount} %
          </Text>
        </View>
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
          {this.renderDiskon(this.statusDiskon, rowData.product.price)}
          <View style={styles.moneyLikesContainer}>
            <View style={{flex: 1}}>
              <Text style={styles.harga}>
                {money}
              </Text>
            </View>
            <View style={styles.likesContainer}>
              {this.renderLikes(rowData.like)}
              <Text style={styles.like}>
                {rowData.product.stock}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  renderRowGrid (rowData) {
    if (rowData.product.discount > 0) {
      this.statusDiskon = true
      this.hargaDiskon = this.discountCalculate(rowData.product.price, rowData.product.discount)
    } else {
      this.statusDiskon = false
      this.hargaDiskon = rowData.product.price
    }

    const money = MaskService.toMask('money', this.hargaDiskon, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    return (
      <TouchableOpacity
        style={stylesHome.rowDataContainer}
        activeOpacity={0.5}
        onPress={() => this.produkDetail(rowData.product.id)}
      >
        <Image source={{ uri: rowData.product.image }} style={stylesHome.imageProduct} />
        <View style={stylesHome.containerDiskon}>
          <Text style={stylesHome.diskon}>
            {rowData.product.discount} %
          </Text>
        </View>
        <Text style={stylesHome.textTitleProduct}>
          {rowData.product.name}
        </Text>
        <View style={stylesHome.tokoContainer}>
          <Text style={stylesHome.namaToko}>
            {rowData.store.name}
          </Text>
          {this.renderVerified(rowData.store.remarks_status)}
        </View>
        {this.renderDiskon(this.statusDiskon, rowData.product.price)}
        <Text style={stylesHome.harga}>
          {money}
        </Text>
        <View style={stylesHome.likesContainer}>
          {this.renderLikes(rowData.like)}
          <Text style={stylesHome.like}>
            {rowData.product.stock}
          </Text>
        </View>
      </TouchableOpacity>
    )
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
        <View style={stylesHome.listViewContainer}>
          <ListView
            contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
            enableEmptySections
            dataSource={this.dataSourceRow.cloneWithRows(this.state.rowDataSource)}
            renderRow={this.renderRowGrid.bind(this)}
          />
        </View>
      )
    }
    return (
      <View style={styles.listViewContainer}>
        <ListView
          contentContainerStyle={{ flexDirection: 'column', flexWrap: 'wrap' }}
          enableEmptySections
          dataSource={this.dataSourceList.cloneWithRows(this.state.listDataSource)}
          renderRow={this.renderRowList.bind(this)}
        />
      </View>
    )
  }

  renderImage () {
    if (this.state.tipeView === 'grid') {
      return (
        <Image source={Images.grid} style={styles.searchImage} />
      )
    }
    return (
      <Image source={Images.list} style={styles.searchImage} />
    )
  }

  produkDetail (id) {
    NavigationActions.detailproduct({
      type: ActionConst.PUSH,
      id: id
    })
    this.props.getDetailProduk(id)
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
        <ScrollView style={styles.listViewContainer}>
          {this.viewProduk()}
        </ScrollView>
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
              {this.renderImage()}
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
    dataProduk: state.productBySearch,
    dataFilter: state.filterProduct
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getFilterProduk: (q, condition, services, price, address, brands, other) => dispatch(homeAction.filter({
      q: q,
      condition: condition,
      services: services,
      price: price,
      address: address,
      brands: brands,
      other: other
    })),
    getDetailProduk: (id) => dispatch(produkAction.getProduct({id: id}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProdukTerbaruScreenScreen)
