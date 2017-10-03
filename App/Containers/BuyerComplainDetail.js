import React from 'react'
import { ScrollView, View } from 'react-native'
import { connect } from 'react-redux'
import { Colors } from '../Themes'
import ScrollableTabView from 'react-native-scrollable-tab-view'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import BuyerComplainDetailItem from './BuyerComplainDetailItem'
import BuyerComplainDetailDiscussion from './BuyerComplainDetailDiscussion'

// Styles
import styles from './Styles/BuyerComplainDetailStyle'

class BuyerComplainDetail extends React.Component {

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
          prerenderingSiblingsNumber={2}
          locked
        >
          <ScrollView tabLabel='Detail' ref='detail' style={styles.scrollView}>
            <BuyerComplainDetailItem />
          </ScrollView>
          <ScrollView tabLabel='Diskusi' ref='discussion' style={styles.scrollView}>
            <BuyerComplainDetailDiscussion />
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

export default connect(mapStateToProps, mapDispatchToProps)(BuyerComplainDetail)
