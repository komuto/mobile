import React from 'react'
import {
  View,
  BackAndroid
} from 'react-native'
import { connect } from 'react-redux'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import { Actions as NavigationActions } from 'react-native-router-flux'
import BuyerMessageConversation from './BuyerMessageConversation'
import BuyerMessageArchive from './BuyerMessageArchive'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import * as messageAction from '../actions/message'

// Styles
import styles from './Styles/BuyerMessageStyle'
import { Colors } from '../Themes/'

class BuyerMessage extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      tabViewStyle: {
        backgroundColor: 'transparent'
      }
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
        >
          <BuyerMessageConversation tabLabel='Percakapan' callbackArchive={this.props.callbackArchive} pesanNotifArchive={this.props.pesanNotifArchive} />
          <BuyerMessageArchive tabLabel='Arsip' callbackConversation={this.props.callbackConversation} pesanNotifConversation={this.props.pesanNotifConversation} />
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
    getListMessages: () => dispatch(messageAction.getBuyerMessages()),
    getListArchiveMessages: () => dispatch(messageAction.getArchiveBuyerMessages())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuyerMessage)
