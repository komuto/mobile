import React from 'react'
import { ScrollView, Text, View, Image, ListView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/BuyerResolutionStyle'
import { marketplace } from '../Config';

class SellerNotificationResolution extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      id: this.props.id,
      data: [
        {
          'id': 0, 'photoProduct': 'https://komutodev.aptmi.com/uploads/produk/8011774ba21b8cc99a20583008bc07e43d19bdc1_klepon1.jpg', 'storeName': 'bahagia1', 'productName': 'Sepatu balap', 'accuracy': 4, 'quality': 4, 'photoUser': 'https://www.juptr.io/images/default-user.png', 'review': 'Sepatunya tidak sesuai dengan yang di gambar dan deskripsi. Saya ingin merefund dana saja. Saya takut kalau ganti barang, barangnya tetap tidak sesuai. Takut buang2 waktu untuk menunggu'
        },
        {
          'id': 0, 'photoProduct': 'https://komutodev.aptmi.com/uploads/produk/8011774ba21b8cc99a20583008bc07e43d19bdc1_klepon1.jpg', 'storeName': 'bahagia1', 'productName': 'Sepatu balap', 'accuracy': 4, 'quality': 4, 'photoUser': 'https://www.juptr.io/images/default-user.png', 'review': 'Sepatunya tidak sesuai dengan yang di gambar dan deskripsi. Saya ingin merefund dana saja. Saya takut kalau ganti barang, barangnya tetap tidak sesuai. Takut buang2 waktu untuk menunggu'
        },
        {
          'id': 0, 'photoProduct': 'https://komutodev.aptmi.com/uploads/produk/8011774ba21b8cc99a20583008bc07e43d19bdc1_klepon1.jpg', 'storeName': 'bahagia1', 'productName': 'Sepatu balap', 'accuracy': 4, 'quality': 4, 'photoUser': 'https://www.juptr.io/images/default-user.png', 'review': 'Sepatunya tidak sesuai dengan yang di gambar dan deskripsi. Saya ingin merefund dana saja. Saya takut kalau ganti barang, barangnya tetap tidak sesuai. Takut buang2 waktu untuk menunggu'
        },
        {
          'id': 0, 'photoProduct': 'https://komutodev.aptmi.com/uploads/produk/8011774ba21b8cc99a20583008bc07e43d19bdc1_klepon1.jpg', 'storeName': 'bahagia1', 'productName': 'Sepatu balap', 'accuracy': 4, 'quality': 4, 'photoUser': 'https://www.juptr.io/images/default-user.png', 'review': 'Sepatunya tidak sesuai dengan yang di gambar dan deskripsi. Saya ingin merefund dana saja. Saya takut kalau ganti barang, barangnya tetap tidak sesuai. Takut buang2 waktu untuk menunggu'
        },
        {
          'id': 0, 'photoProduct': 'https://komutodev.aptmi.com/uploads/produk/8011774ba21b8cc99a20583008bc07e43d19bdc1_klepon1.jpg', 'storeName': 'bahagia1', 'productName': 'Sepatu balap', 'accuracy': 4, 'quality': 4, 'photoUser': 'https://www.juptr.io/images/default-user.png', 'review': 'Sepatunya tidak sesuai dengan yang di gambar dan deskripsi. Saya ingin merefund dana saja. Saya takut kalau ganti barang, barangnya tetap tidak sesuai. Takut buang2 waktu untuk menunggu'
        }
      ],
      foto: this.props.foto,
      price: this.props.price,
      namaToko: this.props.namaToko,
      page: 1,
      loadmore: true,
      isRefreshing: false,
      isLoading: false
    }
  }

  componentDidMount () {
    this.refresh()
  }

  loadMore () {
    // const { id, page, loadmore, isLoading } = this.state
    // if (!isLoading) {
    //   if (loadmore) {
    //     this.props.reviewAction(id, page)
    //   }
    // }
  }

  refresh = () => {
    // const { id } = this.state
    // this.setState({ isRefreshing: true, data: [], page: 1, isLoading: true })
    // this.props.reviewAction(id, 1)
  }

  listViewUlasan () {
    return (
      <ListView
        dataSource={this.dataSource.cloneWithRows(this.state.data)}
        renderRow={this.renderRow.bind(this)}
        enableEmptySections
        style={styles.listView}
      />
    )
  }

  handleResolution (typeMessage) {
    NavigationActions.buyerdetailresolution({
      type: ActionConst.PUSH
    })
  }

  renderRow (rowData) {
    return (
      <TouchableOpacity onPress={() => this.handleResolution()} style={styles.renderRow}>
        <View style={styles.border}>
          <View style={styles.profile}>
            <Image
              source={{ uri: rowData.photoProduct }}
              style={styles.styleFotoToko}
            />
            <View style={styles.namaContainer}>
              <Text style={styles.textNama}>
                {rowData.productName}
              </Text>
              <Text style={styles.textKelola}>
                {rowData.storeName}
              </Text>
            </View>
          </View>
          <View style={styles.messages}>
            <Text style={styles.textMessage}>{rowData.review}</Text>
          </View>
          <View style={styles.status}>
            <View style={styles.iconStatus} />
            <Text style={styles.textNama}>
              Dalam Tahap Review Pihak {marketplace}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView>
          <ListView
            dataSource={this.dataSource.cloneWithRows(this.state.data)}
            renderRow={this.renderRow.bind(this)}
            enableEmptySections
          />
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

export default connect(mapStateToProps, mapDispatchToProps)(SellerNotificationResolution)
