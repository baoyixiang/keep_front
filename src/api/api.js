import Taro, {Chain} from '@tarojs/taro'
import CustomConfig from '../config/env';
import {doLogin} from "./apis";
const BASE_URL = CustomConfig.BASE_URL;


export function post(url, data) {
  let token = Taro.getStorageSync('token');
  return Taro.request({
    url: `${BASE_URL}${url}`,
    data: data,
    header:{
      'content-type': 'application/json',
      'Authorization': token,
    },
    method:"POST",
    success: ((res)=>checkToken(res)),
    fail: ((e)=>failToast(e)),
  })
}

export function del(url, data) {
  let token = Taro.getStorageSync('token');
  return Taro.request({
    url: `${BASE_URL}${url}`,
    data: data,
    header:{
      'content-type': 'application/json',
      'Authorization': token,
    },
    method:"DELETE",
    success: ((res)=>checkToken(res)),
    fail: ((e)=>failToast(e)),
  })
}

export function get(url, data) {
  let token = Taro.getStorageSync('token');
  return Taro.request({
    url: `${BASE_URL}${url}`,
    data: data,
    header:{
      'content-type': 'application/json',
      'Authorization': token,
    },
    method:"GET",
    success: ((res)=>checkToken(res)),
    fail: ((e)=>failToast(e)),
  })
}

function failToast(e) {
  Taro.showToast({
    title: "网络错误",
    icon: "none",
    duration: 2000,
  })
}

function checkToken(res) {
  if(res.statusCode === 401){
    Taro.clearStorage();
    Taro.showToast({
      title: "登录已过期",
      icon: "none",
      duration: 3000,
    });
    Taro.redirectTo({url: `/pages/homePage/home_page_new`}).then()
  }else if(res.statusCode === 400){
    Taro.showToast({
      title: res.data.message,
      icon: "none",
      duration: 3000,
    });
    if(res.data.message === "用户信息不存在"){
      Taro.clearStorage();
      Taro.redirectTo({url: `/pages/homePage/home_page_new`}).then()
    }
  }else if(res.statusCode === 404){
    Taro.showToast({
      title: "无效的接口",
      icon: "none",
      duration: 3000,
    })
  }else if(res.statusCode > 400 && res.statusCode < 500){
    Taro.showToast({
      title: res.data.message,
      icon: "none",
      duration: 3000,
    })
  }
}
