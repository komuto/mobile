import React from 'react'
import {
  ScrollView,
  Text,
  ListView,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  BackAndroid
} from 'react-native'
import { connect } from 'react-redux'
import { MaskService } from 'react-native-masked-text'
import { Actions as NavigationActions } from 'react-native-router-flux'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ProdukTerbaruScreenStyle'
import stylesSearch from './Styles/SearchResultStyle'
import stylesHome from './Styles/HomeStyle'

import { Images } from '../Themes'

class ProdukTerbaruScreenScreen extends React.Component {

  constructor (props) {
    super(props)
    var menu = [
      { diskon: '58%', gambar: Images.contohproduct, title: 'Casual and Light Nike Shoes Running', toko: 'GadgetArena', status: 'verified', statusDiskon: true, nominalDiskon: 10000, harga: 10000, like: true, jumlahlikes: 120 },
      { diskon: '58%', gambar: Images.contohproduct, title: 'Army simple Sling Bag for daily usage', toko: 'GadgetArena', status: 'unverified', statusDiskon: true, nominalDiskon: 10000, harga: 10000, like: false, jumlahlikes: 120 },
      { diskon: '58%', gambar: Images.contohproduct, title: 'Casual and Light Nike Shoes Running', toko: 'GadgetArena', status: 'unverified', statusDiskon: false, nominalDiskon: 10000, harga: 10000, like: true, jumlahlikes: 120 },
      { diskon: '58%', gambar: Images.contohproduct, title: 'Casual and Light Nike Shoes Running', toko: 'GadgetArena', status: 'verified', statusDiskon: true, nominalDiskon: 10000, harga: 10000, like: true, jumlahlikes: 120 }
    ]
    var dataSourceList = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    var dataSourceRow = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      search: '',
      listDataSource: dataSourceList.cloneWithRows(menu),
      rowDataSource: dataSourceRow.cloneWithRows(menu),
      header: this.props.header || 'search',
      tipe: this.props.tipe || 'kategori',
      tipeView: 'list'
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
      console.log('disini')
      this.setState({
        tipe: 'data'
      })
      return true
    } else if (NavigationActions.pop()) {
      console.log('disana')
      NavigationActions.pop()
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
        <TouchableOpacity onPress={() => this.openSearch()}>
          <Image
            source={Images.searchWhite}
            style={stylesSearch.imageStyle}
          />
        </TouchableOpacity>
      </View>
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

  renderRowList (rowData) {
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
        <View style={styles.containerTitle}>
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
          <View style={{flexDirection: 'row', paddingBottom: 28.8}}>
            <View style={{flex: 1}}>
              <Text style={styles.harga}>
                {money}
              </Text>
            </View>
            <View style={styles.likesContainer}>
              {this.renderLikes(rowData.like)}
              <Text style={styles.like}>
                {rowData.jumlahlikes}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  renderRowGrid (rowData) {
    const money = MaskService.toMask('money', rowData.harga, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    return (
      <TouchableOpacity style={stylesHome.rowDataContainer} activeOpacity={0.5}>
        <Image source={rowData.gambar} style={stylesHome.imageProduct} />
        <View style={stylesHome.containerDiskon}>
          <Text style={stylesHome.diskon}>
            {rowData.diskon}
          </Text>
        </View>
        <Text style={stylesHome.textTitleProduct}>
          {rowData.title}
        </Text>
        <View style={stylesHome.tokoContainer}>
          <Text style={stylesHome.namaToko}>
            {rowData.toko}
          </Text>
          {this.renderVerified(rowData.status)}
        </View>
        {this.renderDiskon(rowData.statusDiskon, rowData.nominalDiskon)}
        <Text style={stylesHome.harga}>
          {money}
        </Text>
        <View style={stylesHome.likesContainer}>
          {this.renderLikes(rowData.like)}
          <Text style={stylesHome.like}>
            {rowData.jumlahlikes}
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
            dataSource={this.state.rowDataSource}
            renderRow={this.renderRowGrid.bind(this)}
          />
        </View>
      )
    }
    return (
      <View style={styles.listViewContainer}>
        <ListView
          contentContainerStyle={{ flexDirection: 'column', flexWrap: 'wrap' }}
          dataSource={this.state.listDataSource}
          renderRow={this.renderRowList.bind(this)}
        />
      </View>
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
        <ScrollView style={styles.listViewContainer}>
          {this.viewProduk()}
        </ScrollView>
        <View style={styles.footerMenu}>
          <TouchableOpacity style={styles.blah}>
            <View style={styles.buttonFooter}>
              <Image style={styles.imageFooter} source={Images.sort} />
              <Text style={styles.footerButton}>Urutkan</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.blah}>
            <View style={styles.buttonFooter}>
              <Image style={styles.imageFooter} source={Images.filter} />
              <Text style={styles.footerButton}>Filter</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.blah} onPress={() => this.changeView()}>
            <View style={styles.buttonFooter}>
              <Image style={styles.imageFooter} source={Images.grid} />
              <Text style={styles.footerButton}>Tampilan</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProdukTerbaruScreenScreen)
