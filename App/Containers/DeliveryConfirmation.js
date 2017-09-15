import React from 'react'
import { View, Text, TouchableOpacity, ListView, BackAndroid, Image, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import moment from 'moment'
import { MaskService } from 'react-native-masked-text'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/DeliveryConfirmationStyle'
import { Images, Fonts, Colors } from '../Themes'

class DeliveryConfirmation extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      data: [
        {'userOrder': 'Test biasa', 'date': 1505088000, 'isDropship': false, 'isWholeSale': false, 'origin': '', 'productOrder': 'Sepatu Nike Casual Brown', 'price': 250000, photo: [{'name': Images.contohproduct}, {'name': Images.contohproduct}, {'name': Images.contohproduct}, {'name': Images.contohproduct}, {'name': Images.contohproduct}, {'name': Images.contohproduct}, {'name': Images.contohproduct}, {'name': Images.contohproduct}, {'name': Images.contohproduct}, {'name': Images.contohproduct}]},
        {'userOrder': 'Test dropship', 'date': 1505088000, 'isDropship': true, 'isWholeSale': false, 'origin': '', 'productOrder': 'Sepatu Nike Casual Brown', 'price': 250000, photo: [{'name': Images.contohproduct}, {'name': Images.contohproduct}, {'name': Images.contohproduct}, {'name': Images.contohproduct}, {'name': Images.contohproduct}, {'name': Images.contohproduct}, {'name': Images.contohproduct}]},
        {'userOrder': 'Test reseler', 'date': 1505088000, 'isDropship': false, 'isWholeSale': true, 'origin': '', 'productOrder': 'Sepatu Nike Casual Brown', 'price': 250000, photo: [{'name': Images.contohproduct}, {'name': Images.contohproduct}, {'name': Images.contohproduct}, {'name': Images.contohproduct}]},
        {'userOrder': 'Test', 'date': 1505088000, 'isDropship': false, 'isWholeSale': false, 'origin': '', 'productOrder': 'Sepatu Nike Casual Brown', 'price': 250000, photo: [{'name': Images.contohproduct}, {'name': Images.contohproduct}]},
        {'userOrder': 'Test', 'date': 1505088000, 'isDropship': false, 'isWholeSale': false, 'origin': 'mamba', 'productOrder': 'Sepatu Nike Casual Brown', 'price': 250000, photo: [{'name': Images.contohproduct}]}
      ]
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

  maskedMoney (value) {
    const priceMasked = MaskService.toMask('money', value, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    return priceMasked
  }

  maskedDate (value) {
    const timeStampToDate = moment.unix(value).format('ddd, DD MMMM YYYY').toString()
    return timeStampToDate
  }

  labeldaridropshipper (data, y) {
    if (data) {
      return (
        <View key={y} style={{marginLeft: 15}}>
          <View style={[styles.flexRow, {marginTop: 10}]}>
            <View style={[styles.laberDropShipping, {backgroundColor: Colors.lightBlueGrey}]}>
              <Text style={[styles.textDropShipping, {color: Colors.darkMintTwo}]}>
                Pesanan Dropshipper
              </Text>
            </View>
            <View style={[styles.triangleLabel, {backgroundColor: Colors.lightBlueGrey}]} />
          </View>
        </View>
      )
    } else {
      <View />
    }
  }

  onClickInputNoResi (data) {
    NavigationActions.inputshippinginfo({
      type: ActionConst.PUSH,
      isDropship: data.isDropship,
      isWholeSale: data.isWholeSale
    })
  }

  renderPhoto (photo) {
    if (photo.length > 4) {
      const mapFoto = photo.slice(0, 4).map((data, i) => {
        if (i === 3) {
          return (
            <View key={i} style={styles.maskedImage}>
              <Image source={data.name} style={styles.image} />
              <View style={styles.placeholder}>
                <Text style={styles.textPlaceHolder}>+{photo.length - 4}</Text>
              </View>
            </View>
          )
        } else {
          return (
            <View key={i} style={styles.maskedImage}>
              <Image source={data.name} style={styles.image} />
            </View>
          )
        }
      })
      return (
        <View style={{flexDirection: 'row'}}>
          {mapFoto}
        </View>
      )
    } else {
      const mapFoto = photo.slice(0, 4).map((data, i) => {
        return (
          <View key={i} style={styles.maskedImage}>
            <Image source={data.name} style={styles.image} />
          </View>
        )
      })
      return (
        <View style={{flexDirection: 'row'}}>
          {mapFoto}
        </View>
      )
    }
  }

  checkProduct (data) {
    if (data.isDropship) {
      return (
        <TouchableOpacity
          style={[styles.containerOrder, {borderTopColor: Colors.silver, borderTopWidth: 0.5}]}
          onPress={() => this.onClickInputNoResi(data)}>
          <Text style={[styles.labelTextWaitInput]}>Menunggu Input No Resi dari Seller</Text>
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity
          style={[styles.containerOrder, {borderTopColor: Colors.silver, borderTopWidth: 0.5}]}
          onPress={() => this.onClickInputNoResi(data)}>
          <Text style={[styles.labelTextInput]}>Masukkan No Resi Pengiriman</Text>
        </TouchableOpacity>
      )
    }
  }

  renderRowOrder (rowData, x, y) {
    var timeStampToDate = this.maskedDate(rowData.date)
    var moneyMasked = this.maskedMoney(rowData.price)
    return (
      <View style={styles.listOrder}>
        {this.labeldaridropshipper(rowData.isDropship, y)}
        <View style={styles.labelOrder}>
          <Text style={styles.labelText}>{rowData.userOrder}</Text>
          <Text style={styles.labelDate}>{timeStampToDate}</Text>
        </View>
        <View style={styles.containerOrder}>
          {this.renderPhoto(rowData.photo)}
          <Text ellipsizeMode={'tail'} numberOfLines={1} style={[styles.labelText, {marginLeft: 5, fontFamily: Fonts.type.regular}]}>{rowData.productOrder}</Text>
          <Text style={styles.labelMoney}>{moneyMasked}</Text>
        </View>
        {this.checkProduct(rowData)}
      </View>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView>
          <ListView
            dataSource={this.dataSource.cloneWithRows(this.state.data)}
            renderRow={this.renderRowOrder.bind(this)}
            enableEmptySections
          />
        </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryConfirmation)
