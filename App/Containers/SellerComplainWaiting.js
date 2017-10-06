import React from 'react'
import {
  View,
  ListView,
  TouchableOpacity,
  BackAndroid,
  ToastAndroid,
  RefreshControl,
  ActivityIndicator,
  Text,
  Image
} from 'react-native'
import { connect } from 'react-redux'
import {Actions as NavigationActions, ActionConst} from 'react-native-router-flux'
import {isFetching, isError, isFound} from '../Services/Status'
import * as salesAction from '../actions/transaction'

// Styles
import styles from './Styles/SellerComplainWaitingStyle'
import {Colors, Images} from '../Themes'

class SellerComplainWaiting extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.submitting = {
      complain: false,
      fetching: true
    }
    this.state = {
      complains: props.propsUnresolvedCompaint || null,
      page: 1,
      loadmore: false,
      isRefreshing: false,
      isLoading: false
    }
  }

  componentWillReceiveProps (nextProps) {
    const {propsUnresolvedCompaint} = nextProps

    if (!isFetching(propsUnresolvedCompaint)) {
      this.submitting = { ...this.submitting, complain: false, fetching: false }
      if (isError(propsUnresolvedCompaint)) {
        ToastAndroid.show(propsUnresolvedCompaint.message, ToastAndroid.SHORT)
      }
      if (isFound(propsUnresolvedCompaint)) {
        if (propsUnresolvedCompaint.orders.length > 0) {
          let data = [...this.state.complains, ...propsUnresolvedCompaint.orders]
          this.setState({
            complains: data,
            page: this.state.page + 1,
            isRefreshing: false,
            loadmore: true,
            isLoading: true
          })
        } else {
          this.setState({
            loadmore: false,
            isLoading: false
          })
        }
      }
    }
  }

  componentDidMount () {
    const { complains } = this.state
    if (!complains.isFound) {
      this.submitting = {
        ...this.submitting,
        complain: true
      }
      this.props.getComplain(1, false)
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
        this.props.getComplain(page, false)
      }
    }
  }

  refresh = () => {
    this.setState({ isRefreshing: true, complains: [], isLoading: true })
    this.props.getComplain(1, false)
  }

  checkAmountComplain (data) {
    if (data > 0) {
      return (
        <View style={styles.icon}>
          <Text style={styles.textIcon}>{data}</Text>
        </View>
      )
    } else {
      return (
        <View />
      )
    }
  }

  renderImageProduct (products) {
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
        <View style={{flexDirection: 'row', flex: 1}}>
          {mapFoto}
        </View>
      )
    } else {
      const mapFoto = products.slice(0, 4).map((data, i) => {
        return (
          <View key={i} style={styles.containerOrder}>
            <View key={i} style={styles.maskedImage}>
              <Image source={{uri: data.image}} style={styles.image} />
            </View>
          </View>
        )
      })
      return (
        <View style={{flexDirection: 'row', flex: 1}}>
          {mapFoto}
        </View>
      )
    }
  }

  iconRightArrow (data) {
    if (data > 0) {
      return (
        <Image source={Images.iconRightArrowArrow} style={styles.imageArrow} />
      )
    } else {
      return (
        <View />
      )
    }
  }

  renderRow (rowData, x, y) {
    return (
      <TouchableOpacity onPress={() => this.onclick(rowData.id)} activeOpacity={0.8} key={y} style={styles.containerList}>
        <View style={styles.flexRowBorder}>
          <Text style={styles.textSemiBoldGrey}>{rowData.user.name}</Text>
          {this.checkAmountComplain(rowData.dispute_products.length)}
        </View>
        <View style={styles.flexRowNoBorder}>
          {this.renderImageProduct(rowData.dispute_products)}
          {this.iconRightArrow(rowData.dispute_products.length)}
        </View>
      </TouchableOpacity>
    )
  }

  onclick (id) {
    NavigationActions.sellercomplaindetail({
      type: ActionConst.PUSH,
      idComplain: id
    })
  }

  render () {
    if (this.submitting.fetching) {
      return (
        <View style={styles.spinner}>
          <ActivityIndicator color={Colors.red} size='large' />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.regularSlate}>Berikut adalah daftar pembelian yang terdapat barang bermasalah di dalamnya</Text>
        </View>
        <ListView
          dataSource={this.dataSource.cloneWithRows(this.state.complains)}
          renderRow={this.renderRow.bind(this)}
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
  propsUnresolvedCompaint: state.sellerComplainedOrders
})

const mapDispatchToProps = (dispatch) => ({
  getComplain: (page, param) => dispatch(salesAction.getComplainedOrdersSeller({page: page, is_resolved: param}))
})

export default connect(mapStateToProps, mapDispatchToProps)(SellerComplainWaiting)
