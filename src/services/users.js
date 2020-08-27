import {fetch} from '../utils';

/**
 * Auth token
 */
export async function userAuth(params) {
  return fetch('/api/auth', {
    method: 'GET',
    body: params,
  });
}

/**
 * login
 */
export async function userLogin(params) {
  return fetch('/api/login', {
    body: params,
  });
}

/**
 * 验证码
 */
export async function userSmsCode(params) {
  return fetch('/api/getSmsCode', {
    body: params,
  });
}

/**
 * logout
 */
export async function userLogout(params) {
  return fetch('/api/logout', {
    body: params,
  });
}
