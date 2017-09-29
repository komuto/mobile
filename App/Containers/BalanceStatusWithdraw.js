import React from 'react'
import { View, ListView, Text, Image, RefreshControl, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { MaskService } from 'react-native-masked-text'
import { Images, Colors } from '../Themes'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import * as saldoAction from '../actions/saldo'
// import YourActions from '../Redux/YourRedux'
import moment from 'moment'

// Styles
import styles from './Styles/BalanceStatusWithdrawStyle'

class BalanceStatusWithdraw extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      data: [],
      months: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli',
        'Agustus', 'September', 'Oktober', 'November', 'Desember'],
      isRefreshing: true,
      page: 1,
      loadmore: true
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataWithdraw.status === 200) {
      if (nextProps.dataWithdraw.statuses.length > 0) {
        const data = [...this.state.data, ...nextProps.dataWithdraw.statuses]
        this.setState({
          data: data,
          isRefreshing: false,
          page: this.state.page + 1,
          loadmore: true,
          isLoading: false
        })
      } else {
        this.setState({
          loadmore: false,
          isLoading: false
        })
      }
      nextProps.dataWithdraw.status = 0
    }
  }

  renderRow (rowData) {
    let image, status, textStyle, imageStyle
    if (rowData.status === 1) {
      image = Images.centangBiru
      status = 'Sukses'
      textStyle = Colors.darkMint
      imageStyle = { tintColor: Colors.darkMint }
    } else if (rowData.status === 0) {
      image = Images.waiting
      status = 'Waiting'
      textStyle = Colors.textYellow
      imageStyle = null
    }
    const money = MaskService.toMask('money', rowData.amount, {
      unit: 'Rp ',
      separator: '.',
      delimiter: '.',
      precision: 3
    })
    const day = parseInt(moment.unix(rowData.created_at).format('DD'))
    const month = parseInt(moment.unix(rowData.created_at).format('MM'))
    const textMonth = this.state.months[month].substring(0, 3)
    const year = moment.unix(rowData.created_at).format('YYYY')
    if (rowData.status === 2) {
      return (
        <View style={styles.rowContainer}>
          <View style={styles.dataContainer}>
            <Text style={[styles.textTitle, { flex: 1 }]}>
              {rowData.bank_account.bank.name} - {rowData.bank_account.holder_account_number}
            </Text>
            <Text style={styles.textTitle}>+ {money}</Text>
          </View>
          <View style={styles.dateContainer}>
            <Text style={[styles.textDate, { flex: 1 }]}>{day} {textMonth} {year}</Text>
            <Text style={[styles.textRed, { marginRight: 10 }]}>X</Text>
            <Text style={styles.textRed}>Gagal</Text>
          </View>
        </View>
      )
    }
    return (
      <View style={styles.rowContainer}>
        <View style={styles.dataContainer}>
          <Text style={[styles.textTitle, { flex: 1 }]}>
            {rowData.bank_account.bank.name} - {rowData.bank_account.holder_account_number}
          </Text>
          <Text style={styles.textTitle}>+ {money}</Text>
        </View>
        <View style={styles.dateContainer}>
          <Text style={[styles.textDate, { flex: 1 }]}>{day} {textMonth} {year}</Text>
          <Image source={image} style={[styles.image, imageStyle]} />
          <Text style={[styles.textRed, { color: textStyle }]}>{status}</Text>
        </View>
      </View>
    )
  }

  refresh = () => {
    this.setState({ isRefreshing: true, data: [], loadmore: true, page: 1 })
    this.props.getStatusWitdhdraw(1)
  }

  loadMore () {
    const { page, loading, loadmore } = this.state
    if (!loading) {
      if (loadmore) {
        this.props.getStatusWitdhdraw(page)
      }
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.dataSource.cloneWithRows(this.state.data)}
          renderRow={this.renderRow.bind(this)}
          enableEmptySections
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
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataWithdraw: state.withdrawStatus
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getStatusWitdhdraw: (page) => dispatch(saldoAction.getWithdrawStatus({page: page}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BalanceStatusWithdraw)
