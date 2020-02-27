import Taro, { Component } from '@tarojs/taro'
import {Button, Image, Text, View} from '@tarojs/components'
import './login.scss'
import React from "react";
import {doLogin} from "../../api/apis";
const head=require('../../assets/images/mine/head.png')

export default class Login extends Component {
  config = {
    navigationBarTitleText: '登录',
  };

  componentWillMount () {

  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () {
  }

  componentDidHide () { }

  // getUserInfo (res){
  //   Taro.setStorage({
  //     key: 'userInfo',
  //     data: res.detail.userInfo
  //   }).then()
  //
  //   Taro.switchTab({
  //     url: '../index/index'
  //   }).then()
  // }
  getUserInfo = (e) => {
    if (e.detail.userInfo){
      let userInfo = e.detail.userInfo;
      Taro.login({
        success(res){
          if(res.code){
            doLogin(res.code,userInfo.avatarUrl,userInfo.nickName,e.detail.signature,userInfo.gender).then((result)=>{
              if(result.statusCode === 200){
                Taro.clearStorage().then();
                //Taro.setStorageSync("token",result.data.token);
                Taro.setStorageSync("userInfoModel",result.data);
                Taro.setStorageSync("userInfo",userInfo);
                // console.log(result.data,userInfo)
                Taro.showToast({
                  title: "登录成功",
                  icon: "success",
                  duration: 1000,
                  success: function () {
                    setTimeout(function () {
                      Taro.switchTab({url: '../index/index'}).then();
                    }, 1000); //延迟时间
                  }
                }).then();
              }else {
                Taro.showToast({
                  title: "登录异常！",
                  icon:"none",
                  duration:2000,
                }).then()
              }
            })
          }else {
          }
        }
      }).then();
    }else {
      Taro.showToast({
        title: "为了您更好的体验,请先同意授权",
        icon: "none",
        duration: 2000
      }).then()
    }
  }

  render () {
    return (
      <View className='login'>
        <Image className='img' src={head}/>
        <View className='name'>恒愿微信小程序</View>
        <View className='info'>申请获取你的公开信息（昵称、头像等）</View>
        <Button openType="getUserInfo" onGetUserInfo={this.getUserInfo} class='btnStyle' lang="zh_CN">授权获取头像昵称</Button>
      </View>
    )
  }
}
