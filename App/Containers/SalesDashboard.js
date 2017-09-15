import React from 'react'
import { View, Text, TouchableOpacity, BackAndroid, Image } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/SalesDashboardStyle'

import { Images, Colors } from '../Themes'

class SalesDashboard extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      newOrder: 30,
      deliveryConfirmation: 12,
      salesList: 5
    }
  }

  componentDidMount () {
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
      type: ActionConst.PUSH
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

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SalesDashboard)
