import React from 'react'
import { Text, View, Image, ListView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import StarRating from 'react-native-star-rating'
import { Images, Colors } from '../Themes'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import * as produkAction from '../actions/product'

// Styles
import styles from './Styles/ReviewBuyerScreenStyle'

class ReviewBuyerScreenScreen extends React.Component {
  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      id: this.props.id,
      data: [
        {
          'id': 0, 'photoProduct': 'https://komutodev.aptmi.com/uploads/produk/8011774ba21b8cc99a20583008bc07e43d19bdc1_klepon1.jpg', 'storeName': 'bahagia1', 'productName': 'Sepatu balap', 'accuracy': 4, 'quality': 4, 'photoUser': 'https://www.juptr.io/images/default-user.png', 'review': 'lalalalalalalalalalalal'
        },
        {
          'id': 0, 'photoProduct': 'https://komutodev.aptmi.com/uploads/produk/8011774ba21b8cc99a20583008bc07e43d19bdc1_klepon1.jpg', 'storeName': 'bahagia1', 'productName': 'Sepatu balap', 'accuracy': 4, 'quality': 4, 'photoUser': 'https://www.juptr.io/images/default-user.png', 'review': 'lalalalalalalalalalalal'
        },
        {
          'id': 0, 'photoProduct': 'https://komutodev.aptmi.com/uploads/produk/8011774ba21b8cc99a20583008bc07e43d19bdc1_klepon1.jpg', 'storeName': 'bahagia1', 'productName': 'Sepatu balap', 'accuracy': 4, 'quality': 4, 'photoUser': 'https://www.juptr.io/images/default-user.png', 'review': 'lalalalalalalalalalalal'
        },
        {
          'id': 0, 'photoProduct': 'https://komutodev.aptmi.com/uploads/produk/8011774ba21b8cc99a20583008bc07e43d19bdc1_klepon1.jpg', 'storeName': 'bahagia1', 'productName': 'Sepatu balap', 'accuracy': 4, 'quality': 4, 'photoUser': 'https://www.juptr.io/images/default-user.png', 'review': 'lalalalalalalalalalalal'
        },
        {
          'id': 0, 'photoProduct': 'https://komutodev.aptmi.com/uploads/produk/8011774ba21b8cc99a20583008bc07e43d19bdc1_klepon1.jpg', 'storeName': 'bahagia1', 'productName': 'Sepatu balap', 'accuracy': 4, 'quality': 4, 'photoUser': 'https://www.juptr.io/images/default-user.png', 'review': 'lalalalalalalalalalalal'
        }
      ],
      foto: this.props.foto,
      price: this.props.price,
      namaToko: this.props.namaToko,
      page: 1,
      loadmore: true,
      isRefreshing: false,
      isLoading: false
    }
  }

  componentWillReceiveProps (nextProps) {
  //   if (nextProps.dataReview.status === 200) {
  //     if (nextProps.dataReview.reviews.length > 0) {
  //       console.log(nextProps.dataReview.reviews)
  //       let data = [...this.state.data, ...nextProps.dataReview.reviews]
  //       this.setState({
  //         data: data,
  //         page: this.state.page + 1,
  //         isRefreshing: false,
  //         isLoading: false,
  //         loadmore: true
  //       })
  //     } else {
  //       this.setState({
  //         loadmore: false,
  //         isLoading: false
  //       })
  //     }
  //   }
    if (nextProps.dataDetailProduk.status === 200) {
      this.setState({loading: false})
      NavigationActions.detailproduct({
        type: ActionConst.PUSH
      })
    }
  }

  loadMore () {
    const { id, page, loadmore, isLoading } = this.state
    if (!isLoading) {
      if (loadmore) {
        this.props.reviewAction(id, page)
      }
    }
  }

  refresh = () => {
    const { id } = this.state
    this.setState({ isRefreshing: true, data: [], page: 1, isLoading: true })
    this.props.reviewAction(id, 1)
  }

  listViewUlasan () {
    return (
      <ListView
        dataSource={this.dataSource.cloneWithRows(this.state.data)}
        renderRow={this.renderRow.bind(this)}
        enableEmptySections
        style={styles.listView}
      />
    )
  }

  handleDetailProduct () {
    this.props.getDetailProduct(93)
  }

  renderRow (rowData) {
    return (
      <View style={{marginBottom: 20, elevation: 0.1}}>
        <TouchableOpacity style={styles.border} onPress={() => this.handleDetailProduct()}>
          <View style={styles.profile}>
            <Image
              source={{ uri: rowData.photoProduct }}
              style={styles.styleFotoToko}
            />
            <View style={styles.namaContainer}>
              <Text style={styles.textNama}>
                {rowData.productName}
              </Text>
              <Text style={styles.textKelola}>
                {rowData.storeName}
              </Text>
            </View>
            <Image
              source={Images.rightArrow}
              style={styles.styleFoto}
            />
          </View>
        </TouchableOpacity>
        <View>
          {this.renderRatingUlasan(rowData.accuracy, rowData.quality, rowData.review)}
        </View>
      </View>
    )
  }

  renderRatingUlasan (starAccurate, starQuantity, isiulasan) {
    return (
      <View style={{backgroundColor: Colors.snow}}>
        <View style={styles.qualityNoBorderContainer}>
          <View style={styles.eachQualiy}>
            <Text style={[styles.qualityText]}> Kualitas Produk </Text>
            <View style={{flexDirection: 'row'}}>
              <View style={{paddingTop: 4, marginLeft: 3}}>
                <StarRating
                  disabled
                  maxStars={5}
                  starColor={'#ffcd00'}
                  emptyStarColor={'#d9e1e9'}
                  starSize={16}
                  rating={starQuantity}
                />
              </View>
            </View>
          </View>
          <View style={styles.separator} />
          <View style={[styles.eachQualiy]}>
            <Text style={styles.qualityText}> Akurasi Produk </Text>
            <View style={{flexDirection: 'row'}}>
              <View style={{paddingTop: 4, marginLeft: 3}}>
                <StarRating
                  disabled
                  maxStars={5}
                  starColor={'#ffcd00'}
                  emptyStarColor={'#d9e1e9'}
                  starSize={16}
                  rating={starAccurate}
                />
              </View>
            </View>
          </View>
        </View>
        <Text style={styles.isiUlasan}>{isiulasan}</Text>
      </View>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={[styles.ulasanContainer]}>
          {this.listViewUlasan()}
        </View>
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    dataDetailProduk: state.productDetail
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDetailProduct: (id) => dispatch(produkAction.getProduct({id: id}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewBuyerScreenScreen)
