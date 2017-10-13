import React from 'react'
import { View, ScrollView, Text, Image, ListView, TouchableOpacity, ActivityIndicator, ToastAndroid } from 'react-native'
import { connect } from 'react-redux'
import * as productAction from '../actions/product'
import { Actions as NavigationActions } from 'react-native-router-flux'

import { Images, Fonts } from '../Themes'

// Styles
import styles from './Styles/EditProductExpeditionStyle'

class EditProductExpedition extends React.Component {

  constructor (props) {
    super(props)
    this.dataSourcePengiriman = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      id: this.props.id,
      imageProduct: this.props.dataDetailProduct.storeProductDetail.images[0].file,
      namaProduk: this.props.dataDetailProduct.storeProductDetail.product.name,
      dataListEkspedisi: [],
      dataStore: this.props.dataStore,
      loading: false,
      dataProduk: this.props.dataProduk,
      image: this.props.image,
      callback: this.props.callback
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataProductExpedition.status === 200) {
      this.setState({
        dataListEkspedisi: nextProps.dataProductExpedition.productExpeditions,
        loading: false
      })
    }
    if (nextProps.dataUpdateData.status === 200) {
      nextProps.dataUpdateData.status = 0
      NavigationActions.pop({ refresh: { callback: !this.state.callback } })
      ToastAndroid.show('Produk berhasil diubah...!!', ToastAndroid.LONG)
    } else if (nextProps.dataUpdateData.status > 200) {
      nextProps.dataUpdateData.status = 0
      ToastAndroid.show('Terjadi kesalahan.. ' + nextProps.dataUpdateData.message, ToastAndroid.LONG)
    }
  }

  componentDidMount () {
    this.props.getProductExpedition(this.state.id)
  }

  save () {
    const { id, dataListEkspedisi } = this.state
    var expedition = []
    dataListEkspedisi.map((data, i) => {
      data.services.map((datas, j) => {
        if (datas.is_active) {
          expedition.push({'expedition_service_id': datas.id, status: 1})
        } else {
          expedition.push({'expedition_service_id': datas.id, status: 2})
        }
        return expedition
      })
    })

    this.props.updateData(id, expedition)
  }

  mapParent (expedition) {
    const mapparent = expedition.map((data, i) => {
      const img = expedition[i].is_active ? Images.centangBiru : null
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

    if (dataListEkspedisi[i].is_active) {
      dataListEkspedisi[i].is_active = false
      dataListEkspedisi[i].services.map((data, i) => {
        data.is_active = false
      })
    } else {
      dataListEkspedisi[i].is_active = true
      dataListEkspedisi[i].services.map((data, i) => {
        data.is_active = true
      })
    }

    this.setState({...dataListEkspedisi})
  }

  mapChild (services, parentId) {
    const mapChild = services.map((data, i) => {
      this.centang = services[i].is_active ? Images.centangBiru : null
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

    if (dataChild[selected].is_active) {
      dataChild[selected].is_active = false
      this.setState({
        ...dataListEkspedisi
      })
    } else {
      dataChild[selected].is_active = true
      this.setState({
        ...dataListEkspedisi
      })
    }

    var count = 0
    dataChild.map((data, i) => {
      if (data.is_active) {
        count++
      }
    })

    if (count === length) {
      dataListEkspedisi[parentId].is_active = true
    } else {
      dataListEkspedisi[parentId].is_active = false
    }
  }

  renderStateTwo () {
    return (
      <ScrollView>
        <View style={styles.titleEkspedisi}>
          <Text style={styles.textTitle}>Pilihlah ekspedisi pengiriman yang digunakan oleh toko Anda untuk mengirim barang</Text>
        </View>
        <View>
          {this.mapParent(this.state.dataListEkspedisi)}
          <View>
            <TouchableOpacity style={[styles.buttonnext]} onPress={() => this.save()}>
              <Text style={styles.textButtonNext}>
                Simpan Perubahan
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
          <Image source={{ uri: this.state.imageProduct }} style={styles.imageProduct} />
          <Text style={styles.textProduct}>
            {this.state.namaProduk}
          </Text>
        </View>
        {this.renderStateTwo()}
        {spinner}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataProductExpedition: state.productExpeditions,
    dataUpdateData: state.alterProducts,
    dataDetailProduct: state.storeProductDetail
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProductExpedition: (id) => dispatch(productAction.getProductExpeditions({id: id})),
    updateData: (id, expeditions) => dispatch(productAction.updateProduct({id: id, expeditions: expeditions}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProductExpedition)
