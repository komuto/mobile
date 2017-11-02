import React from 'react'
import {
  View,
  ListView,
  TouchableOpacity,
  Text,
  Image,
  Modal,
  ActivityIndicator,
  DatePickerAndroid,
  RefreshControl,
  ToastAndroid
} from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import moment from 'moment'
import { MaskService } from 'react-native-masked-text'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import * as saldoAction from '../actions/saldo'
// import YourActions from '../Redux/YourRedux'
import { Images, Colors } from '../Themes'
// Styles
import styles from './Styles/BalanceHistoryStyle'

class BalanceHistory extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      number: 0,
      data: [],
      filter: [
        {
          'label': 'Komisi Reseller',
          'tag': 'commission',
          'check': false
        },
        {
          'label': 'Dana Penjualan Barang',
          'tag': 'sale',
          'check': false
        },
        {
          'label': 'Dana Refund Barang',
          'tag': 'refund',
          'check': false
        },
        {
          'label': 'Top Up Saldo',
          'tag': 'topup',
          'check': false
        },
        {
          'label': 'Pembelian Barang',
          'tag': 'buy',
          'check': false
        },
        {
          'label': 'Penarikan Saldo',
          'tag': 'withdraw',
          'check': false
        }
      ],
      modalFilter: false,
      startDate: '30 November 2015',
      endDate: '30 November 2017',
      months: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli',
        'Agustus', 'September', 'Oktober', 'November', 'Desember'],
      page: 1,
      startAt: 1448841600,
      endAt: 1512000000,
      isRefreshing: false,
      isLoading: true,
      loadmore: true,
      isFiltering: false,
      dataFilter: []
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dataHistory.status === 200) {
      if (this.state.isFiltering) {
        this.setState({
          data: nextProps.dataHistory.history,
          page: this.state.page + 1,
          isRefreshing: false,
          isLoading: false,
          loadmore: true,
          isFiltering: false
        })
      } else {
        if (nextProps.dataHistory.history.length > 0) {
          let data = [...this.state.data, ...nextProps.dataHistory.history]
          this.setState({
            data: data,
            page: this.state.page + 1,
            isRefreshing: false,
            isLoading: false,
            loadmore: true
          })
        } else {
          this.setState({
            loadmore: false,
            isLoading: false,
            isRefreshing: false
          })
        }
      }
    } else if (nextProps.dataHistory.status !== 200 && nextProps.dataHistory.status !== 0) {
      this.setState({
        data: [],
        page: 1,
        isRefreshing: false,
        isLoading: false,
        loadmore: false,
        isFiltering: false
      })
      ToastAndroid.show(nextProps.dataHistory.message, ToastAndroid.LONG)
    }
  }

  renderNavbar () {
    return (
      <View style={styles.navbarContainer}>
        <TouchableOpacity onPress={() => this.back()}>
          <Image source={Images.iconBack} style={styles.arrow} />
        </TouchableOpacity>
        <Text style={styles.navbarText}>Riwayat Saldo</Text>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => this.setState({modalFilter: true})}
        >
          <Image source={Images.filterWhite} style={styles.arrow} />
          <View style={styles.numberContainer}>
            <Text style={styles.number}>{this.state.number}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  back () {
    NavigationActions.pop()
    return true
  }

  refresh = () => {
    const { dataFilter, startAt, endAt } = this.state
    this.setState({ isRefreshing: true, data: [], page: 1, isLoading: true })
    this.props.getSaldoHistory(1, dataFilter, startAt, endAt)
  }

  loadMore () {
    const { page, dataFilter, startAt, endAt, isLoading, loadmore } = this.state
    if (!isLoading) {
      if (loadmore) {
        this.setState({ isLoading: true })
        this.props.getSaldoHistory(page, dataFilter, startAt, endAt)
      }
    }
  }

  maskedMoney (value) {
    let price
    if (value < 1000) {
      price = 'Rp ' + value
    }
    if (value >= 1000) {
      price = MaskService.toMask('money', value, {
        unit: 'Rp ',
        separator: '.',
        delimiter: '.',
        precision: 3
      })
    }
    return price
  }

  renderListView () {
    return (
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
    )
  }

  renderRow (rowData) {
    let money
    if (rowData.last_saldo > rowData.first_saldo) {
      const moneyText = this.maskedMoney(rowData.last_saldo - rowData.first_saldo)
      money = (
        <Text style={styles.textMoneyGreen}>+{moneyText}</Text>
      )
    } else {
      const moneyText = this.maskedMoney(rowData.first_saldo - rowData.last_saldo)
      money = (
        <Text style={styles.textMoneyRed}>-{moneyText}</Text>
      )
    }
    const day = moment.unix(rowData.date).format('DD')
    const month = parseInt(moment.unix(rowData.date).format('MM')) - 1
    const textMonth = this.state.months[month].substring(0, 3)
    const year = moment.unix(rowData.date).format('YYYY')
    const balanceText = this.maskedMoney(rowData.last_saldo)
    return (
      <TouchableOpacity style={styles.rowContainer} onPress={() => this.detail(rowData.trans_type, rowData.id)}>
        <View style={styles.dataContainer}>
          <View style={styles.data}>
            <Text style={[styles.textTitle, {marginBottom: 5}]}>{rowData.remark}</Text>
            <Text style={styles.textDate}>{day} {textMonth} {year}</Text>
          </View>
          <View style={styles.money}>
            {money}
            <Image source={Images.rightArrow} style={styles.arrow} />
          </View>
        </View>
        <View style={styles.balanceContainer}>
          <Text style={styles.textBalance}>{balanceText}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  renderModalFilter () {
    const { filter } = this.state
    const renderItems = filter.map((data, i) => {
      if (data.check) {
        return (
          <TouchableOpacity style={styles.filterContainer} key={i} onPress={() => this.check(i)}>
            <View style={styles.boxChecked}>
              <Image source={Images.centang} style={styles.imageCheck} />
            </View>
            <Text style={styles.textTitle}>{data.label}</Text>
          </TouchableOpacity>
        )
      } else {
        return (
          <TouchableOpacity style={styles.filterContainer} key={i} onPress={() => this.check(i)}>
            <View style={styles.box} />
            <Text style={styles.textTitle}>{data.label}</Text>
          </TouchableOpacity>
        )
      }
    })
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.state.modalFilter}
        onRequestClose={() => this.setState({ modalFilter: false })}
        >
        <TouchableOpacity
          style={styles.modalContainer}
          onPress={() => this.setState({modalFilter: false})}
        >
          <View style={styles.contentModalContainer}>
            <Text style={[styles.textBalance, { marginBottom: 20 }]}>Jenis Mutasi Saldo</Text>
            {renderItems}
            <Text style={[styles.textBalance, { marginTop: 20, marginBottom: 10 }]}>Tanggal Awal</Text>
            <TouchableOpacity style={styles.dateContainer} onPress={() => this.openStartDate()}>
              <Text style={[styles.textDate, { flex: 1 }]}>{this.state.startDate}</Text>
              <Image style={styles.arrow} source={Images.down} />
            </TouchableOpacity>
            <Text style={[styles.textBalance, { marginTop: 20, marginBottom: 10 }]}>Tanggal Akhir</Text>
            <TouchableOpacity style={styles.dateContainer} onPress={() => this.openEndDate()}>
              <Text style={[styles.textDate, { flex: 1 }]}>{this.state.endDate}</Text>
              <Image style={styles.arrow} source={Images.down} />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={styles.buttonApply} onPress={() => this.applyFilter()}>
                <Text style={styles.textButton}>Terapkan Filter</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    )
  }

  async openStartDate () {
    const { months } = this.state
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        mode: 'calendar',
        date: new Date()
      })
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
        const tempLabel = (parseInt(month) + 1) + '/' + day + '/' + year
        const d = new Date(tempLabel)

        const tempTimestamp = day + '/' + (parseInt(month) + 1) + '/' + year
        const bulan = months[d.getMonth()]
        const label = day + ' ' + bulan + ' ' + year

        const timestamp = moment(tempTimestamp, 'DD-MM-YYYY').unix()

        this.setState({
          startDate: label,
          startAt: timestamp
        })
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message)
    }
  }

  async openEndDate () {
    const { months } = this.state
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        mode: 'calendar',
        date: new Date()
      })
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
        const tempLabel = (parseInt(month) + 1) + '/' + day + '/' + year
        const d = new Date(tempLabel)

        const tempTimestamp = day + '/' + (parseInt(month) + 1) + '/' + year
        const bulan = months[d.getMonth()]
        const label = day + ' ' + bulan + ' ' + year

        const timestamp = moment(tempTimestamp, 'DD-MM-YYYY').unix()

        this.setState({
          endDate: label,
          endAt: timestamp
        })
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message)
    }
  }

  check (index) {
    const tempData = this.state.filter
    let number = this.state.number
    if (tempData[index].check) {
      tempData[index].check = false
      number = number - 1
      this.setState({
        number: number
      })
    } else {
      tempData[index].check = true
      number = number + 1
      this.setState({
        number: number
      })
    }
    const newDataSource = tempData.map(data => {
      return {...data}
    })
    this.setState({
      filter: newDataSource
    })
  }

  detail (category, id) {
    if (category === 'SELL') {
      NavigationActions.balancehistoryselling({
        type: ActionConst.PUSH
      })
      this.props.getDetailHistory(id)
    } else if (category === 'RFND') {
      NavigationActions.balancehistoryrefund({
        type: ActionConst.PUSH
      })
      this.props.getDetailHistory(id)
    } else if (category === 'TPUP') {
      NavigationActions.balancehistorytopup({
        type: ActionConst.PUSH
      })
      this.props.getDetailHistory(id)
    } else if (category === 'SFEE') {
      NavigationActions.balancehistorycomission({
        type: ActionConst.PUSH
      })
      this.props.getDetailHistory(id)
    } else if (category === 'WTHD') {
      NavigationActions.balancehistorywithdraw({
        type: ActionConst.PUSH
      })
      this.props.getDetailHistory(id)
    } else if (category === 'PAID') {
      NavigationActions.balancehistorypurchase({
        type: ActionConst.PUSH
      })
      this.props.getDetailHistory(id)
    }
  }

  applyFilter () {
    const { startAt, endAt, filter } = this.state
    let temp = []
    for (var i = 0; i < filter.length; i++) {
      if (filter[i].check) {
        temp.push(filter[i].tag)
      }
    }
    this.props.getSaldoHistory(1, temp, startAt, endAt)
    console.log(temp)
    this.setState({modalFilter: false, isLoading: true, data: [], dataFilter: temp, page: 1, isFiltering: true})
  }

  render () {
    return (
      <View style={styles.container}>
        {this.renderNavbar()}
        {this.renderListView()}
        {this.renderModalFilter()}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataHistory: state.saldoHistory
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSaldoHistory: (page, filter, startAt, endAt) => dispatch(saldoAction.getSaldoHistory({
      page: page,
      filter: filter,
      start_at: startAt,
      end_at: endAt
    })),
    getDetailHistory: (id) => dispatch(saldoAction.getSaldoHistoryDetail({id: id}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BalanceHistory)
