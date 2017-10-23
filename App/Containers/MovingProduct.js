import React from 'react'
import { View, TouchableOpacity, BackAndroid, ToastAndroid, Modal, ScrollView, Image, Text, ListView, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import {isFetching, isError, isFound} from '../Services/Status'
import { Actions as NavigationActions } from 'react-native-router-flux'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import * as storeAction from '../actions/stores'
import * as productAction from '../actions/product'
import * as catalogAction from '../actions/catalog'

// Styles
import styles from './Styles/MovingProductStyle'
import stylesLokasi from './Styles/ProductDetailScreenStyle'

import { Images, Fonts } from '../Themes/'

class MovingProduct extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.submitting = {
      products: false,
      alter: false,
      catalog: false,
      isUpdate: false,
      notif: false
    }
    this.state = {
      title: this.props.title,
      notification: this.props.notification,
      messageNotification: this.props.messageNotification,
      textButton: this.props.textButton,
      actionType: this.props.actionType,
      idCatalog: this.props.idCatalog,
      statusHidden: this.props.statusHidden,
      productProps: props.dataProduk || null,
      product: [],
      listKatalogProps: props.dataCatalog || null,
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
      isLoading: false,
      callback: this.props.callback
    }
  }

  componentWillReceiveProps (nextProps) {
    const { dataProduk, alterProduct, dataCatalog } = nextProps

    if (!isFetching(dataProduk) && this.submitting.products) {
      this.submitting = { ...this.submitting, products: false }
      if (isError(dataProduk)) {
        ToastAndroid.show(dataProduk.message, ToastAndroid.SHORT)
      }
      if (isFound(dataProduk)) {
        this.setState({
          productProps: dataProduk,
          product: dataProduk.products,
          loading: false,
          size: dataProduk.products.length
        })
        const { actionType } = this.state
        if (actionType === 'hideProduct' && this.submitting.notif) {
          this.setState({
            notification: true,
            messageNotification: 'Berhasil menyembunyikan barang'
          })
        }
        if (actionType === 'deleteProduct' && this.submitting.notif) {
          this.setState({
            notification: true,
            messageNotification: 'Berhasil menghapus barang'
          })
        }
        if (actionType === 'moveCatalog' && this.submitting.notif) {
          this.setState({
            notification: true,
            messageNotification: 'Berhasil memindahkan ke katalog lain'
          })
        }
        if (actionType === 'moveDropship' && this.submitting.notif) {
          this.setState({
            notification: true,
            messageNotification: 'Berhasil menjadikan Dropshipping'
          })
        }
        this.submitting = {...this.submitting, notif: false}
      }
    }

    if (!isFetching(dataCatalog) && this.submitting.catalog) {
      this.submitting = {...this.submitting, catalog: false}
      if (isError(dataCatalog)) {
        ToastAndroid.show(dataCatalog.message, ToastAndroid.SHORT)
      }
      if (isFound(dataCatalog)) {
        this.setState({
          listKatalogProps: dataCatalog,
          listKatalog: dataCatalog.catalogs,
          loading: false
        })
      }
    }

    if (!isFetching(alterProduct) && this.submitting.alter) {
      this.submitting = { ...this.submitting, alter: false }
      if (isError(alterProduct)) {
        ToastAndroid.show(alterProduct.message, ToastAndroid.SHORT)
      }
      if (isFound(alterProduct)) {
        this.submitting.isUpdate = true
        this.setState({
          isChecked: false,
          loading: false
        })
        if (!this.submitting.products) {
          this.submitting = {
            ...this.submitting,
            products: true,
            notif: true
          }
          this.props.getProductByCatalog({id: this.state.idCatalog, is_dropship: false, hidden: false})
        }
      }
    }
  }

  componentDidMount () {
    if (this.props.actionType === 'hideProduct') {
      if (!this.submitting.alter) {
        this.submitting = {
          ...this.submitting,
          products: true
        }
        this.props.getProductByCatalog({id: this.state.idCatalog, is_dropship: false, hidden: false})
      }
    } else if (this.props.actionType === 'deleteProduct') {
      if (!this.submitting.alter) {
        this.submitting = {
          ...this.submitting,
          products: true
        }
        this.props.getProductByCatalog({id: this.state.idCatalog, is_dropship: false, hidden: false})
      }
    } else if (this.props.actionType === 'moveCatalog') {
      if (!this.submitting.alter) {
        this.submitting = {
          ...this.submitting,
          products: true,
          catalog: true
        }
        this.props.getCatalog()
        this.props.getProductByCatalog({id: this.state.idCatalog, is_dropship: false, hidden: false})
      }
    } else if (this.props.actionType === 'moveDropship') {
      if (!this.submitting.alter) {
        this.submitting = {
          ...this.submitting,
          products: true
        }
        this.props.getProductByCatalog({id: this.state.idCatalog, is_dropship: false, hidden: false})
      }
    }
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
  }

  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
  }

  handleBack = () => {
    if (!this.submitting.isUpdate) {
      NavigationActions.pop()
      return true
    } else {
      NavigationActions.pop({ refresh: { callback: !this.state.callback } })
      return true
    }
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
    const checkProduct = rowData.is_checked ? Images.centangBiru : null
    return (
      <TouchableOpacity style={styles.list} onPress={this.handleCheckProduct(rowId, rowData.id)}>
        <View style={[styles.row, {paddingLeft: 0}]}>
          <View style={styles.box}>
            <Image
              source={checkProduct}
              style={styles.check}
            />
          </View>
          <View style={styles.maskedImage}>
            <Image
              source={{uri: rowData.image}}
              style={styles.imageProduct}
              resizeMode='cover'
              borderRadius={5}
            />
          </View>
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
    this.submitting.alter = true
    this.setState({
      idCatalogChoosen: id,
      modalCatalog: false
    })
    this.props.changeCatalog({catalog_id: id, product_ids: data})
  }

  handleDeleteProduct () {
    let data = this.state.arrayIdProduct
    this.submitting.alter = true
    this.setState({
      modalDelete: false,
      loading: true
    })
    this.props.setDeleteProduct({product_ids: data})
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
      if (data.length > 0) {
        this.submitting.alter = true
        this.setState({
          loading: true
        })
        this.props.setHideProduct({product_ids: data})
      } else {
        ToastAndroid.show('Pilih produk terlebih dahulu', ToastAndroid.SHORT)
      }
    } else if (this.state.actionType === 'deleteProduct') {
      this.setState({
        modalDelete: true
      })
    } else if (this.state.actionType === 'moveCatalog') {
      let data = this.state.arrayIdProduct
      if (data.length > 0) {
        let data = this.state.arrayIdProduct
        if (data.length > 0) {
          this.submitting.alter = true
          this.setState({
            modalCatalog: true
          })
        } else {
          ToastAndroid.show('Pilih produk terlebih dahulu', ToastAndroid.SHORT)
        }
      } else {
        ToastAndroid.show('Pilih produk terlebih dahulu', ToastAndroid.SHORT)
      }
    } else if (this.state.actionType === 'moveDropship') {
      let data = this.state.arrayIdProduct
      if (data.length > 0) {
        this.submitting.alter = true
        this.setState({
          loading: true
        })
        this.props.updateProductToDropship({product_ids: data})
      } else {
        ToastAndroid.show('Pilih produk terlebih dahulu', ToastAndroid.SHORT)
      }
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

  renderHeader () {
    return (
      <View style={styles.headerTextContainer}>
        <TouchableOpacity onPress={this.handleBack}>
          <Image
            source={Images.iconBack}
            style={styles.imageStyle}
          />
        </TouchableOpacity>
        <Text style={styles.headerTextTop}>
          {this.state.title}
        </Text>
      </View>
    )
  }

  render () {
    const spinner = this.state.loading
    ? (<View style={styles.spinner}>
      <ActivityIndicator color='white' size='large' />
    </View>) : (<View />)
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {this.notif()}
        {this.headerDropshipper()}
        {this.headerHideProduct()}
        {this.header()}
        <ListView
          dataSource={this.dataSource.cloneWithRows(this.state.product)}
          renderRow={this.renderRowData.bind(this)}
          enableEmptySections
        />
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
    getListProduk: (param) => dispatch(storeAction.getStoreProducts(param)),
    setHideProduct: (param) => dispatch(productAction.hideProducts(param)),
    updateProductToDropship: (param) => dispatch(productAction.updateDropshipStatus(param)),
    setDeleteProduct: (param) => dispatch(productAction.deleteProducts(param)),
    changeCatalog: (param) => dispatch(productAction.changeCatalogProducts(param)),
    getProductByCatalog: (param) => dispatch(storeAction.getStoreProductsByCatalog(param)),
    getCatalog: () => dispatch(catalogAction.getListCatalog())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovingProduct)
