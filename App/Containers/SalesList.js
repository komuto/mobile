import React from 'react'
import {
  ScrollView,
  Text,
  Image,
  View,
  TouchableOpacity,
  ListView,
  BackAndroid,
  ActivityIndicator
} from 'react-native'
import { connect } from 'react-redux'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import moment from 'moment'
import { MaskService } from 'react-native-masked-text'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/SalesListStyle'
import { Images, Fonts, Colors } from '../Themes'

class SalesList extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      loading: false,
      tabViewStyle: {
        backgroundColor: 'transparent'
      },
      dataRead: [
        {'userOrder': 'Test biasa', 'date': 1505088000, 'type': 1, 'isDropship': false, 'isWholeSale': false, 'status': 1, 'origin': '', 'productOrder': 'Sepatu Nike Casual Brown', 'price': 250000, photo: [{'name': Images.contohproduct}, {'name': Images.contohproduct}, {'name': Images.contohproduct}, {'name': Images.contohproduct}, {'name': Images.contohproduct}, {'name': Images.contohproduct}, {'name': Images.contohproduct}, {'name': Images.contohproduct}, {'name': Images.contohproduct}, {'name': Images.contohproduct}]},
        {'userOrder': 'Test dropship', 'date': 1505088000, 'type': 1, 'isDropship': true, 'isWholeSale': false, 'status': 3, 'origin': '', 'productOrder': 'Sepatu Nike Casual Brown', 'price': 250000, photo: [{'name': Images.contohproduct}, {'name': Images.contohproduct}, {'name': Images.contohproduct}, {'name': Images.contohproduct}, {'name': Images.contohproduct}, {'name': Images.contohproduct}, {'name': Images.contohproduct}]}
      ],
      dataUnread: [
        {'userOrder': 'lolo', 'date': 1505088000, 'type': 2, 'isDropship': false, 'isWholeSale': true, 'status': 1, 'origin': '', 'productOrder': 'Sepatu Nike Casual Brown', 'price': 250000, photo: [{'name': Images.contohproduct}, {'name': Images.contohproduct}]},
        {'userOrder': 'lolo', 'date': 1505088000, 'type': 2, 'isDropship': false, 'isWholeSale': false, 'status': 2, 'origin': 'mamba', 'productOrder': 'Sepatu Nike Casual Brown', 'price': 250000, photo: [{'name': Images.contohproduct}]}
      ],
      dataDropship: [
        {'userOrder': 'lolo', 'date': 1505088000, 'type': 3, 'isDropship': false, 'isWholeSale': false, 'status': 1, 'origin': '', 'productOrder': 'Sepatu Nike Casual Brown', 'price': 250000, photo: [{'name': Images.contohproduct}, {'name': Images.contohproduct}]},
        {'userOrder': 'lolo', 'date': 1505088000, 'type': 3, 'isDropship': false, 'isWholeSale': false, 'status': 2, 'origin': 'mamba', 'productOrder': 'Sepatu Nike Casual Brown', 'price': 250000, photo: [{'name': Images.contohproduct}]},
        {'userOrder': 'Test dropship', 'date': 1505088000, 'type': 3, 'isDropship': true, 'isWholeSale': false, 'status': 3, 'origin': '', 'productOrder': 'Sepatu Nike Casual Brown', 'price': 250000, photo: [{'name': Images.contohproduct}, {'name': Images.contohproduct}, {'name': Images.contohproduct}, {'name': Images.contohproduct}, {'name': Images.contohproduct}, {'name': Images.contohproduct}, {'name': Images.contohproduct}]}
      ]
    }
  }

  componentWillReceiveProps (nextProps) {
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
            <View style={[styles.laberDropShipping, {backgroundColor: Colors.whiteThree}]}>
              <Text style={[styles.textDropShipping, {color: Colors.lightgrey}]}>
                Terjual oleh Reseller
              </Text>
            </View>
            <View style={[styles.triangleLabel, {backgroundColor: Colors.whiteThree}]} />
          </View>
        </View>
      )
    } else {
      <View />
    }
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
    if (data === 1) {
      return (
        <View style={[styles.containerOrder, {borderTopColor: Colors.silver, borderTopWidth: 0.5}]}>
          <View style={[styles.round, {backgroundColor: Colors.darkMint}]} />
          <Text style={[styles.labelTextWaitInput, {marginLeft: 8.5}]}>Barang sudah diterima</Text>
        </View>
      )
    } if (data === 2) {
      return (
        <View style={[styles.containerOrder, {borderTopColor: Colors.silver, borderTopWidth: 0.5}]}>
          <View style={[styles.round, {backgroundColor: Colors.bluesky}]} />
          <Text style={[styles.labelTextWaitInput, {marginLeft: 8.5}]}>Menunggu Konfirmasi Pembeli</Text>
        </View>
      )
    } if (data === 3) {
      return (
        <View style={[styles.containerOrder, {borderTopColor: Colors.silver, borderTopWidth: 0.5}]}>
          <View style={[styles.round, {backgroundColor: Colors.pumpkinOrange}]} />
          <Text style={[styles.labelTextWaitInput, {marginLeft: 8.5}]}>Terdapat barang bermasalah</Text>
        </View>
      )
    }
  }

  renderMystuff (rowData, x, y) {
    var timeStampToDate = this.maskedDate(rowData.date)
    var moneyMasked = this.maskedMoney(rowData.price)
    return (
      <TouchableOpacity onPress={() => this.onClickDetailSale(rowData)} style={styles.listOrder}>
        {this.labeldaridropshipper(rowData.isWholeSale, y)}
        <View style={styles.labelOrder}>
          <Text style={styles.labelText}>{rowData.userOrder}</Text>
          <Text style={styles.labelDate}>{timeStampToDate}</Text>
        </View>
        <View style={styles.containerOrder}>
          {this.renderPhoto(rowData.photo)}
          <Text ellipsizeMode={'tail'} numberOfLines={1} style={[styles.labelText, {marginLeft: 5, fontFamily: Fonts.type.regular}]}>{rowData.productOrder}</Text>
          <Text style={styles.labelMoney}>{moneyMasked}</Text>
        </View>
        {this.checkProduct(rowData.status)}
      </TouchableOpacity>
    )
  }

  renderDropshipper (rowData, x, y) {
    var timeStampToDate = this.maskedDate(rowData.date)
    var moneyMasked = this.maskedMoney(rowData.price)
    return (
      <TouchableOpacity onPress={() => this.onClickDetailSale(rowData)} style={styles.listOrder}>
        <View style={styles.labelOrder}>
          <Text style={styles.labelText}>{rowData.userOrder}</Text>
          <Text style={styles.labelDate}>{timeStampToDate}</Text>
        </View>
        <View style={styles.containerOrder}>
          {this.renderPhoto(rowData.photo)}
          <Text ellipsizeMode={'tail'} numberOfLines={1} style={[styles.labelText, {marginLeft: 5, fontFamily: Fonts.type.regular}]}>{rowData.productOrder}</Text>
          <Text style={styles.labelMoney}>{moneyMasked}</Text>
        </View>
        {this.checkProduct(rowData.status)}
      </TouchableOpacity>
    )
  }

  onClickDetailSale (data) {
    NavigationActions.detailsales({
      type: ActionConst.PUSH,
      status: data.status,
      types: data.type,
      isWholeSale: data.isWholeSale
    })
  }

  render () {
    const spinner = this.state.loading
    ? (<View style={styles.spinner}>
      <ActivityIndicator color='#ef5656' size='large' />
    </View>) : (<View />)
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
          <View tabLabel='Barang Saya' ref='myStuff'>
            <ScrollView>
              <Text style={styles.semiBoldSlate}>Belum dilihat</Text>
              <ListView
                dataSource={this.dataSource.cloneWithRows(this.state.dataUnread)}
                renderRow={this.renderMystuff.bind(this)}
                enableEmptySections
              />
              <Text style={styles.semiBoldSlate}>Sudah dilihat</Text>
              <ListView
                dataSource={this.dataSource.cloneWithRows(this.state.dataRead)}
                renderRow={this.renderMystuff.bind(this)}
                enableEmptySections
              />
            </ScrollView>
            {spinner}
          </View>
          <View tabLabel='Dropshipper' ref='dropshipper'>
            <ScrollView>
              <View style={styles.header}>
                <Text style={styles.regularSlate}>Menampilkan penjualan dari barang yang Anda ambil dari Seller lain</Text>
              </View>
              <ListView
                dataSource={this.dataSource.cloneWithRows(this.state.dataDropship)}
                renderRow={this.renderDropshipper.bind(this)}
                enableEmptySections
              />
            </ScrollView>
            {spinner}
          </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(SalesList)
