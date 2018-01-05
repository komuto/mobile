import React from 'react'
import {
  View,
  Text,
  ActivityIndicator,
  ToastAndroid,
  BackAndroid,
  Modal,
  ListView,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import {isFetching, isError, isFound} from '../Services/Status'
import Reactotron from 'reactotron-react-native'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import * as categoriAction from '../actions/home'
import * as brandAction from '../actions/brand'
import * as katalogAction from '../actions/catalog'

// Styles
import styles from './Styles/InfoNamaDanKategoriProdukScreenStyle'
import { Images, Colors, Fonts } from '../Themes'
import stylesLokasi from './Styles/ProductDetailScreenStyle'

class ProductInfoNameAndCategory extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.submitting = {
      category1: false,
      category2: false,
      category3: false,
      category4: false,
      brand: false
    }
    this.state = {
      images: this.props.images || null,
      namaProduk: '',
      descProduk: '',
      active: false,
      errorColorNamaProduk: Colors.snow,
      errorColorDescription: Colors.snow,
      errorColorBrand: Colors.snow,
      errorColorCategory1: Colors.snow,
      errorColorCategory2: Colors.snow,
      errorColorCategory3: Colors.snow,
      errorColorCategory4: Colors.snow,
      colorCategory1: Colors.labelgrey,
      colorCategory2: Colors.labelgrey,
      colorCategory3: Colors.labelgrey,
      colorCategory4: Colors.labelgrey,
      colorBrand: Colors.labelgrey,
      iconCategory1: Images.down,
      iconCategory2: Images.down,
      iconCategory3: Images.down,
      iconCategory4: Images.down,
      iconBrand: Images.down,
      loading: true,
      category1: props.category1 || null,
      category2: props.category2 || null,
      category3: props.category3 || null,
      category4: props.category4 || null,
      brand: [],
      fieldCategory1: 'Pilih Kategori',
      fieldCategory2: 'Pilih Sub Kategori 1',
      fieldCategory3: 'Pilih Sub Kategori 2',
      fieldCategory4: 'Pilih Sub Kategori 3',
      fieldBrand: 'Pilih Brand',
      idCategory1: 0,
      idCategory2: 0,
      idCategory3: 0,
      idCategory4: 0,
      idBrand: 0,
      addCategory1: [
        {
          'id': 0,
          'name': 'Pilih Kategori'
        }
      ],
      addCategory2: [
        {
          'id': 0,
          'name': 'Pilih Sub Kategori 1'
        }
      ],
      addCategory3: [
        {
          'id': 0,
          'name': 'Pilih Sub Kategori 2'
        }
      ],
      addCategory4: [
        {
          'id': 0,
          'name': 'Pilih Sub Kategori 3'
        }
      ],
      addBrand: [
        {
          'id': 0,
          'name': 'Pilih Brand'
        }
      ],
      isDisable2: true,
      isDisable3: true,
      isDisable4: true,
      modalCategory1: false,
      modalCategory2: false,
      modalCategory3: false,
      modalCategory4: false,
      modalBrand: false,
      brandCheck: false,
      height: 0,
      dataProduk: [],
      colorCheckbox: Colors.snow
    }
  }

  componentWillReceiveProps (nextProps) {
    const {category1, category2, category3, category4, brands} = nextProps

    if (!isFetching(category1) && this.submitting.category1) {
      this.submitting = { ...this.submitting, category1: false }
      if (isError(category1)) {
        ToastAndroid.show(category1.message, ToastAndroid.SHORT)
      }
      if (isFound(category1)) {
        this.setState({ category1: category1, loading: false })
      }
    }

    if (!isFetching(category2) && this.submitting.category2) {
      this.submitting = { ...this.submitting, category2: false }
      if (isError(category2)) {
        ToastAndroid.show(category2.message, ToastAndroid.SHORT)
      }
      if (isFound(category2)) {
        this.setState({ category2: category2, loading: false, isDisable2: false })
      }
    }

    if (!isFetching(category3) && this.submitting.category3) {
      this.submitting = { ...this.submitting, category3: false }
      if (isError(category3)) {
        ToastAndroid.show(category3.message, ToastAndroid.SHORT)
      }
      if (isFound(category3)) {
        this.setState({ category3: category3, loading: false, isDisable3: false })
      }
    }

    if (!isFetching(category4) && this.submitting.category4) {
      this.submitting = { ...this.submitting, category4: false }
      if (isError(category4)) {
        ToastAndroid.show(category4.message, ToastAndroid.SHORT)
      }
      if (isFound(category4)) {
        this.setState({ category4: category4, loading: false, isDisable4: false })
      }
    }

    if (!isFetching(brands) && this.submitting.brand) {
      this.submitting = { ...this.submitting, brand: false }
      if (isError(brands)) {
        ToastAndroid.show(brands.message, ToastAndroid.SHORT)
      }
      if (isFound(brands)) {
        this.setState({ brand: brands, loading: false })
      }
    }
  }

  componentDidMount () {
    const { category1 } = this.state
    if (!category1.isFound) {
      this.submitting = {
        ...this.submitting,
        category1: true
      }
      this.props.getCategory1()
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

  backButton () {
    NavigationActions.pop()
  }

  onError = (field) => {
    switch (field) {
      case 'namaproduk':
        this.setState({
          errorColorNamaProduk: Colors.red
        })
        break
      case 'category1':
        this.setState({
          errorColorCategory1: Colors.red
        })
        break
      case 'brand':
        this.setState({
          errorColorBrand: Colors.red
        })
        break
      case 'desc':
        this.setState({
          errorColorDescription: Colors.red
        })
        break
      case 'empty':
        this.setState({
          errorColorNamaProduk: Colors.red,
          errorColorCategory1: Colors.red,
          errorColorCategory2: Colors.red,
          errorColorCategory3: Colors.red,
          errorColorCategory4: Colors.red,
          errorColorBrand: Colors.red,
          errorColorDescription: Colors.red
        })
        break
    }
  }

  onFocus = (field) => {
    switch (field) {
      case 'namaproduk':
        this.setState({
          errorColorNamaProduk: Colors.snow
        })
        break
      case 'desc':
        this.setState({
          errorColorBrand: Colors.snow
        })
        break
      case 'empty':
        this.setState({
          errorColorNamaProduk: Colors.snow,
          errorColorDescription: Colors.snow
        })
        break
    }
  }

  onBlur = (field) => {
    switch (field) {
      case 'namaproduk':
        this.setState({
          errorColorNamaProduk: Colors.snow
        })
        break
      case 'desc':
        this.setState({
          errorColorDescription: Colors.snow
        })
        break
      case 'empty':
        this.setState({
          errorColorNamaProduk: Colors.snow,
          errorColorDescription: Colors.snow
        })
        break
    }
  }

  handleChangeNamaProduk = (text) => {
    this.setState({ namaProduk: text })
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
            loading: true })
          this.submitting.category2 = true
          this.props.getCategory2(rowData.id)
        }}
      >
        <Text style={[stylesLokasi.textBagikan, { marginLeft: 0 }]}>{rowData.name}</Text>
      </TouchableOpacity>
    )
  }

  renderRowCategory2 (rowData) {
    return (
      <TouchableOpacity
        style={[stylesLokasi.menuLaporkan, { padding: 15 }]}
        activeOpacity={0.9}
        onPress={() => {
          this.setState({
            fieldCategory2: rowData.name,
            idCategory2: rowData.id,
            colorCategory2: Colors.darkgrey,
            iconCategory2: Images.down,
            modalCategory2: false,
            loading: true })
          this.submitting.category3 = true
          this.props.getCategory3(rowData.id)
        }}
      >
        <Text style={[stylesLokasi.textBagikan, { marginLeft: 0 }]}>{rowData.name}</Text>
      </TouchableOpacity>
    )
  }

  renderRowCategory3 (rowData) {
    return (
      <TouchableOpacity
        style={[stylesLokasi.menuLaporkan, { padding: 15 }]}
        activeOpacity={0.9}
        onPress={() => {
          this.setState({
            fieldCategory3: rowData.name,
            idCategory3: rowData.id,
            colorCategory3: Colors.darkgrey,
            iconCategory3: Images.down,
            modalCategory3: false,
            loading: true })
          this.submitting.category4 = true
          this.props.getCategory4(rowData.id)
        }}
      >
        <Text style={[stylesLokasi.textBagikan, { marginLeft: 0 }]}>{rowData.name}</Text>
      </TouchableOpacity>
    )
  }

  renderRowCategory4 (rowData) {
    return (
      <TouchableOpacity
        style={[stylesLokasi.menuLaporkan, { padding: 15 }]}
        activeOpacity={0.9}
        onPress={() => {
          this.setState({
            fieldCategory4: rowData.name,
            idCategory4: rowData.id,
            colorCategory4: Colors.darkgrey,
            iconCategory4: Images.down,
            modalCategory4: false })
        }}
      >
        <Text style={[stylesLokasi.textBagikan, { marginLeft: 0 }]}>{rowData.name}</Text>
      </TouchableOpacity>
    )
  }

  renderRowBrand (rowData) {
    return (
      <TouchableOpacity
        style={[stylesLokasi.menuLaporkan, { padding: 15 }]}
        activeOpacity={0.9}
        onPress={() => {
          this.setState({
            fieldBrand: rowData.name,
            idBrand: rowData.id,
            colorBrand: Colors.darkgrey,
            iconBrand: Images.down,
            modalBrand: false })
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
        <TouchableOpacity activeOpacity={1} style={styles.modalContainer} onPress={() => this.setState({ modalCategory1: false, iconCategory1: Images.down })}>
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

  modalCategory2 () {
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.modalCategory2}
        onRequestClose={() => this.setState({ modalCategory2: false, iconCategory2: Images.down })}
        >
        <TouchableOpacity activeOpacity={1} style={styles.modalContainer} onPress={() => this.setState({ modalCategory2: false, iconCategory2: Images.down })}>
          <ScrollView style={styles.menuProvinsiContainer}>
            <ListView
              contentContainerStyle={{ flex: 1, flexWrap: 'wrap' }}
              dataSource={this.dataSource.cloneWithRows(this.state.addCategory2.concat(this.state.category2.categories.sub_categories))}
              renderRow={this.renderRowCategory2.bind(this)}
              enableEmptySections
            />
          </ScrollView>
        </TouchableOpacity>
      </Modal>
    )
  }

  modalCategory3 () {
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.modalCategory3}
        onRequestClose={() => this.setState({ modalCategory3: false, iconCategory3: Images.down })}
        >
        <TouchableOpacity activeOpacity={1} style={styles.modalContainer} onPress={() => this.setState({ modalCategory3: false, iconCategory3: Images.down })}>
          <ScrollView style={styles.menuProvinsiContainer}>
            <ListView
              contentContainerStyle={{ flex: 1, flexWrap: 'wrap' }}
              dataSource={this.dataSource.cloneWithRows(this.state.addCategory3.concat(this.state.category3.categories.sub_categories))}
              renderRow={this.renderRowCategory3.bind(this)}
              enableEmptySections
            />
          </ScrollView>
        </TouchableOpacity>
      </Modal>
    )
  }

  modalCategory4 () {
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.modalCategory4}
        onRequestClose={() => this.setState({ modalCategory4: false, iconCategory4: Images.down })}
        >
        <TouchableOpacity activeOpacity={1} style={styles.modalContainer} onPress={() => this.setState({ modalCategory4: false })}>
          <ScrollView style={styles.menuProvinsiContainer}>
            <ListView
              contentContainerStyle={{ flex: 1, flexWrap: 'wrap' }}
              dataSource={this.dataSource.cloneWithRows(this.state.addCategory4.concat(this.state.category4.categories.sub_categories))}
              renderRow={this.renderRowCategory4.bind(this)}
              enableEmptySections
            />
          </ScrollView>
        </TouchableOpacity>
      </Modal>
    )
  }

  modalBrand () {
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.modalBrand}
        onRequestClose={() => this.setState({ modalBrand: false, iconBrand: Images.down })}
        >
        <TouchableOpacity activeOpacity={1} style={styles.modalContainer} onPress={() => this.setState({ modalBrand: false, iconBrand: Images.down })}>
          <ScrollView style={styles.menuProvinsiContainer}>
            <ListView
              contentContainerStyle={{ flex: 1, flexWrap: 'wrap' }}
              dataSource={this.dataSource.cloneWithRows(this.state.addBrand.concat(this.state.brand.brands))}
              renderRow={this.renderRowBrand.bind(this)}
              enableEmptySections
            />
          </ScrollView>
        </TouchableOpacity>
      </Modal>
    )
  }

  handdleBrand () {
    if (!this.state.brandCheck) {
      this.setState({brandCheck: true, loading: true, colorCheckbox: Colors.bluesky})
      this.submitting.brand = true
      this.props.getBrand()
    } else {
      this.submitting.brand = false
      this.setState({brandCheck: false, colorCheckbox: Colors.snow})
    }
  }

  viewBrand () {
    const {errorColorBrand, colorBrand, brandCheck, iconBrand} = this.state
    if (brandCheck) {
      return (
        <View>
          <Text style={[styles.textLabel]}>Brand</Text>
          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.pilihDestinasi} onPress={() => this.setState({ modalBrand: true, iconBrand: Images.up, errorColorBrand: Colors.snow })}>
              <Text style={[styles.inputPicker, {color: colorBrand}]}>{this.state.fieldBrand}</Text>
              <Image source={iconBrand} style={styles.imagePicker} />
            </TouchableOpacity>
          </View>
          <Text style={[styles.textError, {color: errorColorBrand}]}>Brand Harus dipilih</Text>
        </View>
      )
    } else {
      return (
        <View />
      )
    }
  }

  stateTwo () {
    const {
      colorCheckbox,
      brandCheck,
      errorColorNamaProduk,
      errorColorCategory1,
      errorColorCategory2,
      errorColorCategory3,
      errorColorCategory4,
      errorColorDescription,
      colorCategory1,
      colorCategory2,
      colorCategory3,
      colorCategory4,
      isDisable2,
      isDisable3,
      isDisable4,
      iconCategory1,
      iconCategory2,
      iconCategory3,
      iconCategory4,
      height,
      fieldCategory1,
      fieldCategory2,
      fieldCategory3,
      fieldCategory4,
      descProduk
    } = this.state

    const imageCentang = brandCheck ? Images.centang : null
    return (
      <View style={styles.infoContainer}>
        <Text style={styles.textLabel}>Nama Produk</Text>
        <TextInput
          style={styles.inputText}
          value={this.state.namaProduk}
          maxLength={30}
          keyboardType='default'
          returnKeyType='done'
          autoCapitalize='none'
          autoCorrect
          onFocus={() => this.onFocus('namaproduk')}
          onBlur={() => this.onBlur('namaproduk')}
          onChangeText={this.handleChangeNamaProduk}
          underlineColorAndroid='transparent'
          placeholder='Nama Produk Anda'
        />
        <Text style={[styles.textError, {color: errorColorNamaProduk}]}>Nama Produk Harus diisi</Text>
        <Text style={[styles.textLabel]}>Kategori</Text>
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.pilihDestinasi} onPress={() => this.setState({ modalCategory1: true, iconCategory1: Images.up, errorColorCategory1: Colors.snow })}>
            <Text style={[styles.inputPicker, {color: colorCategory1}]}>{fieldCategory1}</Text>
            <Image source={iconCategory1} style={styles.imagePicker} />
          </TouchableOpacity>
        </View>
        <Text style={[styles.textError, {color: errorColorCategory1}]}>Kategori Harus dipilih</Text>
        <Text style={[styles.textLabel]}>Sub-Kategori 1</Text>
        <View style={styles.inputContainer}>
          <TouchableOpacity disabled={isDisable2} style={styles.pilihDestinasi} onPress={() => this.setState({ modalCategory2: true, iconCategory2: Images.up, errorColorCategory2: Colors.snow })}>
            <Text style={[styles.inputPicker, {color: colorCategory2}]}>{fieldCategory2}</Text>
            <Image source={iconCategory2} style={styles.imagePicker} />
          </TouchableOpacity>
        </View>
        <Text style={[styles.textError, {color: errorColorCategory2}]}>Sub-Kategori 1 Harus dipilih</Text>
        <Text style={[styles.textLabel]}>Sub-Kategori 2</Text>
        <View style={styles.inputContainer}>
          <TouchableOpacity disabled={isDisable3} style={styles.pilihDestinasi} onPress={() => this.setState({ modalCategory3: true, iconCategory3: Images.up, errorColorCategory3: Colors.snow })}>
            <Text style={[styles.inputPicker, {color: colorCategory3}]}>{fieldCategory3}</Text>
            <Image source={iconCategory3} style={styles.imagePicker} />
          </TouchableOpacity>
        </View>
        <Text style={[styles.textError, {color: errorColorCategory3}]}>Sub-Kategori 2 Harus dipilih</Text>
        <Text style={[styles.textLabel]}>Sub-Kategori 3</Text>
        <View style={styles.inputContainer}>
          <TouchableOpacity disabled={isDisable4} style={styles.pilihDestinasi} onPress={() => this.setState({ modalCategory4: true, iconCategory4: Images.up, errorColorCategory4: Colors.snow })}>
            <Text style={[styles.inputPicker, {color: colorCategory4}]}>{fieldCategory4}</Text>
            <Image source={iconCategory4} style={styles.imagePicker} />
          </TouchableOpacity>
        </View>
        <Text style={[styles.textError, {color: errorColorCategory4}]}>Sub-Kategori 3 Harus dipilih</Text>
        <View style={{flexDirection: 'row', alignItems: 'center', paddingTop: 5, paddingBottom: 20.8}}>
          <TouchableOpacity onPress={() => this.handdleBrand()}>
            <View style={[styles.box, {backgroundColor: colorCheckbox}]}>
              <Image
                source={imageCentang}
                style={[styles.gambarCentangBox]}
              />
            </View>
          </TouchableOpacity>
          <Text style={[styles.textLabel, {fontFamily: Fonts.type.semiBolds, letterSpacing: 0.22, marginLeft: 15}]}>Sertakan Brand</Text>
        </View>
        {this.viewBrand()}
        <Text style={styles.textLabel}>Deksripsi Produk</Text>
        <TextInput
          style={[styles.inputText, {height: Math.max(40, height)}]}
          value={descProduk}
          keyboardType='default'
          returnKeyType='done'
          autoCapitalize='none'
          autoCorrect
          multiline
          onFocus={() => this.onFocus('desc')}
          onBlur={() => this.onBlur('desc')}
          onChange={(event) => {
            this.setState({
              descProduk: event.nativeEvent.text,
              height: event.nativeEvent.contentSize.height
            })
          }}
          underlineColorAndroid='transparent'
          placeholder='Deksripsi Produk Anda'
        />
        <Text style={[styles.textError, {color: errorColorDescription}]}>Deksripsi Produk Harus diisi</Text>
      </View>
    )
  }

  nextState () {
    const {
      dataProduk,
      images,
      namaProduk,
      idCategory1,
      descProduk,
      idBrand,
      brandCheck
    } = this.state

    if (namaProduk === '') {
      this.onError('namaproduk')
    }
    if (idCategory1 === 0) {
      this.onError('category1')
    }
    if (brandCheck && idBrand === 0) {
      this.onError('brand')
    }
    if (descProduk === '') {
      this.onError('desc')
    }
    if (namaProduk !== '' && idCategory1 !== 0 && idCategory1 && descProduk !== '') {
      if (brandCheck && idBrand === 0) {
        this.onError('brand')
      } else {
        Reactotron.log('lanjut dalam')
        this.procced(dataProduk, namaProduk, idCategory1, idBrand, descProduk, images)
      }
    }
  }

  procced (data, nameproduct, idCategory, idBrand, desc, photo) {
    Reactotron.log(photo)
    data[0] = nameproduct
    data[1] = idCategory
    data[2] = idBrand
    data[3] = desc
    NavigationActions.priceandspesificationproduct({
      type: ActionConst.PUSH,
      dataProduk: data,
      images: photo
    })
  }

  render () {
    const spinner = this.submitting.category1
    ? (<View style={styles.spinner}>
      <ActivityIndicator color='white' size='large' />
    </View>) : (<View />)
    return (
      <View style={styles.container}>
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
          <View style={styles.line} />
          <View style={styles.state}>
            <Text style={styles.textState}>4</Text>
          </View>
        </View>
        <ScrollView>
          {this.stateTwo()}
          <View style={{backgroundColor: Colors.background}}>
            <TouchableOpacity style={[styles.buttonnext]} onPress={() => this.nextState()}>
              <Text style={styles.textButtonNext}>
                Lanjutkan
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        {this.modalCategory1()}
        {this.modalCategory2()}
        {this.modalCategory3()}
        {this.modalCategory4()}
        {this.modalBrand()}
        {spinner}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    category1: state.category,
    category2: state.subCategory,
    category3: state.subCategory2,
    category4: state.subCategory3,
    brands: state.brands
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBrand: (id) => dispatch(brandAction.getBrand()),
    getCatalog: () => dispatch(katalogAction.getListCatalog()),
    getCategory1: () => dispatch(categoriAction.categoryList()),
    getCategory2: (id) => dispatch(categoriAction.subCategory({id: id})),
    getCategory3: (id) => dispatch(categoriAction.subCategory2({id: id})),
    getCategory4: (id) => dispatch(categoriAction.subCategory3({id: id}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductInfoNameAndCategory)
