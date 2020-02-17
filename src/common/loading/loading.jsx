import Taro,{Component} from '@tarojs/taro'
import React from 'react';
import './loading.scss';
import {Text, View} from "@tarojs/components";

export default class Loading extends Component{
  componentDidMount() {
  }

  render() {
    let display='none';
    if(this.props.display===true){
      display='block'
    }
    return (
      <View style={{display:display}} className="loading">
        <Text>Loading</Text>
      </View>
    )
  }
}
