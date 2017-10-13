import React from 'react'
import { View, ScrollView, Text, Image, ListView, TouchableOpacity, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import * as expeditionAction from '../actions/expedition'
// import Reactotron from 'reactotron-react-native'

import { Images, Colors, Fonts } from '../Themes'

import styles from './Styles/EkspedisiPengirimanTokoScreenStyle'

class StoreExpedition extends React.Component {

  constructor (props) {
    super(props)
    this.dataSourcePengiriman = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      dataListEkspedisi: [],
      dataStore: this.props.dataStore || null,
      loading: true
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataEkspedisiList.status === 200) {
      this.setState({
        dataListEkspedisi: nextProps.dataEkspedisiList.expeditions,
        loading: false
      })
    }
  }

  componentDidMount () {
    this.props.getExpedition()
  }

  nextState () {
    const {dataListEkspedisi, dataStore} = this.state
    var temp = []
    dataListEkspedisi.map((data, i) => {
      data.services.map((datas, j) => {
        if (datas.is_checked) {
          temp.push({'expedition_service_id': datas.id, 'status': datas.status})
        }
        return temp
      })
    })

    dataStore[1] = temp
    NavigationActions.infostoreowner({
      type: ActionConst.PUSH,
      dataStore: dataStore
    })
  }

  checkParent (title) {
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
        {this.mapParent(this.state.dataListEkspedisi)}
        <TouchableOpacity style={[styles.buttonnext]} onPress={() => this.nextState()}>
          <Text style={styles.textButtonNext}>
            Lanjutkan
          </Text>
        </TouchableOpacity>
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
          <View style={styles.state}>
            <Text style={styles.textState}>3</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.state}>
            <Text style={styles.textState}>4</Text>
          </View>
        </View>
        <ScrollView>
          {this.renderStateTwo()}
        </ScrollView>
        {spinner}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataEkspedisiList: state.expeditions
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getExpedition: () => dispatch(expeditionAction.getExpedition())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreExpedition)
