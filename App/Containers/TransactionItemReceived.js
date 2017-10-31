import React from 'react'
import { ScrollView, Text, View, Image, TouchableOpacity, TextInput, ListView, ToastAndroid } from 'react-native'
import { connect } from 'react-redux'
import StarRating from 'react-native-star-rating'
import moment from 'moment'
import CameraModal from '../Components/CameraModal'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import CustomRadio from '../Components/CustomRadio'
import * as reviewAction from '../actions/review'
import * as storeAction from '../actions/stores'
import * as transactionAction from '../actions/transaction'
import Spinner from '../Components/Spinner'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Images, Colors } from '../Themes'
// Styles
import styles from './Styles/TransactionItemReceivedStyle'

class TransactionItemReceived extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      invoice: this.props.dataInvoice.invoice.invoice_number,
      bucketId: this.props.dataInvoice.invoice.bucket_id,
      date: this.props.dataInvoice.invoice.created_at,
      months: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli',
        'Agustus', 'September', 'Oktober', 'November', 'Desember'],
      data: this.props.dataInvoice.invoice.items,
      id: this.props.dataInvoice.invoice.id,
      vote: 0,
      height: 50,
      heightComplain: 50,
      complain: '',
      review: '',
      activeSolution: 1,
      complainData: [
        {
          'id': 1,
          'label': 'Barang tidak sesuai deskripsi',
          'check': false
        },
        {
          'id': 2,
          'label': 'Barang rusak',
          'check': false
        },
        {
          'id': 3,
          'label': 'Product tidak lengkap',
          'check': false
        }
      ],
      solutionData: [{label: 'Refund', value: 0}, {label: 'Tukar Baru', value: 1}],
      dataPhotos: [],
      dataComplainPhotos: [],
      showModalCamera: false,
      dataReview: [],
      dataComplain: [],
      loading: false
    }
    moment.locale('id')
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataInvoice.status === 200) {
      this.setState({
        dataReview: nextProps.dataInvoice.invoice.items
      })
      const tempDataReview = nextProps.dataInvoice.invoice.items
      tempDataReview.map((data, i) => {
        this.createDataReview(data, i)
      })
      nextProps.dataInvoice.status = 0
    } else if (nextProps.dataInvoice.status !== 200 && nextProps.dataInvoice.status !== 0) {
      ToastAndroid.show(nextProps.dataInvoice.message, ToastAndroid.LONG)
      nextProps.dataInvoice.status = 0
    }
    if (nextProps.dataAddReview.status === 200) {
      this.setState({
        loading: false
      })
      NavigationActions.transactionnotification({
        type: ActionConst.REPLACE,
        typeNotification: ''
      })
      nextProps.dataAddReview.status = 0
    } else if (nextProps.dataAddReview.status !== 200 && nextProps.dataAddReview.status !== 0) {
      this.setState({
        loading: false
      })
      nextProps.dataAddReview.status = 0
      ToastAndroid.show('Terjadi Kesalahan.. ' + nextProps.dataAddReview.message, ToastAndroid.LONG)
    }
    if (nextProps.dataPhoto.status === 200) {
      let temp = this.state.dataComplainPhotos
      nextProps.dataPhoto.payload.images.map((data, i) => {
        temp[i] = ({'name': data.name})
      })
      const { dataReview, complainData } = this.state
      let product = []
      let problems = []
      for (var i = 0; i < dataReview.length; i++) {
        if (dataReview[i].check) {
          product.push(dataReview[i].product_id)
        }
      }
      for (var j = 0; j < complainData.length; j++) {
        if (complainData[j].check) {
          problems.push(complainData[j].id)
        }
      }
      const { id, bucketId, activeSolution, complain } = this.state
      this.props.addComplain(
        bucketId, id, product, problems, activeSolution, complain, temp
      )
      nextProps.dataPhoto.status = 0
    } else if (nextProps.dataPhoto.status !== 200 && nextProps.dataPhoto.status !== 0) {
      this.setState({
        loading: false
      })
    }
    if (nextProps.dataAddComplain.status === 200) {
      this.setState({
        loading: false
      })
      NavigationActions.transactionnotification({
        type: ActionConst.REPLACE,
        typeNotification: 'complain'
      })
      nextProps.dataAddComplain.status = 0
    } else if (nextProps.dataAddComplain.status !== 200 && nextProps.dataAddComplain.status !== 0) {
      this.setState({
        loading: false
      })
      nextProps.dataAddComplain.status = 0
      ToastAndroid.show('Terjadi Kesalahan.. ' + nextProps.dataAddComplain.message, ToastAndroid.LONG)
    }
  }

  createDataReview (data, index) {
    let tempDataReview = [...this.state.dataReview]
    const temp = {
      'product_id': data.product.id,
      'review': '',
      'quality': 0,
      'accuracy': 0,
      'image': data.product.image,
      'name': data.product.name,
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
          <Text style={[styles.textTitle, { flex: 1 }]}>Status</Text>
          <View style={styles.warna} />
          <Text style={styles.textTitle}>Barang Sudah Dikirim</Text>
        </View>
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
          <Text style={styles.textTitle}>
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
          <Text style={styles.textTitle}>
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
          <Text style={styles.textTitle}>
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
    const {dataReview, complainData} = this.state
    const renderItems = dataReview.map((data, i) => {
      let check
      if (data.check) {
        check = Images.centangBiru
      } else {
        check = null
      }
      return (
        <View style={styles.rowContainer} key={i}>
          <TouchableOpacity style={styles.box} onPress={() => this.checkItem(i)}>
            <Image source={check} style={styles.imageCheck} />
          </TouchableOpacity>
          <Image source={{ uri: data.image }} style={[styles.image, { marginRight: 10 }]} />
          <Text style={[styles.textTitle, { marginTop: -5 }]}>{data.name}</Text>
        </View>
      )
    })
    const renderProblems = complainData.map((data, i) => {
      let check
      if (data.check) {
        check = Images.centangBiru
      } else {
        check = null
      }
      return (
        <View style={styles.rowContainer} key={i}>
          <TouchableOpacity style={styles.box} onPress={() => this.checkProblems(i)}>
            <Image source={check} style={styles.imageCheck} />
          </TouchableOpacity>
          <Text style={[styles.textTitle, { marginTop: -5 }]}>{data.label}</Text>
        </View>
      )
    })
    return (
      <View style={styles.contentContainer}>
        <View style={styles.triangleContainer}>
          <View style={styles.triangleOuter}>
            <View style={styles.triangle} />
          </View>
          <View style={styles.triangleOuter} />
        </View>
        <View style={styles.content}>
          <Text style={[styles.textTitle, { marginBottom: 10 }]}>Pilih barang yang bermasalah</Text>
          {renderItems}
          <Text style={[styles.textTitle, { marginBottom: 10 }]}>Masalah yang terjadi</Text>
          {renderProblems}
          <Text style={styles.textTitle}>Solusi yang diinginkan</Text>
          <CustomRadio
            data={this.state.solutionData}
            handlingRadio={(index1, value1) =>
              this.handlingRadio(index1, value1)}
            vertical
          />
          <Text style={styles.textTitle}>Upload Foto</Text>
          <View style={{ marginBottom: 20 }}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.scrollView}
            >
              <ListView
                enableEmptySections
                horizontal
                contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
                dataSource={this.dataSource.cloneWithRows(this.state.dataPhotos)}
                renderRow={this.renderRowPhotos.bind(this)}
              />

              <TouchableOpacity style={styles.addPhoto} onPress={() => this.setState({showModalCamera: true})}>
                <Image source={Images.plus} style={styles.imageplus} />
              </TouchableOpacity>
            </ScrollView>
          </View>
          <Text style={styles.textTitle}>Keterangan</Text>
          <View style={styles.questionContainer}>
            <TextInput
              style={[styles.textInput, { height: this.state.heightComplain }]}
              multiline
              value={this.state.complain}
              onContentSizeChange={(event) => {
                this.setState({height: event.nativeEvent.contentSize.heightComplain})
              }}
              keyboardType='default'
              autoCapitalize='none'
              autoCorrect
              onChangeText={this.handleComplain}
              underlineColorAndroid='transparent'
              placeholder='Tulis keluhan Anda..'
            />
          </View>
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
    const { bucketId, id, dataReview } = this.state
    this.setState({
      loading: true
    })
    this.props.addReview(bucketId, id, dataReview)
  }

  sendComplain () {
    const { dataReview, complainData, dataPhotos } = this.state
    let product = []
    let problems = []
    for (var i = 0; i < dataReview.length; i++) {
      if (dataReview[i].check) {
        product.push(dataReview[i].product_id)
      }
    }
    for (var j = 0; j < complainData.length; j++) {
      if (complainData[j].check) {
        problems.push(complainData[j].id)
      }
    }
    if (product.length > 0 && problems.length > 0 && dataPhotos.length) {
      const postData = new FormData()
      this.state.dataPhotos.map(data => {
        postData.append('images', { uri: data, type: 'image/jpg', name: 'image.jpg' })
      })
      postData.append('type', 'product')
      this.props.photoUpload(postData)
      this.setState({loading: true})
    } else {
      ToastAndroid.show('Mohon lengkapi data', ToastAndroid.LONG)
    }
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
          <Text style={[styles.textWhite, { marginTop: -2 }]}>Kirim Komplain</Text>
        </TouchableOpacity>
      </View>
    )
  }

  modalCamera () {
    return (
      <CameraModal
        visible={this.state.showModalCamera}
        onClose={() => {
          this.setState({showModalCamera: false})
        }}
        onPress={() => {
          this.setState({showModalCamera: false})
        }}
        onPhotoCaptured={(path) => {
          this.addPhoto(path)
        }}
      />
    )
  }

  handleReview = (text, index) => {
    let temp = this.state.dataReview
    temp[index].review = text
    this.setState({
      dataReview: temp
    })
  }

  handleComplain = (text) => {
    this.setState({ complain: text })
  }
  render () {
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.renderItem()}
          {this.renderVote()}
          {this.renderContent()}
        </ScrollView>
        {this.modalCamera()}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataInvoice: state.buyerInvoiceDetail,
    dataAddReview: state.addReviews,
    dataAddComplain: state.addComplaint,
    dataPhoto: state.upload
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addReview: (transId, invoiceId, reviews) => dispatch(reviewAction.addReviews({
      transId: transId, invoiceId: invoiceId, reviews: reviews})),
    addComplain: (id, invoiceId, products, problems, solution, note, images) => dispatch(transactionAction.addComplaint({
      id: id,
      invoiceId: invoiceId,
      products: products,
      problems: problems,
      solution: solution,
      note: note,
      images: images
    })),
    photoUpload: (data) => dispatch(storeAction.photoUpload({data: data}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionItemReceived)
