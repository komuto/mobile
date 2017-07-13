import React from 'react'
import { View, Text, Image } from 'react-native'
import { connect } from 'react-redux'
import { Images } from '../Themes'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/DetailTokoProfileStyle'

class DetailTokoProfile extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      alamat: 'Lokasi Toko',
      slogan: '',
      deskripsi: '',
      produkTerjual: '0',
      totalFavorit: 0
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataToko.status === 200) {
      this.setState({
        alamat: nextProps.dataToko.store.origin || 'Belum Mendaftarkan Alamat Toko',
        slogan: nextProps.dataToko.store.slogan,
        deskripsi: nextProps.dataToko.store.description,
        produkTerjual: nextProps.dataToko.store.total_product_sold,
        totalFavorit: nextProps.dataToko.store.total_favorite || 0
      })
    }
  }

  renderMenu (image, teks, data) {
    return (
      <View style={styles.menuContainer}>
        <View style={styles.imageContainer}>
          <Image source={image} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              {teks}
            </Text>
            <Text style={styles.textData}>
              {data}
            </Text>
          </View>
        </View>
      </View>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.sloganContainer}>
          <Text style={styles.title}>Slogan</Text>
          <Text style={styles.isi}>
            {this.state.slogan}
          </Text>
        </View>
        <View style={styles.sloganContainer}>
          <Text style={styles.title}>Deskripsi Toko</Text>
          <Text style={styles.isi}>
            {this.state.deskripsi}
          </Text>
        </View>
        {this.renderMenu(Images.lokasi, 'Lokasi Toko', this.state.alamat)}
        {this.renderMenu(Images.kalender, 'Buka sejak', '4 bulan yang lalu')}
        {this.renderMenu(Images.bintang, 'Favorit', String(this.state.totalFavorit))}
        {this.renderMenu(Images.sold, 'Produk Terjual', this.state.produkTerjual)}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailTokoProfile)
