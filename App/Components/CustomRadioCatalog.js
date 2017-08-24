import React from 'react'
import { View } from 'react-native'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button'
import styles from './Styles/CustomRadioStyle'
import { Colors } from '../Themes'

export default class CustomRadioCatalog extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: this.props.data,
      horizontal: this.props.horizontal || false,
      vertical: this.props.vertical || false,
      index: this.props.index || 0,
      label: ''
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <RadioForm
          formHorizontal={this.state.horizontal}
          formVertical={this.state.vertical}
          animation
        >
          {this.state.data.map((obj, i) => {
            var onPress = () => {
              console.log('index', obj.index, obj.label)
              this.setState({
                index: obj.index,
                label: obj.label
              })

              this.props.handlingRadio(obj.index, obj.label)
            }
            return (
              <RadioButton labelHorizontal key={obj.index} >
                {/*  You can set RadioButtonLabel before RadioButtonInput */}
                <RadioButtonInput
                  obj={obj}
                  index={obj.index}
                  isSelected={this.state.index === obj.index}
                  onPress={onPress}
                  buttonInnerColor={Colors.bluesky}
                  buttonOuterColor={this.state.index === obj.index ? Colors.bluesky : Colors.steel}
                  buttonSize={20}
                  buttonStyle={{ borderWidth: 1 }}
                  buttonWrapStyle={styles.buttonWrap}
                />
                <RadioButtonLabel
                  obj={obj}
                  index={i}
                  labelHorizontal
                  onPress={onPress}
                  labelStyle={styles.label}
                  labelWrapStyle={{}}
                />
              </RadioButton>
            )
          })}
        </RadioForm>
      </View>
    )
  }
}
