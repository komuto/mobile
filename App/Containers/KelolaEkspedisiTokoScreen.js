import React from 'react'
import { View, ScrollView, Text, Image, ListView, TouchableOpacity, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import * as expeditionAction from '../actions/expedition'

import { Images, Fonts } from '../Themes'

import styles from './Styles/EkspedisiPengirimanTokoScreenStyle'

class KelolaEkspedisiTokoScreen extends React.Component {

  constructor (props) {
    super(props)
    this.dataSourcePengiriman = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      dataListExpedition: [],
      filterExpedition: [],
      expeditionServices: [],
      dataStore: [],
      loading: true
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataExpeditions.status === 200) {
      this.setState({
        dataListExpedition: nextProps.dataExpeditions.manageExpeditions,
        loading: false
      })
      let dataTemp = []
      let dataTempSec = []
      nextProps.dataExpeditions.manageExpeditions.map((data, i) => (
        data.services.map((data, i) => {
          if (data.is_active) {
            data.is_checked = true
          }
          dataTemp.push(data)
        }
        )
      ))
      dataTemp.map((data, i) => {
        if (data.is_active) {
          dataTempSec.push({'expedition_service_id': data.id, 'status': 1, 'parent': data.expedition.id})
        } else {
          dataTempSec.push({'expedition_service_id': data.id, 'status': 0, 'parent': data.expedition.id})
        }
      })
      this.setState({
        filterExpedition: dataTempSec,
        expeditionServices: dataTempSec
      })
    } if (nextProps.dataUpdate.status === 200) {
      this.setState({
        loading: false
      })
    } if (nextProps.dataUpdate.status > 200) {
      this.setState({
        loading: true
      })
    } if (nextProps.dataExpeditions.status > 200) {
      this.setState({
        loading: true
      })
    }
  }

  componentDidMount () {
    this.props.getExpedition()
  }

  nextState () {
    const {expeditionServices} = this.state
    this.setState({
      loading: true
    })
    this.props.updateExpedition(expeditionServices)
  }

  checkParent (title) {
  }

  mapParent (a) {
    const { dataListExpedition } = this.state
    const mapparent = dataListExpedition.map((data, i) => {
      const img = dataListExpedition[i].is_checked ? Images.centang : null
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

  mapChild (data, parentindex) {
    const mapChild = data.map((dataService, i) => {
      this.check = data[i].is_checked ? Images.centang : null
      return (
        <TouchableOpacity key={i} onPress={this.onClickPengiriman(parentindex, i, dataService.id)}>
          <View style={styles.childEkspedisi}>
            <View style={styles.box}>
              <Image
                source={this.check}
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

  onClickPengiriman = (parentIndex, childIndex, parents) => (e) => {
    const {dataListExpedition, filterExpedition} = this.state
    if (dataListExpedition[parentIndex].services[childIndex].is_checked) {
      filterExpedition.filter(function (data) {
        if (data.expedition_service_id === parents) {
          console.log('in1')
          data.status = 0
        }
      })
      dataListExpedition[parentIndex].services[childIndex].is_checked = false
      const newDataSource = dataListExpedition.map(data => {
        return {...data}
      })
      this.setState({
        dataListExpedition: newDataSource,
        expeditionServices: filterExpedition
      })
    } else {
      filterExpedition.filter(function (data) {
        if (data.expedition_service_id === parents) {
          console.log('in')
          data.status = 1
        }
      })
      dataListExpedition[parentIndex].services[childIndex].is_checked = true
      const newDataSource = dataListExpedition.map(data => {
        return {...data}
      })
      this.setState({
        dataListExpedition: newDataSource,
        expeditionServices: filterExpedition
      })
    }
  }

  onClickPengiriman2 = (selected, i, parentId) => (e) => {
    const {dataListExpedition, filterExpedition} = this.state
    if (dataListExpedition[i].id === parentId) {
      if (dataListExpedition[i].is_checked === false) {
        dataListExpedition[i].is_checked = true
      } else {
        dataListExpedition[i].is_checked = false
      }
      dataListExpedition[i].services.filter(function (data) {
        if (data.is_checked === false) {
          data.is_checked = true
        } else {
          data.is_checked = false
        }
      })
      this.setState({dataListExpedition: dataListExpedition})
      filterExpedition.filter(function (data) {
        if (data.parent === parentId) {
          if (data.status === 0) {
            data.status = 1
          } else {
            data.status = 0
          }
        }
      })
      this.setState({expeditionServices: filterExpedition})
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
    const spinner = this.state.loading
    ? (<View style={styles.spinner}>
      <ActivityIndicator color='white' size='large' />
    </View>) : (<View />)
    return (
      <View style={styles.container}>
        {this.renderStateTwo()}
        {spinner}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataExpeditions: state.manageExpeditions,
    dataUpdate: state.updateExpedition
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getExpedition: () => dispatch(expeditionAction.manageStoreExpeditions()),
    updateExpedition: (data) => dispatch(expeditionAction.updateExpedition({data}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KelolaEkspedisiTokoScreen)
