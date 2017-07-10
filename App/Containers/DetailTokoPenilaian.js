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
    var imageProduct = [
      { foto: Images.contohproduct, nama: 'Budi Budiman', namaProduk: 'Sepatu Jogging Nike Hitam', namaToko: 'Sport Station Shop', lastReview: '5', starQuality: 3, starAccurate: 3, isiUlasan: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' },
      { foto: Images.contohproduct, nama: 'Adi Budiman', namaProduk: 'Sepatu Jogging Nike Hitam', namaToko: 'Sport Station Shop', lastReview: '5', starQuality: 3, starAccurate: 3, isiUlasan: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' },
      { foto: Images.contohproduct, nama: 'Benny Budiman', namaProduk: 'Sepatu Jogging Nike Hitam', namaToko: 'Sport Station Shop', lastReview: '5', starQuality: 3, starAccurate: 3, isiUlasan: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' },
      { foto: Images.contohproduct, nama: 'Bangkit Budiman', namaProduk: 'Sepatu Jogging Nike Hitam', namaToko: 'Sport Station Shop', lastReview: '5', starQuality: 3, starAccurate: 3, isiUlasan: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' },
      { foto: Images.contohproduct, nama: 'Indra Budiman', namaProduk: 'Sepatu Jogging Nike Hitam', namaToko: 'Sport Station Shop', lastReview: '5', starQuality: 3, starAccurate: 3, isiUlasan: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' }
    ]
    var dataSource2 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      listDataSource: dataSource2.cloneWithRows(imageProduct),
      foto: 'default',
      price: 1685000,
      starQuantity: 3,
      starAccurate: 3,
      avgQuantity: 4.5,
      avgAccurate: 4.5
    }
  }
  renderFotoProduk () {
    if (this.state.foto !== 'default') {
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
    return (
      <Image
        source={Images.contohproduct}
        style={styles.styleFoto}
      />
    )
  }

  listViewUlasan () {
    return (
      <ListView
        dataSource={this.state.listDataSource}
        renderRow={this.renderRow.bind(this)}
        enableEmptySections
      />
    )
  }

  renderRating () {
    const {starAccurate, starQuantity, avgAccurate, avgQuantity} = this.state
    return (
      <View style={styles.ratingContainer}>
        <View style={styles.eachQualiyRate}>
          <Text style={styles.qualityText}> Kualitas Produk </Text>
          <Text style={styles.qualityTextRate}>{avgQuantity}</Text>
          <View style={styles.startContainer}>
            <StarRating
              disabled
              maxStars={5}
              starColor={'#ffcd00'}
              emptyStarColor={'#d9e1e9'}
              starSize={16}
              rating={starQuantity}
              selectedStar={(rating) => this.onStarQtyPress(rating)}
            />
          </View>
        </View>
        <View style={styles.eachQualiyRate}>
          <Text style={styles.qualityText}> Akurasi Produk </Text>
          <Text style={styles.qualityTextRate}>{avgAccurate}</Text>
          <View style={styles.startContainer}>
            <StarRating
              disabled
              maxStars={5}
              starColor={'#ffcd00'}
              emptyStarColor={'#d9e1e9'}
              starSize={16}
              rating={starAccurate}
              selectedStar={(rating) => this.onStarAcuPress(rating)}
            />
          </View>
        </View>
      </View>
    )
  }

  onStarQtyPress (rating) {
    this.setState({
      starQuantity: rating
    })
  }
  onStarAcuPress (rating) {
    this.setState({
      starAccurate: rating
    })
  }

  renderRow (rowData) {
    return (
      <View style={styles.border}>
        <View style={styles.profile}>
          {this.renderFotoProfil(rowData.foto)}
          <View style={styles.namaContainer}>
            <Text style={[styles.textNama, {lineHeight: 23}]}>
              {rowData.nama}
            </Text>
            <Text style={[styles.textKelola]}>
              {rowData.lastReview} hari yang lalu
            </Text>
          </View>
        </View>
        {this.renderProduk(rowData.foto, rowData.namaProduk, rowData.namaToko)}
        {this.renderRatingUlasan(rowData.starAccurate, rowData.starQuality, rowData.isiUlasan)}
      </View>
    )
  }

  renderProduk (image, produk, namatoko) {
    return (
      <TouchableOpacity style={styles.produkContainer}>
        <View style={styles.imageContainer}>
          <Image source={image} style={styles.imageProduk} />
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
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DetailTokoPenilaian)
