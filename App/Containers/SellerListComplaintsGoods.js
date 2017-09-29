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
import { connect } from 'react-redux'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import {Actions as NavigationActions, ActionConst} from 'react-native-router-flux'
import {isFetching, isError, isFound} from '../Services/Status'

// import YourActions from '../Redux/YourRedux'
import * as loginaction from '../actions/user'
import * as salesAction from '../actions/transaction'

// Styles
import styles from './Styles/SellerListComplaintsGoodsStyle'
import {Colors, Images} from '../Themes'

class SellerListComplaintsGoods extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.submitting = {
      unresolvedComplain: false,
      resolvedComplain: false
    }
    this.state = {
      listUnresolvedComplain: [],
      listResolvedComplain: [],
      pageUnresolve: 1,
      loadmoreUnresolve: false,
      isRefreshingUnresolve: false,
      isLoadingUnresolve: false,
      pageResolve: 1,
      loadmoreResolve: false,
      isRefreshingResolve: false,
      isLoadingResolve: false,
      loadingPage: true
    }
  }

  componentWillReceiveProps (nextProps) {
    const {propsUnresolvedCompaint, propsResolvedCompaint} = nextProps

    if (!isFetching(propsUnresolvedCompaint)) {
      this.submitting = { ...this.submitting, unresolvedComplain: false }
      if (isError(propsUnresolvedCompaint)) {
        ToastAndroid.show(propsUnresolvedCompaint.message, ToastAndroid.SHORT)
      }
      if (isFound(propsUnresolvedCompaint)) {
        if (propsUnresolvedCompaint.orders.length > 0) {
          let data = [...this.state.listUnresolvedComplain, ...propsUnresolvedCompaint.orders]
          this.setState({
            listUnresolvedComplain: data,
            pageUnresolve: this.state.pageUnresolve + 1,
            isRefreshingUnresolve: false,
            isLoadingUnresolve: true,
            loadmoreUnresolve: true
          })
        } else {
          this.setState({
            loadmoreUnresolve: false,
            isLoadingUnresolve: false
          })
        }
      }
    }

    if (!isFetching(propsResolvedCompaint)) {
      this.submitting = { ...this.submitting, resolvedComplain: false }
      if (isError(propsResolvedCompaint)) {
        ToastAndroid.show(propsResolvedCompaint.message, ToastAndroid.SHORT)
      }
      if (isFound(propsResolvedCompaint)) {
        if (propsResolvedCompaint.orders.length > 0) {
          let data = [...this.state.listResolvedComplain, ...propsResolvedCompaint.orders]
          this.setState({
            listResolvedComplain: data,
            pageResolve: this.state.pageResolve + 1,
            isRefreshingResolve: false,
            isLoadingResolve: true,
            loadmoreResolve: true
          })
        } else {
          this.setState({
            loadmoreResolve: false,
            isLoadingResolve: false
          })
        }
      }
    }

    if (!isFetching(propsUnresolvedCompaint) && !isFetching(propsResolvedCompaint)) {
      this.setState({ loadingPage: false })
    }
  }

  componentDidMount () {
    const { listResolvedComplain, listUnresolvedComplain } = this.state
    if (!listUnresolvedComplain.isFound && !listResolvedComplain.isFound) {
      this.submitting = {
        ...this.submitting,
        unresolvedComplain: true,
        resolvedComplain: true
      }
      this.props.getListUnresolvedComplaintSeller(1, false)
      this.props.getListResolvedComplaintSeller(1, true)
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

  loadMoreUnresolve () {
    const { pageUnresolve, loadmoreUnresolve, isLoadingUnresolve } = this.state
    if (!isLoadingUnresolve) {
      if (loadmoreUnresolve) {
        this.props.getListUnresolvedComplaintSeller(pageUnresolve, false)
      }
    }
  }

  refreshUnresolve = () => {
    this.setState({ isRefreshingUnresolve: true, listUnresolvedComplain: [], isLoadingUnresolve: true })
    this.props.getListUnresolvedComplaintSeller(1, false)
  }

  loadMoreResolve () {
    const { pageResolve, loadmoreResolve, isLoadingResolve } = this.state
    if (!isLoadingResolve) {
      if (loadmoreResolve) {
        this.props.getListResolvedComplaintSeller(pageResolve, true)
      }
    }
  }

  refreshResolve = () => {
    this.setState({ isRefreshingResolve: true, listResolvedComplain: [], isLoadingResolve: true })
    this.props.getListResolvedComplaintSeller(1, true)
  }

  renderPhotoProduct (products) {
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

  renderRowUnresolved (rowData, x, y) {
    return (
      <TouchableOpacity onPress={() => this.onclick(rowData.id)} activeOpacity={0.8} key={y} style={styles.containerList}>
        <View style={styles.flexRowBorder}>
          <Text style={styles.textSemiBoldGrey}>{rowData.user.name}</Text>
          {this.checkAmountComplain(rowData.dispute_products.length)}
        </View>
        <View style={styles.flexRowNoBorder}>
          {this.renderPhotoProduct(rowData.dispute_products)}
          {this.iconRightArrow(rowData.dispute_products.length)}
        </View>
      </TouchableOpacity>
    )
  }

  onclick (id) {
    NavigationActions.sellerdetailcomplaintgoods({
      type: ActionConst.PUSH,
      idComplaint: id
    })
  }

  renderRowResolved (rowData, x, y) {
    return (
      <TouchableOpacity onPress={() => this.onclick(rowData.id)} activeOpacity={0.8} key={y} style={styles.containerList}>
        <View style={styles.flexRowBorder}>
          <Text style={styles.textSemiBoldGrey}>{rowData.user.name}</Text>
          {this.checkAmountComplain(rowData.dispute_products.length)}
        </View>
        <View style={styles.flexRowNoBorder}>
          {this.renderPhotoProduct(rowData.dispute_products)}
          {this.iconRightArrow(rowData.dispute_products.length)}
        </View>
      </TouchableOpacity>
    )
  }

  render () {
    if (this.submitting.unresolvedComplain && this.submitting.resolvedComplain) {
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
          style={{backgroundColor: 'transparent'}}
          tabBarBackgroundColor={Colors.red}
          tabBarActiveTextColor={Colors.snow}
          tabBarUnderlineStyle={{ backgroundColor: Colors.snow, height: 2 }}
          tabBarInactiveTextColor={Colors.snow}
          tabBarTextStyle={styles.textTab}
          locked
        >
          <View tabLabel='Menunggu' ref='waiting'>
            <View style={styles.header}>
              <Text style={styles.regularSlate}>Berikut adalah daftar pembelian yang terdapat barang bermasalah di dalamnya</Text>
            </View>
            <ListView
              dataSource={this.dataSource.cloneWithRows(this.state.listUnresolvedComplain)}
              renderRow={this.renderRowUnresolved.bind(this)}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.isRefreshingUnresolve}
                  onRefresh={this.refreshUnresolve}
                  tintColor={Colors.red}
                  colors={[Colors.red, Colors.bluesky, Colors.green, Colors.orange]}
                  title='Loading...'
                  titleColor={Colors.red}
                  progressBackgroundColor={Colors.snow}
                />
              }
              onEndReached={this.loadMoreUnresolve.bind(this)}
              renderFooter={() => {
                if (this.state.loadmoreUnresolve) {
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
          <View tabLabel='Terselesaikan' ref='done'>
            <ListView
              dataSource={this.dataSource.cloneWithRows(this.state.listResolvedComplain)}
              renderRow={this.renderRowResolved.bind(this)}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.isRefreshingResolve}
                  onRefresh={this.refreshResolve}
                  tintColor={Colors.red}
                  colors={[Colors.red, Colors.bluesky, Colors.green, Colors.orange]}
                  title='Loading...'
                  titleColor={Colors.red}
                  progressBackgroundColor={Colors.snow}
                />
              }
              onEndReached={this.loadMoreResolve.bind(this)}
              renderFooter={() => {
                if (this.state.loadmoreResolve) {
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
  propsUnresolvedCompaint: state.sellerComplainedOrders,
  propsResolvedCompaint: state.sellerComplainedOrders2
})

const mapDispatchToProps = (dispatch) => ({
  getProfile: () => dispatch(loginaction.getProfile()),
  getListUnresolvedComplaintSeller: (page, param) => dispatch(salesAction.getComplainedOrdersSeller({page: page, is_resolved: param})),
  getListResolvedComplaintSeller: (page, param) => dispatch(salesAction.getComplainedOrdersSeller2({page: page, is_resolved: param}))
})

export default connect(mapStateToProps, mapDispatchToProps)(SellerListComplaintsGoods)
