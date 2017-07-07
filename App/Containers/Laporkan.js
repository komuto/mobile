import React from 'react'
import { ScrollView, Text, View, Image } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/LaporkanStyle'

class Laporkan extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      images: this.props.images,
      namaBarang: this.props.namaBarang,
      harga: this.props.harga
    }
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.containerData}>
          <View style={styles.headerContainer}>
            <Image source={this.state.images} style={styles.imageStyle} />
            <View style={styles.barangContainer}>
              <Text style={styles.namaBarang}>{this.state.namaBarang}</Text>
              <Text style={styles.hargaBarang}>{this.state.harga}</Text>
            </View>
          </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Laporkan)
