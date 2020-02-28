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
export function getRecommendCustomList(userId,tag) {
  return post('/api/user/custom/recommend_custom_list',{userId,tag})
}

/**
 * 加入习惯
 */
export function JoinCustom(params) {
  return post('/api/user/custom/join_custom',params)
}


/**
 * 获取习惯列表
 */
export function getUserCustomList(params){
  return post('/api/user/custom/join_list',params)
}

/**
 * 获取习惯详情
 */
export function getCustomDetail(params){
  return post('/api/user/custom/custom_detail',params)
}

/**
 * 创建习惯
 */
export function createCustom(params) {
  return post('/api/user/custom/insert_custom',params)
}

/**
 * 心愿模块
 * **/
export function getAllHopes(params){
  return post('/api/user/hope/allHopes',params)
}

//创建心愿
export function createHope(params) {
  return post('/api/user/hope/newHope',params)
}

//获取心愿详情
export function getHopeDetail(params){
  return post('/api/user/hope/hopeDetail',{hopeId:params})
}

/**
 * 打卡
 * **/
//评论打卡
export function checkInComment(params) {
  return post('/api/user/checkin/checkInComment',params)
}

/**
 * 粉丝与关注
 * **/
//我的关注
export function myFollowing(params) {
  return get(`/api/user/following/${params.userId}`,params)
}

export function followedMe(params) {
  return get(`/api/user/fans/${params.userId}`,params)
}
