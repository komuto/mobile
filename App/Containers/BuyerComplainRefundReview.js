import React from 'react'
import { ScrollView, View, Text, ListView, Image } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Images } from '../Themes'
// Styles
import styles from './Styles/BuyerComplainRefundReviewStyle'

class BuyerComplainRefundReview extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      data: [
        {
          'image': 'https://avatars-cdn.9gag.com/avatar/default_20_100_v0.jpg',
          'name': 'Sepatu joging'
        },
        {
          'image': 'https://avatars-cdn.9gag.com/avatar/default_20_100_v0.jpg',
          'name': 'Sepatu joging'
        },
        {
          'image': 'https://avatars-cdn.9gag.com/avatar/default_20_100_v0.jpg',
          'name': 'Sepatu joging'
        }
      ],
      dataReview: []
    }
  }

  renderLabel (label) {
    return (
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
      </View>
    )
  }

  renderItemRefund () {
    return (
      <ListView
        dataSource={this.dataSource.cloneWithRows(this.state.data)}
        renderRow={this.renderRow.bind(this)}
        enableEmptySections
      />
    )
  }

  renderRow (rowData) {
    return (
      <View style={styles.dataContainer}>
        <Image source={{ uri: rowData.image }} style={styles.imageProduct} />
        <Text style={[styles.textLabel, {flex: 1}]}>{rowData.name}</Text>
        <Image source={Images.centangBiru} style={styles.check} />
        <Text style={styles.textData}>Refund</Text>
      </View>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.renderLabel('Daftar Barang yang direfund')}
          {this.renderItemRefund()}
          {this.renderLabel('Daftar Barang menunggu review')}
        </ScrollView>
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(BuyerComplainRefundReview)
