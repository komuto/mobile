import React from 'react'
import {
  ScrollView,
  Text,
  Image,
  View,
  TextInput,
  ListView,
  BackAndroid,
  ToastAndroid
} from 'react-native'
import { connect } from 'react-redux'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import { Actions as NavigationActions } from 'react-native-router-flux'
import moment from 'moment'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import * as userAction from '../actions/user'

// Styles
import styles from './Styles/BuyerDetailResolutionStyle'
import { Colors } from '../Themes/'

class BuyerDetailResolution extends React.Component {
  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      loading: false,
      tabViewStyle: {
        backgroundColor: 'transparent'
      },
      messages: '',
      discussionSolution: [],
      detailResolution: [],
      complaintMessage: [],
      photoComplaint: [],
      status: 1,
      priority: 1,
      page: this.props.page || 0,
      idResolution: this.props.idResolution
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataDetailResolution.status === 200) {
      this.setState({
        detailResolution: nextProps.dataDetailResolution.resolution,
        status: nextProps.dataDetailResolution.resolution.status,
        priority: nextProps.dataDetailResolution.resolution.priority,
        complaintMessage: nextProps.dataDetailResolution.resolution.discussions[0],
        discussionSolution: nextProps.dataDetailResolution.resolution.discussions,
        photoComplaint: nextProps.dataDetailResolution.resolution.images
      })
      nextProps.dataDetailResolution.status = 0
    } else if (nextProps.dataDetailResolution.status !== 200 && nextProps.dataDetailResolution.status !== 0) {
      ToastAndroid.show(nextProps.dataDetailResolution.message, ToastAndroid.LONG)
      nextProps.dataDetailResolution.status = 0
    }
    if (nextProps.dataReplyResolutions.status === 200) {
      this.props.getDetailResolution(this.state.idResolution)
      nextProps.dataReplyResolutions.status = 0
    } else if (nextProps.dataReplyResolutions.status !== 200 && nextProps.dataReplyResolutions.status !== 0) {
      ToastAndroid.show(nextProps.dataReplyResolutions.message, ToastAndroid.LONG)
      nextProps.dataReplyResolutions.status = 0
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

  renderRowInformation (rowData) {
    return (
      <View style={styles.containerMessage}>
        <View style={styles.maskedPhoto}>
          <Image source={rowData.photoUser} style={styles.photo} />
        </View>
        <View style={{marginLeft: 20, flex: 1}}>
          <View style={styles.flexRow}>
            <Text style={styles.title}>{rowData.name}</Text>
            <Text style={styles.date}>{rowData.created_at}</Text>
          </View>
          <Text style={styles.messageText}>{rowData.message}</Text>
        </View>
      </View>
    )
  }

  checkStatus (data) {
    if (data === 0) {
      return (
        <View style={{
          flexDirection: 'row',
          flex: 1,
          alignItems: 'center'
        }}>
          <View style={{
            height: 15,
            width: 15,
            borderRadius: 200,
            backgroundColor: Colors.greenish
          }} />
          <Text style={styles.textInfoValue}>Dinyatakan selesai oleh admin</Text>
        </View>
      )
    } if (data === 1 || data === 2) {
      return (
        <View style={{
          flexDirection: 'row',
          flex: 1,
          alignItems: 'center'
        }}>
          <View style={{
            height: 15,
            width: 15,
            borderRadius: 200,
            backgroundColor: Colors.red
          }} />
          <Text style={[styles.textInfoValue]}>Menunggu Penyelesaian</Text>
        </View>
      )
    }
  }

  checkPriority (data) {
    if (data === 1) {
      return (
        <Text style={styles.textInfoValue}>Low</Text>
      )
    } if (data === 2) {
      return (
        <Text style={styles.textInfoValue}>Medium</Text>
      )
    } if (data === 3) {
      return (
        <Text style={styles.textInfoValue}>High</Text>
      )
    }
  }

  checkTopic (data) {
    if (data === 1) {
      return (
        <Text style={styles.textStatus}>Umum</Text>
      )
    } if (data === 2) {
      return (
        <Text style={styles.textStatus}>Info</Text>
      )
    } if (data === 3) {
      return (
        <Text style={styles.textStatus}>Transaksi</Text>
      )
    } if (data === 4) {
      return (
        <Text style={styles.textStatus}>Lainnya</Text>
      )
    }
  }

  renderInfo () {
    return (
      <View style={styles.containerInfo}>
        <View style={[styles.row, {borderBottomWidth: 0.5}]}>
          <Text style={styles.textInfo}>Status</Text>
          {this.checkStatus(this.state.status)}
        </View>
        <View style={[styles.row, {borderBottomWidth: 0}]}>
          <Text style={styles.textInfo}>Prioritas</Text>
          {this.checkPriority(this.state.priority)}
        </View>
      </View>
    )
  }

  renderMessageComplaint (data) {
    var timeStampToDate = moment.unix(data.created_at).format('DD MMM YYYY').toString()
    return (
      <View style={styles.tabWaiting}>
        <View style={styles.containerResolution}>
          <Text style={styles.textResolution}>{data.title}</Text>
          <View style={styles.label}>
            {this.checkTopic(data.topic)}
          </View>
        </View>
        <Text style={styles.date2}>{timeStampToDate}</Text>
      </View>
    )
  }

  renderComplaint (data) {
    return (
      <View style={styles.tabWaiting}>
        <Text style={styles.textInfo}>Keluhan</Text>
        <Text style={[styles.textInfoValue, {lineHeight: 23, textAlign: 'left'}]}>{data.message}</Text>
      </View>
    )
  }

  renderPhotoProduct () {
    if (!this.state.photoComplaint) {
      return (
        <View />
      )
    } else {
      const mapFoto = this.state.photoComplaint.map((data, i) => {
        return (
          <View key={i} style={{flexDirection: 'row'}}>
            <View style={[styles.foto, {backgroundColor: Colors.paleGreyFive}]}>
              <Image source={{uri: data.image}} style={styles.imageProduk} />
            </View>
          </View>
        )
      })
      return (
        <View style={{paddingLeft: 20, paddingBottom: 20, backgroundColor: Colors.snow}}>
          <View style={{borderTopColor: Colors.silver, borderTopWidth: 0.5, paddingTop: 20}}>
            <ScrollView horizontal contentContainerStyle={{paddingBottom: 12}}>
              {mapFoto}
            </ScrollView>
          </View>
        </View>
      )
    }
  }

  sendReply () {
    this.setState({messages: ''})
    this.props.replyDiscussion(this.state.idResolution, this.state.messages)
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
          <ScrollView tabLabel='Informasi' ref='information' style={styles.scrollView}>
            {this.renderInfo()}
            {this.renderMessageComplaint(this.state.detailResolution)}
            {this.renderComplaint(this.state.complaintMessage)}
            {this.renderPhotoProduct()}
          </ScrollView>
          <View tabLabel='Diskusi Solusi' ref='discussionSolutions' style={styles.messages}>
            <ScrollView>
              <ListView
                dataSource={this.dataSource.cloneWithRows(this.state.discussionSolution)}
                renderRow={this.renderRowInformation.bind(this)}
                enableEmptySections
              />
            </ScrollView>
            <TextInput
              style={[styles.inputText]}
              value={this.state.messages}
              keyboardType='default'
              returnKeyType='done'
              autoCapitalize='none'
              autoCorrect={false}
              onChange={(event) => {
                this.setState({
                  messages: event.nativeEvent.text
                })
              }}
              onSubmitEditing={() => this.sendReply()}
              underlineColorAndroid='transparent'
              placeholder='Tulis pesan Anda disini'
            />
          </View>
        </ScrollableTabView>
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    dataDetailResolution: state.resolutionDetail,
    dataReplyResolutions: state.replyResolution
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    replyDiscussion: (id, message) => dispatch(userAction.replyResolution({id: id, message: message})),
    getDetailResolution: (id) => dispatch(userAction.getResolutionDetail({id: id}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuyerDetailResolution)
