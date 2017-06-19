import React from 'react'
import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ListView,
  BackAndroid
} from 'react-native'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import Swiper from 'react-native-swiper'
import { MaskService } from 'react-native-masked-text'
import { Images } from '../Themes'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/HomeStyle'

class Home extends React.Component {

  constructor (props) {
    super(props)
    var menu = [
      { diskon: '58%', gambar: Images.contohproduct, title: 'Casual and Light Nike Shoes Running', toko: 'GadgetArena', status: 'verified', statusDiskon: true, nominalDiskon: 10000, harga: 10000, like: true, jumlahlikes: 120 },
      { diskon: '58%', gambar: Images.contohproduct, title: 'Army simple Sling Bag for daily usage', toko: 'GadgetArena', status: 'unverified', statusDiskon: true, nominalDiskon: 10000, harga: 10000, like: false, jumlahlikes: 120 },
      { diskon: '58%', gambar: Images.contohproduct, title: 'Casual and Light Nike Shoes Running', toko: 'GadgetArena', status: 'unverified', statusDiskon: false, nominalDiskon: 10000, harga: 10000, like: true, jumlahlikes: 120 },
      { diskon: '58%', gambar: Images.contohproduct, title: 'Casual and Light Nike Shoes Running', toko: 'GadgetArena', status: 'verified', statusDiskon: true, nominalDiskon: 10000, harga: 10000, like: true, jumlahlikes: 120 }
    ]
    var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      tipe: 'home',
      search: '',
      dataSource: dataSource.cloneWithRows(menu)
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
        tipe: 'home'
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
        <Image source={Images.love} style={styles.imageStyleLike} />
      )
    }
    return (
      <Image source={Images.love} style={styles.imageStyleNotLike} />
    )
  }

  renderRow (rowData) {
    const money = MaskService.toMask('money', rowData.harga, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    return (
      <TouchableOpacity style={styles.rowDataContainer} activeOpacity={0.5}>
        <Image source={rowData.gambar} style={styles.imageProduct} />
        <View style={styles.containerDiskon}>
          <Text style={styles.diskon}>
            {rowData.diskon}
          </Text>
        </View>
        <Text style={styles.textTitleProduct}>
          {rowData.title}
        </Text>
        <View style={styles.tokoContainer}>
          <Text style={styles.namaToko}>
            {rowData.toko}
          </Text>
          {this.renderVerified(rowData.status)}
        </View>
        {this.renderDiskon(rowData.statusDiskon, rowData.nominalDiskon)}
        <Text style={styles.harga}>
          {money}
        </Text>
        <View style={styles.likesContainer}>
          {this.renderLikes(rowData.like)}
          <Text style={styles.like}>
            {rowData.jumlahlikes}
          </Text>
        </View>
      </TouchableOpacity>
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
    NavigationActions.searchresult({ type: ActionConst.PUSH })
  }

  render () {
    return (
      <View style={styles.container}>
        {this.renderHome()}
        <ScrollView>
          <Swiper height={190} autoplay>
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
          <View style={styles.categoryContainer}>
            <View style={styles.categoryRow}>
              <TouchableOpacity style={styles.category}>
                <Image source={Images.komputer} style={styles.imageCategory} />
                <Text style={styles.textCategory}>Komputer & Handphone</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.category}>
                <Image source={Images.sport} style={styles.imageCategory} />
                <Text style={styles.textCategory}>Peralatan Olahraga</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.category}>
                <Image source={Images.kantor} style={styles.imageCategory} />
                <Text style={styles.textCategory}>Peralatan Kantor</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.categoryRow}>
              <TouchableOpacity style={styles.category}>
                <Image source={Images.dapur} style={styles.imageCategory} />
                <Text style={styles.textCategory}>Perlengkapan Dapur</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.category}>
                <Image source={Images.bayi} style={styles.imageCategory} />
                <Text style={styles.textCategory}>Perlengkapan Bayi</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.category}>
                <Image source={Images.audiovideo} style={styles.imageCategory} />
                <Text style={styles.textCategory}>Peralatan TV dan Audio</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.allCategory} onPress={() => this.semuaKategori()}>
            <Text style={styles.textAllCategory}>
              Lihat semua kategori
            </Text>
            <Image source={Images.rightArrow} style={styles.imageCategory} />
          </TouchableOpacity>
          <Text style={styles.titleCategory}>
            Produk Terbaru
          </Text>
          <View style={styles.listViewContainer}>
            <ListView
              contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
              dataSource={this.state.dataSource}
              renderRow={this.renderRow.bind(this)}
            />
          </View>
          <TouchableOpacity style={styles.allCategory}>
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

export default (Home)
