import React from 'react'
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  ListView,
  BackAndroid,
  ActivityIndicator,
  RefreshControl
} from 'react-native'
import { connect } from 'react-redux'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import moment from 'moment'
import { MaskService } from 'react-native-masked-text'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import * as salesAction from '../actions/transaction'

// Styles
import styles from './Styles/SalesListStyle'
import { Fonts, Colors } from '../Themes'

class SalesList extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      loading: false,
      tabViewStyle: {
        backgroundColor: 'transparent'
      },
      saleList: [],
      saleListDropship: [],
      page: 1,
      loadmore: true,
      isRefreshing: false,
      isLoading: true,
      pagedDropship: 1,
      loadmoreDropship: true,
      isRefreshingDropship: false,
      isLoadingDropship: true,
      loadingPage: true
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataSales.status === 200) {
      if (nextProps.dataSales.sales.length > 0) {
        let data = [...this.state.saleList, ...nextProps.dataSales.sales]
        this.setState({
          saleList: data,
          page: this.state.page + 1,
          isRefreshing: false,
          isLoading: false,
          loadmore: true,
          loadingPage: false
        })
      } else {
        this.setState({
          loadmore: false,
          isLoading: false
        })
      }
    } if (nextProps.dataSalesDropship.status === 200) {
      if (nextProps.dataSalesDropship.sales.length > 0) {
        let data = [...this.state.saleListDropship, ...nextProps.dataSalesDropship.sales]
        this.setState({
          saleListDropship: data,
          pagedDropship: this.state.pagedDropship + 1,
          isRefreshingDropship: false,
          isLoadingDropship: false,
          loadmoreDropship: true,
          loadingPage: false
        })
      } else {
        this.setState({
          loadmoreDropship: false,
          isLoadingDropship: false
        })
      }
    }
  }

  componentDidMount () {
    this.props.getListSales(1)
    this.props.getListSalesDropship(1, true)
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
  }

  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
  }

  handleBack = () => {
    NavigationActions.pop({
      type: ActionConst.POP_AND_REPLACE
    })
    return true
  }

  loadMore () {
    const { page, loadmore, isLoading } = this.state
    if (!isLoading) {
      if (loadmore) {
        this.props.getListSales(page)
      }
    }
  }

  refresh = () => {
    this.setState({ isRefreshing: true, saleList: [], page: 1, isLoading: true })
    this.props.getListSales(1)
  }

  loadMoreDropship () {
    const { pagedDropship, loadmoreDropship, isLoadingDropship } = this.state
    if (!isLoadingDropship) {
      if (loadmoreDropship) {
        this.props.getListSalesDropship(pagedDropship, true)
      }
    }
  }

  refresh = () => {
    this.setState({ isRefreshingDropship: true, saleListDropship: [], pageDropship: 1, isLoadingDropship: true })
    this.props.getListSalesDropship(1, true)
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
            <View style={[styles.laberDropShipping, {backgroundColor: Colors.whiteThree}]}>
              <Text style={[styles.textDropShipping, {color: Colors.lightgrey}]}>
                Terjual oleh Reseller
              </Text>
            </View>
            <View style={[styles.triangleLabel, {backgroundColor: Colors.whiteThree}]} />
          </View>
        </View>
      )
    } else {
      <View />
    }
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

  checkProduct (data) {
    if (data === 0) {
      return (
        <View style={[styles.containerOrder, {borderTopColor: Colors.silver, borderTopWidth: 0.5}]}>
          <View style={[styles.round, {backgroundColor: Colors.lightblack}]} />
          <Text style={[styles.labelTextWaitInput, {marginLeft: 8.5}]}>REJECTED</Text>
        </View>
      )
    } if (data === 1) {
      return (
        <View style={[styles.containerOrder, {borderTopColor: Colors.silver, borderTopWidth: 0.5}]}>
          <View style={[styles.round, {backgroundColor: Colors.lightBlue}]} />
          <Text style={[styles.labelTextWaitInput, {marginLeft: 8.5}]}>WAITING</Text>
        </View>
      )
    } if (data === 2) {
      return (
        <View style={[styles.containerOrder, {borderTopColor: Colors.silver, borderTopWidth: 0.5}]}>
          <View style={[styles.round, {backgroundColor: Colors.lightBlueGrey}]} />
          <Text style={[styles.labelTextWaitInput, {marginLeft: 8.5}]}>PROCEED</Text>
        </View>
      )
    } if (data === 3) {
      return (
        <View style={[styles.containerOrder, {borderTopColor: Colors.silver, borderTopWidth: 0.5}]}>
          <View style={[styles.round, {backgroundColor: Colors.bluesky}]} />
          <Text style={[styles.labelTextWaitInput, {marginLeft: 8.5}]}>Menunggu Konfirmasi Pembeli</Text>
        </View>
      )
    } if (data === 4) {
      return (
        <View style={[styles.containerOrder, {borderTopColor: Colors.silver, borderTopWidth: 0.5}]}>
          <View style={[styles.round, {backgroundColor: Colors.darkMint}]} />
          <Text style={[styles.labelTextWaitInput, {marginLeft: 8.5}]}>Barrang sudah diterima</Text>
        </View>
      )
    } if (data === 5) {
      return (
        <View style={[styles.containerOrder, {borderTopColor: Colors.silver, borderTopWidth: 0.5}]}>
          <View style={[styles.round, {backgroundColor: Colors.pumpkinOrange}]} />
          <Text style={[styles.labelTextWaitInput, {marginLeft: 8.5}]}>Terdapat barang bermasalah</Text>
        </View>
      )
    } if (data === 6) {
      return (
        <View style={[styles.containerOrder, {borderTopColor: Colors.silver, borderTopWidth: 0.5}]}>
          <View style={[styles.round, {backgroundColor: Colors.orange}]} />
          <Text style={[styles.labelTextWaitInput, {marginLeft: 8.5}]}>Komplain Selesai</Text>
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

  renderMystuff (rowData, x, y) {
    var timeStampToDate = this.maskedDate(rowData.invoice.created_at)
    var moneyMasked = this.maskedMoney(rowData.invoice.total_price)
    return (
      <TouchableOpacity onPress={() => this.onClickDetailSales(rowData.invoice.id)} style={styles.listOrder}>
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
        {this.checkProduct(rowData.invoice.transaction_status)}
      </TouchableOpacity>
    )
  }

  renderMystuffDropship (rowData, x, y) {
    var timeStampToDate = this.maskedDate(rowData.invoice.created_at)
    var moneyMasked = this.maskedMoney(rowData.invoice.total_price)
    return (
      <TouchableOpacity onPress={() => this.onClickDetailSales(rowData.invoice.id)} style={styles.listOrder}>
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
        {this.checkProduct(rowData.invoice.transaction_status)}
      </TouchableOpacity>
    )
  }

  onClickDetailSales (id) {
    NavigationActions.detailsales({
      type: ActionConst.PUSH,
      idSales: id
    })
  }

  render () {
    if (this.state.loadingPage) {
      return (
        <View style={styles.spinner}>
          <ActivityIndicator color={Colors.red} size='large' />
        </View>
      )
    }
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
            <ListView
              dataSource={this.dataSource.cloneWithRows(this.state.saleList)}
              renderRow={this.renderMystuff.bind(this)}
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
          <View tabLabel='Dropshipper' ref='dropshipper'>
            <View style={styles.header}>
              <Text style={styles.regularSlate}>Menampilkan penjualan dari barang yang Anda ambil dari Seller lain</Text>
            </View>
            <ListView
              dataSource={this.dataSource.cloneWithRows(this.state.saleListDropship)}
              renderRow={this.renderMystuffDropship.bind(this)}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.isRefreshingDropship}
                  onRefresh={this.isRefreshingDropship}
                  tintColor={Colors.red}
                  colors={[Colors.red, Colors.bluesky, Colors.green, Colors.orange]}
                  title='Loading...'
                  titleColor={Colors.red}
                  progressBackgroundColor={Colors.snow}
                />
              }
              onEndReached={this.loadMoreDropship.bind(this)}
              renderFooter={() => {
                if (this.state.loadmoreDropship) {
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
        </ScrollableTabView>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  dataSales: state.sales,
  dataSalesDropship: state.sales2
})

const mapDispatchToProps = (dispatch) => ({
  getListSales: (page) => dispatch(salesAction.getSales({page: page})),
  getListSalesDropship: (page, isDropship) => dispatch(salesAction.getSales2({page: page, is_dropship: isDropship}))
})

export default connect(mapStateToProps, mapDispatchToProps)(SalesList)
