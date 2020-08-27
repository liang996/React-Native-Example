import React from 'react';
import {Icon} from '@uiw/react-native';
import MyHome from '../pages/MyHome';
import Find from '../pages/Find';
import OrderHome from '../pages/OrderHome';
import TransportHome from '../pages/TransportHome';

export default [
  {
    name: 'TransportHome',
    component: TransportHome,
    options: {
      title: '首页',
      tabBarIcon: ({focused}) => {
        return (
          <Icon name="home" size={22} color={focused ? '#7d9bfc' : '#AAAAAB'} />
        );
      },
    },
  },
  {
    name: 'Find',
    component: Find,
    options: {
      title: '发现',
      tabBarIcon: ({focused}) => {
        return (
          <Icon
            name="search"
            size={22}
            color={focused ? '#7d9bfc' : '#AAAAAB'}
          />
        );
      },
    },
  },
  {
    name: 'OrderHome',
    component: OrderHome,
    options: {
      title: '订单',
      tabBarIcon: ({focused}) => {
        return (
          <Icon
            name="file-text"
            size={22}
            color={focused ? '#7d9bfc' : '#AAAAAB'}
          />
        );
      },
    },
  },
  {
    name: 'MyHome',
    component: MyHome,
    options: {
      title: '我的',
      tabBarIcon: ({focused}) => {
        return (
          <Icon name="user" size={22} color={focused ? '#7d9bfc' : '#AAAAAB'} />
        );
      },
    },
  },
];
