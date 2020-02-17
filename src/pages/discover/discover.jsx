import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './discover.scss'
import React from "react";
import Loading from "../../common/loading/loading";

export default class Discover extends Component {

  constructor(props){
    super(props)
  }
  state={
    isLoading:true,
  }


  componentWillMount () { }

  componentDidMount () {
    setTimeout(()=>{
      this.setState({
        isLoading:false
      })
    },2000)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <Text>发现页面</Text>
        <Loading display={this.state.isLoading}/>
      </View>
    )
  }
}
