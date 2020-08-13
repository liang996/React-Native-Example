import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {userLogin} from '../services/users';
import Global from '../global';

export default {
  state: {
    userData: null,
    remember: false, // Whether to remember password
    formData: {
      username: '',
      password: '',
    },
  },
  reducers: {
    update: (state, payload) => ({...state, ...payload}),
    updateForm: (state, payload) => ({
      ...state,
      formData: {...state.formData, ...payload},
    }),
  },
  effects: (dispatch) => ({
    // 登录
    async login(_, {users, global}) {
      const data = await userLogin(users.formData);
      if (users.formData.username !== 'admin') {
        Alert.alert('请输入正确用户名', '', [{text: '确定'}]);
        return;
      } else if (users.formData.password !== 'admin') {
        Alert.alert('请输入正确密码', '', [{text: '确定'}]);
        return;
      } else {
        Global.navigation.replace('Home');
      }
    },
    async logout() {
      Global.navigation.navigate('SignIn');
    },
  }),
};
