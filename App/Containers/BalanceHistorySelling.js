import React from 'react'
import { View, ScrollView, Text, TouchableOpacity, Image, ListView } from 'react-native'
import { connect } from 'react-redux'
import { Images, Colors } from '../Themes'
import { MaskService } from 'react-native-masked-text'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/BalanceHistorySellingStyle'

class BalanceHistorySelling extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      date: 'Rabu, 25 Agustus 2018',
      total: '250000',
      expand: false,
      invoice: '123inv',
      image: 'http://images.goodsmile.info/cgm/images/product/20160927/5981/41608/large/283820e0d12a55d17e3a0f1b855090d0.jpg',
      name: 'Jonathan Hope',
      arrow: Images.down,
      data: [
        {
          'product': {
            'price': 10000,
            'name': 'Indomie',
            'image': 'https://cdn.idntimes.com/content-images/post/20170315/7-0dc7a8345dbe940f25c6ec32276aecd5.jpg'
          },
          'note': 'Indomie rasa kare ayam',
          'qty': 3
        },
        {
          'product': {
            'price': 20000,
            'name': 'Sarimie',
            'image': 'https://cdn.idntimes.com/content-images/post/20170315/7-0dc7a8345dbe940f25c6ec32276aecd5.jpg'
          },
          'note': 'Sarimi rasa kare ayam',
          'qty': 3
        }
      ]
    }
  }

  renderData (label, data) {
    return (
      <View style={styles.dataContainer}>
        <Text style={[styles.label, { flex: 1 }]}>{label}</Text>
        <Text style={styles.data}>{data}</Text>
      </View>
    )
  }

  renderTotal (label, data) {
    return (
      <View style={styles.dataContainer}>
        <Text style={[styles.label, { flex: 1 }]}>{label}</Text>
        <Text style={[styles.data, { marginRight: 10 }]}>{data}</Text>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={() => this.expand()}>
          <Text style={[styles.blueText, { marginRight: 10 }]}>Detail</Text>
          <Image source={this.state.arrow} style={styles.arrow} />
        </TouchableOpacity>
      </View>
    )
  }

  renderExpand () {
    const { expand } = this.state
    if (expand) {
      return <Text>expand</Text>
    }
    return null
  }

  expand () {
    const { expand } = this.state
    if (expand) {
      this.setState({
        expand: false,
        arrow: Images.arrowDown
      })
    } else {
      this.setState({
        expand: true,
        arrow: Images.arrowUp
      })
    }
  }

  renderSeparator () {
    return (
      <View style={{height: 20}} />
    )
  }

  renderTitle (title) {
    return (
      <Text style={styles.title}>{title}</Text>
    )
  }

  renderBuyer () {
    const { image, name } = this.state
    return (
      <View style={styles.dataContainer}>
        <Text style={[styles.label, { flex: 1 }]}>Pembeli</Text>
        <Image source={{uri: image}} style={styles.image} />
        <Text style={styles.data}>{name}</Text>
      </View>
    )
  }

  renderMoney (label, data) {
    return (
      <View style={styles.dataContainer}>
        <Text style={[styles.label, { flex: 1 }]}>{label}</Text>
        <Text style={styles.dataMoney}>{data}</Text>
      </View>
    )
  }

  renderListView () {
    return (
      <ListView
        enableEmptySections
        dataSource={this.dataSource.cloneWithRows(this.state.data)}
        renderRow={this.renderRow.bind(this)}
      />
    )
  }

  renderRow (rowData) {
    const money = MaskService.toMask('money', rowData.product.price, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    return (
      <View style={styles.itemContainer}>
        <Image source={{ uri: rowData.product.image }} style={styles.imageProduct} />
        <View style={styles.rowDataContainer}>
          <Text style={[styles.textData, { marginBottom: 2 }]}>{rowData.product.name}</Text>
          <Text style={[styles.textData, { marginBottom: 2 }]}>Harga : {money} / item</Text>
          <Text style={[styles.textData, { marginBottom: 2 }]}>Jumlah : {rowData.qty}</Text>
          <Text style={[styles.textData, { marginBottom: 5, fontStyle: 'italic', color: Colors.labelgrey }]}>
            "{rowData.note}"
          </Text>
        </View>
      </View>
    )
  }

  render () {
    const { date, total, invoice } = this.state
    const moneyTotal = MaskService.toMask('money', total, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })

    const moneyComission = MaskService.toMask('money', total / 10, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })

    const paidMoney = MaskService.toMask('money', total - (total / 10), {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.renderData('Jenis Transaksi', 'Penjualan Barang')}
          {this.renderData('Tanggal Transaksi', date)}
          {this.renderTotal('Total Tagihan', moneyTotal)}
          {this.renderExpand()}
          {this.renderSeparator()}
          {this.renderData('Komisi Komuto (10%)', moneyComission)}
          {this.renderMoney('Uang yang Anda terima', paidMoney)}
          {this.renderSeparator()}
          {this.renderTitle('Info Penjualan')}
          {this.renderData('No Invoice', invoice)}
          {this.renderBuyer()}
          {this.renderSeparator()}
          {this.renderTitle('Daftar Barang yang dijual')}
          {this.renderListView()}
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

export default connect(mapStateToProps, mapDispatchToProps)(BalanceHistorySelling)
