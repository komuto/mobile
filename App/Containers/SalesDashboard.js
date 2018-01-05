import React from 'react'
import {View, Text, TouchableOpacity, BackAndroid, Image} from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import * as otherAction from '../actions/other'
import Reactotron from 'reactotron-react-native'

import styles from './Styles/SalesDashboardStyle'

import { Images, Colors } from '../Themes'

class SalesDashboard extends React.Component {

  constructor (props) {
    super(props)
    this.submitting = {
      countorder: false
    }
    this.state = {
      countOrder: props.dataCount || null,
      order: this.props.dataDisputes.disputes.sales.new_order,
      delivery: this.props.dataDisputes.disputes.sales.processing_order,
      sale: this.props.dataDisputes.disputes.sales.sale
    }
  }

  componentWillReceiveProps (nextProps) {
    const {dataDisputes} = nextProps
    if (dataDisputes.status === 200) {
      this.setState({
        order: dataDisputes.disputes.sales.new_order,
        delivery: dataDisputes.disputes.sales.processing_order,
        sale: dataDisputes.disputes.sales.sale
      })
    }
  }

  componentDidMount () {
    Reactotron.log('sales dashboard')
    const { countOrder } = this.state
    if (!countOrder.isFound) {
      this.submitting = {
        ...this.submitting,
        countorder: true
      }
      this.props.getCount()
    }
    console.log(this.props.dataDisputes.disputes.sales.new_order)
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
    if (data !== 0) {
      return (
        <View style={[styles.circleRed]}>
          <Text style={[styles.statusAmount, { color: Colors.snow }]}>
            {data}
          </Text>
        </View>
      )
    }
    return null
  }

  checkAmountDeliv (data) {
    if (data !== 0) {
      return (
        <View style={[styles.circleRed]}>
          <Text style={[styles.statusAmount, { color: Colors.snow }]}>
            {data}
          </Text>
        </View>
      )
    }
    return null
  }

  checkAmountSale (data) {
    if (data !== 0) {
      return (
        <View style={[styles.circleRed]}>
          <Text style={[styles.statusAmount, { color: Colors.snow }]}>
            {data}
          </Text>
        </View>
      )
    }
    return null
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
                {this.checkAmountOrder(this.state.order)}
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
                {this.checkAmountDeliv(this.state.delivery)}
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
                {this.checkAmountSale(this.state.sale)}
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
  dataCount: state.saleCount,
  dataDisputes: state.unreadDisputesStore
})

const mapDispatchToProps = (dispatch) => ({
  getCount: () => dispatch(otherAction.getSaleCount())
})

export default connect(mapStateToProps, mapDispatchToProps)(SalesDashboard)
