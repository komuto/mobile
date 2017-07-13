import React from 'react'
import { Text, View, Image, ListView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import StarRating from 'react-native-star-rating'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
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
      namaToko: ''
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataToko.status === 200) {
      this.setState({
        quality: nextProps.dataToko.store.rating.quality || 0,
        accuracy: nextProps.dataToko.store.rating.accuracy || 0,
        data: nextProps.dataToko.store.rating.reviews,
        namaToko: nextProps.dataToko.store.name
      })
    }
  }

  renderFotoProduk () {
    if (this.state.foto !== null) {
      return (
        <Image
          source={{ uri: this.state.foto }}
          style={styles.styleFotoToko}
        />
      )
    }
    return (
      <Image
        source={Images.contohproduct}
        style={styles.styleFotoToko}
      />
    )
  }
  renderFotoProfil (value) {
    let image
    if (value !== null) {
      image = { uri: value }
    } else {
      image = Images.contohproduct
    }
    return (
      <Image
        source={image}
        style={styles.styleFoto}
      />
    )
  }

  listViewUlasan () {
    return (
      <ListView
        dataSource={this.dataSource.cloneWithRows(this.state.data)}
        renderRow={this.renderRow.bind(this)}
        enableEmptySections
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
    return (
      <View style={styles.border}>
        <View style={styles.profile}>
          {this.renderFotoProfil(image)}
          <View style={styles.namaContainer}>
            <Text style={[styles.textNama, {lineHeight: 23}]}>
              {rowData.user.name}
            </Text>
            <Text style={[styles.textKelola]}>
              3 hari yang lalu
            </Text>
          </View>
        </View>
        {this.renderProduk(rowData.product.image, rowData.product.name, rowData.namaToko)}
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
      <View>
        <View style={[styles.ulasanContainer]}>
          {this.renderRating()}
          {this.listViewUlasan()}
        </View>
      </View>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    dataToko: state.stores
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DetailTokoPenilaian)
