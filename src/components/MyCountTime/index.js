import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Alert} from 'react-native';
import {connect} from 'react-redux';
// 倒计时组件
class MyCountTime extends Component {
  constructor(props) {
    super(props);
    let timeLeft = this.props.timeLeft > 0 ? this.props.timeLeft : 90;
    let width = this.props.width || 100;
    let height = this.props.height || 50;
    let color = this.props.color || '#42A5F5';
    let fontSize = this.props.fontSize || 30;
    let fontWeight = this.props.fontWeight || '600';
    let borderColor = this.props.borderColor || '#42A5F5';
    let borderWidth = this.props.borderWidth || 1;
    let borderRadius = this.props.borderRadius || 4;
    let backgroundColor = this.props.backgroundColor || '#42A5F5';
    let begin = 0;
    let press = this.props.press;
    let isUseOf = this.props.isUseOf;
    this.afterEnd = this.props.afterEnd || this._afterEnd;
    this.style = this.props.style;

    this.state = {
      timeLeft: timeLeft,
      begin: begin,
    };
    this.countTextStyle = {
      textAlign: 'center',
      color: '#42A5F5',
      fontSize: fontSize,
      fontWeight: fontWeight,
    };
    this.countViewStyle = {
      backgroundColor: backgroundColor,
      alignItems: 'center',
      borderColor: borderColor,
      borderWidth: borderWidth,
      borderRadius: borderRadius,
      width: width,
      height: height,
    };
  }
  interval = null;

  countdownfn(timeLeft, callback, begin) {
    if (timeLeft > 0) {
      this.state.begin = 1;

      let that = this;

      let beginTime = new Date().getTime(); //点击发送验证码后的开始时间

      this.interval = setInterval(function () {
        //计时器开始工作，每工作一次，返回一个新的时间newTime，进入后台，这个时间就停止了
        let newTime = new Date().getTime();

        //difftime就是两个时间之间的时间差
        let difftime = (newTime - beginTime) / 1000;
        //将difftime转换成整型
        difftime = parseInt(difftime);

        //如果开始时间和计时器工作时间的差大于等于90，则清除计时器，如果没有就显示倒计时
        if (difftime > 89) {
          clearInterval(that.interval);
          callback(that);
        } else {
          that.setState({
            timeLeft: 90 - difftime,
          });
        }
      }, 1000);
    }
  }

  _beginCountDown() {
    const {formData} = this.props;

    const username = formData.username;
    if (!username) {
      Alert.alert('请先输入用户名', '', [{text: '确定'}]);
      return;
    }
    if (this.state.begin === 1) {
      return;
    }
    let time = this.state.timeLeft;
    let afterEnd = this.afterEnd;
    let begin = this.state.begin;
    this.countdownfn(time, afterEnd, begin);
    this.props.userSmsCode();
  }

  _afterEnd(that) {
    that.setState({
      begin: 0,
      timeLeft: 90,
    });
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this._beginCountDown.bind(this)}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          backgroundColor: 'rgba(178,178,178,0.4)',
        }}>
        <Text
          style={{zIndex: 9, fontSize: 14, color: '#DF01D7', marginRight: 8}}>
          {' '}
          {this.state.begin === 0 ? '获取验证码' : this.state.timeLeft + `s`}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default connect(
  ({loading, global, users}) => ({
    loading: loading.effects.users,
    token: global.token,
    formData: users.formData,
  }),
  ({users, AntBase}) => ({
    userSmsCode: users.userSmsCode,
    update: users.update,
    updateForm: users.updateForm,
  }),
)(MyCountTime);
