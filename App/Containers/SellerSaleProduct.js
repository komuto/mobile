import React from 'react'
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  ListView,
  BackAndroid,
  ActivityIndicator,
  RefreshControl,
  ToastAndroid
} from 'react-native'
import {connect} from 'react-redux'
import {Actions as NavigationActions, ActionConst} from 'react-native-router-flux'
import moment from 'moment'
import {MaskService} from 'react-native-masked-text'
import {isFetching, isError, isFound} from '../Services/Status'

import * as salesAction from '../actions/transaction'

import {Fonts, Colors} from '../Themes'
import styles from './Styles/SellerSaleProductStyle'

class SellerSaleProduct extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.submitting = {
      product: false
    }
    this.state = {
      dataProduct: props.dataSales || null,
      saleList: [],
      page: 1,
      loadmore: false,
      isRefreshing: true,
      isLoading: true
    }
  }
  componentWillReceiveProps (nextProps) {
    const {dataSales} = nextProps

    if (!isFetching(dataSales) && this.submitting.product) {
      this.submitting = { ...this.submitting, product: false }
      if (isError(dataSales)) {
        ToastAndroid.show(dataSales.message, ToastAndroid.SHORT)
      }
      if (isFound(dataSales)) {
        const isFound = dataSales.sales.length
        this.setState({isRefreshing: false})
        if (isFound >= 10) {
          const data = [...this.state.saleList, ...dataSales.sales]
          this.setState({
            dataProduct: dataSales,
            isRefreshing: false,
            saleList: data,
            isLoading: false,
            loadmore: true,
            page: this.state.page + 1
          })
        } else {
          const data = [...this.state.saleList, ...dataSales.sales]
          this.setState({
            dataProduct: dataSales,
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
    const {dataProduct} = this.state
    if (!dataProduct.isFound || !this.submitting.product) {
      this.submitting = {
        ...this.submitting,
        product: true
      }
      this.props.getListSales(1)
    }
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

  renderRowProduct (rowData, x, y) {
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
    return (
      <ListView
        dataSource={this.dataSource.cloneWithRows(this.state.saleList)}
        renderRow={this.renderRowProduct.bind(this)}
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
    )
  }
}

const mapStateToProps = (state) => ({
  dataSales: state.sales
})

const mapDispatchToProps = (dispatch) => ({
  getListSales: (page) => dispatch(salesAction.getSales({page: page}))
})

export default connect(mapStateToProps, mapDispatchToProps)(SellerSaleProduct)
