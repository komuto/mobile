import React from 'react'
import { View, TextInput, Text, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Switch from 'react-native-switch-pro'
import CustomRadio from '../Components/CustomRadio'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/StatusStockDropshippingStyle'
import { Colors } from '../Themes/'

class StatusStockDropshipping extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      photoProduct: this.props.photoProduct,
      productName: this.props.productName,
      stock: 0,
      backgroundContainer: this.props.backgroundContainer || Colors.paleGrey,
      actionType: this.props.actionType,
      index: 0,
      label: 'Pria',
      data: [{label: 'Ditampilkan di toko', value: 0}, {label: 'Disembunyikan', value: 1}]
    }
  }

  renderOptionDropshipping () {
    if (this.state.actionType === 'dropshippingAction') {
      return (
        <View>
          <View style={styles.dropshipping}>
            <Text style={styles.textDropshipping}>Dropshipping untuk barang ini</Text>
            <Switch width={34} height={16} circleColor={Colors.teal} backgroundActive={'rgba(0, 148, 133, 0.5)'} />
          </View>
          <TouchableOpacity>
            <Text style={styles.link}>Pelajari Lebih Lanjut tentang dropshipping</Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <View />
      )
    }
  }

  renderStock () {
    if (this.state.actionType === 'stockAction') {
      return (
        <View style={styles.whiteBackground}>
          <View style={styles.containerStock}>
            <Text style={styles.textLabel}>Stock saat ini</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.inputText]}
                multiline
                value={this.state.stock}
                keyboardType='numeric'
                returnKeyType='done'
                autoCorrect={false}
                onChange={(event) => {
                  this.setState({
                    stock: event.nativeEvent.text
                  })
                }}
                underlineColorAndroid='transparent'
                placeholder=''
              />
            </View>
          </View>
        </View>
      )
    } else {
      return (
        <View />
      )
    }
  }

  handlingRadio (index, value) {
    if (value.toLowerCase() === 'pria') {
      this.setState({
        gender: 'male'
      })
    } else {
      this.setState({
        gender: 'female'
      })
    }
  }

  renderDisplayProduct () {
    if (this.state.actionType === 'displayAction') {
      return (
        <View style={styles.containerDisplay}>
          <Text style={[styles.textLabel, {opacity: 100, paddingLeft: 20, paddingBottom: 15}]}>Status Barang ini</Text>
          <View style={styles.containerRadio}>
            <CustomRadio
              data={this.state.data}
              index={this.state.index}
              handlingRadio={(index1, value1) =>
                this.handlingRadio(index1, value1)}
              vertical
            />
          </View>
        </View>
      )
    } else {
      return (
        <View />
      )
    }
  }

  render () {
    return (
      <View style={[styles.container, {backgroundColor: this.state.backgroundContainer}]}>
        <View style={styles.headerProduct}>
          <Image source={this.state.photoProduct} style={styles.image} />
          <Text style={styles.textProduct}>{this.state.productName}</Text>
        </View>
        {this.renderOptionDropshipping()}
        {this.renderStock()}
        {this.renderDisplayProduct()}
        <TouchableOpacity style={[styles.buttonNext]} onPress={() => {}}>
          <Text style={styles.textButtonNext}>
            Simpan Perubahan
          </Text>
        </TouchableOpacity>
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

export default connect(mapStateToProps, mapDispatchToProps)(StatusStockDropshipping)
