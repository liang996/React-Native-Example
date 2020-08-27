import {Alert} from 'react-native';
import {userSmsCode} from '../services/users';
import Global from '../global';

let randomNumber = Math.random().toString().slice(-6); //随机获取6位验证码

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
      if (users.formData.username !== 'admin') {
        Alert.alert('请输入正确用户名', '', [{text: '确定'}]);
        return;
      } else if (users.formData.password !== users.formData.password) {
        Alert.alert('请输入正确密码', '', [{text: '确定'}]);
        return;
      } else {
        Global.navigation.replace('Home');
      }
    },
    // 验证码获取
    async userSmsCode(_, {users}) {
      this.update({
        formData: {
          ...users.formData,
          password: randomNumber,
        },
      });
      Alert.alert('', '验证码发送成功', [{text: '确定'}]);
      return;
    },

    async logout() {
      Global.navigation.navigate('SignIn');
    },
  }),
};
