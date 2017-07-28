import React from 'react'
import { ScrollView, Text, View, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/TentangDropshippingScreenStyle'
import { Images } from '../Themes'

class TentangDropshippingScreenScreen extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      marginNavbar: this.props.marginNavbars,
      imageCollapse: '',
      loading: false,
      showContent: '',
      buttonVisible: this.props.visibleButton,
      infoDropshipping: [
        {
          'id': 0,
          'isChecked': true,
          'title': 'Apa itu Dropshipping?',
          'desc': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco'
        },
        {
          'id': 1,
          'isChecked': false,
          'title': 'Berapa persen komisi yang reseller dapat??',
          'desc': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco'
        },
        {
          'id': 2,
          'isChecked': false,
          'title': 'Bagaimana cara melakukan dropshipping??',
          'desc': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco'
        },
        {
          'id': 3,
          'isChecked': false,
          'title': 'Bagaimana jika ada yang bertanya tentang produk ini. siapa yang akan menjawab?. pemilik barang atau reseller?',
          'desc': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco'
        },
        {
          'id': 4,
          'isChecked': false,
          'title': 'Bagaimana jika terjadi refund?',
          'desc': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamcoLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamcoLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamcoLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamcoLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco'
        }
      ]
    }
  }

  renderInfoDropshipping () {
    const mapInfo = this.state.infoDropshipping.map((data, i) => {
      const img = this.state.infoDropshipping[i].isChecked ? Images.up : Images.down
      return (
        <View key={i} style={styles.containerinfoDropshipping}>
          <View style={styles.containerHeader}>
            <Text style={styles.title}>{data.title}</Text>
            <TouchableOpacity onPress={() => this.changeCheck(i)}>
              <Image source={img} style={{height: 24, width: 24}} />
            </TouchableOpacity>
          </View>
          {this.mapDesc(data.desc, data.isChecked)}
        </View>
      )
    })
    return (
      <View style={{marginBottom: 62}}>
        {mapInfo}
      </View>
    )
  }

  mapDesc (data, isChecked) {
    if (isChecked) {
      return (
        <View style={styles.containerDesc}>
          <Text style={styles.desc}>{data}</Text>
        </View>
      )
    } else {
      return (
        <View />
      )
    }
  }

  changeCheck (i) {
    const {infoDropshipping} = this.state
    const newDataSourceOld = infoDropshipping.map(data => {
      data.isChecked = false
      return {...data}
    })
    this.setState({
      infoDropshipping: newDataSourceOld
    })
    if (infoDropshipping[i].isChecked) {
      infoDropshipping[i].isChecked = false
      const newDataSource = infoDropshipping.map(data => {
        return {...data}
      })
      this.setState({
        infoDropshipping: newDataSource
      })
    } else {
      infoDropshipping[i].isChecked = true
      const newDataSource = infoDropshipping.map(data => {
        return {...data}
      })
      this.setState({
        infoDropshipping: newDataSource
      })
    }
  }

  button () {
    if (this.state.buttonVisible) {
      return (
        <TouchableOpacity style={[styles.buttonnext]} onPress={() => {}}>
          <Text style={styles.textButtonNext}>
            Saya Mengerti, Lanjutkan Proses
          </Text>
        </TouchableOpacity>
      )
    } else {
      <View />
    }
  }

  render () {
    return (
      <View style={[styles.container, {marginTop: this.state.marginNavbar}]}>
        <ScrollView>
          {this.renderInfoDropshipping()}
          {this.button()}
        </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(TentangDropshippingScreenScreen)
