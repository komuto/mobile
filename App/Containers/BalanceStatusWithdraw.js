import React from 'react'
import { View, ScrollView, ListView, Text, Image } from 'react-native'
import { connect } from 'react-redux'
import { MaskService } from 'react-native-masked-text'
import { Images, Colors } from '../Themes'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/BalanceStatusWithdrawStyle'

class BalanceStatusWithdraw extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      data: [
        {
          'bank': 'Mandiri',
          'number': '08982-xxx-393',
          'amount': 200000,
          'status': 1,
          'date': '12 September 2018'
        },
        {
          'bank': 'Mandiri',
          'number': '08982-xxx-393',
          'amount': 200000,
          'status': 2,
          'date': '12 September 2018'
        },
        {
          'bank': 'Mandiri',
          'number': '08982-xxx-393',
          'amount': 200000,
          'status': 3,
          'date': '12 September 2018'
        }
      ]
    }
  }

  renderRow (rowData) {
    let image, status, textStyle, imageStyle
    if (rowData.status === 1) {
      image = Images.centangBiru
      status = 'Sukses'
      textStyle = Colors.darkMint
      imageStyle = { tintColor: Colors.darkMint }
    } else if (rowData.status === 2) {
      image = Images.waiting
      status = 'Waiting'
      textStyle = Colors.textYellow
      imageStyle = null
    }
    const money = MaskService.toMask('money', rowData.amount, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    if (rowData.status === 3) {
      return (
        <View style={styles.rowContainer}>
          <View style={styles.dataContainer}>
            <Text style={[styles.textTitle, { flex: 1 }]}>{rowData.bank} - {rowData.number}</Text>
            <Text style={styles.textTitle}>+ {money}</Text>
          </View>
          <View style={styles.dateContainer}>
            <Text style={[styles.textDate, { flex: 1 }]}>{rowData.date}</Text>
            <Text style={[styles.textRed, { marginRight: 10 }]}>X</Text>
            <Text style={styles.textRed}>Gagal</Text>
          </View>
        </View>
      )
    }
    return (
      <View style={styles.rowContainer}>
        <View style={styles.dataContainer}>
          <Text style={[styles.textTitle, { flex: 1 }]}>{rowData.bank} - {rowData.number}</Text>
          <Text style={styles.textTitle}>+ {money}</Text>
        </View>
        <View style={styles.dateContainer}>
          <Text style={[styles.textDate, { flex: 1 }]}>{rowData.date}</Text>
          <Image source={image} style={[styles.image, imageStyle]} />
          <Text style={[styles.textRed, { color: textStyle }]}>{status}</Text>
        </View>
      </View>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView>
          <ListView
            dataSource={this.dataSource.cloneWithRows(this.state.data)}
            renderRow={this.renderRow.bind(this)}
            enableEmptySections
          />
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

export default connect(mapStateToProps, mapDispatchToProps)(BalanceStatusWithdraw)
