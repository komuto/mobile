import React from 'react'
import {
  View,
  Image,
  Text,
  ListView,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  ToastAndroid
} from 'react-native'
import moment from 'moment'
import { connect } from 'react-redux'
import { MaskService } from 'react-native-masked-text'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import { Images, Colors } from '../Themes'
import * as productAction from '../actions/product'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/DiskusiProdukStyle'

class ProductDiscussion extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      id: this.props.id,
      data: this.props.data,
      foto: this.props.foto,
      price: this.props.price,
      namaProduk: this.props.namaProduk,
      page: 1,
      loadmore: true,
      isRefreshing: false,
      isLoading: false,
      callback: false
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.callback !== undefined) {
      if (nextProps.callback !== this.state.callback) {
        this.refresh()
        this.setState({
          callback: nextProps.callback,
          isLoading: false
        })
      }
    }
    if (nextProps.dataDiskusi.status === 200) {
      if (nextProps.dataDiskusi.discussions.length > 0) {
        console.log(nextProps.dataDiskusi.discussions)
        let data = [...this.state.data, ...nextProps.dataDiskusi.discussions]
        this.setState({
          data: data,
          page: this.state.page + 1,
          isRefreshing: false,
          isLoading: false,
          loadmore: true
        })
      } else {
        console.log('end')
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
  }

  refresh = () => {
    this.setState({ isRefreshing: true, data: [], page: 1, isLoading: true })
    this.props.getDiscussion(this.state.id, 1)
  }

  detailDiskusi (id, page) {
    this.props.getComment(id, page)
    NavigationActions.commentproductdiscussion({
      id: this.state.id,
      type: ActionConst.PUSH,
      price: this.state.price,
      foto: this.state.foto,
      namaProduk: this.state.namaProduk,
      discussionId: id,
      data: [],
      getData: true
    })
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
    const time = moment(rowData.created_at * 1000).startOf('hour').fromNow()
    console.log(moment().format('x'))
    console.log(rowData.created_at * 1000)
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
              {rowData.question}
            </Text>
          </View>
        </View>
        <View style={styles.komentarContainer}>
          <View style={styles.foto} />
          <TouchableOpacity style={styles.infoContainerRow} onPress={() => this.detailDiskusi(rowData.id, 1)}>
            <Image source={Images.diskusiGrey} style={styles.logoDiskusi} />
            <Text style={styles.textKomentarContainer}>
              {rowData.count_comments} komentar
            </Text>
          </TouchableOpacity>
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
    const { id, page, loadmore, isLoading } = this.state
    if (!isLoading) {
      if (loadmore) {
        this.setState({ isLoading: true })
        this.props.getDiscussion(id, page)
      }
    }
  }

  addDiskusi () {
    NavigationActions.newdiscussion({
      type: ActionConst.PUSH,
      id: this.state.id,
      foto: this.state.foto,
      price: this.state.price,
      namaProduk: this.props.namaProduk,
      callback: this.state.callback
    })
  }

  renderFloatImage () {
    return (
      <TouchableOpacity
        style={styles.floatImageContainer}
        onPress={() => this.addDiskusi()}
      >
        <Image source={Images.addDiskusi} style={styles.floatImage} />
      </TouchableOpacity>
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
    dataDiskusi: state.discussions,
    newDiscussion: state.newDiscussion
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDiscussion: (id, page) => dispatch(productAction.getDiscussion({ id: id, page: page })),
    resetDiscussion: () => dispatch(productAction.resetDiscussion()),
    getComment: (id, page) => dispatch(productAction.getComment({ id: id, page: page }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDiscussion)
