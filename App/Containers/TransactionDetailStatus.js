import React from 'react'
import { ScrollView, View } from 'react-native'
import { connect } from 'react-redux'
import { Colors } from '../Themes'
import ScrollableTabView from 'react-native-scrollable-tab-view'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import TransactionDetailStatusItem from './TransactionDetailStatusItem'
import TransactionDetailStatusPurchase from './TransactionDetailStatusPurchase'
// Styles
import styles from './Styles/TransaksiDetailStatusStyle'

class TransactionDetailStatus extends React.Component {

  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  render () {
    return (
      <View style={styles.container}>
        <ScrollableTabView
          tabBarBackgroundColor={Colors.red}
          tabBarActiveTextColor={Colors.snow}
          tabBarUnderlineStyle={{ backgroundColor: Colors.snow, height: 2 }}
          tabBarInactiveTextColor={Colors.paleGrey}
          tabBarTextStyle={styles.textTab}
          locked
        >
          <ScrollView tabLabel='Status' ref='Barang' style={styles.scrollView}>
            <TransactionDetailStatusItem statusBarang={this.props.statusBarang} />
          </ScrollView>
          <ScrollView tabLabel='Detail Pembelian' ref='Pembelian' style={styles.scrollView}>
            <TransactionDetailStatusPurchase />
          </ScrollView>
        </ScrollableTabView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionDetailStatus)
