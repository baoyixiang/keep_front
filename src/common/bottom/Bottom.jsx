import Taro,{Component} from '@tarojs/taro';
import React from "react";
import {View} from "@tarojs/components";
import './Bottom.scss'
export default class Bottom extends Component{

  render() {
    return <View className='bottom'>{this.props.text||"到底啦~"}</View>
  }
}
