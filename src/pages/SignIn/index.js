import React, {Component} from 'react';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {
  TextInput,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  Platform,
  ImageBackground,
} from 'react-native';
import {
  Button,
  ButtonGroup,
  Flex,
  Spacing,
  P,
  Icon,
  U,
} from '@uiw/react-native';

import Global from '../../global';
import Footer from '../../components/Footer';
import MyCountTime from '../../components/MyCountTime';

import {username, mima, xxx, user} from '../../components/icons/signin';
import conf from '../../config';
import Title from './Title';

class SigninScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageState: false,
      hostType: '',
    };
  }
  async componentDidMount() {
    const {navigation} = this.props;
    if (navigation && Global) {
      Global.navigation = navigation;
    }
    this._getHostType();
  }
  goToOptions = () => {
    this.props.navigation.navigate('DevOptions');
  };
  onChangeUserName = (text) => this.props.updateForm({username: text});
  onChangePassWord = (text) => {
    this.props.updateForm({password: text});
  };

  onSubmit = () => this.props.login();

  _getHostType = async () => {
    if (conf.production) {
      const productionOptions = conf.hosts.find(
        (itm) => itm.type === 'production',
      );
      await AsyncStorage.setItem('apihost', JSON.stringify(productionOptions));
    } else {
      const host = await AsyncStorage.getItem('apihost');
      this.setState({
        hostType: JSON.parse(host).type,
      });
    }
  };
  onClick = () => {
    this.props.updateForm({username: ''});
  };

  render() {
    const {formData, loading, navigation} = this.props;
    const {hostType} = this.state;

    return (
      <SafeAreaView style={styles.block}>
        <ImageBackground
          source={require('../../utils/img/t4.jpeg')}
          style={{flex: 1}}>
          <StatusBar barStyle="dark-content" />
          {/* 增加判断，在登录页面，如果是安卓，则手机状态栏变成白色 */}
          {Platform.OS === 'ios' ? null : <StatusBar backgroundColor="#fff" />}
          <ScrollView
            keyboardShouldPersistTaps="handled"
            style={{flex: 1}}
            scrollEnabled={false}>
            <Flex align="center" direction="column" style={{flex: 1}}>
              <Flex
                justify="center"
                align="center"
                direction="column"
                style={{height: 260}}>
                {/* <Image style={{ width: 100, height: 80 }} source={require('../../utils/img/WechatIMG6.png')} /> */}
                <Title>Happy Life</Title>
              </Flex>
              <Flex
                align="center"
                direction="column"
                style={{flex: 1, marginHorizontal: 45}}>
                <Flex
                  align="center"
                  style={{
                    borderBottomColor: '#848484',
                    borderBottomWidth: 1,
                    backgroundColor: 'rgba(178,178,178,0.8)',
                  }}>
                  <Icon style={styles.icons} xml={user} size={24}></Icon>
                  <TextInput
                    value={formData.username}
                    autoCorrect={false}
                    placeholderTextColor="#190710"
                    placeholder="请输入用户名"
                    style={styles.input}
                    onChangeText={this.onChangeUserName}
                    keyboardType="number-pad"

                    // clearButtonMode="while-editing"
                  />

                  {formData.username ? (
                    <TouchableWithoutFeedback
                      onPress={() => {
                        this.onClick();
                      }}>
                      <View style={styles.topIcons}>
                        <Icon xml={xxx} size={18}></Icon>
                      </View>
                    </TouchableWithoutFeedback>
                  ) : null}
                </Flex>

                <Flex
                  align="center"
                  style={{
                    borderBottomColor: '#bfbfbf',
                    borderBottomWidth: 1,
                    backgroundColor: 'rgba(178,178,178,0.8)',
                  }}>
                  <Icon style={styles.icons} xml={mima} size={24}></Icon>
                  <TextInput
                    value={formData.password}
                    placeholder="请输入验证码"
                    placeholderTextColor="#190710"
                    autoCompleteType="password"
                    maxLength={6}
                    style={styles.input}
                    onChangeText={this.onChangePassWord}
                    // secureTextEntry={!this.state.imageState} //是否隐藏
                  />
                  <View>
                    <MyCountTime timeLeft={90} />
                  </View>
                </Flex>
                <Spacing size={15} />
                <Flex align="center">
                  <Button
                    style={styles.button}
                    textStyle={{color: '#fff'}}
                    bordered={false}
                    loading={loading.login}
                    disabled={loading.login}
                    onPress={() => {
                      this.onSubmit();
                    }}>
                    登录
                  </Button>
                </Flex>
                <Spacing size={15} />
              </Flex>
            </Flex>
          </ScrollView>
          <Footer navigation={navigation} />
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

export default connect(
  ({loading, global, users}) => ({
    loading: loading.effects.users,
    token: global.token,
    formData: users.formData,
  }),
  ({users}) => ({
    login: users.login,
    // register: users.register,
    update: users.update,
    updateForm: users.updateForm,
  }),
)(SigninScreen);

const styles = StyleSheet.create({
  setting: {
    position: 'absolute',
  },
  block: {
    flex: 1,
    backgroundColor: '#fff',
  },
  icons: {color: '#190710'},
  nextIcons: {
    position: 'absolute',
    zIndex: 9,
    right: 10,
  },
  input: {
    flex: 1,
    width: 243,
    height: 40,
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: 'black',
    fontWeight: '200',

    fontSize: 16,
  },
  button: {
    width: '100%',
    height: 45,
    paddingVertical: 4,
    backgroundColor: 'rgba(178,178,178,0.8)',
  },
  topIcons: {
    right: 10,
  },
});
