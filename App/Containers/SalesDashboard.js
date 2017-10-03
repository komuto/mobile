import React from 'react'
import {View, Text, ToastAndroid, TouchableOpacity, BackAndroid, Image} from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import * as salesAction from '../actions/transaction'

import {isFetching, isError, isFound} from '../Services/Status'

import styles from './Styles/SalesDashboardStyle'

import { Images, Colors } from '../Themes'

class SalesDashboard extends React.Component {

  constructor (props) {
    super(props)
    this.submitting = {
      neworder: false,
      deliveryconfrimation: false,
      saleslist: false
    }
    this.state = {
      newOrder: props.dataOrder || null,
      deliveryConfirmation: props.dataProcessingOrder || null,
      salesList: props.dataSales || null
    }
  }

  componentWillReceiveProps (nextProps) {
    const {dataOrder, dataProcessingOrder, dataSales} = nextProps

    if (!isFetching(dataOrder) && this.submitting.neworder) {
      this.submitting = { ...this.submitting, neworder: false }
      if (isError(dataOrder)) {
        ToastAndroid.show(dataOrder.message, ToastAndroid.SHORT)
      }
      if (isFound(dataOrder)) {
        this.setState({ newOrder: dataOrder })
      }
    }

    if (!isFetching(dataProcessingOrder) && this.submitting.deliveryconfrimation) {
      this.submitting = { ...this.submitting, deliveryconfrimation: false }
      if (isError(dataProcessingOrder)) {
        ToastAndroid.show(dataProcessingOrder.message, ToastAndroid.SHORT)
      }
      if (isFound(dataOrder)) {
        this.setState({ deliveryConfirmation: dataProcessingOrder })
      }
    }

    if (!isFetching(dataSales) && this.submitting.saleslist) {
      this.submitting = { ...this.submitting, saleslist: false }
      if (isError(dataSales)) {
        ToastAndroid.show(dataSales.message, ToastAndroid.SHORT)
      }
      if (isFound(dataOrder)) {
        this.setState({ salesList: dataSales })
      }
    }
  }

  componentDidMount () {
    const { newOrder, deliveryConfirmation, salesList } = this.state
    if (!newOrder.isFound) {
      this.submitting = {
        ...this.submitting,
        neworder: true
      }
      this.props.getListOrder()
    }
    if (!deliveryConfirmation.isFound) {
      this.submitting = {
        ...this.submitting,
        deliveryconfrimation: true
      }
      this.props.getListProcessingOrder()
    }
    if (!salesList.isFound) {
      this.submitting = {
        ...this.submitting,
        saleslist: true
      }
      this.props.getListSales()
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

  handleNewOrders () {
    NavigationActions.listneworder({
      type: ActionConst.PUSH,
      actionPop: false
    })
  }

  handleConfirmDelivery () {
    NavigationActions.deliveryConfirmation({
      type: ActionConst.PUSH
    })
  }

  handleSalesList () {
    NavigationActions.saleslist({
      type: ActionConst.PUSH
    })
  }

  checkAmountOrder (data) {
    if (!this.submitting.newOrder) {
      return (
        <View style={[styles.circleRed, {backgroundColor: Colors.snow}]}>
          <Text style={styles.statusAmount}>
            {data.orders.length}
          </Text>
        </View>
      )
    }
  }

  checkAmountDeliv (data) {
    if (!this.submitting.deliveryconfrimation) {
      return (
        <View style={[styles.circleRed, {backgroundColor: Colors.snow}]}>
          <Text style={styles.statusAmount}>
            {data.orders.length}
          </Text>
        </View>
      )
    }
  }

  checkAmountSale (data) {
    if (!this.submitting.saleslist) {
      return (
        <View style={styles.circleRed}>
          <Text style={[styles.statusAmount, {color: Colors.snow}]}>
            {data.sales.length}
          </Text>
        </View>
      )
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.menuContainer}>
          <TouchableOpacity onPress={() => this.handleNewOrders()}>
            <View style={styles.menu}>
              <Image source={Images.listOrder} style={styles.icon} />
              <View style={styles.borderContainer}>
                <View style={styles.nameContainer}>
                  <Text style={styles.textName}>
                    Pesanan Baru
                  </Text>
                </View>
                {this.checkAmountOrder(this.state.newOrder)}
                <Image source={Images.rightArrow} style={styles.rightArrow} />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handleConfirmDelivery()}>
            <View style={styles.menu}>
              <Image source={Images.confrimDelivery} style={styles.icon} />
              <View style={styles.borderContainer}>
                <View style={styles.nameContainer}>
                  <Text style={styles.textName}>
                    Konfirmasi Pengiriman
                  </Text>
                </View>
                {this.checkAmountDeliv(this.state.deliveryConfirmation)}
                <Image source={Images.rightArrow} style={styles.rightArrow} />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handleSalesList()}>
            <View style={styles.menu}>
              <Image source={Images.newOrder} style={styles.icon} />
              <View style={styles.noBorderContainer}>
                <View style={styles.nameContainer}>
                  <Text style={styles.textName}>
                    Daftar Penjualan
                  </Text>
                </View>
                {this.checkAmountSale(this.state.salesList)}
                <Image source={Images.rightArrow} style={styles.rightArrow} />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  dataOrder: state.newOrders,
  dataProcessingOrder: state.processingOrders,
  dataSales: state.sales
})

const mapDispatchToProps = (dispatch) => ({
  getListOrder: () => dispatch(salesAction.getNewOrders()),
  getListProcessingOrder: () => dispatch(salesAction.getProcessingOrders()),
  getListSales: () => dispatch(salesAction.getSales())
})

export default connect(mapStateToProps, mapDispatchToProps)(SalesDashboard)
