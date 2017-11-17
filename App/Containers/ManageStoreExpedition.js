import React from 'react'
import {
  View,
  ScrollView,
  Text,
  Image,
  ToastAndroid,
  ListView,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import { connect } from 'react-redux'
// import Reactotron from 'reactotron-react-native'

import * as expeditionAction from '../actions/expedition'

import { Images, Fonts } from '../Themes'

import styles from './Styles/EkspedisiPengirimanTokoScreenStyle'

class ManageStoreExpedition extends React.Component {

  constructor (props) {
    super(props)
    this.dataSourcePengiriman = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.submitting = {
      update: false
    }
    this.state = {
      dataListExpedition: [],
      filterExpedition: [],
      expeditionServices: [],
      dataStore: [],
      loading: true
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataManageExpedition.status === 200) {
      this.setState({
        dataListExpedition: nextProps.dataManageExpedition.manageExpeditions,
        loading: false
      })
    } if (nextProps.dataUpdate.status === 200 && this.submitting.update) {
      this.submitting = { ...this.submitting, update: false }
      this.setState({ loading: false })
      ToastAndroid.show(nextProps.dataUpdate.message, ToastAndroid.SHORT)
    } if (nextProps.dataUpdate.status > 200 && this.submitting.update) {
      this.setState({ loading: false })
      ToastAndroid.show(nextProps.dataUpdate.message, ToastAndroid.SHORT)
    } if (nextProps.dataManageExpedition.status > 200) {
      this.setState({ loading: true })
    }
  }

  componentDidMount () {
    this.props.getExpedition()
  }

  nextState () {
    const {dataListExpedition} = this.state
    this.setState({loading: true})
    this.submitting.update = true
    var temp = []
    dataListExpedition.map((data, i) => {
      data.services.map((datas, j) => {
        if (datas.is_active) {
          temp.push({'expedition_service_id': datas.id, 'status': 1})
        } else {
          temp.push({'expedition_service_id': datas.id, 'status': 2})
        }
        return temp
      })
    })

    this.props.updateExpedition(temp)
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
    const { dataListExpedition } = this.state

    if (dataListExpedition[i].is_active) {
      dataListExpedition[i].is_active = false
      dataListExpedition[i].services.map((data, i) => {
        data.is_active = false
      })
    } else {
      dataListExpedition[i].is_active = true
      dataListExpedition[i].services.map((data, i) => {
        data.is_active = true
      })
    }

    this.setState({...dataListExpedition})
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
    const { dataListExpedition } = this.state

    if (dataChild[selected].is_active) {
      dataChild[selected].is_active = false
      this.setState({
        ...dataListExpedition
      })
    } else {
      dataChild[selected].is_active = true
      this.setState({
        ...dataListExpedition
      })
    }

    var count = 0
    dataChild.map((data, i) => {
      if (data.is_active) {
        count++
      }
    })

    if (count === length) {
      dataListExpedition[parentId].is_active = true
    } else {
      dataListExpedition[parentId].is_active = false
    }
  }

  renderStateTwo () {
    return (
      <View>
        <View style={styles.titleEkspedisi}>
          <Text style={styles.textTitle}>Pilihlah ekspedisi pengiriman yang digunakan oleh toko Anda untuk mengirim barang</Text>
        </View>
        <ScrollView style={{marginBottom: 90}}>
          {this.mapParent(this.state.dataListExpedition)}
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
    dataManageExpedition: state.manageExpeditions,
    dataUpdate: state.updateExpedition
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getExpedition: () => dispatch(expeditionAction.manageStoreExpeditions()),
    updateExpedition: (data) => dispatch(expeditionAction.updateExpedition({data}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageStoreExpedition)
