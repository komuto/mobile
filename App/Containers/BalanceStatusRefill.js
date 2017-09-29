import React from 'react'
import { ScrollView, Text, ListView, View, Image } from 'react-native'
import { MaskService } from 'react-native-masked-text'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import moment from 'moment'
// Styles
import { Images } from '../Themes'
import styles from './Styles/BalanceStatusRefillStyle'

class BalanceStatusRefill extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      data: [],
      months: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli',
        'Agustus', 'September', 'Oktober', 'November', 'Desember']
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataTopUp.status === 200) {
      this.setState({
        data: nextProps.dataTopUp.statuses
      })
      nextProps.dataTopUp.status = 0
    }
  }

  renderRow (rowData) {
    const money = MaskService.toMask('money', rowData.amount, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    let status
    if (rowData.status === 0) {
      status = (
        <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end' }}>
          <Image source={Images.waiting} style={styles.icon} />
          <Text style={styles.textWaiting}>Menunggu</Text>
        </View>
      )
    } else if (rowData.status === 2) {
      status = (
        <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end' }}>
          <Text style={[styles.textFailed, {marginRight: 10}]}>X</Text>
          <Text style={styles.textFailed}>Gagal</Text>
        </View>
      )
    } else {
      status = (
        <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end' }}>
          <Image source={Images.centangBiru} style={styles.centang} />
          <Text style={styles.textSuccess}>Sukses</Text>
        </View>
      )
    }
    const day = parseInt(moment.unix(rowData.created_at).format('DD'))
    const month = parseInt(moment.unix(rowData.created_at).format('MM'))
    const textMonth = this.state.months[month].substring(0, 3)
    const year = moment.unix(rowData.created_at).format('YYYY')
    return (
      <View style={styles.menuContainer}>
        <View style={[styles.itemContainer, { alignItems: 'flex-start' }]}>
          <Text style={styles.titleMenu}>{day} {textMonth} {year}</Text>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.titleMenu}>{money}</Text>
        </View>
        <View style={styles.itemContainer}>
          {status}
        </View>
      </View>
    )
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <ListView
          dataSource={this.dataSource.cloneWithRows(this.state.data)}
          renderRow={this.renderRow.bind(this)}
          enableEmptySections
        />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataTopUp: state.topupStatus
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BalanceStatusRefill)
