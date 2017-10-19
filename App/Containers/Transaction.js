import React from 'react'
import {
  View,
  Text,
  ListView,
  Image,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  ToastAndroid
} from 'react-native'
import { MaskService } from 'react-native-masked-text'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import { connect } from 'react-redux'
import Spinner from '../Components/Spinner'
import * as transactionAction from '../actions/transaction'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Images, Colors } from '../Themes'
// Styles
import styles from './Styles/TransaksiStyle'

class Transaction extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      data: [],
      isRefreshing: true,
      loading: true,
      page: 1,
      loadmore: true
    }
    this.props.getListTransaction(1)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataListTransaction.status === 200) {
      let i
      let temp = []
      let tempData
      if (nextProps.dataListTransaction.listTransactions.length > 0) {
        tempData = [...this.state.data, ...nextProps.dataListTransaction.listTransactions]
        for (i = 0; i < tempData.length; i++) {
          if (tempData[i].bucket.status === 1 || tempData[i].bucket.status === 2 || tempData[i].bucket.status === 7) {

          } else {
            temp.push(tempData[i])
          }
        }
        this.setState({
          data: temp,
          loading: false,
          isRefreshing: false,
          page: this.state.page + 1,
          loadmore: true,
          isLoading: false
        })
      } else {
        this.setState({
          loadmore: false,
          isLoading: false,
          loading: false
        })
      }
      try {
        let tempCountDown = [...tempData]
        let lastData = []
        for (i = 0; i < tempCountDown.length; i++) {
          if (tempCountDown[i].bucket.status === 3) {
            const time = tempCountDown[i].summary_transaction.time_left
            if (time.days === 0 && time.hours === 0 && time.minutes === 0) {
              tempCountDown[i].bucket.status = 7
              this.setState({
                data: tempCountDown
              })
            } else {
              setTimeout(
                () => {
                  if (time.minutes > 0) {
                    time.minutes = time.minutes - 1
                  } else if (time.minutes === 0 && time.hours > 0) {
                    time.minutes = 59
                    time.hours = time.hours - 1
                  } else if (time.minutes === 0 && time.hours === 0 && time.days > 0) {
                    time.minutes = 59
                    time.hours = 23
                    time.days = time.days - 1
                  }
                  this.setState({
                    data: tempCountDown
                  })
                },
                60000
              )
            }
          }
        }
        for (i = 0; i < tempCountDown.length; i++) {
          if (tempCountDown[i].bucket.status === 7) {
          } else {
            lastData.push(tempCountDown[i])
          }
        }
        this.setState({
          data: lastData
        })
      } catch (e) {

      }
    } else if (nextProps.dataListTransaction.status !== 200 && nextProps.dataListTransaction.status !== 0) {
      this.setState({
        data: [],
        loading: false,
        isRefreshing: false,
        page: 1,
        loadmore: false,
        isLoading: false
      })
      ToastAndroid.show(nextProps.dataListTransaction.message, ToastAndroid.LONG)
    }
  }

  refresh = () => {
    this.setState({ isRefreshing: true, data: [], loading: true, loadmore: true, page: 1 })
    this.props.getListTransaction(1)
  }

  loadMore () {
    const { page, loading, loadmore } = this.state
    if (!loading) {
      if (loadmore) {
        this.props.getListTransaction(page)
      }
    }
  }

  renderView () {
    const { data } = this.state
    if (data.length > 0) {
      return (
        this.renderListViewTransaksi()
      )
    } else if (data.length === 0) {
      return (
        this.renderEmptyData()
      )
    }
  }

  renderEmptyData () {
    return (
      <View style={styles.emptyContainer}>
        <Image source={Images.emptyTransaction} style={styles.emptyImage} />
        <Text style={[styles.price, { textAlign: 'center', marginBottom: 10 }]}>
          Transaksi Anda Kosong
        </Text>
        <Text style={styles.textNotif}>
          Anda belum pernah melakukan transaksi di sini. Silahkan melihat lihat barang.
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.startShopping} onPress={() => this.home()}>
            <Text style={styles.textButton}>
              Mulai Lihat Barang
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  renderListViewTransaksi () {
    return (
      <ListView
        enableEmptySections
        dataSource={this.dataSource.cloneWithRows(this.state.data)}
        renderRow={this.renderRow.bind(this)}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this.refresh}
            tintColor={Colors.red}
            colors={[Colors.red, Colors.bluesky, Colors.green, Colors.orange]}
            title='Loading...'
            titleColor={Colors.red}
            progressBackgroundColor={Colors.snow}
          />
        }
        onEndReached={this.loadMore.bind(this)}
        renderFooter={() => {
          if (this.state.loadmore && this.state.data > 10) {
            return (
              <ActivityIndicator
                style={[styles.loadingStyle, { height: 50 }]}
                size='small'
                color='#ef5656'
              />
            )
          } else {
            return <View />
          }
        }}
      />
    )
  }

  renderRow (rowData) {
    if (rowData.bucket.status === 4) {
      return (
        <TouchableOpacity
          style={styles.rowContainerVerified}
          onPress={() => this.pembayaranDetail(rowData.bucket.status, rowData.bucket.id)}
        >
          {this.renderData(rowData)}
        </TouchableOpacity>
      )
    } else if (rowData.bucket.status === 3) {
      return (
        <TouchableOpacity
          style={styles.rowContainer}
          onPress={() => this.pembayaranDetail(rowData.bucket.status, rowData.bucket.id)}
        >
          {this.renderData(rowData)}
          {this.renderPembayaran(rowData.bucket.status, rowData.summary_transaction.time_left)}
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity
          style={styles.rowContainer}
          onPress={() => this.pembayaranDetail(rowData.bucket.status, rowData.bucket.id)}
        >
          {this.renderData(rowData)}
        </TouchableOpacity>
      )
    }
  }

  renderPembayaran (status, time) {
    if (status === 3) {
      return (
        <View style={styles.pembayaranContainer}>
          <Text style={styles.titlePembayaran}>
            Menunggu Pembayaran
          </Text>
          <Text style={styles.textTitle}>
            {time.days} hari : {time.hours} jam : {time.minutes} menit
          </Text>
        </View>
      )
    }
  }

  renderData (rowData) {
    const data = rowData.products
    const money = MaskService.toMask('money', rowData.summary_transaction.total_price, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    let status
    if (rowData.bucket.status === 3) {
      status = null
    } else {
      if (rowData.bucket.status === 4) {
        status = 'Verifikasi'
      } else if (rowData.bucket.status === 5) {
        status = 'Kadaluarsa'
      } else if (rowData.bucket.status === 6) {
        status = 'Sudah Dibayar'
      }
    }
    if (data.length === 1) {
      return (
        <View style={styles.dataSingle}>
          <Image source={{ uri: data[0].image }} style={styles.imageStyle} />
          <View style={styles.productContainer}>
            <Text style={styles.textTitle}>
              {data[0].name}
            </Text>
            <Text style={styles.textTitle}>
              {data[0].name}
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
              resizeMode='cover'
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

  pembayaranDetail (status, id) {
    if (status === 3) {
      NavigationActions.payment({ type: ActionConst.PUSH, transaction: true })
      this.props.getDetailTransaction(id)
    } else if (status === 4) {
      this.props.getDetailTransaction(id)
      NavigationActions.transactionverification({ type: ActionConst.PUSH })
    } else if (status === 5) {
      this.props.getDetailTransaction(id)
      NavigationActions.transactionexpired({ type: ActionConst.PUSH })
    } else if (status === 6) {
      this.props.getDetailTransaction(id)
      NavigationActions.transactionpaid({ type: ActionConst.PUSH })
    }
  }

  home () {
    NavigationActions.home()
  }

  render () {
    const { loading } = this.state
    if (loading) {
      return (
        <View style={styles.container}>
          <View style={{ marginTop: 10 }} />
          <Spinner color={Colors.red} />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        {this.renderView()}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataListTransaction: state.listTransactions
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getListTransaction: (page) => dispatch(transactionAction.listTransactions({ page: page })),
    getDetailTransaction: (id) => dispatch(transactionAction.getTransaction({id: id}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Transaction)
