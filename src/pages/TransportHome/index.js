import React, {Component} from 'react';
// import find from '../../components/icons';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import {Icon} from '@uiw/react-native';

import {
  customer,
  deposit,
  music,
  MV,
  Collection,
  article,
} from '../../components/icons/signin';

import Swiper from 'react-native-swiper'; //参考网站：https://github.com/leecade/react-native-swiper
export default class MyScreen extends Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{width: '100%', height: 150}}>
          <Swiper
            style={styles.wrapper}
            loop={true} //如果设置为false，那么滑动到最后一张时，再次滑动将不会滑到第一张图片。
            autoplay={true} //自动轮播
            autoplayTimeout={3} //每隔4秒切换
            horizontal={true} //水平方向，为false可设置为竖直方向
            paginationStyle={{bottom: 6}} //小圆点的位置：距离底部10px
            showsButtons={false} //为false时不显示控制按钮
            activeDotColor={'#eb4f46'}>
            <Image
              resizeMode={'stretch'}
              style={styles.img}
              source={require('../../utils/img/t1.jpeg')}
            />
            <Image
              resizeMode={'stretch'}
              style={styles.img}
              source={require('../../utils/img/t2.jpeg')}
            />
            <Image
              resizeMode={'stretch'}
              style={styles.img}
              source={require('../../utils/img/t3.jpeg')}
            />
          </Swiper>
        </View>
        <View style={styles.nav}>
          <View style={styles.navMain}>
            <TouchableOpacity
              style={styles.navItem}
              onPress={() => this.props.navigation.navigate('MyHomeSetting')}>
              {/* <Icon name="pay" fill="#666" size={27} /> */}
              <Icon xml={music} size={29} />

              <Text style={styles.navItemText}>我的音乐</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navItem}
              onPress={() => this.props.navigation.navigate('MyHomeSetting')}>
              <Icon xml={MV} size={29} />
              <Text style={styles.navItemText}>我的视频</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.navItem} onPress={() => this.props.navigation.navigate('Payment')}> */}
            <TouchableOpacity
              style={styles.navItem}
              onPress={() => this.props.navigation.navigate('MyHomeSetting')}>
              <Icon xml={Collection} size={29} />
              <Text style={styles.navItemText}>我的收藏</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navItem}
              onPress={() => this.props.navigation.navigate('MyHomeSetting')}>
              {/* <TouchableOpacity style={styles.navItem} onPress={() => this.props.navigation.navigate('OtherPage')}> */}
              <Icon xml={article} size={29} />
              <Text style={styles.navItemText}>我的文章</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  img: {
    width: '100%',
    height: 220,
  },
  nav: {
    backgroundColor: '#fff',
    borderRadius: 4,
    height: 85,
    // marginHorizontal: 10,
    marginVertical: 10,
  },

  navMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginTop: 15,
  },
  navItem: {
    height: 55,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navItemText: {
    marginTop: 6,
    color: '#666',
  },

  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
