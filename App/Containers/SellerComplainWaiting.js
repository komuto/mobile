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
import Reactotron from 'reactotron-react-native'

// Styles
import styles from './Styles/SellerComplainWaitingStyle'
import {Colors, Images} from '../Themes'
import { Fonts } from '../../ignite/DevScreens/DevTheme/index';

class SellerComplainWaiting extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.submitting = {
      complain: false,
      fetching: true,
      loadMoreData: false
    }
    this.state = {
      datacomplaint: props.propsUnresolvedCompaint || null,
      complains: [],
      page: 0,
      loadmore: false,
      isRefreshing: true,
      isLoading: false,
      gettingData: true
    }
  }

  componentWillReceiveProps (nextProps) {
    const {propsUnresolvedCompaint} = nextProps

    if (!isFetching(propsUnresolvedCompaint && this.submitting.complain)) {
      this.submitting = { ...this.submitting, complain: false, fetching: false }
      const isFounds = propsUnresolvedCompaint.orders.length
      if (isError(propsUnresolvedCompaint)) {
        ToastAndroid.show(propsUnresolvedCompaint.message, ToastAndroid.SHORT)
      }
      if (isFound(propsUnresolvedCompaint)) {
        if (isFounds >= 10) {
          let data = [...this.state.complains, ...propsUnresolvedCompaint.orders]
          this.setState({
            datacomplaint: propsUnresolvedCompaint,
            complains: data,
            page: this.state.page + 1,
            isRefreshing: false,
            loadmore: true,
            gettingData: false
          })
        } else {
          let data = [...this.state.complains, ...propsUnresolvedCompaint.orders]
          this.setState({
            datacomplaint: propsUnresolvedCompaint,
            complains: data,
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
    Reactotron.log('complain waiting')
    const { complains } = this.state
    if (!complains.isFound || !this.submitting.complain) {
      this.submitting = {
        ...this.submitting,
        complain: true
      }
      this.props.getComplain({page: 1, is_resolved: false})
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
    const { page, loadmore } = this.state
    if (loadmore) {
      this.submitting.complain = true
      this.props.getComplain({page: page, is_resolved: false})
    }
  }

  refresh = () => {
    this.setState({ gettingData: true, isRefreshing: true, complains: [], isLoading: true })
    this.submitting.complain = true
    this.props.getComplain({page: 0, is_resolved: false})
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
    // <Text>{data.name}</Tebt>
    if (products.length > 4) {
      const mapFoto = products.slice(0, 4).map((data, i) => {
        if (i === 3) {
          Reactotron.log('a')
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
          Reactotron.log('b')
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
      Reactotron.log('c')
      const mapFoto = products.slice(0, 4).map((data, i) => {
        return (
          <View key={i} style={styles.containerOrder}>
            <View key={i} style={styles.maskedImage}>
              <Image source={{uri: data.image}} style={styles.image} />
            </View>
            <Text style={{ paddingLeft: 10, fontFamily: Fonts.type.regular, fontSize: Fonts.size.smallMed, flex: 1 }}>{data.name}</Text>
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
      <View>
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
  propsUnresolvedCompaint: state.sellerComplainedOrders
})

const mapDispatchToProps = (dispatch) => ({
  getComplain: (param) => dispatch(salesAction.getComplainedOrdersSeller(param))
})

export default connect(mapStateToProps, mapDispatchToProps)(SellerComplainWaiting)
