import React from 'react'
import { ScrollView, View, RefreshControl } from 'react-native'
import { connect } from 'react-redux'
import { Colors } from '../Themes'
import ScrollableTabView from 'react-native-scrollable-tab-view'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import BuyerComplainWaiting from './BuyerComplainWaiting'
import BuyerComplainDone from './BuyerComplainDone'
import * as transactionAction from '../actions/transaction'
// Styles
import styles from './Styles/BuyerComplainStyle'

class BuyerComplain extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      isRefreshing: false
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataDisputeWaiting.status === 200 && nextProps.dataDisputeDone.status === 200) {
      this.setState({
        isRefreshing: false
      })
    }
  }

  refresh = () => {
    this.setState({ isRefreshing: true })
    this.props.getDisputeList()
    this.props.getDisputeListDone()
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollableTabView
          tabBarBackgroundColor={Colors.red}
          tabBarActiveTextColor={Colors.snow}
          tabBarUnderlineStyle={{ backgroundColor: Colors.snow, height: 2 }}
          tabBarInactiveTextColor={Colors.paleGrey}
          tabBarTextStyle={styles.textTab}
          prerenderingSiblingsNumber={2}
          locked
        >
          <ScrollView
            tabLabel='Menunggu'
            ref='waiting'
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
            <BuyerComplainWaiting />
          </ScrollView>
          <ScrollView
            tabLabel='Terselesaikan'
            ref='done'
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
            <BuyerComplainDone />
          </ScrollView>
        </ScrollableTabView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataDisputeWaiting: state.buyerComplainedOrders,
    dataDisputeDone: state.buyerComplainedOrders2
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDisputeList: () => dispatch(transactionAction.getComplainedOrdersBuyer({ is_resolved: false })),
    getDisputeListDone: () => dispatch(transactionAction.getComplainedOrdersBuyer2({ is_resolved: true }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuyerComplain)
