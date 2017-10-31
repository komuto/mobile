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

class SellerMessageArchive extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.submitting = {
      archive: false
    }
    this.state = {
      dataArchive: [],
      page: 1,
      loadmore: false,
      isRefreshing: true,
      isLoading: true,
      callback: false,
      gettingData: true,
      notif: false,
      messageNotif: ''
    }
    moment.locale('id')
  }

  componentWillReceiveProps (nextProps) {
    const {dataArchiveMessage, callbackConversation, pesanNotifConversation} = nextProps
    if (callbackConversation !== undefined) {
      if (callbackConversation !== this.state.callback) {
        this.setState({
          callback: callbackConversation,
          messageNotif: pesanNotifConversation,
          notif: true
        })
        // this.refresh()
      }
    }

    if (!isFetching(dataArchiveMessage) && this.submitting.archive) {
      this.submitting = { ...this.submitting, archive: false }
      if (isError(dataArchiveMessage)) {
        ToastAndroid.show(dataArchiveMessage.message, ToastAndroid.SHORT)
      }
      if (isFound(dataArchiveMessage)) {
        const isFound = dataArchiveMessage.archiveMessages.length
        if (isFound >= 10) {
          const data = [...this.state.dataArchive, ...dataArchiveMessage.archiveMessages]
          this.setState({
            dataArchive: data,
            isLoading: false,
            loadmore: true,
            page: this.state.page + 1,
            isRefreshing: false,
            gettingData: false
          })
        } else {
          const data = [...this.state.dataArchive, ...dataArchiveMessage.archiveMessages]
          this.setState({
            dataArchive: data,
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
    if (!this.submitting.archive) {
      this.submitting = {
        ...this.submitting,
        archive: true
      }
      this.props.getListArchiveMessages({is_archived: true})
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
    const {isLoading, loadmore, page} = this.state
    if (!isLoading) {
      if (loadmore) {
        this.submitting.archive = true
        this.props.getListArchiveMessages({page: page, is_archived: true})
      }
    }
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

  refresh = () => {
    this.setState({ isRefreshing: true, gettingData: true, dataArchive: [], page: 1, isLoading: true })
    if (!this.submitting.archive) {
      this.submitting = {
        ...this.submitting,
        archive: true
      }
      Reactotron.log('archive refresh')
      this.props.getListArchiveMessages({page: 1, is_archived: true})
    }
  }

  handelDetailMessage (id) {
    NavigationActions.sellernotificationmessagedetail({
      type: ActionConst.PUSH,
      idMessage: id,
      callback: this.state.callback
    })
  }

  renderRowMessage (rowData) {
    var timeStampToDate = moment.unix(rowData.detail_message.created_at).format('DD MMM YYYY').toString()
    return (
      <TouchableOpacity onPress={() => this.handelDetailMessage(rowData.id, 'archive')}activeOpacity={0.5} style={styles.containerMessage}>
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
        <Text style={styles.textTitleEmpty}>Tidak ada Arsip</Text>
        <Text style={styles.textTitleEmpty2}>Anda belum pernah melakukan percakapan{'\n'}dengan seller manapun</Text>
      </View>
    )
  }

  render () {
    const { gettingData, dataArchive } = this.state
    let view
    if (!gettingData) {
      if (dataArchive.length > 0) {
        view = (this.renderData(dataArchive))
      } else {
        view = (this.renderEmptyState())
      }
    } else {
      view = (this.renderData(dataArchive))
    }
    return (
      <View>
        {this.notif()}
        {view}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataArchiveMessage: state.archiveSellerMessages
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getListArchiveMessages: (params) => dispatch(messageAction.getArchiveSellerMessages(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SellerMessageArchive)
