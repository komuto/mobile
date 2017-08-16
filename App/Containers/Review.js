import React from 'react'
import { Text, View, Image, ListView, ActivityIndicator, RefreshControl } from 'react-native'
import { connect } from 'react-redux'
import { MaskService } from 'react-native-masked-text'
import StarRating from 'react-native-star-rating'
import { Images, Colors } from '../Themes'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'\
import * as reviewAction from '../actions/review'

// Styles
import styles from './Styles/UlasanScreenStyle'

class Review extends React.Component {
  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      id: this.props.id,
      data: [],
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
    if (nextProps.dataReview.status === 200) {
      if (nextProps.dataReview.reviews.length > 0) {
        console.log(nextProps.dataReview.reviews)
        let data = [...this.state.data, ...nextProps.dataReview.reviews]
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
  }

  renderProduct () {
    const totalHarga = MaskService.toMask('money', this.state.price, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    return (
      <View style={styles.border}>
        <View style={styles.profile}>
          <Image
            source={{ uri: this.state.foto }}
            style={styles.styleFotoToko}
          />
          <View style={styles.namaContainer}>
            <Text style={styles.textNama}>
              {this.state.namaToko}
            </Text>
            <Text style={styles.textKelola}>
              {totalHarga}
            </Text>
          </View>
        </View>
      </View>
    )
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

  renderFotoProfil (foto) {
    if (foto === '' || foto === null || foto === undefined) {
      return (
        <Image
          source={Images.contohproduct}
          style={styles.styleFoto}
        />
      )
    }
    return (
      <Image
        source={{ uri: foto }}
        style={styles.styleFoto}
      />
    )
  }

  renderRow (rowData) {
    return (
      <View style={styles.border}>
        <View style={styles.border}>
          <View style={[styles.profile, {paddingBottom: 22}]}>
            {this.renderFotoProfil(rowData.user.photo)}
            <View style={styles.namaContainer}>
              <Text style={[styles.textNama, {lineHeight: 23}]}>
                {rowData.user.name}
              </Text>
              <Text style={[styles.textKelola]}>
                3 hari yang lalu
              </Text>
            </View>
          </View>
          {this.renderRatingUlasan(rowData.accuracy, rowData.quality, rowData.review)}
        </View>
      </View>
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
        <Text style={styles.isiUlasan}>{isiulasan}</Text>
      </View>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={[styles.ulasanContainer]}>
          {this.renderProduct()}
          {this.listViewUlasan()}
        </View>
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    dataReview: state.productReview
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    reviewAction: (id, page) => dispatch(reviewAction.listReviews({ id: id, page: page }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Review)
