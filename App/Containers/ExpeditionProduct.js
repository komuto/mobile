import React from 'react'
import { View, ScrollView, ToastAndroid, Text, Image, ListView, TouchableOpacity, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import Reactotron from 'reactotron-react-native'
import {isFetching, isError, isFound} from '../Services/Status'

import * as expeditionAction from '../actions/expedition'
import * as productAction from '../actions/product'
import * as storeAction from '../actions/stores'

import { Images, Colors, Fonts } from '../Themes'

// Styles
import styles from './Styles/EkspedisiPengirimanProdukScreenStyle'

class ExpeditionProduct extends React.Component {

  constructor (props) {
    super(props)
    this.dataSourcePengiriman = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.submitting = {
      upload: false,
      expedition: false,
      create: false
    }
    this.state = {
      dataListEkspedisi: [],
      activeExpedition: [],
      dataStore: this.props.dataStore || null,
      loading: false,
      dataProduk: this.props.dataProduk || null,
      image: this.props.images || null
    }
  }

  componentWillReceiveProps (nextProps) {
    const {dataPhoto, dataStoreExpedition, dataCreateProduk} = nextProps

    if (!isFetching(dataStoreExpedition) && this.submitting.expedition) {
      this.submitting = { ...this.submitting, expedition: false }
      if (isError(dataStoreExpedition)) {
        ToastAndroid.show(dataStoreExpedition.message, ToastAndroid.SHORT)
        this.setState({ loading: false })
      }
      if (isFound(dataStoreExpedition)) {
        this.setState({
          dataListEkspedisi: dataStoreExpedition.storeExpeditions,
          loading: false
        })
      }
    }

    if (!isFetching(dataCreateProduk) && this.submitting.create) {
      this.submitting = { ...this.submitting, create: false }
      if (isError(dataCreateProduk)) {
        ToastAndroid.show(dataCreateProduk.message, ToastAndroid.SHORT)
        this.setState({ loading: false })
      }
      if (isFound(dataCreateProduk)) {
        this.setState({
          loading: false
        })
        NavigationActions.notification({
          type: ActionConst.PUSH,
          tipeNotikasi: 'succestambahproduk',
          hideNavBar: true,
          hideBackImage: true
        })
      }
    }

    if (!isFetching(dataPhoto) && this.submitting.upload) {
      this.submitting = { ...this.submitting, upload: false }
      if (isError(dataPhoto)) {
        ToastAndroid.show(dataPhoto.message, ToastAndroid.SHORT)
        this.setState({ loading: false })
      }
      if (isFound(dataPhoto)) {
        let temp = []
        dataPhoto.payload.images.map((data, i) => {
          temp[i] = ({'name': data.name})
        })
        if (!this.submitting.create) {
          this.submitting = {
            ...this.submitting,
            create: true
          }
          this.createProducts(temp)
          this.setState({ true: false })
        }
      }
    }
  }

  componentDidMount () {
    if (!this.submitting.expedition) {
      this.submitting = {
        ...this.submitting,
        expedition: true
      }
      this.props.getStoreExpedition()
    }
  }

  nextState () {
    const {dataListEkspedisi, image} = this.state
    Reactotron.log(image)
    var expedition = []
    dataListEkspedisi.map((data, i) => {
      data.services.map((datas, j) => {
        if (datas.is_checked) {
          expedition.push({'expedition_service_id': datas.id})
        }
        return expedition
      })
    })

    if (expedition.length === 0) {
      ToastAndroid.show('Pilih ekspedisi terlebih dahulu', ToastAndroid.SHORT)
    } else {
      this.setState({loading: true, activeExpedition: expedition})
      const postData = new FormData()
      image.map(data => {
        postData.append('images', { uri: data, type: 'image/jpg', name: 'image.jpg' })
      })
      postData.append('type', 'product')
      this.props.photoUpload(postData)
      this.submitting.upload = true
    }
  }

  createProducts (imageParam) {
    const {activeExpedition, dataProduk} = this.state
    dataProduk[15] = activeExpedition
    dataProduk[16] = imageParam
    this.props.createProduk(
      dataProduk[0],
      dataProduk[1],
      dataProduk[2],
      dataProduk[3],
      dataProduk[4],
      dataProduk[5],
      dataProduk[6],
      dataProduk[7],
      dataProduk[8],
      dataProduk[9],
      dataProduk[10],
      dataProduk[11],
      dataProduk[12],
      dataProduk[13],
      dataProduk[14],
      dataProduk[15],
      dataProduk[16]
    )
  }

  mapParent (expedition) {
    const mapparent = expedition.map((data, i) => {
      const img = expedition[i].is_checked ? Images.centangBiru : null
      return (
        <View key={i} >
          <View style={styles.containerSinge}>
            <TouchableOpacity onPress={this.onClickAll(i, i, data.id)}>
              <View style={styles.containerEkspedisi}>
                <View style={styles.box}>
                  <Image
                    source={img}
                    style={styles.gambarCentangBox}
                  />
                </View>
                <Text style={[styles.title]}>Pilih Semua</Text>
                <Text style={[styles.name, { marginRight: 15, fontFamily: Fonts.type.bold }]}>{data.name}</Text>
                <Image source={{uri: data.logo}} resizeMode={'contain'} style={{height: 20, width: 53.4}} />
              </View>
            </TouchableOpacity>
            {this.mapChild(data.services, i)}
          </View>
          <View style={styles.separator} />
        </View>
      )
    })
    return (
      <View>
        {mapparent}
      </View>
    )
  }

  onClickAll = (selected, i, parentId) => (e) => {
    const { dataListEkspedisi } = this.state

    if (dataListEkspedisi[i].is_checked) {
      dataListEkspedisi[i].is_checked = false
      dataListEkspedisi[i].services.map((data, i) => {
        data.is_checked = false
      })
    } else {
      dataListEkspedisi[i].is_checked = true
      dataListEkspedisi[i].services.map((data, i) => {
        data.is_checked = true
      })
    }

    this.setState({...dataListEkspedisi})
  }

  mapChild (services, parentId) {
    const mapChild = services.map((data, i) => {
      this.centang = services[i].is_checked ? Images.centangBiru : null
      return (
        <TouchableOpacity key={i} onPress={this.onClickSingle(i, parentId, services.length, services)}>
          <View style={styles.childEkspedisi}>
            <View style={styles.box}>
              <Image
                source={this.centang}
                style={styles.gambarCentangBox}
              />
            </View>
            <Text style={[styles.title]}>{data.name}</Text>
          </View>
        </TouchableOpacity>
      )
    })
    return (
      <View>
        {mapChild}
      </View>
    )
  }

  onClickSingle = (selected, parentId, length, dataChild) => (e) => {
    const { dataListEkspedisi } = this.state

    if (dataChild[selected].is_checked) {
      dataChild[selected].is_checked = false
      this.setState({
        ...dataListEkspedisi
      })
    } else {
      dataChild[selected].is_checked = true
      this.setState({
        ...dataListEkspedisi
      })
    }

    var count = 0
    dataChild.map((data, i) => {
      if (data.is_checked) {
        count++
      }
    })

    if (count === length) {
      dataListEkspedisi[parentId].is_checked = true
    } else {
      dataListEkspedisi[parentId].is_checked = false
    }
  }

  renderStateTwo () {
    return (
      <View>
        <View style={styles.titleEkspedisi}>
          <Text style={styles.textTitle}>Pilihlah ekspedisi pengiriman yang digunakan oleh toko Anda untuk mengirim barang</Text>
        </View>
        <ScrollView style={{marginBottom: 100}}>
          {this.mapParent(this.state.dataListEkspedisi)}
          <View style={{ flex: 1 }}>
            <TouchableOpacity style={[styles.buttonnext]} onPress={() => this.nextState()}>
              <Text style={styles.textButtonNext}>
                Lanjutkan
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
        <View style={styles.header}>
          <View style={[styles.state, {borderColor: Colors.background, backgroundColor: Colors.red}]}>
            <Text style={[styles.textState, {color: Colors.background}]}>1</Text>
          </View>
          <View style={styles.line} />
          <View style={[styles.state, {borderColor: Colors.background, backgroundColor: Colors.red}]}>
            <Text style={[styles.textState, {color: Colors.background}]}>2</Text>
          </View>
          <View style={styles.line} />
          <View style={[styles.state, {borderColor: Colors.background, backgroundColor: Colors.red}]}>
            <Text style={[styles.textState, {color: Colors.background}]}>3</Text>
          </View>
          <View style={styles.line} />
          <View style={[styles.state, {borderColor: Colors.background, backgroundColor: Colors.red}]}>
            <Text style={[styles.textState, {color: Colors.background}]}>4</Text>
          </View>
        </View>
        {this.renderStateTwo()}
        {spinner}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataStoreExpedition: state.storeExpeditions,
    dataCreateProduk: state.alterProducts,
    dataPhoto: state.upload
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    photoUpload: (data) => dispatch(storeAction.photoUpload({data: data})),
    getStoreExpedition: () => dispatch(expeditionAction.getStoreExpeditions()),
    createProduk: (name, categoriId, brandId, desc, price, weight, stock, condition, insurance, isDropship, catalogId, status, discount, isWholesale, wholesales, expeditions, images) =>
    dispatch(productAction.createProduct(
      {
        name: name,
        category_id: categoriId,
        brand_id: brandId,
        description: desc,
        price: price,
        weight: weight,
        stock: stock,
        condition: condition,
        is_insurance: insurance,
        is_dropship: isDropship,
        catalog_id: catalogId,
        status: status,
        discount: discount,
        is_wholesaler: isWholesale,
        wholesales: wholesales,
        expeditions: expeditions,
        images: images
      }
    ))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpeditionProduct)
