import React from 'react'
import { View, TouchableOpacity, ToastAndroid, Modal, ScrollView, Image, Text, ListView, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import * as storeAction from '../actions/stores'
import * as productAction from '../actions/product'

// Styles
import styles from './Styles/MovingProductStyle'
import stylesLokasi from './Styles/ProductDetailScreenStyle'

import { Images, Fonts } from '../Themes/'

class MovingProduct extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      title: this.props.title,
      notification: this.props.notification,
      messageNotification: this.props.messageNotification,
      textButton: this.props.textButton,
      actionType: this.props.actionType,
      idCatalog: this.props.idCatalog,
      statusHidden: this.props.statusHidden,
      product: [],
      listKatalog: [],
      addCatalog: [
        {
          'id': 0,
          'name': 'Pilih Katalog Tujuan'
        }
      ],
      modalDelete: false,
      idCatalogChoosen: '',
      modalCatalog: false,
      isDropshipper: this.props.isDropshipper || false,
      loading: true,
      isChecked: false,
      arrayIdProduct: [],
      data: [],
      size: '',
      page: 1,
      loadmore: true,
      isRefreshing: false,
      isLoading: false
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataProduk.status === 200) {
      this.setState({
        product: nextProps.dataProduk.products,
        loading: false,
        size: nextProps.dataProduk.products.length
      })
      nextProps.dataProduk.status = 0
    } else if (nextProps.dataCatalog.status === 200) {
      this.setState({
        listKatalog: nextProps.dataCatalog.catalogs
      })
      nextProps.dataCatalog.status = 0
    } else if (nextProps.alterProduct.status === 200 && this.props.actionType === 'hideProduct') {
      this.setState({
        isChecked: false,
        notification: true,
        loading: false
      })
      if (this.props.statusHidden) {
        this.setState({messageNotification: 'Berhasil menampilkan barang'})
      } else {
        this.setState({messageNotification: 'Berhasil menyembunyikan barang'})
      }
      this.props.getProductByCatalog(this.state.idCatalog, this.state.statusHidden)
      nextProps.alterProduct.status = 0
    } else if (nextProps.alterProduct.status === 200 && this.props.actionType === 'deleteProduct') {
      this.setState({
        isChecked: false,
        notification: true,
        loading: false,
        messageNotification: 'Berhasil menghapus barang'
      })
      this.props.getProductByCatalog(this.state.idCatalog, this.state.statusHidden)
      nextProps.alterProduct.status = 0
    } else if (nextProps.alterProduct.status === 200 && this.props.actionType === 'moveCatalog') {
      this.setState({
        isChecked: false,
        loading: false,
        notification: true,
        messageNotification: 'Berhasil memindahkan ke katalog lain'
      })
      this.props.getProductByCatalog(this.state.idCatalog, this.state.statusHidden)
      nextProps.alterProduct.status = 0
    } else if (nextProps.alterProduct.status === 200 && this.props.actionType === 'moveDropship') {
      this.setState({
        isChecked: false,
        loading: false,
        notification: true,
        messageNotification: 'Berhasil menjadikan Dropshipping'
      })
      this.props.getProductByCatalogDropship(this.state.idCatalog, this.state.statusHidden)
      nextProps.alterProduct.status = 0
    } else if (nextProps.alterProduct.status === 400 && this.props.actionType === 'deleteProduct') {
      this.setState({
        isChecked: false,
        notification: false,
        loading: false
      })
      ToastAndroid.show(nextProps.alterProduct.message, ToastAndroid.LONG)
    } else if (nextProps.dataProduk.status > 200) {
      ToastAndroid.show('Terjadi kesalahan', ToastAndroid.LONG)
    } else if (nextProps.dataCatalog.status > 200) {
      ToastAndroid.show('Terjadi kesalahan', ToastAndroid.LONG)
    }
  }

  componentDidMount () {
  }

  componentWillUnmount () {
    this.props.getListProduk()
    this.props.getHiddenProduct()
  }

  notif () {
    if (this.state.notification) {
      return (
        <View style={styles.notif}>
          <Text style={styles.textNotif}>{this.state.messageNotification}</Text>
          <TouchableOpacity onPress={() => this.setState({notification: false})}>
            <Image source={Images.closeGreen} style={styles.check} />
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <View />
      )
    }
  }

  button () {
    return (
      <TouchableOpacity style={[styles.buttonNext]} onPress={() => this.finalAction()}>
        <Text style={styles.textButtonNext}>
          {this.state.textButton}
        </Text>
      </TouchableOpacity>
    )
  }

  renderRowData (rowData, selectionId, rowId) {
    const checkProduct = rowData.is_checked ? Images.Biru : null
    return (
      <TouchableOpacity style={styles.list} onPress={this.handleCheckProduct(rowId, rowData.id)}>
        <View style={[styles.row, {paddingLeft: 0}]}>
          <View style={styles.box}>
            <Image
              source={checkProduct}
              style={styles.check}
            />
          </View>
          <Image
            source={{uri: rowData.image}}
            style={styles.imageProduct}
          />
          <Text style={[styles.title, {marginLeft: 20.7}]}>{rowData.name}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  modalConfrimDelete () {
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.modalDelete}
        onRequestClose={() => this.setState({ modalDelete: false })}
        >
        <View style={styles.bgModal}>
          <View style={styles.contaierModal}>
            <Text style={styles.titleModal}>Anda yakin akan menghapus{'\n'}barang terpilih?</Text>
            <TouchableOpacity style={styles.verifikasiButton} onPress={() => this.handleDeleteProduct()}>
              <Text style={styles.textVerifikasiButton}>Ya, Hapus Barang</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.batalButton} onPress={() => this.setState({modalDelete: false})}>
              <Text style={styles.textBatalButton}>Batal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }

  modalCatalog () {
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.modalCatalog}
        onRequestClose={() => this.setState({ modalCatalog: false })}
        >
        <TouchableOpacity style={styles.modalContainer} onPress={() => this.setState({modalCatalog: false})}>
          <ScrollView style={styles.menuProvinsiContainer}>
            <View style={styles.headerCatalog}>
              <Text style={[stylesLokasi.textBagikan, { fontSize: Fonts.size.medium, fontFamily: Fonts.type.bold, marginLeft: 0 }]}>Pilih Katalog Tujuan</Text>
            </View>
            <ListView
              contentContainerStyle={{ flex: 1, flexWrap: 'wrap' }}
              dataSource={this.dataSource.cloneWithRows(this.state.listKatalog)}
              renderRow={this.renderCatalog.bind(this)}
              enableEmptySections
            />
          </ScrollView>
        </TouchableOpacity>
      </Modal>
    )
  }

  renderCatalog (rowData) {
    return (
      <TouchableOpacity
        style={[stylesLokasi.menuLaporkan, { padding: 15 }]}
        activeOpacity={0.8}
        onPress={() => this.handleCatalog(rowData.id)}
      >
        <Text style={[stylesLokasi.textBagikan, { marginLeft: 0 }]}>{rowData.name}</Text>
      </TouchableOpacity>
    )
  }

  handleCatalog (id) {
    let data = this.state.arrayIdProduct
    this.setState({
      idCatalogChoosen: id,
      modalCatalog: false
    })
    this.props.changeCatalog(id, data)
  }

  handleDeleteProduct () {
    let data = this.state.arrayIdProduct
    this.props.setDeleteProduct(data)
    this.setState({
      modalDelete: false,
      loading: true
    })
  }

  handleCheckProduct = (i, id) => (e) => {
    const {product} = this.state
    if (product[i].is_checked) {
      product[i].is_checked = false
      const newDataSource = product.map(data => {
        return {...data}
      })
      this.setState({
        product: newDataSource,
        notification: false
      })
      let tempunCheck = []
      product.map((data, j) => {
        if (data.is_checked) {
          tempunCheck[j] = data.id
        }
      })
      let temp = []
      tempunCheck.findIndex((e, i) => {
        if (e !== undefined) {
          temp.push(e)
        }
      })
      this.setState({
        arrayIdProduct: temp
      })
      if (temp.length <= product.length) {
        this.setState({
          isChecked: false
        })
      }
    } else {
      product[i].is_checked = true
      const newDataSource = product.map(data => {
        return {...data}
      })
      this.setState({
        product: newDataSource
      })
      let tempCheck = []
      product.map((data, i) => {
        if (data.is_checked) {
          tempCheck[i] = data.id
        }
      })
      let temp = []
      tempCheck.findIndex((e, x) => {
        if (e !== undefined) {
          temp.push(e)
        }
      })
      this.setState({
        arrayIdProduct: temp
      })
      if (temp.length === product.length) {
        this.setState({
          isChecked: true
        })
      }
    }
  }

  handleCheckAll = (data) => (e) => {
    const {product, arrayIdProduct, size} = this.state
    if (arrayIdProduct.length === size) {
      product.map((data, i) => {
        product[i].is_checked = false
      })
      this.setState({product: product, isChecked: false})
    } else {
      product.map((data, i) => {
        product[i].is_checked = true
      })
      this.setState({product: product, isChecked: true})
    }
    let tempCheck = []
    product.map((data, i) => {
      if (data.is_checked) {
        tempCheck[i] = data.id
      }
    })
    this.setState({arrayIdProduct: tempCheck, notification: false})
  }

  finalAction () {
    if (this.state.actionType === 'hideProduct') {
      let data = this.state.arrayIdProduct
      this.props.setHideProduct(data)
      this.setState({
        loading: true
      })
    } else if (this.state.actionType === 'deleteProduct') {
      this.setState({
        modalDelete: true
      })
    } else if (this.state.actionType === 'moveCatalog') {
      this.setState({
        modalCatalog: true
      })
    } else if (this.state.actionType === 'moveDropship') {
      let data = this.state.arrayIdProduct
      this.props.updateProductToDropship(data)
      this.setState({
        loading: true
      })
    }
  }

  headerDropshipper () {
    if (this.state.actionType === 'moveDropship') {
      return (
        <View style={styles.containerHeader}>
          <Text style={styles.headerText}>Hanya barang milik Anda sendiri yang bisa dijadikan sebagai dropshipping</Text>
        </View>
      )
    } else {
      return (
        <View />
      )
    }
  }

  headerHideProduct () {
    if (this.state.actionType === 'hideProduct') {
      return (
        <View style={styles.containerHeader}>
          <Text style={styles.headerText}>Barang yang disembunyikan tidak akan muncul di toko Anda.  Barang Anda yang terbuka untuk dropshipping tetap dapat di dropship oleh toko lain dan tetap bisa dijual seperti biasa oleh toko lain.</Text>
        </View>
      )
    } else {
      return (
        <View />
      )
    }
  }

  header () {
    const checkAll = this.state.isChecked ? Images.centangBiru : null
    return (
      <TouchableOpacity style={styles.header} onPress={this.handleCheckAll(this.state.product)}>
        <View style={styles.row}>
          <View style={styles.box}>
            <Image
              source={checkAll}
              style={styles.check}
            />
          </View>
          <Text style={[styles.title, {marginLeft: 20.7}]}>Pilih Semua Produk</Text>
        </View>
      </TouchableOpacity>
    )
  }

  render () {
    const spinner = this.state.loading
    ? (<View style={styles.spinner}>
      <ActivityIndicator color='white' size='large' />
    </View>) : (<View />)
    return (
      <View style={styles.container}>
        {this.notif()}
        {this.headerDropshipper()}
        {this.headerHideProduct()}
        {this.header()}
        <ScrollView>
          <ListView
            dataSource={this.dataSource.cloneWithRows(this.state.product)}
            renderRow={this.renderRowData.bind(this)}
            enableEmptySections
          />
        </ScrollView>
        {this.modalConfrimDelete()}
        {this.modalCatalog()}
        {this.button()}
        {spinner}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataProduk: state.storeProductsByCatalog,
    dataCatalog: state.getListCatalog,
    alterProduct: state.alterProducts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateProductToDropship: (data) => dispatch(productAction.updateDropshipStatus({product_ids: data})),
    setHideProduct: (data) => dispatch(productAction.hideProducts({product_ids: data})),
    setDeleteProduct: (data) => dispatch(productAction.deleteProducts({product_ids: data})),
    changeCatalog: (id, data) => dispatch(productAction.changeCatalogProducts({catalog_id: id, product_ids: data})),
    getProductByCatalog: (id, query) => dispatch(storeAction.getStoreCatalogProducts({id: id, hidden: query})),
    getListProduk: () => dispatch(storeAction.getStoreProducts()),
    getHiddenProduct: () => dispatch(storeAction.getHiddenStoreProducts()),
    getProductByCatalogDropship: (id, q) => dispatch(storeAction.getStoreProductsByCatalog({id: id, is_dropship: q}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovingProduct)
