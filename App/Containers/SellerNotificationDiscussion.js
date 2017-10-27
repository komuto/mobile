import React from 'react'
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  ListView,
  RefreshControl,
  ToastAndroid,
  ActivityIndicator
} from 'react-native'
import { connect } from 'react-redux'
import moment from 'moment'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import {isFetching, isError, isFound} from '../Services/Status'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import * as storeAction from '../actions/stores'
import * as productAction from '../actions/product'

// Styles
import styles from './Styles/BuyerDiscussionStyle'
import { Colors, Images } from '../Themes/'
class SellerNotificationDiscussion extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.submitting = {
      discussion: false
    }
    this.state = {
      data: [],
      page: 1,
      loadmore: false,
      isRefreshing: true,
      isLoading: true,
      gettingData: true
    }
  }

  componentDidMount () {
    if (!this.submitting.discussion) {
      this.submitting = {
        ...this.submitting,
        discussion: true
      }
      this.props.getListDiscussion()
    }
  }

  componentWillReceiveProps (nextProps) {
    const {listDiscussion} = nextProps
    if (!isFetching(listDiscussion) && this.submitting.discussion) {
      this.submitting = { ...this.submitting, discussion: false }
      if (isError(listDiscussion)) {
        ToastAndroid.show(listDiscussion.message, ToastAndroid.SHORT)
      }
      if (isFound(listDiscussion)) {
        const isFound = listDiscussion.storeDiscussions.length
        if (isFound >= 10) {
          let data = [...this.state.data, ...listDiscussion.storeDiscussions]
          this.setState({
            data: data,
            isLoading: false,
            loadmore: true,
            page: this.state.page + 1,
            isRefreshing: false,
            gettingData: false
          })
        } else {
          let data = [...this.state.data, ...listDiscussion.storeDiscussions]
          this.setState({
            listMessages: data,
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

  loadMore () {
    const { page, loadmore, isLoading } = this.state
    if (!isLoading) {
      if (loadmore) {
        if (!this.submitting.discussion) {
          this.submitting = {
            ...this.submitting,
            discussion: true
          }
          this.props.getListDiscussion({page: page})
        }
      }
    }
  }

  refresh = () => {
    this.setState({ isRefreshing: true, data: [], page: 1, isLoading: true })
    if (!this.submitting.discussion) {
      this.submitting = {
        ...this.submitting,
        discussion: true
      }
      this.props.getListDiscussion({page: 1})
    }
  }

  handelDetailDiscussion (idDiscussion, idProduct, name, image, price) {
    this.props.getDetailDiscussion(idDiscussion)
    NavigationActions.buyerdetaildiscussion({
      type: ActionConst.PUSH,
      idProduct: idProduct,
      idDiscussion: idDiscussion,
      nameProduct: name,
      imageProduct: image,
      priceProduct: price
    })
  }

  renderRowDiscussion (rowData) {
    var timeStampToDate = moment.unix(rowData.created_at).format('DD MMM YYYY - HH:MM').toString()
    return (
      <TouchableOpacity onPress={() => this.handelDetailDiscussion(rowData.id, rowData.product.id, rowData.product.name, rowData.product.image, rowData.product.price)} activeOpacity={0.5} style={styles.containerMessage}>
        <Image source={{uri: rowData.product.image}} style={styles.photo} />
        <View style={styles.border}>
          <View style={styles.flexRow}>
            <Text style={styles.title}>{rowData.product.name}</Text>
            <Text style={styles.date}>{timeStampToDate}</Text>
          </View>
          <Text style={styles.messageText}>{rowData.question}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  listViewDiscussion (data) {
    return (
      <ListView
        dataSource={this.dataSource.cloneWithRows(data)}
        renderRow={this.renderRowDiscussion.bind(this)}
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
        style={styles.listView}
      />
    )
  }

  renderEmptyState () {
    return (
      <View style={[styles.containerEmpty, {marginTop: 100}]}>
        <Image source={Images.emptyDiscussion} style={{width: 173, height: 178}} />
        <Text style={styles.textTitleEmpty}>Diskusi Produk Anda Kosong</Text>
        <Text style={styles.textTitleEmpty2}>Anda belum pernah melakukan tanya jawab{'\n'}kepada penjual untuk produk apapun</Text>
      </View>
    )
  }

  render () {
    const { gettingData, data } = this.state
    let view
    if (!gettingData) {
      if (data.length > 0) {
        view = (this.listViewDiscussion(data))
      } else {
        view = (this.renderEmptyState())
      }
    } else {
      view = (this.listViewDiscussion(data))
    }
    return (
      <View style={styles.container}>
        {view}
      </View>
    )
  }

}

const mapStateToProps = (state) => ({
  listDiscussion: state.storeDiscussions
})

const mapDispatchToProps = (dispatch) => ({
  getListDiscussion: (params) => dispatch(storeAction.getStoreDiscussions(params)),
  getDetailDiscussion: (id) => dispatch(productAction.getComment({id: id}))
})

export default connect(mapStateToProps, mapDispatchToProps)(SellerNotificationDiscussion)
