import React from 'react'
import { View, Text, ListView, TouchableOpacity, Image, ScrollView, Modal } from 'react-native'
import { connect } from 'react-redux'
import { Images, Metrics, Colors, Fonts } from '../Themes'
import RupiahFormat from '../Services/MaskedMoneys'

import * as productAction from '../actions/product'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/DetailTokoProdukStyle'
import stylesHome from './Styles/HomeStyle'

class DetailTokoProduk extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.position = []
    this.positionCatalog = []
    this.state = {
      data: [],
      namaToko: '',
      verified: false,
      katalog: false,
      modal: false,
      idStore: -1
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataToko.status === 200) {
      this.setState({
        data: nextProps.dataToko.store.catalogs,
        namaToko: nextProps.dataToko.store.name,
        verified: nextProps.dataToko.store.is_verified,
        idStore: nextProps.dataToko.store.id
      })
    }
  }

  catalogProducts (id, title) {
    const { idStore } = this.state
    NavigationActions.storedetailproductcatalogs({
      type: ActionConst.PUSH,
      title: title
    })
    this.props.getProductByCatalog(idStore, id)
  }

  renderList (rowData) {
    if (rowData.products.length > 0) {
      return (
        <View style={styles.containerListView} onLayout={this.onLayout}>
          <View style={styles.containerKategori}>
            <View style={styles.kategori}>
              <Text style={styles.textKategori}>{rowData.name}</Text>
            </View>
            <TouchableOpacity style={styles.lihat} onPress={() => this.catalogProducts(rowData.id, rowData.name)}>
              <Text style={styles.textButton}>Lihat Semuanya</Text>
            </TouchableOpacity>
          </View>
          <ListView
            horizontal
            enableEmptySections
            showsHorizontalScrollIndicator={false}
            dataSource={this.dataSource.cloneWithRows(rowData.products)}
            renderRow={this.renderRow.bind(this)}
          />
        </View>
      )
    }
    return (
      <View style={styles.containerListView} onLayout={this.onLayout}>
        <View style={styles.containerKategori}>
          <View style={styles.kategori}>
            <Text style={styles.textKategori}>{rowData.name}</Text>
          </View>
          <TouchableOpacity style={styles.lihat}>
            <Text style={styles.textButton}>Lihat Semuanya</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerKategori}>
          <Text style={styles.textTitleProduct}>Tidak ada data</Text>
        </View>
      </View>
    )
  }

  produkDetail (id) {
    NavigationActions.detailproduct({
      type: ActionConst.PUSH,
      id: id
    })
    this.props.getDetailProduk(id)
  }

  checkDiscount (discount, isDiscount, isWholesaler) {
    if (isDiscount && isWholesaler) {
      return (
        <View stlye={{left: -10, flexDirection: 'column'}}>
          <View style={styles.containerDiskon}>
            <Text allowFontScaling style={styles.diskon}>
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
          <Text allowFontScaling style={styles.diskon}>
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
    return 'Rp ' + RupiahFormat(value)
  }

  renderRow (rowData) {
    let image
    if (rowData.discount > 0) {
      this.statusDiskon = true
      this.hargaDiskon = this.discountCalculate(rowData.price, rowData.discount)
    } else {
      this.statusDiskon = false
      this.hargaDiskon = rowData.price
    }

    const money = this.maskedMoney(this.hargaDiskon)
    try {
      image = rowData.image
    } catch (e) {
      image = null
    }
    return (
      <TouchableOpacity
        style={[stylesHome.rowDataContainer, {width: (Metrics.screenWidth / 2) + 20}]}
        activeOpacity={0.5}
        onPress={() => this.produkDetail(rowData.id)}
      >
        {this.renderImage(image, rowData.discount, rowData.is_discount, rowData.is_wholesaler)}
        <Text style={stylesHome.textTitleProduct}>
          {rowData.name}
        </Text>
        <View style={stylesHome.tokoContainer}>
          <Text style={stylesHome.namaToko}>
            {this.state.namaToko}
          </Text>
          {this.renderVerified(this.state.verified)}
        </View>
        {this.renderDiskon(this.statusDiskon, rowData.price)}
        <Text style={stylesHome.harga}>
          {money}
        </Text>
        <View style={stylesHome.likesContainer}>
          {this.renderLikes(rowData.is_liked)}
          <Text style={stylesHome.like}>
            {rowData.count_like}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  renderImage (image, discount, isDiscount, isWholesaler) {
    if (image === null) {
      return (
        <Image source={Images.contohproduct} style={stylesHome.imageProduct} />
      )
    }
    return (
      <Image source={{ uri: image }} style={stylesHome.imageProduct}>
        {this.checkDiscount(discount, isDiscount, isWholesaler)}
      </Image>
    )
  }

  renderVerified (status) {
    if (status) {
      return (
        <Image source={Images.verified} style={stylesHome.imageVerified} />
      )
    }
    return (
      <Image source={Images.notVerified} style={stylesHome.imageVerified} />
    )
  }

  renderDiskon (status, nominal) {
    if (status) {
      const money = this.maskedMoney(nominal)
      return (
        <Text style={stylesHome.nominalDiskon}>
          {money}
        </Text>
      )
    }
    return (
      <Text style={stylesHome.nominalDiskon1}>
        asd
      </Text>
    )
  }

  renderLikes (status) {
    if (status) {
      return (
        <View>
          <Image source={Images.lovered} style={stylesHome.imageStyleLike} />
        </View>
      )
    }
    return (
      <TouchableOpacity>
        <Image source={Images.love} style={stylesHome.imageStyleNotLike} />
      </TouchableOpacity>
    )
  }

  discountCalculate (price, discount) {
    let hargaDiskon = price - ((discount / 100) * price)
    return hargaDiskon
  }

  renderFloatButton () {
    if (!this.state.katalog) {
      return (
        <TouchableOpacity style={styles.floatButton} onPress={() => this.openKatalog()}>
          <Image source={Images.katalog} style={styles.floatImage} />
          <Text style={styles.katalog}>Daftar Katalog</Text>
        </TouchableOpacity>
      )
    }
    return null
  }

  openKatalog () {
    if (this.state.katalog) {
      this.setState({
        katalog: false,
        modal: false
      })
    } else {
      this.setState({
        modal: true,
        katalog: true
      })
    }
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
              dataSource={this.dataSource.cloneWithRows(this.state.data)}
              renderRow={this.renderRowCatalog.bind(this)}
            />
          </View>
          <TouchableOpacity style={styles.floatButtonClose} onPress={() => this.openKatalog()}>
            <Image source={Images.closewhite} style={styles.floatImage} />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    )
  }

  scroll (rowId) {
    let temp = this.positionCatalog
    this.setState({
      katalog: false,
      modal: false
    })
    this.refs.produkTampil.scrollTo({y: temp[rowId]})
  }

  renderRowCatalog (rowData, sectionId, rowId) {
    if (parseInt(rowId) === this.state.data.length - 1) {
      return (
        <TouchableOpacity
          style={styles.containerDataLast}
          onPress={() => this.scroll(rowId)}
        >
          <Text style={styles.kategori2}>{rowData.name}</Text>
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity
          style={styles.containerData}
          onPress={() => this.scroll(rowId)}
        >
          <Text style={styles.kategori2}>{rowData.name}</Text>
        </TouchableOpacity>
      )
    }
  }

  onLayout = event => {
    let {y} = event.nativeEvent.layout
    this.position.push(y)
    this.positionCatalog = this.position
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }} ref='produkTampil'>
          <ListView
            enableEmptySections
            dataSource={this.dataSource.cloneWithRows(this.state.data)}
            renderRow={this.renderList.bind(this)}
          />
        </ScrollView>
        {this.renderFloatButton()}
        {this.renderModal()}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataToko: state.stores
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDetailProduk: (id) => dispatch(productAction.getProduct({id: id})),
    getProductByCatalog: (idStore, idCatalog) =>
      dispatch(productAction.listProductBySearch({store_id: idStore, catalog_id: idCatalog}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailTokoProduk)
