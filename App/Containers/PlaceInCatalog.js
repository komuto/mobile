import React from 'react'
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  BackAndroid,
  Modal,
  TextInput,
  ActivityIndicator,
  ToastAndroid
} from 'react-native'
import { connect } from 'react-redux'
import { MaskService } from 'react-native-masked-text'
import CustomRadio from '../Components/CustomRadioCatalog'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import {isFetching, isError, isFound} from '../Services/Status'
import Reactotron from 'reactotron-react-native'

// import Reactotron from 'reactotron-react-native'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import * as catalogAction from '../actions/catalog'
import * as productAction from '../actions/product'
import * as storeAction from '../actions/stores'

// Styles
import styles from './Styles/TempatkanDiKatalogScreenStyle'
import { Images, Colors } from '../Themes'

class PlaceInCatalog extends React.Component {

  constructor (props) {
    super(props)
    this.submitting = {
      catalog: false,
      updateDropship: false,
      deleteDropship: false,
      createDropship: false,
      createCatalog: false
    }
    this.state = {
      listKatalog: [],
      id: this.props.id,
      foto: this.props.fotoToko || null,
      price: this.props.price || 1000,
      namaToko: this.props.namaToko || null,
      productName: this.props.productName || null,
      index: this.props.catalogId,
      idCatalog: this.props.catalogId,
      modalTambahKatalog: false,
      namaKatalog: '',
      statusCreateProduct: this.props.createDropshipper || false,
      commission: this.props.commission || 0,
      textHeader: this.props.title || 'Tempatkan di Katalog',
      loading: true
    }
  }

  componentWillReceiveProps (nextProps) {
    const {dataCatalog, dataCreateCatalog, dataCreateProdukDropshipper, alterProduct} = nextProps

    if (!isFetching(dataCatalog) && this.submitting.catalog) {
      this.submitting = { ...this.submitting, catalog: false }
      if (isError(dataCatalog)) {
        ToastAndroid.show(dataCatalog.message, ToastAndroid.SHORT)
      }
      if (isFound(dataCatalog)) {
        const isFound = dataCatalog.catalogs.length
        if (isFound <= 0) {
          ToastAndroid.show('Anda tidak memiliki katalog', ToastAndroid.LONG)
        } else {
          let temp = this.state.listKatalog
          dataCatalog.catalogs.map((data, i) => {
            temp[i] = ({'index': data.id, 'label': data.name})
          })
          this.setState({
            listKatalog: temp,
            idCatalog: dataCatalog.catalogs[0].id,
            loading: false
          })
        }
      }
    }

    if (!isFetching(dataCreateCatalog) && this.submitting.createCatalog) {
      this.submitting = { ...this.submitting, createCatalog: false }
      if (isError(dataCreateCatalog)) {
        ToastAndroid.show(dataCreateCatalog.message, ToastAndroid.SHORT)
      }
      if (isFound(dataCreateCatalog)) {
        this.setState({ namaKatalog: '' })
        if (!this.submitting.catalog) {
          this.submitting = {
            ...this.submitting,
            catalog: true,
            loading: false
          }
          this.props.getCatalog()
        }
      }
    }

    if (!isFetching(dataCreateProdukDropshipper) && this.submitting.createDropship) {
      this.submitting = { ...this.submitting, createDropship: false }
      if (isError(dataCreateProdukDropshipper)) {
        ToastAndroid.show(dataCreateProdukDropshipper.message, ToastAndroid.SHORT)
      }
      if (isFound(dataCreateProdukDropshipper)) {
        this.setState({ loading: false })
        NavigationActions.notification({
          type: ActionConst.PUSH,
          tipeNotikasi: 'succestambahproduk',
          hideNavBar: true,
          hideBackImage: true
        })
      }
    }

    if (!isFetching(alterProduct) && this.submitting.updateDropship) {
      this.submitting = { ...this.submitting, updateDropship: false }
      if (isError(alterProduct)) {
        ToastAndroid.show(alterProduct.message, ToastAndroid.SHORT)
      }
      if (isFound(alterProduct)) {
        this.setState({ loading: false })
        NavigationActions.pop({ refresh: { callback: !this.state.callback } })
        return true
      }
    }

    if (!isFetching(alterProduct) && this.submitting.deleteDropship) {
      this.submitting = { ...this.submitting, deleteDropship: false }
      if (isError(alterProduct)) {
        ToastAndroid.show(alterProduct.message, ToastAndroid.SHORT)
      }
      if (isFound(alterProduct)) {
        this.setState({ loading: false })
        NavigationActions.pop({ refresh: { callback: !this.state.callback } })
        return true
      }
    }
  }

  componentDidMount () {
    if (!this.submitting.catalog) {
      this.submitting = {
        ...this.submitting,
        catalog: true
      }
      this.props.getCatalog()
    }
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
  }

  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
  }

  handleBack = () => {
    NavigationActions.pop()
    return true
  }

  renderProduct () {
    const totalHarga = MaskService.toMask('money', this.state.price, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })

    return (
      <View style={styles.border}>
        <View style={styles.profile}>
          <Image
            source={{ uri: this.state.foto }}
            style={styles.styleFotoToko}
          />
          <View style={styles.namaContainer}>
            <Text style={styles.textNama}>
              {this.state.productName}
            </Text>
            <View style={styles.rowContainer}>
              <Text style={styles.textKelola}>
                {totalHarga}
              </Text>
              <Text style={[styles.textKelola, {color: Colors.darkMint}]}> - Komisi {this.state.commission * 100}%</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }

  handlingRadio (index, value) {
    this.setState({
      index: index,
      idCatalog: index
    })
  }

  changeNamaKatalog = (text) => {
    this.setState({namaKatalog: text})
  }

  modalTambahCatalog () {
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.modalTambahKatalog}
        onRequestClose={() => this.setState({ modalTambahKatalog: false })}
        >
        <TouchableOpacity style={styles.modalContainer} onPress={() => this.setState({modalTambahKatalog: false})}>
          <View style={[styles.modalKatalog]}>
            <View style={[styles.flexRow, {alignItems: 'center', paddingRight: 18.5, borderTopLeftRadius: 5, borderTopRightRadius: 5, backgroundColor: Colors.paleGreyFive}]}>
              <Text style={[styles.title, {flex: 1, paddingBottom: 19.3}]}>Buat Katalog Baru</Text>
              <TouchableOpacity onPress={() => this.setState({modalTambahKatalog: false})}>
                <Image source={Images.close} style={styles.imagePicker} />
              </TouchableOpacity>
            </View>
            <View style={[styles.flexOne, {justifyContent: 'flex-end'}]}>
              <TextInput
                style={[styles.inputText, {marginLeft: 20, marginRight: 20}]}
                value={this.state.namaKatalog}
                keyboardType='default'
                returnKeyType='done'
                autoCapitalize='none'
                maxLength={30}
                autoCorrect
                onChangeText={this.changeNamaKatalog}
                underlineColorAndroid='transparent'
                placeholder='Masukkan nama katalog'
              />
              <TouchableOpacity style={[styles.buttonnext, {margin: 20}]} onPress={() => this.handleTambahKatalog()}>
                <Text style={styles.textButtonNext}>
                  Buat Katalog Baru
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    )
  }

  handleTambahKatalog () {
    if (!this.submitting.createCatalog) {
      this.submitting = {
        ...this.submitting,
        createCatalog: true
      }
      this.setState({modalTambahKatalog: false, loading: true})
      this.props.createCatalog(this.state.namaKatalog)
    }
  }

  renderCatalog () {
    return (
      <View style={styles.containerCatalog}>
        <TouchableOpacity style={styles.buttonAddCatalog} onPress={() => this.setState({modalTambahKatalog: true})}>
          <Text style={styles.bubttonAddCatalog}>+ Buat Katalog Baru</Text>
        </TouchableOpacity>
        <ScrollView>
          <View style={styles.radioContainer}>
            <CustomRadio
              data={this.state.listKatalog}
              index={this.state.index}
              handlingRadio={(index, label) =>
                this.handlingRadio(index, label)}
              vertical
            />
          </View>
        </ScrollView>
      </View>
    )
  }

  nextState () {
    const {idCatalog, id, statusCreateProduct} = this.state
    this.setState({loading: true})
    if (statusCreateProduct) {
      if (!this.submitting.catalog) {
        this.submitting = {
          ...this.submitting,
          createDropship: true
        }
        this.props.createProductFromDropshipper(id, idCatalog)
      }
    } else {
      let tempIdProduct = []
      tempIdProduct[0] = id
      if (!this.submitting.catalog) {
        this.submitting = {
          ...this.submitting,
          updateDropship: true
        }
        this.props.changeCatalog(idCatalog, tempIdProduct)
      }
    }
  }

  renderStage () {
    if (this.state.statusCreateProduct) {
      <View style={styles.header}>
        <View style={[styles.state, {borderColor: Colors.background, backgroundColor: Colors.red}]}>
          <Text style={[styles.textState, {color: Colors.background}]}>1</Text>
        </View>
        <View style={styles.line} />
        <View style={[styles.state, {borderColor: Colors.background, backgroundColor: Colors.red}]}>
          <Text style={[styles.textState, {color: Colors.background}]}>2</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.state}>
          <Text style={styles.textState}>3</Text>
        </View>
      </View>
    }
  }

  delete () {
    let data = []
    data[0] = this.state.id
    Reactotron.log(this.state.id)
    this.setState({loading: true})
    if (!this.submitting.catalog) {
      this.submitting = {
        ...this.submitting,
        deleteDropship: true
      }
      this.props.deleteItems({product_ids: data})
    }
  }

  renderHeader () {
    return (
      <View style={styles.headerTextContainer}>
        <TouchableOpacity onPress={() => this.handleBack()}>
          <Image
            source={Images.iconBack}
            style={styles.imageStyle}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>
          {this.state.textHeader}
        </Text>
        <TouchableOpacity onPress={() => this.delete()}>
          <Image
            source={Images.deletWhite}
            style={styles.imageStyle}
          />
        </TouchableOpacity>
      </View>
    )
  }

  render () {
    Reactotron.log(this.state.commission)
    const spinner = this.state.loading
    ? (<View style={styles.spinner}>
      <ActivityIndicator color={[Colors.red, Colors.bluesky, Colors.green, Colors.orange]} size='large' />
    </View>) : (<View />)
    return (
      <View style={[styles.container]}>
        {this.renderHeader()}
        {this.renderStage()}
        {this.renderProduct()}
        <Text style={styles.bigTitle}>Pilih Katalog yang sesuai dengan produk Anda</Text>
        {this.renderCatalog()}
        <TouchableOpacity style={[styles.buttonnext]} onPress={() => this.nextState()}>
          <Text style={styles.textButtonNext}>
            Lanjutkan
          </Text>
        </TouchableOpacity>
        {this.modalTambahCatalog()}
        {spinner}
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    dataCatalog: state.getListCatalog,
    dataCreateCatalog: state.createCatalog,
    dataCreateProdukDropshipper: state.addDropshipProducts,
    alterProduct: state.alterProducts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCatalog: () => dispatch(catalogAction.getListCatalog()),
    createCatalog: (name) => dispatch(catalogAction.createCatalog({name: name})),
    changeCatalog: (id, data) => dispatch(productAction.changeCatalogProducts({catalog_id: id, product_ids: data})),
    createProductFromDropshipper: (id, idCatalog) => dispatch(productAction.addDropshipProducts({id: id, catalog_id: idCatalog})),
    getListProduk: () => dispatch(storeAction.getStoreProducts()),
    getHiddenProduct: () => dispatch(storeAction.getHiddenStoreProducts()),
    deleteItems: (param) => dispatch(productAction.deleteProducts(param))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceInCatalog)
