import React from 'react'
import { View, TextInput, Modal, Text, Image, BackAndroid, TouchableOpacity, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import Switch from 'react-native-switch-pro'
import CustomRadio from '../Components/CustomRadioCatalog'
import Dropshipping from './Dropshipping'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import * as productAction from '../actions/product'
import * as storeAction from '../actions/stores'

// Styles
import styles from './Styles/StatusStockDropshippingStyle'
import { Colors, Images } from '../Themes/'

class StatusStockDropshipping extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      photoProduct: this.props.photoProduct,
      productName: this.props.productName,
      stock: String(this.props.data),
      idProduct: this.props.idProduct,
      backgroundContainer: this.props.backgroundContainer || Colors.paleGrey,
      actionType: this.props.actionType,
      index: this.props.data,
      isDropship: this.props.data,
      productIds: [],
      data: [{'index': 1, 'label': 'Ditampilkan di toko'}, {'index': 0, 'label': 'Disembunyikan'}],
      loading: false,
      modalDropshipping: false
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataUpdateProduct.status === 200 && this.props.actionType === 'stockAction') {
      this.setState({
        stock: String(nextProps.dataUpdateProduct.product.stock),
        loading: false
      })
      this.props.getDetailStoreProduct(this.state.idProduct)
      nextProps.dataUpdateProduct.status = 0
    } if (nextProps.dataUpdateProduct.status === 200 && this.props.actionType === 'displayAction') {
      this.setState({
        loading: false
      })
      NavigationActions.storeproduct({
        type: ActionConst.PUSH_OR_POP
      })
      nextProps.dataUpdateProduct.status = 0
    } if (nextProps.dataUpdateProduct.status === 200 && this.props.actionType === 'dropshippingAction') {
      this.setState({
        isDropship: nextProps.dataUpdateProduct.product.is_dropship,
        loading: false
      })
      this.props.getDetailStoreProduct(this.state.idProduct)
      nextProps.dataUpdateProduct.status = 0
    }
  }

  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
  }

  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
  }

  handleBack = () => {
    NavigationActions.pop()
    return true
  }

  backButton () {
    NavigationActions.pop()
  }

  modalDropshipping () {
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.modalDropshipping}
        onRequestClose={() => this.setState({ modalDropshipping: false })}
        >
        <View style={[styles.headerModal]}>
          <Text style={[styles.texthapus, {flex: 1, color: Colors.darkgrey}]}>Tentang Dropshipping</Text>
          <TouchableOpacity onPress={() => this.setState({modalDropshipping: false})}>
            <Image source={Images.close} style={styles.imagePicker} />
          </TouchableOpacity>
        </View>
        <Dropshipping marginNavbars={0} visibleButton={false} />
      </Modal>
    )
  }

  SwitchChanges (types) {
    if (types) {
      this.setState({isDropship: false})
    } else {
      this.setState({isDropship: true})
    }
  }

  renderOptionDropshipping () {
    if (this.state.actionType === 'dropshippingAction') {
      return (
        <View>
          <View style={styles.dropshipping}>
            <Text style={styles.textDropshipping}>Dropshipping untuk barang ini</Text>
            <Switch
              value={this.state.isDropship}
              width={34}
              height={16}
              circleColor={Colors.teal}
              backgroundActive={'rgba(0, 148, 133, 0.5)'}
              onSyncPress={() => this.SwitchChanges(this.state.isDropship)}
            />
          </View>
          <TouchableOpacity onPress={() => this.setState({modalDropshipping: true})}>
            <Text style={styles.link}>Pelajari Lebih Lanjut tentang dropshipping</Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <View />
      )
    }
  }

  renderStock () {
    if (this.state.actionType === 'stockAction') {
      return (
        <View style={styles.whiteBackground}>
          <View style={styles.containerStock}>
            <Text style={styles.textLabel}>Stock saat ini</Text>
            <View style={styles.inputContainer}>
              <TextInput
                maxLength={4}
                style={[styles.inputText]}
                value={this.state.stock}
                keyboardType='numeric'
                returnKeyType='done'
                autoCorrect={false}
                onChange={(event) => {
                  this.setState({
                    stock: event.nativeEvent.text
                  })
                }}
                underlineColorAndroid='transparent'
                placeholder=''
              />
            </View>
          </View>
        </View>
      )
    } else {
      return (
        <View />
      )
    }
  }

  handlingRadio (index, value) {
    this.setState({
      index: index
    })
  }

  renderDisplayProduct () {
    if (this.state.actionType === 'displayAction') {
      return (
        <View style={styles.containerDisplay}>
          <Text style={[styles.textLabel, {opacity: 100, paddingLeft: 20, paddingBottom: 15}]}>Status Barang ini</Text>
          <View style={styles.containerRadio}>
            <CustomRadio
              data={this.state.data}
              index={this.state.index}
              handlingRadio={(index, value) =>
                this.handlingRadio(index, index)}
              vertical
            />
            <Text style={styles.textDesc}>Barang yang disembunyikan tidak akan muncul di toko Anda.  Barang Anda yang terbuka untuk dropshipping tetap dapat di dropship oleh toko lain dan tetap bisa dijual seperti biasa oleh toko lain.</Text>
          </View>
        </View>
      )
    } else {
      return (
        <View />
      )
    }
  }

  finalAction () {
    this.setState({
      loading: true
    })
    if (this.state.actionType === 'dropshippingAction') {
      this.props.updateStatusDropship(this.state.idProduct, this.state.isDropship)
    }
    if (this.state.actionType === 'displayAction') {
      this.props.updateDisplayProduct(this.state.idProduct, this.state.index)
    }
    if (this.state.actionType === 'stockAction') {
      this.props.updateStock(this.state.idProduct, +this.state.stock)
    }
  }

  render () {
    const spinner = this.state.loading
    ? (<View style={styles.spinner}>
      <ActivityIndicator color='white' size='large' />
    </View>) : (<View />)
    return (
      <View style={[styles.container, {backgroundColor: this.state.backgroundContainer}]}>
        <View style={styles.headerProduct}>
          <View style={styles.maskedPhoto}>
            <Image source={{uri: this.state.photoProduct[0].file}} style={styles.image} />
          </View>
          <Text style={styles.textProduct}>{this.state.productName}</Text>
        </View>
        {this.renderOptionDropshipping()}
        {this.renderStock()}
        {this.renderDisplayProduct()}
        <TouchableOpacity style={[styles.buttonNext]} onPress={() => this.finalAction()}>
          <Text style={styles.textButtonNext}>
            Simpan Perubahan
          </Text>
        </TouchableOpacity>
        {this.modalDropshipping()}
        {spinner}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataUpdateProduct: state.alterProducts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateStock: (id, data) => dispatch(productAction.updateProduct({id: id, stock: data})),
    updateStatusDropship: (id, data) => dispatch(productAction.updateProduct({id: id, is_dropship: data})),
    updateDisplayProduct: (id, data) => dispatch(productAction.updateProduct({id: id, status: data})),
    setHideProduct: (data) => dispatch(productAction.hideProducts({product_ids: data})),
    getDetailStoreProduct: (id) => dispatch(storeAction.getStoreProductDetail({id})),
    getListProduk: (status) => dispatch(storeAction.getStoreProducts({hidden: status})),
    getHiddenProduct: () => dispatch(storeAction.getHiddenStoreProducts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StatusStockDropshipping)
