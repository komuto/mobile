import React from 'react'
import { View, ActivityIndicator, RefreshControl, ScrollView, Text, ListView, Image, TouchableOpacity, ToastAndroid } from 'react-native'
import { connect } from 'react-redux'
import { Colors, Images } from '../Themes'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import * as transactionAction from '../actions/transaction'
import {isFetching, isError, isFound} from '../Services/Status'

// Styles
import styles from './Styles/BuyerComplainDoneStyle'

class BuyerComplainDone extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.submitting = {
      done: false
    }
    this.state = {
      data: [],
      gettingData: true,
      page: 1,
      loadmore: false,
      isRefreshing: true,
      isLoading: true
    }
  }

  componentWillReceiveProps (nextProps) {
    const {dataDispute} = nextProps

    if (!isFetching(dataDispute) && this.submitting.done) {
      this.submitting = { ...this.submitting, done: false }
      if (isError(dataDispute)) {
        ToastAndroid.show(dataDispute.message, ToastAndroid.SHORT)
      }
      if (isFound(dataDispute)) {
        const isFound = dataDispute.orders.length
        if (isFound >= 10) {
          const data = [...this.state.data, ...dataDispute.orders]
          this.setState({
            data: data,
            isLoading: false,
            loadmore: true,
            page: this.state.resolveState + 1,
            isRefreshing: false,
            gettingData: false
          })
        } else {
          const data = [...this.state.data, ...dataDispute.orders]
          this.setState({
            data: data,
            isLoading: true,
            loadmore: false,
            page: 1,
            isRefreshing: false,
            gettingData: false
          })
        }
      }
    }
  }

  componentDidMount () {
    if (!this.submitting.done) {
      this.submitting = {
        ...this.submitting,
        done: true
      }
      this.props.getDisputeList({is_resolved: false, page: 1})
    }
  }

  loadMore = () => {
    const { isLoading, loadmore, page } = this.state
    if (!isLoading) {
      if (loadmore) {
        if (!this.submitting.done) {
          this.submitting = {
            ...this.submitting,
            done: true
          }
          this.props.getDisputeList({is_resolved: false, page: page})
        }
      }
    }
  }

  refresh = () => {
    this.setState({
      data: [],
      loadmore: false,
      page: 1,
      isRefreshing: true,
      gettingData: true
    })
    if (!this.submitting.done) {
      this.submitting = {
        ...this.submitting,
        done: true
      }
      this.props.getDisputeList({is_resolved: false, page: 1})
    }
  }

  listViewComplain (data) {
    return (
      <ListView
        dataSource={this.dataSource.cloneWithRows(this.state.data)}
        renderRow={(rowData) => this.renderRow(rowData)}
        onEndReached={() => this.loadMore()}
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
        style={{flex: 1}}
      />
    )
  }

  renderRow (rowData) {
    const data = rowData.dispute_products
    let renderData
    if (data.length < 5) {
      const image = data.map((data, i) => {
        return (
          <Image key={i} source={{ uri: data.image }} style={styles.imageRowStyle} />
        )
      })
      renderData = (
        <View style={styles.dataSingle}>
          <View style={styles.imageContainer}>
            {image}
          </View>
          <Image source={Images.rightArrow} style={styles.arrow} />
        </View>
      )
    } else {
      const gambar = data.length - 5
      renderData = (
        <View style={styles.dataSingle}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: data[0].image }} style={styles.imageRowStyle} />
            <Image source={{ uri: data[1].image }} style={styles.imageRowStyle} />
            <Image source={{ uri: data[2].image }} style={styles.imageRowStyle} />
            <Image
              source={{ uri: data[3].image }}
              style={styles.imageRowStyle}
              resizeMode='cover'
              borderRadius={7}
            >
              <View style={styles.morePictures}>
                <Text style={[styles.textTitleWhite, { fontSize: 15 }]}>+{gambar}</Text>
              </View>
            </Image>
          </View>
          <Image source={Images.rightArrow} style={styles.arrow} />
        </View>
      )
    }
    let renderCounting = null
    if (rowData.count_unread > 0) {
      renderCounting = (
        <View style={styles.disputeNumber}>
          <Text style={[styles.textTitle, { flex: 1, color: Colors.snow }]}>
            {rowData.count_unread}
          </Text>
        </View>
      )
    }
    return (
      <TouchableOpacity style={styles.rowContainer} onPress={() => this.getDetail(rowData.id)}>
        <View style={styles.storeNameContainer}>
          <Text style={[styles.textTitle, { flex: 1 }]}>
            {rowData.store.name}
          </Text>
          {renderCounting}
        </View>
        {renderData}
      </TouchableOpacity>
    )
  }

  getDetail (id) {
    NavigationActions.buyercomplaindetail({
      type: ActionConst.PUSH
    })
    this.props.getDetailDispute(id)
  }

  renderEmptyState () {
    return (
      <View style={[styles.containerEmpty, {marginTop: 50}]}>
        <Image source={Images.emptyComplain} style={{width: 201, height: 177}} />
        <Text style={styles.textTitleEmpty}>Komplain Barang Anda kosong</Text>
        <Text style={styles.textTitleEmpty2}>Anda belum pernah mengirimkan komplain{'\n'}terkait barang yang Anda beli</Text>
      </View>
    )
  }

  render () {
    const { gettingData, data } = this.state
    let view
    if (!gettingData) {
      if (data.length > 0) {
        view = (this.listViewComplain(data))
      } else {
        view = (this.renderEmptyState())
      }
    } else {
      view = (this.listViewComplain(data))
    }
    return (
      <ScrollView
        style={styles.container}
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
        }>
        {view}
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataDispute: state.buyerComplainedOrders2
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDetailDispute: (id) => dispatch(transactionAction.getComplainedOrderDetailBuyer({id: id})),
    getDisputeList: () => dispatch(transactionAction.getComplainedOrdersBuyer2({ is_resolved: true }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuyerComplainDone)
