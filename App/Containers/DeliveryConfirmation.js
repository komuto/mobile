import React from 'react'
import {
  View,
  Text,
  RefreshControl,
  TouchableOpacity,
  ListView,
  BackAndroid,
  Image,
  ToastAndroid,
  ActivityIndicator
} from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import moment from 'moment'
import { MaskService } from 'react-native-masked-text'
import {isFetching, isError, isFound} from '../Services/Status'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import * as salesAction from '../actions/transaction'

// Styles
import styles from './Styles/DeliveryConfirmationStyle'
import { Fonts, Colors } from '../Themes'

class DeliveryConfirmation extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.submitting = {
      delivery: false
    }
    this.state = {
      stateConfrimOrder: [],
      page: 1,
      loadmore: false,
      isRefreshing: true,
      isLoading: false
    }
  }

  componentWillReceiveProps (nextProps) {
    const {dataListConfrimOrder} = nextProps

    if (!isFetching(dataListConfrimOrder) && this.submitting.delivery) {
      this.submitting = { ...this.submitting, delivery: false }
      if (isError(dataListConfrimOrder)) {
        ToastAndroid.show(dataListConfrimOrder.message, ToastAndroid.SHORT)
      }
      if (isFound(dataListConfrimOrder)) {
        const isFound = dataListConfrimOrder.orders.length
        this.setState({isRefreshing: false})
        if (isFound >= 10) {
          const data = [...this.state.stateConfrimOrder, ...nextProps.dataListConfrimOrder.orders]
          this.setState({
            stateConfrimOrder: data,
            isRefreshing: false,
            saleList: data,
            isLoading: false,
            loadmore: true,
            page: this.state.page + 1
          })
        } else {
          const data = [...this.state.stateConfrimOrder, ...nextProps.dataListConfrimOrder.orders]
          this.setState({
            stateConfrimOrder: data,
            isRefreshing: false,
            saleList: data,
            isLoading: false,
            loadmore: false,
            page: 1
          })
        }
      }
    }
  }

  componentDidMount () {
    if (!this.submitting.delivery) {
      this.submitting = {
        ...this.submitting,
        delivery: true
      }
      this.props.getListProcessingOrder()
    }
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
  }

  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
  }

  handleBack = () => {
    NavigationActions.salesdashboard({
      type: ActionConst.POP_AND_REPLACE
    })
    return true
  }

  loadMore () {
    const { page, loadmore, isLoading } = this.state
    if (!isLoading) {
      if (loadmore) {
        this.submitting.delivery = true
        this.props.getListProcessingOrder({page: page})
      }
    }
  }

  refresh = () => {
    this.setState({ isRefreshing: true, stateConfrimOrder: [], page: 1, isLoading: true })
    this.submitting.delivery = true
    this.props.getListProcessingOrder()
  }

  maskedMoney (value) {
    const priceMasked = MaskService.toMask('money', value, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    return priceMasked
  }

  maskedDate (value) {
    const timeStampToDate = moment.unix(value).format('ddd, DD MMMM YYYY').toString()
    return timeStampToDate
  }

  labeldaridropshipper (data, y) {
    if (data === 'seller') {
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

  onClickInputNoResi (id) {
    this.props.getDetailConfrimOrder(id)
    NavigationActions.inputshippinginfo({
      type: ActionConst.PUSH,
      idInvoice: id
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

  checkProduct (data, id) {
    if (data === 'seller') {
      return (
        <TouchableOpacity
          style={[styles.containerOrder, {borderTopColor: Colors.silver, borderTopWidth: 0.5}]}
          onPress={() => this.onClickInputNoResi(id)}>
          <Text style={[styles.labelTextWaitInput]}>Menunggu Input No Resi dari Seller</Text>
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity
          style={[styles.containerOrder, {borderTopColor: Colors.silver, borderTopWidth: 0.5}]}
          onPress={() => this.onClickInputNoResi(id)}>
          <Text style={[styles.labelTextInput]}>Masukkan No Resi Pengiriman</Text>
        </TouchableOpacity>
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
      <View style={styles.listOrder}>
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
        {this.checkProduct(rowData.invoice.type, rowData.invoice.id)}
      </View>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.dataSource.cloneWithRows(this.state.stateConfrimOrder)}
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
  dataListConfrimOrder: state.processingOrders
})

const mapDispatchToProps = (dispatch) => ({
  getDetailConfrimOrder: (id) => dispatch(salesAction.getProcessingOrderDetail({id: id})),
  getListProcessingOrder: (param) => dispatch(salesAction.getProcessingOrders(param))
})

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryConfirmation)
