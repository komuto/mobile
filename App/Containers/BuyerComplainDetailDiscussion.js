import React from 'react'
import { View, ListView, Image, Text, ScrollView, TextInput, BackAndroid, RefreshControl, ToastAndroid } from 'react-native'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { Colors } from '../Themes'
import * as transactionAction from '../actions/transaction'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/BuyerComplainDetailDiscussionStyle'

class BuyerComplainDetailDiscussion extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      data: [],
      content: '',
      id: '',
      isRefreshing: false
    }
  }

  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
  }

  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
  }

  handleBack = () => {
    if (NavigationActions.pop()) {
      return true
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataComplain.status === 200) {
      this.setState({
        data: nextProps.dataComplain.orderDetail.discussions,
        id: nextProps.dataComplain.orderDetail.id,
        isRefreshing: false
      })
    } else if (nextProps.dataComplain.status !== 200 && nextProps.dataComplain.status !== 0) {
      this.setState({
        data: [],
        id: '',
        isRefreshing: false
      })
      ToastAndroid.show(nextProps.dataComplain.message, ToastAndroid.LONG)
    }
    if (nextProps.dataReply.status === 200) {
      this.refresh()
      this.setState({
        content: ''
      })
      nextProps.dataReply.status = 0
    } else if (nextProps.dataReply.status !== 200 && nextProps.dataReply.status !== 0) {
      ToastAndroid.show(nextProps.dataReply.message, ToastAndroid.LONG)
      nextProps.dataReply.status = 0
    }
  }

  renderRow (rowData) {
    return (
      <View style={styles.rowContainer}>
        <Image source={{ uri: rowData.user.photo }} style={styles.photo} />
        <View style={styles.user}>
          <Text style={styles.userName}>
            {rowData.user.name}
          </Text>
          <Text style={styles.text}>
            {rowData.content}
          </Text>
        </View>
        <Text style={styles.date}>
          {rowData.created_at}
        </Text>
      </View>
    )
  }

  handleComment = (text) => {
    this.setState({ content: text })
  }

  send () {
    const { id, content } = this.state
    this.props.sendComment(id, content)
  }

  refresh = () => {
    this.props.getDetailDispute(this.state.id)
    this.setState({ data: [], isRefreshing: true })
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView
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
          <ListView
            dataSource={this.dataSource.cloneWithRows(this.state.data)}
            renderRow={this.renderRow.bind(this)}
            enableEmptySections
          />
        </ScrollView>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            value={this.state.content}
            keyboardType='default'
            autoCapitalize='none'
            autoCorrect
            blurOnSubmit
            onSubmitEditing={() => this.send()}
            onChangeText={this.handleComment}
            underlineColorAndroid='transparent'
            placeholder='Tulis Komentar'
          />
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataComplain: state.buyerComplainedOrderDetail,
    dataReply: state.buyerComplaintDiscussion
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendComment: (id, content) => dispatch(transactionAction.createComplaintDiscussionBuyer({
      id: id,
      content: content
    })),
    getDetailDispute: (id) => dispatch(transactionAction.getComplainedOrderDetailBuyer({id: id}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuyerComplainDetailDiscussion)
