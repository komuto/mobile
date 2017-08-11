import React from 'react'
import { View, ScrollView, Text, Image, ListView, TouchableOpacity, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import * as expeditionAction from '../actions/expedition'

import { Images, Colors, Fonts } from '../Themes'

import styles from './Styles/EkspedisiPengirimanTokoScreenStyle'

class EkspedisiPengirimanTokoScreenScreen extends React.Component {

  constructor (props) {
    super(props)
    this.dataSourcePengiriman = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      dataListEkspedisi: [],
      filterPengiriman: [],
      expeditionServices: [],
      dataStore: this.props.dataStore,
      loading: true,
      imageCentang: false,
      idTerpilih: ''
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
        dataTemp.push({'expedition_service_id': data.id, 'status': 0, 'parent': data.expedition_id})
      ))
      nextProps.dataServicesExpedition.expeditionServices.map((data, i) => (
        dataTempSec.push({'expedition_service_id': data.id, 'status': 0, 'parent': data.expedition_id})
      ))
      this.setState({
        filterPengiriman: dataTemp,
        expeditionServices: dataTempSec
      })
    } if (nextProps.dataServicesExpedition.status && nextProps.dataServicesExpedition.status === 200) {
      this.setState({
        loading: false
      })
    }
  }

  componentDidMount () {
    this.props.getExpedition()
    this.props.getServicesExpedition()
  }

  nextState () {
    const {expeditionServices, dataStore} = this.state
    dataStore[1] = expeditionServices
    NavigationActions.infopemilik({
      type: ActionConst.PUSH,
      dataStore: dataStore
    })
    console.log(dataStore)
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
        <TouchableOpacity key={i} onPress={this.onClickPengiriman(i, parentId)}>
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

  onClickPengiriman = (selected, parentId) => (e) => {
    const {dataListEkspedisi, filterPengiriman, expeditionServices} = this.state
    let dummy = filterPengiriman
    let temp = expeditionServices

    if (dataListEkspedisi[parentId].services[selected].is_checked) {
      var i = dummy.indexOf(dataListEkspedisi[parentId].services[selected].id)
      if (i !== 0) {
        dummy[selected].status = 0
        temp[selected].status = 0
        console.log('masuk')
      }
      dataListEkspedisi[parentId].services[selected].is_checked = false
      const newDataSource = dataListEkspedisi.map(data => {
        return {...data}
      })
      this.setState({
        dataListEkspedisi: newDataSource,
        filterPengiriman: dummy,
        expeditionServices: temp
      })
    } else {
      dummy[selected].status = 1
      temp[selected].status = 1
      dataListEkspedisi[parentId].services[selected].is_checked = true
      const newDataSource = dataListEkspedisi.map(data => {
        return {...data}
      })
      this.setState({
        dataListEkspedisi: newDataSource,
        filterPengiriman: dummy,
        expeditionServices: temp
      })
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
        if (data.is_checked === false) {
          data.is_checked = true
        } else {
          data.is_checked = false
        }
      })
      this.setState({dataListEkspedisi: dataListEkspedisi})
      filterPengiriman.filter(function (data) {
        if (data.parent === parentId) {
          console.log('in')
          if (data.status === 0) {
            data.status = 1
          } else {
            data.status = 0
          }
        } else {
          data.status = 0
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
      <View>
        <View style={styles.titleEkspedisi}>
          <Text style={styles.textTitle}>Pilihlah ekspedisi pengiriman yang digunakan oleh toko Anda untuk mengirim barang</Text>
        </View>
        <ScrollView style={{marginBottom: 100}}>
          {this.mapParent(a)}
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
    console.log(this.state.expeditionServices)
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
          <View style={styles.state}>
            <Text style={styles.textState}>3</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.state}>
            <Text style={styles.textState}>4</Text>
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
    dataEkspedisiList: state.expeditions,
    dataServicesExpedition: state.expeditionServices
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getExpedition: () => dispatch(expeditionAction.getExpedition()),
    getServicesExpedition: () => dispatch(expeditionAction.getServices())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EkspedisiPengirimanTokoScreenScreen)
