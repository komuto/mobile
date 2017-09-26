import React from 'react'
import { View, ScrollView, Text, TouchableOpacity, Image, ListView } from 'react-native'
import { connect } from 'react-redux'
import { Images } from '../Themes'
import { MaskService } from 'react-native-masked-text'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/BalanceHistoryPurchaseStyle'

class BalanceHistoryPurchase extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      date: 'Rabu, 25 Agustus 2018',
      total: '250000',
      expand: false,
      arrow: Images.down,
      dataBarang: [
        {
          'store':
          {
            'name': 'Goku Sport'
          },
          'items': [
            {
              'product':
              {
                'name': 'Indomi',
                'image': 'https://cdn.idntimes.com/content-images/post/20170315/7-0dc7a8345dbe940f25c6ec32276aecd5.jpg'
              }
            }
          ]
        },
        {
          'store':
          {
            'name': 'Goku Sport'
          },
          'items': [
            {
              'product':
              {
                'name': 'Indomi',
                'image': 'https://cdn.idntimes.com/content-images/post/20170315/7-0dc7a8345dbe940f25c6ec32276aecd5.jpg'
              }
            },
            {
              'product':
              {
                'name': 'Indomi',
                'image': 'https://cdn.idntimes.com/content-images/post/20170315/7-0dc7a8345dbe940f25c6ec32276aecd5.jpg'
              }
            }
          ]
        },
        {
          'store':
          {
            'name': 'Goku Sport'
          },
          'items': [
            {
              'product':
              {
                'name': 'Indomi',
                'image': 'https://cdn.idntimes.com/content-images/post/20170315/7-0dc7a8345dbe940f25c6ec32276aecd5.jpg'
              }
            },
            {
              'product':
              {
                'name': 'Indomi',
                'image': 'https://cdn.idntimes.com/content-images/post/20170315/7-0dc7a8345dbe940f25c6ec32276aecd5.jpg'
              }
            },
            {
              'product':
              {
                'name': 'Indomi',
                'image': 'https://cdn.idntimes.com/content-images/post/20170315/7-0dc7a8345dbe940f25c6ec32276aecd5.jpg'
              }
            },
            {
              'product':
              {
                'name': 'Indomi',
                'image': 'https://cdn.idntimes.com/content-images/post/20170315/7-0dc7a8345dbe940f25c6ec32276aecd5.jpg'
              }
            },
            {
              'product':
              {
                'name': 'Indomi',
                'image': 'https://cdn.idntimes.com/content-images/post/20170315/7-0dc7a8345dbe940f25c6ec32276aecd5.jpg'
              }
            },
            {
              'product':
              {
                'name': 'Indomi',
                'image': 'https://cdn.idntimes.com/content-images/post/20170315/7-0dc7a8345dbe940f25c6ec32276aecd5.jpg'
              }
            }
          ]
        }
      ],
      balance: 200000
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

  renderMoney (label, data) {
    return (
      <View style={styles.dataContainer}>
        <Text style={[styles.label, { flex: 1 }]}>{label}</Text>
        <Text style={styles.dataMoney}>- {data}</Text>
      </View>
    )
  }

  renderListView () {
    return (
      <ListView
        enableEmptySections
        dataSource={this.dataSource.cloneWithRows(this.state.dataBarang)}
        renderRow={this.renderRowBarang.bind(this)}
      />
    )
  }

  renderRowBarang (rowData) {
    if (rowData.items.length > 1) {
      if (rowData.items.length <= 4) {
        const image = rowData.items.map((data, i) => {
          return (
            <Image key={i} source={{ uri: data.product.image }} style={styles.imageBarang} />
          )
        })
        return (
          <TouchableOpacity style={styles.containerStatusItem} onPress={() => this.detailBarang(rowData.id, rowData.transaction_status)}>
            <View style={styles.containerBarang}>
              <Text style={[styles.textTitle, { marginBottom: 10 }]}>{rowData.store.name}</Text>
              <View style={styles.items}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  {image}
                </View>
                <Image source={Images.rightArrow} style={styles.arrow} />
              </View>
            </View>
          </TouchableOpacity>
        )
      } else {
        const gambar = rowData.items.length - 4
        return (
          <TouchableOpacity style={styles.containerStatusItem} onPress={() => this.detailBarang(rowData.id, rowData.transaction_status)}>
            <View style={styles.containerBarang}>
              <Text style={[styles.textTitle, { marginBottom: 10 }]}>{rowData.store.name}</Text>
              <View style={styles.items}>
                <Image source={{ uri: rowData.items[0].product.image }} style={styles.imageBarang} />
                <Image source={{ uri: rowData.items[1].product.image }} style={styles.imageBarang} />
                <Image source={{ uri: rowData.items[2].product.image }} style={styles.imageBarang} />
                <Image source={{ uri: rowData.items[3].product.image }} style={styles.imageBarang} />
                <Image
                  source={{ uri: rowData.items[4].product.image }}
                  style={styles.imageRowStyle}
                  resizeMode='cover'
                  borderRadius={7}
                >
                  <View style={styles.morePictures}>
                    <Text style={[styles.textTitleWhite, { fontSize: 15 }]}>+{gambar}</Text>
                  </View>
                </Image>
                <Image source={Images.rightArrow} style={styles.arrow} />
              </View>
            </View>
          </TouchableOpacity>
        )
      }
    } else {
      return (
        <TouchableOpacity style={styles.containerStatusItem} onPress={() => this.detailBarang(rowData.id, rowData.transaction_status)}>
          <View style={styles.containerBarang}>
            <Text style={[styles.textTitle, { marginBottom: 10 }]}>{rowData.store.name}</Text>
            <View style={styles.items}>
              <Image source={{ uri: rowData.items[0].product.image }} style={styles.imageBarang} />
              <View style={styles.namaBarangContainer}>
                <Text style={styles.textTitle}>{rowData.items[0].product.name}</Text>
              </View>
              <Image source={Images.rightArrow} style={styles.arrow} />
            </View>
          </View>
        </TouchableOpacity>
      )
    }
  }

  detailBarang (id, status) {
    // null
  }

  render () {
    const { date, total, balance } = this.state
    const moneyTotal = MaskService.toMask('money', total, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })

    const moneyBalance = MaskService.toMask('money', balance, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })

    return (
      <View style={styles.container}>
        <ScrollView>
          {this.renderData('Jenis Transaksi', 'Pembelian Barang')}
          {this.renderData('Tanggal Transaksi', date)}
          {this.renderTotal('Total Tagihan', moneyTotal)}
          {this.renderExpand()}
          {this.renderSeparator()}
          {this.renderMoney('Saldo yang digunakan', moneyBalance)}
          {this.renderSeparator()}
          {this.renderTitle('Daftar Barang yang dibeli')}
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

export default connect(mapStateToProps, mapDispatchToProps)(BalanceHistoryPurchase)
