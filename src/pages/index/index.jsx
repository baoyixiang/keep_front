import Taro, { Component } from '@tarojs/taro'
import {View, Text, Image} from '@tarojs/components'
import './index.scss'
import { AtButton } from 'taro-ui'
import React from "react";
import photo from '../../assets/images/mine/keep_statics.png'
import NavBar from "../../common/navBar/navBar";
import BarTakeUp from "../../common/barTakeUp/barTakeUp";
import {getOwnCustoms, getRecommendCustomList, getUserCustomList} from "../../api/apis";
export default class Index extends Component {

  constructor(props){
    super(props);
    this.state={
      statusBarHeight:0,
      habitsList:[
        {
          custom: {},
        }
      ]
    }
  }

  pageNo = 0;

  componentWillMount () {
    Taro.getStorage({
      key:'userInfo',
      fail(){
        Taro.navigateTo({
          url:'../login/login'
        })
      }
    })
  }

  componentDidMount () {
    let userInfoModel = Taro.getStorageSync('userInfoModel');
    const params={
      pageNo:0,
      pageSize:10,
      userId:userInfoModel.id
    };
    getOwnCustoms(params).then(res=>{
      this.setState({
        habitsList: res.data.list
      })
    })

  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }



  createHabit(){
    Taro.navigateTo({
      url:'../createHabit/createHabit'
    })
  }

  redirectToHabit(){
    Taro.navigateTo({
      url:"../habitSign/habitSign?id=123",
    })
  }

  renderHabits(){
    const {habitsList} = this.state;
    return habitsList.map(item=>{
      return (
        <View onClick={this.redirectToHabit.bind(this)} className='list_item'>
          <Image className='list_item_icon' src={item.logo}/>
          <Text className='list_item_title'>{item.title}</Text>
          <Text className='list_item_days'>已坚持1天</Text>
        </View>
      )
    })
  }

  render () {
    let {habitsList} = this.state;
    return (
      <View className='index' >
        <NavBar title={"点滴习惯"} back={false}/>
        <BarTakeUp/>

        {
          habitsList.length===0?<Text>暂无习惯</Text>:
            <View>{this.renderHabits()}</View>
        }
        <AtButton className="create_habit_button" onClick={this.createHabit.bind(this)}>添加习惯</AtButton>

      </View>
    )
  }
}
