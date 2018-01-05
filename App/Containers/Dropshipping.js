import React from 'react'
import { ScrollView, Text, View, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import * as productAction from '../actions/product'

// Styles
import styles from './Styles/TentangDropshippingScreenStyle'
import { Images } from '../Themes'

class Dropshipping extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      marginNavbar: this.props.marginNavbars,
      imageCollapse: '',
      loading: false,
      showContent: '',
      buttonVisible: this.props.visibleButton,
      infoDropshipping: this.props.data || []
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataFaq.status === 200) {
      let data = [...nextProps.dataFaq.faq]
      var i
      for (i = 0; i < nextProps.dataFaq.faq.length; i++) {
        data[i].isChecked = false
      }
      this.setState({
        infoDropshipping: data
      })
    }
  }

  renderInfoDropshipping () {
    const mapInfo = this.state.infoDropshipping.map((data, i) => {
      const img = this.state.infoDropshipping[i].isChecked ? Images.up : Images.down
      return (
        <View key={i} style={styles.containerinfoDropshipping}>
          <View style={styles.containerHeader}>
            <Text style={styles.title}>{data.question}</Text>
            <TouchableOpacity onPress={() => this.changeCheck(i)}>
              <Image source={img} style={{height: 24, width: 24}} />
            </TouchableOpacity>
          </View>
          {this.mapDesc(data.answer, data.isChecked)}
        </View>
      )
    })
    return (
      <View style={{marginBottom: 62}}>
        {mapInfo}
      </View>
    )
  }

  mapDesc (data, isChecked) {
    if (isChecked) {
      return (
        <View style={styles.containerDesc}>
          <Text style={styles.desc}>{data}</Text>
        </View>
      )
    } else {
      return (
        <View />
      )
    }
  }

  changeCheck (i) {
    console.log(i)
    const {infoDropshipping} = this.state
    const newDataSourceOld = infoDropshipping.map(data => {
      data.isChecked = false
      return {...data}
    })
    this.setState({
      infoDropshipping: newDataSourceOld
    })
    if (infoDropshipping[i].isChecked) {
      infoDropshipping[i].isChecked = false
      const newDataSource = infoDropshipping.map(data => {
        return {...data}
      })
      this.setState({
        infoDropshipping: newDataSource
      })
    } else {
      infoDropshipping[i].isChecked = true
      const newDataSource = infoDropshipping.map(data => {
        return {...data}
      })
      this.setState({
        infoDropshipping: newDataSource
      })
    }
  }

  handleDropshipper () {
    NavigationActions.chooseitemdropship({
      type: ActionConst.PUSH,
      loading: true
    })
  }

  button () {
    if (this.state.buttonVisible) {
      return (
        <TouchableOpacity style={[styles.buttonnext]} onPress={() => this.handleDropshipper()}>
          <Text style={styles.textButtonNext}>
            Saya Mengerti, Lanjutkan Proses
          </Text>
        </TouchableOpacity>
      )
    } else {
      <View />
    }
  }

  render () {
    return (
      <View style={[styles.container, {marginTop: this.state.marginNavbar}]}>
        <ScrollView>
          {this.renderInfoDropshipping()}
        </ScrollView>
        {this.button()}
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    dataFaq: state.dropshipfaq
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDropshipper: (dropshipper) => dispatch(productAction.getDropshipProducts({is_dropship: dropshipper}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dropshipping)
