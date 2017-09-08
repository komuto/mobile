import React from 'react'
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  ListView,
  RefreshControl,
  ActivityIndicator
} from 'react-native'
import { connect } from 'react-redux'
import moment from 'moment'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import * as storeAction from '../actions/stores'
import * as productAction from '../actions/product'

// Styles
import styles from './Styles/BuyerDiscussionStyle'
import { Colors } from '../Themes/'
class SellerNotificationDiscussion extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      data: [],
      page: 1,
      loadmore: true,
      isRefreshing: false,
      isLoading: false,
      loadingPage: false
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.listDiscussion.status === 200) {
      if (nextProps.listDiscussion.storeDiscussions.length > 0) {
        let data = [...this.state.data, ...nextProps.listDiscussion.storeDiscussions]
        this.setState({
          data: data,
          page: this.state.page + 1,
          isRefreshing: false,
          isLoading: false,
          loadmore: true
        })
      } else {
        this.setState({
          loadmore: false,
          isLoading: false
        })
      }
    }
  }

  loadMore () {
    const { page, loadmore, isLoading } = this.state
    console.log(page)
    if (!isLoading) {
      if (loadmore) {
        this.props.getListDiscussion(page)
      }
    }
  }

  refresh = () => {
    this.setState({ isRefreshing: true, data: [], page: 1, isLoading: true })
    this.props.getListDiscussion(1)
  }

  handelDetailDiscussion (idDiscussion, idProduct, name, image, price) {
    console.log(idProduct)
    this.props.getDetailDiscussion(idDiscussion)
    NavigationActions.detaildiscussionbuyer({
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

  listViewDiscussion () {
    return (
      <ListView
        dataSource={this.dataSource.cloneWithRows(this.state.data)}
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

  render () {
    return (
      <View style={styles.container}>
        <View style={{flex: 1}}>
          {this.listViewDiscussion()}
        </View>
      </View>
    )
  }

}

const mapStateToProps = (state) => ({
  listDiscussion: state.storeDiscussions
})

const mapDispatchToProps = (dispatch) => ({
  getListDiscussion: (page) => dispatch(storeAction.getStoreDiscussions({page: page})),
  getDetailDiscussion: (id) => dispatch(productAction.getComment({id: id}))
})

export default connect(mapStateToProps, mapDispatchToProps)(SellerNotificationDiscussion)
