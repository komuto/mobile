import React from 'react'
import { Text, View, Image, ListView, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native'
import { connect } from 'react-redux'
import StarRating from 'react-native-star-rating'
import { Images, Colors } from '../Themes'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import * as produkAction from '../actions/product'
import * as reviewAction from '../actions/review'

// Styles
import styles from './Styles/ReviewBuyerScreenStyle'

class SellerNotificationReview extends React.Component {
  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      data: [],
      page: 1,
      loadmore: true,
      isRefreshing: false,
      isLoading: false,
      loadingPage: false
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataReview.status === 200) {
      if (nextProps.dataReview.sellerReview.length > 0) {
        let data = [...this.state.data, ...nextProps.dataReview.sellerReview]
        this.setState({
          data: data,
          page: this.state.page + 1,
          isRefreshing: false,
          isLoading: false,
          loadmore: true
        })
      } else {
        this.setState({
          loadmore: false,
          isLoading: false
        })
      }
    }
    if (nextProps.dataDetailProduk.status === 200) {
      this.setState({loadingPage: false})
      NavigationActions.detailproduct({
        type: ActionConst.PUSH
      })
    }
  }

  loadMore () {
    const { page, loadmore, isLoading } = this.state
    if (!isLoading) {
      if (loadmore) {
        this.props.getListReview(page)
      }
    }
  }

  refresh = () => {
    this.setState({ isRefreshing: true, data: [], page: 1, isLoading: true })
    this.props.getListReview(1)
  }

  listViewUlasan () {
    return (
      <ListView
        dataSource={this.dataSource.cloneWithRows(this.state.data)}
        renderRow={this.renderRow.bind(this)}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this.refresh}
            tintColor={Colors.red}
            colors={[Colors.red, Colors.bluesky, Colors.green, Colors.orange]}
            title='Loading...'
            titleColor={Colors.red}
            progressBackgroundColor={Colors.snow}
          />
        }
        onEndReached={this.loadMore.bind(this)}
        renderFooter={() => {
          if (this.state.loadmore) {
            return (
              <ActivityIndicator
                style={[styles.loadingStyle, { height: 50 }]}
                size='small'
                color='#ef5656'
              />
            )
          }
          return <View />
        }}
        enableEmptySections
        style={styles.listView}
      />
    )
  }

  handleDetailProduct (id) {
    this.setState({loadingPage: true})
    this.props.getDetailProduct(id)
  }

  renderRow (rowData) {
    return (
      <View style={{marginBottom: 20, elevation: 0.1}}>
        <TouchableOpacity style={styles.border} onPress={() => this.handleDetailProduct(rowData.product.id)}>
          <View style={styles.profile}>
            <Image
              source={{ uri: rowData.product.image }}
              style={styles.styleFotoToko}
            />
            <View style={styles.namaContainer}>
              <Text style={styles.textNama}>
                {rowData.product.name}
              </Text>
              <Text style={styles.textKelola}>
                {rowData.product.store.name}
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
    const spinner = this.state.loadingPage
    ? (<View style={styles.spinner}>
      <ActivityIndicator color='white' size='large' />
    </View>) : (<View />)
    return (
      <View style={styles.container}>
        <View style={[styles.ulasanContainer]}>
          {this.listViewUlasan()}
        </View>
        {spinner}
      </View>
    )
  }

}

const mapStateToProps = (state) => ({
  dataReview: state.sellerReview,
  dataDetailProduk: state.productDetail
})

const mapDispatchToProps = (dispatch) => ({
  getDetailProduct: (id) => dispatch(produkAction.getProduct({id: id})),
  getListReview: (page) => dispatch(reviewAction.getSellerReview({ page: page }))
})

export default connect(mapStateToProps, mapDispatchToProps)(SellerNotificationReview)
