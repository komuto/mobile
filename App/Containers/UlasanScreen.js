import React from 'react'
import { ScrollView, Text, View, Image, ListView } from 'react-native'
import { connect } from 'react-redux'
import { MaskService } from 'react-native-masked-text'
import StarRating from 'react-native-star-rating'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/UlasanScreenStyle'

import { Images } from '../Themes'

class UlasanScreenScreen extends React.Component {
  constructor (props) {
    super(props)
    var imageProduct = [
      { foto: Images.contohproduct, nama: 'Budi Budiman', lastReview: '5', starQuality: 3, starAccurate: 3, isiUlasan: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' },
      { foto: Images.contohproduct, nama: 'Adi Budiman', lastReview: '5', starQuality: 3, starAccurate: 3, isiUlasan: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' },
      { foto: Images.contohproduct, nama: 'Benny Budiman', lastReview: '5', starQuality: 3, starAccurate: 3, isiUlasan: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' },
      { foto: Images.contohproduct, nama: 'Bangkit Budiman', lastReview: '5', starQuality: 3, starAccurate: 3, isiUlasan: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' },
      { foto: Images.contohproduct, nama: 'Indra Budiman', lastReview: '5', starQuality: 3, starAccurate: 3, isiUlasan: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua' }
    ]
    var dataSource2 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      listDataSource: dataSource2.cloneWithRows(imageProduct),
      foto: 'default',
      price: 1685000,
      starQuantity: 3,
      starAccurate: 3
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
          {this.renderFotoProduk()}
          <View style={styles.namaContainer}>
            <Text style={styles.textNama}>
              Blue Training Kit Machester United
            </Text>
            <Text style={styles.textKelola}>
              {totalHarga}
            </Text>
          </View>
        </View>
      </View>
    )
  }

  listViewUlasan () {
    return (
      <ListView
        dataSource={this.state.listDataSource}
        renderRow={this.renderRow.bind(this)}
      />
    )
  }

  renderRow (rowData) {
    return (
      <View style={styles.border}>
        <View style={styles.border}>
          <View style={[styles.profile, {paddingBottom: 22}]}>
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
          {this.renderRatingUlasan(rowData.starAccurate, rowData.starQuality, rowData.isiUlasan)}
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
      <ScrollView style={styles.container}>
        <View style={[styles.ulasanContainer]}>
          {this.renderProduct()}
          {this.listViewUlasan()}
        </View>
      </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(UlasanScreenScreen)
