import React from 'react'
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  ListView,
  BackAndroid,
  ToastAndroid,
  RefreshControl,
  ActivityIndicator
} from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import moment from 'moment'
import {isFetching, isError, isFound} from '../Services/Status'
import Reactotron from 'reactotron-react-native'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import * as messageAction from '../actions/message'

// Styles
import styles from './Styles/BuyerMessageStyle'
import { Colors, Images } from '../Themes/'

class SellerMessageConversation extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.submitting = {
      conversation: false
    }
    this.state = {
      listMessages: [],
      page: 1,
      loadmore: false,
      isRefreshing: true,
      isLoading: true,
      callback: false,
      notif: false,
      messageNotif: '',
      gettingData: true
    }
  }

  componentWillReceiveProps (nextProps) {
    const {dataMessage, callbackArchive, pesanNotifArchive} = nextProps
    if (callbackArchive !== undefined) {
      if (callbackArchive !== this.state.callback) {
        // this.refresh()
        this.setState({
          callback: callbackArchive,
          messageNotif: pesanNotifArchive,
          notif: true
        })
      }
    }

    if (!isFetching(dataMessage) && this.submitting.conversation) {
      Reactotron.log('CWR')
      this.submitting = { ...this.submitting, conversation: false }
      if (isError(dataMessage)) {
        ToastAndroid.show(dataMessage.message, ToastAndroid.SHORT)
      }
      if (isFound(dataMessage)) {
        const isFound = dataMessage.sellerMessages.length
        if (isFound >= 10) {
          const data = [...this.state.listMessages, ...dataMessage.sellerMessages]
          this.setState({
            listMessages: data,
            isLoading: false,
            loadmore: true,
            page: this.state.page + 1,
            isRefreshing: false,
            gettingData: false
          })
        } else {
          const data = [...this.state.listMessages, ...dataMessage.sellerMessages]
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

  componentDidMount () {
    if (!this.submitting.conversation) {
      this.submitting = {
        ...this.submitting,
        conversation: true
      }
      this.props.getListMessages()
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

  loadMore = () => {
    // Reactotron.log('load conversation')
    const {isLoading, loadmore, page} = this.state
    if (!isLoading) {
      if (loadmore) {
        this.submitting.conversation = true
        this.props.getListMessages({page: page})
      }
    }
  }

  refresh = () => {
    this.setState({ isRefreshing: true, gettingData: true, listMessages: [], page: 1, isLoading: true })
    Reactotron.log('refresh conversation')
    if (!this.submitting.conversation) {
      this.submitting = {
        ...this.submitting,
        conversation: true
      }
      this.props.getListMessages()
    }
  }

  handelDetailMessage (id) {
    // this.setState({listMessages: [], gettingData: true})
    NavigationActions.sellernotificationmessagedetail({
      type: ActionConst.PUSH,
      idMessage: id,
      callback: this.state.callback
    })
  }

  renderRowMessage (rowData) {
    var timeStampToDate = moment.unix(rowData.detail_message.created_at).format('DD MMM YYYY').toString()
    return (
      <TouchableOpacity onPress={() => this.handelDetailMessage(rowData.id, 'conversation')}activeOpacity={0.5} style={styles.containerMessage}>
        <View style={styles.maskedPhoto}>
          <Image source={{uri: rowData.store.logo}} style={styles.photo} />
        </View>
        <View style={{marginLeft: 20, flex: 1}}>
          <View style={styles.flexRow}>
            <Text style={styles.title}>{rowData.subject}</Text>
            <Text style={styles.date}>{timeStampToDate}</Text>
          </View>
          <Text style={styles.storesText}>{rowData.store.name}</Text>
          <Text style={styles.messageText}>{rowData.detail_message.content}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  notif () {
    if (this.state.notif) {
      return (
        <View style={styles.notif}>
          <Text style={styles.textNotif}>{this.state.messageNotif}</Text>
          <TouchableOpacity onPress={() => this.setState({notif: false})}>
            <Image source={Images.closeGreen} style={styles.image} />
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <View />
      )
    }
  }

  renderData (data) {
    return (
      <ListView
        dataSource={this.dataSource.cloneWithRows(data)}
        renderRow={this.renderRowMessage.bind(this)}
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
                style={[styles.loadingStyle, { height: 60 }]}
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
        <Image source={Images.emptyMessage} style={{width: 173, height: 150}} />
        <Text style={styles.textTitleEmpty}>Tidak ada Percakapan</Text>
        <Text style={styles.textTitleEmpty2}>Anda belum pernah melakukan percakapan{'\n'}dengan seller manapun</Text>
      </View>
    )
  }

  render () {
    const { gettingData, listMessages } = this.state
    let view
    if (!gettingData) {
      if (listMessages.length > 0) {
        view = (this.renderData(listMessages))
      } else {
        view = (this.renderEmptyState())
      }
    } else {
      view = (this.renderData(listMessages))
    }
    return (
      <View>
        {this.notif()}
        {view}
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  dataMessage: state.sellerMessages
})

const mapDispatchToProps = (dispatch) => {
  return {
    getListMessages: (params) => dispatch(messageAction.getSellerMessages(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SellerMessageConversation)
