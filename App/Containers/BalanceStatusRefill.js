import React from 'react'
import { Text, ListView, View, Image, RefreshControl, ActivityIndicator, ToastAndroid } from 'react-native'
import { MaskService } from 'react-native-masked-text'
import { connect } from 'react-redux'
import * as saldoAction from '../actions/saldo'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import moment from 'moment'
// Styles
import { Images, Colors } from '../Themes'
import styles from './Styles/BalanceStatusRefillStyle'

class BalanceStatusRefill extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      data: [],
      months: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli',
        'Agustus', 'September', 'Oktober', 'November', 'Desember'],
      isRefreshing: true,
      page: 1,
      loadmore: true
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataTopUp.status === 200) {
      if (nextProps.dataTopUp.statuses.length > 0) {
        const data = [...this.state.data, ...nextProps.dataTopUp.statuses]
        this.setState({
          data: data,
          isRefreshing: false,
          page: this.state.page + 1,
          loadmore: true,
          isLoading: false
        })
      } else {
        this.setState({
          loadmore: false,
          isLoading: false,
          isRefreshing: false
        })
      }
      nextProps.dataTopUp.status = 0
    } else if (nextProps.dataTopUp.status !== 200 && nextProps.dataTopUp.status !== 0) {
      this.setState({
        data: [],
        isRefreshing: false,
        page: 1,
        loadmore: false,
        isLoading: false
      })
      ToastAndroid.show(nextProps.dataTopUp.message, ToastAndroid.LONG)
      nextProps.dataTopUp.status = 0
    }
  }

  maskedMoney (value) {
    let price
    if (value < 1000) {
      price = 'Rp ' + value
    }
    if (value >= 1000) {
      price = MaskService.toMask('money', value, {
        unit: 'Rp ',
        separator: '.',
        delimiter: '.',
        precision: 3
      })
    }
    return price
  }

  renderRow (rowData) {
    const money = this.maskedMoney(rowData.amount)
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
    const month = parseInt(moment.unix(rowData.created_at).format('MM')) - 1
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

  refresh = () => {
    this.setState({ isRefreshing: true, data: [], loadmore: true, page: 1 })
    this.props.getStatusTopUp(1)
  }

  loadMore () {
    const { page, loading, loadmore } = this.state
    if (!loading) {
      if (loadmore) {
        this.props.getStatusTopUp(page)
      }
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.dataSource.cloneWithRows(this.state.data)}
          renderRow={this.renderRow.bind(this)}
          enableEmptySections
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
      </View>
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
    getStatusTopUp: (page) => dispatch(saldoAction.getTopupStatus({page: page}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BalanceStatusRefill)
