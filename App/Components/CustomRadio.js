import React from 'react'
import { View } from 'react-native'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button'
import styles from './Styles/CustomRadioStyle'
import { Colors } from '../Themes'

export default class CustomRadio extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: this.props.data,
      horizontal: this.props.horizontal || false,
      vertical: this.props.vertical || false,
      index: this.props.index || 0,
      label: 0
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
            var onPress = (value, index) => {
              this.setState({
                index: value,
                label: index
              })

              this.props.handlingRadio(obj.value, obj.label)
            }
            return (
              <RadioButton labelHorizontal key={i} >
                {/*  You can set RadioButtonLabel before RadioButtonInput */}
                <RadioButtonInput
                  obj={obj}
                  index={i}
                  isSelected={this.state.index === i}
                  onPress={onPress}
                  buttonInnerColor={Colors.bluesky}
                  buttonOuterColor={this.state.index === i ? Colors.bluesky : Colors.steel}
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

// // Prop type warnings
// CustomRadio.propTypes = {
//   someProperty: React.PropTypes.object,
//   someSetting: React.PropTypes.bool.isRequired
// }
//
// // Defaults for props
// CustomRadio.defaultProps = {
//   someSetting: false
// }
