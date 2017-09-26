import React from 'react'
import { View, ScrollView, ListView, TouchableOpacity, Text, Image, Modal, DatePickerAndroid } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import moment from 'moment'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Images } from '../Themes'
// Styles
import styles from './Styles/BalanceHistoryStyle'

class BalanceHistory extends React.Component {

  constructor (props) {
    super(props)
    this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      number: 4,
      data: [
        {
          'title': 'Dana Penjualan Barang',
          'date': '12 Sept 2017',
          'nominal': 'Rp 250.000',
          'balance': 'Rp 1.000.000',
          'type': 1,
          'cat': 'selling'
        },
        {
          'title': 'Dana Refund Barang',
          'date': '12 Sept 2017',
          'nominal': 'Rp 250.000',
          'balance': 'Rp 1.000.000',
          'type': 2,
          'cat': 'refund'
        },
        {
          'title': 'Top Up Saldo',
          'date': '12 Sept 2017',
          'nominal': 'Rp 250.000',
          'balance': 'Rp 1.000.000',
          'type': 1,
          'cat': 'topup'
        },
        {
          'title': 'Komisi Reseller',
          'date': '12 Sept 2017',
          'nominal': 'Rp 250.000',
          'balance': 'Rp 1.000.000',
          'type': 2,
          'cat': 'comission'
        },
        {
          'title': 'Pembelian Barang',
          'date': '12 Sept 2017',
          'nominal': 'Rp 250.000',
          'balance': 'Rp 1.000.000',
          'type': 1,
          'cat': 'purchase'
        },
        {
          'title': 'Penarikan Saldo',
          'date': '12 Sept 2017',
          'nominal': 'Rp 250.000',
          'balance': 'Rp 1.000.000',
          'type': 2,
          'cat': 'withdraw'
        }
      ],
      filter: [
        {
          'label': 'Komisi Reseller',
          'check': false
        },
        {
          'label': 'Dana Penjualan Barang',
          'check': false
        },
        {
          'label': 'Dana Refund Barang',
          'check': false
        },
        {
          'label': 'Top Up Saldo',
          'check': false
        },
        {
          'label': 'Pembelian Barang',
          'check': false
        },
        {
          'label': 'Penarikan Saldo',
          'check': false
        }
      ],
      modalFilter: false,
      startDate: '26 Agustus 2017',
      endDate: '27 Agustus 2017',
      months: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli',
        'Agustus', 'September', 'Oktober', 'November', 'Desember'],
      timestampStart: '12',
      timestampEnd: '12'
    }
  }

  renderNavbar () {
    return (
      <View style={styles.navbarContainer}>
        <TouchableOpacity>
          <Image source={Images.iconBack} style={styles.arrow} />
        </TouchableOpacity>
        <Text style={styles.navbarText}>History Saldo</Text>
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

  renderListView () {
    return (
      <ListView
        dataSource={this.dataSource.cloneWithRows(this.state.data)}
        renderRow={this.renderRow.bind(this)}
        enableEmptySections
      />
    )
  }

  renderRow (rowData) {
    let money
    if (rowData.type === 1) {
      money = (
        <Text style={styles.textMoneyGreen}>+{rowData.nominal}</Text>
      )
    } else {
      money = (
        <Text style={styles.textMoneyRed}>-{rowData.nominal}</Text>
      )
    }
    return (
      <TouchableOpacity style={styles.rowContainer} onPress={() => this.detail(rowData.cat)}>
        <View style={styles.dataContainer}>
          <View style={styles.data}>
            <Text style={[styles.textTitle, {marginBottom: 5}]}>{rowData.title}</Text>
            <Text style={styles.textDate}>{rowData.date}</Text>
          </View>
          <View style={styles.money}>
            {money}
            <Image source={Images.rightArrow} style={styles.arrow} />
          </View>
        </View>
        <View style={styles.balanceContainer}>
          <Text style={styles.textBalance}>{rowData.balance}</Text>
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
              <TouchableOpacity style={styles.buttonApply}>
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
          timestampStart: timestamp
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
          timestampEnd: timestamp
        })
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message)
    }
  }

  check (index) {
    const tempData = this.state.filter
    if (tempData[index].check) {
      tempData[index].check = false
    } else {
      tempData[index].check = true
    }
    const newDataSource = tempData.map(data => {
      return {...data}
    })
    this.setState({
      filter: newDataSource
    })
  }

  detail (category) {
    if (category === 'selling') {
      NavigationActions.balancehistoryselling({
        type: ActionConst.PUSH
      })
    } else if (category === 'refund') {
      NavigationActions.balancehistoryrefund({
        type: ActionConst.PUSH
      })
    } else if (category === 'topup') {
      NavigationActions.balancehistorytopup({
        type: ActionConst.PUSH
      })
    } else if (category === 'comission') {
      NavigationActions.balancehistorycomission({
        type: ActionConst.PUSH
      })
    } else if (category === 'withdraw') {
      NavigationActions.balancehistorywithdraw({
        type: ActionConst.PUSH
      })
    } else if (category === 'purchase') {
      NavigationActions.balancehistorypurchase({
        type: ActionConst.PUSH
      })
    }
  }

  render () {
    return (
      <View style={styles.container}>
        {this.renderNavbar()}
        <ScrollView>
          {this.renderListView()}
        </ScrollView>
        {this.renderModalFilter()}
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

export default connect(mapStateToProps, mapDispatchToProps)(BalanceHistory)
