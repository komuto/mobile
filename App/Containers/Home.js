import React from 'react'
import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ListView,
  BackAndroid,
  ActivityIndicator,
  Alert
} from 'react-native'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import Swiper from 'react-native-swiper'
import { MaskService } from 'react-native-masked-text'
import { Images } from '../Themes'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { connect } from 'react-redux'
import * as homeAction from '../actions/home'

// Styles
import styles from './Styles/HomeStyle'

class Home extends React.Component {

  constructor (props) {
    super(props)
    var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      tipe: this.props.tipe || 'home',
      search: '',
      loadingKategori: true,
      loadingProduk: true,
      productSource: dataSource.cloneWithRows([]),
      kategoriSource: dataSource.cloneWithRows([])
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataKategori.status === 200) {
      const newKategori = nextProps.dataKategori.categories
      var kategoriInital = newKategori.filter(function (country) {
        return [ 'Handphone & Tablet', 'Olahraga & Outbond', 'Office & Stationery', 'Komputer & Laptop', 'Ibu dan Anak', 'Peralatan Rumah Tangga' ].indexOf(country.name) !== -1
      })
      const newProduct = nextProps.dataProduk.products
      this.setState({
        kategoriSource: this.state.kategoriSource.cloneWithRows(kategoriInital),
        productSource: this.state.productSource.cloneWithRows(newProduct),
        loadingKategori: false,
        loadingProduk: false
      })
    } else if (nextProps.dataKategori.status > 200) {
      this.setState({
        loadingKategori: true,
        loadingProduk: true
      })
      Alert.alert('Terjadi kesalahan', nextProps.dataKategori.message)
    } else if (nextProps.dataKategori.status === 'ENOENT') {
      this.setState({
        loadingKategori: true,
        loadingProduk: true
      })
      Alert.alert('Terjadi kesalahan', nextProps.dataKategori.message)
    }
  }

  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
  }

  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
  }

  handleBack = () => {
    if (this.state.tipe === 'search') {
      this.setState({
        tipe: 'home',
        search: ''
      })
      return true
    } else if (NavigationActions.pop()) {
      NavigationActions.pop()
      return true
    }
  }

  handleTextSearch = (text) => {
    this.setState({ search: text })
  }

  renderHome () {
    const { search } = this.state
    if (this.state.tipe === 'home') {
      return (
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <Text style={styles.textHeader}>
              Galaksi Parabola
            </Text>
            <TouchableOpacity style={styles.buttonHeader}>
              <Image source={Images.love} style={styles.imagestyle} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonHeader}>
              <Image source={Images.shoppingCart} style={styles.imagestyle} />
              <View style={styles.containerNumber}>
                <Text style={styles.number}>
                  {String(4)}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.searchContainer}>
            <Image source={Images.searchGrey} style={styles.searchImage} />
            <View style={styles.textInputContainer}>
              <TextInput
                ref='search'
                onFocus={() => this.openSearch()}
                style={styles.inputText}
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
        </View>
      )
    }
    return (
      <View style={styles.floatingSearch}>
        <Image source={Images.searchGrey} style={styles.searchImage} />
        <View style={styles.textInputContainer}>
          <TextInput
            ref='search'
            autoFocus
            onSubmitEditing={() => this.search()}
            style={styles.inputText}
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

  renderVerified (status) {
    if (status !== 'null') {
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
        <TouchableOpacity onPress={() => {}}>
          <Image source={Images.love} style={styles.imageStyleLike} />
        </TouchableOpacity>
      )
    }
    return (
      <TouchableOpacity onPress={() => {}}>
        <Image source={Images.love} style={styles.imageStyleNotLike} />
      </TouchableOpacity>
    )
  }

  discountCalculate (price, discount) {
    let hargaDiskon = price - ((discount / 100) * price)
    return hargaDiskon
  }

  renderRowProduk (rowData) {
    if (rowData.product.discount > 0) {
      this.statusDiskon = true
      this.hargaDiskon = this.discountCalculate(rowData.product.price, rowData.product.discount)
    } else {
      this.statusDiskon = false
      this.hargaDiskon = rowData.product.price
    }

    const totalHarga = MaskService.toMask('money', this.hargaDiskon, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    return (
      <TouchableOpacity style={styles.rowDataContainer} activeOpacity={0.5}>
        <Image source={Images.contohproduct} style={styles.imageProduct} />
        <View style={styles.containerDiskon}>
          <Text style={styles.diskon}>
            {rowData.product.discount}%
          </Text>
        </View>
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
        <Text style={styles.harga}>
          {totalHarga}
        </Text>
        <View style={styles.likesContainer}>
          {this.renderLikes(rowData.like)}
          <Text style={styles.like}>
            {rowData.product.stock}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  renderProduk () {
    const spinner = this.state.loadingProduk
    ? (<View style={styles.spinnerProduk}>
      <ActivityIndicator color='#ef5656' size='small' />
    </View>) : (<View />)
    if (this.state.loadingProduk) {
      return (
        <View>
          {spinner}
        </View>
      )
    }
    return (
      <ListView
        contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
        dataSource={this.state.productSource}
        initialListSize={1}
        renderRow={this.renderRowProduk.bind(this)}
        enableEmptySections
      />
    )
  }

  renderRowKategori (rowData) {
    if (rowData.name.includes('Handphone & Tablet')) {
      this.image = Images.komputer
    } else if (rowData.name.includes('Olahraga & Outbond')) {
      this.image = Images.sport
    } else if (rowData.name.includes('Office & Stationery')) {
      this.image = Images.kantor
    } else if (rowData.name.includes('Komputer & Laptop')) {
      this.image = Images.audiovideo
    } else if (rowData.name.includes('Ibu dan Anak')) {
      this.image = Images.bayi
    } else if (rowData.name.includes('Peralatan Rumah Tangga')) {
      this.image = Images.dapur
    }
    return (
      <TouchableOpacity style={styles.category}>
        <Image source={this.image} style={styles.imageCategory} />
        <Text style={styles.textCategory}>{rowData.name}</Text>
      </TouchableOpacity>
    )
  }

  renderKategori () {
    const spinner = this.state.loadingKategori
    ? (<View style={styles.spinnerKategori}>
      <ActivityIndicator color='#ef5656' size='small' />
    </View>) : (<View />)
    if (this.state.loadingKategori) {
      return (
        <View>
          {spinner}
        </View>
      )
    }
    return (
      <ListView
        contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
        dataSource={this.state.kategoriSource}
        initialListSize={5}
        renderRow={this.renderRowKategori.bind(this)}
        enableEmptySections
      />
    )
  }

  semuaKategori () {
    NavigationActions.kategoriscreen({ type: ActionConst.PUSH })
  }

  openSearch () {
    this.setState({
      tipe: 'search'
    })
  }

  search () {
    // console.log(this.state.search)
    NavigationActions.search({ type: ActionConst.PUSH, search: this.state.search })
  }

  produkTerbaru () {
    NavigationActions.produkterbaru({
      type: ActionConst.PUSH,
      header: 'Produk Terbaru'
    })
  }

  render () {
    return (
      <View style={styles.container}>
        {this.renderHome()}
        <ScrollView>
          <Swiper height={165} autoplay autoplayTimeout={3.5}>
            <View style={styles.slider}>
              <Image style={styles.imageSlider} source={Images.slider1} resizeMode='stretch' />
            </View>
            <View style={styles.slider}>
              <Image style={styles.imageSlider} source={Images.slider2} resizeMode='stretch' />
            </View>
            <View style={styles.slider}>
              <Image style={styles.imageSlider} source={Images.slider3} resizeMode='stretch' />
            </View>
          </Swiper>
          <Text style={styles.titleCategory}>
            Kategory Produk
          </Text>
          {this.renderKategori()}
          <TouchableOpacity style={styles.allCategory} onPress={() => this.semuaKategori()}>
            <Text style={styles.textAllCategory}>
              Lihat semua kategori
            </Text>
            <Image source={Images.rightArrow} style={styles.imageCategory} />
          </TouchableOpacity>
          <Text style={styles.titleCategory}>
            Produk Terbaru
          </Text>
          {this.renderProduk()}
          <TouchableOpacity style={styles.allCategory} onPress={() => this.produkTerbaru()}>
            <Text style={styles.textAllCategory}>
              Lihat semua produk terbaru
            </Text>
            <Image source={Images.rightArrow} style={styles.imageCategory} />
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataKategori: state.category,
    dataProduk: state.products
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getKategori: dispatch(homeAction.categoryList()),
    getProdukTerbaru: dispatch(homeAction.products())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
