import React from 'react'
import {
  ScrollView,
  Text,
  Image,
  View,
  TouchableOpacity,
  ListView,
  BackAndroid
} from 'react-native'
import { connect } from 'react-redux'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import moment from 'moment'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import * as messageAction from '../actions/message'

// Styles
import styles from './Styles/MessagesBuyerScreenStyle'
import { Colors, Images } from '../Themes/'

class SellerNotificationMessage extends React.Component {

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
      page: this.props.page
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataMessage.status === 200) {
      this.setState({
        dataConversation: nextProps.dataMessage.sellerMessages
      })
      nextProps.dataMessage.status = 0
    } if (nextProps.dataArchiveMessage.status === 200) {
      this.setState({
        dataArchive: nextProps.dataArchiveMessage.archiveMessages
      })
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
    NavigationActions.sellernotificationmessagedetail({
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

  fileView () {
  }

  render () {
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
          <ScrollView tabLabel='Percakapan' ref='conversation' style={styles.scrollView}>
            {this.notif()}
            <ListView
              dataSource={this.dataSource.cloneWithRows(this.state.dataConversation)}
              renderRow={this.renderRowMessage.bind(this)}
              enableEmptySections
            />
          </ScrollView>
          <ScrollView tabLabel='Arsip' ref='files' style={styles.scrollView}>
            {this.notif()}
            <ListView
              dataSource={this.dataSource.cloneWithRows(this.state.dataArchive)}
              renderRow={this.renderRowMessage.bind(this)}
              enableEmptySections
            />
          </ScrollView>
        </ScrollableTabView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataMessage: state.sellerMessages,
    dataArchiveMessage: state.archiveSellerMessages
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDetailMessage: (id) => dispatch(messageAction.getSellerDetailMessage({id}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SellerNotificationMessage)
