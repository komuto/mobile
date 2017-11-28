import React from 'react'
import {
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  BackAndroid,
  Image,
  ListView,
  RefreshControl,
  ToastAndroid
} from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import moment from 'moment'
import RupiahFormat from '../Services/MaskedMoneys'

import * as salesAction from '../actions/transaction'
import {isFetching, isError, isFound} from '../Services/Status'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ListNewOrderStyle'
import { Fonts, Colors } from '../Themes'

class ListNewOrder extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.submitting = {
      orders: false
    }
    this.state = {
      stateListOrder: [],
      page: 1,
      loadmore: false,
      isRefreshing: true,
      isLoading: false
    }
  }
  componentWillReceiveProps (nextProps) {
    const {dataOrder} = nextProps

    if (!isFetching(dataOrder) && this.submitting.orders) {
      this.submitting = { ...this.submitting, orders: false }
      if (isError(dataOrder)) {
        ToastAndroid.show(dataOrder.message, ToastAndroid.SHORT)
      }
      if (isFound(dataOrder)) {
        const isFound = dataOrder.orders.length
        this.setState({isRefreshing: false})
        if (isFound >= 10) {
          let data = [...this.state.stateListOrder, ...dataOrder.orders]
          this.setState({
            stateListOrder: data,
            isRefreshing: false,
            saleList: data,
            isLoading: false,
            loadmore: true,
            page: this.state.page + 1
          })
        } else {
          let data = [...this.state.stateListOrder, ...dataOrder.orders]
          this.setState({
            stateListOrder: data,
            isRefreshing: false,
            saleList: data,
            isLoading: false,
            loadmore: false,
            page: 0
          })
        }
      }
    }
  }

  componentDidMount () {
    if (!this.submitting.orders) {
      this.submitting = {
        ...this.submitting,
        orders: true
      }
      this.props.getListOrder()
    }
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
  }

  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
  }

  handleBack = () => {
    NavigationActions.pop()
    return true
  }

  loadMore () {
    const { page, loadmore, isLoading } = this.state
    if (!isLoading) {
      if (loadmore) {
        this.submitting.orders = true
        this.props.getListOrder({page: page})
      }
    }
  }

  refresh = () => {
    this.setState({ isRefreshing: true, stateListOrder: [], page: 1, isLoading: true })
    this.submitting.orders = true
    this.props.getListOrder()
  }

  maskedMoney (value) {
    return 'Rp ' + RupiahFormat(value)
  }

  maskedDate (value) {
    const timeStampToDate = moment.unix(value).format('ddd, DD MMMM YYYY').toString()
    return timeStampToDate
  }

  labeldaridropshipper (data, y) {
    if (data === 'reseller') {
      return (
        <View key={y}>
          <View style={[styles.flexRow, {marginTop: 10}]}>
            <View style={[styles.laberDropShipping, {backgroundColor: Colors.lightBlueGrey}]}>
              <Text style={[styles.textDropShipping, {color: Colors.darkMintTwo}]}>
                Pesanan Dropshipper
              </Text>
            </View>
            <View style={[styles.triangleLabel, {backgroundColor: Colors.lightBlueGrey}]} />
          </View>
        </View>
      )
    } else {
      <View />
    }
  }

  handleDetailOrder (id) {
    NavigationActions.detailorder({
      type: ActionConst.PUSH,
      idOrder: id
    })
  }

  renderPhoto (products) {
    if (products.length > 4) {
      const mapFoto = products.slice(0, 4).map((data, i) => {
        if (i === 3) {
          return (
            <View style={styles.containerOrder}>
              <View key={i} style={styles.maskedImage}>
                <Image source={{uri: data.image}} style={styles.image} />
                <View style={styles.placeholder}>
                  <Text style={styles.textPlaceHolder}>+{products.length - 4}</Text>
                </View>
              </View>
            </View>
          )
        } else {
          return (
            <View style={styles.containerOrder}>
              <View key={i} style={styles.maskedImage}>
                <Image source={{uri: data.image}} style={styles.image} />
              </View>
            </View>
          )
        }
      })
      return (
        <View style={{flexDirection: 'row'}}>
          {mapFoto}
        </View>
      )
    } else {
      const mapFoto = products.slice(0, 4).map((data, i) => {
        return (
          <View key={i} style={styles.maskedImage}>
            <Image source={{uri: data.image}} style={styles.image} />
          </View>
        )
      })
      return (
        <View style={{flexDirection: 'row'}}>
          {mapFoto}
        </View>
      )
    }
  }

  renderProductName (products) {
    const mapProductName = products.slice(0, 4).map((data, i) => {
      if (products.length === 1) {
        return (
          <Text key={i} ellipsizeMode={'tail'} numberOfLines={1} style={[styles.labelText, {marginLeft: 5, fontFamily: Fonts.type.regular}]}>{data.name}</Text>
        )
      } else {
        return (
          <View key={i} />
        )
      }
    })
    return (
      <View style={{flexDirection: 'row', flex: 1}}>
        {mapProductName}
      </View>
    )
  }

  renderRowOrder (rowData, x, y) {
    var timeStampToDate = this.maskedDate(rowData.invoice.created_at)
    var moneyMasked = this.maskedMoney(rowData.invoice.total_price)
    return (
      <TouchableOpacity key={y} activeOpacity={100} style={styles.listOrder} onPress={() => this.handleDetailOrder(rowData.invoice.id)}>
        {this.labeldaridropshipper(rowData.invoice.type, y)}
        <View style={styles.labelOrder}>
          <Text style={styles.labelText}>{rowData.user.name}</Text>
          <Text style={styles.labelDate}>{timeStampToDate}</Text>
        </View>
        <View style={styles.containerOrder}>
          {this.renderPhoto(rowData.products)}
          {this.renderProductName(rowData.products)}
          <Text style={styles.labelMoney}>{moneyMasked}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.dataSource.cloneWithRows(this.state.stateListOrder)}
          renderRow={this.renderRowOrder.bind(this)}
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
            if (this.state.loadmore) {
              return (
                <ActivityIndicator
                  style={[styles.loadingStyle, { height: 50 }]}
                  size='small'
                  color='#ef5656'
                />
              )
            }
            return <View />
          }}
          enableEmptySections
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  dataOrder: state.newOrders
})

const mapDispatchToProps = (dispatch) => ({
  getDetailOrder: (id) => dispatch(salesAction.getNewOrderDetail({id: id})),
  getListOrder: (param) => dispatch(salesAction.getNewOrders(param))
})

export default connect(mapStateToProps, mapDispatchToProps)(ListNewOrder)
