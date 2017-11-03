import React from 'react'
import {
  ScrollView,
  Text,
  Image,
  View,
  TouchableOpacity,
  ListView,
  BackAndroid,
  ActivityIndicator,
  ToastAndroid,
  RefreshControl
} from 'react-native'
import {connect} from 'react-redux'
import {Actions as NavigationActions, ActionConst} from 'react-native-router-flux'
import moment from 'moment'
import {isFetching, isError, isFound} from '../Services/Status'
import Reactotron from 'reactotron-react-native'

// Add Actions - replace 'Your' with whatever your reducer is called :) import
// YourActions from '../Redux/YourRedux'
import * as messageAction from '../actions/message'

// Styles
import styles from './Styles/BuyerMessageStyle'
import {Colors, Images} from '../Themes/'

class BuyerMessageArchive extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.submitting = {
      conversation: false
    }
    this.state = {
      loading: true,
      dataConversation: [],
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
    const {dataMessageArchive, callbackConversation, pesanNotifConversation} = nextProps
    if (callbackConversation !== undefined) {
      if (callbackConversation !== this.state.callback) {
        this.setState({
          callback: callbackConversation,
          messageNotif: pesanNotifConversation,
          notif: true,
          dataConversation: [],
          gettingData: true,
          page: 1
        })
        if (!this.submitting.conversation) {
          this.submitting = {
            ...this.submitting,
            conversation: true
          }
          this.setState({
            callback: false
          })
        }
      }
    }

    if (!isFetching(dataMessageArchive) && this.submitting.conversation) {
      Reactotron.log('CWR Ar')
      this.submitting = { ...this.submitting, conversation: false }
      if (isError(dataMessageArchive)) {
        ToastAndroid.show(dataMessageArchive.message, ToastAndroid.SHORT)
      }
      if (isFound(dataMessageArchive)) {
        const isFound = dataMessageArchive.archiveMessages.length
        if (isFound >= 10) {
          const data = [...this.state.dataConversation, ...dataMessageArchive.archiveMessages]
          this.setState({
            dataConversation: data,
            isLoading: false,
            loadmore: true,
            page: this.state.page + 1,
            isRefreshing: false,
            gettingData: false
          })
        } else {
          const data = [...this.state.dataConversation, ...dataMessageArchive.archiveMessages]
          this.setState({
            dataConversation: data,
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
      this.props.getListMessages({page: 1})
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

  refresh = () => {
    this.setState({ page: 1, gettingData: true, dataConversation: [], isRefreshing: true, loading: true })
    if (!this.submitting.conversation) {
      this.submitting = {
        ...this.submitting,
        conversation: true
      }
      this.props.getListMessages({page: 1})
    }
  }

  loadMore = () => {
    const {isLoading, loadmore, page} = this.state
    if (!isLoading) {
      if (loadmore) {
        if (!this.submitting.conversation) {
          this.submitting = {
            ...this.submitting,
            conversation: true
          }
          this.props.getListMessages({page: page})
        }
      }
    }
  }

  handelDetailMessage (id, typeMessage) {
    this.setState({notif: false})
    NavigationActions.buyerdetailmessage({
      type: ActionConst.PUSH,
      idMessage: id,
      typeMessage: typeMessage,
      callback: false
    })
  }

  notif () {
    if (this.state.notif) {
      return (
        <View style={styles.notif}>
          <Text style={styles.textNotif}>Sukses {this.state.messageNotif}</Text>
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

  renderRowMessage (rowData) {
    var timeStampToDate = moment.unix(rowData.detail_message.created_at).format('DD MMM YYYY').toString()
    return (
      <TouchableOpacity onPress={() => this.handelDetailMessage(rowData.id)}activeOpacity={0.5} style={styles.containerMessage}>
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
        renderRow={(rowData) => this.renderRowMessage(rowData)}
        onEndReached={() => this.loadMore()}
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
      <View style={styles.containerEmpty}>
        <Image source={Images.emptyMessage} style={{width: 173, height: 150}} />
        <Text style={styles.textTitleEmpty}>Belum ada Percakapan</Text>
        <Text style={styles.textTitleEmpty2}>Anda belum pernah melakukan percakapan{'\n'}dengan seller manapun</Text>
      </View>
    )
  }

  render () {
    const { gettingData, dataConversation } = this.state
    let view
    if (!gettingData) {
      if (dataConversation.length > 0) {
        view = (this.renderData(dataConversation))
      } else {
        view = (this.renderEmptyState())
      }
    } else {
      view = (this.renderData(dataConversation))
    }
    return (
      <ScrollView
        contentContainerStyle={{flex: 1}}
        pagingEnabled={false}
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
      >
        {this.notif()}
        {view}
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataMessageArchive: state.archiveBuyerMessages
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getListMessages: (params) => dispatch(messageAction.getArchiveBuyerMessages(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuyerMessageArchive)
