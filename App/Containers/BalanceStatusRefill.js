import React from 'react'
import { ScrollView, Text, ListView, View, Image } from 'react-native'
import { MaskService } from 'react-native-masked-text'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import { Images } from '../Themes'
import styles from './Styles/BalanceStatusRefillStyle'

class BalanceStatusRefill extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      data: [
        { id: 1,
          time: '12 Sep 2016',
          nominal: '20000',
          status: 0
        },
        { id: 2,
          time: '12 Sep 2016',
          nominal: '30000',
          status: 1
        },
        { id: 3,
          time: '12 Sep 2016',
          nominal: '40000',
          status: 2
        }]
    }
  }

  renderRow (rowData) {
    const money = MaskService.toMask('money', rowData.nominal, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    let status
    if (rowData.status === 0) {
      status = (
        <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end' }}>
          <Image source={Images.waktu} style={styles.icon} />
          <Text style={styles.textWaiting}>Menunggu</Text>
        </View>
      )
    } else if (rowData.status === 1) {
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
    return (
      <View style={styles.menuContainer}>
        <View style={[styles.itemContainer, { alignItems: 'flex-start' }]}>
          <Text style={styles.titleMenu}>{rowData.time}</Text>
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BalanceStatusRefill)
