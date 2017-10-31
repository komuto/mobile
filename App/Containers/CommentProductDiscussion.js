import React from 'react'
import {
  View,
  Image,
  Text,
  ListView,
  ActivityIndicator,
  RefreshControl,
  TextInput,
  Alert,
  ToastAndroid,
  TouchableOpacity
} from 'react-native'
import moment from 'moment'
import { connect } from 'react-redux'
import { MaskService } from 'react-native-masked-text'
import { Colors, Images } from '../Themes'
import * as productAction from '../actions/product'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/DiskusiProdukKomentarStyle'

class DiskusiProdukKomentar extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      id: this.props.id,
      data: this.props.data,
      foto: this.props.foto,
      price: this.props.price,
      namaProduk: this.props.namaProduk,
      discussionId: this.props.discussionId,
      page: 1,
      loadmore: true,
      isRefreshing: false,
      isLoading: false,
      komentar: '',
      getData: this.props.getData
    }
    moment.locale('id')
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataDiskusi.status === 200) {
      if (nextProps.dataDiskusi.comments.comments.length > 0) {
        if (this.state.getData) {
          this.setState({
            data: nextProps.dataDiskusi.comments.comments,
            page: this.state.page + 1,
            isRefreshing: false,
            isLoading: false,
            loadmore: true,
            getData: false
          })
        } else {
          let data = [...this.state.data, ...nextProps.dataDiskusi.comments.comments]
          this.setState({
            data: data,
            page: this.state.page + 1,
            isRefreshing: false,
            isLoading: false,
            loadmore: true
          })
        }
      } else {
        this.setState({
          loadmore: false,
          isLoading: false
        })
      }
    } else if (nextProps.dataDiskusi.status !== 200 && nextProps.dataDiskusi.status !== 0) {
      this.setState({
        isRefreshing: false,
        isLoading: false,
        loadmore: false
      })
      ToastAndroid.show(nextProps.dataDiskusi.message, ToastAndroid.LONG)
    }
    if (nextProps.tambahKomentar.status === 200) {
      ToastAndroid.show('Komentar berhasil ditambahkan', ToastAndroid.LONG)
      this.setState({ data: [], komentar: '', page: 1 })
      this.props.getComment(this.state.discussionId, 1)
      this.props.resetNewComment()
    } else if (nextProps.tambahKomentar.status !== 200 && nextProps.tambahKomentar.status !== 0) {
      this.setState({ data: [], komentar: '', page: 1 })
      ToastAndroid.show(nextProps.tambahKomentar.message, ToastAndroid.LONG)
      this.props.resetNewComment()
    }
  }

  refresh = () => {
    this.setState({ isRefreshing: true, data: [], page: 1, isLoading: true })
    this.props.getComment(this.state.discussionId, 1)
  }

  handlePertanyaan = (text) => {
    this.setState({ komentar: text })
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
          <Image
            source={{ uri: this.state.foto }}
            style={styles.styleFotoToko}
          />
          <View style={styles.namaContainer}>
            <Text style={styles.textNama}>
              {this.state.namaProduk}
            </Text>
            <Text style={styles.textKelola}>
              {totalHarga}
            </Text>
          </View>
        </View>
      </View>
    )
  }

  renderRow (rowData) {
    const time = moment(rowData.created_at * 1000).fromNow()
    return (
      <View style={styles.diskusiContainer}>
        <View style={styles.profileContainer}>
          <Image source={{ uri: rowData.user.photo }} style={styles.foto} />
          <View style={styles.infoUser}>
            <Text style={styles.textNama}>
              {rowData.user.name}
            </Text>
            <Text style={styles.textKelola}>
              {time}
            </Text>
          </View>
        </View>
        <View style={styles.profileContainer}>
          <View style={styles.foto} />
          <View style={styles.infoContainerRow}>
            <Text style={styles.questionContainer}>
              {rowData.content}
            </Text>
          </View>
        </View>
      </View>
    )
  }

  renderListDiskusi () {
    if (this.state.data.length > 0) {
      return (
        <ListView
          dataSource={this.dataSource.cloneWithRows(this.state.data)}
          renderRow={this.renderRow.bind(this)}
          style={{ marginBottom: 50 }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this.refresh}
              tintColor={Colors.red}
              colors={[Colors.red, Colors.bluesky, Colors.green, Colors.orange]}
              title='Loading...'
              titleColor={Colors.red}
              progressBackgroundColor={Colors.snow}
            />
          }
          onEndReached={this.loadMore.bind(this)}
          renderFooter={() => {
            if (this.state.loadmore && this.state.data > 10) {
              return (
                <ActivityIndicator
                  style={[styles.loadingStyle, { height: 50 }]}
                  size='small'
                  color='#ef5656'
                />
              )
            } else {
              return <View />
            }
          }}
          enableEmptySections
        />
      )
    }
    return null
  }

  loadMore () {
    const { discussionId, page, loadmore, isLoading } = this.state
    if (!isLoading) {
      if (loadmore) {
        this.setState({ isLoading: true })
        this.props.getComment(discussionId, page)
      }
    }
  }

  kirimKomentar () {
    const { komentar, discussionId } = this.state
    if (komentar !== '') {
      this.props.newComment(discussionId, komentar)
    } else {
      Alert.alert('Pesan', 'Mohon tulis komentar anda dahulu')
    }
  }

  renderFloatImage () {
    let image
    if (this.state.komentar === '') {
      image = Images.sendMessageInactive
    } else {
      image = Images.sendMessage
    }
    return (
      <View style={styles.floatImageContainer}>
        <TextInput
          style={styles.textInput}
          value={this.state.komentar}
          keyboardType='default'
          autoCapitalize='none'
          autoCorrect
          blurOnSubmit
          onSubmitEditing={() => this.kirimKomentar()}
          onChangeText={this.handlePertanyaan}
          underlineColorAndroid='transparent'
          placeholder='Tulis Komentar'
        />
        <TouchableOpacity style={styles.sendContainer} onPress={() => this.kirimKomentar()}>
          <Image source={image} style={styles.sendMessage} />
        </TouchableOpacity>
      </View>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        {this.renderProduct()}
        {this.renderListDiskusi()}
        {this.renderFloatImage()}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataDiskusi: state.comments,
    tambahKomentar: state.newComment
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getComment: (id, page) => dispatch(productAction.getComment({ id: id, page: page })),
    newComment: (id, content) => dispatch(productAction.newComment({ id: id, content: content })),
    resetNewComment: () => dispatch(productAction.resetNewComment())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DiskusiProdukKomentar)
