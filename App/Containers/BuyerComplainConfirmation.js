import React from 'react'
import { ScrollView, Text, View, Image, TouchableOpacity, TextInput, ListView, ToastAndroid } from 'react-native'
import { connect } from 'react-redux'
import StarRating from 'react-native-star-rating'
import moment from 'moment'
import Spinner from '../Components/Spinner'
import { Actions as NavigationActions } from 'react-native-router-flux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Images, Colors } from '../Themes'
import * as transactionAction from '../actions/transaction'
// Styles
import styles from './Styles/BuyerComplainConfirmationStyle'

class BuyerComplainConfirmation extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      invoice: this.props.dataComplain.orderDetail.invoice.invoice_number,
      bucketId: this.props.dataComplain.orderDetail.invoice.bucket_id,
      date: this.props.dataComplain.orderDetail.invoice.created_at,
      months: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli',
        'Agustus', 'September', 'Oktober', 'November', 'Desember'],
      data: [...this.props.dataComplain.orderDetail.products],
      id: this.props.dataComplain.orderDetail.id,
      vote: 0,
      height: 50,
      heightComplain: 50,
      dataReview: [],
      dataComplain: [],
      storeName: this.props.dataComplain.orderDetail.store.name,
      storeLogo: this.props.dataComplain.orderDetail.store.logo,
      loading: false,
      callback: this.props.callback
    }
  }

  componentDidMount () {
    const tempDataReview = this.props.dataComplain.orderDetail.products
    console.log('data', tempDataReview)
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
      ToastAndroid.show('Review ditambahkan..', ToastAndroid.SHORT)
    } else if (nextProps.dataExchange.statusf > 200) {
      this.setState({
        loading: false
      })
      ToastAndroid.show('Terjadi kesalahan.. ' + nextProps.dataExchange.message, ToastAndroid.SHORT)
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

  renderItem () {
    const { invoice, date, months } = this.state
    const time = moment.unix(date)
    const month = months[moment(time).format('M') - 1]
    const day = moment(time).format('DD')
    const year = moment(time).format('YYYY')
    const textDate = day + ' ' + month + ' ' + year
    return (
      <View style={styles.barangContainer}>
        {this.renderData('No Invoice', invoice)}
        {this.renderData('Tanggal Transaksi', textDate)}
        <View style={styles.dataContainer}>
          <Text style={[styles.textTitle, { flex: 1 }]}>Status Komplain</Text>
          <View style={styles.warna} />
          <Text style={styles.textTitle}>Menunggu Penyelesaian</Text>
        </View>
        {this.renderStore()}
        {this.renderData('Solusi yang diinginkan', 'Tukar Barang')}
      </View>
    )
  }

  renderStore () {
    const { storeName, storeLogo } = this.state
    return (
      <View style={styles.dataContainer}>
        <Text style={[styles.textTitle, { flex: 1 }]}>Penjual</Text>
        <Image source={{ uri: storeLogo }} style={styles.storeLogo} />
        <Text style={styles.textTitle}>{storeName}</Text>
      </View>
    )
  }

  renderData (label, content) {
    return (
      <View style={styles.dataContainer}>
        <Text style={[styles.textTitle, { flex: 1 }]}>{label}</Text>
        <Text style={styles.textTitle}>{content}</Text>
      </View>
    )
  }

  renderVote () {
    const { vote } = this.state
    if (vote === 0) {
      return (
        <View style={styles.voteContainer}>
          <Text style={[styles.textTitle, { textAlign: 'center' }]}>
            Apakah Anda memiliki komplain terhadap barang yang Anda terima?
          </Text>
          <View style={styles.vote}>
            <TouchableOpacity style={styles.voteNoDefault} onPress={() => this.setState({vote: 1})}>
              <Image source={Images.thumbDownRed} style={styles.imageVote} />
              <Text style={styles.textRed}>Ya</Text>
            </TouchableOpacity>
            <View style={styles.separatorVote} />
            <TouchableOpacity style={styles.voteYesDefault} onPress={() => this.setState({vote: 2})}>
              <Image source={Images.thumbUpGreen} style={styles.imageVote} />
              <Text style={styles.textGreen}>Tidak</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    } else if (vote === 1) {
      return (
        <View style={styles.voteContainer}>
          <Text style={[styles.textTitle, { textAlign: 'center' }]}>
            Apakah Anda memiliki komplain terhadap barang yang Anda terima?
          </Text>
          <View style={styles.vote}>
            <TouchableOpacity style={styles.voteNo} onPress={() => this.setState({vote: 1})}>
              <Image source={Images.thumbDown} style={styles.imageVote} />
              <Text style={styles.textWhite}>Ya</Text>
            </TouchableOpacity>
            <View style={styles.separatorVote} />
            <TouchableOpacity style={styles.voteYesDefault} onPress={() => this.setState({vote: 2})}>
              <Image source={Images.thumbUpGreen} style={styles.imageVote} />
              <Text style={styles.textGreen}>Tidak</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    } else if (vote === 2) {
      return (
        <View style={styles.voteContainer}>
          <Text style={[styles.textTitle, { textAlign: 'center' }]}>
            Apakah Anda memiliki komplain terhadap barang yang Anda terima?
          </Text>
          <View style={styles.vote}>
            <TouchableOpacity style={styles.voteNoDefault} onPress={() => this.setState({vote: 1})}>
              <Image source={Images.thumbDownRed} style={styles.imageVote} />
              <Text style={styles.textRed}>Ya</Text>
            </TouchableOpacity>
            <View style={styles.separatorVote} />
            <TouchableOpacity style={styles.voteYes} onPress={() => this.setState({vote: 2})}>
              <Image source={Images.thumbUp} style={styles.imageVote} />
              <Text style={styles.textWhite}>Tidak</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
  }

  renderContent () {
    const { vote } = this.state
    if (vote === 0) {
      return null
    } else if (vote === 1) {
      return this.renderVoteOne()
    } else if (vote === 2) {
      return this.renderVoteTwo()
    }
  }

  handlingRadio (index, value) {
    if (value.toLowerCase() === 'Refund') {
      this.setState({
        activeSolution: 1
      })
    } else {
      this.setState({
        activeSolution: 2
      })
    }
  }

  renderVoteOne () {
    return (
      <View style={styles.contentContainer}>
        <View style={styles.triangleContainer}>
          <View style={styles.triangleOuter}>
            <View style={styles.triangle} />
          </View>
          <View style={styles.triangleOuter} />
        </View>
        <View style={styles.content}>
          <Text style={styles.textTitle}>
            Karena Anda kembali mengalami masalah dengan barang yang Anda terima,
            maka kami menyarankan untuk melakukan refund terhadap barang yang bermasalah.
          </Text>
          {this.renderButtonComplain()}
        </View>
      </View>
    )
  }

  checkItem (row) {
    const tempData = this.state.dataReview
    if (tempData[row].check) {
      tempData[row].check = false
    } else {
      tempData[row].check = true
    }
    const newDataSource = tempData.map(data => {
      return {...data}
    })
    this.setState({
      dataReview: newDataSource
    })
  }

  checkProblems (row) {
    const tempData = this.state.complainData
    if (tempData[row].check) {
      tempData[row].check = false
    } else {
      tempData[row].check = true
    }
    const newDataSource = tempData.map(data => {
      return {...data}
    })
    this.setState({
      complainData: newDataSource
    })
  }

  renderRowPhotos (rowData, sectionId, row) {
    return (
      <View style={styles.imageContainer}>
        <Image
          style={styles.photo}
          source={{ uri: rowData }}
          borderRadius={7}
        />
        <TouchableOpacity
          style={styles.buttonDeletePictureContainer}
          onPress={() => this.removePhoto(row)}
        >
          <Image source={Images.closeCircleBack} style={styles.imageCheck} />
        </TouchableOpacity>
      </View>
    )
  }

  addPhoto (path) {
    const { dataPhotos } = this.state
    let temp = dataPhotos
    temp.push(path)
    this.setState({
      dataPhotos: temp,
      showModalCamera: false
    })
  }

  removePhoto (id) {
    const { dataPhotos } = this.state
    let temp2 = dataPhotos
    temp2.splice(id, 1)
    this.setState({
      dataPhotos: temp2
    })
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

  renderVoteTwo () {
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
        <View style={styles.triangleContainer}>
          <View style={styles.triangleOuter} />
          <View style={styles.triangleOuter}>
            <View style={styles.triangle} />
          </View>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.textTitle}>
            Silahkan memberi review untuk barang yang telah
            Anda terima
          </Text>
        </View>
        <View style={styles.content}>
          {renderReview}
          {this.renderButton()}
        </View>
      </View>
    )
  }

  sendReview () {
    const { id, dataReview } = this.state
    this.setState({
      loading: true
    })
    this.props.receiveExchange(id, dataReview)
  }

  sendComplain () {
    console.log('refund aja')
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

  renderButtonComplain () {
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
          onPress={() => this.sendComplain()}
        >
          <Text style={[styles.textWhite, { marginTop: -2 }]}>
            Refund Barang yang bermasalah
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  handleReview = (text, index) => {
    let temp = this.state.dataReview
    temp[index].review = text
    this.setState({
      dataReview: temp
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.renderItem()}
          {this.renderVote()}
          {this.renderContent()}
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
    }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuyerComplainConfirmation)
