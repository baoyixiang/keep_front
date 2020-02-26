import {post, get} from './api';
import * as Taro from "@tarojs/taro";
import { func } from 'prop-types';
import {save} from "../action/user";


/**
 * 小程序登录
 * @param code
 */
export  function doLogin(code,avatarUrl,nickName,personalSignature,gender) {
  return post('/api/user/login',{code,avatarUrl,nickName,personalSignature,gender})
}

/**
 * 获取推荐用户列表
 */
export function getRecommendUserList() {
  return get(`/api/user/recommend_user_list`)
}

/**
 * 获取推荐习惯列表
 */
export function getRecommendCustomList(userId,tagsList) {
  return post('/api/user/custom/recommend_custom_list',{userId,tagsList})
}

/**
 * 发送验证码
 */
export function sendSMSCode(phone,scene,version,verify) {
  return post('/api/sms/send_code', {phone, scene, version, verify})
}

/**
 * 修改手机号码
 */
export function updatePhone(newPhone,verifyCode,otherInfo) {
  return post('/api/applet/user/updatePhone',{newPhone,verifyCode,otherInfo})
}

/**
 * 获取渠道列表
 */
export  function getChannelList(selectLocation,longitude,latitude,pageNo,size,city,province) {
  return post('/api/applet/channel/list',{selectLocation,longitude,latitude,pageNo,size,city,province})
}

/**
 *查询对应渠道商品
 */
export function getChannelDetail(id) {
  return post('/api/applet/channel/detail',{id});
}

export function joinChannel(id) {
  return post('/api/applet/channel/join', {id});
}

export function outChannel(id) {
  return post('/api/applet/channel/out', {id});
}

/**
 * 用户注册
 * @param userName 为用户名
 * @param nickName 为昵称
 * @param code
 * @param headImg 为头像
 * @param inviteNumber 为邀请码
 * @param verifyCode 短信验证码
 */
export function doRegister(userName, nickName, code, headImg, inviteNumber, verifyCode)
{
  return post('/api/v1/user/register', {userName, nickName, code, headImg, inviteNumber, verifyCode});
}


export function getProductChannelDetail(id) {
  return get(`/api/applet/product/channel/detail/${id}`, null)
}

export function refreshUserInfo() {
  return getUserMessage()
}
/**
 * 查询对应渠道商品
 */
export function getProductChannelList(pageNo,size,sorter) {
  return post('/api/applet/product/channel/list',{pageNo,size,sorter})
}

/**
 * 商品详情
 */
export function getOrderDetails(orderId) {
  return get(`/api/applet/order/detail/${orderId}`);
}

/**
 * 获取用户信息
 * @param {string} authorization 传入token
 */
export function getUserMessage() {
  return get(`/api/applet/user/appletGetUserMessage/`);
}

export function updateMessage(request, authorization) {
  return post(`/api/applet/user/appletUpdateMessage/`, request)
}

/**
 * 用户创建订单
 * @param productId
 * @returns {Promise<Taro.request.Promised<any>>}
 */
export function createOrder(params) {
  return post('/api/applet/order/create1',params)
}

/**
 * 查询商品订单
 */
export function getOrderList(state,pageNo,size) {
  return post('/api/applet/order/list',{state,pageNo,size})
}


/**
 * 评论雪友秀
 *
 */
export function commentMoment(params) {
  return post('/api/applet/moments/commentMoment', params)
}

/**
 * 点赞雪友秀
 */
export function likeMoment(params){
  console.log(params);
  return post('/api/applet/moments/likeMoment', params)
}

/**
 * 获取雪友秀列表
 * user token
 */
export function getShowList(params){
  return post('/api/applet/moments/getMomentList',params)
}


export function getLocationTencent(params){
  return Taro.request({
    url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=',
    data: {
      "key" : "RKFBZ-FHWCI-OERGQ-5DYJN-UE75Q-FYFK5",
      "location" : params
    },
    method: 'GET',
  });
}

export function getLocationGaoDe(params){
  return Taro.request({
    url: 'https://restapi.amap.com/v3/geocode/regeo?parameters',
    data: {
      "key" : "f52f079f8d49fd7d2b7ba6b7d808d239",
      "location" : params,
      "extensions " : "all",
      "roadlevel" : 1,

    },
    method: 'GET',
  });
}


export function getWeatherInfoGaoDe(params){
  return Taro.request({
    url: 'https://restapi.amap.com/v3/weather/weatherInfo?parameters',
    data: {
      "key" : "f52f079f8d49fd7d2b7ba6b7d808d239",
      "city" : params,
      "extensions" : "all",
    },
    method: 'GET',
  });
}
