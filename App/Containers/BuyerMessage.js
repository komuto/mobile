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
import { connect } from 'react-redux'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import moment from 'moment'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import * as messageAction from '../actions/message'

// Styles
import styles from './Styles/BuyerMessageStyle'
import { Colors, Images } from '../Themes/'

class BuyerMessage extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      loading: true,
      tabViewStyle: {
        backgroundColor: 'transparent'
      },
      dataConversation: [],
      dataArchive: [],
      notif: this.props.notif,
      messageNotif: this.props.messageNotif,
      page: this.props.page,
      isRefreshing: false
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataMessage.status === 200 && nextProps.dataArchiveMessage.status === 200) {
      this.setState({
        dataConversation: nextProps.dataMessage.buyerMessages,
        dataArchive: nextProps.dataArchiveMessage.archiveMessages,
        isRefreshing: false,
        loading: false
      })
      nextProps.dataMessage.status = 0
      nextProps.dataArchiveMessage.status = 0
    } else if (nextProps.dataMessage.status !== 200 && nextProps.dataMessage.status !== 0) {
      this.setState({
        isRefreshing: false,
        loading: false
      })
      ToastAndroid.show(nextProps.dataMessage.message, ToastAndroid.LONG)
      nextProps.dataMessage.status = 0
      nextProps.dataArchiveMessage.status = 0
    }
  }

  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
  }

  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
  }

  handleBack = () => {
    NavigationActions.pop()
    return true
  }

  handelDetailMessage (id, typeMessage) {
    this.props.getDetailMessage(id)
    NavigationActions.buyerdetailmessage({
      type: ActionConst.PUSH,
      idMessage: id,
      typeMessage: typeMessage
    })
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

  checkStateMessage (data) {
    if (this.state.loading) {
      return (
        <View style={styles.containerLoading} />
      )
    } else {
      if (data.length > 0) {
        return (
          <ListView
            dataSource={this.dataSource.cloneWithRows(data)}
            renderRow={this.renderRowMessage.bind(this)}
            enableEmptySections
          />
        )
      } else {
        return (
          <View style={styles.containerEmpty}>
            <Image source={Images.emptyMessage} style={{width: 173, height: 150}} />
            <Text style={styles.textTitleEmpty}>Belum ada Percakapan</Text>
            <Text style={styles.textTitleEmpty2}>Anda belum pernah melakukan percakapan{'\n'}dengan seller manapun</Text>
          </View>
        )
      }
    }
  }

  checkStateArchive (data) {
    if (this.state.loading) {
      return (
        <View style={styles.containerLoading} />
      )
    } else {
      if (data.length > 0) {
        return (
          <ListView
            dataSource={this.dataSource.cloneWithRows(data)}
            renderRow={this.renderRowMessage.bind(this)}
            enableEmptySections
          />
        )
      } else {
        return (
          <View style={styles.containerEmpty}>
            <Image source={Images.emptyMessage} style={{width: 173, height: 150}} />
            <Text style={styles.textTitleEmpty}>Tidak ada Arsip</Text>
            <Text style={styles.textTitleEmpty2}>Anda belum pernah melakukan percakapan{'\n'}dengan seller manapun</Text>
          </View>
        )
      }
    }
  }

  refresh = () => {
    this.setState({ isRefreshing: true, loading: true })
    this.props.getListMessages()
    this.props.getListArchiveMessages()
  }

  render () {
    const spinner = this.state.loading
    ? (<View style={styles.spinner}>
      <ActivityIndicator color='#ef5656' size='large' />
    </View>) : (<View />)
    return (
      <View style={styles.container}>
        <ScrollableTabView
          prerenderingSiblingsNumber={2}
          style={this.state.tabViewStyle}
          tabBarBackgroundColor={Colors.red}
          tabBarActiveTextColor={Colors.snow}
          tabBarUnderlineStyle={{ backgroundColor: Colors.snow, height: 2 }}
          tabBarInactiveTextColor={Colors.snow}
          tabBarTextStyle={styles.textTab}
          locked
          initialPage={this.state.page}
        >
          <ScrollView
            tabLabel='Percakapan'
            ref='conversation'
            style={styles.scrollView}
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
            {spinner}
            {this.checkStateMessage(this.state.dataConversation)}
          </ScrollView>
          <ScrollView
            tabLabel='Arsip'
            ref='files'
            style={styles.scrollView}
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
            {spinner}
            {this.checkStateArchive(this.state.dataArchive)}
          </ScrollView>
        </ScrollableTabView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataMessage: state.buyerMessages,
    dataArchiveMessage: state.archiveBuyerMessages
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDetailMessage: (id) => dispatch(messageAction.getBuyerDetailMessage({id})),
    getListMessages: () => dispatch(messageAction.getBuyerMessages()),
    getListArchiveMessages: () => dispatch(messageAction.getArchiveBuyerMessages())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuyerMessage)
