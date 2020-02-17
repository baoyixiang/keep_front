import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './hopes.scss'
import React from "react";
import NavBar from "../../common/navBar/navBar";
import { AtTabs ,AtTabsPane} from 'taro-ui'
import BarTakeUp from "../../common/barTakeUp/barTakeUp";
export default class Hopes extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      current: 0,
    }
  }
  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  handleClick (value) {
    this.setState({
      current: value
    })
  }
  render () {
    return (
      <View className='hopes'>
        <NavBar title={"萌芽社区"} back={false}/>
        <BarTakeUp/>
        <AtTabs className="hopes_tabBar"
          current={this.state.current}
          scroll
          tabList={[
            { title: '标签页1' },
            { title: '标签页2' },
            { title: '标签页3' },
            { title: '标签页4' },
            { title: '标签页5' },
            { title: '标签页6' }
          ]}
          onClick={this.handleClick.bind(this)}>
          <AtTabsPane current={this.state.current} index={0}>
            <View style='font-size:18px;text-align:center;height:100px;'>标签页一的内容</View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            <View style='font-size:18px;text-align:center;height:100px;'>标签页二的内容</View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={2}>
            <View style='font-size:18px;text-align:center;height:100px;'>标签页三的内容</View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={3}>
            <View style='font-size:18px;text-align:center;height:100px;'>标签页四的内容</View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={4}>
            <View style='font-size:18px;text-align:center;height:100px;'>标签页五的内容</View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={5}>
            <View style='font-size:18px;text-align:center;height:100px;'>标签页六的内容</View>
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }
}
