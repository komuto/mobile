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
import {connect} from 'react-redux'
import {Actions as NavigationActions, ActionConst} from 'react-native-router-flux'
import {isFetching, isError, isFound} from '../Services/Status'
import * as salesAction from '../actions/transaction'

// Styles
import styles from './Styles/SellerComplainWaitingStyle'
import {Colors, Images} from '../Themes'

class SellerComplainDone extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.submitting = {
      complain: false,
      fetching: true
    }
    this.state = {
      datacomplains: props.propsResolvedCompaint || null,
      complains: [],
      page: 0,
      loadmore: false,
      isRefreshing: true,
      isLoading: false,
      gettingData: true
    }
  }

  componentWillReceiveProps (nextProps) {
    const {propsResolvedCompaint} = nextProps

    if (!isFetching(propsResolvedCompaint && this.submitting.complain)) {
      this.submitting = { ...this.submitting, complain: false, fetching: false }
      if (isError(propsResolvedCompaint)) {
        ToastAndroid.show(propsResolvedCompaint.message, ToastAndroid.SHORT)
      }
      if (isFound(propsResolvedCompaint)) {
        const isFound = propsResolvedCompaint.orders.length
        if (isFound >= 10) {
          let data = [...this.state.complains, ...propsResolvedCompaint.orders]
          this.setState({
            datacomplaint: propsResolvedCompaint,
            complains: data,
            page: this.state.page + 1,
            isRefreshing: false,
            loadmore: true,
            isLoading: false,
            gettingData: false
          })
        } else {
          let data = [...this.state.complains, ...propsResolvedCompaint.orders]
          this.setState({
            datacomplaint: propsResolvedCompaint,
            complains: data,
            isLoading: false,
            isRefreshing: false,
            loadmore: false,
            page: 0,
            gettingData: false
          })
        }
      }
    }
  }

  componentDidMount () {
    const { complains } = this.state
    if (!complains.isFound || !this.submitting.complain) {
      this.submitting = {
        ...this.submitting,
        complain: true
      }
      this.props.getComplain({page: 0, is_resolved: true})
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
        this.submitting.complain = true
        this.props.getComplain({page: page, is_resolved: true})
      }
    }
  }

  refresh = () => {
    this.setState({ gettingData: true, isRefreshing: true, complains: [], isLoading: true })
    this.submitting.complain = true
    this.props.getComplain({page: 1, is_resolved: true})
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
      <TouchableOpacity onPress={() => this.onclick(rowData.id, rowData.count_unread)} activeOpacity={0.8} key={y} style={styles.containerList}>
        <View style={styles.flexRowBorder}>
          <Text style={styles.textSemiBoldGrey}>{rowData.user.name}</Text>
          {this.checkAmountComplain(rowData.count_unread)}
        </View>
        <View style={styles.flexRowNoBorder}>
          {this.renderImageProduct(rowData.dispute_products)}
          {this.iconRightArrow(rowData.dispute_products.length)}
        </View>
      </TouchableOpacity>
    )
  }

  onclick (id, countUnread) {
    NavigationActions.sellercomplaindetail({
      type: ActionConst.PUSH,
      idComplain: id,
      countUnread: countUnread
    })
  }

  listViewComplain (data) {
    return (
      <ListView
        dataSource={this.dataSource.cloneWithRows(data)}
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
          if (this.state.loadMore) {
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

  renderEmptyState () {
    return (
      <View style={[styles.containerEmpty, {marginTop: 100}]}>
        <Image source={Images.emptyComplain} style={{width: 201, height: 177}} />
        <Text style={styles.textTitleEmpty}>Komplain Barang Anda kosong</Text>
        <Text style={styles.textTitleEmpty2}>Anda belum pernah mengirimkan komplain{'\n'}terkait barang yang Anda beli</Text>
      </View>
    )
  }

  render () {
    const { gettingData, complains } = this.state
    let view
    if (!gettingData) {
      if (complains.length > 0) {
        view = (this.listViewComplain(complains))
      } else {
        view = (this.renderEmptyState())
      }
    } else {
      view = (this.listViewComplain(complains))
    }
    return (
      <View style={styles.container}>
        {view}
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  propsResolvedCompaint: state.sellerComplainedOrders2
})

const mapDispatchToProps = (dispatch) => ({
  getComplain: (param) => dispatch(salesAction.getComplainedOrdersSeller2(param))
})

export default connect(mapStateToProps, mapDispatchToProps)(SellerComplainDone)
