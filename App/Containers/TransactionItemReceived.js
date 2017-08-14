import React from 'react'
import { ScrollView, Text, View, Image, TouchableOpacity, TextInput, ListView } from 'react-native'
import { connect } from 'react-redux'
import StarRating from 'react-native-star-rating'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
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
      nama: 'Sepatu Jogging',
      namaToko: 'Sport Station Shop',
      image: 'http://www.tokomesin.com/wp-content/uploads/2015/08/Sate-Ayam-Madura-tokomesin.jpeg',
      invoice: 'Invoice-72342382320/01/2017',
      status: this.props.statusBarang,
      resi: '238423423',
      alamat: 'Jakarta Selatan, DKI Jakarta',
      countProduct: 2,
      vote: 0,
      quality: 0,
      accuracy: 0,
      height: 50,
      heightComplain: 50,
      complain: '',
      review: '',
      activeSolution: 0,
      solutionData: [
        {
          'id': 1,
          'label': 'Refund'
        },
        {
          'id': 2,
          'label': 'Tukar Baru'
        },
        {
          'id': 3,
          'label': 'Lainnya'
        }
      ],
      dataPhotos: []
    }
  }

  renderItem () {
    const { nama, countProduct, image } = this.state
    return (
      <View style={styles.barangContainer}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.barang}>
          <Text style={[styles.textTitle, { marginBottom: 3 }]}>{nama}</Text>
          <Text style={styles.namaToko}>Jumlah: {countProduct}</Text>
        </View>
      </View>
    )
  }

  renderVote () {
    const { vote } = this.state
    if (vote === 0) {
      return (
        <View style={styles.voteContainer}>
          <Text style={styles.textTitle}>Apakah barang yang anda terima sesuai?</Text>
          <View style={styles.vote}>
            <TouchableOpacity style={styles.voteNoDefault} onPress={() => this.setState({vote: 1})}>
              <Image source={Images.thumbDownRed} style={styles.imageVote} />
              <Text style={styles.textRed}>Tidak</Text>
            </TouchableOpacity>
            <View style={styles.separatorVote} />
            <TouchableOpacity style={styles.voteYesDefault} onPress={() => this.setState({vote: 2})}>
              <Image source={Images.thumbUpGreen} style={styles.imageVote} />
              <Text style={styles.textGreen}>Ya</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    } else if (vote === 1) {
      return (
        <View style={styles.voteContainer}>
          <Text style={styles.textTitle}>Apakah barang yang anda terima sesuai?</Text>
          <View style={styles.vote}>
            <TouchableOpacity style={styles.voteNo} onPress={() => this.setState({vote: 1})}>
              <Image source={Images.thumbDown} style={styles.imageVote} />
              <Text style={styles.textWhite}>Tidak</Text>
            </TouchableOpacity>
            <View style={styles.separatorVote} />
            <TouchableOpacity style={styles.voteYesDefault} onPress={() => this.setState({vote: 2})}>
              <Image source={Images.thumbUpGreen} style={styles.imageVote} />
              <Text style={styles.textGreen}>Ya</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    } else if (vote === 2) {
      return (
        <View style={styles.voteContainer}>
          <Text style={styles.textTitle}>Apakah barang yang anda terima sesuai?</Text>
          <View style={styles.vote}>
            <TouchableOpacity style={styles.voteNoDefault} onPress={() => this.setState({vote: 1})}>
              <Image source={Images.thumbDownRed} style={styles.imageVote} />
              <Text style={styles.textRed}>Tidak</Text>
            </TouchableOpacity>
            <View style={styles.separatorVote} />
            <TouchableOpacity style={styles.voteYes} onPress={() => this.setState({vote: 2})}>
              <Image source={Images.thumbUp} style={styles.imageVote} />
              <Text style={styles.textWhite}>Ya</Text>
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
          <Text style={styles.textTitle}>Solusi yang diinginkan</Text>
          <ListView
            enableEmptySections
            dataSource={this.dataSource.cloneWithRows(this.state.solutionData)}
            renderRow={this.renderRow.bind(this)}
            style={{ marginTop: 30, marginBottom: 10 }}
          />
          <Text style={styles.textTitle}>Upload Foto</Text>
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
            <TouchableOpacity style={styles.addPhoto} onPress={() => this.addPhoto()}>
              <Image source={Images.plus} style={styles.imageplus} />
            </TouchableOpacity>
          </ScrollView>
          <Text style={styles.namaToko}>Keterangan</Text>
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

  renderRow (rowData) {
    const { activeSolution } = this.state
    let check
    if (activeSolution === rowData.id) {
      check = Images.centang
    } else {
      check = null
    }
    return (
      <View style={styles.rowContainer}>
        <TouchableOpacity style={styles.box} onPress={() => this.setState({activeSolution: rowData.id})}>
          <Image source={check} style={styles.imageCheck} />
        </TouchableOpacity>
        <Text style={[styles.textTitle, { marginTop: -5 }]}>{rowData.label}</Text>
      </View>
    )
  }

  renderRowPhotos (rowData) {
    return (
      <View style={styles.imageContainer}>
        <Image
          style={styles.photo}
          source={{ uri: rowData.image }}
          borderRadius={7}
        />
        <TouchableOpacity
          style={styles.buttonDeletePictureContainer}
          onPress={() => this.removePhoto(rowData.id)}
        >
          <Image source={Images.closeCircleBack} style={styles.imageCheck} />
        </TouchableOpacity>
      </View>
    )
  }

  addPhoto () {
    const { dataPhotos } = this.state
    const id = dataPhotos.length + 1
    let temp2 = dataPhotos
    const temp = {
      'id': id,
      'image': 'http://www.tokomesin.com/wp-content/uploads/2015/08/Sate-Ayam-Madura-tokomesin.jpeg',
      'label': 'label' + id
    }
    temp2.push(temp)
    this.setState({
      dataPhotos: temp2
    })
  }

  removePhoto (id) {
    console.log(id)
    const { dataPhotos } = this.state
    let temp2 = dataPhotos
    temp2.splice(id - 1, 1)
    this.setState({
      dataPhotos: temp2
    })
  }

  renderVoteTwo () {
    const { quality, accuracy } = this.state
    let textQuality, textAccuracy
    if (quality === 0) {
      textQuality = null
    } else if (quality > 2) {
      textQuality = <Text style={[styles.textReview, { color: Colors.darkMint }]}>Bagus</Text>
    } else {
      textQuality = <Text style={[styles.textReview, { color: Colors.red }]}>Kurang Bagus</Text>
    }
    if (accuracy === 0) {
      textAccuracy = null
    } else if (accuracy > 2) {
      textAccuracy = <Text style={[styles.textReview, { color: Colors.darkMint }]}>Bagus</Text>
    } else {
      textAccuracy = <Text style={[styles.textReview, { color: Colors.red }]}>Kurang Bagus</Text>
    }
    return (
      <View style={styles.contentContainer}>
        <View style={styles.triangleContainer}>
          <View style={styles.triangleOuter} />
          <View style={styles.triangleOuter}>
            <View style={styles.triangle} />
          </View>
        </View>
        <View style={styles.content}>
          <Text style={styles.textTitle}>Kualitas Produk</Text>
          <View style={styles.rateContainer}>
            <StarRating
              maxStars={5}
              starColor={'#ffcd00'}
              emptyStarColor={'#d9e1e9'}
              starSize={30}
              buttonStyle={{ padding: 5 }}
              rating={parseFloat(quality)}
              selectedStar={(rating) => this.setState({quality: rating})}
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
              rating={parseFloat(accuracy)}
              selectedStar={(rating) => this.setState({accuracy: rating})}
            />
            <View style={{ flex: 1 }} />
            {textAccuracy}
          </View>
          <View style={styles.questionContainer}>
            <TextInput
              style={[styles.textInput, { height: this.state.height }]}
              multiline
              value={this.state.review}
              onContentSizeChange={(event) => {
                this.setState({height: event.nativeEvent.contentSize.height})
              }}
              keyboardType='default'
              autoCapitalize='none'
              autoCorrect
              onChangeText={this.handleReview}
              underlineColorAndroid='transparent'
              placeholder='Apa pendapat anda tentang barang ini?'
            />
          </View>
          {this.renderButton()}
        </View>
      </View>
    )
  }

  renderButton () {
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => NavigationActions.transactionnotification({
            type: ActionConst.REPLACE,
            typeNotification: ''
          })}
        >
          <Text style={[styles.textWhite, { marginTop: -2 }]}>Kirim Ulasan</Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderButtonComplain () {
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => NavigationActions.transactionnotification({
            type: ActionConst.REPLACE,
            typeNotification: 'complain'
          })}
        >
          <Text style={[styles.textWhite, { marginTop: -2 }]}>Kirim Komplain</Text>
        </TouchableOpacity>
      </View>
    )
  }

  handleReview = (text) => {
    this.setState({ review: text })
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

export default connect(mapStateToProps, mapDispatchToProps)(TransactionItemReceived)
