import React from 'react'
import {
  ScrollView,
  Image,
  View,
  TextInput,
  ListView,
  Text,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import { MaskService } from 'react-native-masked-text'
import { Images } from '../Themes'
import * as wishlistAction from '../actions/wishlist'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/WishlistStyle'

class Wishlist extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      search: '',
      data: []
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataWishlist.status === 200) {
      console.log(nextProps.dataWishlist.wishlist)
    }
  }

  renderRowProduk (rowData) {
    if (rowData.product.discount > 0) {
      this.statusDiskon = true
      this.hargaDiskon = this.discountCalculate(rowData.product.price, rowData.product.discount)
    } else {
      this.statusDiskon = false
      this.hargaDiskon = rowData.product.price
    }

    const totalHarga = MaskService.toMask('money', this.hargaDiskon, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    return (
      <TouchableOpacity style={styles.rowDataContainer} activeOpacity={0.5}>
        <Image source={{ uri: rowData.images[0].file }} style={styles.imageProduct} />
        <View style={styles.containerDiskon}>
          <Text style={styles.diskon}>
            {rowData.product.discount}%
          </Text>
        </View>
        <Text style={styles.textTitleProduct}>
          {rowData.product.name}
        </Text>
        <View style={styles.tokoContainer}>
          <Text style={styles.namaToko}>
            {rowData.store.name}
          </Text>
          {this.renderVerified(rowData.store.remarks_status)}
        </View>
        {this.renderDiskon(this.statusDiskon, rowData.product.price)}
        <Text style={styles.harga}>
          {totalHarga}
        </Text>
        <View style={styles.likesContainer}>
          {this.renderLikes(rowData.like)}
          <Text style={styles.like}>
            {rowData.product.stock}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  render () {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.floatingSearch}>
            <Image source={Images.searchGrey} style={styles.searchImage} />
            <View style={styles.textInputContainer}>
              <TextInput
                ref='search'
                style={styles.inputText}
                value={this.state.search}
                keyboardType='default'
                autoCapitalize='none'
                autoCorrect
                onChangeText={this.handleTextSearch}
                underlineColorAndroid='transparent'
                placeholder='Cari Produk Favorit Anda disini'
              />
            </View>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataWishlist: state.wishlist
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getWishlist: dispatch(wishlistAction.wishlist())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist)
