import Taro,{Component} from "@tarojs/taro";
import React from 'react';
import {View} from "@tarojs/components";

export default class BarTakeUp extends Component{
  constructor(props){
    super(props);
    this.state={
      statusBarHeight:0,
    }
  }
  componentDidMount() {
    Taro.getSystemInfo({
    }).then(res => {
      this.setState({
        statusBarHeight:  res.statusBarHeight || 0,
      });})
  }

  render() {
    const height=this.props.height||45;
    return <View style={{height:this.state.statusBarHeight+height+'px'}}>
    </View>
  }
}
