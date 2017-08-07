import React from 'react'
import {
  ScrollView,
  View,
  Text,
  ListView,
  Image,
  TouchableOpacity
} from 'react-native'
import { MaskService } from 'react-native-masked-text'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Images } from '../Themes'
// Styles
import styles from './Styles/TransaksiStyle'

class Transaksi extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      data: [
        {
          'id': 1,
          'product': [
            {
              'id': 1,
              'image': 'http://id-live-03.slatic.net/p/7/yutaka-sepatu-slip-on-polkadot-hitam-1476693724-13899501-a70106543eb579371127dab2bbb5db35-catalog_233.jpg',
              'nama': 'Sepatu',
              'toko': 'Nike Just Do It!'
            }
          ],
          'status': 'wait',
          'harga': 250000,
          'time': '1 hari : 20 jam : 30 menit'
        },
        {
          'id': 2,
          'product': [
            {
              'id': 1,
              'image': 'http://id-live-03.slatic.net/p/7/yutaka-sepatu-slip-on-polkadot-hitam-1476693724-13899501-a70106543eb579371127dab2bbb5db35-catalog_233.jpg',
              'nama': 'Sepatu',
              'toko': 'Nike Just Do It!'
            },
            {
              'id': 2,
              'image': 'http://id-live-03.slatic.net/p/7/yutaka-sepatu-slip-on-polkadot-hitam-1476693724-13899501-a70106543eb579371127dab2bbb5db35-catalog_233.jpg',
              'nama': 'Sepatu',
              'toko': 'Nike Just Do It!'
            }
          ],
          'status': 'wait',
          'harga': 250000,
          'time': '1 hari : 20 jam : 30 menit'
        },
        {
          'id': 3,
          'product': [
            {
              'id': 1,
              'image': 'http://id-live-03.slatic.net/p/7/yutaka-sepatu-slip-on-polkadot-hitam-1476693724-13899501-a70106543eb579371127dab2bbb5db35-catalog_233.jpg',
              'nama': 'Sepatu',
              'toko': 'Nike Just Do It!'
            },
            {
              'id': 2,
              'image': 'http://id-live-03.slatic.net/p/7/yutaka-sepatu-slip-on-polkadot-hitam-1476693724-13899501-a70106543eb579371127dab2bbb5db35-catalog_233.jpg',
              'nama': 'Sepatu',
              'toko': 'Nike Just Do It!'
            },
            {
              'id': 3,
              'image': 'http://id-live-03.slatic.net/p/7/yutaka-sepatu-slip-on-polkadot-hitam-1476693724-13899501-a70106543eb579371127dab2bbb5db35-catalog_233.jpg',
              'nama': 'Sepatu',
              'toko': 'Nike Just Do It!'
            }
          ],
          'status': 'wait',
          'harga': 250000,
          'time': '1 hari : 20 jam : 30 menit'
        },
        {
          'id': 4,
          'product': [
            {
              'id': 1,
              'image': 'http://id-live-03.slatic.net/p/7/yutaka-sepatu-slip-on-polkadot-hitam-1476693724-13899501-a70106543eb579371127dab2bbb5db35-catalog_233.jpg',
              'nama': 'Sepatu',
              'toko': 'Nike Just Do It!'
            },
            {
              'id': 2,
              'image': 'http://id-live-03.slatic.net/p/7/yutaka-sepatu-slip-on-polkadot-hitam-1476693724-13899501-a70106543eb579371127dab2bbb5db35-catalog_233.jpg',
              'nama': 'Sepatu',
              'toko': 'Nike Just Do It!'
            },
            {
              'id': 3,
              'image': 'http://id-live-03.slatic.net/p/7/yutaka-sepatu-slip-on-polkadot-hitam-1476693724-13899501-a70106543eb579371127dab2bbb5db35-catalog_233.jpg',
              'nama': 'Sepatu',
              'toko': 'Nike Just Do It!'
            },
            {
              'id': 4,
              'image': 'http://id-live-03.slatic.net/p/7/yutaka-sepatu-slip-on-polkadot-hitam-1476693724-13899501-a70106543eb579371127dab2bbb5db35-catalog_233.jpg',
              'nama': 'Sepatu',
              'toko': 'Nike Just Do It!'
            },
            {
              'id': 5,
              'image': 'http://id-live-03.slatic.net/p/7/yutaka-sepatu-slip-on-polkadot-hitam-1476693724-13899501-a70106543eb579371127dab2bbb5db35-catalog_233.jpg',
              'nama': 'Sepatu',
              'toko': 'Nike Just Do It!'
            }
          ],
          'status': 'wait',
          'harga': 250000,
          'time': '1 hari : 20 jam : 30 menit'
        },
        {
          'id': 1,
          'product': [
            {
              'id': 1,
              'image': 'http://id-live-03.slatic.net/p/7/yutaka-sepatu-slip-on-polkadot-hitam-1476693724-13899501-a70106543eb579371127dab2bbb5db35-catalog_233.jpg',
              'nama': 'Sepatu',
              'toko': 'Nike Just Do It!'
            }
          ],
          'status': 'Verifikasi',
          'harga': 250000,
          'time': '1 hari : 20 jam : 30 menit'
        },
        {
          'id': 2,
          'product': [
            {
              'id': 1,
              'image': 'http://id-live-03.slatic.net/p/7/yutaka-sepatu-slip-on-polkadot-hitam-1476693724-13899501-a70106543eb579371127dab2bbb5db35-catalog_233.jpg',
              'nama': 'Sepatu',
              'toko': 'Nike Just Do It!'
            },
            {
              'id': 2,
              'image': 'http://id-live-03.slatic.net/p/7/yutaka-sepatu-slip-on-polkadot-hitam-1476693724-13899501-a70106543eb579371127dab2bbb5db35-catalog_233.jpg',
              'nama': 'Sepatu',
              'toko': 'Nike Just Do It!'
            }
          ],
          'status': 'Verifikasi',
          'harga': 250000,
          'time': '1 hari : 20 jam : 30 menit'
        },
        {
          'id': 3,
          'product': [
            {
              'id': 1,
              'image': 'http://id-live-03.slatic.net/p/7/yutaka-sepatu-slip-on-polkadot-hitam-1476693724-13899501-a70106543eb579371127dab2bbb5db35-catalog_233.jpg',
              'nama': 'Sepatu',
              'toko': 'Nike Just Do It!'
            },
            {
              'id': 2,
              'image': 'http://id-live-03.slatic.net/p/7/yutaka-sepatu-slip-on-polkadot-hitam-1476693724-13899501-a70106543eb579371127dab2bbb5db35-catalog_233.jpg',
              'nama': 'Sepatu',
              'toko': 'Nike Just Do It!'
            },
            {
              'id': 3,
              'image': 'http://id-live-03.slatic.net/p/7/yutaka-sepatu-slip-on-polkadot-hitam-1476693724-13899501-a70106543eb579371127dab2bbb5db35-catalog_233.jpg',
              'nama': 'Sepatu',
              'toko': 'Nike Just Do It!'
            }
          ],
          'status': 'Verifikasi',
          'harga': 250000,
          'time': '1 hari : 20 jam : 30 menit'
        },
        {
          'id': 4,
          'product': [
            {
              'id': 1,
              'image': 'http://id-live-03.slatic.net/p/7/yutaka-sepatu-slip-on-polkadot-hitam-1476693724-13899501-a70106543eb579371127dab2bbb5db35-catalog_233.jpg',
              'nama': 'Sepatu',
              'toko': 'Nike Just Do It!'
            },
            {
              'id': 2,
              'image': 'http://id-live-03.slatic.net/p/7/yutaka-sepatu-slip-on-polkadot-hitam-1476693724-13899501-a70106543eb579371127dab2bbb5db35-catalog_233.jpg',
              'nama': 'Sepatu',
              'toko': 'Nike Just Do It!'
            },
            {
              'id': 3,
              'image': 'http://id-live-03.slatic.net/p/7/yutaka-sepatu-slip-on-polkadot-hitam-1476693724-13899501-a70106543eb579371127dab2bbb5db35-catalog_233.jpg',
              'nama': 'Sepatu',
              'toko': 'Nike Just Do It!'
            },
            {
              'id': 4,
              'image': 'http://id-live-03.slatic.net/p/7/yutaka-sepatu-slip-on-polkadot-hitam-1476693724-13899501-a70106543eb579371127dab2bbb5db35-catalog_233.jpg',
              'nama': 'Sepatu',
              'toko': 'Nike Just Do It!'
            },
            {
              'id': 5,
              'image': 'http://id-live-03.slatic.net/p/7/yutaka-sepatu-slip-on-polkadot-hitam-1476693724-13899501-a70106543eb579371127dab2bbb5db35-catalog_233.jpg',
              'nama': 'Sepatu',
              'toko': 'Nike Just Do It!'
            }
          ],
          'status': 'Verifikasi',
          'harga': 250000,
          'time': '1 hari : 20 jam : 30 menit'
        },
        {
          'id': 1,
          'product': [
            {
              'id': 1,
              'image': 'http://id-live-03.slatic.net/p/7/yutaka-sepatu-slip-on-polkadot-hitam-1476693724-13899501-a70106543eb579371127dab2bbb5db35-catalog_233.jpg',
              'nama': 'Sepatu',
              'toko': 'Nike Just Do It!'
            }
          ],
          'status': 'Kadaluarsa',
          'harga': 250000,
          'time': '1 hari : 20 jam : 30 menit'
        },
        {
          'id': 2,
          'product': [
            {
              'id': 1,
              'image': 'http://id-live-03.slatic.net/p/7/yutaka-sepatu-slip-on-polkadot-hitam-1476693724-13899501-a70106543eb579371127dab2bbb5db35-catalog_233.jpg',
              'nama': 'Sepatu',
              'toko': 'Nike Just Do It!'
            },
            {
              'id': 2,
              'image': 'http://id-live-03.slatic.net/p/7/yutaka-sepatu-slip-on-polkadot-hitam-1476693724-13899501-a70106543eb579371127dab2bbb5db35-catalog_233.jpg',
              'nama': 'Sepatu',
              'toko': 'Nike Just Do It!'
            }
          ],
          'status': 'Kadaluarsa',
          'harga': 250000,
          'time': '1 hari : 20 jam : 30 menit'
        },
        {
          'id': 3,
          'product': [
            {
              'id': 1,
              'image': 'http://id-live-03.slatic.net/p/7/yutaka-sepatu-slip-on-polkadot-hitam-1476693724-13899501-a70106543eb579371127dab2bbb5db35-catalog_233.jpg',
              'nama': 'Sepatu',
              'toko': 'Nike Just Do It!'
            },
            {
              'id': 2,
              'image': 'http://id-live-03.slatic.net/p/7/yutaka-sepatu-slip-on-polkadot-hitam-1476693724-13899501-a70106543eb579371127dab2bbb5db35-catalog_233.jpg',
              'nama': 'Sepatu',
              'toko': 'Nike Just Do It!'
            },
            {
              'id': 3,
              'image': 'http://id-live-03.slatic.net/p/7/yutaka-sepatu-slip-on-polkadot-hitam-1476693724-13899501-a70106543eb579371127dab2bbb5db35-catalog_233.jpg',
              'nama': 'Sepatu',
              'toko': 'Nike Just Do It!'
            }
          ],
          'status': 'Kadaluarsa',
          'harga': 250000,
          'time': '1 hari : 20 jam : 30 menit'
        },
        {
          'id': 4,
          'product': [
            {
              'id': 1,
              'image': 'http://id-live-03.slatic.net/p/7/yutaka-sepatu-slip-on-polkadot-hitam-1476693724-13899501-a70106543eb579371127dab2bbb5db35-catalog_233.jpg',
              'nama': 'Sepatu',
              'toko': 'Nike Just Do It!'
            },
            {
              'id': 2,
              'image': 'http://id-live-03.slatic.net/p/7/yutaka-sepatu-slip-on-polkadot-hitam-1476693724-13899501-a70106543eb579371127dab2bbb5db35-catalog_233.jpg',
              'nama': 'Sepatu',
              'toko': 'Nike Just Do It!'
            },
            {
              'id': 3,
              'image': 'http://id-live-03.slatic.net/p/7/yutaka-sepatu-slip-on-polkadot-hitam-1476693724-13899501-a70106543eb579371127dab2bbb5db35-catalog_233.jpg',
              'nama': 'Sepatu',
              'toko': 'Nike Just Do It!'
            },
            {
              'id': 4,
              'image': 'http://id-live-03.slatic.net/p/7/yutaka-sepatu-slip-on-polkadot-hitam-1476693724-13899501-a70106543eb579371127dab2bbb5db35-catalog_233.jpg',
              'nama': 'Sepatu',
              'toko': 'Nike Just Do It!'
            },
            {
              'id': 5,
              'image': 'http://id-live-03.slatic.net/p/7/yutaka-sepatu-slip-on-polkadot-hitam-1476693724-13899501-a70106543eb579371127dab2bbb5db35-catalog_233.jpg',
              'nama': 'Sepatu',
              'toko': 'Nike Just Do It!'
            }
          ],
          'status': 'Kadaluarsa',
          'harga': 250000,
          'time': '1 hari : 20 jam : 30 menit'
        },
        {
          'id': 1,
          'product': [
            {
              'id': 1,
              'image': 'http://id-live-03.slatic.net/p/7/yutaka-sepatu-slip-on-polkadot-hitam-1476693724-13899501-a70106543eb579371127dab2bbb5db35-catalog_233.jpg',
              'nama': 'Sepatu',
              'toko': 'Nike Just Do It!'
            }
          ],
          'status': 'Sudah dibayar',
          'harga': 250000,
          'time': '1 hari : 20 jam : 30 menit'
        },
        {
          'id': 2,
          'product': [
            {
              'id': 1,
              'image': 'http://id-live-03.slatic.net/p/7/yutaka-sepatu-slip-on-polkadot-hitam-1476693724-13899501-a70106543eb579371127dab2bbb5db35-catalog_233.jpg',
              'nama': 'Sepatu',
              'toko': 'Nike Just Do It!'
            },
            {
              'id': 2,
              'image': 'http://id-live-03.slatic.net/p/7/yutaka-sepatu-slip-on-polkadot-hitam-1476693724-13899501-a70106543eb579371127dab2bbb5db35-catalog_233.jpg',
              'nama': 'Sepatu',
              'toko': 'Nike Just Do It!'
            }
          ],
          'status': 'Sudah dibayar',
          'harga': 250000,
          'time': '1 hari : 20 jam : 30 menit'
        },
        {
          'id': 3,
          'product': [
            {
              'id': 1,
              'image': 'http://id-live-03.slatic.net/p/7/yutaka-sepatu-slip-on-polkadot-hitam-1476693724-13899501-a70106543eb579371127dab2bbb5db35-catalog_233.jpg',
              'nama': 'Sepatu',
              'toko': 'Nike Just Do It!'
            },
            {
              'id': 2,
              'image': 'http://id-live-03.slatic.net/p/7/yutaka-sepatu-slip-on-polkadot-hitam-1476693724-13899501-a70106543eb579371127dab2bbb5db35-catalog_233.jpg',
              'nama': 'Sepatu',
              'toko': 'Nike Just Do It!'
            },
            {
              'id': 3,
              'image': 'http://id-live-03.slatic.net/p/7/yutaka-sepatu-slip-on-polkadot-hitam-1476693724-13899501-a70106543eb579371127dab2bbb5db35-catalog_233.jpg',
              'nama': 'Sepatu',
              'toko': 'Nike Just Do It!'
            }
          ],
          'status': 'Sudah dibayar',
          'harga': 250000,
          'time': '1 hari : 20 jam : 30 menit'
        },
        {
          'id': 4,
          'product': [
            {
              'id': 1,
              'image': 'http://id-live-03.slatic.net/p/7/yutaka-sepatu-slip-on-polkadot-hitam-1476693724-13899501-a70106543eb579371127dab2bbb5db35-catalog_233.jpg',
              'nama': 'Sepatu',
              'toko': 'Nike Just Do It!'
            },
            {
              'id': 2,
              'image': 'http://id-live-03.slatic.net/p/7/yutaka-sepatu-slip-on-polkadot-hitam-1476693724-13899501-a70106543eb579371127dab2bbb5db35-catalog_233.jpg',
              'nama': 'Sepatu',
              'toko': 'Nike Just Do It!'
            },
            {
              'id': 3,
              'image': 'http://id-live-03.slatic.net/p/7/yutaka-sepatu-slip-on-polkadot-hitam-1476693724-13899501-a70106543eb579371127dab2bbb5db35-catalog_233.jpg',
              'nama': 'Sepatu',
              'toko': 'Nike Just Do It!'
            },
            {
              'id': 4,
              'image': 'http://id-live-03.slatic.net/p/7/yutaka-sepatu-slip-on-polkadot-hitam-1476693724-13899501-a70106543eb579371127dab2bbb5db35-catalog_233.jpg',
              'nama': 'Sepatu',
              'toko': 'Nike Just Do It!'
            },
            {
              'id': 5,
              'image': 'http://id-live-03.slatic.net/p/7/yutaka-sepatu-slip-on-polkadot-hitam-1476693724-13899501-a70106543eb579371127dab2bbb5db35-catalog_233.jpg',
              'nama': 'Sepatu',
              'toko': 'Nike Just Do It!'
            }
          ],
          'status': 'Sudah dibayar',
          'harga': 250000,
          'time': '1 hari : 20 jam : 30 menit'
        }
      ]
    }
  }

  renderListViewTransaksi () {
    return (
      <ListView
        enableEmptySections
        dataSource={this.dataSource.cloneWithRows(this.state.data)}
        renderRow={this.renderRow.bind(this)}
        style={styles.listView}
      />
    )
  }

  renderRow (rowData) {
    if (rowData.status === 'Verifikasi') {
      return (
        <TouchableOpacity
          style={styles.rowContainerVerified}
          onPress={() => this.pembayaranDetail(rowData.status)}
        >
          {this.renderData(rowData)}
          {this.renderPembayaran(rowData.status, rowData.time)}
        </TouchableOpacity>
      )
    }
    return (
      <TouchableOpacity
        style={styles.rowContainer}
        onPress={() => this.pembayaranDetail(rowData.status)}
      >
        {this.renderData(rowData)}
        {this.renderPembayaran(rowData.status, rowData.time)}
      </TouchableOpacity>
    )
  }

  renderPembayaran (status, time) {
    if (status === 'wait') {
      return (
        <View style={styles.pembayaranContainer}>
          <Text style={styles.titlePembayaran}>
            Menunggu Pembayaran
          </Text>
          <Text style={styles.textTitle}>
            {time}
          </Text>
        </View>
      )
    }
  }

  renderData (rowData) {
    const data = rowData.product
    const money = MaskService.toMask('money', rowData.harga, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    let status
    if (rowData.status === 'wait') {
      status = null
    } else {
      status = rowData.status
    }
    if (data.length === 1) {
      return (
        <View style={styles.dataSingle}>
          <Image source={{ uri: data[0].image }} style={styles.imageStyle} />
          <View style={styles.productContainer}>
            <Text style={styles.textTitle}>
              {data[0].nama}
            </Text>
            <Text style={styles.textTitle}>
              {data[0].toko}
            </Text>
          </View>
          <View style={styles.hargaContainer}>
            <Text style={styles.price}>
              {money}
            </Text>
            {this.renderStatus(status)}
          </View>
          <Image source={Images.rightArrow} style={styles.arrow} />
        </View>
      )
    } else if (data.length === 2) {
      return (
        <View style={styles.dataSingle}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: data[0].image }} style={styles.imageRowStyle} />
            <Image source={{ uri: data[1].image }} style={styles.imageRowStyle} />
          </View>
          <View style={styles.hargaContainer}>
            <Text style={styles.price}>
              {money}
            </Text>
            {this.renderStatus(status)}
          </View>
          <Image source={Images.rightArrow} style={styles.arrow} />
        </View>
      )
    } else if (data.length === 3) {
      return (
        <View style={styles.dataSingle}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: data[0].image }} style={styles.imageRowStyle} />
            <Image source={{ uri: data[1].image }} style={styles.imageRowStyle} />
            <Image source={{ uri: data[2].image }} style={styles.imageRowStyle} />
          </View>
          <View style={styles.hargaContainer}>
            <Text style={styles.price}>
              {money}
            </Text>
            {this.renderStatus(status)}
          </View>
          <Image source={Images.rightArrow} style={styles.arrow} />
        </View>
      )
    } else if (data.length > 3) {
      const gambar = data.length - 3
      return (
        <View style={styles.dataSingle}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: data[0].image }} style={styles.imageRowStyle} />
            <Image source={{ uri: data[1].image }} style={styles.imageRowStyle} />
            <Image
              source={{ uri: data[2].image }}
              style={styles.imageRowStyle}
              resizeMode='contain'
              borderRadius={7}
            >
              <View style={styles.morePictures}>
                <Text style={[styles.textTitleWhite, { fontSize: 15 }]}>+{gambar}</Text>
              </View>
            </Image>
          </View>
          <View style={styles.hargaContainer}>
            <Text style={styles.price}>
              {money}
            </Text>
            {this.renderStatus(status)}
          </View>
          <Image source={Images.rightArrow} style={styles.arrow} />
        </View>
      )
    }
  }

  renderStatus (status) {
    if (status === null) {
      return (
        <Text style={styles.textTitleWhite}>
          null
        </Text>
      )
    }
    return (
      <Text style={styles.textTitle}>
        {status}
      </Text>
    )
  }

  pembayaranDetail (status) {
    if (status === 'wait') {
      NavigationActions.pembayarantransferbankdetail({ type: ActionConst.PUSH })
    } else if (status === 'Verifikasi') {
      NavigationActions.transaksiverifikasi({ type: ActionConst.PUSH })
    } else if (status === 'Kadaluarsa') {
      NavigationActions.transaksikadaluarsa({ type: ActionConst.PUSH })
    } else if (status === 'Sudah dibayar') {
      NavigationActions.transaksidibayar({ type: ActionConst.PUSH })
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.renderListViewTransaksi()}
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

export default connect(mapStateToProps, mapDispatchToProps)(Transaksi)
