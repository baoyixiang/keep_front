import Taro, { Component } from '@tarojs/taro'
import {Button, Image, Text, View} from '@tarojs/components'
import './login.scss'
import React from "react";
const head=require('../../assets/images/mine/head.png')

export default class Login extends Component {
  config = {
    navigationBarTitleText: '登录',
  }

  componentWillMount () {

  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () {
  }

  componentDidHide () { }

  getUserInfo (res){
    Taro.setStorage({
      key:'userInfo',
      data:res.detail.userInfo
    })

    Taro.switchTab({
      url:'../index/index'
    })
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
