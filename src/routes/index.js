import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import DevOptions from '../pages/DevOptions';
import MyHomeSetting from '../pages/MyHome/Setting';
let headerBackTitle = '返回';

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
          ? '首页'
          : tabName == 'TransportHome'
          ? '首页'
          : tabName == 'Find'
          ? '发现'
          : tabName == 'OrderHome'
          ? '订单'
          : '我的',
        headerStyle: {backgroundColor: '#7d9bfc'},
        headerTintColor: '#fff',
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
      headerStyle: {backgroundColor: '#7d9bfc'},
      headerTintColor: '#100719',
      headerShown: false,
      header: () => null,
    },
  },
  {
    name: 'MyHomeSetting',
    component: MyHomeSetting,
    options: {
      title: '设置',
      headerBackTitle,
      headerStyle: {backgroundColor: '#7d9bfc'},
      headerTintColor: '#100719',
    },
  },
];
