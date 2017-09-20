import React from 'react'
import {
  ScrollView,
  View,
  Text,
  ListView,
  Image,
  TouchableOpacity,
  RefreshControl
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
      loading: true
    }
    this.props.getListTransaction()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataListTransaction.status === 200) {
      let temp = []
      const tempData = nextProps.dataListTransaction.listTransactions
      let i
      for (i = 0; i < tempData.length; i++) {
        if (tempData[i].bucket.status === 1 || tempData[i].bucket.status === 2 || tempData[i].bucket.status === 7) {

        } else {
          temp.push(tempData[i])
        }
      }
      this.setState({
        data: temp,
        loading: false,
        isRefreshing: false
      })
    }
  }

  refresh = () => {
    this.setState({ isRefreshing: true, data: [], loading: true })
    this.props.getListTransaction()
  }

  renderListViewTransaksi () {
    return (
      <ListView
        enableEmptySections
        dataSource={this.dataSource.cloneWithRows(this.state.data)}
        renderRow={this.renderRow.bind(this)}
        style={styles.listView}
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
          {this.renderPembayaran(rowData.bucket.status, rowData.summary_transaction.time_left)}
        </TouchableOpacity>
      )
    }
    return (
      <TouchableOpacity
        style={styles.rowContainer}
        onPress={() => this.pembayaranDetail(rowData.bucket.status, rowData.bucket.id)}
      >
        {this.renderData(rowData)}
        {this.renderPembayaran(rowData.bucket.status, rowData.summary_transaction.time_left)}
      </TouchableOpacity>
    )
  }

  renderPembayaran (status, time) {
    if (status === 3) {
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
        <ScrollView>
          {this.renderListViewTransaksi()}
        </ScrollView>
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
    getListTransaction: () => dispatch(transactionAction.listTransactions()),
    getDetailTransaction: (id) => dispatch(transactionAction.getTransaction({id: id}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Transaction)
