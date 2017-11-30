import React from 'react'
import { View, Text, Image, TouchableOpacity, ToastAndroid } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import * as storeAction from '../actions/stores'
import * as otherAction from '../actions/other'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/TambahProdukScreenStyle'
import { Images, Metrics } from '../Themes/'

class AddProduct extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      commission: ''
    }
  }

  componentWillReceiveProps (nextProps) {
    const { commission } = nextProps
    if (commission.status === 200) {
      this.setState({
        commission: commission.commission.commission
      })
    } else if (commission.status !== 0 && commission.status !== 200) {
      ToastAndroid.show(commission.message, ToastAndroid.SHORT)
      commission.status === 0
    }
  }

  handleUploadProduk () {
    NavigationActions.uploadproductphoto({
      type: ActionConst.PUSH
    })
  }

  handleDropshiper () {
    this.props.getDropshipFaq()
    NavigationActions.dropshipping({
      type: ActionConst.PUSH,
      marginNavbars: Metrics.navBarHeight,
      visibleButton: true
    })
  }

  render () {
    const { commission } = this.state
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Tentukan produk yang akan ditambah</Text>
        <TouchableOpacity onPress={() => this.handleUploadProduk()}>
          <View style={[styles.menu, {marginTop: 15}]}>
            <Image source={Images.uploadPhotoProduk} style={styles.imageMenu} />
            <View style={styles.textMenuCol}>
              <Text style={styles.title}>Upload Produk Baru</Text>
              <Text style={styles.desc}>Tambahkan produk baru untuk dijual</Text>
            </View>
            <Image source={Images.rightArrow} style={styles.imageArrow} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.handleDropshiper()}>
          <View style={styles.menu}>
            <Image source={Images.listProduk} style={styles.imageMenu} />
            <View style={styles.textMenuCol}>
              <Text style={styles.title}>Ambil dari Dropshipper</Text>
              <Text style={styles.desc}>Ambil produk dari dropshipper.{'\n'}Dan Anda akan mendapat komisi.{'\n'}penjualan sebesar {commission}%</Text>
            </View>
            <Image source={Images.rightArrow} style={styles.imageArrow} />
          </View>
        </TouchableOpacity>
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    commission: state.marketplaceCommission
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDropshipFaq: () => dispatch(storeAction.getDropshipperFaq()),
    getMarketplaceCommission: dispatch(otherAction.getMarketPlaceCommission())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct)
