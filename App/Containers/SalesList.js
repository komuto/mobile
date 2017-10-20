import React from 'react'
import {
  View,
  ListView,
  BackAndroid,
  Text
} from 'react-native'
import { connect } from 'react-redux'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import { Actions as NavigationActions } from 'react-native-router-flux'
import SellerSaleProduct from './SellerSaleProduct'
import SellerSaleDropshipper from './SellerSaleDropshipper'

import styles from './Styles/SalesListStyle'
import { Colors } from '../Themes'

class SalesList extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      tabViewStyle: {
        backgroundColor: 'transparent'
      }
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

  render () {
    return (
      <View style={styles.container}>
        <ScrollableTabView
          prerenderingSiblingsNumber={2}
          style={this.state.tabViewStyle}
          tabBarBackgroundColor={Colors.red}
          tabBarActiveTextColor={Colors.snow}
          tabBarUnderlineStyle={{ backgroundColor: Colors.snow, height: 2 }}
          tabBarInactiveTextColor={Colors.snow}
          tabBarTextStyle={styles.textTab}
          locked
        >
          <View tabLabel='Barang Saya' ref='myStuff'>
            <SellerSaleProduct />
          </View>
          <View tabLabel='Dropshipper' ref='dropshipper'>
            <View style={styles.header}>
              <Text style={styles.regularSlate}>Menampilkan penjualan dari barang yang Anda ambil dari Seller lain</Text>
            </View>
            <SellerSaleDropshipper />
          </View>
        </ScrollableTabView>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(SalesList)
