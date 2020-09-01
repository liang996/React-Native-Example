import React, {Component} from 'react';
import {Button, List, Icon} from '@uiw/react-native';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  RefreshControl,
  Alert,
  TouchableWithoutFeedback,
  DeviceEventEmitter,
} from 'react-native';

import {
  card,
  customer,
  deposit,
  star,
  byanjing,
  kyanjing,
} from '../../components/icons/signin';
import ImagePicker from 'react-native-image-picker';

const photoOptions = {
  title: '请选择',
  quality: 0.8,
  cancelButtonTitle: '取消',
  takePhotoButtonTitle: '拍照',
  chooseFromLibraryButtonTitle: '选择相册',
  allowsEditing: true,
  noData: false,
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
export default class MyScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: '',
    };
    this.choosePicker = this.choosePicker.bind(this);
  }
  choosePicker() {
    ImagePicker.showImagePicker(photoOptions, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = {uri: response.uri};
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source,
        });
      }
    });
  }

  star = (num) => {
    let starNum = [];
    let length = num;
    for (var i = 0; i <= length - 1; i++) {
      starNum.push(
        <Icon
          xml={star}
          size={16}
          style={{alignItems: 'center'}}
          key={i}></Icon>,
      );
    }
    return starNum;
  };

  render() {
    const {navigation} = this.props;
    const {avatarSource} = this.state;

    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView
          refreshControl={<RefreshControl refreshing={false} />}
          showsVerticalScrollIndicator={false}>
          <View style={styles.topInfo}>
            <TouchableOpacity onPress={this.choosePicker}>
              {avatarSource == '' ? (
                <View style={styles.topImg}>
                  <Image
                    resizeMode={'stretch'}
                    style={styles.img}
                    source={require('../../utils/img/t4.jpeg')}
                  />
                </View>
              ) : (
                <View style={styles.topImg}>
                  <Image source={this.state.avatarSource} style={styles.img} />
                </View>
              )}
            </TouchableOpacity>

            <View style={styles.topInfoCen}>
              <View style={{flexDirection: 'row', marginHorizontal: -25}}>
                <Text style={styles.topUser}>18207211063</Text>
              </View>
              <Text style={styles.topScore}>评分：3</Text>

              <View style={styles.between}>{this.star(3)}</View>
            </View>
            <TouchableOpacity
              style={styles.topNews}
              onPress={() => navigation.navigate('MyHomeSetting')}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 12,
                  fontWeight: 'bold',
                  position: 'absolute',
                  right: -9,
                  top: -5,
                }}>
                11
              </Text>
              <Icon name="bell" fill="#fff" size="30" />
            </TouchableOpacity>
          </View>

          <View style={{flex: 1}}>
            <List
              flat={true}
              data={[
                {
                  title: '我的钱包',
                  onPress: () => navigation.navigate('MyHomeSetting'),
                },
                {
                  title: '客服热线',
                  onPress: () => navigation.navigate('MyHomeSetting'),
                },

                {
                  title: '爱好分享',
                  onPress: () => navigation.navigate('MyHomeSetting'),
                },

                {
                  title: '个人设置',
                  onPress: () => navigation.navigate('MyHomeSetting'),
                },
                {
                  title: '退出登录',
                  onPress: () => navigation.replace('SignIn'),
                },
              ]}
              renderItem={({item, index}) => {
                return (
                  <List.Item
                    key={index}
                    extra={<Icon name="right" fill="#abb0b5" size={14} />}
                    size="large"
                    paddingLeft={15}
                    style={{borderBottomWidth: 0}}
                    onPress={item.onPress || null}>
                    <View>
                      <Text>{item.title}</Text>
                    </View>
                  </List.Item>
                );
              }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  between: {
    flexDirection: 'row',
    marginHorizontal: -14,
  },
  icon: {
    alignItems: 'center',
    flexDirection: 'column',
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'pink',
  },
  topImg: {
    marginHorizontal: 20,
    height: 80,
    width: 80,
    borderRadius: 40,
    overflow: 'hidden',
  },
  img: {
    width: 100,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
  },
  topInfo: {
    height: 160,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7d9bfc',
  },
  topInfoCen: {
    flex: 1,
    marginLeft: 15,
    height: 70,
    justifyContent: 'space-between',
  },
  topUser: {
    color: '#fff',
    fontSize: 20,
  },
  topScore: {
    color: '#fff',
    fontSize: 14,
    marginHorizontal: -14,
  },

  topNews: {
    position: 'absolute',
    top: 15,
    right: 10,
  },

  topItem: {
    flex: 1,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
