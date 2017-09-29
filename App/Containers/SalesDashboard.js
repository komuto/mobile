import React from 'react'
import {View, Text, ToastAndroid, TouchableOpacity, BackAndroid, Image} from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import * as salesAction from '../actions/transaction'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/SalesDashboardStyle'

import { Images, Colors } from '../Themes'

class SalesDashboard extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      newOrder: 0,
      deliveryConfirmation: 0,
      salesList: 0
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataOrder.status === 200) {
      this.setState({
        newOrder: nextProps.dataOrder.orders.length
      })
    } if (nextProps.dataProcessingOrder.status === 200) {
      this.setState({
        deliveryConfirmation: nextProps.dataProcessingOrder.orders.length
      })
    } if (nextProps.dataSales.status === 200) {
      this.setState({
        salesList: nextProps.dataSales.sales.length
      })
    } if (nextProps.dataOrder.status > 200 ||
      nextProps.dataProcessingOrder.status > 200 ||
      nextProps.dataSales.status > 200) {
      ToastAndroid.show(nextProps.dataOrder.message || nextProps.dataProcessingOrder.message || nextProps.dataSales.message, ToastAndroid.SHORT)
    }
  }

  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
    this.props.getListOrder()
    this.props.getListProcessingOrder()
    this.props.getListSales()
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
                <View style={[styles.circleRed, {backgroundColor: Colors.snow}]}>
                  <Text style={styles.statusAmount}>
                    {this.state.newOrder}
                  </Text>
                </View>
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
                <View style={[styles.circleRed, {backgroundColor: Colors.snow}]}>
                  <Text style={styles.statusAmount}>
                    {this.state.deliveryConfirmation}
                  </Text>
                </View>
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
                <View style={styles.circleRed}>
                  <Text style={[styles.statusAmount, {color: Colors.snow}]}>
                    {this.state.salesList}
                  </Text>
                </View>
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
