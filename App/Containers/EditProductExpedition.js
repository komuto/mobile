import React from 'react'
import { View, ScrollView, Text, Image, ListView, TouchableOpacity, ActivityIndicator, ToastAndroid } from 'react-native'
import { connect } from 'react-redux'
import * as expeditionAction from '../actions/expedition'
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
      filterPengiriman: [],
      expeditionServices: [],
      dataStore: this.props.dataStore,
      loading: false,
      imageCentang: false,
      idTerpilih: '',
      dataProduk: this.props.dataProduk,
      image: this.props.image,
      callback: this.props.callback
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataEkspedisiList.status === 200) {
      this.setState({
        dataListEkspedisi: nextProps.dataEkspedisiList.expeditions
      })
    } if (nextProps.dataServicesExpedition.status === 200) {
      let dataTemp = []
      let dataTempSec = []
      nextProps.dataServicesExpedition.expeditionServices.map((data, i) => (
        dataTemp.push({'expedition_service_id': data.id, 'status': 2, 'parent': data.expedition_id})
      ))
      nextProps.dataServicesExpedition.expeditionServices.map((data, i) => (
        dataTempSec.push({'expedition_service_id': data.id, 'status': 2, 'parent': data.expedition_id})
      ))
      this.setState({
        filterPengiriman: dataTemp,
        expeditionServices: dataTempSec
      })
    } if (nextProps.dataServicesExpedition.status && nextProps.dataEkspedisiList.status === 200) {
      this.setState({
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
    this.props.getExpedition()
    this.props.getServicesExpedition()
  }

  save () {
    const { id, expeditionServices } = this.state
    console.log(expeditionServices)
    this.props.updateData(id, expeditionServices)
  }

  checkParent (title) {
  }

  mapParent (a) {
    const { dataListEkspedisi } = this.state
    const mapparent = dataListEkspedisi.map((data, i) => {
      const img = dataListEkspedisi[i].is_checked ? Images.centang : null
      return (
        <View key={i} >
          <View style={styles.containerSinge}>
            <TouchableOpacity onPress={this.onClickPengiriman2(i, i, data.id)}>
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

  mapChild (services, parentId) {
    const mapChild = services.map((dataService, i) => {
      this.centang = services[i].is_checked ? Images.centang : null
      return (
        <TouchableOpacity key={i} onPress={this.onClickPengiriman(i, parentId, dataService.id)}>
          <View style={styles.childEkspedisi}>
            <View style={styles.box}>
              <Image
                source={this.centang}
                style={styles.gambarCentangBox}
              />
            </View>
            <Text style={[styles.title]}>{dataService.name}</Text>
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

  onClickPengiriman = (selected, parentId, id) => (e) => {
    console.log(id)
    const {dataListEkspedisi, filterPengiriman, expeditionServices} = this.state
    let dummy = filterPengiriman
    let temp = expeditionServices

    if (dataListEkspedisi[parentId].services[selected].is_checked) {
      var i = dummy.indexOf(dataListEkspedisi[parentId].services[selected].id)
      if (i !== 0) {
        var k, j
        for (k = 0; k < this.state.expeditionServices.length; k++) {
          console.log('olala', dummy[selected].expedition_service_id)
          if (this.state.expeditionServices[k].expedition_service_id === id) {
            dummy[k].status = 2
            temp[k].status = 2
            for (j = 0; j < dataListEkspedisi.length; j++) {
              if (this.state.expeditionServices[k].parent === dataListEkspedisi[j].id) {
                dataListEkspedisi[j].is_checked = false
                dataListEkspedisi[parentId].services[selected].is_checked = false
              }
            }
            break
          }
        }
      }
      const newDataSource = dataListEkspedisi.map(data => {
        return {...data}
      })
      this.setState({
        dataListEkspedisi: newDataSource,
        filterPengiriman: dummy,
        expeditionServices: temp
      })
      console.log('expeditionServices False', this.state.expeditionServices)
    } else {
      for (k = 0; k < this.state.expeditionServices.length; k++) {
        console.log('olala', dummy[selected].expedition_service_id)
        if (this.state.expeditionServices[k].expedition_service_id === id) {
          dummy[k].status = 1
          temp[k].status = 1
          break
        }
      }
      dataListEkspedisi[parentId].services[selected].is_checked = true
      const newDataSource = dataListEkspedisi.map(data => {
        return {...data}
      })
      this.setState({
        dataListEkspedisi: newDataSource,
        filterPengiriman: dummy,
        expeditionServices: temp
      })
      console.log('expeditionServices true', this.state.expeditionServices)
    }
  }

  onClickPengiriman2 = (selected, i, parentId) => (e) => {
    this.setState({imageCentang: true})
    const {dataListEkspedisi, filterPengiriman} = this.state
    if (dataListEkspedisi[i].id === parentId) {
      if (dataListEkspedisi[i].is_checked === false) {
        dataListEkspedisi[i].is_checked = true
      } else {
        dataListEkspedisi[i].is_checked = false
      }
      dataListEkspedisi[i].services.filter(function (data) {
        if (dataListEkspedisi[i].is_checked) {
          data.is_checked = true
        } else {
          data.is_checked = false
        }
      })
      this.setState({dataListEkspedisi: dataListEkspedisi})
      filterPengiriman.filter(function (data) {
        if (data.parent === parentId) {
          console.log('in')
          if (dataListEkspedisi[i].is_checked) {
            data.status = 1
          } else {
            data.status = 2
          }
        } else {
          data.status = 2
        }
      })
      this.setState({expeditionServices: filterPengiriman})
    } else {
      window.alert('Internal Error')
    }
  }

  renderStateTwo () {
    let a = 0
    return (
      <ScrollView>
        <View style={styles.titleEkspedisi}>
          <Text style={styles.textTitle}>Pilihlah ekspedisi pengiriman yang digunakan oleh toko Anda untuk mengirim barang</Text>
        </View>
        <View>
          {this.mapParent(a)}
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
    dataEkspedisiList: state.expeditions,
    dataServicesExpedition: state.expeditionServices,
    dataCreateProduk: state.alterProducts,
    dataUpdateData: state.alterProducts,
    dataDetailProduct: state.storeProductDetail
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getExpedition: () => dispatch(expeditionAction.getExpedition()),
    getServicesExpedition: () => dispatch(expeditionAction.getServices()),
    createProduk: (name, categoriId, brandId, desc, price, weight, stock, condition, insurance, isDropship, catalogId, expeditions, images) =>
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
        expeditions: expeditions,
        images: images
      }
    )),
    updateData: (id, expeditions) => dispatch(productAction.updateProduct({id: id, expeditions: expeditions}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProductExpedition)
