import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import { Images } from '../Themes'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/DetailTokoProfileStyle'

class DetailTokoProfile extends React.Component {

  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  renderMenu (image, teks, data) {
    return (
      <View style={styles.menuContainer}>
        <TouchableOpacity>
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
        </TouchableOpacity>
      </View>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.sloganContainer}>
          <Text style={styles.title}>Slogan</Text>
          <Text style={styles.isi}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna
          </Text>
        </View>
        <View style={styles.sloganContainer}>
          <Text style={styles.title}>Deskripsi Toko</Text>
          <Text style={styles.isi}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna
          </Text>
        </View>
        {this.renderMenu(Images.toko, 'Terakhir Update', '2 jam yang lalu')}
        {this.renderMenu(Images.toko, 'Lokasi Toko', 'Jakarta Selatan')}
        {this.renderMenu(Images.toko, 'Buka sejak', '4 bulan yang lalu')}
        {this.renderMenu(Images.toko, 'Favorit', '200')}
        {this.renderMenu(Images.toko, 'Produk Terjual', '2500')}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailTokoProfile)
