import React from 'react'
import { Text, View, Image, ListView } from 'react-native'
import { connect } from 'react-redux'
import { MaskService } from 'react-native-masked-text'
import StarRating from 'react-native-star-rating'
import { Images } from '../Themes'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'\
import * as reviewAction from '../actions/review'

// Styles
import styles from './Styles/UlasanScreenStyle'

class UlasanScreenScreen extends React.Component {
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
      loadmore: true
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.id !== this.state.id) {
      this.setState({
        id: nextProps.id
      })
    }
    if (nextProps.dataReview.status === 200) {
      if (nextProps.dataReview.reviews.length > 0) {
        console.log(nextProps.dataReview.reviews)
        let data = [...this.state.data, ...nextProps.dataReview.reviews]
        this.setState({
          data: data,
          page: this.state.page + 1
        })
      } else {
        this.setState({
          loadmore: false
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
    const { id, page, loadmore } = this.state
    if (loadmore) {
      this.props.reviewAction(id, page)
    }
  }

  listViewUlasan () {
    return (
      <ListView
        dataSource={this.dataSource.cloneWithRows(this.state.data)}
        renderRow={this.renderRow.bind(this)}
        onEndReached={this.loadMore.bind(this)}
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
    reviewAction: (id, page) => dispatch(reviewAction.listReviewPagination({ id: id, page: page }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UlasanScreenScreen)
