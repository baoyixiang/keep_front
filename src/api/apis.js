import {post, get, del} from './api';
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
 * 打卡模块
 */
export function customSign(params){
  return post('/api/user/checkin/checkIn',params)
}

/**
 * 取消打卡
 */
export function cancelSign(params){
  return del('/api/user/checkin/deleteCheckIn',params)
}

/**
 * 记录心情*/
export function recordMineMood(params){
  return post('/api/user/checkin/checkInRecord',params);
}

/**
 * 习惯所有打卡记录
 */
export function getCustomRecord(params) {
  return post('/api/user/checkin/CustomCheckIns',params)
}

/**
 * 打卡点赞
 */
export function likeRecord(params) {
  return post('/api/user/checkin/LikeCheckIn',params)
}

/**
 * 打卡评论
 */
export function recordComment(params){
  return post('/api/user/checkin/checkInComment',params)
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
  return post('/api/user/hope/hopeDetail',params)
}
//给心愿点赞
export function likeHopes(params){
  return post('/api/user/hope/likeHope',params)
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
