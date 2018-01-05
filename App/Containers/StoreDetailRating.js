import React from 'react'
import { Text, View, Image, ListView, TouchableOpacity, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import StarRating from 'react-native-star-rating'
import moment from 'moment'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import * as reviewAction from '../actions/review'
// Styles
import styles from './Styles/DetailTokoPenilaianStyle'
import { Images } from '../Themes'

class DetailTokoPenilaian extends React.Component {
  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      data: [],
      quality: 0,
      accuracy: 0,
      namaToko: '',
      page: 1,
      loadmore: true,
      loading: true,
      id: ''
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataToko.status === 200) {
      const temp = [...this.state.data, ...nextProps.dataToko.review.reviews]
      this.setState({
        quality: nextProps.dataToko.review.rating.quality || 0,
        accuracy: nextProps.dataToko.review.rating.accuracy || 0,
        data: temp,
        loading: false,
        page: this.state.page + 1
      })
      if (temp.length > 0) {
        this.setState({
          loadmore: true
        })
      } else {
        this.setState({
          loadmore: false
        })
      }
    }
    if (nextProps.dataInfoToko.status === 200) {
      this.setState({
        namaToko: nextProps.dataInfoToko.store.name,
        id: nextProps.dataInfoToko.store.id
      })
    }
  }

  renderFotoProfil (value) {
    let image
    if (value !== null) {
      image = { uri: value }
    } else {
      image = null
    }
    return (
      <Image
        source={image}
        style={styles.styleFoto}
      />
    )
  }

  loadMore () {
    const { id, page, loading, loadmore } = this.state
    if (!loading) {
      if (loadmore) {
        this.setState({
          loading: true
        })
        this.props.getStoreReview(id, page)
      }
    }
  }

  listViewUlasan () {
    return (
      <ListView
        renderHeader={this.renderRating.bind(this)}
        dataSource={this.dataSource.cloneWithRows(this.state.data)}
        renderRow={this.renderRow.bind(this)}
        enableEmptySections
        onEndReached={this.loadMore.bind(this)}
        renderFooter={() => {
          if (this.state.loadmore && this.state.data > 10) {
            return (
              <ActivityIndicator
                style={[styles.loadingStyle, { height: 50 }]}
                size='small'
                color='#ef5656'
              />
            )
          } else {
            return <View />
          }
        }}
      />
    )
  }

  renderRating () {
    const {quality, accuracy} = this.state
    return (
      <View style={styles.ratingContainer}>
        <View style={styles.eachQualiyRate}>
          <Text style={styles.qualityText}> Kualitas Produk </Text>
          <Text style={styles.qualityTextRate}>{String(quality).substring(0, 3)}</Text>
          <View style={styles.startContainer}>
            <StarRating
              disabled
              maxStars={5}
              starColor={'#ffcd00'}
              emptyStarColor={'#d9e1e9'}
              starSize={16}
              rating={parseFloat(quality)}
            />
          </View>
        </View>
        <View style={styles.eachQualiyRate}>
          <Text style={styles.qualityText}> Akurasi Produk </Text>
          <Text style={styles.qualityTextRate}>{String(accuracy).substring(0, 3)}</Text>
          <View style={styles.startContainer}>
            <StarRating
              disabled
              maxStars={5}
              starColor={'#ffcd00'}
              emptyStarColor={'#d9e1e9'}
              starSize={16}
              rating={parseFloat(accuracy)}
            />
          </View>
        </View>
      </View>
    )
  }

  renderRow (rowData) {
    let image
    try {
      image = rowData.user.photo
    } catch (e) {
      image = null
    }
    const time = moment(rowData.created_at * 1000).fromNow()
    return (
      <View style={styles.border}>
        <View style={styles.profile}>
          {this.renderFotoProfil(image)}
          <View style={styles.namaContainer}>
            <Text style={[styles.textNama, {lineHeight: 23}]}>
              {rowData.user.name}
            </Text>
            <Text style={[styles.textKelola]}>
              {time}
            </Text>
          </View>
        </View>
        {this.renderProduk(rowData.image, rowData.name, this.state.namaToko)}
        {this.renderRatingUlasan(rowData.accuracy, rowData.quality, rowData.review)}
      </View>
    )
  }

  renderProduk (image, produk, namatoko) {
    return (
      <TouchableOpacity style={styles.produkContainer}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.imageProduk} />
        </View>
        <View style={styles.namaProdukContainer}>
          <Text style={[styles.textNama, {lineHeight: 23}]}>{produk}</Text>
          <Text style={styles.textKelola}>{namatoko}</Text>
        </View>
        <View style={styles.rightArrow}>
          <Image source={Images.rightArrow} style={styles.iconArrow} />
        </View>
      </TouchableOpacity>
    )
  }

  renderRatingUlasan (starAccurate, starQuantity, isiulasan) {
    return (
      <View>
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
        <View style={styles.ulasanContainerIsi}>
          <Text style={styles.isiUlasan}>{isiulasan}</Text>
        </View>
      </View>
    )
  }
  render () {
    return (
      <View style={[styles.ulasanContainer]}>
        {this.listViewUlasan()}
      </View>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    dataToko: state.storeReview,
    dataInfoToko: state.stores
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getStoreReview: (id, page) => dispatch(reviewAction.getStoreReview({id: id, page: page}))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DetailTokoPenilaian)
