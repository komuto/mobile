import React from 'react'
import { ScrollView, View, Text, ListView, Image, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import { connect } from 'react-redux'
import Spinner from '../Components/Spinner'
import { Actions as NavigationActions } from 'react-native-router-flux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import StarRating from 'react-native-star-rating'
import * as transactionAction from '../actions/transaction'
import { Images, Colors } from '../Themes'
// Styles
import styles from './Styles/BuyerComplainRefundReviewStyle'

class BuyerComplainRefundReview extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      id: this.props.dataComplain.orderDetail.id,
      data: this.props.dataComplain.orderDetail.dispute_products,
      dataReview: [],
      fineData: this.props.dataComplain.orderDetail.fine_products,
      loading: false,
      callback: this.props.callback
    }
  }

  componentDidMount () {
    const tempDataReview = this.props.dataComplain.orderDetail.fine_products
    tempDataReview.map((data, i) => {
      this.createDataReview(data, i)
    })
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataExchange.status === 200) {
      this.setState({
        loading: false
      })
      nextProps.dataExchange.status = 0
      NavigationActions.pop({ refresh: { callback: !this.state.callback } })
      this.props.getDetailDispute(this.state.id)
      ToastAndroid.show('Review ditambahkan..', ToastAndroid.SHORT)
    } else if (nextProps.dataExchange.status !== 200 && nextProps.dataExchange.status !== 0) {
      this.setState({
        loading: false
      })
      ToastAndroid.show(nextProps.dataExchange.message, ToastAndroid.SHORT)
    }
  }

  createDataReview (data, index) {
    let tempDataReview = this.state.dataReview
    const temp = {
      'product_id': data.id,
      'review': '',
      'quality': 0,
      'accuracy': 0,
      'image': data.image,
      'name': data.name,
      'check': false,
      'height': 50
    }
    tempDataReview.push(temp)
    this.setState({
      dataReview: tempDataReview
    })
  }

  renderLabel (label) {
    return (
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
      </View>
    )
  }

  renderItemRefund () {
    return (
      <ListView
        dataSource={this.dataSource.cloneWithRows(this.state.data)}
        renderRow={this.renderRow.bind(this)}
        enableEmptySections
      />
    )
  }

  renderRow (rowData) {
    return (
      <View style={styles.dataContainer}>
        <Image source={{ uri: rowData.image }} style={styles.imageProduct} />
        <Text style={[styles.textLabel, {flex: 1}]}>{rowData.name}</Text>
        <Image source={Images.centangBiru} style={styles.check} />
        <Text style={styles.textData}>Refund</Text>
      </View>
    )
  }

  renderAddReview () {
    const { dataReview } = this.state
    const tempData = dataReview
    const renderReview = dataReview.map((data, i) => {
      let textQuality, textAccuracy
      if (tempData[i].quality === 0) {
        textQuality = null
      } else if (tempData[i].quality > 2) {
        textQuality = <Text style={[styles.textReview, { color: Colors.darkMint }]}>Bagus</Text>
      } else {
        textQuality = <Text style={[styles.textReview, { color: Colors.red }]}>Kurang Bagus</Text>
      }
      if (tempData[i].accuracy === 0) {
        textAccuracy = null
      } else if (tempData[i].accuracy > 2) {
        textAccuracy = <Text style={[styles.textReview, { color: Colors.darkMint }]}>Bagus</Text>
      } else {
        textAccuracy = <Text style={[styles.textReview, { color: Colors.red }]}>Kurang Bagus</Text>
      }
      return (
        <View key={i}>
          <View style={styles.itemContainer}>
            <Image source={{ uri: tempData[i].image }} style={styles.imageData} />
            <Text style={[styles.textTitle, { marginTop: -5 }]}>{tempData[i].name}</Text>
          </View>
          <Text style={styles.textTitle}>Kualitas Produk</Text>
          <View style={styles.rateContainer}>
            <StarRating
              maxStars={5}
              starColor={'#ffcd00'}
              emptyStarColor={'#d9e1e9'}
              starSize={30}
              buttonStyle={{ padding: 5 }}
              rating={parseFloat(tempData[i].quality)}
              selectedStar={(rating) => this.editQualityRating(rating, i, 1)}
            />
            <View style={{ flex: 1 }} />
            {textQuality}
          </View>
          <Text style={styles.textTitle}>Akurasi Produk</Text>
          <View style={styles.rateContainer}>
            <StarRating
              maxStars={5}
              starColor={'#ffcd00'}
              emptyStarColor={'#d9e1e9'}
              starSize={30}
              buttonStyle={{ padding: 5 }}
              rating={parseFloat(tempData[i].accuracy)}
              selectedStar={(rating) => this.editQualityRating(rating, i, 2)}
            />
            <View style={{ flex: 1 }} />
            {textAccuracy}
          </View>
          <View style={styles.questionContainer}>
            <TextInput
              style={[styles.textInput, { height: tempData[i].height }]}
              multiline
              value={tempData[i].review}
              onContentSizeChange={(event) => {
                tempData[i].height = event.nativeEvent.contentSize.height
                this.setState({dataReview: tempData})
              }}
              keyboardType='default'
              autoCapitalize='none'
              autoCorrect
              onChange={(event) => this.handleReview(event.nativeEvent.text, i)}
              underlineColorAndroid='transparent'
              placeholder='Apa pendapat anda tentang barang ini?'
            />
          </View>
        </View>)
    })
    return (
      <View style={styles.contentContainer}>
        {renderReview}
      </View>
    )
  }

  renderButton () {
    const { loading } = this.state
    if (loading) {
      return (
        <View style={styles.buttonContainer}>
          <View
            style={styles.button}
          >
            <Spinner color={Colors.snow} />
          </View>
        </View>
      )
    }
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.sendReview()}
        >
          <Text style={[styles.textWhite, { marginTop: -2 }]}>Kirim Ulasan</Text>
        </TouchableOpacity>
      </View>
    )
  }

  editQualityRating (rating, index, type) {
    let temp = this.state.dataReview
    if (type === 1) {
      temp[index].quality = rating
      this.setState({
        dataReview: temp
      })
    } else {
      temp[index].accuracy = rating
      this.setState({
        dataReview: temp
      })
    }
  }

  handleReview = (text, index) => {
    let temp = this.state.dataReview
    temp[index].review = text
    this.setState({
      dataReview: temp
    })
  }

  sendReview () {
    const { id, dataReview } = this.state
    this.setState({
      loading: true
    })
    this.props.receiveExchange(id, dataReview)
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.renderLabel('Daftar Barang yang direfund')}
          {this.renderItemRefund()}
          {this.renderLabel('Daftar Barang menunggu review')}
          {this.renderAddReview()}
          {this.renderButton()}
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataComplain: state.buyerComplainedOrderDetail,
    dataExchange: state.buyerReceived
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    receiveExchange: (id, data) => dispatch(transactionAction.buyerDisputeReceived({
      id: id, data: data
    })),
    getDetailDispute: (id) => dispatch(transactionAction.getComplainedOrderDetailBuyer({id: id}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuyerComplainRefundReview)
