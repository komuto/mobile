import React from 'react'
import { View, Text, ListView, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Colors, Images } from '../Themes'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import * as transactionAction from '../actions/transaction'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/BuyerComplainDoneStyle'

class BuyerComplainDone extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      data: []
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataDispute.status === 200) {
      this.setState(({
        data: nextProps.dataDispute.orders
      }))
    }
  }

  renderHeader () {
    return (
      <View style={styles.header}>
        <Text style={styles.textTitle}>
          Berikut adalah daftar pembelian yang terdapat barang bermasalah di dalamnya
        </Text>
      </View>
    )
  }

  renderListView () {
    return (
      <ListView
        dataSource={this.dataSource.cloneWithRows(this.state.data)}
        renderRow={this.renderRow.bind(this)}
        enableEmptySections
      />
    )
  }

  renderRow (rowData) {
    const data = rowData.dispute_products
    let renderData
    if (data.length < 5) {
      const image = data.map((data, i) => {
        return (
          <Image key={i} source={{ uri: data.image }} style={styles.imageRowStyle} />
        )
      })
      renderData = (
        <View style={styles.dataSingle}>
          <View style={styles.imageContainer}>
            {image}
          </View>
          <Image source={Images.rightArrow} style={styles.arrow} />
        </View>
      )
    } else {
      const gambar = data.length - 5
      renderData = (
        <View style={styles.dataSingle}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: data[0].image }} style={styles.imageRowStyle} />
            <Image source={{ uri: data[1].image }} style={styles.imageRowStyle} />
            <Image source={{ uri: data[2].image }} style={styles.imageRowStyle} />
            <Image
              source={{ uri: data[3].image }}
              style={styles.imageRowStyle}
              resizeMode='cover'
              borderRadius={7}
            >
              <View style={styles.morePictures}>
                <Text style={[styles.textTitleWhite, { fontSize: 15 }]}>+{gambar}</Text>
              </View>
            </Image>
          </View>
          <Image source={Images.rightArrow} style={styles.arrow} />
        </View>
      )
    }
    return (
      <TouchableOpacity style={styles.rowContainer} onPress={() => this.getDetail(rowData.id)}>
        <View style={styles.storeNameContainer}>
          <Text style={[styles.textTitle, { flex: 1 }]}>
            {rowData.store.name}
          </Text>
          <View style={styles.disputeNumber}>
            <Text style={[styles.textTitle, { flex: 1, color: Colors.snow }]}>
              {data.length}
            </Text>
          </View>
        </View>
        {renderData}
      </TouchableOpacity>
    )
  }

  getDetail (id) {
    NavigationActions.buyercomplaindetail({
      type: ActionConst.PUSH
    })
    this.props.getDetailDispute(id)
  }

  render () {
    return (
      <View style={styles.container}>
        {this.renderListView()}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataDispute: state.buyerComplainedOrders2
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDetailDispute: (id) => dispatch(transactionAction.getComplainedOrderDetailBuyer({id: id}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuyerComplainDone)
