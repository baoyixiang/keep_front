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


//获取主页列表
export function getUserCustomList(params){
  return post('/api/user/custom/list',params)
}
