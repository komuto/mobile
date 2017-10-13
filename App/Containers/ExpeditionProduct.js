import React from 'react'
import { View, ScrollView, ToastAndroid, Text, Image, ListView, TouchableOpacity, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
// import Reactotron from 'reactotron-react-native'

import * as expeditionAction from '../actions/expedition'
import * as productAction from '../actions/product'

import { Images, Colors, Fonts } from '../Themes'

// Styles
import styles from './Styles/EkspedisiPengirimanProdukScreenStyle'

class ExpeditionProduct extends React.Component {

  constructor (props) {
    super(props)
    this.dataSourcePengiriman = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      dataListEkspedisi: [],
      dataStore: this.props.dataStore || null,
      loading: false,
      dataProduk: this.props.dataProduk || null,
      image: this.props.image || null
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataStoreExpedition.status === 200) {
      this.setState({
        dataListEkspedisi: nextProps.dataStoreExpedition.storeExpeditions,
        loading: false
      })
    } if (nextProps.dataCreateProduk.status === 200) {
      this.setState({
        loading: false
      })
      NavigationActions.notification({
        type: ActionConst.PUSH,
        tipeNotikasi: 'succestambahproduk',
        hideNavBar: true,
        hideBackImage: true
      })
      nextProps.dataCreateProduk.status = 0
    } if (nextProps.dataCreateProduk.status > 200) {
      this.setState({
        loading: false
      })
      ToastAndroid.show('Terjadi Kesalahan..', ToastAndroid.LONG)
    }
  }

  componentDidMount () {
    this.props.getStoreExpedition()
  }

  nextState () {
    const {dataListEkspedisi, image, dataProduk} = this.state
    this.setState({
      loading: true
    })
    var expedition = []
    dataListEkspedisi.map((data, i) => {
      data.services.map((datas, j) => {
        if (datas.is_checked) {
          expedition.push({'expedition_service_id': datas.id})
        }
        return expedition
      })
    })

    dataProduk[15] = expedition
    dataProduk[16] = image
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
    dataCreateProduk: state.alterProducts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
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
