import Taro,{Component} from "@tarojs/taro";
import React from 'react';
import {View} from "@tarojs/components";

export default class CheckUser extends Component{
  constructor(props){
    super(props);
  }
  componentDidMount() {
    Taro.getStorage({
      key:"userInfo",
      success(res){
      }
    })
  }
  render() {
    return(
      <View/>
    )
  }
}
