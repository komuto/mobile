import React from 'react'
import {
  View,
  ScrollView
} from 'react-native'
import {connect} from 'react-redux'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import SellerComplainDetailItem from './SellerComplainDetailItem'
import SellerComplainDiscussion from './SellerComplainDiscussion'

import styles from './Styles/SellerDetailComplaintsGoodsStyle'
import {Colors} from '../Themes'

class SellerComplainDetail extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      idComplain: this.props.idComplain
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollableTabView
          prerenderingSiblingsNumber={2}
          style={{backgroundColor: 'transparent'}}
          tabBarBackgroundColor={Colors.red}
          tabBarActiveTextColor={Colors.snow}
          tabBarUnderlineStyle={{ backgroundColor: Colors.snow, height: 2 }}
          tabBarInactiveTextColor={Colors.snow}
          tabBarTextStyle={styles.textTab}
          locked
        >
          <ScrollView tabLabel='Detail'>
            <SellerComplainDetailItem idComplain={this.state.idComplain} />
          </ScrollView>
          <View tabLabel='Diskusi'ref='discussion' idComplain={this.state.idComplain}
            style={{flex: 1, flexDirection: 'column', backgroundColor: Colors.snow}} >
            <SellerComplainDiscussion />
          </View>
        </ScrollableTabView>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
})
const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(SellerComplainDetail)
