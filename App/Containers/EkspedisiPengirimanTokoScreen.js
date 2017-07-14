import React from 'react'
import { View, ScrollView, Text, Image, ListView, TouchableOpacity } from 'react-native'
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
      ekspedisi: this.props.dataStore,
      storesTemp: this.props.storeSingle
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
      nextProps.dataServicesExpedition.expeditions.map((data, i) => (
        dataTemp.push({'expedition_service_id': data.id, 'status': 0, 'parent': data.expedition_id})
      ))
      nextProps.dataServicesExpedition.expeditions.map((data, i) => (
        dataTempSec.push({'expedition_service_id': data.id, 'status': 0})
      ))
      this.setState({
        filterPengiriman: dataTemp,
        expeditionServices: dataTempSec
      })
    }
  }

  componentDidMount () {
    this.props.getExpedition()
    this.props.getServicesExpedition()
  }

  nextState () {
    const {expeditionServices, ekspedisi, storesTemp} = this.state
    ekspedisi[1] = expeditionServices
    NavigationActions.infopemilik({
      type: ActionConst.PUSH,
      dataEkspedisi: ekspedisi,
      storesTemp: storesTemp
    })
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

  mapParent () {
    const { dataListEkspedisi } = this.state
    const mapparent = dataListEkspedisi.map((dataListEkspedisi, i) =>
    (<View>
      <View style={styles.containerSinge}>
        <TouchableOpacity>
          <View key={i} style={styles.containerEkspedisi}>
            <View style={styles.box}>
              <Image
                source={null}
                style={styles.gambarCentangBox}
              />
            </View>
            <Text style={[styles.title]}>Pilih Semua</Text>
            <Text style={[styles.name, { marginRight: 15, fontFamily: Fonts.type.bold }]}>{dataListEkspedisi.name}</Text>
            <Image source={{uri: dataListEkspedisi.logo}} resizeMode={'contain'} style={{height: 20, width: 53.4}} />
          </View>
        </TouchableOpacity>
        {this.mapChild(dataListEkspedisi.services, i, 0)}
      </View>
      <View style={styles.separator} />
    </View>
    ))
    return (
      <View>
        {mapparent}
      </View>
    )
  }

  onClickPengiriman = (selected, parentId) => (e) => {
    const {dataListEkspedisi, filterPengiriman, expeditionServices} = this.state
    let dummy = filterPengiriman
    let temp = expeditionServices

    if (dataListEkspedisi[parentId].services[selected].is_checked) {
      var i = dummy.indexOf(dataListEkspedisi[parentId].services[selected].id)
      if (i !== -1) {
        dummy[selected].status = 0
        temp[selected].status = 0
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

  renderStateTwo () {
    return (
      <View>
        <View style={styles.titleEkspedisi}>
          <Text style={styles.textTitle}>Pilihlah ekspedisi pengiriman yang digunakan oleh toko Anda untuk mengirim barang</Text>
        </View>
        <ScrollView style={{marginBottom: 100}}>
          {this.mapParent()}
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
