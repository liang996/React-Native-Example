import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import DevOptions from '../pages/DevOptions';
import MyHomeSetting from '../pages/MyHome/Setting';

export const stackPageData = [
  {
    name: 'Home',
    component: Home,
    options: ({navigation, route}) => {
      let tabName = null;
      if (route.state) {
        const {routeNames, index} = route.state;
        tabName = routeNames.filter((item, key) => key == index)[0];
      }
      return {
        headerBackTitleVisible: false,
        headerBackImage: () => <Image />,
        title: !tabName
          ? '发货'
          : tabName == 'TransportHome'
          ? '发货'
          : tabName == 'OrderHome'
          ? '订单'
          : '我的',
        headerStyle: {backgroundColor: '#04B4AE'},
        headerTintColor: '#6E6E6E',
      };
    },
  },
  {
    name: 'SignIn',
    component: SignIn,
    options: {
      headerShown: false,
      header: () => null,
    },
  },
  {
    name: 'DevOptions',
    component: DevOptions,
    options: {
      headerStyle: {backgroundColor: '#eb4f46'},
      headerTintColor: '#ffffff',
      headerShown: false,
      header: () => null,
    },
  },
  {
    name: 'MyHomeSetting',
    component: MyHomeSetting,
    options: {
      title: '设置',
    },
  },
];
